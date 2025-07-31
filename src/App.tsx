import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleRoute from './components/common/RoleRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import CookiePolicy from './pages/legal/CookiePolicy';

// Guest Pages
import GuestBookingsPage from './pages/guest/BookingsPage';
import GuestBookingDetailPage from './pages/guest/BookingDetailPage';

// Host Pages
import HostPropertiesPage from './pages/host/PropertiesPage';
import HostPropertyDetailPage from './pages/host/PropertyDetailPage';
import HostPropertyFormPage from './pages/host/PropertyFormPage';
import HostBookingsPage from './pages/host/BookingsPage';

// Placeholder components for missing pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-600">This page is coming soon.</p>
  </div>
);

import MessagesPage from './components/common/MessagesPage';
import ProfilePage from './components/common/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="properties/:id" element={<PropertyDetailsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="register" element={<SignupPage />} />
            <Route path="help" element={<HelpPage />} />
            
            {/* Legal Routes */}
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
          </Route>

          {/* Guest Routes */}
          <Route 
            path="/guest" 
            element={
              <ProtectedRoute>
                <DashboardLayout userRole="guest" />
              </ProtectedRoute>
            }
          >
            <Route index element={<GuestBookingsPage />} />
            <Route path="bookings" element={<GuestBookingsPage />} />
            <Route path="bookings/:id" element={<GuestBookingDetailPage />} />
            <Route path="messages" element={<MessagesPage userRole="guest" />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Host Routes */}
          <Route 
            path="/host" 
            element={
              <RoleRoute allowedRoles={['landlord']}>
                <DashboardLayout userRole="host" />
              </RoleRoute>
            }
          >
            <Route index element={<HostPropertiesPage />} />
            <Route path="properties" element={<HostPropertiesPage />} />
            <Route path="properties/new" element={<HostPropertyFormPage />} />
            <Route path="properties/:id" element={<HostPropertyDetailPage />} />
            <Route path="properties/:id/edit" element={<HostPropertyFormPage />} />
            <Route path="bookings" element={<HostBookingsPage />} />
            <Route path="messages" element={<MessagesPage userRole="host" />} />
            <Route path="reviews" element={<PlaceholderPage title="Reviews" />} />
            <Route path="earnings" element={<PlaceholderPage title="Earnings" />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Settings Route (available to all authenticated users) */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <DashboardLayout userRole="guest" />
              </ProtectedRoute>
            }
          >
            <Route index element={<PlaceholderPage title="Settings" />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;