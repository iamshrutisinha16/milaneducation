import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  // Feedback modal state
  const [feedback, setFeedback] = useState({ show: false, message: "", type: "success" });

  // ✅ showFeedback function pehle declare kiya
  const showFeedback = (message, type = "success") => {
    setFeedback({ show: true, message, type });

    // Auto close 2.5 second me
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, show: false }));
    }, 2500);
  };

  // ✅ Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events"); // backend GET route
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        showFeedback("Invalid response from server", "error");
        setEvents([]);
      }
    } catch (err) {
      console.log(err);
      showFeedback("Failed to fetch events!", "error");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return showFeedback("Title is required!", "error");

    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    try {
      if (editEventId) {
        await axios.put(`/api/events/${editEventId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        showFeedback("Event updated successfully!", "success");
      } else {
        await axios.post("/api/events", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        showFeedback("Event added successfully!", "success");
      }
      fetchEvents();
      setTitle("");
      setImage(null);
      setEditEventId(null);
      setShowModal(false);
    } catch (err) {
      console.log(err);
      showFeedback("Something went wrong!", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`/api/events/${id}`);
      showFeedback("Event deleted!", "success");
      fetchEvents();
    } catch (err) {
      console.log(err);
      showFeedback("Delete failed!", "error");
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title || "");
    setEditEventId(event._id);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Admin Events Panel</h2>

      <Button variant="primary" onClick={() => setShowModal(true)}>Add New Event</Button>

      <Row className="mt-4 g-4">
        {Array.isArray(events) && events.length > 0 ? (
          events.map(e => (
            <Col md={4} key={e._id || Math.random()}>
              <Card>
                {e.image ? (
                  <Card.Img variant="top" src={e.image} style={{ height: "200px", objectFit: "cover" }} />
                ) : (
                  <div style={{ height: "200px", backgroundColor: "#ddd" }}>No Image</div>
                )}
                <Card.Body>
                  <Card.Title>{e.title || "Untitled Event"}</Card.Title>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(e)} className="me-2">Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(e._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center mt-4">No events found</p>
          </Col>
        )}
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editEventId ? "Edit Event" : "Add New Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={e => setImage(e.target.files[0])}
                accept="image/*"
              />
            </Form.Group>

            <Button variant="success" type="submit">{editEventId ? "Update" : "Add Event"}</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Feedback Modal */}
      <Modal show={feedback.show} onHide={() => setFeedback({ ...feedback, show: false })} centered>
        <Modal.Header closeButton>
          <Modal.Title>{feedback.type === "success" ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{feedback.message}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminEvents;