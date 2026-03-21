import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required");
    
    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    try {
      if (editEventId) {
        await axios.put(`/api/events/${editEventId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Event updated successfully!");
      } else {
        await axios.post("/api/events", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Event added successfully!");
      }
      fetchEvents();
      setTitle("");
      setImage(null);
      setEditEventId(null);
      setShowModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`/api/events/${id}`);
      toast.success("Event deleted!");
      fetchEvents();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed!");
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setEditEventId(event._id);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <ToastContainer />
      <h2 className="mb-4">Admin Events Panel</h2>

      <Button variant="primary" onClick={() => setShowModal(true)}>Add New Event</Button>

      <Row className="mt-4 g-4">
        {events.map(e => (
          <Col md={4} key={e._id}>
            <Card>
              <Card.Img variant="top" src={e.image} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{e.title}</Card.Title>
                <Button variant="warning" size="sm" onClick={() => handleEdit(e)} className="me-2">Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(e._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Add/Edit */}
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
    </Container>
  );
};

export default AdminEvents;