import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Users, TrendingUp, FileText, Filter, Eye } from 'lucide-react';

const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'academic' | 'custom'>('attendance');
  const [dateRange, setDateRange] = useState({ start: '2025-01-01', end: '2025-01-31' });
  const [selectedClass, setSelectedClass] = useState('all');

  const attendanceReports = [
    {
      id: '1',
      title: 'Monthly Attendance Summary',
      description: 'Overall attendance statistics for all classes',
      type: 'attendance',
      period: 'January 2025',
      generated: '2025-01-15',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Class 10A Detailed Report',
      description: 'Student-wise attendance breakdown',
      type: 'attendance',
      period: 'January 2025',
      generated: '2025-01-14',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Low Attendance Alert Report',
      description: 'Students with attendance below 75%',
      type: 'alert',
      period: 'January 2025',
      generated: '2025-01-13',
      size: '0.9 MB'
    }
  ];

  const academicReports = [
    {
      id: '4',
      title: 'Grade Distribution Analysis',
      description: 'Subject-wise grade distribution across all classes',
      type: 'academic',
      period: 'Q2 2024-25',
      generated: '2025-01-12',
      size: '3.2 MB'
    },
    {
      id: '5',
      title: 'Performance Trends Report',
      description: 'Student performance trends over the semester',
      type: 'academic',
      period: 'Semester 1',
      generated: '2025-01-10',
      size: '2.7 MB'
    }
  ];

  const analyticsData = {
    attendanceTrends: [
      { month: 'Sep', percentage: 89 },
      { month: 'Oct', percentage: 91 },
      { month: 'Nov', percentage: 87 },
      { month: 'Dec', percentage: 85 },
      { month: 'Jan', percentage: 88 }
    ],
    classComparison: [
      { class: '10A', attendance: 92, performance: 85 },
      { class: '10B', attendance: 88, performance: 82 },
      { class: '10C', attendance: 90, performance: 87 },
      { class: '11A', attendance: 86, performance: 89 },
      { class: '11B', attendance: 91, performance: 84 }
    ],
    subjectPerformance: [
      { subject: 'Mathematics', avgGrade: 3.8, attendance: 89 },
      { subject: 'Physics', avgGrade: 3.6, attendance: 87 },
      { subject: 'Chemistry', avgGrade: 3.9, attendance: 91 },
      { subject: 'English', avgGrade: 3.7, attendance: 93 },
      { subject: 'Biology', avgGrade: 3.5, attendance: 85 }
    ]
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report for ${dateRange.start} to ${dateRange.end}`);
    alert(`${type} report generation started. You will be notified when it's ready.`);
  };

  return (
    <div className="space-y-8">
      {/* Report Generation Controls */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Generate New Report</h3>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
            <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="attendance">Attendance Report</option>
              <option value="academic">Academic Report</option>
              <option value="behavioral">Behavioral Report</option>
              <option value="custom">Custom Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Class/Grade</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="10A">Class 10A</option>
              <option value="10B">Class 10B</option>
              <option value="10C">Class 10C</option>
              <option value="11A">Class 11A</option>
              <option value="11B">Class 11B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => generateReport('Attendance')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Generate Report
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Schedule Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        {[
          { id: 'attendance', label: 'Attendance Reports', icon: Users },
          { id: 'academic', label: 'Academic Reports', icon: BarChart3 },
          { id: 'custom', label: 'Analytics Dashboard', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* Attendance Reports Tab */}
      {activeTab === 'attendance' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Attendance Reports</h3>
          
          <div className="grid gap-4">
            {attendanceReports.map((report) => (
              <div key={report.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Period: {report.period}</span>
                      <span>Generated: {report.generated}</span>
                      <span>Size: {report.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.type === 'alert' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {report.type}
                    </span>
                    <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-400 hover:text-green-300 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academic Reports Tab */}
      {activeTab === 'academic' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Academic Reports</h3>
          
          <div className="grid gap-4">
            {academicReports.map((report) => (
              <div key={report.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Period: {report.period}</span>
                      <span>Generated: {report.generated}</span>
                      <span>Size: {report.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      {report.type}
                    </span>
                    <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-400 hover:text-green-300 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Dashboard Tab */}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          {/* Attendance Trends */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Attendance Trends</h3>
            <div className="grid md:grid-cols-5 gap-4">
              {analyticsData.attendanceTrends.map((data, index) => (
                <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{data.percentage}%</div>
                  <div className="text-sm text-gray-400">{data.month}</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class Comparison */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Class Performance Comparison</h3>
            <div className="space-y-4">
              {analyticsData.classComparison.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="font-medium text-white w-16">{data.class}</div>
                  <div className="flex-1 mx-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Attendance</span>
                      <span className="text-sm text-white">{data.attendance}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${data.attendance}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Performance</span>
                      <span className="text-sm text-white">{data.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${data.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Performance */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Subject-wise Performance</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyticsData.subjectPerformance.map((data, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-white mb-3">{data.subject}</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Avg Grade</span>
                        <span className="text-sm font-medium text-white">{data.avgGrade}/4.0</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full"
                          style={{ width: `${(data.avgGrade / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Attendance</span>
                        <span className="text-sm font-medium text-white">{data.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${data.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;