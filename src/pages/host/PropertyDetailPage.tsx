import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Property Details</h1>
        <Link
          to={`/host/properties/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit Property
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Property #{id}</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Status</h3>
                <p className="text-gray-600">Active</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Bookings</h3>
                <p className="text-gray-600">No current bookings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage; 