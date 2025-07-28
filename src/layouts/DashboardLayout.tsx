import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  userRole: 'guest' | 'host' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userRole }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="py-4 md:py-6">
        <div className="container-custom">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;