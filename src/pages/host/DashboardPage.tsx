import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Host Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Properties Overview</h2>
          <p className="text-gray-600">
            Manage your properties and view their performance.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <p className="text-gray-600">
            View and manage your recent booking requests.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <p className="text-gray-600">
            Track your earnings and property performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 