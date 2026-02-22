import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, GraduationCap, MapPin, User, Mail, Home } from "lucide-react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const orange = "#f47920";

const SRM_UNIVERSITY = {
  id: "srm-direct",
  name: "SRM University",
  url: "https://www.srmist.edu.in/",
};

const validModes = ["online", "offline", "distance"];

const LearningTypes = () => {
  const { mode } = useParams();   // 👈 route se mode aayega

  const [formData, setFormData] = useState({
    course: "",
    university: "",
    learningMode: mode,  // 👈 auto set
    fullName: "",
    gender: "",
    email: "",
    mobile: "",
    city: "",
    address: "",
  });

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!validModes.includes(mode)) {
    return <h2 className="text-center mt-5">Invalid Learning Mode</h2>;
  }

  // Universities fetch
  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/universities")
      .then((res) => setUniversities(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Courses fetch
  useEffect(() => {
    if (formData.university && formData.university !== SRM_UNIVERSITY.id) {
      axios
        .get(
          `https://collegemilan-backend-2.onrender.com/api/courses/${formData.university}?mode=${mode}`
        )
        .then((res) => setCourses(res.data))
        .catch((err) => console.error(err));
    } else {
      setCourses([]);
    }
  }, [formData.university, mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.university === SRM_UNIVERSITY.id) {
      window.open(SRM_UNIVERSITY.url, "_blank");
      return;
    }

    axios
      .post(
        "https://collegemilan-backend-2.onrender.com/api/enquiries",
        formData
      )
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((err) => console.error(err));
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
                  options={[
                    {
                      value: SRM_UNIVERSITY.id,
                      label: SRM_UNIVERSITY.name,
                    },
                    ...universities.map((u) => ({
                      value: u._id,
                      label: u.name,
                    })),
                  ]}
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
                  isDisabled={formData.university === SRM_UNIVERSITY.id}
                  menuPlacement="top"
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
                  name="fullName"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Gender*</label>
                <select
                  name="gender"
                  className="form-select"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
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
                <label className="form-label">
                  <Phone size={16}/> Mobile*
                </label>
                <input
                  type="tel"
                  name="mobile"
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

            <div className="text-center mt-4">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn px-5 py-2 fw-bold"
                style={{ background: orange, color: "#fff" }}
              >
                {formData.university === SRM_UNIVERSITY.id
                  ? "Visit"
                  : "Submit Enquiry"}
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