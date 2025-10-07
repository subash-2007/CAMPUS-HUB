
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import EventManagementPage from '../pages/admin/EventManagementPage';
import RegistrationsPage from '../pages/admin/RegistrationsPage';
import AnalyticsPage from '../pages/admin/AnalyticsPage';
import { CalendarIcon, UserGroupIcon, ChartBarIcon, LogoutIcon } from './icons/Icons';

type AdminTab = 'Events' | 'Registrations' | 'Analytics';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Events');
  const { user, logout } = useContext(UserContext);

  const renderContent = () => {
    switch (activeTab) {
      case 'Events':
        return <EventManagementPage />;
      case 'Registrations':
        return <RegistrationsPage />;
      case 'Analytics':
        return <AnalyticsPage />;
      default:
        return <EventManagementPage />;
    }
  };

  // Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
   const NavItem = ({ tab, icon, label }: { tab: AdminTab, icon: React.ReactElement, label: string }) => (
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
                <h1 className="text-2xl font-bold text-campus-blue-dark">Admin Panel</h1>
                <p className="text-sm text-gray-500">Logged in as {user?.email}</p>
            </div>
            <nav className="flex-1 px-4 py-4">
            <ul>
                <NavItem tab="Events" icon={<CalendarIcon />} label="Event Management" />
                <NavItem tab="Registrations" icon={<UserGroupIcon />} label="Registrations" />
                <NavItem tab="Analytics" icon={<ChartBarIcon />} label="Analytics" />
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

export default AdminDashboard;