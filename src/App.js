//import react
import React from 'react';

//import react router dom
import { Routes, Route } from "react-router-dom";

//import component Register
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LeadList from './view/leads/List';
import MasterData from './view/master_data/MasterData';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/leads' element={<LeadList/>}/>
        
        <Route path='/master_data' element={<MasterData/>}/>

      </Routes>
    </div>
  );
}

export default App;
