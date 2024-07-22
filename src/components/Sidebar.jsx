import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/Index";
import { TbLayoutDashboard } from "react-icons/tb";
import { GrCube } from "react-icons/gr";
import { LuArchive } from "react-icons/lu";

const Sidebar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1199px)" });
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const isActivePath = (path) => {
    return location.pathname === path;
  };
  const valuepx = showSidebar ? (isMobile ? -300 : 0) : isMobile ? 0 : -300;
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
      <aside id="sidebar" className={`sidebar`} style={{ left: valuepx }}>
        {isMobile && (
          <button
            className="btn-close position-absolute top-0 end-0 p-2"
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={toggleSidebar}
          ></button>
        )}
        <div className="sidebar-nav">
          <a
            href="/"
            className="logo d-flex align-items-center justify-content-center"
            style={{ marginBottom: "50px" }}
          >
            <img src="/logo_dashboard.png" alt="Logo" width={172} height={58} />
          </a>
        </div>

        <ul className="sidebar-nav" id="sidebar-nav">
          <p className="fw-bold p-2">LEADS MANAGEMENT</p>
          <li className="nav-item py-3">
            <Link
              to="/dashboard"
              className={` ${
                isActivePath("/dashboard")
                  ? "bg-gray-200 dark:bg-gray-700 fw-bold"
                  : ""
              }`}
            >
              <TbLayoutDashboard style={{width:'59px',height:'24px'}}/>

              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item py-3">
            <Link
              to="/leads"
              className={` ${
                isActivePath("/leads")
                  ? "bg-gray-200 dark:bg-gray-700 fw-bold"
                  : ""
              }`}
            >
              <GrCube style={{width:'59px',height:'24px'}}/>

              <span>Leads</span>
            </Link>
          </li>
          <li className="nav-item py-3">
            <Link
              to="/leads-setting"
              className={` ${
                isActivePath("/leads-setting")
                  ? "bg-gray-200 dark:bg-gray-700 fw-bold"
                  : ""
              }`}
            >
              <LuArchive style={{width:'59px',height:'24px'}}/>

              <span>Leads Setting</span>
            </Link>
          </li>
        </ul>
        <footer className="sidebar-footer mt-auto">
          <p className="text-center">Version 2.0.0</p>
        </footer>
      </aside>
      <header
        id="header"
        className={`header fixed-top d-flex align-items-center ${
          !showSidebar && "show-sidebar"
        }`}
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <span className="d-none d-lg-block"></span>
          </a>
          <button
            className="btn btn-transparant toggle-sidebar-bt"
            onClick={toggleSidebar}
          >
            <img src="/humberger.svg" alt="humberger.svg" />
          </button>
        </div>

        <div className="search-bar">
          <p
            className="d-flex align-items-center m-0"
            style={{ fontSize: "20px", color: "#26273B" }}
          >
            {location.pathname === "/dashboard" ? (
              <span>Dashboard</span>
            ) : location.pathname === "/leads" ? (
              <span>Leads</span>
            ) : location.pathname === "/leads-setting" ? (
              <span>Leads Setting</span>
            ) : null}
          </p>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </Link>
            </li>

            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
                onClick={toggleDropdown}
              >
                <img
                  src="/avatar.png"
                  alt="Profile"
                  width={33}
                  height={32}
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2 text-black"></span>
              </Link>

              <ul
                className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${
                  showDropdown ? "show" : "hidden"
                }`}
              >
                <li className="dropdown-header">
                  <h6>Kevin Anderson</h6>
                  <span>Web Designer</span>
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="pages-faq.html"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Sidebar;
