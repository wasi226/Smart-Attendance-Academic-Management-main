import React, { useState } from 'react';
import { User, Bell, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock, Phone } from 'lucide-react';
import Header from '../shared/Header';
import StatsCard from '../shared/StatsCard';
import NotificationCenter from '../features/NotificationCenter';
import ParentCommunication from '../features/ParentCommunication';

interface ParentDashboardProps {
  user: any;
  onLogout: () => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ user, onLogout }) => {
  const [activeChild, setActiveChild] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const children = [
    { 
      id: 1, 
      name: 'Alex Chen', 
      class: '10A', 
      rollNo: '2024001',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    { 
      id: 2, 
      name: 'Emily Chen', 
      class: '8B', 
      rollNo: '2024234',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const currentChild = children[activeChild];

  const stats = [
    { icon: CheckCircle, label: 'This Month', value: '87%', change: '+2%', color: 'green' },
    { icon: AlertTriangle, label: 'Absences', value: '4', change: '-1', color: 'red' },
    { icon: TrendingUp, label: 'Average Grade', value: 'A-', change: '+0.2', color: 'blue' },
    { icon: Calendar, label: 'Days Present', value: '18/22', change: '+2', color: 'purple' }
  ];

  const recentAlerts = [
    { 
      type: 'absent', 
      message: `${currentChild.name} was absent from Mathematics class`, 
      time: '2 hours ago',
      severity: 'high'
    },
    { 
      type: 'assignment', 
      message: 'New assignment uploaded in Physics', 
      time: '1 day ago',
      severity: 'low'
    },
    { 
      type: 'grade', 
      message: 'Grade updated for Chemistry Quiz - A+', 
      time: '2 days ago',
      severity: 'positive'
    },
    { 
      type: 'fee', 
      message: 'Monthly fee payment reminder', 
      time: '3 days ago',
      severity: 'medium'
    }
  ];

  const weeklySchedule = [
    { day: 'Monday', classes: ['Math', 'Physics', 'Chemistry', 'English'], attendance: '4/4' },
    { day: 'Tuesday', classes: ['Physics', 'Math', 'Biology', 'History'], attendance: '3/4' },
    { day: 'Wednesday', classes: ['Chemistry', 'English', 'Math', 'PE'], attendance: '4/4' },
    { day: 'Thursday', classes: ['Biology', 'History', 'Physics', 'Art'], attendance: '4/4' },
    { day: 'Friday', classes: ['Math', 'Chemistry', 'English', 'Computer'], attendance: '2/4' }
  ];

  const performanceData = [
    { subject: 'Mathematics', grade: 'A', attendance: '92%', lastTest: '85/100' },
    { subject: 'Physics', grade: 'A-', attendance: '88%', lastTest: '78/100' },
    { subject: 'Chemistry', grade: 'A+', attendance: '95%', lastTest: '92/100' },
    { subject: 'English', grade: 'B+', attendance: '85%', lastTest: '76/100' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-6 py-8">
        {/* Child Selection */}
        <div className="flex space-x-4 mb-8">
          {children.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setActiveChild(index)}
              className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                activeChild === index
                  ? 'bg-white/20 border-2 border-purple-400'
                  : 'bg-white/10 border-2 border-transparent hover:bg-white/15'
              }`}
            >
              <img 
                src={child.avatar} 
                alt={child.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h3 className="font-semibold text-white">{child.name}</h3>
                <p className="text-sm text-gray-400">Class {child.class} • {child.rollNo}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'attendance', label: 'Attendance', icon: Calendar },
            { id: 'performance', label: 'Performance', icon: CheckCircle },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'communication', label: 'Communication', icon: Bell }
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

            {/* Quick Contact */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <div className="text-left">
                    <p className="font-semibold text-white">Contact Teacher</p>
                    <p className="text-xs text-gray-400">Schedule a meeting</p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors">
                  <Bell className="w-6 h-6 text-green-400" />
                  <div className="text-left">
                    <p className="font-semibold text-white">Notification Settings</p>
                    <p className="text-xs text-gray-400">Manage alerts</p>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <div className="text-left">
                    <p className="font-semibold text-white">View Calendar</p>
                    <p className="text-xs text-gray-400">Upcoming events</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Weekly Attendance Overview</h3>
              <div className="grid gap-4">
                {weeklySchedule.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 text-center">
                        <span className="font-semibold text-white">{day.day}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {day.classes.map((subject, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-semibold ${
                        day.attendance.split('/')[0] === day.attendance.split('/')[1] 
                          ? 'text-green-400' 
                          : 'text-yellow-400'
                      }`}>
                        {day.attendance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Academic Performance</h3>
            <div className="grid gap-6">
              {performanceData.map((subject, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">{subject.subject}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subject.grade.startsWith('A') ? 'bg-green-500/20 text-green-400' :
                      subject.grade.startsWith('B') ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      Grade: {subject.grade}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Attendance: </span>
                      <span className="text-white font-medium">{subject.attendance}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Test: </span>
                      <span className="text-white font-medium">{subject.lastTest}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <NotificationCenter />
        )}

        {/* Communication Tab */}
        {activeTab === 'communication' && (
          <ParentCommunication />
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;