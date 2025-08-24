import React, { useState } from 'react';
import { Clock, Calendar, BookOpen, User, Settings, Plus, Edit, Trash2, CheckCircle } from 'lucide-react';

const TimetableDetection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'detection' | 'settings'>('schedule');
  const [selectedClass, setSelectedClass] = useState('10A');

  const timetable = {
    '10A': {
      Monday: [
        { time: '09:00-10:00', subject: 'Mathematics', teacher: 'Dr. Johnson', room: 'Room 101' },
        { time: '10:00-11:00', subject: 'Physics', teacher: 'Mr. Smith', room: 'Lab 2' },
        { time: '11:30-12:30', subject: 'Chemistry', teacher: 'Dr. Wilson', room: 'Lab 1' },
        { time: '14:00-15:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 205' }
      ],
      Tuesday: [
        { time: '09:00-10:00', subject: 'Physics', teacher: 'Mr. Smith', room: 'Lab 2' },
        { time: '10:00-11:00', subject: 'Mathematics', teacher: 'Dr. Johnson', room: 'Room 101' },
        { time: '11:30-12:30', subject: 'Biology', teacher: 'Dr. Brown', room: 'Lab 3' },
        { time: '14:00-15:00', subject: 'History', teacher: 'Mr. Taylor', room: 'Room 203' }
      ],
      Wednesday: [
        { time: '09:00-10:00', subject: 'Chemistry', teacher: 'Dr. Wilson', room: 'Lab 1' },
        { time: '10:00-11:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 205' },
        { time: '11:30-12:30', subject: 'Mathematics', teacher: 'Dr. Johnson', room: 'Room 101' },
        { time: '14:00-15:00', subject: 'PE', teacher: 'Coach Miller', room: 'Gymnasium' }
      ],
      Thursday: [
        { time: '09:00-10:00', subject: 'Biology', teacher: 'Dr. Brown', room: 'Lab 3' },
        { time: '10:00-11:00', subject: 'History', teacher: 'Mr. Taylor', room: 'Room 203' },
        { time: '11:30-12:30', subject: 'Physics', teacher: 'Mr. Smith', room: 'Lab 2' },
        { time: '14:00-15:00', subject: 'Art', teacher: 'Ms. Garcia', room: 'Art Room' }
      ],
      Friday: [
        { time: '09:00-10:00', subject: 'Mathematics', teacher: 'Dr. Johnson', room: 'Room 101' },
        { time: '10:00-11:00', subject: 'Chemistry', teacher: 'Dr. Wilson', room: 'Lab 1' },
        { time: '11:30-12:30', subject: 'English', teacher: 'Ms. Davis', room: 'Room 205' },
        { time: '14:00-15:00', subject: 'Computer Science', teacher: 'Mr. Anderson', room: 'Computer Lab' }
      ]
    }
  };

  const detectionHistory = [
    {
      id: 1,
      timestamp: '2025-01-15 09:05:23',
      detectedSubject: 'Mathematics',
      confidence: 98.5,
      teacher: 'Dr. Johnson',
      class: '10A',
      status: 'confirmed',
      studentsMarked: 28
    },
    {
      id: 2,
      timestamp: '2025-01-15 10:02:15',
      detectedSubject: 'Physics',
      confidence: 95.2,
      teacher: 'Mr. Smith',
      class: '10A',
      status: 'confirmed',
      studentsMarked: 26
    },
    {
      id: 3,
      timestamp: '2025-01-14 14:08:45',
      detectedSubject: 'English',
      confidence: 92.1,
      teacher: 'Ms. Davis',
      class: '10A',
      status: 'manual_override',
      studentsMarked: 30
    },
    {
      id: 4,
      timestamp: '2025-01-14 11:35:12',
      detectedSubject: 'Chemistry',
      confidence: 89.7,
      teacher: 'Dr. Wilson',
      class: '10A',
      status: 'confirmed',
      studentsMarked: 29
    }
  ];

  const getCurrentClass = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todaySchedule = timetable[selectedClass as keyof typeof timetable]?.[currentDay as keyof typeof timetable['10A']] || [];
    
    for (const period of todaySchedule) {
      const [startTime, endTime] = period.time.split('-');
      if (currentTime >= startTime && currentTime <= endTime) {
        return period;
      }
    }
    return null;
  };

  const currentClass = getCurrentClass();

  return (
    <div className="space-y-8">
      {/* Current Detection Status */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Clock className="w-6 h-6 mr-2" />
          Auto-Detection Status
        </h3>
        
        {currentClass ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Currently Detected</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subject:</span>
                  <span className="text-white font-medium">{currentClass.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Teacher:</span>
                  <span className="text-white font-medium">{currentClass.teacher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white font-medium">{currentClass.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Room:</span>
                  <span className="text-white font-medium">{currentClass.room}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Detection Confidence</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-green-400 font-bold">96.8%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: '96.8%' }}></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Auto-detection active</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">No Active Class</h4>
            <p className="text-gray-400">No scheduled class at this time</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        {[
          { id: 'schedule', label: 'Class Schedule', icon: Calendar },
          { id: 'detection', label: 'Detection History', icon: Clock },
          { id: 'settings', label: 'Settings', icon: Settings }
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

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Weekly Timetable
            </h3>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10A">Class 10A</option>
              <option value="10B">Class 10B</option>
              <option value="10C">Class 10C</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                  {Object.keys(timetable[selectedClass as keyof typeof timetable] || {}).map(day => (
                    <th key={day} className="text-center py-3 px-4 text-gray-400 font-medium">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['09:00-10:00', '10:00-11:00', '11:30-12:30', '14:00-15:00'].map((timeSlot, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 px-4 text-gray-300 font-medium">{timeSlot}</td>
                    {Object.entries(timetable[selectedClass as keyof typeof timetable] || {}).map(([day, periods]) => {
                      const period = periods.find(p => p.time === timeSlot);
                      return (
                        <td key={day} className="py-4 px-4 text-center">
                          {period ? (
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                              <div className="font-semibold text-white text-sm">{period.subject}</div>
                              <div className="text-xs text-gray-400 mt-1">{period.teacher}</div>
                              <div className="text-xs text-gray-500">{period.room}</div>
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detection History Tab */}
      {activeTab === 'detection' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2" />
            Auto-Detection History
          </h3>

          <div className="space-y-4">
            {detectionHistory.map((detection) => (
              <div key={detection.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{detection.detectedSubject}</h4>
                    <p className="text-sm text-gray-400">
                      {new Date(detection.timestamp).toLocaleString()} • {detection.teacher}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">
                      {detection.studentsMarked} students marked
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      detection.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      detection.status === 'manual_override' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {detection.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">Confidence:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            detection.confidence >= 95 ? 'bg-green-500' :
                            detection.confidence >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${detection.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-white">{detection.confidence}%</span>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Auto-Detection Settings
          </h3>

          <div className="space-y-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Detection Parameters</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Confidence Threshold
                  </label>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    defaultValue="85"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>70%</span>
                    <span>85%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time Window (minutes)
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="5">±5 minutes</option>
                    <option value="10">±10 minutes</option>
                    <option value="15">±15 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Notification Settings</h4>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                  <span className="text-gray-300">Notify when detection confidence is low</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                  <span className="text-gray-300">Send alerts for schedule conflicts</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                  <span className="text-gray-300">Auto-confirm high confidence detections</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                Reset to Default
              </button>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableDetection;