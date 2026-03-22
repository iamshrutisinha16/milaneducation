import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";

const AboutUs = () => {
  const orange = "#FF8C00";
  const blue = "#003366";

  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/admin/about")
      .then((res) => {
        setAbout(res.data);
      })
      .catch((err) => console.log("Failed to load About data", err));
  }, []);

  if (!about) return <div className="text-center py-5 mt-5">Loading...</div>;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#fff" }}>
      
      {/* 1. BANNER SECTION (Fixed: Dynamic Background Image) */}
      <section
         style={{
    position: "relative",
    height: "93vh",
    // Check karein ki URL Cloudinary ka hai ya local path ka
    backgroundImage: `url('${
      about.bannerImage?.startsWith("http")
        ? about.bannerImage
        : `https://collegemilan-backend-2.onrender.com/${about.bannerImage?.startsWith('/') ? about.bannerImage.substring(1) : about.bannerImage}`
    }')`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    paddingTop: "80px",
  }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
          }}
        />
      </section>

      {/* STORY SECTION */}
      <Container className="py-5 my-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <h6 style={{ color: orange, fontWeight: "bold", letterSpacing: "2px" }}>
                {about.story?.smallTitle}
              </h6>

              <h2
                className="fw-bold mb-4 text-start"
                style={{
                  color: blue,
                  fontSize: "2.3rem",
                  lineHeight: "1.3",
                  letterSpacing: "1px",
                }}
              >
                {about.story?.mainTitle}
              </h2>

              <p className="text-muted">{about.story?.description1}</p>
              <p className="text-muted">{about.story?.description2}</p>
              <p className="text-muted">{about.story?.description3}</p>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div style={{ position: "relative" }}>
                
               {/* 2. STORY IMAGE */}
<img
  src={
    about.story?.image?.startsWith("http")
      ? about.story.image
      : `https://collegemilan-backend-2.onrender.com/${about.story?.image?.startsWith('/') ? about.story.image.substring(1) : about.story?.image}`
  }
  alt="Milan Team"
  className="img-fluid rounded-5 shadow-lg"
/>
                
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "-20px",
                    backgroundColor: orange,
                    color: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {/* 3. SINCE TEXT (Fixed: Dynamic Since Text) */}
                  {about.story?.since || "Since 2015"} 
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* STATS (Fixed: Added check to prevent map errors) */}
      {about.stats && about.stats.length > 0 && (
        <section className="py-5" style={{ backgroundColor: blue, color: "white" }}>
          <Container>
            <Row className="text-center">
              {about.stats.map((stat, index) => (
                <Col md={3} sm={6} key={index} className="mb-4">
                  <div style={{ fontSize: "2.5rem" }}>{stat.icon}</div>
                  <h1 className="fw-bold mt-2" style={{ color: orange, fontSize: "3.2rem" }}>
                    {stat.number}
                  </h1>
                  <p className="text-uppercase fw-bold small">{stat.label}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* MISSION / VISION */}
      <Container className="py-5 my-5">
        <Row className="g-4 justify-content-center">
          <Col md={6}>
            <Card
              className="h-100 p-4 p-md-5 border-0 shadow-lg rounded-4 d-flex flex-column justify-content-center"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <h3 className="fw-bold mb-3 text-center text-md-start" style={{ color: blue, fontSize: "1.9rem" }}>
                {about.mission?.title}
              </h3>
              <p className="text-muted mb-0" style={{ lineHeight: "1.7", fontSize: "1rem", textAlign: "justify" }}>
                {about.mission?.description}
              </p>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              className="h-100 p-4 p-md-5 border-0 shadow-lg rounded-4 d-flex flex-column justify-content-center"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <h3 className="fw-bold mb-3 text-center text-md-start" style={{ color: blue, fontSize: "1.9rem" }}>
                {about.vision?.title}
              </h3>
              <p className="text-muted mb-0" style={{ lineHeight: "1.7", fontSize: "1rem", textAlign: "justify" }}>
                {about.vision?.description}
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* VALUES (Fixed: Added check to prevent map errors) */}
      {about.values && about.values.length > 0 && (
        <section className="py-5" style={{ backgroundColor: "#f1f4f9" }}>
          <Container>
            <Row>
              {about.values.map((item, i) => (
                <Col lg={3} md={6} key={i} className="mb-4">
                  <div className="p-4 bg-white rounded-4 shadow-sm text-center">
                    <div style={{ fontSize: "3rem" }}>{item.icon}</div>
                    <h5 style={{ color: blue, fontWeight: "bold" }}>{item.title}</h5>
                    <p className="small text-muted">{item.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-5"
        style={{
          background: `linear-gradient(45deg, ${blue}, #001f40)`,
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <Container className="px-3">
          <h2 className="fw-bold mb-3" style={{ fontSize: "2.5rem", lineHeight: "1.2", color: "white" }}>
            {about.ctaTitle || "Contact Us"}
          </h2>

          <p className="lead mb-4 mx-auto" style={{ maxWidth: "700px", lineHeight: "1.6", fontSize: "1.1rem" }}>
            {about.ctaDesc || "Reach out to us for more information."}
          </p>

          <Link to="/contactus" style={{ textDecoration: "none" }}>
            <Button
              size="lg"
              style={{
                backgroundColor: orange,
                border: "none",
                padding: "12px 36px",
                fontWeight: "600",
                borderRadius: "50px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              Contact Us Now 📞
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
