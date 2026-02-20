import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
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
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/dashboard">
              📊 {!collapsed && "Dashboard"}
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/colleges">
              🎓 {!collapsed && "Colleges"}
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/courses">
              📚 {!collapsed && "Courses"}
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/users">
              👥 {!collapsed && "Users"}
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/admin/enquiries">
              📩 {!collapsed && "Enquiries"}
            </Link>
          </li>

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

      {/* Main Content Area */}
      <div className="flex-grow-1">
        
        {/* Top Navbar */}
        <nav className="navbar navbar-light bg-white shadow-sm px-4">
          <span className="navbar-brand mb-0 h5">Admin Dashboard</span>
          <span className="text-muted">Welcome, Admin</span>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;