import React from 'react';
import { NavLink, useLocation } from "react-router-dom";

function Index({ children }) {
  const location = useLocation();

  // Function to determine if the given path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <nav className="bg-white p-4">
          <ul className="flex justify-center">
            <li className={`mr-4 ${isActivePath("/") ? "text-blue-500" : "text-gray-500"}`}>
              <NavLink exact to="/" activeClassName="text-blue-500">Home</NavLink>
            </li>
            <li className={`mr-4 ${isActivePath("/candidate-list") ? "text-blue-500" : "text-gray-500"}`}>
              <NavLink to="/candidate-list" activeClassName="text-blue-500">Candidate</NavLink>
            </li>
            <li className={`mr-4 ${isActivePath("/vacancy-list") ? "text-blue-500" : "text-gray-500"}`}>
              <NavLink to="/vacancy-list" activeClassName="text-blue-500">Vacancy</NavLink>
            </li>
            <li className={`mr-4 ${isActivePath("/applicant-list") ? "text-blue-500" : "text-gray-500"}`}>
              <NavLink to="/applicant-list" activeClassName="text-blue-500">Applicant</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-center my-4">
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Index;

