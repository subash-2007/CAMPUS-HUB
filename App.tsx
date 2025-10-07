
import React, { useState, useMemo } from 'react';
import { User, Role } from './types';
import { users as mockUsers } from './services/mockData';
import LoginComponent from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import { UserContext } from './contexts/UserContext';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const userContextValue = useMemo(() => ({ user: currentUser, logout: handleLogout }), [currentUser]);

  const renderContent = () => {
    if (!currentUser) {
      return <LoginComponent onLogin={handleLogin} mockUsers={mockUsers} />;
    }

    switch (currentUser.role) {
      case Role.STUDENT:
        return <StudentDashboard />;
      case Role.ADMIN:
      case Role.ORGANIZER:
        return <AdminDashboard />;
      default:
        return <LoginComponent onLogin={handleLogin} mockUsers={mockUsers} />;
    }
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <div className="bg-gray-100 min-h-screen font-sans">
        {renderContent()}
      </div>
    </UserContext.Provider>
  );
};

export default App;
