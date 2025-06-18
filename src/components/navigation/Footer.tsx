import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-bold text-white">ShareNest</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Find your ideal shared living space - Connect with flatmates, discover sublets, and make your next home sharing experience memorable
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-gray-300 hover:text-white transition-colors">
                  Find Rooms
                </Link>
              </li>
              <li>
                <Link to="/search?type=shared" className="text-gray-300 hover:text-white transition-colors">
                  Shared Flats
                </Link>
              </li>
              <li>
                <Link to="/search?type=sublet" className="text-gray-300 hover:text-white transition-colors">
                  Sublets
                </Link>
              </li>
              <li>
                <Link to="/search?type=student" className="text-gray-300 hover:text-white transition-colors">
                  Student Housing
                </Link>
              </li>
            </ul>
          </div>

          {/* Host Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">List Your Space</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=host" className="text-gray-300 hover:text-white transition-colors">
                  List a Room or Flat
                </Link>
              </li>
              <li>
                <Link to="/host" className="text-gray-300 hover:text-white transition-colors">
                  Landlord Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Subletting Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Flatshare Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@sharenest.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} ShareNest Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-neutral-400 hover:text-primary-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-neutral-400 hover:text-primary-400 text-sm">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-neutral-400 hover:text-primary-400 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;