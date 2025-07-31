import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  MessageSquare, 
  User, 
  LogOut, 
  Settings, 
  X,
  Layout,
  CreditCard,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  userRole: 'guest' | 'host';
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isOpen, onClose }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    // Exact match for dashboard routes
    if (path === '/guest' || path === '/host') {
      return location.pathname === path;
    }
    // For other routes, check if current path starts with the link path
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const guestLinks = [
    { path: '/guest', icon: <Layout className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/guest/bookings', icon: <Calendar className="w-5 h-5" />, label: 'My Bookings' },
    { path: '/guest/messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
    { path: '/guest/profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  const hostLinks = [
    { path: '/host', icon: <Layout className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/host/properties', icon: <Home className="w-5 h-5" />, label: 'My Properties' },
    { path: '/host/bookings', icon: <Calendar className="w-5 h-5" />, label: 'Bookings' },
    { path: '/host/messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
    { path: '/host/reviews', icon: <Star className="w-5 h-5" />, label: 'Reviews' },
    { path: '/host/earnings', icon: <CreditCard className="w-5 h-5" />, label: 'Earnings' },
    { path: '/host/profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  const links = userRole === 'host' ? hostLinks : guestLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-primary-600" />
              <span className="text-lg font-semibold text-primary-600 tracking-wide">ShareNest</span>
            </div>
            <button 
              className="p-1 rounded-full hover:bg-neutral-100 md:hidden"
              onClick={onClose}
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                    onClick={onClose}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t pt-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
                    onClick={onClose}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log out</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;