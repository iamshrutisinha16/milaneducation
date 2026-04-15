import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
  const recaptchaRef = useRef();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [formData, setFormData] = useState({
    firstName: "",
    mobile: "",
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

    if (loading) return;

    setSuccessMsg("");
    setErrorMsg("");

    if (!captchaToken) {
      Swal.fire("Error", "Please verify captcha", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/contact",
        {
          ...formData,
          captchaToken: captchaToken,
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Success ",
          text: "Message sent successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        setFormData({
        firstName: "",
        mobile: "",
        email: "",
        subject: "",
        message: "",
     });

        setCaptchaToken(null);
        recaptchaRef.current.reset();
      }

    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        Swal.fire("Error", error.response.data.message, "error");
      } else {
        Swal.fire("Error", "Something went wrong. Try again.", "error");
      }
    }

    setLoading(false);
  };

  return (
    <div className="contact-wrapper">

      {/* Banner Section */}
      <section className="contact-banner py-5 text-center bg-light">
        <motion.div initial="hidden" whileInView="visible" variants={fadeInUp}>
        </motion.div>
      </section>

      {/* Contact Info + Form */}
      <Container className="py-5">
        <Row className="gy-4">

          {/* LEFT SIDE */}
          <Col lg={5}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              className="shadow-lg p-4 h-100"
              style={{ backgroundColor: '#0a2a5b' }}
            >
              <h3 className="mb-4" style={{ color: '#f47920' }}>Contact Information</h3>

              <div className="mb-4 d-flex">
                <FaMapMarkerAlt className="me-3 mt-1" style={{ color: '#f47920' }} />
                <div>
                  <h6 style={{ color: 'white' }}>Address</h6>
                  <p style={{ color: 'white', margin: 0 }}>
                    College Milan, Radha Ganga Arcked, Mod, Basant VIhar, Jhajjar, Bahadurgarh, Haryana 124507
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex">
                <FaPhoneAlt className="me-3 mt-1" style={{ color: '#f47920' }} />
                <div>
                  <h6 style={{ color: 'white' }}>Call Us</h6>
                  <p style={{ margin: 0, color: "white" }}>
                    +91 9773784854
                  </p>
                </div>
              </div>

              <div className="mb-4 d-flex">
                <FaEnvelope className="me-3 mt-1" style={{ color: '#f47920' }} />
                <div>
                  <h6 style={{ color: 'white' }}>Email</h6>
                  <p style={{ margin: 0, color: "white" }}>
                    ssanjeevsangwan@collegemilan.com , info@collegemilan.com
                  </p>
                </div>
              </div>

              <hr style={{ borderColor: '#f47920' }} />

              <div className="mt-3">
                <FaFacebookF className="me-3" style={{ color: '#f47920' }} />
                <FaTwitter className="me-3" style={{ color: '#f47920' }} />
                <FaInstagram className="me-3" style={{ color: '#f47920' }} />
                <FaLinkedinIn style={{ color: '#f47920' }} />
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
                 <Form.Control type="text" placeholder="Full Name (As per 10th Certificate)" name="firstName" 
                  value={formData.firstName} onChange={handleChange} required />
                </Col>
                  <Col md={6} className="mb-3">
                    <Form.Control type="tel" placeholder="Mobile no" name="mobile" value={formData.mobile} onChange={handleChange} required />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control as="textarea" rows={4} placeholder="Your Message" name="message" value={formData.message} onChange={handleChange} required />
                </Form.Group>

                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  onExpired={() => {
                    setCaptchaToken(null);

                    if (!loading) {
                      Swal.fire("Expired", "Captcha expired, verify again", "warning");
                    }
                  }}
                  ref={recaptchaRef}
                />

                <Button type="submit" className="w-100 mt-3" disabled={loading}>
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
    <section className="map-section mt-5">
       <iframe title="College Milan Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6999.893872112506!2d76.9248161433193!3d28.69123390253069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0eae6da3a8d5%3A0x23a997ce6e6e33fd!2sBasant%20Vihar%2C%20Bahadurgarh%2C%20Haryana%20124507!5e0!3m2!1sen!2sin!4v1776238365415!5m2!1sen!2sin" 
        width="100%" height="450" style={{ border: 0 }}
         allowFullScreen loading="lazy" >
        </iframe> 
        </section>
    </div>
  );
};

export default ContactPage;

