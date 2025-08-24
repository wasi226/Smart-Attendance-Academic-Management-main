import React, { useState, useRef } from 'react';
import { QrCode, Download, RefreshCw, User, Calendar, Shield, Smartphone } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [qrData, setQrData] = useState({
    studentId: 'STU2024001',
    name: 'Alex Chen',
    class: '10A',
    rollNo: '001',
    validUntil: '2025-12-31'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    // Simulate QR code generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock QR code generation on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 300, 300);
        
        // Create a simple QR-like pattern
        ctx.fillStyle = '#000000';
        const size = 10;
        for (let i = 0; i < 30; i++) {
          for (let j = 0; j < 30; j++) {
            if (Math.random() > 0.5) {
              ctx.fillRect(i * size, j * size, size, size);
            }
          }
        }
        
        // Add corner squares (QR code markers)
        ctx.fillStyle = '#000000';
        // Top-left
        ctx.fillRect(0, 0, 70, 70);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(10, 10, 50, 50);
        ctx.fillStyle = '#000000';
        ctx.fillRect(20, 20, 30, 30);
        
        // Top-right
        ctx.fillStyle = '#000000';
        ctx.fillRect(230, 0, 70, 70);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(240, 10, 50, 50);
        ctx.fillStyle = '#000000';
        ctx.fillRect(250, 20, 30, 30);
        
        // Bottom-left
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 230, 70, 70);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(10, 240, 50, 50);
        ctx.fillStyle = '#000000';
        ctx.fillRect(20, 250, 30, 30);
      }
    }
    
    setIsGenerating(false);
  };

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `qr-code-${qrData.studentId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const refreshQRCode = () => {
    generateQRCode();
  };

  React.useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className="space-y-8">
      {/* QR Code Display */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <QrCode className="w-7 h-7 mr-3" />
          Your Personal QR Code
        </h3>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* QR Code */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="bg-white p-6 rounded-2xl shadow-2xl">
                {isGenerating ? (
                  <div className="w-72 h-72 flex items-center justify-center">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                )}
              </div>
              
              {/* Student Info Overlay */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {qrData.name} • {qrData.rollNo}
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={refreshQRCode}
                disabled={isGenerating}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={downloadQRCode}
                disabled={isGenerating}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Student Information */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Student Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Student ID:</span>
                  <span className="text-white font-medium">{qrData.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white font-medium">{qrData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Class:</span>
                  <span className="text-white font-medium">{qrData.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Roll Number:</span>
                  <span className="text-white font-medium">{qrData.rollNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Valid Until:</span>
                  <span className="text-white font-medium">{qrData.validUntil}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-green-400 mb-1">Security Features</h5>
                  <ul className="text-sm text-green-200 space-y-1">
                    <li>• Encrypted student data</li>
                    <li>• Time-based validation</li>
                    <li>• Anti-tampering protection</li>
                    <li>• Unique session tokens</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="w-8 h-8 text-blue-400" />
            <h4 className="font-semibold text-white">How to Use</h4>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Save QR code to your phone</li>
            <li>• Show to teacher when face recognition fails</li>
            <li>• Keep your phone charged</li>
            <li>• Don't share with others</li>
          </ul>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-green-400" />
            <h4 className="font-semibold text-white">When to Use</h4>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Face recognition system is down</li>
            <li>• Poor lighting conditions</li>
            <li>• Camera malfunction</li>
            <li>• Emergency backup method</li>
          </ul>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-purple-400" />
            <h4 className="font-semibold text-white">Security Tips</h4>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Never let others scan your code</li>
            <li>• Report if code is compromised</li>
            <li>• Refresh code monthly</li>
            <li>• Keep backup copy safe</li>
          </ul>
        </div>
      </div>

      {/* QR Code Statistics */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">QR Code Usage Statistics</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-1">23</div>
            <div className="text-sm text-gray-400">Times Used</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-1">2</div>
            <div className="text-sm text-gray-400">This Month</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-orange-400 mb-1">Jan 15</div>
            <div className="text-sm text-gray-400">Last Used</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;