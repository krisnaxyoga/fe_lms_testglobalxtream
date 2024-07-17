import React, { useState } from 'react';
import { NavLink, useLocation,useNavigate } from "react-router-dom";
import Api from '../api/Index';

function Index({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  // Function to determine if the given path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const logout = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      await Api.post('api/auth/logout', {}, config);
      localStorage.removeItem('token');
      history('/');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
            <li className={`mr-4 ${isActivePath("/applicant-list") ? "text-blue-500" : "text-gray-500"}`}>
              <button onClick={logout}>Log out</button>
            </li>
          </ul>
        </nav>
      </div>
      {loading ? (
        <div className="flex justify-center my-4 opacity-75" style={{transition: "opacity 0.1s ease-in-out"}}>
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="flex justify-center my-4 bg-grey-100">
          <main>
          {children}
        </main>
        </div>
        
      )}
    </div>
  );
}

export default Index;

