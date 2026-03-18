import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Row, Col, Card, Form, Button, Spinner, Toast, ToastContainer
} from "react-bootstrap";

const AdminEvents = () => {
  const API_URL = "https://collegemilan-backend-2.onrender.com";

  // Admin token from localStorage (change as per your auth)
  const ADMIN_TOKEN = localStorage.getItem("adminToken") || "";

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [banner, setBanner] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const showToast = (message, type = "success") => setToast({ show: true, message, type });

  // =========================
  // 🔹 Fetch events & banner
  // =========================
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/events?type=event`, {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch events error:", err.response || err);
      showToast("Failed to load events", "danger");
    }
  };

  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/events?type=banner`, {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` }
      });
      setBanner(res.data[0]?.imageUrl || "");
    } catch (err) {
      console.log("No banner found", err.response || err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchBanner();
  }, []);

  // =========================
  // 🔹 Add/Edit Event
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!imageFile && !editId)) return showToast("Title & Image required!", "danger");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", "event");
    if (imageFile) formData.append("image", imageFile);

    console.log("Submitting event FormData:");
    for (let pair of formData.entries()) console.log(pair[0], pair[1]);

    setLoading(true);
    try {
      if (editId) {
        await axios.put(`${API_URL}/api/admin/events/${editId}`, formData, {
          headers: { Authorization: `Bearer ${ADMIN_TOKEN}` }
        });
        showToast("Event updated!");
      } else {
        await axios.post(`${API_URL}/api/admin/events`, formData, {
          headers: { Authorization: `Bearer ${ADMIN_TOKEN}` }
        });
        showToast("Event added!");
      }
      setTitle(""); setImageFile(null); setEditId(null);
      fetchEvents();
    } catch (err) {
      console.error("Event POST error:", err.response || err);
      showToast("Error occurred while saving event", "danger");
    } finally { setLoading(false); }
  };

  // =========================
  // 🔹 Banner Upload
  // =========================
  const handleBannerUpload = async () => {
    if (!bannerFile) return showToast("Select banner first", "danger");

    const formData = new FormData();
    formData.append("image", bannerFile);
    formData.append("type", "banner");
    formData.append("title", "Banner");

    console.log("Submitting banner FormData:");
    for (let pair of formData.entries()) console.log(pair[0], pair[1]);

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/admin/events`, formData, {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` }
      });
      showToast("Banner updated!");
      fetchBanner();
    } catch (err) {
      console.error("Banner upload error:", err.response || err);
      showToast("Banner upload failed", "danger");
    } finally { setLoading(false); }
  };

  // =========================
  // 🔹 Edit & Delete
  // =========================
  const handleEdit = (ev) => {
    setTitle(ev.title);
    setEditId(ev._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` }
      });
      showToast("Deleted!", "danger");
      fetchEvents();
    } catch (err) {
      console.error("Delete error:", err.response || err);
      showToast("Delete failed", "danger");
    }
  };

  // =========================
  // 🔹 Render
  // =========================
  return (
    <Container fluid className="p-4 position-relative">
      <ToastContainer position="top-end" className="p-3">
        <Toast show={toast.show} onClose={() => setToast({ ...toast, show: false })} delay={3000} autohide bg={toast.type}>
          <Toast.Body className="text-white fw-bold">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <h3 className="fw-bold mb-4">Manage Events</h3>

      {/* Banner */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Events Banner</Card.Title>
          <Form.Control type="file" onChange={(e) => setBannerFile(e.target.files[0])} />
          {banner && <img src={`${API_URL}/${banner}`} className="mt-3 rounded" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />}
          <Button className="mt-3" onClick={handleBannerUpload} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Upload Banner"}
          </Button>
        </Card.Body>
      </Card>

      {/* Event Form */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Control placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-3" />
              </Col>
              <Col md={6}>
                <Form.Control type="file" onChange={(e) => setImageFile(e.target.files[0])} />
              </Col>
            </Row>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : editId ? "Update" : "Add Event"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Events List */}
      <Row>
        {events.map(ev => (
          <Col md={4} key={ev._id}>
            <Card className="mb-4 shadow-sm">
              <Card.Img src={`${API_URL}/${ev.imageUrl}`} />
              <Card.Body>
                <Card.Title>{ev.title}</Card.Title>
                <Button size="sm" variant="warning" onClick={() => handleEdit(ev)}>Edit</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleDelete(ev._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminEvents;