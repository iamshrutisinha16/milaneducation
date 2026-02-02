 import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const orange = "#f47920"; // ✅ define color once

const Footer = () => {
  return (
    <>
      {/* FOOTER SECTION */}
      <footer
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "60px 0 20px 0",
          borderTop: "1px solid #333",
        }}
      >
        <Container>
          <Row className="gy-4">
            {/* Column 1 */}
            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase">Who We Are</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">About The Founder</a></li>
                <li><a href="#" className="footer-link">Disclaimer</a></li>
              </ul>
            </Col>

            {/* Column 2 */}
            <Col lg={3} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase">Explore</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">Career Map</a></li>
                <li><a href="#" className="footer-link">Youtube Videos</a></li>
                <li><a href="#" className="footer-link">Youtube Shorts</a></li>
                <li><a href="#" className="footer-link">Events</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Inquire Now</a></li>
              </ul>
            </Col>

            {/* Column 3 */}
            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase">Resources</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="footer-link">Terms & Conditions</a></li>
                <li><a href="#" className="footer-link">Refund Policy</a></li>
                <li><a href="#" className="footer-link">Cancellation Policy</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
              </ul>
            </Col>

            {/* Column 4 */}
            <Col lg={5} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase">Subscribe</h6>
              <p className="text-white-50 small">
                Sign Up with your email address to receive news and updates
              </p>

              <div className="d-flex position-relative mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  style={{
                    borderRadius: "50px",
                    padding: "12px 25px",
                    border: "none",
                  }}
                />
                <Button
                  style={{
                    backgroundColor: orange,
                    border: "none",
                    borderRadius: "50px",
                    padding: "8px 30px",
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    bottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </Button>
              </div>

              <div className="d-flex justify-content-between">
                <p className="text-white-50 small mb-0">We respect your privacy</p>
                <a href="#" className="text-white small text-decoration-none">
                  Help?
                </a>
              </div>

              {/* Social Icons */}
              <div className="mt-4 d-flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-circle border border-secondary d-flex align-items-center justify-content-center"
                    style={{ width: 35, height: 35, cursor: "pointer" }}
                  >
                    <span className="text-white">●</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>

        {/* Copyright */}
        <div className="mt-5 py-3 border-top border-secondary text-center">
          <p className="text-white-50 small mb-0">
           Copyright 2025 © Milan Education Promoted & Managed by Web2online Solutions. All rights reserved
          </p>
        </div>

        {/* Footer Hover CSS */}
        <style>{`
          .footer-link {
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            transition: 0.3s;
          }
          .footer-link:hover {
            color: ${orange};
            padding-left: 5px;
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;
