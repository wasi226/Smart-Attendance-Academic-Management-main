import React, { useState } from 'react';
import { AlertCircle, Calendar, Clock, CheckCircle, X, Send, FileText } from 'lucide-react';
import { apiService } from '../../services/api';

const CorrectionRequest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'request' | 'history'>('request');
  const [requestData, setRequestData] = useState({
    date: '',
    subject: '',
    reason: '',
    evidence: '',
    description: ''
  });

  const correctionHistory = [
    {
      id: 1,
      date: '2025-01-15',
      subject: 'Mathematics',
      reason: 'Present but marked absent',
      status: 'approved',
      requestDate: '2025-01-15',
      responseDate: '2025-01-16',
      adminNote: 'Verified with class photo. Attendance corrected.'
    },
    {
      id: 2,
      date: '2025-01-10',
      subject: 'Physics',
      reason: 'Late arrival not recorded',
      status: 'pending',
      requestDate: '2025-01-11',
      responseDate: null,
      adminNote: null
    },
    {
      id: 3,
      date: '2025-01-08',
      subject: 'Chemistry',
      reason: 'System error during face recognition',
      status: 'rejected',
      requestDate: '2025-01-09',
      responseDate: '2025-01-10',
      adminNote: 'No evidence found in class photo. Request denied.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    
    const correctionData = {
      attendanceId: 'mock-attendance-id', // This should be the actual attendance record ID
      reason: requestData.reason,
      description: requestData.description,
      evidence: requestData.evidence
    };

    apiService.createCorrectionRequest(correctionData)
      .then(() => {
        alert('Correction request submitted successfully!');
        setRequestData({
          date: '',
          subject: '',
          reason: '',
          evidence: '',
          description: ''
        });
      })
      .catch(error => {
        console.error('Failed to submit correction request:', error);
        alert('Failed to submit correction request. Please try again.');
      });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        <button
          onClick={() => setActiveTab('request')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'request'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Send className="w-5 h-5" />
          <span>New Request</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Request History</span>
        </button>
      </div>

      {/* New Request Tab */}
      {activeTab === 'request' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <AlertCircle className="w-7 h-7 mr-3" />
            Request Attendance Correction
          </h3>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-400 mb-1">Important Guidelines</h4>
                <ul className="text-sm text-yellow-200 space-y-1">
                  <li>• Correction requests must be submitted within 7 days of the class</li>
                  <li>• Provide clear evidence or explanation for the correction</li>
                  <li>• False requests may result in disciplinary action</li>
                  <li>• Processing time is typically 1-2 business days</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Class *
                </label>
                <input
                  type="date"
                  name="date"
                  value={requestData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={requestData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Reason for Correction *
              </label>
              <select
                name="reason"
                value={requestData.reason}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Reason</option>
                <option value="present_marked_absent">I was present but marked absent</option>
                <option value="late_not_recorded">Late arrival not recorded properly</option>
                <option value="early_departure">Early departure with permission</option>
                <option value="system_error">System/Technical error</option>
                <option value="proxy_false_positive">False proxy detection</option>
                <option value="other">Other (please specify)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                value={requestData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide a detailed explanation of what happened and why your attendance should be corrected..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Supporting Evidence (Optional)
              </label>
              <textarea
                name="evidence"
                value={requestData.evidence}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional evidence or witness information that supports your request..."
              />
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
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            Correction Request History
          </h3>

          <div className="space-y-4">
            {correctionHistory.map((request) => (
              <div key={request.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {request.subject} - {new Date(request.date).toLocaleDateString()}
                    </h4>
                    <p className="text-sm text-gray-400">{request.reason}</p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="text-sm font-medium capitalize">{request.status}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Request Date:</span>
                    <span className="text-white ml-2">{new Date(request.requestDate).toLocaleDateString()}</span>
                  </div>
                  {request.responseDate && (
                    <div>
                      <span className="text-gray-400">Response Date:</span>
                      <span className="text-white ml-2">{new Date(request.responseDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {request.adminNote && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <h5 className="text-sm font-medium text-gray-300 mb-1">Admin Response:</h5>
                    <p className="text-sm text-gray-400">{request.adminNote}</p>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="mt-4 flex items-center space-x-2 text-sm text-yellow-400">
                    <Clock className="w-4 h-4" />
                    <span>Your request is being reviewed by the administration</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {correctionHistory.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">No Requests Yet</h4>
              <p className="text-gray-400">You haven't submitted any correction requests.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CorrectionRequest;