import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
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
  const recaptchaRef = useRef();

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

  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!captchaToken) {
      setErrorMsg("Please verify that you are not a robot.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/contact",
        {
          ...formData,
          captchaToken,
        }
      );

      if (response.data.success) {
        setSuccessMsg("Message sent successfully! We will contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
        setCaptchaToken(null);
        recaptchaRef.current.reset();
      } else {
        setErrorMsg("Captcha verification failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-wrapper">
      
      {/* Banner Section */}
      <section className="contact-banner py-5 text-center bg-light">
        <motion.div initial="hidden" whileInView="visible" variants={fadeInUp}>
          <h2>Contact Us</h2>
          <p>We would love to hear from you</p>
        </motion.div>
      </section>

      {/* Contact Info + Form */}
      <Container className="py-5">
        <Row className="gy-4">

          {/* LEFT SIDE DETAILS */}
          <Col lg={5}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              className="shadow-lg p-4 h-100"
            >
              <h3 className="mb-4">Contact Information</h3>

              <div className="mb-4 d-flex">
                <FaMapMarkerAlt className="me-3 mt-1" />
                <div>
                  <h6>Address</h6>
                  <p>
                    C917, Sector 7, Dwarka, New Delhi - 110075
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex">
                <FaPhoneAlt className="me-3 mt-1" />
                <div>
                  <h6>Call Us</h6>
                  <p>+91 9773784854</p>
                </div>
              </div>

              <div className="mb-4 d-flex">
                <FaEnvelope className="me-3 mt-1" />
                <div>
                  <h6>Email</h6>
                  <p>enquiry@collagemilan.com</p>
                </div>
              </div>

              <hr />

              <div className="mt-3">
                <a href="#" className="me-3"><FaFacebookF /></a>
                <a href="#" className="me-3"><FaTwitter /></a>
                <a href="#" className="me-3"><FaInstagram /></a>
                <a href="#"><FaLinkedinIn /></a>
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

              {successMsg && <Alert variant="success">{successMsg}</Alert>}
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

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4 text-center">
                  <ReCAPTCHA
                    sitekey="YOUR_REAL_RECAPTCHA_SITE_KEY"
                    onChange={handleCaptchaChange}
                    ref={recaptchaRef}
                  />
                </Form.Group>

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

      {/* MAP SECTION */}
      <section className="map-section mt-5">
        <iframe
          title="College Milan Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.956897148858!2d77.37130091508264!3d28.631024582415956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd26c8b9d7e3%3A0x6b4904a08a28731!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1676900000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;