import React, { useState, useRef } from 'react';
import { Upload, Camera, Users, CheckCircle, AlertCircle, Scan, Clock } from 'lucide-react';
import { apiService } from '../../services/api';

const AttendanceUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [detectedFaces, setDetectedFaces] = useState<Array<{ id: string; name: string; confidence: number; status: 'present' | 'absent' | 'unknown' }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processingSteps = [
    'Analyzing image...',
    'Detecting faces...',
    'Matching with database...',
    'Checking for proxies...',
    'Finalizing attendance...'
  ];

  const mockDetectedStudents = [
    { id: '1', name: 'Alex Chen', confidence: 98.5, status: 'present' as const },
    { id: '2', name: 'Sarah Johnson', confidence: 95.2, status: 'present' as const },
    { id: '3', name: 'Mike Rodriguez', confidence: 97.8, status: 'present' as const },
    { id: '4', name: 'Emma Wilson', confidence: 92.4, status: 'present' as const },
    { id: '5', name: 'David Lee', confidence: 89.1, status: 'present' as const },
    { id: '6', name: 'Lisa Wang', confidence: 91.7, status: 'present' as const }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        processAttendance();
      };
      reader.readAsDataURL(file);
    }
  };

  const processAttendance = async () => {
    setIsProcessing(true);
    setDetectedFaces([]);
    
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setDetectedFaces(mockDetectedStudents);
    setIsProcessing(false);
  };

  const confirmAttendance = () => {
    const attendanceData = {
      students: detectedFaces.map(face => ({
        id: face.id,
        status: face.status,
        confidence: face.confidence,
        method: 'face_recognition'
      })),
      subject: 'Mathematics', // This should come from timetable detection
      class: '10A' // This should come from teacher's assigned classes
    };

    apiService.recordAttendance(attendanceData)
      .then(() => {
        alert('Attendance has been recorded successfully!');
        setSelectedImage(null);
        setDetectedFaces([]);
      })
      .catch(error => {
        console.error('Failed to record attendance:', error);
        alert('Failed to record attendance. Please try again.');
      });
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Camera className="w-7 h-7 mr-3" />
          Take Class Attendance
        </h3>
        
        {!selectedImage ? (
          <div 
            className="border-2 border-dashed border-white/30 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Upload Class Photo</h4>
            <p className="text-gray-400 mb-6">
              Upload a photo of your class and our AI will automatically mark attendance
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Choose Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Class photo" 
                className="w-full max-h-96 object-cover rounded-lg"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white font-medium">{processingSteps[processingStep]}</p>
                  </div>
                </div>
              )}
            </div>
            
            {!isProcessing && detectedFaces.length === 0 && (
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={processAttendance}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Process Attendance
                </button>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Choose Different Photo
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Section */}
      {detectedFaces.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
              Attendance Results
            </h3>
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium">
              {detectedFaces.length} students detected
            </span>
          </div>

          <div className="grid gap-4 mb-6">
            {detectedFaces.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{student.name}</h4>
                    <p className="text-sm text-gray-400">Confidence: {student.confidence}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === 'present' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {student.status}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button 
              onClick={confirmAttendance}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Confirm & Save Attendance
            </button>
            <button 
              onClick={() => setDetectedFaces([])}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Quick Info */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Camera className="w-6 h-6 text-blue-400" />
            <h4 className="font-semibold text-white">AI Face Recognition</h4>
          </div>
          <p className="text-sm text-gray-300">Advanced algorithms automatically detect and identify students</p>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Scan className="w-6 h-6 text-green-400" />
            <h4 className="font-semibold text-white">QR Code Backup</h4>
          </div>
          <p className="text-sm text-gray-300">Students can use QR codes if face recognition fails</p>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-6 h-6 text-purple-400" />
            <h4 className="font-semibold text-white">Auto-Detection</h4>
          </div>
          <p className="text-sm text-gray-300">Subject automatically detected based on schedule</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceUpload;