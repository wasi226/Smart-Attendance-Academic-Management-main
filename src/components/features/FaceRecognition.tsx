import React, { useRef, useEffect, useState } from 'react';
import { Camera, Users, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface DetectedFace {
  id: string;
  name: string;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface FaceRecognitionProps {
  onFacesDetected: (faces: DetectedFace[]) => void;
  isProcessing: boolean;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ onFacesDetected, isProcessing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFaceAPI();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const loadFaceAPI = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, you would load face-api.js here
      // await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
      // await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
      // await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
      
      // Mock loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load face recognition models');
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      setError('Failed to access camera');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureAndDetect = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Mock face detection - in real implementation, use face-api.js
    const mockDetectedFaces: DetectedFace[] = [
      {
        id: '1',
        name: 'Alex Chen',
        confidence: 0.95,
        boundingBox: { x: 100, y: 80, width: 120, height: 150 }
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        confidence: 0.92,
        boundingBox: { x: 300, y: 100, width: 110, height: 140 }
      },
      {
        id: '3',
        name: 'Mike Rodriguez',
        confidence: 0.88,
        boundingBox: { x: 450, y: 90, width: 115, height: 145 }
      }
    ];

    // Draw bounding boxes
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.font = '16px Arial';
    ctx.fillStyle = '#00ff00';

    mockDetectedFaces.forEach(face => {
      const { x, y, width, height } = face.boundingBox;
      ctx.strokeRect(x, y, width, height);
      ctx.fillText(`${face.name} (${Math.round(face.confidence * 100)}%)`, x, y - 10);
    });

    setDetectedFaces(mockDetectedFaces);
    onFacesDetected(mockDetectedFaces);
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-white mb-2">Loading Face Recognition</h3>
          <p className="text-gray-400">Initializing AI models...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={loadFaceAPI}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Camera className="w-6 h-6 mr-2" />
        Live Face Recognition
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <div className="space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-64 object-cover"
              style={{ display: stream ? 'block' : 'none' }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ display: detectedFaces.length > 0 ? 'block' : 'none' }}
            />
            {!stream && (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Camera not active</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            {!stream ? (
              <button
                onClick={startCamera}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Start Camera
              </button>
            ) : (
              <>
                <button
                  onClick={captureAndDetect}
                  disabled={isProcessing}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Detect Faces'}
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Stop
                </button>
              </>
            )}
          </div>
        </div>

        {/* Detection Results */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Detected Students ({detectedFaces.length})
          </h4>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {detectedFaces.map((face) => (
              <div key={face.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <p className="font-medium text-white">{face.name}</p>
                  <p className="text-sm text-gray-400">
                    Confidence: {Math.round(face.confidence * 100)}%
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            ))}
          </div>

          {detectedFaces.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">No faces detected</p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
        <h5 className="font-semibold text-blue-400 mb-2">Instructions:</h5>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Ensure good lighting for better face detection</li>
          <li>• Students should face the camera directly</li>
          <li>• Keep a reasonable distance from the camera</li>
          <li>• Click "Detect Faces" to process the current frame</li>
        </ul>
      </div>
    </div>
  );
};

export default FaceRecognition;