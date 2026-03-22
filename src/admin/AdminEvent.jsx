import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Modal, Spinner } from "react-bootstrap";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, message: "", type: "success" });

  const API_BASE = "https://collegemilan-backend-2.onrender.com";

  const showFeedback = (message, type = "success") => {
    setFeedback({ show: true, message, type });
    setTimeout(() => setFeedback(prev => ({ ...prev, show: false })), 2500);
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/events`);
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        showFeedback("Invalid response from server", "error");
      }
    } catch (err) {
      console.error(err);
      showFeedback("Failed to fetch events!", "error");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Modal close hone par sab reset karne ke liye
  const handleCloseModal = () => {
    setShowModal(false);
    setEditEventId(null);
    setTitle("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return showFeedback("Title is required!", "error");

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    try {
      if (editEventId) {
        await axios.put(`${API_BASE}/api/events/${editEventId}`, formData, { 
          headers: { "Content-Type": "multipart/form-data" } 
        });
        showFeedback("Event updated successfully!", "success");
      } else {
        await axios.post(`${API_BASE}/api/events`, formData, { 
          headers: { "Content-Type": "multipart/form-data" } 
        });
        showFeedback("Event added successfully!", "success");
      }
      fetchEvents();
      handleCloseModal(); // Reset form and close modal
    } catch (err) {
      console.error(err);
      showFeedback(err.response?.data?.message || "Something went wrong!", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${API_BASE}/api/events/${id}`);
      showFeedback("Event deleted!", "success");
      fetchEvents();
    } catch (err) {
      console.error(err);
      showFeedback("Delete failed!", "error");
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title || "");
    setEditEventId(event._id);
    setShowModal(true);
  };

  // Image URL Helper function
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Agar Cloudinary URL hai (http se shuru hota hai)
    if (imagePath.startsWith("http")) return imagePath;
    // Agar local path hai (/uploads/ ya uploads/)
    const cleanPath = imagePath.startsWith("/") ? imagePath.substring(1) : imagePath;
    return `${API_BASE}/${cleanPath}`;
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center fw-bold">Admin Events Panel</h2>
      <div className="text-center mb-4">
        <Button variant="primary" className="px-4 py-2" onClick={() => setShowModal(true)}>
          + Add New Event
        </Button>
      </div>

      <Row className="g-4">
        {events.length > 0 ? events.map(e => (
          <Col md={6} lg={4} key={e._id || Math.random()}>
            <Card className="shadow-sm h-100 border-0">
              <div style={{ height: "220px", overflow: "hidden", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                {e.image ? (
                  <Card.Img
                    src={getImageUrl(e.image)}
                    alt={e.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div className="h-100 bg-light d-flex align-items-center justify-content-center text-muted">
                    No Image Available
                  </div>
                )}
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold fs-5">{e.title || "Untitled Event"}</Card.Title>
                <div className="mt-auto d-flex justify-content-between gap-2 pt-3">
                  <Button variant="outline-warning" className="flex-grow-1" onClick={() => handleEdit(e)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" className="flex-grow-1" onClick={() => handleDelete(e._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )) : (
          <Col className="text-center py-5">
            <p className="text-muted fs-5">No events found. Start by adding one!</p>
          </Col>
        )}
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editEventId ? "✏️ Edit Event" : "➕ Add New Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Event Image</Form.Label>
              <Form.Control
                type="file"
                onChange={e => setImage(e.target.files[0])}
                accept="image/*"
              />
              <small className="text-muted">Upload high-quality images (JPG, PNG, WebP)</small>
            </Form.Group>
            <Button 
              variant="success" 
              type="submit" 
              className="w-100 py-2 mt-2" 
              disabled={submitting}
            >
              {submitting ? <Spinner animation="border" size="sm" /> : (editEventId ? "Update Event" : "Add Event")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Feedback Modal */}
      <Modal show={feedback.show} onHide={() => setFeedback({ ...feedback, show: false })} centered size="sm">
        <Modal.Body className={`text-center py-4 ${feedback.type === "success" ? "text-success" : "text-danger"}`}>
          <h5 className="fw-bold">{feedback.type === "success" ? "✅ Success" : "❌ Error"}</h5>
          <p className="mb-0 text-dark">{feedback.message}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminEvents;