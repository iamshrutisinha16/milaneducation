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
          headers: {
            "x-auth-token": token,
          },
        };

        const res = await axios.get(
          "https://collegemilan-backend-2.onrender.com/api/user/dashboard-data",
          config
        );

        console.log("Dashboard Data:", res.data);

        // SAFE DATA ASSIGNMENT
        setProfile(res.data?.profile || null);
        setTests(Array.isArray(res.data?.tests) ? res.data.tests : []);
        setPayments(Array.isArray(res.data?.payments) ? res.data.payments : []);
      } catch (err) {
        console.error("Dashboard error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
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

  // Loading Spinner
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  // If profile missing
  if (!profile) {
    return (
      <div className="text-center mt-5">
        <h5>User not found.</h5>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {/* Profile Section */}
      <div className="card mb-4 shadow-sm border-0 bg-light">
        <div className="card-body">
          <h5 className="card-title text-primary">
            Welcome, {profile?.name || "User"}
          </h5>
          <p className="mb-1">
            <strong>Email:</strong> {profile?.email || "N/A"}
          </p>
          <p className="mb-1">
            <strong>Role:</strong>{" "}
            <span className="badge bg-info">
              {profile?.role || "User"}
            </span>
          </p>
          <button className="btn btn-sm btn-outline-primary mt-2">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tests Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white">
          <strong>Active Tests</strong>
        </div>
        <ul className="list-group list-group-flush">
          {Array.isArray(tests) && tests.length > 0 ? (
            tests.map((test) => (
              <li
                key={test._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="mb-0">{test?.title || "Untitled Test"}</h6>
                  <small className="text-muted">
                    {test?.qualification || "N/A"}
                  </small>
                </div>
                <span>
                  <span
                    className={`badge ${
                      test?.status === "Completed"
                        ? "bg-success"
                        : "bg-warning"
                    } me-2`}
                  >
                    {test?.status || "Pending"}
                  </span>

                  {test?.status === "Pending" && (
                    <button className="btn btn-sm btn-primary">
                      Start
                    </button>
                  )}
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center py-3 text-muted">
              No tests assigned yet.
            </li>
          )}
        </ul>
      </div>

      {/* Payment Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white">
          <strong>Recent Transactions</strong>
        </div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Test</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(payments) && payments.length > 0 ? (
                payments.map((pay) => (
                  <tr key={pay._id}>
                    <td>
                      {pay?.date
                        ? new Date(pay.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{pay?.test?.title || "N/A"}</td>
                    <td>₹{pay?.amount || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-3 text-muted"
                  >
                    No history.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logout */}
      <div className="text-end">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
