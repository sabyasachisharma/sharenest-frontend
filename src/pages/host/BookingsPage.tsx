import React from 'react';

const BookingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Bookings</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
            <div className="space-y-4">
              {/* Placeholder for bookings list */}
              <div className="border-b pb-4">
                <p className="text-gray-600">
                  No current bookings to display.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
            <div className="space-y-4">
              {/* Placeholder for booking requests */}
              <div className="border-b pb-4">
                <p className="text-gray-600">
                  No pending booking requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage; 