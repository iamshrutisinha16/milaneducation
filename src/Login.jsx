import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, Mail, Lock, Chrome } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  // State for Login Form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/auth/login",
        formData
      );

      alert("Login Successful!");
      setIsLoading(false);
      navigate("/dashboard"); // change if needed
    } catch (error) {
      console.error("Login Failed", error);
      alert("Invalid email or password");
      setIsLoading(false);
    }
  };

  // Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/auth/google",
        {
          email: credentialResponse.clientId,
        }
      );

      alert("Google Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error", error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container login-container animate-fade-up">
        <div className="text-center mb-5">
          <h2 className="page-title">
            Create Account First to Book Your{" "}
            <span className="highlight">Slot</span>
          </h2>
          <p className="text-muted">
            Join College Milan to unlock your career path
          </p>
        </div>

        <div className="row g-5 align-items-start">
          {/* NEW USER */}
          <div className="col-lg-6 col-md-12 border-right-section">
            <h3 className="section-title">New User</h3>

            <div className="d-grid gap-3 mt-4">
              {/* Google Login */}
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Login Failed")}
              />

              <div className="divider">OR</div>

              {/* Email Signup */}
              <button
                className="btn btn-dark create-account-btn"
                onClick={() => navigate("/signup")}
              >
                CREATE ACCOUNT (Email/Pass)
              </button>
            </div>

            <div className="benefits-list mt-5">
              <div className="benefit-item">
                <CheckCircle size={18} className="text-success me-2" />
                <span>Get Personalized Career Suggestions</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={18} className="text-success me-2" />
                <span>Get Career Related Help</span>
              </div>
            </div>
          </div>

          {/* LOGIN FORM */}
          <div className="col-lg-6 col-md-12">
            <h3 className="section-title">Registered User</h3>

            <form className="login-form mt-4" onSubmit={handleLoginSubmit}>
              {/* Email */}
              <div className="mb-3 input-group-custom">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    className="form-control custom-input"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3 input-group-custom">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control custom-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mb-4">
                <a href="#" className="forgot-link">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
