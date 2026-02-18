import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tests, setTests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setPayments(
          Array.isArray(res.data?.payments) ? res.data.payments : []
        );
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-loader">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center mt-5">User not found</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container py-5">
        {/* Header */}
        <div className="dashboard-header mb-4">
          <div>
            <h3 className="mb-1">
              Welcome, <span>{profile.name}</span>
            </h3>
            <p className="text-muted mb-0">{profile.email}</p>
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="dashboard-card stat-card">
              <h6>Total Tests</h6>
              <h3>{tests.length}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card stat-card">
              <h6>Completed</h6>
              <h3>
                {
                  tests.filter((t) => t.status === "Completed")
                    .length
                }
              </h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card stat-card">
              <h6>Total Payments</h6>
              <h3>₹{payments.reduce((a, b) => a + (b.amount || 0), 0)}</h3>
            </div>
          </div>
        </div>

        {/* Active Tests */}
        <div className="dashboard-card mb-4">
          <div className="card-header-custom">
            <h5>Active Tests</h5>
          </div>

          {tests.length > 0 ? (
            tests.map((test) => (
              <div
                key={test._id}
                className="test-row d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="mb-0">{test.title}</h6>
                  <small className="text-muted">
                    {test.qualification}
                  </small>
                </div>

                <div>
                  <span
                    className={`badge ${
                      test.status === "Completed"
                        ? "bg-success"
                        : "bg-warning"
                    } me-3`}
                  >
                    {test.status}
                  </span>

                  {test.status === "Pending" && (
                    <button className="btn btn-sm btn-primary">
                      Start Test
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center py-4">
              No tests assigned yet.
            </p>
          )}
        </div>

        {/* Transactions */}
        <div className="dashboard-card">
          <div className="card-header-custom">
            <h5>Recent Transactions</h5>
          </div>

          {payments.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Test</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((pay) => (
                  <tr key={pay._id}>
                    <td>
                      {new Date(pay.date).toLocaleDateString()}
                    </td>
                    <td>{pay.test?.title || "N/A"}</td>
                    <td>₹{pay.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted text-center py-4">
              No payment history.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
