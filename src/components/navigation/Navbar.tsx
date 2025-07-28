import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Home, Calendar, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardRoute, mapBackendToFrontendRole } from '../../utils/roleMapping';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Only show user navigation if actually authenticated AND we have a token
  const showUserNavigation = isAuthenticated;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
    navigate('/');
  };

  const getProfileLink = () => {
    if (!user) {
      console.log('No user found, redirecting to login');
      return '/login';
    }
    // Fix: Use 'guest' to match the routes in App.tsx
    const profileRoute = user.role === 'landlord' ? '/host/profile' : '/guest/profile';
    console.log('Profile route for', user.role, ':', profileRoute);
    return profileRoute;
  };

  const getDashboardLink = () => {
    if (!user) {
      console.log('No user found for dashboard, redirecting to login');
      return '/login';
    }
    const dashboardRoute = getDashboardRoute(user.role);
    console.log('Dashboard route for', user.role, ':', dashboardRoute);
    return dashboardRoute;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
            <Home className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-600">ShareNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Removed all left navigation items */}

            {/* User menu or Login/Register */}
            {showUserNavigation ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.email 
                      ? user.email
                      : 'Account'
                    }
                  </span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to={user?.role === 'landlord' ? '/host/bookings' : '/guest/bookings'}
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                      onClick={closeMenus}
                    >
                      Bookings
                    </Link>
                    <Link
                      to={user?.role === 'landlord' ? '/host/messages' : '/guest/messages'}
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                      onClick={closeMenus}
                    >
                      Messages
                    </Link>
                    <Link
                      to={getProfileLink()}
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                      onClick={closeMenus}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                  onClick={closeMenus}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  onClick={closeMenus}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-neutral-700" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {/* Removed all left navigation items from mobile menu too */}

            {showUserNavigation ? (
              <>
                <Link
                  to={user?.role === 'landlord' ? '/host/bookings' : '/guest/bookings'}
                  className="py-2 text-neutral-700 hover:text-primary-600 font-medium"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Bookings
                  </span>
                </Link>
                <Link
                  to={user?.role === 'landlord' ? '/host/messages' : '/guest/messages'}
                  className="py-2 text-neutral-700 hover:text-primary-600 font-medium"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </span>
                </Link>
                <Link
                  to={getProfileLink()}
                  className="py-2 text-neutral-700 hover:text-primary-600 font-medium"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center py-2 text-neutral-700 hover:text-primary-600 font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link 
                  to="/login" 
                  className="btn btn-secondary w-full"
                  onClick={closeMenus}
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary w-full"
                  onClick={closeMenus}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;