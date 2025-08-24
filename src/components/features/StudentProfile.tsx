import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X, Camera, Award, BookOpen, TrendingUp } from 'lucide-react';

interface StudentProfileProps {
  user: any;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || 'Alex Chen',
    email: 'alex.chen@school.edu',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '2007-03-15',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'Jane Chen - +1 (555) 987-6543',
    bloodGroup: 'O+',
    allergies: 'None',
    hobbies: 'Basketball, Reading, Programming'
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData({ ...tempData, [field]: value });
  };

  const academicStats = {
    currentGPA: 3.85,
    totalCredits: 45,
    attendanceRate: 92,
    rank: 6,
    totalStudents: 120
  };

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', points: 4.0, credits: 3 },
    { subject: 'Physics', grade: 'A-', points: 3.7, credits: 3 },
    { subject: 'Chemistry', grade: 'B+', points: 3.3, credits: 3 },
    { subject: 'English', grade: 'A', points: 4.0, credits: 2 },
    { subject: 'History', grade: 'B+', points: 3.3, credits: 2 }
  ];

  const achievements = [
    { title: 'Perfect Attendance', date: '2025-01-01', icon: Award },
    { title: 'Honor Roll', date: '2024-12-15', icon: BookOpen },
    { title: 'Math Competition Winner', date: '2024-11-20', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative">
            <img 
              src={user.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'} 
              alt={profileData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
            />
            <button className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
              <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="p-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-2 text-gray-300">
              <p className="text-lg">Class 10A • Roll No: 001</p>
              <p>Student ID: STU2024001</p>
              <p>Academic Year: 2024-2025</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{academicStats.attendanceRate}%</div>
              <div className="text-sm text-gray-400">Attendance</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{academicStats.currentGPA}</div>
              <div className="text-sm text-gray-400">GPA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">{profileData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={tempData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">
                  {new Date(profileData.dateOfBirth).toLocaleDateString()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={tempData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">{profileData.address}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Emergency Contact
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">{profileData.emergencyContact}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Blood Group
              </label>
              {isEditing ? (
                <select
                  value={tempData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">{profileData.bloodGroup}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Allergies
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">{profileData.allergies}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hobbies & Interests
              </label>
              {isEditing ? (
                <textarea
                  value={tempData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-white bg-white/5 px-4 py-3 rounded-lg">{profileData.hobbies}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Performance */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Grades */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Grades</h3>
          <div className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{grade.subject}</h4>
                  <p className="text-sm text-gray-400">{grade.credits} credits</p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    grade.points >= 3.7 ? 'text-green-400' :
                    grade.points >= 3.0 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {grade.grade}
                  </span>
                  <p className="text-sm text-gray-400">{grade.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Academic Summary */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Academic Summary</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-1">{academicStats.currentGPA}</div>
            <div className="text-sm text-gray-400">Current GPA</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-green-400 mb-1">{academicStats.totalCredits}</div>
            <div className="text-sm text-gray-400">Total Credits</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-1">#{academicStats.rank}</div>
            <div className="text-sm text-gray-400">Class Rank</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-orange-400 mb-1">{academicStats.attendanceRate}%</div>
            <div className="text-sm text-gray-400">Attendance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;