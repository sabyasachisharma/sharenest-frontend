import React from 'react';
import { Link } from 'react-router-dom';

const PropertiesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link
          to="/host/properties/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Property
        </Link>
      </div>
      <div className="space-y-4">
        {/* Placeholder for properties list */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">No properties yet</h2>
              <p className="text-gray-600 mt-2">
                Start by adding your first property.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage; 