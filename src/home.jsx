import React from 'react';
import { Navbar, Nav, Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Carousel } from "react-bootstrap";
import { motion } from 'framer-motion'; 
import logo from "./assets/logo.png";
import { 
  FaMapMarkedAlt, FaBrain, FaUserTie, FaVideo, 
  FaWhatsapp, FaSignInAlt, FaArrowRight, FaChevronRight,
  FaUserGraduate, FaChalkboardTeacher, FaAward, FaGlobe, FaPlay
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  // Theme Colors
  const orange = "#f47920";
  const darkText = "#333";
  const darkNavy = "#0b1c2d"; 

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };


  return (
    <div style={{ backgroundColor: '#fff', overflowX: 'hidden' }}>
      
      {/* 1. STYLES (Combined & Corrected) */}
      <style>{`
        .nav-link-custom { color: #555 !important; font-weight: 500; margin: 0 10px; transition: 0.3s; }
        .nav-link-custom:hover { color: ${orange} !important; }
        
        .floating-signup {
          position: fixed; left: 0; top: 40%; z-index: 1000;
          background: ${orange}; color: white; padding: 10px 5px;
          writing-mode: vertical-rl; text-orientation: mixed;
          border-radius: 0 10px 10px 0; font-weight: bold; font-size: 14px;
        }

        .whatsapp-float {
          position: fixed; bottom: 30px; right: 30px; z-index: 1000;
          display: flex; align-items: center; gap: 10px;
        }

        .service-card {
          border-radius: 20px; border: none; box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: 0.3s ease; height: 100%;
        }
        .service-card:hover { transform: translateY(-10px); }
        
        .bubble-text {
          background: ${orange}; color: white; padding: 15px 40px;
          border-radius: 0 50px 50px 0; display: inline-block;
          font-weight: bold; font-size: 1.5rem; margin-top: 15px;
        }

        /* Parallax Sections Styling */
        .bg-section {
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          position: relative;
          color: white;
          padding: 80px 20px;
        }
        .bg-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1;
        }
        .content-container { position: relative; z-index: 2; max-width: 1000px; }
        .highlight-text { color: ${orange}; font-weight: 800; }
        
        .custom-btn {
          background-color: ${orange}; border: none; padding: 12px 45px;
          border-radius: 50px; font-weight: bold; font-size: 1.2rem;
          margin-top: 25px; transition: all 0.3s ease;
          box-shadow: 0 8px 15px rgba(244, 121, 32, 0.3);
          color: white;
        }
        .custom-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 20px rgba(244, 121, 32, 0.5);
          background-color: #e66a10; color: white;
        }

        @media (max-width: 768px) {
          .bubble-text { font-size: 1rem; border-radius: 20px; }
          .hero-img { margin-bottom: 30px; }
          .bg-section { min-height: 350px; }
          h2 { font-size: 1.8rem !important; }
        }
      `}</style>

      {/* 2. FLOATING ELEMENTS */}
      <div className="floating-signup shadow">One Click Sign Up 👆</div>
      <div className="whatsapp-float">
        <div style={{background:'white', padding:'5px 15px', borderRadius:'20px', fontSize:'12px', fontWeight:'bold', boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>Talk to us!</div>
        <a href="#"><FaWhatsapp size={50} color="#25D366" /></a>
      </div>
    {/* 3. NAVBAR */}
<Navbar
  bg="white"
  expand="lg"
  fixed="top"
  className="shadow-sm"
  style={{
    height: "90px",
    padding: 0
  }}
>
  <Container
    fluid
    className="h-100 d-flex align-items-center"
  >
    {/* LOGO */}
    <Navbar.Brand
      href="#"
      className="d-flex align-items-center"
      style={{
        padding: 0,
        margin: 0,
        height: "110px"
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          height: "110px",
          width: "auto",
          objectFit: "contain",
          display: "block"
        }}
      />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbar-nav" />

    <Navbar.Collapse id="navbar-nav">
      <Nav className="mx-auto">
        {[
          "About",
          "Career Map",
          "Counseling",
          "Psychometric Test",
          "Top Careers",
          "Seminars"
        ].map((item) => (
          <Nav.Link
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="nav-link-custom"
          >
            {item}
          </Nav.Link>
        ))}
      </Nav>

      <Button
        style={{
          backgroundColor: orange,
          border: "none",
          borderRadius: "25px",
          padding: "8px 25px"
        }}
        className="fw-bold d-flex align-items-center gap-2"
      >
        <FaSignInAlt /> Login
      </Button>
    </Navbar.Collapse>
  </Container>
</Navbar>
{/* =================== STRONG HERO SECTION =================== */}
<section
  style={{
    marginTop: "90px",
    minHeight: "90vh",
    paddingBottom: "110px", // ✅ next section se safe
    background: `linear-gradient(120deg, #0b1c2d 0%, #132f4c 60%, ${orange} 140%)`,
    color: "white",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center"
  }}
>
  {/* Overlay Pattern */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      opacity: 0.18,
      zIndex: 1
    }}
  />

  <Container style={{ position: "relative", zIndex: 2 }}>
    <Row className="align-items-center">

      {/* LEFT CONTENT */}
      <Col lg={6}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span
            style={{
              background: orange,
              padding: "4px 12px",
              borderRadius: "30px",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1px"
            }}
          >
            MILAN EDUCATION
          </span>

          <h1
            className="fw-bold mt-4"
            style={{
              fontSize: "2.8rem", // ✅ reduced
              lineHeight: "1.15"
            }}
          >
            Shape Your <br />
            <span style={{ color: "#ffd8b8" }}>
              Career With Confidence
            </span>
          </h1>

          <p
            className="mt-4"
            style={{
              fontSize: "1.05rem", // ✅ reduced
              maxWidth: "500px",
              opacity: 0.9,
              lineHeight: "1.75"
            }}
          >
            Milan Education helps students choose the right career path
            through expert counseling, psychometric analysis and
            result-oriented mentorship.
          </p>

          {/* CTA */}
          <div className="mt-5 d-flex gap-3 flex-wrap">
            <Button
              size="lg"
              style={{
                background: orange,
                border: "none",
                padding: "12px 34px",
                borderRadius: "14px",
                fontWeight: "700",
                boxShadow: `0 18px 36px ${orange}55`
              }}
            >
              Book Free Counseling
            </Button>

            <Button
              size="lg"
              variant="outline-light"
              style={{
                padding: "12px 30px",
                borderRadius: "14px",
                fontWeight: "700"
              }}
            >
              Explore Programs
            </Button>
          </div>
        </motion.div>
      </Col>
      {/* RIGHT IMAGE */}
<Col lg={6} className="mt-5 mt-lg-0">
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    style={{ position: "relative" }}
  >
    {/* Glow */}
    <div
      style={{
        position: "absolute",
        inset: "-20px",
        background: `${orange}35`,
        filter: "blur(70px)",
        zIndex: -1
      }}
    />

    {/* ANIMATED IMAGE */}
    <motion.img
      src="https://i.pinimg.com/1200x/bd/38/78/bd3878ed9979f0c56cd39cd5654e5afd.jpg"
      alt="Education Hero"
      animate={{ scale: [1, 1.07, 1] }}   // ✅ zoom in → zoom out
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: "100%",
        height: "460px",
        objectFit: "cover",
        borderRadius: "26px",
        boxShadow: "0 35px 70px rgba(0,0,0,0.35)"
      }}
    />

    {/* Stats (NO OVERLAP, SAFE) */}
    <div
      style={{
        position: "absolute",
        bottom: "18px",
        left: "18px",
        background: "white",
        color: "#000",
        padding: "14px 20px",
        borderRadius: "16px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        boxShadow: "0 14px 30px rgba(0,0,0,0.25)"
      }}
    >
      <FaUserGraduate size={28} style={{ color: orange }} />
      <div>
        <h6 className="mb-0 fw-bold">15,000+</h6>
        <small className="text-muted">Students Guided</small>
      </div>
    </div>
  </motion.div>
