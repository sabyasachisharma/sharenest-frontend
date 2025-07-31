import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Home, Calendar, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardRoute, mapBackendToFrontendRole } from '../../utils/roleMapping';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, fetchUserData } = useAuth();
  const navigate = useNavigate();

  // Only show user navigation if we have both authentication AND user data
  const showUserNavigation = isAuthenticated && user;
  // Show loading state when authenticated but no user data
  const showUserLoading = isAuthenticated && !user;

  // Auto-fetch user data when authenticated but no user data
  React.useEffect(() => {
    if (isAuthenticated && !user) {
      // Only try once, don't retry if it fails
      fetchUserData().catch(() => {
        // If fetchUserData fails, the user will be logged out automatically
        // by the AuthContext, so no need to do anything here
      });
    }
  }, [isAuthenticated, user]);

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
      return '/login';
    }
    // Fix: Use 'guest' to match the routes in App.tsx
    const profileRoute = user.role === 'landlord' ? '/host/profile' : '/guest/profile';
    return profileRoute;
  };

  const getDashboardLink = () => {
    if (!user) {
      return '/login';
    }
    const dashboardRoute = getDashboardRoute(user.role);
    return dashboardRoute;
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
            <Home className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">ShareNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Removed all left navigation items */}

            {/* User menu or Login/Register */}
            {showUserNavigation ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
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
            ) : showUserLoading ? (
              <div className="flex items-center space-x-2 text-white">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span className="font-medium">Loading...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-8">
                <Link
                  to="/help"
                  className="text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
                  onClick={closeMenus}
                >
                  Help
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
                  onClick={closeMenus}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
                  onClick={closeMenus}
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {/* Removed all left navigation items from mobile menu too */}

            {showUserNavigation ? (
              <>
                <Link
                  to={user?.role === 'landlord' ? '/host/bookings' : '/guest/bookings'}
                  className="py-2 px-4 text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium rounded-full transition-all duration-300 ease-in-out"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Bookings
                  </span>
                </Link>
                <Link
                  to={user?.role === 'landlord' ? '/host/messages' : '/guest/messages'}
                  className="py-2 px-4 text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium rounded-full transition-all duration-300 ease-in-out"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </span>
                </Link>
                <Link
                  to={getProfileLink()}
                  className="py-2 px-4 text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium rounded-full transition-all duration-300 ease-in-out"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center py-2 px-4 text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium rounded-full transition-all duration-300 ease-in-out w-full text-left"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </button>
              </>
            ) : showUserLoading ? (
              <div className="flex items-center justify-center py-4 text-white">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                <span className="font-medium">Loading account...</span>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 pt-2">
                <Link 
                  to="/help" 
                  className="text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-center"
                  onClick={closeMenus}
                >
                  Help
                </Link>
                <Link 
                  to="/login" 
                  className="text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-center"
                  onClick={closeMenus}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-white hover:text-purple-200 hover:bg-white hover:bg-opacity-10 font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out text-center"
                  onClick={closeMenus}
                >
                  SignUp
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