
import React, { useState, useContext } from 'react';
import HomePage from '../pages/student/HomePage';
import VolunteerHubPage from '../pages/student/VolunteerHubPage';
import NavigatorPage from '../pages/student/NavigatorPage';
import MyEventsPage from '../pages/student/MyEventsPage';
import ProfilePage from '../pages/student/ProfilePage';
import { HomeIcon, CalendarIcon, MapIcon, ClipboardIcon, UserIcon, LogoutIcon } from './icons/Icons';
import { UserContext } from '../contexts/UserContext';

type Tab = 'Home' | 'Volunteer Hub' | 'Campus Navigator' | 'My Events' | 'Profile';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const { user, logout } = useContext(UserContext);

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <HomePage />;
      case 'Volunteer Hub': return <VolunteerHubPage />;
      case 'Campus Navigator': return <NavigatorPage />;
      case 'My Events': return <MyEventsPage />;
      case 'Profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  // Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  const NavItem = ({ tab, icon, label }: { tab: Tab, icon: React.ReactElement, label: string }) => (
    <li className="mb-2">
      <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center w-full p-3 text-base font-normal rounded-lg transition duration-75 group ${activeTab === tab ? 'bg-campus-blue text-white' : 'text-gray-900 hover:bg-gray-200'}`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </button>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="flex-shrink-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
            <div className="p-4 text-center border-b">
                <h1 className="text-2xl font-bold text-campus-blue-dark">Campus Hub</h1>
                <p className="text-sm text-gray-500">Welcome, {user?.profile?.firstName || 'Student'}</p>
            </div>
            <nav className="flex-1 px-4 py-4">
            <ul>
                <NavItem tab="Home" icon={<HomeIcon />} label="Home" />
                <NavItem tab="Volunteer Hub" icon={<CalendarIcon />} label="Volunteer Hub" />
                <NavItem tab="Campus Navigator" icon={<MapIcon />} label="Campus Navigator" />
                <NavItem tab="My Events" icon={<ClipboardIcon />} label="My Events" />
                <NavItem tab="Profile" icon={<UserIcon />} label="Profile" />
            </ul>
            </nav>
            <div className="p-4 mt-auto border-t">
              <button
                onClick={logout}
                className="flex items-center w-full p-3 text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-200"
              >
                <LogoutIcon />
                <span className="ml-3">Logout</span>
              </button>
            </div>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;