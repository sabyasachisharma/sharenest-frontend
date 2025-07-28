import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Mail, Lock, User, Building, Phone, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDashboardRoute } from '../utils/roleMapping';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'tenant', // tenant or landlord
    phone: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.userType as 'tenant' | 'landlord',
        phone: formData.phone,
        bio: formData.bio,
      });
      
      // Navigate to home page after successful signup
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Home className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-2xl font-bold text-neutral-800">ShareNest</span>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-900">Create your account</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Join our community of flat-sharers and landlords
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-4 p-1 bg-neutral-100 rounded-lg">
              <button
                type="button"
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  formData.userType === 'tenant'
                    ? 'bg-white shadow-md text-primary-600'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
                onClick={() => handleChange({ target: { name: 'userType', value: 'tenant' } } as any)}
              >
                Looking for a room
              </button>
              <button
                type="button"
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  formData.userType === 'landlord'
                    ? 'bg-white shadow-md text-primary-600'
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
                onClick={() => handleChange({ target: { name: 'userType', value: 'landlord' } } as any)}
              >
                Listing a space
              </button>
            </div>

            {/* First Name Input */}
            <div>
              <div className="relative">
                <User className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="firstName"
                  required
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Last Name Input */}
            <div>
              <div className="relative">
                <User className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="lastName"
                  required
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <Mail className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <div className="relative">
                <Phone className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  required
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Phone number (e.g., +1234567890)"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <Lock className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <div className="relative">
                <Lock className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Bio Input */}
            <div>
              <div className="relative">
                <FileText className="h-5 w-5 text-neutral-400 absolute left-3 top-3" />
                <textarea
                  name="bio"
                  required
                  rows={3}
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 resize-none"
                  placeholder={`Tell us about yourself ${formData.userType === 'tenant' ? '(looking for accommodation)' : '(as a property owner)'}`}
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-neutral-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Terms and Privacy */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          <p className="text-xs text-center text-neutral-600">
            By creating an account, you agree to our{' '}
            <Link to="/terms-of-service" className="font-medium text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy" className="font-medium text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 