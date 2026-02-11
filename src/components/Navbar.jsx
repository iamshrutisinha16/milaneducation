import React from 'react';
import { Link } from "react-router-dom";
import { FaWhatsapp, FaSignInAlt } from 'react-icons/fa';
import logo from "../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CustomNavbar = () => {
  return (
    <div>
      <div className="floating-signup">
        One Click Sign Up 👆
      </div>
      <div className="whatsapp-float">
        <div className="whatsapp-text">Talk to us!</div>
        <a href="#">
          <FaWhatsapp size={45} color="#25D366" />
        </a>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link nav-link-custom">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/careermap" className="nav-link nav-link-custom">Career Map</Link>
              </li>
              {/* Courses Dropdown */}
              <li className="nav-item dropdown">
              <span className="nav-link nav-link-custom dropdown-toggle"data-bs-toggle="dropdown" style={{ cursor: "pointer" }}>
            Learning types
         </span>
            <ul className="dropdown-menu">
         <li>
           <Link className="dropdown-item" to="/online">
             Online Mode
           </Link>
         </li>
          <li>
           <Link className="dropdown-item" to="/offline">
             Offline Mode
          </Link>
          </li>
         <li>
          <Link className="dropdown-item" to="/courses/offline">
           Distance Learning
         </Link>
       </li>
    </ul>
  </li>

{/* Psychometric Test Dropdown */}
      <li className="nav-item dropdown">
        <span className="nav-link nav-link-custom dropdown-toggle"data-bs-toggle="dropdown"style={{ cursor: "pointer" }}>
        Psychometric Test
       </span>
     <ul className="dropdown-menu">
      <li>
      <Link className="dropdown-item" to="/psychometrictest">
        Psychometric Test
      </Link>
    </li>
         <li>
            <Link className="dropdown-item" to="/personalitytest">
            Personality Test
           </Link>
        </li>
      </ul>
    </li>
              <li className="nav-item">
                <Link to="/event&updates" className="nav-link nav-link-custom">Event & Updates</Link>
              </li>
               <li className="nav-item">
                <Link to="/contactus" className="nav-link nav-link-custom">Contact</Link>
              </li>
            </ul>

            {/* LOGIN */}
            <button className="login-btn">
              <FaSignInAlt /> Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CustomNavbar;
