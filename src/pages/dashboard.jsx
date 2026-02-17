import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Redirect ke liye
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
                // 1. LocalStorage se token nikaalein
                const token = localStorage.getItem('token');
                
                if (!token) {
                    navigate('/login'); 
                    return;
                }
                const config = {
                    headers: { 'x-auth-token': token }
                };
                const res = await axios.get("https://collegemilan-backend-2.onrender.com/api/user/dashboard-data", config);
                
                setProfile(res.data.profile);
                setTests(res.data.tests);
                setPayments(res.data.payments);
            } catch (err) {
                console.error("Dashboard error:", err);
                if(err.response?.status === 401) navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Token delete karein
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    if (!profile) return <div className="text-center mt-5">User not found.</div>;

    return (
        <div className="container my-4">
            {/* Profile Section */}
            <div className="card mb-4 shadow-sm border-0 bg-light">
                <div className="card-body">
                    <h5 className="card-title text-primary">Welcome, {profile.name || "User"}</h5>
                    <p className="mb-1"><strong>Email:</strong> {profile.email}</p>
                    <p className="mb-1"><strong>Role:</strong> <span className="badge bg-info">{profile.role}</span></p>
                    <button className="btn btn-sm btn-outline-primary mt-2">Edit Profile</button>
                </div>
            </div>

            {/* Tests Section */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-white"><strong>Active Tests</strong></div>
                <ul className="list-group list-group-flush">
                    {tests.length > 0 ? (
                        tests.map((test) => (
                            <li key={test._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-0">{test.title}</h6> {/* Aapke schema mein 'title' hai */}
                                    <small className="text-muted">{test.qualification}</small>
                                </div>
                                <span>
                                    <span className={`badge ${test.status === 'Completed' ? 'bg-success' : 'bg-warning'} me-2`}>
                                        {test.status}
                                    </span>
                                    {test.status === "Pending" && <button className="btn btn-sm btn-primary">Start</button>}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-center py-3 text-muted">No tests assigned yet.</li>
                    )}
                </ul>
            </div>

            {/* Payment Section */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-white"><strong>Recent Transactions</strong></div>
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
                            {payments.length > 0 ? (
                                payments.map((pay) => (
                                    <tr key={pay._id}>
                                        <td>{new Date(pay.date).toLocaleDateString()}</td>
                                        <td>{pay.test?.title || "N/A"}</td>
                                        <td>₹{pay.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="3" className="text-center py-3 text-muted">No history.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-end">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;