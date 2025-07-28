import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mapBackendToFrontendRole } from '../../utils/roleMapping';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = React.useState(3);

  return (
    <header className="bg-white border-b border-neutral-200 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-1 rounded-full hover:bg-neutral-100 md:hidden"
          >
            <Menu className="w-6 h-6 text-neutral-700" />
          </button>

          <div className="hidden md:flex items-center space-x-2">
            <span className="font-semibold text-neutral-800">
              {user && mapBackendToFrontendRole(user.role) === 'host' ? 'Host Dashboard' : 'Guest Dashboard'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 h-9 pl-9 pr-4 rounded-full border border-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>

          <div className="relative">
            <button className="p-2 rounded-full hover:bg-neutral-100 relative">
              <Bell className="w-5 h-5 text-neutral-700" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <Link to={`/${user?.role}/profile`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.firstName} className="w-8 h-8 rounded-full" />
              ) : (
                <span className="text-primary-700 font-medium text-sm">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-sm font-medium text-neutral-800">
              {user?.firstName} {user?.lastName}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;