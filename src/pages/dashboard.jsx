import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tests, setTests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const config = {
          headers: { "x-auth-token": token },
        };

        const res = await axios.get(
          "https://collegemilan-backend-2.onrender.com/api/user/dashboard-data",
          config
        );

        setProfile(res.data?.profile || null);
        setTests(Array.isArray(res.data?.tests) ? res.data.tests : []);
        setPayments(Array.isArray(res.data?.payments) ? res.data.payments : []);
      } catch (err) {
        console.error("Dashboard error:", err);
        // navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner-grow text-primary" role="status"></div>
        <p className="mt-3">Loading your dashboard...</p>
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center mt-5">User profile not found. Please login again.</div>;
  }

  return (
    <div className={`d-flex ${sidebarOpen ? "toggled" : ""}`} id="wrapper">
      {/* Sidebar */}
      <div className="bg-white border-right" id="sidebar-wrapper">
        <div className="sidebar-heading text-primary fw-bold">COLLEGE MILAN</div>
        <div className="list-group list-group-flush">
          <a href="#" className="list-group-item list-group-item-action active">Dashboard</a>
          <a href="#" className="list-group-item list-group-item-action">My Profile</a>
          <a href="#" className="list-group-item list-group-item-action">My Tests</a>
          <a href="#" className="list-group-item list-group-item-action">Transactions</a>
          <a href="#" className="list-group-item list-group-item-action">Support</a>
          <button onClick={handleLogout} className="list-group-item list-group-item-action text-danger">Logout</button>
        </div>
      </div>

      {/* Page Content */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4">
          <button className="btn btn-outline-primary btn-sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="ms-auto d-flex align-items-center">
            <span className="me-3 d-none d-md-block text-muted">Welcome, <strong>{profile.name}</strong></span>
            <div className="profile-circle">{profile.name.charAt(0)}</div>
          </div>
        </nav>

        <div className="container-fluid p-4">
          <h4 className="mb-4 fw-bold">Student Overview</h4>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm stat-card bg-primary text-white">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 opacity-75">Total Assigned Tests</h6>
                  <h2 className="card-title mb-0">{tests.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm stat-card bg-success text-white">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 opacity-75">Tests Completed</h6>
                  <h2 className="card-title mb-0">
                    {tests.filter((t) => t.status === "Completed").length}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm stat-card bg-dark text-white">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 opacity-75">Wallet / Paid</h6>
                  <h2 className="card-title mb-0">₹{payments.reduce((a, b) => a + (b.amount || 0), 0)}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Tests Table */}
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-bold text-secondary">Active & Recent Tests</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="px-4">Test Name</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.length > 0 ? (
                          tests.map((test) => (
                            <tr key={test._id}>
                              <td className="px-4 fw-semibold">{test.title}</td>
                              <td>{test.qualification || "N/A"}</td>
                              <td>
                                <span className={`badge rounded-pill ${test.status === "Completed" ? "bg-success-light text-success" : "bg-warning-light text-warning"}`}>
                                  {test.status}
                                </span>
                              </td>
                              <td className="text-center">
                                {test.status === "Pending" ? (
                                  <button className="btn btn-primary btn-sm px-3">Start</button>
                                ) : (
                                  <button className="btn btn-outline-secondary btn-sm px-3">Result</button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="4" className="text-center py-4">No tests found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Sidebar Info */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm text-center p-4">
                <div className="profile-avatar mx-auto mb-3">
                    {profile.name.charAt(0)}
                </div>
                <h5 className="fw-bold mb-1">{profile.name}</h5>
                <p className="text-muted small mb-3">{profile.email}</p>
                <hr />
                <div className="text-start">
                    <p className="small mb-1 text-muted text-uppercase">Member Since</p>
                    <p className="fw-bold small">Jan 2024</p>
                    <p className="small mb-1 text-muted text-uppercase">Phone</p>
                    <p className="fw-bold small">{profile.phone || "+91-XXXXXXXXXX"}</p>
                </div>
                <button className="btn btn-outline-primary btn-sm w-100 mt-2">Edit Profile</button>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold text-secondary">Transaction History</h5>
            </div>
            <div className="table-responsive">
               <table className="table mb-0 align-middle">
                 <thead className="bg-light">
                    <tr>
                        <th className="px-4">Order ID</th>
                        <th>Date</th>
                        <th>Test Title</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    {payments.length > 0 ? (
                        payments.map((pay) => (
                        <tr key={pay._id}>
                            <td className="px-4">#ORD-{pay._id.slice(-6).toUpperCase()}</td>
                            <td>{new Date(pay.date).toLocaleDateString()}</td>
                            <td>{pay.test?.title || "Test Pack"}</td>
                            <td className="fw-bold">₹{pay.amount}</td>
                            <td><span className="badge bg-success">Success</span></td>
                        </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="text-center py-4">No transactions found</td></tr>
                    )}
                 </tbody>
               </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;