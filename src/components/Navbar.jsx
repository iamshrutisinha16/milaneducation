import React from 'react';
import { Navbar as RBNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaWhatsapp, FaSignInAlt } from 'react-icons/fa';
import logo from "../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
  const orange = "#f47920";

  return (
    <div style={{ backgroundColor: '#fff', overflowX: 'hidden' }}>
      {/* 1. STYLES */}
      <style>{`
        .nav-link-custom { color: #555 !important; font-weight: 500; margin: 0 10px; transition: 0.3s; }
        .nav-link-custom:hover { color: ${orange} !important; }

        .floating-signup {
          position: fixed; left: 0; top: 40%; z-index: 1000;
          background: ${orange}; color: white; padding: 10px 5px;
          writing-mode: vertical-rl; text-orientation: mixed;
          border-radius: 0 10px 10px 0; font-weight: bold; font-size: 14px;
        }

        .whatsapp-float {
          position: fixed; bottom: 30px; right: 30px; z-index: 1000;
          display: flex; align-items: center; gap: 10px;
        }

        @media (max-width: 768px) {
          .floating-signup { font-size: 12px; padding: 8px 4px; }
        }
      `}</style>

      {/* 2. FLOATING ELEMENTS */}
      <div className="floating-signup shadow">One Click Sign Up 👆</div>
      <div className="whatsapp-float">
        <div style={{background:'white', padding:'5px 15px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold', boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>Talk to us!</div>
        <a href="#"><FaWhatsapp size={50} color="#25D366" /></a>
      </div>

      {/* 3. NAVBAR */}
      <RBNavbar
        bg="white"
        expand="lg"
        fixed="top"
        className="shadow-sm"
        style={{ height: "90px", padding: 0 }}
      >
        <Container fluid className="h-100 d-flex align-items-center">

          {/* LOGO */}
          <RBNavbar.Brand as={Link} to="/" style={{ height: "110px" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "110px", width: "auto", objectFit: "contain" }}
            />
          </RBNavbar.Brand>

          <RBNavbar.Toggle aria-controls="navbar-nav" />

          <RBNavbar.Collapse id="navbar-nav">
            <Nav className="mx-auto flex-column flex-lg-row">
              <Nav.Link as={Link} to="/aboutus" className="nav-link-custom">About</Nav.Link>
              <Nav.Link as={Link} to="/careermap" className="nav-link-custom">Career Map</Nav.Link>
              <Nav.Link as={Link} to="/counseling" className="nav-link-custom">Counseling</Nav.Link>
              <Nav.Link as={Link} to="/psychometric-test" className="nav-link-custom">Psychometric Test</Nav.Link>
              <Nav.Link as={Link} to="/top-careers" className="nav-link-custom">Top Careers</Nav.Link>
              <Nav.Link as={Link} to="/seminars" className="nav-link-custom">Seminars</Nav.Link>
            </Nav>

            <Button
              style={{
                backgroundColor: orange,
                border: "none",
                borderRadius: "25px",
                padding: "8px 25px",
                marginTop: '10px'
              }}
              className="fw-bold d-flex align-items-center gap-2"
            >
              <FaSignInAlt /> Login
            </Button>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>
    </div>
  );
};

export default CustomNavbar;

