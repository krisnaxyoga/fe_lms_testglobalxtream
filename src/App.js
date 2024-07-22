//import react
import React from "react";

//import react router dom
import { Routes, Route } from "react-router-dom";

//import component Register
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import LeadList from "./View/leads/List";
import LeadCreate from "./View/leads/Create";
import MasterData from "./View/master_data/MasterData";
import LeadUpdate from "./View/leads/Update";
import LeadDetail from "./View/leads/Detail";


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<LeadList />} />
          <Route path="/leads-create" element={<LeadCreate />} />
          <Route path="/leads-update/:id" element={<LeadUpdate />} />
          <Route path="/leads-detail/:id" element={<LeadDetail />} />

          <Route path="/leads-setting" element={<MasterData />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
