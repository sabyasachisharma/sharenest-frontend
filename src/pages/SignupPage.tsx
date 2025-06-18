import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Mail, Lock, User, Building } from 'lucide-react';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    userType: 'tenant', // tenant or landlord
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

            {/* Full Name Input */}
            <div>
              <div className="relative">
                <User className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="fullName"
                  required
                  className="pl-10 w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Full Name"
                  value={formData.fullName}
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Create Account
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