</Col>
    </Row>
  </Container>
</section>

    {/* --- MILAN EDUCATION: NEXT-LEVEL PREMIUM SERVICES --- */}
<section className="position-relative" style={{ marginTop: '-110px', zIndex: 10, paddingBottom: '40px' }}>
  
  {/* Bindu/Dot Pattern background for the cards area */}
  <div style={{
    position: 'absolute', top: '50px', left: '5%', right: '5%', bottom: '0',
    backgroundImage: `radial-gradient(${orange} 1.5px, transparent 1.5px)`,
    backgroundSize: '25px 25px',
    opacity: 0.05,
    zIndex: -1
  }}></div>

  <Container>
    <Row className="g-4 justify-content-center">
      {[
        { 
          title: "Career Map", 
          desc: "Strategic roadmaps for your academic journey.",
          icon: <FaMapMarkedAlt />, 
          color: "#f47920" 
        },
        { 
          title: "Psychometric Test", 
          desc: "Scientific analysis of your skills and personality.",
          icon: <FaBrain />, 
          color: "#2b2d42" 
        },
        { 
          title: "Counseling Session", 
          desc: "Personalized 1-on-1 expert career guidance.",
          icon: <FaUserTie />, 
          color: "#f47920" 
        },
        { 
          title: "Watch Videos", 
          desc: "Premium video content for career insights.",
          icon: <FaVideo />, 
          color: "#2b2d42" 
        }
      ].map((item, index) => (
        <Col lg={3} md={6} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -15 }}
          >
            <div className="premium-service-card shadow-lg" style={{
              backgroundColor: '#ffffff',
              borderRadius: '30px',
              padding: '40px 30px',
              height: '100%',
              textAlign: 'center',
              border: '1px solid #f0f0f0',
              position: 'relative',
              overflow: 'hidden',
              transition: '0.4s'
            }}>
              {/* Top Accent Line */}
              <div style={{ 
                position: 'absolute', top: 0, left: 0, right: 0, 
                height: '6px', backgroundColor: item.color 
              }}></div>

              {/* Step Number (Subtle Background) */}
              <span style={{ 
                position: 'absolute', top: '20px', right: '25px', 
                fontSize: '4rem', fontWeight: '900', color: '#f0f0f0', 
                zIndex: 0, userSelect: 'none' 
              }}>0{index + 1}</span>

              {/* Real Icon with Circle Background */}
              <div className="icon-wrapper mb-4" style={{
                width: '85px', height: '85px', 
                backgroundColor: `${item.color}15`, 
                borderRadius: '22px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
                fontSize: '2.5rem',
                color: item.color,
                position: 'relative',
                zIndex: 1,
                transition: '0.3s'
              }}>
                {item.icon}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 className="fw-bold mb-3" style={{ color: '#1a1a1a', fontSize: '1.35rem' }}>
                  {item.title}
                </h4>
                <p className="text-muted small mb-4" style={{ lineHeight: '1.6', minHeight: '50px' }}>
                  {item.desc}
                </p>
                
                <Button 
                  variant="link" 
                  className="p-0 fw-bold text-decoration-none d-flex align-items-center justify-content-center mx-auto"
                  style={{ color: item.color, gap: '8px' }}
                >
                  EXPLORE <FaChevronRight size={12} />
                </Button>
              </div>
            </div>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Container>

  {/* CSS for Real-time Hover Effects */}
  <style>{`
    .premium-service-card:hover {
      border-color: ${orange}30 !important;
      box-shadow: 0 25px 50px rgba(244, 121, 32, 0.12) !important;
    }
    .premium-service-card:hover .icon-wrapper {
      background-color: ${orange} !important;
      color: white !important;
      transform: rotateY(180deg);
    }
    .premium-service-card:hover h4 {
      color: ${orange} !important;
    }
  `}</style>
</section>

    {/* --- MILAN EDUCATION: PREMIUM ABOUT SECTION --- */}
<section id="about" className="position-relative overflow-hidden" style={{ 
  padding: '100px 0', 
  backgroundColor: '#fdfdfd' 
}}>
  
  {/* --- UNIQUE BACKGROUND: BINDU (DOT) GRID --- */}
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `radial-gradient(${orange} 1.2px, transparent 1.2px)`,
    backgroundSize: '25px 25px',
    opacity: 0.08,
    zIndex: 1
  }}></div>

  {/* Soft Gradient Mesh for Depth */}
  <div style={{
    position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px',
    background: `radial-gradient(circle, ${orange}10 0%, transparent 70%)`,
    borderRadius: '50%', zIndex: 0
  }}></div>

  <Container className="position-relative" style={{ zIndex: 10 }}>
    <Row className="align-items-center gy-5">
      
      {/* 1. LEFT SIDE: MODERN 3-IMAGE COLLAGE */}
      <Col lg={6}>
        <div className="position-relative" style={{ height: '480px' }}>
          
          {/* Main Image (Founder) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              position: 'absolute', top: '0', left: '10%', 
              width: '65%', height: '85%', zIndex: 3,
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              border: '6px solid white'
            }}
          >
            <img src="https://i.pinimg.com/736x/63/20/ed/6320ed9a61834db5beb4a6df8788f40d.jpg" alt="Milan Education Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Second Image (Workshop/Activity) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              position: 'absolute', bottom: '5%', right: '0', 
              width: '50%', height: '45%', zIndex: 4,
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
              border: `4px solid ${orange}`
            }}
          >
            <img src="https://i.pinimg.com/736x/cd/49/3f/cd493f8be9b131a98ddaabfb772745a5.jpg" alt="Education Session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Third Image (Candid Moment) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              position: 'absolute', top: '15%', left: '-5%', 
              width: '140px', height: '140px', zIndex: 5,
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: '4px solid white'
            }}
          >
            <img src="https://i.pinimg.com/1200x/7a/83/7c/7a837c860b767d640b16c66da66b512b.jpg" alt="Small Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </Col>

      {/* 2. RIGHT SIDE: BALANCED CONTENT */}
      <Col lg={6} className="ps-lg-5">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="d-flex align-items-center mb-3">
             <span className="fw-bold px-2 py-1" style={{ color: orange, backgroundColor: `${orange}10`, borderRadius: '4px', fontSize: '12px', letterSpacing: '1px' }}>
               SINCE 2008
             </span>
          </div>
          
          <h2 className="fw-bold mb-4" style={{ fontSize: '2.3rem', color: '#1a1a2e', lineHeight: '1.2' }}>
            Transforming Aspirations into 
            <span style={{ color: orange }}>  real Success Stories</span>
          </h2>

          <p className="text-muted fs-6 mb-3" style={{ lineHeight: "1.7" }}>
  <strong>Milan Education</strong> is more than just a career platform. It’s a dedicated ecosystem led by 
  Mr. <strong>Mohit Bansal</strong>, designed to bridge the gap between student potential and career excellence.
  With a strong foundation in data-driven counseling and real-world insights, we empower students to make 
  confident academic and professional decisions.
  Our mission is to nurture clarity, confidence, and long-term success at every stage of a student’s journey.
