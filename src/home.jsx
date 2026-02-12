import React from 'react';
import { Container, Button, Row, Col, Carousel } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'; 
import { 
  FaMapMarkedAlt, FaBrain, FaUserTie, FaVideo, FaArrowRight, 
  FaChevronRight, FaUserGraduate, FaChalkboardTeacher, FaAward, FaGlobe 
} from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-pattern-overlay" />

        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="align-items-center">
            
            {/* LEFT CONTENT */}
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <h1 className="hero-title">
                  Shape Your <br />
                  <span className="hero-subtitle">Career With Confidence</span>
                </h1>

                <p className="hero-desc mt-4">
                  College Education helps students choose the right career path
                  through expert counseling, psychometric analysis and
                  result-oriented mentorship.
                </p>

                <div className="mt-5 d-flex gap-3 flex-wrap">
                  <Button
                    className="hero-btn-main"
                    onClick={() => navigate("/careermap")}
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
                <div className="hero-image-glow" />

                <motion.img
                  src="https://i.pinimg.com/1200x/bd/38/78/bd3878ed9979f0c56cd39cd5654e5afd.jpg"
                  alt="Education Hero"
                  animate={{ scale: [1, 1.07, 1] }}   
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="hero-img"
                />

                <div className="hero-stats-card">
                  <FaUserGraduate size={28} color="#f47920" />
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

      {/* ================= PREMIUM SERVICES ================= */}
      <section className="services-section">
        <div className="bg-dots-pattern"></div>

        <Container>
          <Row className="g-4 justify-content-center">
            {[
              { 
                title: "Career Map", 
                desc: "Strategic roadmaps for your academic journey.",
                icon: <FaMapMarkedAlt />, 
                link: "/careermap",
                color: "#f47920" 
              },
              { 
                title: "Psychometric Test", 
                desc: "Scientific analysis of your skills and personality.",
                icon: <FaBrain />, 
                link: "/test",
                color: "#2b2d42" 
              },
              { 
                title: "Counseling Session", 
                desc: "Personalized 1-on-1 expert career guidance.",
                icon: <FaUserTie />, 
                link: "/counselling",
                color: "#866248" 
              },
              { 
                title: "Watch Videos", 
                desc: "Premium video content for career insights.",
                icon: <FaVideo />, 
                link: "/videos",
                color: "#2b2d42" 
              }
            ].map((item, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="h-100"
                >
                  <Link to={item.link} style={{ textDecoration: "none" }}>
                    <div className="premium-service-card shadow-lg">
                      <div className="card-top-accent" style={{ backgroundColor: item.color }}></div>
                      <span className="card-step-number">0{index + 1}</span>

                      <div className="icon-wrapper mb-4" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                        {item.icon}
                      </div>

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
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="about-section">
        <div className="about-mesh-gradient"></div>

        <Container className="position-relative" style={{ zIndex: 10 }}>
          <Row className="align-items-center gy-5">
            {/* LEFT IMAGES */}
            <Col lg={6}>
              <div className="collage-container">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="collage-img-1"
                >
                  <img src="https://i.pinimg.com/736x/63/20/ed/6320ed9a61834db5beb4a6df8788f40d.jpg" alt="Founder" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="collage-img-2"
                >
                  <img src="https://i.pinimg.com/736x/cd/49/3f/cd493f8be9b131a98ddaabfb772745a5.jpg" alt="Session" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="collage-img-3"
                >
                  <img src="https://i.pinimg.com/1200x/7a/83/7c/7a837c860b767d640b16c66da66b512b.jpg" alt="Detail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
              </div>
            </Col>

            {/* RIGHT CONTENT */}
            <Col lg={6} className="ps-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="since-badge px-2 py-1">SINCE 2008</span>

                <h2 className="fw-bold my-4" style={{ fontSize: "2.3rem", color: "#1a1a2e", lineHeight: "1.2" }}>
                  Transforming Aspirations into <span style={{ color: "#f47920" }}>real Success Stories</span>
                </h2>

                <p className="text-muted">
                   <strong>College Milan</strong> is more than just a career platform.
                   It’s a dedicated ecosystem led by Mr. <strong>Mohit Bansal</strong>, designed to bridge the gap
                   between student potential and career excellence.
                   <br /><br />
                   Our mission is to guide students at every stage of their journey,
                   from choosing the right college to building a successful career.
                </p>
                <Button className="hero-btn-main mt-3">Discover More</Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section className="video-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="text-center mb-5">
                <h2 style={{fontWeight: "bold", fontSize: "2.2rem", color: "#f47920"}}>
                  Discover How We Shape Careers
                </h2>
                <p style={{color: "#444", fontSize: "1.05rem"}}>
                  Watch how College Milan is transforming student futures.
                </p>
              </div>
              <div className="video-container">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/3n-DOKBffuU"
                  title="Education Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= PARALLAX SECTIONS ================= */}
      {/* 1. CAREER MAP */}
      <section className="parallax-pro-section" style={{ backgroundImage: `url('https://i.pinimg.com/1200x/ea/4a/df/ea4adf16e1e40f3570cedaff3a8bc7c3.jpg')` }}>
        <Container>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="glass-content-box"
          >
            <h2 className="pro-heading">
              Discover Your <span style={{ color: "#f47920" }}>Career Journey</span>
            </h2>
            <p className="pro-subtext">
              Explore, navigate, and achieve your professional goals with Milan Education's dynamic Career Map.
            </p>
            <Button className="hero-btn-main d-flex align-items-center gap-2">
              Explore Career Map <FaArrowRight />
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* 2. PSYCHOMETRIC TEST */}
      <section className="parallax-pro-section" style={{ backgroundImage: `url('https://i.pinimg.com/736x/a3/b3/36/a3b3368bc38214bdca4acd00d3804575.jpg')` }}>
        <Container className="d-flex justify-content-end">
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="glass-content-box right-aligned"
          >
            <h2 className="pro-heading text-end">
              Advanced <span style={{ color: "#f47920" }}>Psychometric Evaluation</span>
            </h2>
            <p className="pro-subtext text-end">
              Uncover your true potential through our scientific testing methods. We analyze aptitude and personality.
            </p>
            <div className="text-end">
              <Button className="hero-btn-main d-inline-flex align-items-center gap-2">
                Take Assessment <FaBrain />
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3. EXPERT COUNSELING */}
      <section className="parallax-pro-section" style={{ backgroundImage: `url('https://i.pinimg.com/1200x/f9/42/d6/f942d6dbd41891a36d3ce386d803cff2.jpg')` }}>
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="glass-content-box"
          >
            <h2 className="pro-heading">
              Personalized <span style={{ color: "#f47920" }}>Expert Counseling</span>
            </h2>
            <p className="pro-subtext">
              Get direct access to industry veterans and experienced mentors. 
            </p>
            <Button className="hero-btn-main d-flex align-items-center gap-2">
              Book Private Session <FaUserTie />
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ================= IMPACT / STATS SECTION ================= */}
      <section className="impact-section">
        <div className="bg-dots-pattern"></div>
        <Container className="position-relative" style={{ zIndex: 5 }}>
          <Row className="g-3 justify-content-center">
            {[
              { count: "15,000+", label: "Students Mentored", icon: <FaUserGraduate />, desc: "Academic & Career Growth" },
              { count: "500+", label: "School Workshops", icon: <FaChalkboardTeacher />, desc: "Across India Coverage" },
              { count: "20+", label: "Years Excellence", icon: <FaAward />, desc: "Since 2008 Foundations" },
              { count: "1 Lakh+", label: "Digital Impact", icon: <FaGlobe />, desc: "Monthly Active Visitors" }
            ].map((item, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div whileHover={{ y: -5 }} className="stats-card">
                  <div className="stats-icon-box">{item.icon}</div>
                  <h3 className="fw-bold mb-1" style={{ fontSize: '2.2rem', color: '#1a1a2e' }}>{item.count}</h3>
                  <p className="fw-bold mb-1 text-uppercase" style={{ fontSize: '12px', color: '#555' }}>{item.label}</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>{item.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= BLOG SLIDER ================= */}
      <section className="blog-section">
        <Container>
          <div className="text-center mb-5">
            <span style={{ color: "#f47920", fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>
              Knowledge Hub
            </span>
            <h2 className="fw-bold mt-2" style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>
              Latest From <span style={{ color: "#f47920" }}>Milan Education</span>
            </h2>
          </div>

          <Carousel indicators={true} controls={true} interval={4000} pause="hover" className="education-slider">
            <Carousel.Item>
              <Row className="px-md-5 g-4">
                {[
                  { title: "Impact of Digital Learning", img: "https://i.pinimg.com/1200x/fe/90/d1/fe90d16be8cadcbe894be1bd8090b682.jpg", tag: "Learning" },
                  { title: "Top 10 Career Opportunities", img: "https://i.pinimg.com/736x/cc/a4/ed/cca4eddf6eb5ddadb356322404e056f7.jpg", tag: "Career" },
                  { title: "Choose the Right Stream", img: "https://i.pinimg.com/736x/8c/66/91/8c669117c73330f55ca438b3e34be459.jpg", tag: "Guidance" }
                ].map((blog, idx) => (
                  <Col md={4} key={idx}>
                    <div className="blog-card">
                      <div className="blog-img-wrapper">
                        <img src={blog.img} alt="Blog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span className="blog-tag">{blog.tag}</span>
                      </div>
                      <div className="p-4 bg-white text-center">
                        <h5 className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>{blog.title}</h5>
                        <Button variant="link" className="p-0 fw-bold text-decoration-none" style={{ color: "#f47920" }}>Read More →</Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
            
            {/* Second Slide */}
            <Carousel.Item>
              <Row className="px-md-5 g-4">
                {[
                  { title: "Preparation Tips for Exams", img: "https://i.pinimg.com/736x/1b/90/0e/1b900ec45828a5bd98d0ae9b26f5bfa3.jpg", tag: "Study" },
                  { title: "Developing Soft Skills", img: "https://i.pinimg.com/1200x/54/23/b6/5423b6c25552ca95b35f0c2bf7f5a8e7.jpg", tag: "Skills" },
                  { title: "Mental Well-being", img: "https://i.pinimg.com/736x/2e/a4/6e/2ea46e02db4c04639487aac0337e5de4.jpg", tag: "Health" }
                ].map((blog, idx) => (
                  <Col md={4} key={idx}>
                    <div className="blog-card">
                      <div className="blog-img-wrapper">
                        <img src={blog.img} alt="Blog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span className="blog-tag">{blog.tag}</span>
                      </div>
                      <div className="p-4 bg-white text-center">
                        <h5 className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>{blog.title}</h5>
                        <Button variant="link" className="p-0 fw-bold text-decoration-none" style={{ color: "#f47920" }}>Read More →</Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* ================= TESTIMONIALS & FORM ================= */}
      <section className="dark-mesh-section">
        <div className="dark-mesh-dots"></div>
        <div className="dark-blob-anim"></div>

        <Container className="position-relative" style={{ zIndex: 10 }}>
          <Row className="gy-5 align-items-center">
            
            {/* TESTIMONIALS */}
            <Col lg={6}>
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="fw-bold px-3 py-1 text-uppercase text-white" style={{ border: `1px solid #f47920`, borderRadius: '5px', fontSize: '12px' }}>
                  Wall of Fame
                </span>
                <h2 className="display-4 fw-bold mb-4 text-white mt-3">
                  Success Stories at <br/> <span style={{ color: "#f47920" }}>Milan Education</span>
                </h2>
                <Carousel indicators={true} controls={false} interval={3000} fade>
                  {[
                    { name: "Monika Garg", role: "Student", text: "Milan Education didn't just teach me, they showed me a path I never thought was possible." },
                    { name: "Rahul Sharma", role: "Aspirant", text: "The psychometric tests helped me find my true passion. I am now pursuing my dream career." },
                    { name: "Ananya Iyer", role: "MBA Student", text: "Next-level support! The mentors are always there to clear doubts. Highly recommend." }
                  ].map((t, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="testimonial-card">
                        <p className="fs-5 text-white mb-4 fst-italic">"{t.text}"</p>
                        <div className="d-flex align-items-center gap-3">
                          <div style={{ width: '55px', height: '55px', background: "#f47920", borderRadius: '50%' }}></div>
                          <div>
                            <h6 className="fw-bold text-white mb-0">{t.name}</h6>
                            <small style={{ color: "#f47920" }}>{t.role}</small>
                          </div>
                        </div>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </motion.div>
            </Col>

            {/* INQUIRY FORM */}
            <Col lg={{ span: 5, offset: 1 }}>
              <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="premium-inquiry-box"
              >
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-white mb-2">Book a Session</h3>
                  <p style={{ color: '#94a3b8' }}>Fill the form, we will call you back!</p>
                </div>
                
                <form>
                  <input type="text" className="form-control premium-input mb-3" placeholder="Full Name" />
                  <input type="text" className="form-control premium-input mb-3" placeholder="City" />
                  <input type="email" className="form-control premium-input mb-3" placeholder="Email Address" />
                  <input type="tel" className="form-control premium-input mb-4" placeholder="Phone Number" />
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    className="btn w-100 py-3 fw-bold text-white shadow-lg" 
                    style={{ background: "#f47920", borderRadius: '15px', border: 'none' }}
                  >
                    Get Expert Advice <FaArrowRight className="ms-2" />
                  </motion.button>
                </form>
              </motion.div>
            </Col>

          </Row>
        </Container>
      </section>
    </>
  );
}

export default HomePage;