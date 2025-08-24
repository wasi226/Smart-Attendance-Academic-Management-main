import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, Camera, Users, TrendingDown } from 'lucide-react';

interface ProxyAlert {
  id: string;
  studentName: string;
  suspectedProxy: string;
  confidence: number;
  timestamp: string;
  subject: string;
  class: string;
  status: 'pending' | 'confirmed' | 'dismissed';
  evidence: string[];
}

const ProxyDetection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'settings' | 'analytics'>('alerts');
  const [proxyAlerts, setProxyAlerts] = useState<ProxyAlert[]>([
    {
      id: '1',
      studentName: 'John Doe',
      suspectedProxy: 'Mike Wilson',
      confidence: 92.5,
      timestamp: '2025-01-15 09:15:23',
      subject: 'Mathematics',
      class: '10A',
      status: 'pending',
      evidence: ['Face mismatch detected', 'Different facial features', 'Height discrepancy']
    },
    {
      id: '2',
      studentName: 'Sarah Johnson',
      suspectedProxy: 'Unknown Person',
      confidence: 87.3,
      timestamp: '2025-01-14 11:30:45',
      subject: 'Physics',
      class: '10B',
      status: 'confirmed',
      evidence: ['Facial recognition mismatch', 'Different eye color', 'Behavioral analysis']
    },
    {
      id: '3',
      studentName: 'Alex Chen',
      suspectedProxy: 'David Lee',
      confidence: 78.9,
      timestamp: '2025-01-13 14:20:12',
      subject: 'Chemistry',
      class: '10A',
      status: 'dismissed',
      evidence: ['Minor facial differences', 'Lighting conditions']
    }
  ]);

  const [detectionSettings, setDetectionSettings] = useState({
    enabled: true,
    confidenceThreshold: 85,
    faceMatchThreshold: 90,
    behavioralAnalysis: true,
    realTimeAlerts: true,
    autoFlag: false
  });

  const handleStatusChange = (alertId: string, newStatus: 'confirmed' | 'dismissed') => {
    setProxyAlerts(alerts =>
      alerts.map(alert =>
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'dismissed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-red-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-green-400';
  };

  const stats = {
    totalAlerts: proxyAlerts.length,
    pendingAlerts: proxyAlerts.filter(a => a.status === 'pending').length,
    confirmedCases: proxyAlerts.filter(a => a.status === 'confirmed').length,
    falsePositives: proxyAlerts.filter(a => a.status === 'dismissed').length,
    detectionRate: 94.2,
    accuracy: 87.6
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-6 gap-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{stats.totalAlerts}</div>
          <div className="text-xs text-gray-400">Total Alerts</div>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-yellow-400">{stats.pendingAlerts}</div>
          <div className="text-xs text-gray-300">Pending</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-red-400">{stats.confirmedCases}</div>
          <div className="text-xs text-gray-300">Confirmed</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-green-400">{stats.falsePositives}</div>
          <div className="text-xs text-gray-300">False Positives</div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-blue-400">{stats.detectionRate}%</div>
          <div className="text-xs text-gray-300">Detection Rate</div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-purple-400">{stats.accuracy}%</div>
          <div className="text-xs text-gray-300">Accuracy</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        {[
          { id: 'alerts', label: 'Proxy Alerts', icon: AlertTriangle },
          { id: 'analytics', label: 'Analytics', icon: TrendingDown },
          { id: 'settings', label: 'Detection Settings', icon: Shield }
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

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Proxy Detection Alerts
          </h3>

          <div className="space-y-4">
            {proxyAlerts.map((alert) => (
              <div key={alert.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Suspected Proxy: {alert.studentName}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {alert.subject} • {alert.class} • {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className={`text-lg font-bold ${getConfidenceColor(alert.confidence)}`}>
                        {alert.confidence}%
                      </span>
                      <p className="text-xs text-gray-400">Confidence</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h5 className="font-medium text-white mb-2">Detection Details</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expected Student:</span>
                        <span className="text-white">{alert.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Detected Person:</span>
                        <span className="text-white">{alert.suspectedProxy}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-white mb-2">Evidence</h5>
                    <ul className="space-y-1">
                      {alert.evidence.map((evidence, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          {evidence}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {alert.status === 'pending' && (
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleStatusChange(alert.id, 'confirmed')}
                      className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Confirm Proxy</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(alert.id, 'dismissed')}
                      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Dismiss Alert</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View Evidence</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {proxyAlerts.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">No Proxy Alerts</h4>
              <p className="text-gray-400">All attendance records appear legitimate.</p>
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Detection Analytics</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Weekly Trend</h4>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                    const alerts = [3, 1, 5, 2, 4][index];
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-gray-300 w-12">{day}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                              style={{ width: `${(alerts / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-white font-medium w-8">{alerts}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Most Affected Classes</h4>
                <div className="space-y-3">
                  {[
                    { class: '10A', alerts: 8, percentage: 100 },
                    { class: '10B', alerts: 5, percentage: 62.5 },
                    { class: '11A', alerts: 3, percentage: 37.5 },
                    { class: '9A', alerts: 2, percentage: 25 }
                  ].map((item) => (
                    <div key={item.class} className="flex items-center justify-between">
                      <span className="text-gray-300 w-12">{item.class}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-white font-medium w-8">{item.alerts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Detection Insights</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <Camera className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="font-semibold text-white mb-2">Peak Detection Times</h4>
                <p className="text-sm text-gray-300">Most proxy attempts occur during morning classes (9-11 AM)</p>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <Users className="w-8 h-8 text-yellow-400 mb-3" />
                <h4 className="font-semibold text-white mb-2">Common Patterns</h4>
                <p className="text-sm text-gray-300">Siblings and close friends are most common proxy attempts</p>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="font-semibold text-white mb-2">Prevention Success</h4>
                <p className="text-sm text-gray-300">87% reduction in proxy attendance since implementation</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Proxy Detection Settings</h3>

          <div className="space-y-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Detection Parameters</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Overall Confidence Threshold: {detectionSettings.confidenceThreshold}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={detectionSettings.confidenceThreshold}
                    onChange={(e) => setDetectionSettings({
                      ...detectionSettings,
                      confidenceThreshold: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Face Match Threshold: {detectionSettings.faceMatchThreshold}%
                  </label>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    value={detectionSettings.faceMatchThreshold}
                    onChange={(e) => setDetectionSettings({
                      ...detectionSettings,
                      faceMatchThreshold: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>70%</span>
                    <span>85%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Detection Features</h4>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={detectionSettings.enabled}
                    onChange={(e) => setDetectionSettings({
                      ...detectionSettings,
                      enabled: e.target.checked
                    })}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Enable proxy detection</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={detectionSettings.behavioralAnalysis}
                    onChange={(e) => setDetectionSettings({
                      ...detectionSettings,
                      behavioralAnalysis: e.target.checked
                    })}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Enable behavioral analysis</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={detectionSettings.realTimeAlerts}
                    onChange={(e) => setDetectionSettings({
                      ...detectionSettings,
                      realTimeAlerts: e.target.checked
                    })}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Send real-time alerts</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={detectionSettings.autoFlag}
                    onChange={(e) => setDetectionSettings({
                      ...detectionSettings,
                      autoFlag: e.target.checked
                    })}
                    className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Auto-flag high confidence detections</span>
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

export default ProxyDetection;