import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, Calendar, AlertTriangle } from 'lucide-react';

const ClassAnalytics: React.FC = () => {
  const classData = [
    { name: 'Math - 10A', students: 32, avgAttendance: 92, trend: '+5%', lastClass: '89%' },
    { name: 'Physics - 10B', students: 28, avgAttendance: 87, trend: '+2%', lastClass: '85%' },
    { name: 'Chemistry - 10A', students: 30, avgAttendance: 85, trend: '-1%', lastClass: '90%' },
    { name: 'Math - 10C', students: 29, avgAttendance: 88, trend: '+3%', lastClass: '86%' }
  ];

  const weeklyData = [
    { day: 'Mon', attendance: 89 },
    { day: 'Tue', attendance: 92 },
    { day: 'Wed', attendance: 87 },
    { day: 'Thu', attendance: 91 },
    { day: 'Fri', attendance: 85 }
  ];

  const topPerformers = [
    { name: 'Alex Chen', attendance: 100, streak: 45 },
    { name: 'Sarah Johnson', attendance: 98, streak: 38 },
    { name: 'Mike Rodriguez', attendance: 96, streak: 42 },
    { name: 'Emma Wilson', attendance: 95, streak: 35 },
    { name: 'David Lee', attendance: 94, streak: 28 }
  ];

  const attendanceAlerts = [
    { student: 'John Doe', issue: 'Low attendance (65%)', severity: 'high', class: 'Math - 10A' },
    { student: 'Jane Smith', issue: 'Absent for 3 days', severity: 'medium', class: 'Physics - 10B' },
    { student: 'Bob Wilson', issue: 'Declining trend', severity: 'low', class: 'Chemistry - 10A' }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-sm text-green-400">+2.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">119</h3>
          <p className="text-gray-400 text-sm">Total Students</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-green-400" />
            <span className="text-sm text-green-400">+1.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">88%</h3>
          <p className="text-gray-400 text-sm">Average Attendance</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-400" />
            <span className="text-sm text-red-400">-0.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">12</h3>
          <p className="text-gray-400 text-sm">Late Arrivals Today</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
            <span className="text-sm text-yellow-400">3 new</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">7</h3>
          <p className="text-gray-400 text-sm">Students at Risk</p>
        </div>
      </div>

      {/* Class Performance */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Class Performance Overview
        </h3>
        
        <div className="grid gap-4">
          {classData.map((classItem, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{classItem.name}</h4>
                  <p className="text-sm text-gray-400">{classItem.students} students</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white">{classItem.avgAttendance}%</span>
                  <p className={`text-sm font-medium ${
                    classItem.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {classItem.trend}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        classItem.avgAttendance >= 90 ? 'bg-green-500' :
                        classItem.avgAttendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${classItem.avgAttendance}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  Last class: {classItem.lastClass}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Weekly Trend */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Weekly Attendance Trend
          </h3>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 font-medium w-12">{day.day}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${day.attendance}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-white font-semibold w-12 text-right">{day.attendance}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">
              <strong>Insight:</strong> Tuesday shows highest attendance. Consider scheduling important topics on this day.
            </p>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Top Performers
          </h3>
          
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.streak} day streak</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  student.attendance === 100 ? 'text-green-400' :
                  student.attendance >= 95 ? 'text-blue-400' : 'text-yellow-400'
                }`}>
                  {student.attendance}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Alerts */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2" />
          Attendance Alerts
        </h3>
        
        <div className="space-y-4">
          {attendanceAlerts.map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              alert.severity === 'high' ? 'bg-red-500/20 border-red-500/30' :
              alert.severity === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30' :
              'bg-blue-500/20 border-blue-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">{alert.student}</h4>
                  <p className="text-sm text-gray-300">{alert.class}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    alert.severity === 'high' ? 'text-red-400' :
                    alert.severity === 'medium' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}>
                    {alert.issue}
                  </span>
                  <div className="mt-1">
                    <button className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors">
                      Contact Parent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassAnalytics;