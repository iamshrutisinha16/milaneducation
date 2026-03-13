import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle, FaRocket, FaHandshake, FaUserGraduate, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const iconMap = {
  FaCheckCircle,
  FaRocket,
  FaHandshake,
  FaUserGraduate,
  FaChartLine
};

const Placement = () => {

const navigate = useNavigate();
const [data,setData] = useState(null);

useEffect(()=>{

axios.get("https://collegemilan-backend-2.onrender.com/api/admin/placement")
.then(res=>{
setData(res.data.data)
})

},[])

if(!data) return <div className="text-center p-5">Loading...</div>;

return (
<div className="placement-page">

{/* HERO */}
<section className="hero-section d-flex align-items-center">
<div className="container">
<div className="row align-items-center">

<div className="col-lg-6">

<span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill">
{data.heroBadge}
</span>

<motion.h1 
className="hero-title mb-4"
initial={{ opacity: 0, y: -50 }}
animate={{ opacity: 1, y: 0 }}
>

{data.heroTitle} <br/>

With <span className="text-orange">
{data.heroHighlight}
</span>

</motion.h1>

<motion.p 
className="lead opacity-75 mb-4"
initial={{ opacity: 0 }}
animate={{ opacity: 1, delay: 0.2 }}
>

{data.heroDescription}

</motion.p>

<motion.div 
className="d-flex gap-3"
initial={{ opacity: 0 }}
animate={{ opacity: 1, delay: 0.4 }}
>

<Link to="/careermap" className="btn btn-orange">
Career Opportunities
</Link>

<Link to="/event&updates" className="btn btn-outline-light rounded-pill px-4">
View Gallery
</Link>

</motion.div>
</div>

<div className="col-lg-6 mt-5 mt-lg-0 text-center">

<motion.img 
src={`https://collegemilan-backend-2.onrender.com/uploads/${data.heroImage}`}
alt="Placement Hero"
className="img-fluid rounded-4 shadow-lg border border-warning"
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.6 }}
/>

</div>

</div>
</div>
</section>


{/* ABOUT SECTION */}

<section className="about-section py-5">
<div className="container">
<div className="row align-items-center">

<div className="col-lg-6 mb-5 mb-lg-0">

<div className="about-img-box">

<motion.img 
src={`https://collegemilan-backend-2.onrender.com/uploads/${data.aboutImage}`}
alt="Placement Meeting"
className="about-img"
whileHover={{ scale: 1.05 }}
/>

<div className="experience-badge">
<span>{data.placementRate}</span>
<br/>
<small>Placement Rate</small>
</div>

</div>

</div>

<div className="col-lg-6 ps-lg-5">

<h2 className="fw-bold mb-4 text-start" style={{ color: '#fd7e14' }}>
{data.aboutTitle}
</h2>

<p className="text-muted mb-4 ">
{data.aboutDescription}
</p>


{/* FEATURES */}

<div className="row g-3">

{data.features.map((item,index)=>{

const Icon = iconMap[item.icon];

return(

<div className="col-md-6" key={index}>

<motion.div whileHover={{ scale: 1.03 }} className="feature-card p-3 shadow-sm rounded d-flex align-items-start gap-3">

<Icon className="fs-3 text-orange mt-1" />

<div>

<h6 className="fw-bold mb-1">
{item.title}
</h6>

<p className="text-muted small">
{item.description}
</p>

</div>

</motion.div>

</div>

)

})}

</div>

<button className="btn btn-orange mt-4"
onClick={() => navigate("/studyabroad")}>
How It Works
</button>

</div>
</div>
</div>
</section>


{/* TOP RECRUITERS */}

<section className="recruiter-section py-5">

<div className="container">

<div className="text-center mb-5">

<h2 className="fw-bold recruiter-title" style={{ color: '#fd7e14' }}>
Our Top Recruiters
</h2>

<p className="text-muted">
Leading companies that trust our students and recruit every year.
</p>

</div>


<div className="row g-4 justify-content-center align-items-center text-center">

{data.recruiters.map((item,index)=>(

<div className="col-6 col-md-3" key={index}>

<div className="recruiter-card p-4">

<img
src={`https://collegemilan-backend-2.onrender.com/uploads/${item.logo}`}
alt={item.name}
className="img-fluid recruiter-logo"
/>

</div>

</div>

))}

</div>

</div>

</section>


{/* PLACEMENT HIGHLIGHTS */}

<section className="py-5" style={{backgroundColor: '#f9f9f9'}}>