</p>


          <Row className="mb-5 g-4">
             <Col sm={6}>
                <div className="d-flex align-items-start gap-3">
                   <div style={{ color: orange, fontSize: '1.5rem' }}><i className="fas fa-check-circle"></i></div>
                   <div>
                      <h6 className="fw-bold mb-1">Expert Mentorship</h6>
                      <p className="small text-muted mb-0">Guided by 15+ years of industry experience.</p>
                   </div>
                </div>
             </Col>
             <Col sm={6}>
                <div className="d-flex align-items-start gap-3">
                   <div style={{ color: orange, fontSize: '1.5rem' }}><i className="fas fa-bullseye"></i></div>
                   <div>
                      <h6 className="fw-bold mb-1">Career Mapping</h6>
                      <p className="small text-muted mb-0">Strategic paths tailored to individual goals.</p>
                   </div>
                </div>
             </Col>
          </Row>

          <div className="d-flex align-items-center gap-4">
             <Button 
               style={{ 
                 backgroundColor: orange, 
                 border: 'none', 
                 borderRadius: '12px', 
                 padding: '14px 35px', 
                 fontWeight: 'bold',
                 fontSize: '1rem' 
               }}
               className="shadow"
             >
                Discover More
             </Button>
             
             <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                <div style={{ 
                  width: '45px', height: '45px', borderRadius: '50%', 
                  border: `2px solid ${orange}`, display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', color: orange 
                }}>
                   <i className="fas fa-play small"></i>
                </div>
                <span className="ms-2 fw-bold small text-dark">VIRTUAL TOUR</span>
             </div>
          </div>
        </motion.div>
      </Col>

    </Row>
  </Container>
