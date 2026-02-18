import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tests, setTests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const config = { headers: { "x-auth-token": token } };
        const res = await axios.get(
          "https://collegemilan-backend-2.onrender.com/api/user/dashboard-data",
          config
        );

        setProfile(res.data?.profile || null);
        setTests(Array.isArray(res.data?.tests) ? res.data.tests : []);
        setPayments(Array.isArray(res.data?.payments) ? res.data.payments : []);
      } catch (err) {
        console.error("Dashboard error:", err);
        navigate("/login");
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
      <div className="loader-wrapper">
        <div className="custom-loader"></div>
        <p>Syncing your profile...</p>
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <aside className="sidebar shadow">
        <div className="sidebar-logo">
          <h2 className="brand-text">CM<span>.</span></h2>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active"><span>📊</span> Dashboard</div>
          <div className="nav-item"><span>📝</span> My Tests</div>
          <div className="nav-item"><span>💳</span> Payments</div>
          <div className="nav-item"><span>👤</span> Profile</div>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navbar */}
        <header className="top-nav shadow-sm">
          <button className="toggle-btn" onClick={() => setSidebarOpen(!isSidebarOpen)}>☰</button>
          <div className="user-info">
             <div className="user-text text-end d-none d-sm-block">
                <h6 className="mb-0">{profile?.name}</h6>
                <small className="text-muted">{profile?.email}</small>
             </div>
             <div className="user-avatar ms-3">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : "S"}
             </div>
          </div>
        </header>

        <div className="content-padding">
          {/* Hero Section */}
          <div className="welcome-banner mb-4">
            <h1>Welcome back, {profile?.name.split(' ')[0]}! 👋</h1>
            <p>Here is what's happening with your college preparation today.</p>
          </div>

          {/* Stats Section */}
          <div className="row g-4 mb-4">
            <div className="col-lg-4 col-sm-6">
              <div className="stat-card blue shadow-sm">
                <div className="stat-icon">📚</div>
                <div className="stat-data">
                  <h3>{tests.length}</h3>
                  <p>Total Tests</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="stat-card green shadow-sm">
                <div className="stat-icon">✅</div>
                <div className="stat-data">
                  <h3>{tests.filter(t => t.status === "Completed").length}</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="stat-card orange shadow-sm">
                <div className="stat-icon">💰</div>
                <div className="stat-data">
                  <h3>₹{payments.reduce((a, b) => a + (b.amount || 0), 0)}</h3>
                  <p>Paid Amount</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Tests Table */}
            <div className="col-xl-8 mb-4">
              <div className="custom-card shadow-sm h-100">
                <div className="card-head">
                  <h5>Active Exams & Tests</h5>
                  <button className="btn-link">View All</button>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th>Exam Name</th>
                        <th>Qualification</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests.length > 0 ? tests.map((test) => (
                        <tr key={test._id}>
                          <td><span className="fw-bold">{test.title}</span></td>
                          <td><span className="text-muted">{test.qualification}</span></td>
                          <td>
                            <span className={`status-badge ${test.status.toLowerCase()}`}>
                              {test.status}
                            </span>
                          </td>
                          <td>
                            {test.status === "Pending" ? (
                              <button className="btn btn-primary btn-sm rounded-pill px-3">Start Now</button>
                            ) : (
                              <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">Result</button>
                            )}
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="4" className="text-center py-5">No tests assigned yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="col-xl-4 mb-4">
              <div className="custom-card shadow-sm h-100">
                <div className="card-head">
                  <h5>Recent Payments</h5>
                </div>
                <div className="payment-list mt-3">
                  {payments.length > 0 ? payments.map((pay) => (
                    <div className="payment-item" key={pay._id}>
                      <div className="p-icon">💸</div>
                      <div className="p-info">
                        <h6>{pay.test?.title || "Registration Fee"}</h6>
                        <small>{new Date(pay.date).toLocaleDateString()}</small>
                      </div>
                      <div className="p-amount text-success fw-bold">₹{pay.amount}</div>
                    </div>
                  )) : (
                    <div className="text-center py-4 text-muted">No history.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;