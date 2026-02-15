import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CareerMap = () => {
  const [careers, setCareers] = useState([]);
  const [qualification, setQualification] = useState('');
  const [dreamCareer, setDreamCareer] = useState('');
  const [careerPath, setCareerPath] = useState([]);

  // Fetch careers from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/careers')
      .then(res => res.json())
      .then(data => {
        setCareers(data);
      })
      .catch(err => console.error(err));
  }, []);

  // Unique qualifications
  const qualifications = [
    ...new Set(careers.map(item => item.qualification))
  ];

  // Filter careers based on selected qualification
  const filteredCareers = careers.filter(
    item => item.qualification === qualification
  );

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!qualification || !dreamCareer) {
      alert("Please select qualification and career");
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/careers/submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qualification, dreamCareer })
        }
      );

      const data = await response.json();

      if (data.steps) {
        setCareerPath(data.steps);
      } else {
        alert(data.message || "No career path found");
        setCareerPath([]);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="career-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="career-title">Career Map</h1>
              <p className="career-subtitle">
                Let us know something about yourself
              </p>

              <Form onSubmit={handleSubmit} className="career-form">
                
                {/* Qualification Dropdown */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Select Your Current Qualification
                  </Form.Label>
                  <Form.Select
                    value={qualification}
                    onChange={(e) => {
                      setQualification(e.target.value);
                      setDreamCareer('');
                    }}
                  >
                    <option value="">Select Qualification</option>
                    {qualifications.map((qual) => (
                      <option key={qual} value={qual}>
                        {qual}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Career Dropdown */}
                <Form.Group className="mb-4">
                  <Form.Label>
                    Select Your Dream Career
                  </Form.Label>
                  <Form.Select
                    value={dreamCareer}
                    onChange={(e) => setDreamCareer(e.target.value)}
                    disabled={!qualification}
                  >
                    <option value="">Select Career</option>
                    {filteredCareers.map((item) => (
                      <option
                        key={`${item.qualification}-${item.career}`}
                        value={item.career}
                      >
                        {item.career}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <p className="career-hint">
                  Get Your Career Path in One Click
                </p>

                <Button type="submit" className="career-btn">
                  Get Career Map
                </Button>
              </Form>

              {/* Career Path Result */}
              {careerPath.length > 0 && (
                <div className="career-path">
                  <h4 className='mb-4'>Your Career Roadmap</h4>
               <div className="timeline">
               {careerPath.map((step, index) => (
                 <div className="timeline-step" key={index}>
                <div className="timeline-number">
                {index + 1}
              </div>
               <div className="timeline-content">
                {step}
               </div>
              </div>
                ))}
               </div>
             </div>
               )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* VIDEO SECTION */}
      <section className="career-video">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">Watch Career Guidance Video</h2>

              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/ysz5S6PUM-U"
                  title="Career Guidance"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CareerMap;
