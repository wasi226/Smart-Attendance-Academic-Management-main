import React, { useState } from 'react';
import { Bell, Settings, Phone, Mail, MessageSquare, Check, X, Clock, AlertTriangle } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [notificationSettings, setNotificationSettings] = useState({
    attendance: {
      email: true,
      sms: true,
      whatsapp: false,
      push: true
    },
    assignments: {
      email: true,
      sms: false,
      whatsapp: true,
      push: true
    },
    grades: {
      email: true,
      sms: true,
      whatsapp: true,
      push: true
    },
    announcements: {
      email: false,
      sms: false,
      whatsapp: true,
      push: true
    }
  });

  const notifications = [
    {
      id: 1,
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Alex was absent from Mathematics class today',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      actions: ['Contact Teacher', 'Mark as Read']
    },
    {
      id: 2,
      type: 'assignment',
      title: 'New Assignment',
      message: 'Physics Lab Report has been uploaded for Class 10A',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      actions: ['View Assignment', 'Mark as Read']
    },
    {
      id: 3,
      type: 'grade',
      title: 'Grade Updated',
      message: 'Chemistry Quiz grade has been updated - A+',
      time: '1 day ago',
      read: true,
      priority: 'low',
      actions: ['View Details', 'Mark as Read']
    },
    {
      id: 4,
      type: 'announcement',
      title: 'School Announcement',
      message: 'Parent-Teacher meeting scheduled for January 25th',
      time: '2 days ago',
      read: true,
      priority: 'medium',
      actions: ['View Details', 'Mark as Read']
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'Face recognition system will be updated tonight',
      time: '3 days ago',
      read: true,
      priority: 'low',
      actions: ['Learn More', 'Mark as Read']
    }
  ];

  const handleSettingChange = (category: string, method: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [method]: value
      }
    }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'attendance': return <Clock className="w-5 h-5" />;
      case 'assignment': return <MessageSquare className="w-5 h-5" />;
      case 'grade': return <Check className="w-5 h-5" />;
      case 'announcement': return <Bell className="w-5 h-5" />;
      case 'system': return <Settings className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-500/10';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'low': return 'border-blue-500/30 bg-blue-500/10';
      default: return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">{unreadCount}</div>
          <div className="text-sm text-gray-300">Unread</div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">12</div>
          <div className="text-sm text-gray-300">Today</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">3</div>
          <div className="text-sm text-gray-300">High Priority</div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">89%</div>
          <div className="text-sm text-gray-300">Delivery Rate</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'notifications'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'settings'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Bell className="w-6 h-6 mr-2" />
              Recent Notifications
            </h3>
            <div className="flex space-x-2">
              <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Mark All Read
              </button>
              <button className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border transition-all hover:bg-white/5 ${
                  notification.read ? 'bg-white/5 border-white/10' : getPriorityColor(notification.priority)
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    notification.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    notification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {notification.priority === 'high' && (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-3 ${notification.read ? 'text-gray-400' : 'text-gray-300'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      {notification.actions.map((action, index) => (
                        <button
                          key={index}
                          className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Notification Preferences
            </h3>

            <div className="space-y-8">
              {Object.entries(notificationSettings).map(([category, settings]) => (
                <div key={category} className="border-b border-white/10 pb-6 last:border-b-0">
                  <h4 className="font-semibold text-white mb-4 capitalize">
                    {category} Notifications
                  </h4>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">Email</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.email}
                          onChange={(e) => handleSettingChange(category, 'email', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-300">SMS</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.sms}
                          onChange={(e) => handleSettingChange(category, 'sms', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-300">WhatsApp</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.whatsapp}
                          onChange={(e) => handleSettingChange(category, 'whatsapp', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">Push</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.push}
                          onChange={(e) => handleSettingChange(category, 'push', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                Reset to Default
              </button>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                Save Preferences
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="parent@example.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Update Contact Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;