</section>
{/* --- MILAN EDUCATION: PRO PARALLAX SECTIONS --- */}
<style>{`
  .parallax-pro-section {
    min-height: 500px;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    position: relative;
    padding: 80px 0;
  }
  .parallax-pro-section::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
    z-index: 1;
  }
  .glass-content-box {
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-left: 5px solid ${orange};
    padding: 40px;
    border-radius: 0 20px 20px 0;
    max-width: 700px;
  }
  .pro-heading {
    font-size: 2.2rem; /* Reduced Font Size for 'Pro' look */
    line-height: 1.2;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
  }
  .pro-subtext {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.8);
    line-height: 1.6;
    margin-bottom: 30px;
  }
`}</style>

{/* 1. CAREER MAP SECTION */}
<section className="parallax-pro-section" style={{ backgroundImage: `url('https://i.pinimg.com/1200x/ea/4a/df/ea4adf16e1e40f3570cedaff3a8bc7c3.jpg')` }}>
  <Container>
    <motion.div 
      initial={{ opacity: 0, x: -50 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8 }}
      className="glass-content-box"
    >
      <h2 className="pro-heading">
        Discover Your <span style={{ color: orange }}>Career Journey</span>
      </h2>
      <p className="pro-subtext">
        Explore, navigate, and achieve your professional goals with Milan Education's dynamic Career Map. We provide a step-by-step roadmap tailored to your strengths and market trends.
      </p>
      <Button className="hero-btn-primary hero-btn d-flex align-items-center gap-2">
        Explore Career Map <FaArrowRight />
      </Button>
    </motion.div>
  </Container>
