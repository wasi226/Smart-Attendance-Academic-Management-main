import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Calendar, User, Send, Paperclip, Video, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderRole: 'teacher' | 'parent' | 'admin';
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

interface Meeting {
  id: string;
  title: string;
  teacher: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const ParentCommunication: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'meetings' | 'compose'>('messages');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Dr. Sarah Johnson',
      senderRole: 'teacher',
      recipient: 'Parent',
      subject: 'Alex\'s Progress in Mathematics',
      content: 'I wanted to update you on Alex\'s excellent progress in Mathematics. He has shown significant improvement in calculus and is consistently scoring above 90% on recent tests.',
      timestamp: '2025-01-15 14:30:00',
      read: false
    },
    {
      id: '2',
      sender: 'Mr. David Smith',
      senderRole: 'teacher',
      recipient: 'Parent',
      subject: 'Physics Lab Performance',
      content: 'Alex demonstrated exceptional understanding during our recent physics lab on wave motion. His experimental approach and data analysis were particularly impressive.',
      timestamp: '2025-01-14 10:15:00',
      read: true
    },
    {
      id: '3',
      sender: 'School Administration',
      senderRole: 'admin',
      recipient: 'Parent',
      subject: 'Parent-Teacher Conference Reminder',
      content: 'This is a reminder that the parent-teacher conference is scheduled for January 25th at 3:00 PM. Please confirm your attendance.',
      timestamp: '2025-01-13 09:00:00',
      read: true
    }
  ];

  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Mathematics Progress Discussion',
      teacher: 'Dr. Sarah Johnson',
      date: '2025-01-25',
      time: '15:00',
      type: 'in-person',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Physics Lab Review',
      teacher: 'Mr. David Smith',
      date: '2025-01-20',
      time: '14:30',
      type: 'video',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'General Academic Review',
      teacher: 'Ms. Emily Davis',
      date: '2025-01-10',
      time: '16:00',
      type: 'in-person',
      status: 'completed',
      notes: 'Discussed Alex\'s overall performance. Recommended additional reading for English literature.'
    }
  ];

  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
    attachments: [] as File[]
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message sending logic here
    console.log('Sending message:', newMessage);
    setNewMessage({ recipient: '', subject: '', content: '', attachments: [] });
  };

  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewMessage({ ...newMessage, attachments: [...newMessage.attachments, ...files] });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Communication Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{messages.length}</div>
          <div className="text-sm text-gray-300">Total Messages</div>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{messages.filter(m => !m.read).length}</div>
          <div className="text-sm text-gray-300">Unread</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
          <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{meetings.filter(m => m.status === 'scheduled').length}</div>
          <div className="text-sm text-gray-300">Upcoming Meetings</div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{meetings.filter(m => m.status === 'completed').length}</div>
          <div className="text-sm text-gray-300">Completed</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        {[
          { id: 'messages', label: 'Messages', icon: MessageSquare },
          { id: 'meetings', label: 'Meetings', icon: Calendar },
          { id: 'compose', label: 'Compose', icon: Send }
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
              {tab.id === 'messages' && messages.filter(m => !m.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="md:col-span-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Messages</h3>
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? 'bg-blue-500/20 border-blue-500/30'
                      : message.read
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{message.sender}</h4>
                    {!message.read && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mb-2 line-clamp-1">{message.subject}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            {selectedMessage ? (
              <div>
                <div className="border-b border-white/20 pb-4 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedMessage.subject}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>From: {selectedMessage.sender}</span>
                    <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">{selectedMessage.content}</p>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Reply
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Forward
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Select a Message</h4>
                <p className="text-gray-400">Choose a message from the list to read its content</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Scheduled Meetings</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Schedule Meeting
            </button>
          </div>

          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{meeting.title}</h4>
                    <p className="text-sm text-gray-400">with {meeting.teacher}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(meeting.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    {getMeetingTypeIcon(meeting.type)}
                    <span className="capitalize">{meeting.type}</span>
                  </div>
                </div>

                {meeting.notes && (
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <h5 className="font-medium text-white mb-1">Notes:</h5>
                    <p className="text-sm text-gray-300">{meeting.notes}</p>
                  </div>
                )}

                {meeting.status === 'scheduled' && (
                  <div className="flex space-x-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Join Meeting
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Reschedule
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">Compose Message</h3>

          <form onSubmit={handleSendMessage} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To (Teacher/Administrator)
              </label>
              <select
                value={newMessage.recipient}
                onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select recipient</option>
                <option value="dr-johnson">Dr. Sarah Johnson (Mathematics)</option>
                <option value="mr-smith">Mr. David Smith (Physics)</option>
                <option value="ms-davis">Ms. Emily Davis (English)</option>
                <option value="admin">School Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter message subject"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                rows={8}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">Drag and drop files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileAttachment}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose Files
                </label>
              </div>
              {newMessage.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {newMessage.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 px-3 py-2 rounded">
                      <span className="text-sm text-gray-300">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setNewMessage({
                          ...newMessage,
                          attachments: newMessage.attachments.filter((_, i) => i !== index)
                        })}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ParentCommunication;