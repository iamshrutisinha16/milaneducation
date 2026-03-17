import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import GoogleTranslate from "./GoogleTranslate";

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
      {/* Floating Book Now Button */}
      <Link to="/assessmenttest" className="floating-signup" onClick={closeAll}>
        Book Now
      </Link>

      {/* Floating WhatsApp */}
      <div className="whatsapp-float">
        <div className="whatsapp-text">Talk to us!</div>
        <a
          href="https://wa.me/9773784854"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp size={48} color="#25D366" />
        </a>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          
          {/* Logo */}
          <Link className="navbar-brand" to="/" onClick={closeAll}>
            <img src="https://collegemilan-backend-2.onrender.com/uploads /logo.png" alt="Logo" className="navbar-logo" />
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
                <Link to="/aboutus" className="nav-link nav-link-custom" onClick={closeAll}>
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/careermap" className="nav-link nav-link-custom" onClick={closeAll}>
                  Career Map
                </Link>
              </li>

              {/* Study Dropdown */}
              <li className={`nav-item dropdown ${learningOpen ? "show" : ""}`}>
                <span
                  className="nav-link nav-link-custom dropdown-toggle"
                  onClick={() => setLearningOpen(!learningOpen)}
                  style={{ cursor: "pointer" }}
                >
                  Study Types
                </span>

                <ul className={`dropdown-menu ${learningOpen ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item" to="/online" onClick={closeAll}>
                      Online
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/regular" onClick={closeAll}>
                      Regular
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/distance" onClick={closeAll}>
                      Distance Learning
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/studyabroad" onClick={closeAll}>
                      Study Abroad
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Career Test Dropdown */}
              <li className={`nav-item dropdown ${psychoOpen ? "show" : ""}`}>
                <span
                  className="nav-link nav-link-custom dropdown-toggle"
                  onClick={() => setPsychoOpen(!psychoOpen)}
                  style={{ cursor: "pointer" }}
                >
                  Career Test
                </span>

                <ul className={`dropdown-menu ${psychoOpen ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item" to="/assessmenttest" onClick={closeAll}>
                      Career Assessment Test
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/personalitytest" onClick={closeAll}>
                      Personality Test
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/event&updates" className="nav-link nav-link-custom" onClick={closeAll}>
                  Event & Updates
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/placements" className="nav-link nav-link-custom" onClick={closeAll}>
                  Placement
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contactus" className="nav-link nav-link-custom" onClick={closeAll}>
                  Contact
                </Link>
              </li>
            </ul>

            {/* Right Side Section */}
            <div className="d-flex align-items-center gap-3">

              {/* Call Button */}
              <a href="tel:+919773784854" className="login-btn">
                Call Now
              </a>

              {/* Google Translate */}
              <GoogleTranslate />

            </div>
          </div>
        </div>
      </nav>

      <div className="nav-spacer"></div>
    </>
  );
};

export default CustomNavbar;

