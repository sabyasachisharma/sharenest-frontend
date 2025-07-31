import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus } from 'lucide-react';
import { Property } from '../../types';

const PropertiesPage: React.FC = () => {
  // This would normally come from your API/state management
  const properties: Property[] = []; // Fixed TypeScript type
  const isLoading = false; // Replace with actual loading state
  const hasError = false; // Replace with actual error state

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Properties</h1>
          <p className="text-neutral-600">Manage your rental listings and bookings</p>
        </div>
        <Link
          to="/host/properties/new"
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        // Modern Empty State
        <div className="text-center py-16">
          <div className="mx-auto w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mb-8 shadow-modern">
            <Home className="w-16 h-16 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Ready to welcome your first guests?
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Start earning by listing your property on ShareNest. Our platform makes it easy to connect with travelers looking for unique places to stay.
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <Link
              to="/host/properties/new"
              className="btn btn-primary w-full text-lg py-3 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              List Your First Property
            </Link>
            
            <div className="text-sm text-neutral-500">
              <p>✓ Free to list • ✓ Secure payments • ✓ 24/7 support</p>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Easy Setup</h3>
              <p className="text-sm text-neutral-600">Add photos, description, and pricing in minutes</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Earn Money</h3>
              <p className="text-sm text-neutral-600">Set your own prices and start earning immediately</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Stay Protected</h3>
              <p className="text-sm text-neutral-600">Comprehensive insurance and verified guests</p>
            </div>
          </div>
        </div>
      ) : (
        // Properties Grid (when properties exist)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="card">
              {/* Property content here */}
            </div>
          ))}
      </div>
      )}
    </div>
  );
};

export default PropertiesPage; 