</section>

{/* 2. PSYCHOMETRIC TEST SECTION */}
<section className="parallax-pro-section" style={{ backgroundImage: `url('https://i.pinimg.com/736x/a3/b3/36/a3b3368bc38214bdca4acd00d3804575.jpg')` }}>
  <Container className="d-flex justify-content-end">
    <motion.div 
      initial={{ opacity: 0, x: 50 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8 }}
      className="glass-content-box"
      style={{ borderLeft: 'none', borderRight: `5px solid ${orange}`, borderRadius: '20px 0 0 20px' }}
    >
      <h2 className="pro-heading text-end">
        Advanced <span style={{ color: orange }}>Psychometric Evaluation</span>
      </h2>
      <p className="pro-subtext text-end">
        Uncover your true potential through our scientific testing methods. At Milan Education, we analyze your aptitude, personality, and passion to find your perfect subject interest.
      </p>
      <div className="text-end">
        <Button className="hero-btn-primary hero-btn d-inline-flex align-items-center gap-2">
          Take Assessment <FaBrain />
        </Button>
      </div>
    </motion.div>
  </Container>
</section>

{/* 3. EXPERT COUNSELING SECTION (Naya Section) */}
<section className="parallax-pro-section" style={{ backgroundImage: `url('https://i.pinimg.com/1200x/f9/42/d6/f942d6dbd41891a36d3ce386d803cff2.jpg')` }}>
  <Container>
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="glass-content-box"
    >
      <h2 className="pro-heading">
        Personalized <span style={{ color: orange }}>Expert Counseling</span>
      </h2>
      <p className="pro-subtext">
        Get direct access to industry veterans and experienced mentors. Milan Education offers one-on-one sessions to solve your career-related queries and build your confidence for the future.
      </p>
      <Button className="hero-btn-primary hero-btn d-flex align-items-center gap-2">
        Book Private Session <FaUserTie />
      </Button>
    </motion.div>
  </Container>
</section>
     {/* --- MILAN EDUCATION: REALISTIC & COMPACT IMPACT SECTION --- */}
<section className="position-relative" style={{ 
  padding: '50px 0', 
  backgroundColor: '#f8f9fa', 
  borderTop: '1px solid #eee',
  borderBottom: '1px solid #eee'
}}>
  
  {/* Professional Subtle Dot Background */}
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `radial-gradient(${orange} 1px, transparent 1px)`,
    backgroundSize: '25px 25px',
    opacity: 0.05,
    zIndex: 1
  }}></div>

  <Container className="position-relative" style={{ zIndex: 5 }}>
    <Row className="g-3 justify-content-center">
      {[
        { 
          count: "15,000+", 
          label: "Students Mentored", 
          icon: <FaUserGraduate />, 
          desc: "Academic & Career Growth" 
        },
        { 
          count: "500+", 
          label: "School Workshops", 
          icon: <FaChalkboardTeacher />, 
          desc: "Across India Coverage" 
        },
        { 
          count: "20+", 
          label: "Years Excellence", 
          icon: <FaAward />, 
          desc: "Since 2008 Foundations" 
        },
        { 
          count: "1 Lakh+", 
          label: "Digital Impact", 
          icon: <FaGlobe />, 
          desc: "Monthly Active Visitors" 
        }
      ].map((item, index) => (
        <Col lg={3} md={6} key={index}>
          <motion.div 
            whileHover={{ y: -5 }}
            className="h-100 p-4 shadow-sm"
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '20px', 
              border: '1px solid #f0f0f0',
              textAlign: 'center',
              transition: '0.3s'
            }}
          >
            {/* Real Icon with Soft Background */}
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: `${orange}10`, 
              color: orange, 
              borderRadius: '15px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 15px',
              fontSize: '1.8rem'
            }}>
              {item.icon}
            </div>

            {/* Realistic Bold Numbers */}
            <h3 className="fw-bold mb-1" style={{ fontSize: '2.2rem', color: '#1a1a2e', letterSpacing: '-1px' }}>
              {item.count}
            </h3>

            {/* Labels and Sub-text */}
            <p className="fw-bold mb-1 text-uppercase" style={{ fontSize: '12px', color: '#555', letterSpacing: '1px' }}>
              {item.label}
            </p>
            <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>
              {item.desc}
            </p>

            {/* Bottom Accent Line */}
            <div style={{ 
              width: '30px', 
              height: '3px', 
              backgroundColor: orange, 
              margin: '12px auto 0', 
              borderRadius: '10px',
              opacity: 0.6
            }}></div>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Container>

  {/* Custom CSS for compact look */}
  <style>{`
    @media (max-width: 768px) {
      h3 { font-size: 1.8rem !important; }
      .p-4 { padding: 20px !important; }
    }
  `}</style>
