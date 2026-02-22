import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [statsRes, recentRes, monthlyRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/admin/dashboard/stats`, { headers }),
          axios.get(`${API_BASE_URL}/api/admin/dashboard/recent-enquiries`, { headers }),
          axios.get(`${API_BASE_URL}/api/admin/dashboard/monthly-enquiries`, { headers }),
        ]);

        setStats(statsRes.data);
        setRecentEnquiries(recentRes.data);
        setMonthlyData(monthlyRes.data);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

  // Graph Data
  const monthNames = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const chartData = {
    labels: monthlyData.map(item => monthNames[item._id]),
    datasets: [
      {
        label: "Monthly Enquiries",
        data: monthlyData.map(item => item.count),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Admin Dashboard</h3>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/courses")}
        >
          + Add Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {[
          { title: "Users", value: stats.totalUsers },
          { title: "Enquiries", value: stats.totalEnquiries },
          { title: "Courses", value: stats.totalCourses },
          { title: "Tests", value: stats.totalTests },
          { title: "Universities", value: stats.totalUniversities },
        ].map((item, index) => (
          <div className="col-md-4" key={index}>
           <div className="card shadow-sm border-0 p-3 rounded-4 text-white"
           style={{ backgroundColor: ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#845EC2"]
           [index % 5] }}>
        <h6>{item.title}</h6>
         <h2 className="fw-bold">{item.value}</h2>
         </div>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="card shadow-sm border-0 p-4 rounded-4 mb-5">
        <h5 className="mb-3">Enquiries Analytics</h5>
        <Bar data={chartData} />
      </div>

      {/* Recent Enquiries */}
      <div className="card shadow-sm border-0 p-4 rounded-4">
        <h5 className="mb-3">Recent Enquiries</h5>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enquiry, index) => (
                  <tr key={index}>
                    <td>{enquiry.name}</td>
                    <td>{enquiry.email}</td>
                    <td>{enquiry.course}</td>
                    <td>
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No recent enquiries
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 d-flex gap-3 flex-wrap">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/admin/universities")}
        >
          Manage Universities
        </button>

        <button
          className="btn btn-outline-success"
          onClick={() => navigate("/admin/tests")}
        >
          Manage Tests
        </button>

        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/admin/enquiries")}
        >
          View All Enquiries
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;