import React, { useState } from 'react';
import { Users, School, BookOpen, BarChart3, UserPlus, Settings, Shield, Database } from 'lucide-react';
import Header from '../shared/Header';
import StatsCard from '../shared/StatsCard';
import TimetableDetection from '../features/TimetableDetection';
import UserManagement from '../features/UserManagement';
import ClassSubjectManagement from '../features/ClassSubjectManagement';
import ProxyDetection from '../features/ProxyDetection';
import RealTimeNotifications from '../features/RealTimeNotifications';
import SystemSettings from '../features/SystemSettings';
import ReportsAnalytics from '../features/ReportsAnalytics';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Users, label: 'Total Students', value: '2,456', change: '+124', color: 'blue' },
    { icon: School, label: 'Total Teachers', value: '89', change: '+5', color: 'green' },
    { icon: BookOpen, label: 'Active Classes', value: '156', change: '+12', color: 'purple' },
    { icon: BarChart3, label: 'Avg. Attendance', value: '87%', change: '+3%', color: 'orange' }
  ];

  const recentActivity = [
    { action: 'New teacher registered', details: 'Dr. Amanda Wilson - Physics Department', time: '5 minutes ago' },
    { action: 'Class schedule updated', details: 'Grade 10A - Mathematics time changed', time: '1 hour ago' },
    { action: 'Student enrolled', details: 'John Doe added to Grade 9B', time: '2 hours ago' },
    { action: 'Attendance report generated', details: 'Monthly report for all classes', time: '3 hours ago' }
  ];

  const systemStats = [
    { metric: 'Daily Logins', value: '1,234', trend: '+5.2%' },
    { metric: 'Photos Processed', value: '456', trend: '+12.1%' },
    { metric: 'QR Scans', value: '89', trend: '-2.3%' },
    { metric: 'Notifications Sent', value: '2,341', trend: '+18.5%' }
  ];

  const classOverview = [
    { grade: 'Grade 9', sections: 6, students: 180, teachers: 12, avgAttendance: '89%' },
    { grade: 'Grade 10', sections: 6, students: 178, teachers: 12, avgAttendance: '87%' },
    { grade: 'Grade 11', sections: 4, students: 120, teachers: 8, avgAttendance: '85%' },
    { grade: 'Grade 12', sections: 4, students: 116, teachers: 8, avgAttendance: '91%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-800">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'classes', label: 'Classes', icon: School },
            { id: 'proxy', label: 'Proxy Detection', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Database },
            { id: 'timetable', label: 'Timetable', icon: BookOpen },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'system', label: 'System Status', icon: Database },
            { id: 'reports', label: 'Reports', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
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

            {/* System Performance */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">System Performance (Today)</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {systemStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400 mb-2">{stat.metric}</p>
                    <span className={`text-xs font-medium ${
                      stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Overview */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Class Overview</h3>
              <div className="grid gap-4">
                {classOverview.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-6">
                      <h4 className="font-semibold text-white w-20">{grade.grade}</h4>
                      <div className="grid grid-cols-3 gap-6 text-sm text-gray-400">
                        <span>{grade.sections} sections</span>
                        <span>{grade.students} students</span>
                        <span>{grade.teachers} teachers</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold">{grade.avgAttendance}</span>
                      <p className="text-xs text-gray-400">avg. attendance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.details}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <UserManagement />
        )}

        {/* Classes Tab */}
        {activeTab === 'classes' && (
          <ClassSubjectManagement />
        )}

        {/* Proxy Detection Tab */}
        {activeTab === 'proxy' && (
          <ProxyDetection />
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <RealTimeNotifications />
        )}

        {/* Timetable Tab */}
        {activeTab === 'timetable' && (
          <TimetableDetection />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SystemSettings />
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <ReportsAnalytics />
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">System Status & Monitoring</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Face Recognition API</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Proxy Detection</span>
                    <span className="text-green-400 text-sm">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">QR Code Validation</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Database Status
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Connection</span>
                    <span className="text-green-400 text-sm">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Storage Used</span>
                    <span className="text-yellow-400 text-sm">68%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Backup Status</span>
                    <span className="text-green-400 text-sm">Up to date</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Logs */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Recent System Logs
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[
                  { time: '2025-01-15 14:30:22', level: 'INFO', message: 'Face recognition service started successfully' },
                  { time: '2025-01-15 14:25:15', level: 'WARN', message: 'High memory usage detected (85%)' },
                  { time: '2025-01-15 14:20:08', level: 'INFO', message: 'Database backup completed successfully' },
                  { time: '2025-01-15 14:15:33', level: 'ERROR', message: 'Failed to send SMS notification to +1234567890' },
                  { time: '2025-01-15 14:10:45', level: 'INFO', message: 'User login: admin@school.edu' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-4 p-2 bg-white/5 rounded text-sm">
                    <span className="text-gray-400 w-32">{log.time}</span>
                    <span className={`w-12 font-medium ${
                      log.level === 'ERROR' ? 'text-red-400' :
                      log.level === 'WARN' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {log.level}
                    </span>
                    <span className="text-gray-300 flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;