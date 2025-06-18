import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Home, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

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

  const getDashboardLink = () => {
    if (!user) return '/login';
    return user.role === 'host' ? '/host' : '/guest';
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
            <Link to="/search" className="text-neutral-700 hover:text-primary-600 font-medium">
              Find Stays
            </Link>
            
            {isAuthenticated && user?.role === 'host' && (
              <Link to="/host/properties" className="text-neutral-700 hover:text-primary-600 font-medium">
                Manage Listings
              </Link>
            )}

            {/* User menu or Login/Register */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user?.email}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                      onClick={closeMenus}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-neutral-700 hover:text-primary-600 font-medium"
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
            <Link 
              to="/search" 
              className="py-2 text-neutral-700 hover:text-primary-600 font-medium"
              onClick={closeMenus}
            >
              <span className="flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Find Stays
              </span>
            </Link>
            
            {isAuthenticated && user?.role === 'host' && (
              <Link 
                to="/host/properties" 
                className="py-2 text-neutral-700 hover:text-primary-600 font-medium"
                onClick={closeMenus}
              >
                <span className="flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  Manage Listings
                </span>
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="py-2 text-neutral-700 hover:text-primary-600 font-medium"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </span>
                </Link>
                <Link
                  to={user?.role === 'host' ? '/host/bookings' : '/guest/bookings'}
                  className="py-2 text-neutral-700 hover:text-primary-600 font-medium"
                  onClick={closeMenus}
                >
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Bookings
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