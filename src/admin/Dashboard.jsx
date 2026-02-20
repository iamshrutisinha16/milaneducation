import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://collegemilan-backend-2.onrender.com"; 

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalColleges: 0,
    totalCourses: 0,
    totalEnquiries: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await axios.get(
          `${API_URL}/api/admin/dashboard-stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data.stats);
        setRecentUsers(res.data.recentUsers);
      } catch (error) {
        console.log("Dashboard Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading dashboard...</div>;
  }

  return (
    <div>
      {/* PAGE TITLE */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Admin Dashboard</h3>
        <button className="btn btn-primary">+ Add College</button>
      </div>

      {/* STATS CARDS */}
      <div className="row g-4">
        <StatCard title="Total Users" value={stats.totalUsers} color="primary" />
        <StatCard title="Total Colleges" value={stats.totalColleges} color="success" />
        <StatCard title="Total Courses" value={stats.totalCourses} color="warning" />
        <StatCard title="Total Enquiries" value={stats.totalEnquiries} color="danger" />
      </div>

      {/* ANALYTICS SECTION */}
      <div className="row mt-5">
        <div className="col-lg-8 mb-4">
          <div className="card shadow border-0 p-4">
            <h5 className="fw-semibold mb-3">Platform Overview</h5>
            <div
              style={{
                height: "250px",
                background: "#f8f9fa",
                borderRadius: "10px",
              }}
              className="d-flex align-items-center justify-content-center text-muted"
            >
              Chart / Analytics Graph Area
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card shadow border-0 p-4">
            <h5 className="fw-semibold mb-3">Quick Actions</h5>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary">Manage Colleges</button>
              <button className="btn btn-outline-success">Manage Courses</button>
              <button className="btn btn-outline-warning">View Enquiries</button>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT USERS TABLE */}
      <div className="card shadow border-0 p-4 mt-4">
        <h5 className="fw-semibold mb-3">Recent Registered Users</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length > 0 ? (
                recentUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No recent users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className="col-md-3">
      <div className={`card border-0 shadow-sm bg-${color} text-white`}>
        <div className="card-body">
          <h6 className="text-uppercase">{title}</h6>
          <h2 className="fw-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;