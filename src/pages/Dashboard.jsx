import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Layout/Index';
import Api from "../api/Index";

function Dashboard() {
  const navigate = useNavigate(); // Rename from history to navigate
  const location = useLocation();
  const [name, setName] = useState('');

  useEffect(()=>{
    getme();
  },[]);

  const getme = async() =>{
    try {
      
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api('/api/auth/me', config);
      setName(response.data.name);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  }

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
          <p className='text-gray-500'>Welcome... {name}</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