</section>
{/* --- MILAN EDUCATION: LATEST INSIGHTS & BLOG SLIDER --- */}
<section style={{ padding: '80px 0', backgroundColor: '#fff', position: 'relative' }}>
  <Container>
    {/* Section Heading */}
    <div className="text-center mb-5">
      <motion.span 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        style={{ color: orange, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}
      >
        Knowledge Hub
      </motion.span>
      <motion.h2 
        initial={{ y: 20, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        className="fw-bold mt-2" 
        style={{ fontSize: '2.5rem', color: '#1a1a1a' }}
      >
        Latest From <span style={{ color: orange }}>Milan Education</span>
      </motion.h2>
      <div style={{ width: '60px', height: '4px', background: orange, margin: '20px auto', borderRadius: '2px' }}></div>
    </div>

    {/* Multi-Item Carousel */}
    <Carousel 
      indicators={true} 
      controls={true} 
      interval={4000} 
      pause="hover"
      className="education-slider"
    >
      {/* Slide 1 (Desktop: 3 Cards) */}
      <Carousel.Item>
        <Row className="px-md-5 g-4">
          {[
            { 
              title: "Impact of Digital Learning on Modern Students", 
              img: "https://i.pinimg.com/1200x/fe/90/d1/fe90d16be8cadcbe894be1bd8090b682.jpg", 
              tag: "Learning" 
            },
            { 
              title: "Top 10 Career Opportunities After Graduation", 
              img: "https://i.pinimg.com/736x/cc/a4/ed/cca4eddf6eb5ddadb356322404e056f7.jpg", 
              tag: "Career" 
            },
            { 
              title: "How to Choose the Right Stream for Your Future", 
              img: "https://i.pinimg.com/736x/8c/66/91/8c669117c73330f55ca438b3e34be459.jpg", 
              tag: "Guidance" 
            }
          ].map((blog, idx) => (
            <Col md={4} key={idx}>
              <motion.div whileHover={{ y: -10 }} className="h-100 shadow-sm border-0 card-hover-effect" style={{ borderRadius: '20px', overflow: 'hidden', background: '#f9f9f9' }}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                   <img src={blog.img} alt="Education" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   <span style={{ position: 'absolute', top: '15px', left: '15px', background: orange, color: 'white', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>
                     {blog.tag}
                   </span>
                </div>
                <div className="p-4 bg-white text-center">
                  <h5 className="fw-bold mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>{blog.title}</h5>
                  <Button variant="link" className="p-0 fw-bold text-decoration-none" style={{ color: orange }}>Read More →</Button>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Carousel.Item>

      {/* Slide 2 (Desktop: Next 3 Cards) */}
      <Carousel.Item>
        <Row className="px-md-5 g-4">
          {[
            { 
              title: "Preparation Tips for Competitive Exams", 
              img: "https://i.pinimg.com/736x/1b/90/0e/1b900ec45828a5bd98d0ae9b26f5bfa3.jpg", 
              tag: "Study" 
            },
            { 
              title: "Developing Soft Skills for Corporate Success", 
              img: "https://i.pinimg.com/1200x/54/23/b6/5423b6c25552ca95b35f0c2bf7f5a8e7.jpg", 
              tag: "Skills" 
            },
            { 
              title: "Mental Well-being During Exam Season", 
              img: "https://i.pinimg.com/736x/2e/a4/6e/2ea46e02db4c04639487aac0337e5de4.jpg", 
              tag: "Health" 
            }
          ].map((blog, idx) => (
            <Col md={4} key={idx}>
              <motion.div whileHover={{ y: -10 }} className="h-100 shadow-sm border-0 card-hover-effect" style={{ borderRadius: '20px', overflow: 'hidden', background: '#f9f9f9' }}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                   <img src={blog.img} alt="Education" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   <span style={{ position: 'absolute', top: '15px', left: '15px', background: orange, color: 'white', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>
                     {blog.tag}
                   </span>
                </div>
                <div className="p-4 bg-white text-center">
                  <h5 className="fw-bold mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>{blog.title}</h5>
                  <Button variant="link" className="p-0 fw-bold text-decoration-none" style={{ color: orange }}>Read More →</Button>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Carousel.Item>
    </Carousel>

    <div className="text-center mt-5">
       <Button 
        style={{ backgroundColor: orange, border: 'none', borderRadius: '30px', padding: '12px 40px', fontWeight: 'bold' }}
        className="shadow"
       >
         Explore All Blogs
       </Button>
    </div>
  </Container>

  {/* Custom CSS for Carousel Dots and Arrows */}
  <style>{`
    .education-slider .carousel-indicators {
      bottom: -60px;
    }
    .education-slider .carousel-indicators [data-bs-target] {
      background-color: ${orange};
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .education-slider .carousel-control-prev-icon,
    .education-slider .carousel-control-next-icon {
      background-color: ${orange};
      border-radius: 50%;
      padding: 20px;
      background-size: 50%;
    }
    @media (max-width: 768px) {
      .education-slider .col-md-4 {
        margin-bottom: 20px;
      }
    }
  `}</style>
</section>
  {/* --- MILAN EDUCATION: PREMIUM TESTIMONIALS & INQUIRY (DARK MESH VERSION) --- */}
<section className="position-relative overflow-hidden" style={{ 
  padding: '100px 0', 
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', // Deep Navy Professional Background
  minHeight: '800px'
}}>
  
  {/* Bindu/Dot Pattern - Enhanced for Dark Theme */}
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `radial-gradient(${orange} 1.5px, transparent 1.5px)`,
    backgroundSize: '40px 40px',
    opacity: 0.15,
    zIndex: 1
  }}></div>

  {/* Decorative Animated Blob */}
  <motion.div 
    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
    transition={{ duration: 15, repeat: Infinity }}
    style={{ 
      position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', 
      background: `radial-gradient(circle, ${orange}15 0%, transparent 70%)`, 
      borderRadius: '50%', zIndex: 0 
    }} 
  />

  <Container className="position-relative" style={{ zIndex: 10 }}>
    <Row className="gy-5 align-items-center">
      
      {/* 1. TESTIMONIALS SIDE */}
      <Col lg={6}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4">
             <span className="fw-bold px-3 py-1 text-uppercase" style={{ color: orange, border: `1px solid ${orange}`, borderRadius: '5px', fontSize: '12px', letterSpacing: '2px' }}>
                Wall of Fame
             </span>
          </div>
          <h2 className="display-4 fw-bold mb-4 text-white">
            Success Stories at <br/>
            <span style={{ color: orange }}>Milan Education</span>
          </h2>
          <p className="fs-5 mb-5" style={{ color: '#94a3b8', maxWidth: '500px' }}>
            Empowering students with clarity and confidence. Hear from our alumni who achieved their dreams.
          </p>

          <Carousel indicators={true} controls={false} interval={4000} fade>
            {[
              { name: "Monika Garg", role: "Student", text: "Milan Education didn't just teach me, they showed me a path I never thought was possible. The mentors are truly inspiring.", rating: 5 },
              { name: "Rahul Sharma", role: "Career Aspirant", text: "The psychometric tests helped me find my true passion. I am now pursuing my dream career thanks to Milan Education.", rating: 5 },
              { name: "Ananya Iyer", role: "MBA Student", text: "Next-level support! The mentors are always there to clear doubts. Highly recommend for any serious student.", rating: 5 }
            ].map((t, idx) => (
              <Carousel.Item key={idx}>
                <div className="p-4 p-md-5 shadow-lg position-relative" style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: '30px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginTop: '20px'
                }}>
                  {/* Floating Quote Icon */}
                  <div style={{ position: 'absolute', top: '-25px', left: '30px', fontSize: '50px', color: orange, opacity: 0.5 }}>“</div>
                  
                  <p className="fs-5 text-white mb-4 fst-italic" style={{ lineHeight: '1.7' }}>"{t.text}"</p>
                  
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '55px', height: '55px', background: orange, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                      <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt="user" style={{ width: '100%' }} />
                    </div>
                    <div>
                      <h6 className="fw-bold text-white mb-0">{t.name}</h6>
                      <small style={{ color: orange }}>{t.role}</small>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </motion.div>
      </Col>

      {/* 2. INQUIRY FORM SIDE (MODERN DARK CARD) */}
      <Col lg={{ span: 5, offset: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            background: '#1e293b', 
            borderRadius: '40px', 
            padding: '40px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            border: '1px solid rgba(244, 121, 32, 0.2)'
          }}
        >
          <div className="text-center mb-4">
            <h3 className="fw-bold text-white mb-2">Book a Session</h3>
            <p style={{ color: '#94a3b8' }}>Fill the form, we will call you back!</p>
          </div>
          
          <form>
            <div className="mb-3">
              <input type="text" className="form-control premium-input" placeholder="Full Name" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control premium-input" placeholder="Currently Pursuing" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control premium-input" placeholder="City" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control premium-input" placeholder="Email Address" />
            </div>
            <div className="mb-4">
              <input type="tel" className="form-control premium-input" placeholder="Phone Number" />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: '#e66a10' }}
              whileTap={{ scale: 0.98 }}
              className="btn w-100 py-3 fw-bold text-white shadow-lg" 
              style={{ background: orange, borderRadius: '15px', fontSize: '1.1rem', border: 'none' }}
            >
              Get Expert Advice <FaArrowRight className="ms-2" />
            </motion.button>
          </form>
        </motion.div>
      </Col>

    </Row>
  </Container>
  
  <style>{`
    .premium-input {
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 12px !important;
      padding: 15px 20px !important;
      color: white !important;
      transition: 0.3s;
    }
    .premium-input:focus {
      background: rgba(255, 255, 255, 0.08) !important;
      border-color: ${orange} !important;
      box-shadow: 0 0 0 4px ${orange}20 !important;
    }
    .premium-input::placeholder { color: rgba(255,255,255,0.3); }
    
    .carousel-indicators [data-bs-target] {
      background-color: ${orange} !important;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  `}</style>
</section>
    {/* 9. FOOTER SECTION */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '60px 0 20px 0', borderTop: '1px solid #333' }}>
        <Container>
          <Row className="gy-4">
            
            {/* Column 1: WHO WE ARE */}
            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>Who We Are</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">About Us</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">About The Founder</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Disclaimer</a></li>
              </ul>
            </Col>

            {/* Column 2: EXPLORE */}
            <Col lg={3} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>Explore</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Career Map</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Youtube Videos</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Youtube Shorts</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Events</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Inquire Now</a></li>
              </ul>
            </Col>

            {/* Column 3: RESOURCES */}
            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>Resources</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Terms & Conditions</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Refund Policy</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Cancellation Policy</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none footer-link">Privacy Policy</a></li>
              </ul>
            </Col>

            {/* Column 4: SUBSCRIBE */}
            <Col lg={5} md={6}>
              <h6 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>Subscribe</h6>
              <p className="text-white-50 mb-4 small">Sign Up with your email address to receive news and updates</p>
              
              <div className="d-flex mb-3 position-relative">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email Address" 
                  style={{ borderRadius: '50px', padding: '12px 25px', border: 'none' }}
                />
                <Button 
                  style={{ 
                    backgroundColor: orange, 
                    border: 'none', 
                    borderRadius: '50px', 
                    padding: '8px 30px',
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    bottom: '5px',
                    fontWeight: 'bold'
                  }}
                >
                  Submit
                </Button>
              </div>
              
              <div className="d-flex justify-content-between align-items-center">
                 <p className="text-white-50 small mb-0 italic">We respect your privacy</p>
                 <a href="#" className="text-white text-decoration-none small">Help?</a>
              </div>

              {/* Social Icons */}
              <div className="mt-4 d-flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-circle border border-secondary d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', cursor: 'pointer' }}>
                    <i className="text-white small">●</i>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>

        {/* Copyright Bar */}
        <div className="mt-5 py-3 border-top border-secondary text-center">
           <p className="text-white-50 small mb-0">
             Copyright © Milan Education. All rights reserved
           </p>
        </div>

        {/* CSS for Footer Links Hover */}
        <style>{`
          .footer-link:hover {
            color: ${orange} !important;
            padding-left: 5px;
            transition: 0.3s;
          }
        `}</style>
      </footer>

    </div>
  );
};

export default HomePage;