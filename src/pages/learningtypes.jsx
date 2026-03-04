import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, GraduationCap, MapPin, User, Mail, Flag, Home } from "lucide-react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const orange = "#f47920";
const validModes = ["online", "regular", "distance", "studyabroad"];

const LearningTypes = () => {
  const { mode } = useParams();

  const [formData, setFormData] = useState({
    course: "",
    university: "",
    learningMode: mode,
    name: "",
    gender: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
  });

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!validModes.includes(mode)) {
    return <h2 className="text-center mt-5">Invalid Learning Mode</h2>;
  }

  // ================= FETCH UNIVERSITIES =================
  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/universities")
      .then((res) => {
        setUniversities(res.data.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // ================= FETCH COURSES =================
  useEffect(() => {
    if (formData.university) {
      axios
        .get(
          `https://collegemilan-backend-2.onrender.com/api/courses/${formData.university}?mode=${mode}`
        )
        .then((res) => {
          setCourses(res.data.data || []);
        })
        .catch((err) => console.error(err));
    } else {
      setCourses([]);
    }
  }, [formData.university, mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree before submitting.");
      return;
    }

    if (!formData.university || !formData.course) {
      alert("Please select University and Course.");
      return;
    }

    try {
      const res = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/enquiries",
        formData
      );

      // ✅ Redirect if bitlink exists
      if (res.data.redirectLink) {
        window.location.href = res.data.redirectLink;
        return;
      }

      setIsSubmitted(true);

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="cm-wrapper">

      {/* HERO */}
      <section className="cm-hero text-center text-white">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="fw-bold mt-5">
            {mode.toUpperCase()} Programs Admission
          </h1>
          <p>Partnering with 500+ Top Universities across India</p>
        </motion.div>
      </section>

      {/* FORM */}
      <div className="container my-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card shadow-lg border-0"
        >
          <div
            className="card-header text-white text-center fw-bold py-3"
            style={{ background: orange }}
          >
            {mode.toUpperCase()} ADMISSION FORM
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
            <h5 className="section-title">Course & University Details</h5>

            <div className="row g-3">

              {/* University */}
              <div className="col-md-6">
                <label className="form-label">
                  <GraduationCap size={16}/> Select University*
                </label>

                <Select
                  options={universities.map((u) => ({
                    value: u._id,
                    label: u.name,
                  }))}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      university: selected.value,
                    })
                  }
                  placeholder="Search university..."
                  menuPlacement="top"
                />
              </div>

              {/* Course */}
              <div className="col-md-6">
                <label className="form-label">Select Course*</label>
                <Select
                  options={courses.map((c) => ({
                    value: c._id,
                    label: c.course_name,
                  }))}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      course: selected.value,
                    })
                  }
                  placeholder="Search course..."
                  menuPlacement="top"
                  isDisabled={!formData.university}
                />
              </div>
            </div>

            <h5 className="section-title mt-4">
              Student Personal Information
            </h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  <User size={16}/> Full Name*
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <Mail size={16}/> Email*
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

            <div className="col-md-6">
               <label className="form-label">Gender*</label> 
               <select name="gender" className="form-select" required onChange={handleChange} > 
                <option value="">Select</option>
                 <option>Male</option> 
                 <option>Female</option>
                  <option>Other</option>
                   </select> 
                   </div>
              <div className="col-md-6">
                <label className="form-label">
                  <Phone size={16}/> Mobile*
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <MapPin size={16}/> City*
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <Flag size={16}/> State*
                </label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  <Home size={16}/> Address*
                </label>
                <textarea
                  name="address"
                  rows="3"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-check my-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label className="form-check-label">
                I agree to share information with College Milan
              </label>
            </div>

            <div className="text-center mt-4">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn px-5 py-2 fw-bold"
                style={{ background: orange, color: "#fff" }}
              >
                Submit Enquiry
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="cm-modal">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-box text-center"
            >
              <h4 style={{ color: orange }}>Enquiry Submitted!</h4>
              <p>Our counselor will contact you soon.</p>
              <button
                className="btn w-100"
                style={{ background: orange, color: "#fff" }}
                onClick={() => setIsSubmitted(false)}
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningTypes;