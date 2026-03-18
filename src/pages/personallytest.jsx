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
  const [successPopup, setSuccessPopup] = useState(false); // ✅ NEW

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

  // 🔥 UPDATED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/general-enquiry", // ✅ FIX
        formData
      );

      if (res.status === 200 || res.status === 201) {
        setSuccessPopup(true); // ✅ POPUP

        setFormData({
          fullName: "",
          city: "",
          email: "",
          mobile: "",
          course: ""
        });
      }
    } catch (err) {
      console.error("Submission Error:", err.response?.data);
      alert("Error: Backend se connect nahi ho paya.");
    }
  };

  const handleApplyNow = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      navigate("/contactus");
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
                <h1 className="display-4 fw-bold">
                  Explore Your <span className="txt-orange">True Potential</span> In 15 Minutes
                </h1>
                <p className="lead mt-3">
                  Identify your strengths, overcome weaknesses, and find your key motivations with our expert-designed personality assessment.
                </p>
                <div className="d-flex gap-3 mt-4">
                  <button className="btn-main" onClick={handleApplyNow}>Apply For Test</button>
                  <a href="#video" className="btn-watch"><Play size={18} /> Watch Video</a>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <img src="https://collegemilan-backend-2.onrender.com/uploads/personallytestbanner.webp" className="img-fluid" alt="Banner" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THREE CORE PILLARS --- */}
      <section className="container py-5">
        <div className="row g-4 text-center">
          {[
            { title: "STRENGTHS", desc: "Know what makes you unique.", img: "https://collegemilan-backend-2.onrender.com/uploads/strength.png" },
            { title: "WEAKNESS", desc: "Identify areas for improvement.", img: "https://collegemilan-backend-2.onrender.com/uploads/weekness.png" },
            { title: "KEY MOTIVATION", desc: "Find what drives your success.", img: "https://collegemilan-backend-2.onrender.com/uploads/motivation.png" }
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
            Get % Blend of Your <span style={{ color: "#f47920" }}> Core Traits</span>
          </h2>
          <p className="mb-5">Know yourself properly with our detailed analytical report.</p>

          <div className="wheel-img-container mx-auto text-center">
            <img
              src="https://collegemilan-backend-2.onrender.com/uploads/persanalitywheel.png"
              alt="Personality Wheel"
              className="img-fluid"
              style={{ width: "850px", maxWidth: "95%" }}
            />
          </div>

          <button className="btn-main mt-5" onClick={() => navigate("/contactus")}>
            Apply Now
          </button>
        </div>
      </section>

      {/* --- BETTER CHOICES SECTION --- */}
      <section className="better-choices py-5">
        <div className="container text-center">
          <div className="row g-4 align-items-center">
            {[
              { title: "BETTER SUBJECTS", img: "https://collegemilan-backend-2.onrender.com/uploads/bettersubjects.jpg" },
              { title: "BETTER COURSE", img: "https://collegemilan-backend-2.onrender.com/uploads/bettercourse.jpg" },
              { title: "BETTER CAREER", img: "https://collegemilan-backend-2.onrender.com/uploads/bettercareer.jpg" },
              { title: "BETTER PARTNER", img: "https://collegemilan-backend-2.onrender.com/uploads/betterpartner.jpg" },
              { title: "BETTER LIFE DECISION", img: "https://collegemilan-backend-2.onrender.com/uploads/betterlife.jpg" },
              { title: "BETTER LIFESTYLE", img: "https://collegemilan-backend-2.onrender.com/uploads/betterlifestyle.jpg" }
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

      {/* --- VIDEO SECTION --- */}
      <section id="video" className="video-section py-5 bg-light">
        <div className="container text-center">
          <video width="100%" height="400" controls>
            <source src="https://collegemilan-backend-2.onrender.com/uploads/persanalitypagevideo.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="enquiry-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 shadow p-0 rounded-4 overflow-hidden d-flex flex-column flex-md-row">

              <div className="form-info p-5 text-white col-md-5">
                <h4>Have Questions?</h4>
              </div>

              <div className="form-container p-5 col-md-7 bg-white">
                <form onSubmit={handleSubmit}>

                  <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                  <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
                  <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                  <input name="course" value={formData.course} onChange={handleChange} placeholder="Course" required />

                  <button type="submit">Submit</button>

                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* EXISTING MODAL */}
      <AnimatePresence>
        {showModal && <div>Test Modal</div>}
      </AnimatePresence>

      {/* 🔥 SUCCESS POPUP */}
      <AnimatePresence>
        {successPopup && (
          <div className="modal-overlay">
            <motion.div className="modal-content-box p-5 text-center">
              <CheckCircle size={60} color="green" />
              <h2>Success 🎉</h2>
              <button onClick={() => setSuccessPopup(false)}>OK</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PersonalityTest;