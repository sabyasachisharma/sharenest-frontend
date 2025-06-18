import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import DashboardHeader from '../components/navigation/DashboardHeader';

interface DashboardLayoutProps {
  userRole: 'guest' | 'host' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar 
        userRole={userRole} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container-custom">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;