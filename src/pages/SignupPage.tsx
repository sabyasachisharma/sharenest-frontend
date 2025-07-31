import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateName, validatePassword, validateGermanPhone } from '../utils/validation';

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
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate first name
    const firstNameValidation = validateName(formData.firstName);
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.message!;
    }

    // Validate last name
    const lastNameValidation = validateName(formData.lastName);
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.message!;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message!;
    }

    // Validate phone
    const phoneValidation = validateGermanPhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message!;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message!;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validate all fields
    if (!validateForm()) {
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
        bio: '', // Empty bio since we removed the field
      });
      
      // Navigate to home page after successful signup
      navigate('/');
    } catch (err: any) {
      setErrors({ general: err.message || 'Failed to create an account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
        <div className="px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Home className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-2xl font-semibold text-neutral-800 tracking-wide">ShareNest</span>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-900">Create your account</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Join our community of flat-sharers and landlords
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                {errors.general}
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
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
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
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
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
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
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
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
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
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
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
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
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