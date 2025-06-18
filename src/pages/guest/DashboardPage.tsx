import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Guest Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your guest dashboard content here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome Guest</h2>
          <p className="text-gray-600">
            This is your guest dashboard. You can view limited features here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 