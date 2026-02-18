import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tests, setTests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // --- DYNAMIC URL LOGIC ---
  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://collegemilan-backend-2.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const config = { headers: { "x-auth-token": token } };
        
        // Fetching real-time data from backend
        const res = await axios.get(`${API_BASE_URL}/api/user/dashboard-data`, config);

        // Setting states from Backend Response
        setProfile(res.data?.profile || res.data?.user || null);
        setTests(Array.isArray(res.data?.tests) ? res.data.tests : []);
        setPayments(Array.isArray(res.data?.payments) ? res.data.payments : []);
        
      } catch (err) {
        console.error("Fetch Error:", err);
        if (err.response?.status === 401) {
             localStorage.clear();
             window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE_URL]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="db-loading-screen">
        <div className="db-spinner"></div>
        <p>Loading College Milan Portal...</p>
      </div>
    );
  }

  // --- REAL STATUS CALCULATIONS ---
  const totalTestsCount = tests.length;
  
  const completedCount = tests.filter(t => 
    t.status?.toLowerCase() === "completed"
  ).length;

  const totalPaidAmount = payments
    .filter(p => p.status === "Success" || p.status === "completed") 
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Profile Presentation
  const safeName = profile?.name || profile?.email?.split('@')[0] || "Student";
  const userInitial = safeName.charAt(0).toUpperCase();

  return (
    <div className={`db-layout ${sidebarOpen ? "sb-open" : "sb-closed"}`}>
      {/* Sidebar */}
      <aside className="db-sidebar">
        <div className="db-logo-area">
          <h3 className="m-0">COLLEGE<span>MILAN</span></h3>
        </div>
        <nav className="db-nav-links">
          <div className={`db-link ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
            <i className="bi bi-grid-1x2-fill me-2"></i> Dashboard Overview
          </div>
          <div className={`db-link ${activeTab === "tests" ? "active" : ""}`} onClick={() => setActiveTab("tests")}>
            <i className="bi bi-journal-text me-2"></i> Assigned Exams
          </div>
          <div className={`db-link ${activeTab === "payments" ? "active" : ""}`} onClick={() => setActiveTab("payments")}>
            <i className="bi bi-credit-card-2-front me-2"></i> Payment History
          </div>
        </nav>
        <div className="db-sidebar-footer">
          <button className="db-btn-logout" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left me-2"></i> Logout
          </button>
        </div>
      </aside>

      <main className="db-main-area">
        {/* Header */}
        <header className="db-top-header">
          <div className="header-left">
            <button className="db-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <h5 className="mb-0 d-none d-md-block">Student Dashboard</h5>
          </div>
          <div className="db-user-identity">
            <div className="db-user-meta text-end">
              <span className="db-name-top fw-bold">{safeName}</span>
              <small className="text-muted d-block">ID: CM-{profile?._id?.slice(-6) || "STU"}</small>
            </div>
            <div className="db-avatar">{userInitial}</div>
          </div>
        </header>

        <div className="db-content-container">
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="fade-in">
              <div className="db-welcome-box mb-4">
                <h2>Welcome back, {safeName.split(' ')[0]}! 👋</h2>
                <p>Track your preparation progress and manage your applications.</p>
              </div>

              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <div className="db-stat-card card-blue">
                    <div className="stat-content">
                      <p>Total Tests</p>
                      <h3>{totalTestsCount}</h3>
                    </div>
                    <div className="stat-icon">📚</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="db-stat-card card-green">
                    <div className="stat-content">
                      <p>Completed</p>
                      <h3>{completedCount}</h3>
                    </div>
                    <div className="stat-icon">✅</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="db-stat-card card-purple">
                    <div className="stat-content">
                      <p>Total Paid</p>
                      <h3>₹{totalPaidAmount}</h3>
                    </div>
                    <div className="stat-icon">💳</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TESTS TAB */}
          {activeTab === "tests" && (
            <div className="db-white-card shadow-sm fade-in">
              <div className="db-card-header"><h5>Assigned Exams</h5></div>
              <div className="table-responsive p-3">
                <table className="table db-custom-table">
                  <thead>
                    <tr><th>Exam Title</th><th>Level</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {tests.length > 0 ? (
                      tests.map((test) => (
                        <tr key={test._id}>
                          <td>{test.title}</td>
                          <td>{test.qualification}</td>
                          <td><span className={`db-status-badge ${test.status?.toLowerCase()}`}>{test.status}</span></td>
                          <td>
                            <button className={`btn btn-sm ${test.status === "Pending" ? "btn-primary-cm" : "btn-outline-secondary-cm"}`}>
                              {test.status === "Pending" ? "Start Now" : "Review Result"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="text-center py-5 text-muted">No exams assigned yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. PAYMENTS TAB */}
          {activeTab === "payments" && (
            <div className="db-white-card shadow-sm fade-in">
              <div className="db-card-header"><h5>Payment Transactions</h5></div>
              <div className="p-3">
                {payments.length > 0 ? (
                  payments.map((pay) => (
                    <div className="db-pay-row" key={pay._id}>
                      <div className="pay-icon-box">₹</div>
                      <div className="pay-details">
                        <p className="pay-title">{pay.test?.title || "Course Enrollment"}</p>
                        <small className="text-muted">{new Date(pay.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
                      </div>
                      <div className="pay-amount-status text-end">
                        <p className="pay-amount fw-bold">₹{pay.amount}</p>
                        <span className={`pay-status-${pay.status?.toLowerCase()}`}>{pay.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 text-muted"><p>No transaction history found.</p></div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;