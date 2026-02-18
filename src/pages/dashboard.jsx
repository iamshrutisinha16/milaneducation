import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"; 

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

        // Backend response check
        console.log("Dashboard Data:", res.data);

        // Safe state updates
        setProfile(res.data?.profile || res.data?.user || null);
        setTests(Array.isArray(res.data?.tests) ? res.data.tests : []);
        setPayments(Array.isArray(res.data?.payments) ? res.data.payments : []);
      } catch (err) {
        console.error("Dashboard error:", err);
        if (err.response?.status === 401) {
             navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 fw-bold text-secondary">Loading College Milan Dashboard...</p>
      </div>
    );
  }

  // Safe Name and Initial logic
  const userName = profile?.name || "Student";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className={`d-flex ${sidebarOpen ? "toggled" : ""}`} id="wrapper">
      {/* Sidebar */}
      <div className="bg-white border-right shadow-sm" id="sidebar-wrapper">
        <div className="sidebar-heading text-primary fw-bold fs-4 border-bottom">
           COLLEGE MILAN
        </div>
        <div className="list-group list-group-flush pt-3">
          <a href="#" className="list-group-item list-group-item-action active mx-2 rounded mb-1"> Dashboard</a>
          <a href="#" className="list-group-item list-group-item-action mx-2 rounded mb-1"> My Profile</a>
          <a href="#" className="list-group-item list-group-item-action mx-2 rounded mb-1"> My Tests</a>
          <a href="#" className="list-group-item list-group-item-action mx-2 rounded mb-1"> Reports</a>
          <button onClick={handleLogout} className="list-group-item list-group-item-action text-danger mt-5">Logout</button>
        </div>
      </div>

      {/* Page Content */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 shadow-sm sticky-top">
          <button className="btn btn-outline-primary btn-sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          
          <div className="ms-auto d-flex align-items-center">
            <span className="me-3 d-none d-md-block text-muted">
                Welcome, <strong>{userName}</strong>
            </span>
            <div className="profile-circle">{userInitial}</div>
          </div>
        </nav>

        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
             <h4 className="fw-bold m-0">Student Overview</h4>
             <span className="text-muted small">{new Date().toDateString()}</span>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm stat-card gradient-blue text-white">
                <div className="card-body">
                  <h6 className="opacity-75">Assigned Tests</h6>
                  <h2 className="fw-bold">{tests.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm stat-card gradient-green text-white">
                <div className="card-body">
                  <h6 className="opacity-75">Completed</h6>
                  <h2 className="fw-bold">
                    {tests.filter((t) => t.status === "Completed").length}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm stat-card gradient-dark text-white">
                <div className="card-body">
                  <h6 className="opacity-75">Total Spent</h6>
                  <h2 className="fw-bold">₹{payments.reduce((a, b) => a + (b.amount || 0), 0)}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Tests List */}
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white py-3 border-0">
                  <h5 className="mb-0 fw-bold">Active Tests</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light text-muted small uppercase">
                        <tr>
                          <th className="px-4">Test Details</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.length > 0 ? (
                          tests.map((test) => (
                            <tr key={test._id}>
                              <td className="px-4">
                                <div className="fw-bold">{test.title}</div>
                                <div className="small text-muted">ID: {test._id.slice(-6)}</div>
                              </td>
                              <td className="small">{test.qualification || "N/A"}</td>
                              <td>
                                <span className={`badge px-3 py-2 rounded-pill ${test.status === "Completed" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}>
                                  {test.status}
                                </span>
                              </td>
                              <td className="text-center">
                                {test.status === "Pending" ? (
                                  <button className="btn btn-primary btn-sm px-4 shadow-sm">Start Test</button>
                                ) : (
                                  <button className="btn btn-outline-secondary btn-sm px-4">View Result</button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="4" className="text-center py-5 text-muted">No tests assigned yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Profile Card */}
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm p-4 text-center h-100">
                <div className="profile-avatar mx-auto mb-3 shadow-sm">
                    {userInitial}
                </div>
                <h5 className="fw-bold mb-1">{userName}</h5>
                <p className="text-muted small mb-4">{profile?.email}</p>
                <div className="bg-light p-3 rounded-3 text-start mb-3">
                    <div className="mb-2">
                        <small className="text-muted d-block">Phone Number</small>
                        <span className="fw-semibold small">{profile?.phone || "Not Updated"}</span>
                    </div>
                    <div>
                        <small className="text-muted d-block">Account Status</small>
                        <span className="text-success small fw-bold">● Active Student</span>
                    </div>
                </div>
                <button className="btn btn-outline-primary w-100 btn-sm">Edit Profile Details</button>
              </div>
            </div>
          </div>

          {/* Payments Section */}
          <div className="card border-0 shadow-sm mt-2">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="mb-0 fw-bold text-secondary">Recent Transactions</h5>
            </div>
            <div className="table-responsive">
               <table className="table mb-0 align-middle">
                 <thead className="bg-light small">
                    <tr>
                        <th className="px-4">Transaction ID</th>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                 </thead>
                 <tbody>
                    {payments.length > 0 ? (
                        payments.map((pay) => (
                        <tr key={pay._id}>
                            <td className="px-4 text-muted small">#TXN-{pay._id.slice(-8).toUpperCase()}</td>
                            <td className="small">{new Date(pay.date).toLocaleDateString()}</td>
                            <td className="small">{pay.test?.title || "Test Registration"}</td>
                            <td className="fw-bold">₹{pay.amount}</td>
                            <td><span className="badge bg-success-subtle text-success">Paid</span></td>
                        </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="text-center py-4 text-muted">No transactions found.</td></tr>
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