<div className="container">

<div className="text-center mb-5">

<h2 className="fw-bold" style={{color:'#fd7e14'}}>
Our Placement Highlights
</h2>

<p className="text-muted">
Achievements & Key Metrics from Past Drives
</p>

</div>


<div className="row g-4">

{data.highlights.map((item,index)=>{

const Icon = iconMap[item.icon];

return(

<div className="col-md-3" key={index}>

<motion.div 
className="highlight-card p-4 text-center shadow-sm rounded"
whileHover={{ scale: 1.05 }}
>

<Icon className="fs-1 text-orange mb-3"/>

<h5 className="fw-bold">
{item.title}
</h5>

<p className="text-muted small">
{item.description}
</p>

</motion.div>

</div>

)

})}

</div>

</div>

</section>


{/* CTA */}

<section className="py-5 text-center text-white" style={{ backgroundColor: '#fd7e14' }}>

<div className="container">

<h2 className="fw-bold">
{data.ctaTitle}
</h2>

<p className="mb-4">
{data.ctaDescription}
</p>

<button 
className="btn btn-light text-dark fw-bold rounded-pill px-5"
onClick={() => navigate("/contactus")}
>

{data.ctaButton}

</button>

</div>

</section>

</div>
);

};

export default Placement;

/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle, FaRocket, FaHandshake, FaUserGraduate, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Placement = () => {
const navigate = useNavigate();
  return (
    <div className="placement-page">
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill">#1 Placement Cell</span>
              <motion.h1 
                className="hero-title mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Launch Your Career <br /> 
                With <span className="text-orange">Top Industry Giants</span>
              </motion.h1>
              <motion.p 
                className="lead opacity-75 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, delay: 0.2 }}
              >
                College Milan Placement Cell bridges the gap between academic knowledge and corporate expectations. 
                Our students receive end-to-end support: skill enhancement, internships, mock interviews, and final placements in top companies.
              </motion.p>
              <motion.div 
                className="d-flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, delay: 0.4 }}
              >
                <Link to="/careermap" className="btn btn-orange">Career Opportunities</Link>
                <Link to="/event&updates"className="btn btn-outline-light rounded-pill px-4">
                View Gallery</Link>
              </motion.div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0 text-center">
              <motion.img 
                src="https://collegemilan-backend-2.onrender.com/uploads/placementbanner.avif"
                alt="Placement Hero"
                className="img-fluid rounded-4 shadow-lg border border-warning"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="about-img-box">
                <motion.img 
                  src="https://collegemilan-backend-2.onrender.com/uploads/placementmeeting.avif"
                  alt="Placement Meeting"
                  className="about-img"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="experience-badge">
                  <span>98%</span> <br /> <small>Placement Rate</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6 ps-lg-5">
            <h2 className="fw-bold mb-4 text-start" style={{ color: '#fd7e14' }}>
            Shaping Careers, Creating Placement Success</h2>
              <p className="text-muted mb-4 ">
                Our placement cell is dedicated to transforming students into industry-ready professionals. 
                From aptitude tests to technical interviews, we provide every student with guidance and personalized mentorship. 
                We collaborate with top corporates to ensure that our graduates land roles with competitive packages and growth opportunities.
              </p>

              <div className="row g-3">
                <div className="col-md-6">
                  <motion.div whileHover={{ scale: 1.03 }} className="feature-card p-3 shadow-sm rounded d-flex align-items-start gap-3">
                    <FaCheckCircle className="fs-3 text-orange mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1">Pre-Placement Training</h6>
                      <p className="text-muted small">Resume building, soft skills, and mock interviews to prepare students for real-world challenges.</p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-md-6">
                  <motion.div whileHover={{ scale: 1.03 }} className="feature-card p-3 shadow-sm rounded d-flex align-items-start gap-3">
                    <FaHandshake className="fs-3 text-orange mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1">Industry Partnerships</h6>
                      <p className="text-muted small">Tie-ups with 500+ national & international companies for placement and internship opportunities.</p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-md-6">
                  <motion.div whileHover={{ scale: 1.03 }} className="feature-card p-3 shadow-sm rounded d-flex align-items-start gap-3">
                    <FaRocket className="fs-3 text-orange mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1">High Packages</h6>
                      <p className="text-muted small">Record-breaking packages with multiple offers for top performers.</p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-md-6">
                  <motion.div whileHover={{ scale: 1.03 }} className="feature-card p-3 shadow-sm rounded d-flex align-items-start gap-3">
                    <FaUserGraduate className="fs-3 text-orange mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1">Career Mentorship</h6>
                      <p className="text-muted small">1-on-1 guidance from industry mentors to shape career paths and personal growth.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
             <button className="btn btn-orange mt-4"onClick={() => navigate("/studyabroad")}>
              How It Works
            </button>
            </div>
          </div>
        </div>
      </section>
<section className="recruiter-section py-5">
  <div className="container">

    <div className="text-center mb-5">
      <h2 className="fw-bold recruiter-title" style={{ color: '#fd7e14' }}>Our Top Recruiters</h2>
      <p className="text-muted">
        Leading companies that trust our students and recruit every year.
      </p>
    </div>

    <div className="row g-4 justify-content-center align-items-center text-center">

      <div className="col-6 col-md-3">
        <div className="recruiter-card p-4">
          <img src="https://collegemilan-backend-2.onrender.com/uploads/Microsoftlogo.svg" alt="Microsoft" className="img-fluid recruiter-logo" />
        </div>
      </div>

      <div className="col-6 col-md-3">
        <div className="recruiter-card p-4">
          <img src="https://collegemilan-backend-2.onrender.com/uploads/IBM.svg" alt="IBM" className="img-fluid recruiter-logo" />
        </div>
      </div>

      <div className="col-6 col-md-3">
        <div className="recruiter-card p-4">
          <img src="https://collegemilan-backend-2.onrender.com/uploads/Amazon.svg" alt="Amazon" className="img-fluid recruiter-logo" />
        </div>
      </div>

      <div className="col-6 col-md-3">
        <div className="recruiter-card p-4">
          <img src="https://collegemilan-backend-2.onrender.com/uploads/TCS.jpg" alt="TCS" className="img-fluid recruiter-logo" />
        </div>
      </div>

    </div>
  </div>
</section>
  <section className="py-5" style={{backgroundColor: '#f9f9f9'}}>
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold" style={{color:'#fd7e14'}}>Our Placement Highlights</h2>
      <p className="text-muted">Achievements & Key Metrics from Past Drives</p>
    </div>

    <div className="row g-4">
      <div className="col-md-3">
        <motion.div 
          className="highlight-card p-4 text-center shadow-sm rounded"
          whileHover={{ scale: 1.05 }}
        >
          <FaRocket className="fs-1 text-orange mb-3" />
          <h5 className="fw-bold">Fast Growth Roles</h5>
          <p className="text-muted small">Students placed in high-growth startup and corporate roles within 3 months of training.</p>
        </motion.div>
      </div>
      <div className="col-md-3">
        <motion.div 
          className="highlight-card p-4 text-center shadow-sm rounded"
          whileHover={{ scale: 1.05 }}
        >
          <FaCheckCircle className="fs-1 text-orange mb-3" />
          <h5 className="fw-bold">100+ Companies</h5>
          <p className="text-muted small">We partner with 100+ companies to ensure diverse placement opportunities.</p>
        </motion.div>
      </div>
      <div className="col-md-3">
        <motion.div 
          className="highlight-card p-4 text-center shadow-sm rounded"
          whileHover={{ scale: 1.05 }}
        >
          <FaUserGraduate className="fs-1 text-orange mb-3" />
          <h5 className="fw-bold">Top Performers</h5>
          <p className="text-muted small">Our top students have consistently achieved 40+ LPA offers across multiple sectors.</p>
        </motion.div>
      </div>
      <div className="col-md-3">
        <motion.div 
          className="highlight-card p-4 text-center shadow-sm rounded"
          whileHover={{ scale: 1.05 }}
        >
          <FaHandshake className="fs-1 text-orange mb-3" />
          <h5 className="fw-bold">Industry Tie-Ups</h5>
          <p className="text-muted small">Strong relationships with Fortune 500 and global tech companies for direct placements.</p>
        </motion.div>
      </div>
    </div>
  </div>
</section>
     <section 
      className="py-5 text-center text-white" 
      style={{ backgroundColor: '#fd7e14' }}
    >
      <div className="container">
        <h2 className="fw-bold">Get in Touch With Us</h2>
        <p className="mb-4">
          Have questions about placements, registration, or upcoming drives? 
          Our team is here to help you.
        </p>
        <button 
          className="btn btn-light text-dark fw-bold rounded-pill px-5"
          onClick={() => navigate("/contactus")}
        >
        Reach Us
        </button>
      </div>
    </section>
    </div>
  );
};

export default Placement; */