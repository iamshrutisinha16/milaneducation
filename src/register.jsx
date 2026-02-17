import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', mobile: '', password: '', confirmPassword: ''
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
            alert("Registration Successful!");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="reg-page">
            {/* Side Tab */}
            <div className="side-tab-orange">One Click Sign Up <span>▶</span></div>

            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="reg-card shadow-lg">
                    <div className="row g-0">
                        
                        {/* Left Side: Form */}
                        <div className="col-lg-7 p-4 p-md-5">
                            <h3 className="fw-bold mb-1">Create Account</h3>
                            <p className="text-muted small mb-4">Quick & easy registration</p>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    {/* Name Row */}
                                    <div className="col-6">
                                        <input type="text" name="firstName" className="form-control compact-input" placeholder="First Name" onChange={handleChange} required />
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="lastName" className="form-control compact-input" placeholder="Last Name" onChange={handleChange} required />
                                    </div>

                                    {/* Contact Row */}
                                    <div className="col-12">
                                        <input type="email" name="email" className="form-control compact-input" placeholder="Email Address" onChange={handleChange} required />
                                    </div>
                                    <div className="col-12">
                                        <input type="text" name="mobile" className="form-control compact-input" placeholder="Mobile Number" onChange={handleChange} required />
                                    </div>

                                    {/* Password Row */}
                                    <div className="col-6">
                                        <input type={showPassword ? "text" : "password"} name="password" className="form-control compact-input" placeholder="Password" onChange={handleChange} required />
                                    </div>
                                    <div className="col-6">
                                        <input type={showPassword ? "text" : "password"} name="confirmPassword" className="form-control compact-input" placeholder="Confirm" onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="form-check mt-3 mb-4">
                                    <input type="checkbox" className="form-check-input" id="show" onChange={() => setShowPassword(!showPassword)} />
                                    <label className="form-check-label small" htmlFor="show">Show Password</label>
                                </div>

                                <button type="submit" className="btn btn-orange-submit w-100 py-2 fw-bold">CREATE ACCOUNT</button>
                                
                                <p className="text-center mt-3 small mb-0">
                                    Already a member? <a href="/login" className="text-orange-link fw-bold text-decoration-none">Login here</a>
                                </p>
                            </form>
                        </div>

                        {/* Right Side: Features (Visible on Desktop) */}
                        <div className="col-lg-5 d-none d-lg-flex bg-orange-side p-5 align-items-center text-white">
                            <div>
                                <h4 className="fw-bold mb-4">Why join us?</h4>
                                <div className="feat mb-4">
                                    <h6>✓ Personalized Career Map</h6>
                                    <p className="small opacity-75">Get suggestions based on your skills and interests.</p>
                                </div>
                                <div className="feat mb-4">
                                    <h6>✓ Expert Counseling</h6>
                                    <p className="small opacity-75">Talk to experts for one-on-one sessions.</p>
                                </div>
                                <div className="feat">
                                    <h6>✓ Track Progress</h6>
                                    <p className="small opacity-75">Monitor your test results and improvements.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;