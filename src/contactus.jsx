import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha"; // ❌ disabled
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactPage = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/contact",
        formData
      );

      if (response.data.success) {
        Swal.fire("Success 🎉", "Message sent successfully!", "success");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      }

    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-wrapper">

      {/* 🔹 Banner */}
      <section className="py-5 text-center bg-light">
        <motion.div initial="hidden" whileInView="visible" variants={fadeInUp}>
          <h2>Contact Us</h2>
          <p>We would love to hear from you</p>
        </motion.div>
      </section>

      {/* 🔹 Main Section */}
      <Container className="py-5">
        <Row className="gy-4">

          {/* LEFT SIDE */}
          <Col lg={5}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              className="shadow-lg p-4 h-100"
              style={{ backgroundColor: "#0a2a5b" }}
            >
              <h3 style={{ color: "#f47920" }}>Contact Information</h3>

              <div className="mb-3 d-flex">
                <FaMapMarkerAlt className="me-2 mt-1" style={{ color: "#f47920" }} />
                <span style={{ color: "white" }}>
                  C917, Sector 7, Dwarka, New Delhi - 110075
                </span>
              </div>

              <div className="mb-3 d-flex">
                <FaPhoneAlt className="me-2 mt-1" style={{ color: "#f47920" }} />
                <span style={{ color: "white" }}>+91 9773784854</span>
              </div>

              <div className="mb-3 d-flex">
                <FaEnvelope className="me-2 mt-1" style={{ color: "#f47920" }} />
                <span style={{ color: "white" }}>enquiry@collagemilan.com</span>
              </div>

              <hr style={{ borderColor: "#f47920" }} />

              <div>
                <FaFacebookF className="me-3" style={{ color: "#f47920" }} />
                <FaTwitter className="me-3" style={{ color: "#f47920" }} />
                <FaInstagram className="me-3" style={{ color: "#f47920" }} />
                <FaLinkedinIn style={{ color: "#f47920" }} />
              </div>
            </motion.div>
          </Col>

          {/* RIGHT SIDE FORM */}
          <Col lg={7}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              className="shadow-lg p-4 h-100"
            >
              <h3 className="mb-4">Send Us a Message</h3>

              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Form.Control
                  className="mb-3"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Form.Control
                  className="mb-3"
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                <Form.Control
                  className="mb-4"
                  as="textarea"
                  rows={4}
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                {/* ❌ CAPTCHA TEMP REMOVED */}
                {/* 
                <ReCAPTCHA
                  sitekey="YOUR_KEY"
                  onChange={handleCaptchaChange}
                />
                */}

                <Button type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" /> Sending...
                    </>
                  ) : (
                    "Submit Message"
                  )}
                </Button>
              </Form>
            </motion.div>
          </Col>

        </Row>
      </Container>

      {/* 🔹 MAP */}
      <section className="mt-5">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.956897148858!2d77.37130091508264!3d28.631024582415956"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
};

export default ContactPage;