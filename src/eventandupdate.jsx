import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const EventsPage = () => {
    // Ye tumhara cards ka data hai
    const eventData = [
        {
            id: 1,
            title: "Honored to receive the Green Youth Icon Award 2024!",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Nominated for the Excellence in Education Award by Raghuraaj Foundation.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Live Interview with Industry Experts on our College Milan Podcast.",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Interaction session with students at Global International Campus.",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Discussion on future career maps and placement opportunities.",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Milan Education Summit 2024 - A huge success for our students!",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
        }
    ];

    return (
        <div className="events-main-wrapper">
            {/* 1. Premium Banner Section */}
            <section className="premium-banner">
                <div className="banner-overlay"></div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="banner-content-box"
                >
                    <h1 className="banner-title">Events & <span className="highlight-orange">Updates</span></h1>
                    <div className="title-line"></div>
                    <p className="banner-subtitle">Stay connected with the latest news, awards, and milestones of College Milan.</p>
                </motion.div>
            </section>

            {/* 2. Grid Section (Clean & Minimalist) */}
            <Container className="py-5 mt-4">
                <Row className="g-4">
                    {eventData.map((item) => (
                        <Col lg={4} md={6} key={item.id}>
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="premium-event-card">
                                    <div className="event-img-container">
                                        <Card.Img variant="top" src={item.image} alt="Event" />
                                    </div>
                                    <Card.Body className="p-4">
                                        <Card.Title className="event-text-main">
                                            {item.title}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Floating Contact Badge */}
            <div className="floating-badge">Milan Updates</div>
        </div>
    );
};

export default EventsPage;