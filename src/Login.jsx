import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle, Mail, Lock, Phone, Chrome } from 'lucide-react'; 

const Login = () => {
  // State for Login Form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login Submit (Real Backend Logic)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Yahan Backend API call hogi
    try {
      // Example: 
      // const response = await axios.post('https://your-api.com/login', formData);
      
      console.log("Sending Data to DB:", formData);
      
      // Fake delay to show loading animation
      setTimeout(() => {
        alert("Login Successful! (Redirecting...)");
        setIsLoading(false);
        // navigate('/dashboard'); // Login ke baad dashboard par bhejo
      }, 1500);

    } catch (error) {
      console.error("Login Failed", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container login-container animate-fade-up">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2 className="page-title">
            Create Account First to Book Your <span className="highlight">Counseling Slot</span>
          </h2>
          <p className="text-muted">Join College Milan to unlock your career path</p>
        </div>

        <div className="row g-5 align-items-start">
          
          {/* LEFT SIDE: NEW USER (Sign Up Options) */}
          <div className="col-lg-6 col-md-12 border-right-section">
            <h3 className="section-title">New User</h3>
            
            <div className="d-grid gap-3 mt-4">
              {/* OTP Option */}
              <button className="btn btn-outline-dark custom-btn-outline">
                <Phone size={20} className="me-2" /> Sign in using OTP
                <span className="arrow-icon">→</span>
              </button>

              {/* Google Option */}
              <button className="btn btn-danger google-btn">
                <Chrome size={20} className="me-2" /> Sign In With Google
              </button>

              <div className="divider">OR</div>

              {/* Full Create Account */}
              <button className="btn btn-dark create-account-btn">
                CREATE ACCOUNT (Email/Pass)
              </button>
            </div>

            {/* Benefits List */}
            <div className="benefits-list mt-5">
              <div className="benefit-item">
                <CheckCircle size={18} className="text-success me-2" />
                <span>Get Personalized Career Suggestions</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={18} className="text-success me-2" />
                <span>Get Career Related Help</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={18} className="text-success me-2" />
                <span>Track Your Tests and Counseling Sessions</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: REGISTERED USER (Login Form) */}
          <div className="col-lg-6 col-md-12">
            <h3 className="section-title">Registered User</h3>
            
            <form className="login-form mt-4" onSubmit={handleLoginSubmit}>
              
              {/* Email Input */}
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

              {/* Password Input */}
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
                  {/* Eye Icon for Show/Hide */}
                  <div 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mb-4">
                <a href="#" className="forgot-link">Forgot Password?</a>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;