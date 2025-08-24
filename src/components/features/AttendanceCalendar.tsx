import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, X, AlertCircle } from 'lucide-react';

const AttendanceCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock attendance data
  const attendanceData: { [key: string]: 'present' | 'absent' | 'late' } = {
    '2025-01-15': 'present',
    '2025-01-14': 'present', 
    '2025-01-13': 'absent',
    '2025-01-10': 'present',
    '2025-01-09': 'late',
    '2025-01-08': 'present',
    '2025-01-07': 'present',
    '2025-01-06': 'absent',
    '2025-01-03': 'present',
    '2025-01-02': 'present'
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getAttendanceStatus = (date: Date) => {
    return attendanceData[formatDate(date)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'late': return 'bg-yellow-500';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <X className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const attendanceStats = {
    present: Object.values(attendanceData).filter(status => status === 'present').length,
    absent: Object.values(attendanceData).filter(status => status === 'absent').length,
    late: Object.values(attendanceData).filter(status => status === 'late').length,
    total: Object.values(attendanceData).length
  };

  const attendancePercentage = Math.round((attendanceStats.present / attendanceStats.total) * 100);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">{attendanceStats.present}</div>
          <div className="text-sm text-gray-300">Present Days</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">{attendanceStats.absent}</div>
          <div className="text-sm text-gray-300">Absent Days</div>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">{attendanceStats.late}</div>
          <div className="text-sm text-gray-300">Late Days</div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">{attendancePercentage}%</div>
          <div className="text-sm text-gray-300">Attendance Rate</div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Calendar className="w-6 h-6 mr-2" />
            Attendance Calendar
          </h3>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-semibold text-white min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getDaysInMonth(currentDate).map((day, index) => {
            if (!day) {
              return <div key={index} className="h-12"></div>;
            }

            const status = getAttendanceStatus(day);
            const isSelected = selectedDate && formatDate(day) === formatDate(selectedDate);
            const isToday = formatDate(day) === formatDate(new Date());

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`h-12 rounded-lg border transition-all relative ${
                  isSelected
                    ? 'border-white bg-white/20'
                    : 'border-white/10 hover:border-white/30 hover:bg-white/10'
                } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
              >
                <div className="text-center">
                  <span className={`text-sm font-medium ${isToday ? 'text-blue-400' : 'text-white'}`}>
                    {day.getDate()}
                  </span>
                  {status && (
                    <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${getStatusColor(status)}`}></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h4 className="font-semibold text-white mb-4">Legend</h4>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Present</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Absent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Late</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-400 rounded-full bg-transparent"></div>
            <span className="text-gray-300">Today</span>
          </div>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h4 className="font-semibold text-white mb-4">
            Details for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          {getAttendanceStatus(selectedDate) ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  getStatusColor(getAttendanceStatus(selectedDate))
                }`}>
                  {getStatusIcon(getAttendanceStatus(selectedDate))}
                </div>
                <span className="text-white font-medium capitalize">
                  {getAttendanceStatus(selectedDate)}
                </span>
              </div>
              
              {getAttendanceStatus(selectedDate) === 'absent' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm">
                    You were absent on this day. If this is incorrect, you can request a correction.
                  </p>
                  <button className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Request Correction
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400">No attendance record for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceCalendar;