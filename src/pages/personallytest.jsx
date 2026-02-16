import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Play,
  CheckCircle,
  Video,
  CreditCard,
  Send,
  User,
  Phone,
  Mail,
  GraduationCap,
  MapPin
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const PersonalityTest = () => {
  const navigate = useNavigate();

  // States
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn] = useState(false); 

  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    email: "",
    mobile: "",
    course: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (Enquiry)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        source: "Personality Test Page"
      };

      // Backend API Call
      const res = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/enquiries",
        submissionData
      );

      if (res.status === 200 || res.status === 201) {
        alert("Success! We will call you back soon.");
        setFormData({
          fullName: "",
          city: "",
          email: "",
          mobile: "",
          course: ""
        });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Error: Backend se connect nahi ho paya. Please try again.");
    }
  };

  const handleApplyNow = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="pt-page">

      {/* --- 1. HERO BANNER SECTION --- */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-white">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <span className="badge-top mb-3">SCIENTIFIC PERSONALITY TEST</span>
                <h1 className="display-4 fw-bold">Explore Your <span className="txt-orange">True Potential</span> In 15 Minutes</h1>
                <p className="lead mt-3">Identify your strengths, overcome weaknesses, and find your key motivations with our expert-designed personality assessment.</p>
                <div className="d-flex gap-3 mt-4">
                  <button className="btn-main" onClick={handleApplyNow}>Apply For Test</button>
                  <a href="#video" className="btn-watch"><Play size={18} /> Watch Video</a>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
               <img src="https://cdni.iconscout.com/illustration/premium/thumb/personality-test-illustration-download-in-svg-png-gif-file-formats--interview-recruitment-finding-employee-human-resource-pack-business-illustrations-4841968.png" className="img-fluid" alt="Banner" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THREE CORE PILLARS --- */}
      <section className="container py-5">
        <div className="row g-4 text-center">
          {[
            { title: "STRENGTHS", desc: "Know what makes you unique.", img: "https://cdn-icons-png.flaticon.com/512/3281/3281306.png" },
            { title: "WEAKNESS", desc: "Identify areas for improvement.", img: "https://cdn-icons-png.flaticon.com/512/3850/3850125.png" },
            { title: "KEY MOTIVATION", desc: "Find what drives your success.", img: "https://cdn-icons-png.flaticon.com/512/3160/3160270.png" }
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <motion.div whileHover={{ y: -10 }} className="feature-box shadow-sm">
                <img src={item.img} alt={item.title} />
                <h4 className="fw-bold mt-3">{item.title}</h4>
                <p className="text-muted">{item.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. PERSONALITY TRAITS WHEEL --- */}
      <section className="traits-wheel-section py-5 bg-light">
        <div className="container text-center">
         <h2 className="fw-bold display-4" style={{ fontSize: "3rem" }}>
           Get % Blend of Your 
          <span style={{ color: "#f47920" }}> Core Traits</span>
        </h2>
          <p className="mb-5">Know yourself properly with our detailed analytical report.</p>
          <div className="wheel-img-container mx-auto text-center">
       <img src="https://careerjaano.com/static/images/personality_traits_image.png" 
         alt="Personality Wheel" 
          className="img-fluid" style={{ width: "850px", maxWidth: "95%" }} />
        </div>
          <button className="btn-main mt-5" onClick={handleApplyNow}>Apply Now</button>
        </div>
      </section>

      {/* --- BETTER CHOICES SECTION --- */}
      <section className="better-choices py-5">
        <div className="container text-center">
          <div className="row g-4 align-items-center">
            {[
              { title: "BETTER SUBJECTS", img: "https://careerjaano.com/static/images/better_subjects_personality_traits.jpg" },
              { title: "BETTER COURSE", img: "https://careerjaano.com/static/images/better_course_personality_traits.jpg" },
              { title: "BETTER CAREER", img: "https://careerjaano.com/static/images/better_career_personality_traits.jpg" },
              { title: "BETTER PARTNER", img: "https://careerjaano.com/static/images/better_partner_personal_traits.jpg" },
              { title: "BETTER LIFE DECISION", img: "https://careerjaano.com/static/images/better_lifestyle_personality_traits.jpg" },
              { title: "BETTER LIFESTYLE", img: "https://careerjaano.com/static/images/better_life_decisions_personality_traits.jpg" }
            ].map((choice, index) => (
              <div className="col-md-4" key={index}>
                <div className="benefit-card shadow-sm p-3">
                  <img src={choice.img} alt={choice.title} className="img-fluid rounded" />
                  <h5 className="fw-bold mt-3">{choice.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. YOUTUBE VIDEO SECTION --- */}
      <section id="video" className="video-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="video-card shadow-lg">
                <iframe 
                  width="100%" 
                  height="400" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example URL
                  title="Guide Video" 
                  frameBorder="0" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-lg-5 ps-lg-5 mt-4 mt-lg-0">
               <h3 className="fw-bold mb-3">Watch How It Works</h3>
               <p className="text-muted">In this video, we explain how our scientific test analyzes your behavior and provides accurate career guidance.</p>
               <div className="booking-box mt-4 p-4 text-white shadow">
                  <h5>Book Your Analysis Slot</h5>
                  <h2 className="fw-bold">₹99 <span className="fs-6 fw-normal">Only</span></h2>
                  <button className="btn-white mt-2 w-100 shadow-sm"><CreditCard size={18} className="me-2" /> Pay & Book Now</button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. ENQUIRY FORM SECTION --- */}
      <section className="enquiry-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 shadow p-0 rounded-4 overflow-hidden d-flex flex-column flex-md-row">
              <div className="form-info p-5 text-white col-md-5">
                <h4>Have Questions?</h4>
                <p className="small">Talk to our career experts and get the right path for your future.</p>
                <ul className="list-unstyled mt-4">
                  <li className="mb-2"><CheckCircle size={16} /> 100% Secure</li>
                  <li className="mb-2"><CheckCircle size={16} /> Expert Counselors</li>
                  <li className="mb-2"><CheckCircle size={16} /> Trusted by 5k+ Students</li>
                </ul>
              </div>
              <div className="form-container p-5 col-md-7 bg-white">
                <h4 className="fw-bold mb-4 text-dark">Quick Enquiry</h4>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><User size={18}/></span>
                    <input type="text" name="fullName" className="form-control" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><Mail size={18}/></span>
                    <input type="email" name="email" className="form-control" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><Phone size={18}/></span>
                    <input type="tel" name="mobile" className="form-control" placeholder="Mobile Number" required value={formData.mobile} onChange={handleChange} />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><MapPin size={18}/></span>
                    <input type="text" name="city" className="form-control" placeholder="City" required value={formData.city} onChange={handleChange} />
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-text"><GraduationCap size={18}/></span>
                    <input type="text" name="course" className="form-control" placeholder="Interested Course" value={formData.course} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn-main w-100"><Send size={18} className="me-2"/>Submit Enquiry</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. MODAL (Popup) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.8, opacity:0}} className="modal-content-box p-5 text-center shadow">
              <h2 className="fw-bold txt-orange">Ready to Start?</h2>
              <p className="text-muted">You are about to start your 15-minute personality assessment.</p>
              <div className="d-flex gap-3 justify-content-center mt-4">
                <button className="btn btn-light px-4" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-main px-4">Begin Test</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalityTest;