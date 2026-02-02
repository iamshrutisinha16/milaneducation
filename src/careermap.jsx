import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const CareerMap = () => {
  const orange = "#f47920";
  const blue = "#003366";

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div style={{
      paddingTop: '100px', 
      paddingBottom: '50px',
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.85)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',     
    }}>
      <Container>
        <Row className="justify-content-center w-100 m-0">
          <Col lg={7} md={9} sm={12} className="text-center">
            
            {/* --- TYPEWRITER HEADING --- */}
            <div className="mb-4" style={{ minHeight: '120px' }}> 
              <h1 className="display-5 fw-bold text-white">
                <Typewriter
                  options={{
                    strings: [ 'Let us know something about yourself', 'Career Map','Apna Sahi Rasta Chunein'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </h1>
            </div>

            {/* --- CENTRAL CARD --- */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(15px)',
                borderRadius: '25px',
                padding: '40px 30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
              }}
            >
              <Form>
                <div className="mb-4 text-start">
                  <label className="text-white mb-2 fw-bold ms-1">Tell Me Your Current Qualification</label>
                  <Form.Control 
                    type="text" 
                    placeholder="E.g. 10th, 12th, Graduate..." 
                    className="py-3 px-4"
                    style={{ borderRadius: '15px', border: 'none', fontSize: '1rem' }}
                  />
                </div>

                <div className="mb-4 text-start">
                  <label className="text-white mb-2 fw-bold ms-1">Write here, What do you want to become</label>
                  <Form.Select 
                    className="py-3 px-4"
                    style={{ borderRadius: '15px', border: 'none', fontSize: '1rem' }}
                  >
                    <option>Select Your Dream Career</option>
                    <option>Software Engineer</option>
                    <option>Data Scientist</option>
                    <option>Doctor / Medical</option>
                    <option>Business / MBA</option>
                  </Form.Select>
                </div>

                <p style={{ color: orange, fontWeight: '600' }} className="mb-4">
                  Get Your Career Path in One Click
                </p>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    className="w-100 py-3 shadow"
                    style={{
                      backgroundColor: orange,
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    GET CAREER MAP 🚀
                  </Button>
                </motion.div>
              </Form>
            </motion.div>

            {/* --- BOTTOM TAGS --- */}
            <div className="mt-5 d-flex justify-content-center gap-2 flex-wrap">
              {['100% Free', 'Expert Guidance', 'Instant Result'].map((tag, i) => (
                <span key={i} className="badge p-2 px-3" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    border: `1px solid ${orange}`,
                    borderRadius: '20px',
                    color: '#fff'
                  }}>
                  {tag}
                </span>
              ))}
            </div>

          </Col>
        </Row>
      </Container>

      <style>
        {`
          .Typewriter__wrapper {
            color: ${orange};
          }
          .form-control:focus, .form-select:focus {
            box-shadow: 0 0 15px ${orange};
            outline: none;
          }
          body { overflow-x: hidden; }
        `}
      </style>
    </div>
  );
};

export default CareerMap;