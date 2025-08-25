const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student', 'parent', 'admin'], required: true },
  rollNo: { type: String }, // For students
  dob: { type: Date }, // For students
  class: { type: String }, // For students
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For students
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For parents
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  method: { type: String, enum: ['face_recognition', 'qr_code', 'manual'], default: 'face_recognition' },
  confidence: { type: Number }, // For face recognition
  correctionRequested: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dueDate: { type: Date },
  maxMarks: { type: Number },
  filePath: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

// Correction Request Schema
const correctionRequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendance', required: true },
  reason: { type: String, required: true },
  description: { type: String, required: true },
  evidence: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNote: { type: String },
  createdAt: { type: Date, default: Date.now },
  responseDate: { type: Date }
});

const CorrectionRequest = mongoose.model('CorrectionRequest', correctionRequestSchema);

// Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['attendance', 'assignment', 'correction', 'general'], required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

// Class Schema
const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subjects: [{ type: String }],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const Class = mongoose.model('Class', classSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Initialize notification services
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) 
  : null;

const emailTransporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Notification helper functions
const createNotification = async (userId, title, message, type) => {
  try {
    const notification = new Notification({
      userId,
      title,
      message,
      type
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

const sendSMS = async (phoneNumber, message) => {
  if (!twilioClient) return false;
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return true;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
};

const sendEmail = async (email, subject, message) => {
  if (!process.env.EMAIL_USER) return false;
  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: message
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, rollNo, dob } = req.body;
    
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (rollNo && dob) {
      user = await User.findOne({ rollNo, dob: new Date(dob) });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password || dob, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, rollNo, dob, class: userClass } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      rollNo,
      dob: dob ? new Date(dob) : undefined,
      class: userClass
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Attendance Routes
app.post('/api/attendance', authenticateToken, async (req, res) => {
  try {
    const { students, subject, class: className } = req.body;
    
    const attendanceRecords = students.map(student => ({
      studentId: student.id,
      teacherId: req.user.userId,
      subject,
      class: className,
      date: new Date(),
      status: student.status,
      method: student.method || 'face_recognition',
      confidence: student.confidence
    }));

    await Attendance.insertMany(attendanceRecords);
    res.json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/attendance/student/:studentId', authenticateToken, async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId })
      .populate('teacherId', 'name')
      .sort({ date: -1 });
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Assignment Routes
app.post('/api/assignments', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject, class: className, dueDate, maxMarks } = req.body;
    
    const assignment = new Assignment({
      title,
      description,
      subject,
      class: className,
      teacherId: req.user.userId,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      maxMarks,
      filePath: req.file ? req.file.path : undefined
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/assignments/class/:className', authenticateToken, async (req, res) => {
  try {
    const { className } = req.params;
    const assignments = await Assignment.find({ class: className })
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Correction Request Routes
app.post('/api/correction-requests', authenticateToken, async (req, res) => {
  try {
    const { attendanceId, reason, description, evidence } = req.body;
    
    const correctionRequest = new CorrectionRequest({
      studentId: req.user.userId,
      attendanceId,
      reason,
      description,
      evidence
    });

    await correctionRequest.save();
    res.status(201).json(correctionRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/correction-requests/student/:studentId', authenticateToken, async (req, res) => {
  try {
    const { studentId } = req.params;
    const requests = await CorrectionRequest.find({ studentId })
      .populate('attendanceId')
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Routes
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const { role, class: className } = req.query;
    const filter = {};
    
    if (role) filter.role = role;
    if (className) filter.class = className;
    
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Notification Routes
app.get('/api/notifications/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { read: true });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Face Recognition Attendance Route
app.post('/api/attendance/face-recognition', authenticateToken, async (req, res) => {
  try {
    const { studentId, confidence, subject, class: className } = req.body;
    
    // Check if attendance already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const existingAttendance = await Attendance.findOne({
      studentId,
      subject,
      class: className,
      date: { $gte: today, $lt: tomorrow }
    });
    
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already recorded for today' });
    }
    
    const attendance = new Attendance({
      studentId,
      teacherId: req.user.userId,
      subject,
      class: className,
      date: new Date(),
      status: confidence > 0.8 ? 'present' : 'late',
      method: 'face_recognition',
      confidence
    });
    
    await attendance.save();
    
    // Create notification
    await createNotification(
      studentId,
      'Attendance Recorded',
      `Your attendance has been recorded for ${subject} via face recognition.`,
      'attendance'
    );
    
    res.json({ message: 'Attendance recorded successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// QR Code Attendance Route
app.post('/api/attendance/qr-code', authenticateToken, async (req, res) => {
  try {
    const { qrData, studentId } = req.body;
    
    // Verify QR code data
    const qrInfo = JSON.parse(qrData);
    const { subject, class: className, timestamp } = qrInfo;
    
    // Check if QR code is still valid (within 5 minutes)
    const qrTime = new Date(timestamp);
    const now = new Date();
    const timeDiff = (now - qrTime) / (1000 * 60);
    
    if (timeDiff > 5) {
      return res.status(400).json({ message: 'QR code has expired' });
    }
    
    // Check if attendance already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const existingAttendance = await Attendance.findOne({
      studentId,
      subject,
      class: className,
      date: { $gte: today, $lt: tomorrow }
    });
    
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already recorded for today' });
    }
    
    const attendance = new Attendance({
      studentId,
      teacherId: req.user.userId,
      subject,
      class: className,
      date: new Date(),
      status: 'present',
      method: 'qr_code'
    });
    
    await attendance.save();
    
    // Create notification
    await createNotification(
      studentId,
      'Attendance Recorded',
      `Your attendance has been recorded for ${subject} via QR code.`,
      'attendance'
    );
    
    res.json({ message: 'Attendance recorded successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate QR Code for Attendance
app.post('/api/qr-code/generate', authenticateToken, async (req, res) => {
  try {
    const { subject, class: className } = req.body;
    
    const qrData = {
      subject,
      class: className,
      teacherId: req.user.userId,
      timestamp: new Date().toISOString()
    };
    
    res.json({ qrData: JSON.stringify(qrData) });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Routes for Correction Requests
app.get('/api/admin/correction-requests', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const requests = await CorrectionRequest.find()
      .populate('studentId', 'name rollNo')
      .populate('attendanceId')
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/correction-requests/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { id } = req.params;
    const { status, adminNote } = req.body;
    
    const request = await CorrectionRequest.findByIdAndUpdate(
      id,
      { status, adminNote, responseDate: new Date() },
      { new: true }
    ).populate('studentId', 'name email');
    
    // Create notification for student
    await createNotification(
      request.studentId._id,
      'Correction Request Update',
      `Your correction request has been ${status}. ${adminNote || ''}`,
      'correction'
    );
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Analytics Routes
app.get('/api/analytics/attendance/:classId', authenticateToken, async (req, res) => {
  try {
    const { classId } = req.params;
    const { startDate, endDate } = req.query;
    
    const filter = { class: classId };
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const attendanceData = await Attendance.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const dailyAttendance = await Attendance.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);
    
    res.json({ attendanceData, dailyAttendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-attendance'}`);
});