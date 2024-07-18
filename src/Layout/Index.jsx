import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/Index";

function Index({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const history = useNavigate();

  // Function to determine if the given path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const logout = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await Api.post("api/auth/logout", {}, config);
      localStorage.removeItem("token");
      history("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-800">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white w-60 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4">
            <span className="text-xl font-bold">Sidebar</span>
          </div>
          {/* Menu items */}
          <nav className="mt-5">
            <ul className="space-y-2">
              <li>
              <div className="bg-gray-700">
                <p className="px-2 font-bold"> Primary Menu</p>
              </div>
                
              </li>
              <li
                className={`${
                  isActivePath("/") ? "text-blue-500" : "text-grey-500"
                }`}
              >
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  exact
                  to="/"
                  activeClassName="text-blue-500"
                >
                  Home
                </NavLink>
              </li>
              <li
                className={`${
                  isActivePath("/candidate-list")
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  to="/leads"
                  activeClassName="text-blue-500"
                >
                  Lead
                </NavLink>
              </li>
              <li
                className={`${
                  isActivePath("/applicant-list")
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  onClick={logout}
                >
                  Log out
                </NavLink>
              </li>
              <li>
                <div className="bg-gray-700">
<p className="px-2 font-bold"> Master Data</p>
                </div>
                
              </li>
              <li className={`${
                  isActivePath("/master_data") ? "text-blue-500" : "text-grey-500"
                }`}>
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  to="/master_data"
                  activeClassName="text-blue-500"
                >
                  MASTER DATA
                </NavLink>
              </li>
              <li className={`${
                  isActivePath("/") ? "text-blue-500" : "text-grey-500"
                }`}>
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  to="/lead-probabilities"
                  activeClassName="text-blue-500"
                >
                  Lead Probabilities
                </NavLink>
              </li>
              <li className={`${
                  isActivePath("/") ? "text-blue-500" : "text-grey-500"
                }`}>
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  to="/lead-types"
                  activeClassName="text-blue-500"
                >
                  Lead Types
                </NavLink>
              </li>
              <li className={`${
                  isActivePath("/") ? "text-blue-500" : "text-grey-500"
                }`}>
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  to="/lead_channels"
                  activeClassName="text-blue-500"
                >
                  Lead Channels
                </NavLink>
              </li>
              <li className={`${
                  isActivePath("/") ? "text-blue-500" : "text-grey-500"
                }`}>
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  to="/lead-medias"
                  activeClassName="text-blue-500"
                >
                  Lead Medias
                </NavLink>
              </li>
              <li className={`${
                  isActivePath("/") ? "text-blue-500" : "text-grey-500"
                }`}>
                <NavLink
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                  to="/lead-sources"
                  activeClassName="text-blue-500"
                >
                  Lead Sources
                </NavLink>
              </li>

             
            </ul>
          </nav>
        </div>
        {/* Hamburger button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-300 focus:outline-none focus:text-gray-500"
        >
          <svg
            className={`h-6 w-6 transition-transform duration-300 ${
              isSidebarOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6L18 18"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6h18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12h18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 18h18"
                />
              </>
            )}
          </svg>
        </button>
        {/* Content area */}
        <div className="flex-1 bg-gray-200">
          <div className="p-8">
            {loading ? (
              <div
                className="flex justify-center my-4 opacity-75"
                style={{ transition: "opacity 0.1s ease-in-out" }}
              >
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : (
              <div className="flex justify-center my-4 bg-grey-100">
                <main>{children}</main>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
