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
  const token = localStorage.getItem("adminToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const [formData, setFormData] = useState({
    course: "",
    university: "",
    campus: "",
    qualification: "",
    learningMode: mode,
    name: "",
    gender: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    message: "",
  });

  const [universities, setUniversities] = useState([]);
  const [campus, setCampus] = useState([]); // (optional - future use)
  const [courses, setCourses] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!validModes.includes(mode)) {
    return <h2 className="text-center mt-5">Invalid Learning Mode</h2>;
  }

  // ================= FETCH UNIVERSITIES =================
  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/universities", { headers })
      .then((res) => setUniversities(res.data.data || res.data || []))
      .catch((err) => console.error("Universities fetch error:", err));
  }, []);

  // ================= FETCH COURSES =================
  useEffect(() => {
    if (formData.university) {
      axios
        .get(
          `https://collegemilan-backend-2.onrender.com/api/courses/${formData.university}?mode=${mode}`,
          { headers }
        )
        .then((res) => setCourses(res.data.data || res.data || []))
        .catch((err) => console.error("Courses fetch error:", err));
    } else {
      setCourses([]);
    }
  }, [formData.university, mode]);

  // ================= FETCH QUALIFICATIONS =================
  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/qualifications", { headers })
      .then((res) => setQualifications(res.data.data || res.data || []))
      .catch((err) => console.error("Qualifications fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= FINAL SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree before submitting.");
      return;
    }

    if (!formData.course) {
      alert("Please select Course.");
      return;
    }

    try {
      // ✅ 1. SAVE IN YOUR DATABASE
      await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/enquiries",
        {
          fullName: formData.name,
          mobile: formData.phone,
          email: formData.email,
          course: formData.course,
          campus: formData.campus || "School of Art and Architecture",
          university: formData.university,
          qualification: formData.qualification,
          gender: formData.gender,
          city: formData.city,
          state: formData.state,
          address: formData.address,
          learningMode: formData.learningMode,
          message: formData.message,
        },
        { headers }
      );

      // ✅ 2. SEND TO NOPAPERFORMS
      await axios.post(
        "https://api.nopaperforms.com/dataporting/712/milan_consultancy_services",
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          state: formData.state,
          city: formData.city,
          campus: formData.campus || "School of Art and Architecture",
          course: formData.course,
          source: "milan consultancy services",
          college_id: "712",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "access-key": "7f71cef029a77f941f86814f89177ab0",
          },
        }
      );

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submit Enquiry Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="cm-wrapper">
      {/* HERO */}
      <section className="cm-hero text-center text-white">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="fw-bold mt-5">{mode.toUpperCase()} Programs Admission</h1>
          <p>Partnering with 500+ Top Universities across India</p>
        </motion.div>
      </section>

      {/* FORM */}
      <div className="container my-5">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card shadow-lg border-0">
          <div className="card-header text-white text-center fw-bold py-3" style={{ background: orange }}>
            {mode.toUpperCase()} ADMISSION FORM
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
            <h5 className="section-title">Course & University Details</h5>
            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label"><GraduationCap size={16} /> Select University*</label>
                <Select
                  options={universities.map((u) => ({ value: u._id, label: u.name }))}
                  onChange={(selected) =>
                    setFormData({ ...formData, university: selected ? selected.value : "", course: "" })
                  }
                  placeholder="Search university..."
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Select Campus*</label>
                <select
                  className="form-select"
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                >
                  <option value="">Select Campus</option>
                  <option value="School of Art and Architecture">
                    School of Art and Architecture
                  </option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Select Course*</label>
                <Select
                  options={courses.map((c) => ({ value: c._id, label: c.course_name }))}
                  onChange={(selected) =>
                    setFormData({ ...formData, course: selected ? selected.value : "" })
                  }
                  placeholder="Search course..."
                />
              </div>

            </div>

            {/* PERSONAL INFO */}
            <h5 className="section-title mt-4">Student Personal Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" name="name" className="form-control" placeholder="Name" required onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input type="email" name="email" className="form-control" placeholder="Email" required onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input type="tel" name="phone" className="form-control" placeholder="Phone" required onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input type="text" name="city" className="form-control" placeholder="City" required onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <input type="text" name="state" className="form-control" placeholder="State" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-check my-3">
              <input className="form-check-input" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <label className="form-check-label">I agree</label>
            </div>

            <button className="btn w-100" style={{ background: orange, color: "#fff" }}>
              Submit
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {isSubmitted && <div className="text-center mt-3 text-success">Submitted Successfully</div>}
      </AnimatePresence>
    </div>
  );
};

export default LearningTypes;