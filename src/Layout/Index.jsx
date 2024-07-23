import React, { useEffect,useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/Index";
import Sidebar from "../components/Sidebar";

function Index({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const history = useNavigate();

  // Function to determine if the given path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  useEffect(()=>{
    regreshToken();
  })
  const regreshToken = async() =>{
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api('/api/auth/refresh',config);
      localStorage.setItem('token', response.data.access_token);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  }

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
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
};

const [isCollapsed, setIsCollapsed] = useState(false);

const toggleSidebar = () => {
  setIsCollapsed(!isCollapsed);
};



  return (
    <>
    <Sidebar/>
    <main id="main" class="main">
      {children}
    </main>

    </>
  );
}

export default Index;
