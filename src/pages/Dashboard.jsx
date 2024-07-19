import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Layout/Index';

function Dashboard() {
  const navigate = useNavigate(); // Rename from history to navigate
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate, location.pathname]);

  return (
    <Layout>
      
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className='text-gray-500'>Welcome...</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
