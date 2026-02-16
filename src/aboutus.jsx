import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const orange = "#FF8C00";
  const blue = "#003366";

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const stats = [
    { number: "15,000+", label: "Students Trained", icon: "👨‍🎓" },
    { number: "500+", label: "Expert Mentors", icon: "👨‍🏫" },
    { number: "98%", label: "Success Rate", icon: "📈" },
    { number: "50+", label: "Industry Awards", icon: "🏆" },
  ];

  return (
    <div style={{ overflowX: 'hidden', backgroundColor: '#fff' }}>
      
      {/* 1. HERO BANNER SECTION */}
      <section style={{
        position: 'relative',
        height: '65vh',
        background: `linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)), url('https://images.unsplash.com/photo-1523050335392-93851179ae22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        paddingTop: '80px'
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className="display-3 fw-bold">About <span style={{ color: orange }}>College Milan</span></h1>
          <p className="lead fs-4 px-3">Sahi Gyaan, Sahi Disha - Aapke Sapno Ka Milan!</p>
          <div style={{ height: '5px', width: '80px', backgroundColor: orange, margin: '20px auto' }}></div>
        </motion.div>
      </section>

      {/* 2. OUR STORY SECTION (Detailed Content) */}
      <Container className="py-5 my-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-4">
  <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
    <h6 style={{ color: orange, fontWeight: 'bold', letterSpacing: '2px' }}>
      HOW DID IT ALL BEGIN?
    </h6>

    <h2 className="fw-bold mb-4" style={{ color: blue, fontSize: '2.3rem' }}>
    college Milan : <span style={{ color: orange }}>A Decade of Trust</span>
    </h2>

    <p className="text-muted" style={{ lineHeight: '1.5', fontSize: '1rem', textAlign: 'justify' }}>
     college Milan is not just an institution—it is a mission. We realized that while talent exists in every corner of India, many students lack access to industry-ready skills. Milan Education was founded to bridge this very gap.
    </p>

    <p className="text-muted" style={{ lineHeight: '1.5', fontSize: '1rem', textAlign: 'justify' }}>
      For over a decade, we have been empowering students in technology, competitive examinations, and personality development. We don’t just complete the syllabus; we prepare every student to become a leader. At Milan Education, we believe that <strong>“Education is not just learning facts, but training the mind to think.”</strong>
    </p>

    <p className="text-muted" style={{ lineHeight: '1.5', fontSize: '1rem', textAlign: 'justify' }}>
      Today, we are connected with 500+ mentors who have worked with leading companies such as Google, Microsoft, and other top organizations. Every course we offer is designed by industry experts to ensure you always stay ahead.
    </p>
  </motion.div>
</Col>
          <Col lg={6}>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="ps-lg-5"
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Milan Team" 
                  className="img-fluid rounded-5 shadow-lg"
                />
                <div style={{
                  position: 'absolute', bottom: '-20px', left: '-20px', 
                  backgroundColor: orange, color: 'white', padding: '20px', 
                  borderRadius: '15px', fontWeight: 'bold'
                }}>
                  Since 2015
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* 3. IMPACT STATISTICS SECTION */}
      <section className="py-5" style={{ backgroundColor: blue, color: 'white' }}>
        <Container>
          <Row className="text-center">
            {stats.map((stat, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.2 }}>
                  <div style={{ fontSize: '2.5rem' }}>{stat.icon}</div>
                  <h1 className="fw-bold mt-2" style={{ color: orange, fontSize: '3.2rem' }}>{stat.number}</h1>
                  <p className="text-uppercase fw-bold small">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 4. MISSION & VISION SECTION */}
      <Container className="py-5 my-5">
        <Row className="g-4 text-center">
          <Col md={6}>
            <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <Card className="h-100 p-5 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa', borderRadius: '30px' }}>
                <div className="mb-4" style={{ fontSize: '3rem', color: orange }}>🎯</div>
                <h3 style={{ color: blue }} className="fw-bold">Our Mission</h3>
                <p className="text-muted fs-6">
                 “To equip every student with the skills that set them apart and make them excel in today’s competitive world. We aim to make education so accessible and effective that every child can achieve their dreams.”
                </p>
              </Card>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <Card className="h-100 p-5 border-0 shadow-sm" style={{ borderBottom: `8px solid ${orange}`, borderRadius: '30px' }}>
                <div className="mb-4" style={{ fontSize: '3rem', color: blue }}>👁️‍🗨️</div>
                <h3 style={{ color: blue }} className="fw-bold">Our Vision</h3>
                <p className="text-muted fs-6">
                 “To become India’s most trusted education platform, where learning is not just a necessity but a passion. We are shaping the innovators and leaders of tomorrow.”
                </p>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* 5. CORE VALUES SECTION */}
      <section className="py-5" style={{ backgroundColor: '#f1f4f9' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: blue, fontSize: '2.3rem' }}>Why Trust Us? <span style={{ color: orange }}>Milan Education</span></h2>
            <div style={{ height: '4px', width: '80px', background: orange, margin: '10px auto' }}></div>
          </div>
          <Row>
            {[
              {title: "Personal Attention", icon: "💎", desc: "At Milan Education, our team closely tracks the progress of every student." },
              {title: "Industry Experts", icon: "🏆",desc: "You learn from mentors who are themselves successful professionals working in top companies."},
              {title: "Lifetime Community",icon: "🌍",desc: "Even after completing the course, you remain a part of the Milan Alumni Network."},
              {title: "Job Assistance",icon: "🚀",desc: "From resume building to cracking interviews, we support you at every step."}
            ].map((item, i) => (
              <Col lg={3} md={6} key={i} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-white rounded-4 shadow-sm h-100 text-center border-0"
                >
                  <div style={{ fontSize: '3rem' }} className="mb-3">{item.icon}</div>
                  <h5 style={{ color: blue, fontWeight: 'bold' }}>{item.title}</h5>
                  <p className="small text-muted mb-0">{item.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-5 text-center text-white" style={{ background: `linear-gradient(45deg, ${blue}, #001f40)` }}>
        <Container>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="display-5 fw-bold mb-5">Do You Want to Become a Part of Milan Education?</h2>
            <p className="lead mb-5 mx-auto" style={{ maxWidth: '800px' }}>
             Speak to our counseling team today and give your career a new direction. Your future is just one click away.</p>
            <Button 
              size="lg" 
              style={{ 
                backgroundColor: orange, 
                border: 'none', 
                padding: '15px 40px', 
                fontWeight: 'bold', 
                borderRadius: '50px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
              }}
            >
              Contact Us Now 📞
            </Button>
          </motion.div>
        </Container>
      </section>

    </div>
  );
};

export default AboutUs;