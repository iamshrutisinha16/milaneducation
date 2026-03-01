import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaWhatsapp, FaSignInAlt } from 'react-icons/fa';

const CustomNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [psychoOpen, setPsychoOpen] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setLearningOpen(false);
    setPsychoOpen(false);
  };

  return (
    <>
      {/* Floating Signup - Desktop only */}
      <div className="floating-signup">One Click Sign Up 👆</div>

      {/* Floating WhatsApp */}
      <div className="whatsapp-float">
        <div className="whatsapp-text">Talk to us!</div>
        <a href="https://wa.me/9773784854" target="_blank" rel="noreferrer">
          <FaWhatsapp size={48} color="#25D366" />
        </a>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/" onClick={closeAll}>
            <img src="/assets/logo.png" alt="Logo" className="navbar-logo" />
          </Link>

          {/* Burger Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapse Menu */}
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link nav-link-custom" onClick={closeAll}>About</Link>
              </li>
              <li className="nav-item">
                <Link to="/careermap" className="nav-link nav-link-custom" onClick={closeAll}>Career Map</Link>
              </li>

              {/* Study Dropdown */}
              <li className={`nav-item dropdown ${learningOpen ? "show" : ""}`}>
                <span className="nav-link nav-link-custom dropdown-toggle" onClick={() => setLearningOpen(!learningOpen)}>
                  Study Types
                </span>
                <ul className={`dropdown-menu ${learningOpen ? "show" : ""}`}>
                  <li><Link className="dropdown-item" to="/online" onClick={closeAll}>Online </Link></li>
                  <li><Link className="dropdown-item" to="/regular" onClick={closeAll}>Regular</Link></li>
                  <li><Link className="dropdown-item" to="/distance" onClick={closeAll}>Distance Learning</Link></li>
                   <li><Link className="dropdown-item" to="/studyabroad" onClick={closeAll}>Study Abroad</Link></li>
                </ul>
              </li>

              {/* Psychometric Dropdown */}
              <li className={`nav-item dropdown ${psychoOpen ? "show" : ""}`}>
                <span className="nav-link nav-link-custom dropdown-toggle" onClick={() => setPsychoOpen(!psychoOpen)}>
                  Career Test
                </span>
                <ul className={`dropdown-menu ${psychoOpen ? "show" : ""}`}>
                  <li><Link className="dropdown-item" to="/assessmenttest" onClick={closeAll}>Assessment Test</Link></li>
                  <li><Link className="dropdown-item" to="/personalitytest" onClick={closeAll}>Personality Test</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/event&updates" className="nav-link nav-link-custom" onClick={closeAll}>Event & Updates</Link>
              </li>
              <li className="nav-item">
                <Link to="/contactus" className="nav-link nav-link-custom" onClick={closeAll}>Contact</Link>
              </li>
               <li className="nav-item">
                <Link to="/placements" className="nav-link nav-link-custom" onClick={closeAll}>Placement</Link>
              </li>
            </ul>

           <Link to="/test" className="login-btn" onClick={closeAll}>
            Book Now
           </Link>
           {/*  <Link to="/login" className="login-btn" onClick={closeAll}>
              <FaSignInAlt /> Login
            </Link>*/}
          </div>
        </div>
      </nav>
      <div className="nav-spacer"></div>
    </>
  );
};

export default CustomNavbar;


