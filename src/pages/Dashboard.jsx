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
      <div></div>
    </Layout>
  );
}

export default Dashboard;
