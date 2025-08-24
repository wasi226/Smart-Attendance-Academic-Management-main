import React from 'react';
import { GraduationCap, Users, UserCheck, Settings, Brain, Shield, Award, Smartphone } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'teacher' | 'student' | 'parent' | 'admin') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Upload class photos, manage attendance, and track student performance',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      features: ['Face Recognition', 'Auto Attendance', 'Analytics Dashboard']
    },
    {
      id: 'student',
      title: 'Student',
      description: 'View attendance, access study materials, and track your progress',
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      features: ['Attendance History', 'Study Materials', 'Achievement Badges']
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'Monitor your child\'s attendance and academic performance',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      features: ['Real-time Alerts', 'Performance Reports', 'Fee Management']
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage users, classes, and system configurations',
      icon: Settings,
      color: 'from-orange-500 to-orange-600',
      features: ['User Management', 'System Analytics', 'Configuration']
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Face Recognition',
      description: 'Advanced face detection automatically marks attendance from class photos'
    },
    {
      icon: Shield,
      title: 'Proxy Detection',
      description: 'Machine learning algorithms detect and prevent attendance fraud'
    },
    {
      icon: Award,
      title: 'Gamification System',
      description: 'Students earn badges and rewards for consistent attendance'
    },
    {
      icon: Smartphone,
      title: 'Real-time Notifications',
      description: 'Instant SMS and WhatsApp alerts for parents and students'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Smart Attendance &
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {' '}Academic Management
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Revolutionize education with AI-powered attendance tracking, real-time analytics, 
              and comprehensive academic management for the digital age.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">MERN Stack</span>
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">Face Recognition AI</span>
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">Real-time Notifications</span>
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">QR Code Backup</span>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  onClick={() => onRoleSelect(role.id as any)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{role.title}</h3>
                    <p className="text-gray-400 mb-4">{role.description}</p>
                    <div className="space-y-2">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced AI Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Cutting-edge technology meets educational excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <Icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Smart Attendance System. Powered by AI and Modern Web Technologies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;