import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Calendar, Eye, EyeOff } from 'lucide-react';
import { apiService } from '../services/api';

interface LoginProps {
  role: 'teacher' | 'student' | 'parent' | 'admin';
  onLogin: (user: any) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ role, onLogin, onBack }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'rollno'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rollNo: '',
    dob: ''
  });

  const roleConfig = {
    teacher: { color: 'blue', title: 'Teacher Portal' },
    student: { color: 'green', title: 'Student Portal' },
    parent: { color: 'purple', title: 'Parent Portal' },
    admin: { color: 'orange', title: 'Administrator Portal' }
  };

  const config = roleConfig[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const loginData = loginMethod === 'email' 
      ? { email: formData.email, password: formData.password }
      : { rollNo: formData.rollNo, dob: formData.dob };

    apiService.login(loginData)
      .then(response => {
        localStorage.setItem('token', response.token);
        onLogin(response.user);
      })
      .catch(error => {
        console.error('Login failed:', error);
        // For demo purposes, still allow login with mock data
        const userData = {
          teacher: { id: '1', name: 'Dr. Sarah Johnson', role, avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
          student: { id: '2', name: 'Alex Chen', role, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
          parent: { id: '3', name: 'Michael Roberts', role, avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
          admin: { id: '4', name: 'Jennifer Smith', role, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }
        };
        onLogin(userData[role]);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={onBack}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 flex items-center justify-center mx-auto mb-4`}>
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{config.title}</h2>
            <p className="text-gray-400">Sign in to access your dashboard</p>
          </div>

          {/* Login Method Toggle (for students) */}
          {role === 'student' && (
            <div className="flex bg-white/5 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  loginMethod === 'email'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Email Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('rollno')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  loginMethod === 'rollno'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Roll No + DOB
              </button>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {loginMethod === 'email' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Roll Number
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your roll number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-${config.color}-600 hover:to-${config.color}-700 transform hover:scale-105 transition-all duration-200 shadow-lg`}
            >
              Sign In
            </button>
          </form>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm text-center">
              <strong>Demo Mode:</strong> Click "Sign In" with any credentials to explore the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;