import React from 'react';
import { LogOut, User, Bell } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'teacher': return 'from-blue-500 to-blue-600';
      case 'student': return 'from-green-500 to-green-600';
      case 'parent': return 'from-purple-500 to-purple-600';
      case 'admin': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getRoleColor(user.role)} flex items-center justify-center`}>
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Smart Attendance System</h1>
              <p className="text-sm text-gray-400 capitalize">{user.role} Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar || 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
              />
              <div className="hidden md:block">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>
            
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;