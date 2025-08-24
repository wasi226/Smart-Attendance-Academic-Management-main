Project Detail Draft 
Project Title 
Smart Attendance & Academic Management System (MERN + AI) 
Objective 
To develop an intelligent, automated system that simplifies student attendance tracking and 
academic management using face recognition and real-time communication. The goal is to 
reduce manual errors, improve transparency, and enhance engagement among teachers, 
students, and parents. 
Scope of Work 
The system will automate attendance using face recognition and provide role-based access for 
teachers, students, parents, and administrators. It will include real-time notifications for 
absentees and academic updates, a correction request system for attendance errors, and an 
academic dashboard with study materials and performance tracking. Advanced features such 
as proxy detection, QR code backup mode, and gamification will also be integrated. 
Roles and Features 
Teacher 
Teachers can upload a class photo for attendance, where marking is done automatically 
through face recognition. They will also be able to manually edit and approve corrections, 
upload assignments and notes, and view subject-wise analytics and reports. 
Student 
Students can log in using their credentials or Roll Number with Date of Birth. They will be able 
to view attendance records and calendars, raise correction requests, and access study 
materials and assignments. 
Parent 
Parents will receive real-time absentee alerts via SMS or WhatsApp. They can view the 
student’s attendance, academic performance, fee status, and assignments. 
Admin 
Administrators will handle the registration of students and teachers and manage classes and 
subjects. 
Advanced Features 
Timetable Auto-Detection 
The system automatically detects the subject based on the timestamp of the uploaded photo 
and the stored class schedule, reducing manual input. 
QR Code Backup Mode 
Each student is assigned a unique QR code. If face recognition fails, attendance can be 
marked by scanning the QR code. This serves as a backup method. 
Proxy Detection (Future ML Scope) 
The system compares uploaded class photos with stored face embeddings. If a mismatch is 
detected, it flags a possible proxy. Future machine learning models can further improve 
detection accuracy. 
Gamification 
Students earn badges for maintaining attendance streaks and good academic performance. 
Their dashboard highlights progress and rewards, motivating consistent participation. 
Tech Stack 
Layer 
Frontend 
Backend 
Technology Used 
React + TailwindCSS 
Node.js + Express 
Database MongoDB 
AI/ML 
face-api.js / OpenCV / AWS Rekognition 
Notifications Twilio / WhatsApp API
