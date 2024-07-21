import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation, } from 'react-router-dom';

const Sidebar = () => {
    
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 1199px)' });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const isActivePath = (path) => {
    return location.pathname === path;
  };
  const sidebarClass = showSidebar ? 'show' : (isMobile ? 'hidden' : 'hidden');

  return (
    <>
     
      <aside id="sidebar" className={`sidebar ${sidebarClass}`}>
      
        <a href="/" className="logo d-flex align-items-center">
            <img src="/logo_dashboard.png" alt="Logo" width={102} height={58}/>
          </a>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-menu-button-wide"></i>
              <span>Components</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link to="/components-alerts">
                  <i className="bi bi-circle"></i>
                  <span>Alerts</span>
                </Link>
              </li>
              <li>
                <Link to="/components-accordion">
                  <i className="bi bi-circle"></i>
                  <span>Accordion</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <header id="header" className={`header fixed-top d-flex align-items-center ${!showSidebar && 'show-sidebar'}`}>
        <div className="d-flex align-items-center justify-content-between">
          {/* <a href="/" className="logo d-flex align-items-center">
            <img src="/logo_dashboard.png" alt="Logo" width={102} height={58}/>
          </a> */}
          <div className="logo d-flex align-items-center"></div>
          <button className='btn btn-transparant' onClick={toggleSidebar}>
            <img src="/humberger.svg" alt="humberger.svg" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Sidebar;

