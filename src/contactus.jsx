import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ContactPage = () => {
    const recaptchaRef = useRef();
    const fadeInUp = {
        hidden: {opacity: 0, y: 30},
        visible:  { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    //form data
    const[formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        subject:'',
        message:'',
        captchaToken:''
    });

    //captcha
    const[captchaToken, setCaptchaToken] = useState(null);

    //form data handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    //captcha handler
    const handleCaptchaChange = (token) => {
      setCaptchaToken(token);
    } 

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaToken) {
        alert("Please verify that you are not a robot.");
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/contact', {
            ...formData,
            captchaToken
        });

        if (response.data.success) {
            alert("Form submitted successfully!");
            setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
            setCaptchaToken(null);
            recaptchaRef.current.reset(); 
        } else {
            alert("Captcha verification failed. Try again.");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again later.");
    }
}

    return(
        <div className='contact-wrapper'>
            <section className='contact-banner'>
                <motion.div initial="hidden" 
                    whileInView="visible" 
                    variants={fadeInUp}
                    className="banner-content">
                <h1>Get In Touch</h1>
                 <p>College Milan se judne ke liye humein kabhi bhi contact karein.</p>
                </motion.div>
            </section>
              {/* 2. Form and Details Section */}
            <Container className="py-5">
                <Row className="gy-4">
                    <Col lg={5}>
                        <motion.div 
                            initial="hidden" 
                            whileInView="visible" 
                            variants={fadeInUp}
                            className="details-card shadow-lg p-4 h-100"
                        >
                            <h3 className="mb-4">Contact Information</h3>
                            
                            <div className="info-item mb-4">
                                <div className="icon-box"><FaMapMarkerAlt /></div>
                                <div>
                                    <h5>Address</h5>
                                    <p>
                                        <a href="https://www.google.com/maps?q=C917,Sector7,Dwarka,New+Delhi-110075"
                                         target="_blank"
                                         rel="noopener noreferrer"
                                      >  C917,Sector7,Dwarka,New Delhi-110075</a>
                                      </p>
                                </div>
                            </div>

                            <div className="info-item mb-4">
                                <div className="icon-box"><FaPhoneAlt /></div>
                                <div>
                                    <h5>Call Us</h5>
                                    <p>
                                        <a href="tel:+919773784854">
                                       +91 9773784854</a>
                                    </p>
                                </div>
                            </div>

                            <div className="info-item mb-4">
                                <div className="icon-box"><FaEnvelope /></div>
                                <div>
                                    <h5>Email Us</h5>
                                    <p>
                                         <a href="mailto:enquiry@collagemilan.com">
                                         enquiry@collagemilan.com
                                         </a>
                                       </p>
                                </div>
                            </div>

                            <hr className="my-4" />
                            
                            <h5>Follow Us</h5>
                            <div className="social-links mt-3">
                                <a href="#" className="social-icon"><FaFacebookF /></a>
                                <a href="#" className="social-icon"><FaTwitter /></a>
                                <a href="#" className="social-icon"><FaInstagram /></a>
                                <a href="#" className="social-icon"><FaLinkedinIn /></a>
                            </div>
                        </motion.div>
                    </Col>

                    {/* Contact Form */}
                    <Col lg={7}>
                        <motion.div 
                            initial="hidden" 
                            whileInView="visible" 
                            variants={fadeInUp}
                            className="form-card shadow-lg p-4 h-100"
                        >
                            <h3 className="mb-4">Send Us a Message</h3>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" placeholder="John" className="custom-input"
                                             name='firstname'
                                             value={formData.firstName} 
                                             onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" placeholder="Doe" className="custom-input"
                                            name='lastname'
                                            value={formData.lastName}
                                            onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" className="custom-input"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="How can we help?" className="custom-input"
                                     name='subject'
                                    value={formData.subject}
                                    onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Type your message here..." className="custom-input"
                                     name='message'
                                    value={formData.message}
                                    onChange={handleChange} />
                                </Form.Group>
                                 <Form.Group className="mb-4 d-flex justify-content-center">
                                    <ReCAPTCHA
                                        sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY" 
                                        onChange={handleCaptchaChange}
                                        ref={recaptchaRef}
                                        
                                    />
                                </Form.Group>
                                <Button className="btn-send w-100 py-2">Submit Message</Button>
                                
                            </Form>
                        </motion.div>
                    </Col>
                </Row>
            </Container>

            {/* 3. Map Section */}
            <section className="map-section mt-5">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                >
                    <iframe 
                        title="College Milan Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.956897148858!2d77.37130091508264!3d28.631024582415956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd26c8b9d7e3%3A0x6b4904a08a28731!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1676900000000!5m2!1sen!2sin" 
                        width="100%" 
                        height="450" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                    ></iframe>
                </motion.div>
            </section>
        </div>
    );
    
};

export default ContactPage;