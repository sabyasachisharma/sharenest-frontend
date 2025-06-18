import React from 'react';
import { useParams } from 'react-router-dom';

const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Booking #{id}</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Check-in</h3>
                <p className="text-gray-600">Not specified</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Check-out</h3>
                <p className="text-gray-600">Not specified</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Status</h3>
                <p className="text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage; 