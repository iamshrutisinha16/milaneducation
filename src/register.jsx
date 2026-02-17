import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Alag se CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("https://collegemilan-backend-2.onrender.com/api/auth/register", {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                mobile: formData.mobile
            });

            alert(res.data.message);
            navigate('/login'); // Register hone ke baad login pe bhej do
        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="register-container container-fluid d-flex align-items-center">
            {/* Left Side "One Click Sign Up" Tab */}
            <div className="side-tab">One Click Sign Up <span>▶</span></div>

            <div className="container">
                <div className="row align-items-center">
                    {/* Left Side: Form */}
                    <div className="col-lg-6 col-md-12 px-5">
                        <h2 className="text-center mb-4 fw-bold title-text">Create Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input type="text" name="firstName" className="form-control custom-input" placeholder="First Name" onChange={handleChange} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <input type="text" name="lastName" className="form-control custom-input" placeholder="Last Name" onChange={handleChange} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <input type="email" name="email" className="form-control custom-input" placeholder="Email" onChange={handleChange} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <input type="text" name="mobile" className="form-control custom-input" placeholder="Mobile" onChange={handleChange} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <input type={showPassword ? "text" : "password"} name="password" className="form-control custom-input" placeholder="Password" onChange={handleChange} required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <input type={showPassword ? "text" : "password"} name="confirmPassword" className="form-control custom-input" placeholder="Confirm Password" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="showPass" onChange={() => setShowPassword(!showPassword)} />
                                <label className="form-check-label show-pass-text" htmlFor="showPass">Show Password</label>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-orange w-75 py-2">Create Account</button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side: Features List */}
                    <div className="col-lg-6 col-md-12 mt-5 mt-lg-0 ps-lg-5 feature-section">
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-start mb-4">
                                <span className="check-icon">✔</span>
                                <span className="ms-3 feature-text">Get Personalized Career Suggestions</span>
                            </li>
                            <li className="d-flex align-items-start mb-4">
                                <span className="check-icon">✔</span>
                                <span className="ms-3 feature-text">Get Career Related Help</span>
                            </li>
                            <li className="d-flex align-items-start mb-4">
                                <span className="check-icon">✔</span>
                                <span className="ms-3 feature-text">Track Your Tests and Counseling Sessions</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;