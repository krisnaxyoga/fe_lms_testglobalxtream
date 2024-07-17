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
        {/* <Route path="/candidate-list" element={<CandidateListData />} />
        
        <Route path="/candidate-create" element={<CandidateCreate />} />
        
        <Route path="/candidate-update/edit/:id" element={<CandidateUpdate />} /> */}

        {/* vacancy */}
        {/* <Route path="/vacancy-list" element={<VacancyListData />} />
        
        <Route path="/vacancy-create" element={<VacancyCreate />} />
        
        <Route path="/vacancy-update/edit/:id" element={<VacancyUpdate />} /> */}

         {/* applicant */}
         {/* <Route path="/applicant-list" element={<ApplicantListData />} />
        
        <Route path="/applicant-create" element={<ApplicantCreate />} />
        
        <Route path="/applicant-update/edit/:id" element={<ApplicantUpdate />} /> */}

      </Routes>
    </div>
  );
}

export default App;
