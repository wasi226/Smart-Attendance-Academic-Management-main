import React, { useState } from 'react';
import { Calendar, Trophy, BookOpen, Clock, Target, Award, TrendingUp, AlertCircle, CheckCircle, Download } from 'lucide-react';
import Header from '../shared/Header';
import StatsCard from '../shared/StatsCard';
import AttendanceCalendar from '../features/AttendanceCalendar';
import AchievementBadges from '../features/AchievementBadges';
import CorrectionRequest from '../features/CorrectionRequest';
import QRCodeGenerator from '../features/QRCodeGenerator';
import GamificationSystem from '../features/GamificationSystem';
import StudentProfile from '../features/StudentProfile';

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Target, label: 'Overall Attendance', value: '87%', change: '+2%', color: 'green' },
    { icon: Trophy, label: 'Badges Earned', value: '12', change: '+3', color: 'purple' },
    { icon: TrendingUp, label: 'This Week', value: '4/5', change: '80%', color: 'blue' },
    { icon: Clock, label: 'Streak Days', value: '15', change: '+1', color: 'orange' }
  ];

  const todaySchedule = [
    { time: '09:00', subject: 'Mathematics', teacher: 'Dr. Johnson', room: 'Room 101', status: 'present' },
    { time: '11:00', subject: 'Physics', teacher: 'Mr. Smith', room: 'Lab 2', status: 'present' },
    { time: '14:00', subject: 'Chemistry', teacher: 'Dr. Wilson', room: 'Lab 1', status: 'upcoming' },
    { time: '15:30', subject: 'English', teacher: 'Ms. Davis', room: 'Room 205', status: 'upcoming' }
  ];

  const recentAssignments = [
    { subject: 'Mathematics', title: 'Calculus Problem Set 5', dueDate: 'Tomorrow', status: 'pending' },
    { subject: 'Physics', title: 'Wave Motion Lab Report', dueDate: '3 days', status: 'submitted' },
    { subject: 'Chemistry', title: 'Organic Chemistry Quiz', dueDate: '5 days', status: 'pending' },
    { subject: 'English', title: 'Essay on Climate Change', dueDate: '1 week', status: 'draft' }
  ];

  const subjectAttendance = [
    { subject: 'Mathematics', percentage: 92, classes: 48, present: 44 },
    { subject: 'Physics', percentage: 88, classes: 42, present: 37 },
    { subject: 'Chemistry', percentage: 85, classes: 40, present: 34 },
    { subject: 'English', percentage: 95, classes: 38, present: 36 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-800">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 mb-8">
          {[
            { id: 'overview', label: 'Dashboard', icon: Target },
            { id: 'attendance', label: 'Attendance', icon: Calendar },
            { id: 'qrcode', label: 'QR Code', icon: BookOpen },
            { id: 'corrections', label: 'Corrections', icon: Clock },
            { id: 'assignments', label: 'Assignments', icon: BookOpen },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'gamification', label: 'Rewards', icon: Trophy },
            { id: 'profile', label: 'Profile', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Quick QR Code */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Your QR Code</h3>
              <div className="flex items-center space-x-6">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">QR Code</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Backup Attendance Method</h4>
                  <p className="text-gray-400 mb-4">Use this QR code if face recognition fails</p>
                  <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download QR Code</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Today's Classes
              </h3>
              <div className="grid gap-4">
                {todaySchedule.map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <Clock className="w-5 h-5 text-green-400 mb-1" />
                        <span className="text-sm text-gray-300">{class_.time}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{class_.subject}</h4>
                        <p className="text-sm text-gray-400">{class_.teacher} • {class_.room}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {class_.status === 'present' ? (
                        <span className="flex items-center space-x-1 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Present</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Upcoming</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject-wise Attendance */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Subject-wise Attendance</h3>
              <div className="grid gap-4">
                {subjectAttendance.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{subject.subject}</h4>
                      <p className="text-sm text-gray-400">{subject.present}/{subject.classes} classes attended</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            subject.percentage >= 90 ? 'bg-green-500' :
                            subject.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                      <span className={`font-semibold ${
                        subject.percentage >= 90 ? 'text-green-400' :
                        subject.percentage >= 75 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {subject.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <AttendanceCalendar />
        )}

        {/* QR Code Tab */}
        {activeTab === 'qrcode' && (
          <QRCodeGenerator />
        )}

        {/* Corrections Tab */}
        {activeTab === 'corrections' && (
          <CorrectionRequest />
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Assignments</h3>
              <div className="grid gap-4">
                {recentAssignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{assignment.title}</h4>
                      <p className="text-sm text-gray-400">{assignment.subject}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-300">Due in {assignment.dueDate}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'submitted' ? 'bg-green-500/20 text-green-400' :
                        assignment.status === 'pending' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {assignment.status}
                      </span>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        {assignment.status === 'submitted' ? 'View' : 'Submit'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <AchievementBadges />
        )}

        {/* Gamification Tab */}
        {activeTab === 'gamification' && (
          <GamificationSystem />
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <StudentProfile user={user} />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;