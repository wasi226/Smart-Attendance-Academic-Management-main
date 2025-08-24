import React, { useState } from 'react';
import { Upload, Camera, Users, BarChart3, Calendar, BookOpen, CheckCircle, AlertCircle, LogOut, Scan, Clock, TrendingUp } from 'lucide-react';
import Header from '../shared/Header';
import StatsCard from '../shared/StatsCard';
import AttendanceUpload from '../features/AttendanceUpload';
import ClassAnalytics from '../features/ClassAnalytics';
import AssignmentUpload from '../features/AssignmentUpload';
import FaceRecognition from '../features/FaceRecognition';
import ProxyDetection from '../features/ProxyDetection';
import ReportsAnalytics from '../features/ReportsAnalytics';

interface TeacherDashboardProps {
  user: any;
  onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [isProcessingAttendance, setIsProcessingAttendance] = useState(false);

  const stats = [
    { icon: Users, label: 'Total Students', value: '156', change: '+12', color: 'blue' },
    { icon: CheckCircle, label: 'Today\'s Attendance', value: '92%', change: '+5%', color: 'green' },
    { icon: BookOpen, label: 'Active Classes', value: '8', change: '+2', color: 'purple' },
    { icon: TrendingUp, label: 'Weekly Average', value: '89%', change: '+3%', color: 'orange' }
  ];

  const todayClasses = [
    { time: '09:00', subject: 'Mathematics', class: 'Class 10A', status: 'completed', attendance: 28 },
    { time: '11:00', subject: 'Physics', class: 'Class 10B', status: 'ongoing', attendance: 0 },
    { time: '14:00', subject: 'Chemistry', class: 'Class 10A', status: 'pending', attendance: 0 },
    { time: '15:30', subject: 'Mathematics', class: 'Class 10C', status: 'pending', attendance: 0 }
  ];

  const recentActivities = [
    { action: 'Uploaded class photo', subject: 'Mathematics - 10A', time: '30 minutes ago', status: 'success' },
    { action: 'Attendance corrected', subject: 'Physics - 10B', time: '2 hours ago', status: 'info' },
    { action: 'Assignment uploaded', subject: 'Chemistry - 10A', time: '1 day ago', status: 'success' },
    { action: 'Proxy detected', subject: 'Mathematics - 10C', time: '2 days ago', status: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'attendance', label: 'Take Attendance', icon: Camera },
            { id: 'face-recognition', label: 'Face Recognition', icon: Users },
            { id: 'assignments', label: 'Assignments', icon: BookOpen },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'proxy', label: 'Proxy Detection', icon: Users },
            { id: 'classes', label: 'My Classes', icon: Users },
            { id: 'reports', label: 'Reports', icon: BarChart3 }
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

            {/* Today's Schedule */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Today's Schedule
              </h3>
              <div className="grid gap-4">
                {todayClasses.map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <Clock className="w-5 h-5 text-blue-400 mb-1" />
                        <span className="text-sm text-gray-300">{class_.time}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{class_.subject}</h4>
                        <p className="text-sm text-gray-400">{class_.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {class_.status === 'completed' && (
                        <span className="text-green-400 text-sm">{class_.attendance} students marked</span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        class_.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        class_.status === 'ongoing' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {class_.status}
                      </span>
                      {class_.status === 'ongoing' && (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Take Attendance
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-400' :
                      activity.status === 'warning' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.subject}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <AttendanceUpload />
        )}

        {/* Face Recognition Tab */}
        {activeTab === 'face-recognition' && (
          <FaceRecognition 
            onFacesDetected={setDetectedFaces}
            isProcessing={isProcessingAttendance}
          />
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <AssignmentUpload />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <ClassAnalytics />
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <ReportsAnalytics />
        )}

        {/* Proxy Detection Tab */}
        {activeTab === 'proxy' && (
          <ProxyDetection />
        )}

        {/* Classes Tab */}
        {activeTab === 'classes' && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">My Classes</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Mathematics - 10A', 'Physics - 10B', 'Chemistry - 10A', 'Mathematics - 10C'].map((className, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <h4 className="font-semibold text-white mb-2">{className}</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>Students: 28-32</p>
                    <p>Avg. Attendance: 89%</p>
                    <p>Last Class: Today, 09:00</p>
                  </div>
                  <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;