import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, Mail, Phone, Send, Settings, Users, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'attendance' | 'assignment' | 'announcement' | 'alert';
  title: string;
  message: string;
  recipients: string[];
  channels: ('email' | 'sms' | 'whatsapp' | 'push')[];
  status: 'pending' | 'sent' | 'failed';
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

const RealTimeNotifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'history' | 'templates'>('send');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Your child Alex was absent from Mathematics class today.',
      recipients: ['parent1@example.com', '+1234567890'],
      channels: ['email', 'sms'],
      status: 'sent',
      timestamp: '2025-01-15 14:30:00',
      priority: 'high'
    },
    {
      id: '2',
      type: 'assignment',
      title: 'New Assignment',
      message: 'A new Physics assignment has been uploaded. Due date: January 20th.',
      recipients: ['student1@example.com', 'parent1@example.com'],
      channels: ['email', 'push'],
      status: 'sent',
      timestamp: '2025-01-15 10:15:00',
      priority: 'medium'
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    type: 'attendance' as const,
    title: '',
    message: '',
    recipients: [] as string[],
    channels: [] as ('email' | 'sms' | 'whatsapp' | 'push')[],
    priority: 'medium' as const
  });

  const [recipientInput, setRecipientInput] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time connection
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate connection status
      setIsConnected(Math.random() > 0.1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotification,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    setNotifications([notification, ...notifications]);

    // Simulate sending
    setTimeout(() => {
      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id
            ? { ...n, status: Math.random() > 0.1 ? 'sent' : 'failed' }
            : n
        )
      );
    }, 2000);

    // Reset form
    setNewNotification({
      type: 'attendance',
      title: '',
      message: '',
      recipients: [],
      channels: [],
      priority: 'medium'
    });
  };

  const addRecipient = () => {
    if (recipientInput.trim() && !newNotification.recipients.includes(recipientInput.trim())) {
      setNewNotification({
        ...newNotification,
        recipients: [...newNotification.recipients, recipientInput.trim()]
      });
      setRecipientInput('');
    }
  };

  const removeRecipient = (recipient: string) => {
    setNewNotification({
      ...newNotification,
      recipients: newNotification.recipients.filter(r => r !== recipient)
    });
  };

  const toggleChannel = (channel: 'email' | 'sms' | 'whatsapp' | 'push') => {
    const channels = newNotification.channels.includes(channel)
      ? newNotification.channels.filter(c => c !== channel)
      : [...newNotification.channels, channel];
    
    setNewNotification({ ...newNotification, channels });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const stats = {
    totalSent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    failed: notifications.filter(n => n.status === 'failed').length,
    deliveryRate: Math.round((notifications.filter(n => n.status === 'sent').length / notifications.length) * 100) || 0
  };

  return (
    <div className="space-y-8">
      {/* Connection Status */}
      <div className={`p-4 rounded-lg border ${
        isConnected 
          ? 'bg-green-500/20 border-green-500/30' 
          : 'bg-red-500/20 border-red-500/30'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-400' : 'bg-red-400'
          }`}></div>
          <span className={`font-medium ${
            isConnected ? 'text-green-400' : 'text-red-400'
          }`}>
            {isConnected ? 'Connected to notification services' : 'Connection issues detected'}
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <Send className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{stats.totalSent}</div>
          <div className="text-xs text-gray-400">Sent Today</div>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-yellow-400">{stats.pending}</div>
          <div className="text-xs text-gray-300">Pending</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-red-400">{stats.failed}</div>
          <div className="text-xs text-gray-300">Failed</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-green-400">{stats.deliveryRate}%</div>
          <div className="text-xs text-gray-300">Delivery Rate</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        {[
          { id: 'send', label: 'Send Notification', icon: Send },
          { id: 'history', label: 'History', icon: Clock },
          { id: 'templates', label: 'Templates', icon: MessageSquare }
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

      {/* Send Notification Tab */}
      {activeTab === 'send' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Send className="w-7 h-7 mr-3" />
            Send New Notification
          </h3>

          <form onSubmit={handleSendNotification} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notification Type
                </label>
                <select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({
                    ...newNotification,
                    type: e.target.value as any
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="attendance">Attendance Alert</option>
                  <option value="assignment">Assignment Notification</option>
                  <option value="announcement">General Announcement</option>
                  <option value="alert">Emergency Alert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority Level
                </label>
                <select
                  value={newNotification.priority}
                  onChange={(e) => setNewNotification({
                    ...newNotification,
                    priority: e.target.value as any
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newNotification.title}
                onChange={(e) => setNewNotification({
                  ...newNotification,
                  title: e.target.value
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notification title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={newNotification.message}
                onChange={(e) => setNewNotification({
                  ...newNotification,
                  message: e.target.value
                })}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipients
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email or phone number"
                />
                <button
                  type="button"
                  onClick={addRecipient}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newNotification.recipients.map((recipient, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{recipient}</span>
                    <button
                      type="button"
                      onClick={() => removeRecipient(recipient)}
                      className="text-blue-300 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Delivery Channels
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'email', label: 'Email', icon: Mail, color: 'blue' },
                  { id: 'sms', label: 'SMS', icon: Phone, color: 'green' },
                  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'green' },
                  { id: 'push', label: 'Push', icon: Bell, color: 'purple' }
                ].map((channel) => {
                  const Icon = channel.icon;
                  const isSelected = newNotification.channels.includes(channel.id as any);
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => toggleChannel(channel.id as any)}
                      className={`p-4 rounded-lg border transition-all ${
                        isSelected
                          ? `bg-${channel.color}-500/20 border-${channel.color}-500/30 text-${channel.color}-400`
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{channel.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={!isConnected}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Notification</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2" />
            Notification History
          </h3>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{notification.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{new Date(notification.timestamp).toLocaleString()}</span>
                      <span>{notification.recipients.length} recipients</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Channels:</span>
                  {notification.channels.map((channel, index) => (
                    <span key={index} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2" />
            Message Templates
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Attendance Alert',
                message: 'Your child {student_name} was absent from {subject} class today at {time}.',
                type: 'attendance'
              },
              {
                title: 'Assignment Reminder',
                message: 'Reminder: {assignment_name} is due on {due_date}. Please ensure your child completes it on time.',
                type: 'assignment'
              },
              {
                title: 'Grade Update',
                message: '{student_name} received a grade of {grade} in {subject}. Great work!',
                type: 'grade'
              },
              {
                title: 'Meeting Notice',
                message: 'Parent-teacher meeting scheduled for {date} at {time}. Please confirm your attendance.',
                type: 'announcement'
              }
            ].map((template, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">{template.title}</h4>
                <p className="text-sm text-gray-300 mb-4">{template.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    {template.type}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeNotifications;