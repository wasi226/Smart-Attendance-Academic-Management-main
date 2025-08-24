import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';

type UserRole = 'teacher' | 'student' | 'parent' | 'admin' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentView('login');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setCurrentView('landing');
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'teacher':
        return <TeacherDashboard user={user} onLogout={handleLogout} />;
      case 'student':
        return <StudentDashboard user={user} onLogout={handleLogout} />;
      case 'parent':
        return <ParentDashboard user={user} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {currentView === 'landing' && (
        <LandingPage onRoleSelect={handleRoleSelect} />
      )}
      {currentView === 'login' && selectedRole && (
        <Login 
          role={selectedRole} 
          onLogin={handleLogin}
          onBack={() => setCurrentView('landing')} 
        />
      )}
      {currentView === 'dashboard' && renderDashboard()}
    </div>
  );
}

export default App;