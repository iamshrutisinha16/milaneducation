import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ✅ Backend ke hisaab se correct URL
        const res = await axios.get("/api/events");
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          console.error("Invalid data format:", res.data);
          setError("Failed to load events.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 🔹 Loading State
  if (loading) {
    return (
      <Container className="py-5 mt-4 text-center">
        <h4>Loading events...</h4>
      </Container>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <Container className="py-5 mt-4 text-center">
        <h4>{error}</h4>
      </Container>
    );
  }

  // 🔹 No events
  if (!events.length) {
    return (
      <Container className="py-5 mt-4 text-center">
        <h4>No events found</h4>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-4">
      <Row className="g-4">
        {events.map(item => (
          <Col lg={4} md={6} key={item._id || Math.random()}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="premium-event-card">
                <div className="event-img-container">
                  {item.image ? (
                    // ✅ Backend image path ke hisaab se
                    <Card.Img
                      variant="top"
                      src={item.image.startsWith("/uploads/") ? item.image : `/uploads/${item.image}`}
                      alt={item.title || "Event"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ height: "200px", backgroundColor: "#ddd" }}>No Image</div>
                  )}
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="event-text-main">{item.title || "Untitled Event"}</Card.Title>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventsPage;

/*import React from 'react'; 
import { Container, Row, Col, Card } from 'react-bootstrap'; 
import { motion } from 'framer-motion';
 const EventsPage = () => {
const eventData = [ { id: 1, 
title: "Green Youth Icon Award 2024 felicitation ceremony.",
 image: "/assets/event1.jpeg", },
  { id: 2, title: "Excellence in Education Award nomination meeting.", 
    image: "/assets/event2.jpeg", },
     { id: 3, title: "Industry experts podcast interview session.", 
        image: "/assets/event3.jpeg", }, 
        { id: 4, title: "Student interaction session at Global International Campus.", 
            image: "/assets/event4.jpeg", }, 
            { id: 5,
                 title: "Career guidance and placement discussion.",
                  image: "/assets/event5.jpeg", },
     { id: 6,
         title: "Podcast discussion with students and faculty.", 
         image: "/assets/update1.jpeg", },
          { id: 5,
             title: "Career planning and placement strategy discussion session.",
              image: "/assets/update5.jpeg", }, { id: 6,
                 title: "Milan Education Summit 2024 – Celebrating student achievements.",
                  image: "/assets/event6.jpeg", }, { id: 7, 
                    title: "Interactive guidance session with Global International Campus students.", 
                    image: "/assets/update4.jpeg", }, { id: 8,
                         title: "Leadership interaction and mentorship session with students.", 
                         image: "/assets/update6.jpeg", }, { id: 9, 
                            title: "Academic discussion and career roadmap briefing.",
                             image: "/assets/update7.jpeg", }, { id: 10,
                                 title: "Institutional visit and student engagement program.",
                                  image: "/assets/update8.jpeg", }, { id: 11,
                                     title: "Media interaction at Chhattisgarh News studio during education summit coverage.", 
                                     image: "/assets/event7.jpeg", }, { id: 12, 
                                        title: "Participation in principals and counselors meet at Milan Education Summit.", 
                                        image: "/assets/event8.jpeg", }, { id: 13,
                                             title: "Milan Education Summit 2024 organized with support from industry partners.",
                                              image: "/assets/event9.jpeg", }, { id: 14,
                                                 title: "Career guidance seminar conducted for students at the summit.", 
                                                 image: "/assets/event10.jpeg", }, { id: 15,
                                                     title: "Student interaction session during Milan Education Summit 2024.",
                                                      image: "/assets/event6.jpeg",
                                                     } ];
                                                      return ( <div className="events-main-wrapper">
                                                 
                                                         <section className="premium-banner">
                                                             <div className="banner-overlay"></div> 
                                                             <motion.div initial={{ opacity: 0, scale: 0.9 }} 
                                                             animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} 
                                                             className="banner-content-box" > 
                                                             <h1 className="banner-title">Events &
                                                                 <span className="highlight-orange">Updates</span></h1>
                                                                  <div className="title-line"></div>
                                                                   <p className="banner-subtitle">Stay connected with the latest news, awards, and milestones of College Milan.</p> 
                                                                   </motion.div> 
                                                                   </section> 
                                                                   <Container className="py-5 mt-4"> 
                                                                    <Row className="g-4"> 
                                                                        {eventData.map((item) => ( <Col lg={4} md={6} key={item.id}> 
                                                                        <motion.div initial={{ opacity: 0, y: 50 }} 
                                                                        whileInView={{ opacity: 1, y: 0 }}
                                                                         viewport={{ once: true }} transition={{ duration: 0.5 }} > 
                                                                         <Card className="premium-event-card">
                                                                             <div className="event-img-container"> 
                                                                                <Card.Img variant="top" src={item.image} alt="Event" /> 
                                                                                </div>
                                                                                 <Card.Body className="p-4"> 
                                                                                    <Card.Title className="event-text-main">
                                                                                         {item.title} </Card.Title> 
                                                                                         </Card.Body>
                                                                                          </Card> 
                                                                                          </motion.div> 
                                                                                          </Col>
                                                                                           ))}
                                                                                            </Row>
                                                                                             </Container> 
                                                                                             
                                                                                              <div className="floating-badge">Milan Updates</div> </div>
                                                                                               ); 
                                                                                              }; 
                                     export default EventsPage;*/