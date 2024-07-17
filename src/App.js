//import react
import React from 'react';

//import react router dom
import { Routes, Route } from "react-router-dom";

//import component Register
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </div>
  );
}

export default App;
