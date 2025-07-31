import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit3, Save, X, CheckCircle, AlertCircle, Home, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '', // Changed from phoneNumber to phone
    bio: user?.bio || '',
    // Removed address since API doesn't accept it
  });

  // Mock verification status - replace with actual data
  const verificationStatus = {
    email: true, // user?.emailVerified || false
    account: true, // user?.accountVerified || false
  };

  // Cities list
  const cities = [
    'Vienna, AT',
    'Essen',
    'Trier', 
    'Mainz',
    'Ingolstadt',
    'Ludwigshafen'
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phoneNumber || '', // Changed from phoneNumber to phone
      bio: user?.bio || '',
      // Removed address
    });
    setIsEditing(false);
    setError('');
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Saving account with data:', formData);
      // Only send fields that the API accepts
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone, // Send as 'phone' to match API
        bio: formData.bio,
      };
      
      await updateProfile(updateData);
      console.log('Account save successful');
      setIsEditing(false);
    } catch (err: any) {
      console.error('Account save error:', err);
      setError(err.message || 'Failed to update account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-modern">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-neutral-600 text-lg">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/10 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">My Account</h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Please complete your account so we can easily create the rental agreement for you.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card mb-6 border-l-4 border-red-500 bg-red-50">
            <div className="p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium">Error updating account</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="card">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-neutral-900">Profile</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-all duration-200 disabled:opacity-70 font-medium"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isLoading ? 'Saving...' : 'Save'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Verification Status */}
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-neutral-50 rounded-lg border">
                    {verificationStatus.account ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3" />
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">Account</p>
                      <p className="text-sm text-neutral-600">
                        {verificationStatus.account ? 'Verified' : 'Not verified'}
                      </p>
                    </div>
                    {!verificationStatus.account && (
                      <button className="ml-auto text-primary-600 text-sm font-medium hover:text-primary-700">
                        Verify
                      </button>
                    )}
                  </div>

                  <div className="flex items-center p-4 bg-neutral-50 rounded-lg border">
                    {verificationStatus.email ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3" />
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">Email</p>
                      <p className="text-sm text-neutral-600">
                        {verificationStatus.email ? 'Verified' : 'Not verified'}
                      </p>
                    </div>
                    {!verificationStatus.email && (
                      <button className="ml-auto text-primary-600 text-sm font-medium hover:text-primary-700">
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Legal Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Legal Name
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="First name"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="py-4 px-4 bg-neutral-50 rounded-lg border">
                    <p className="text-lg font-medium text-neutral-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Email
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="Email address"
                    />
                  </div>
                ) : (
                  <div className="py-4 px-4 bg-neutral-50 rounded-lg border">
                    <p className="text-lg text-neutral-900">{user.email}</p>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Phone
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="Phone number"
                    />
                  </div>
                ) : (
                  <div className="py-4 px-4 bg-neutral-50 rounded-lg border">
                    <p className="text-lg text-neutral-900">
                      {user.phoneNumber || '+49 17669824626'}
                    </p>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  About Me
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-neutral-400 w-4 h-4" />
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="input-field pl-10 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                ) : (
                  <div className="py-4 px-4 bg-neutral-50 rounded-lg border min-h-[100px]">
                    <p className="text-neutral-900">{user.bio || 'No bio added yet'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cities Section */}
          <div className="card">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center">
                <Home className="w-5 h-5 mr-2 text-primary-600" />
                Recent Locations
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cities.map((city, index) => (
                  <div 
                    key={city}
                    className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border border-primary-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-primary-600 mr-2" />
                      <p className="font-medium text-neutral-900 group-hover:text-primary-700 transition-colors">
                        {city}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 