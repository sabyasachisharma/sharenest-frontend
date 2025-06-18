import React from 'react';

const BookingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {/* Placeholder for bookings list */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">No bookings yet</h2>
              <p className="text-gray-600 mt-2">
                Your booking history will appear here once you make a reservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage; 