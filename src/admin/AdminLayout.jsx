import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openAcademics, setOpenAcademics] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: collapsed ? "80px" : "250px",
          transition: "0.3s",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          {!collapsed && <h5 className="m-0">College Milan</h5>}
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        <ul className="nav flex-column">

          {/* Dashboard */}
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/dashboard">
              📊 {!collapsed && "Dashboard"}
            </Link>
          </li>

          {/* Users */}
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/users">
              👥 {!collapsed && "Users"}
            </Link>
          </li>

          {/* Academics Dropdown */}
          <li className="nav-item mb-2">
            <div
              className="nav-link text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setOpenAcademics(!openAcademics)}
            >
              🎓 {!collapsed && "Academics ▾"}
            </div>

            {openAcademics && !collapsed && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/qualifications">
                    Qualifications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/universities">
                    Universities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/campuses">
                    Campus
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/careers">
                    Career
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Tests */}
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/tests">
              🧠 {!collapsed && "Tests"}
            </Link>
          </li>

          {/* Enquiries */}
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/enquiries">
              📩 {!collapsed && "Enquiries"}
            </Link>
          </li>

          {/* Content Dropdown */}
          <li className="nav-item mb-2">
            <div
              className="nav-link text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setOpenContent(!openContent)}
            >
              📝 {!collapsed && "Content ▾"}
            </div>

            {openContent && !collapsed && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/events">
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/home">
                    Home
                  </Link>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/about">
                    About
                  </Link>
                  
                </li>
                 <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/payment">
                    Payment Setting
                  </Link>
                  
                </li>
                  <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin/placement">
                    Placement
                  </Link>
                </li>
                
              </ul>
            )}
          </li>

          {/* Logout */}
          <li className="nav-item mt-4">
            <button
              className="btn btn-danger w-100"
              onClick={handleLogout}
            >
              {!collapsed ? "Logout" : "⎋"}
            </button>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-white shadow-sm px-4">
          <span className="navbar-brand mb-0 h5">Admin Panel</span>
          <span className="text-muted">Welcome, Admin</span>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;