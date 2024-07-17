import React from 'react';

import Layout from '../Layout/Index';

function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className='text-gray-500'>Welcome...</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
