import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";

const AdminAboutUs = () => {
  const [about, setAbout] = useState({
    bannerImage: "",
    story: {
      smallTitle: "",
      mainTitle: "",
      description1: "",
      description2: "",
      description3: "",
      image: "",
      since: "",
    },
    mission: { title: "", description: "" },
    vision: { title: "", description: "" },
  });

  // Image upload loading state
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/admin/about")
      .then((res) => {
        if (res.data) setAbout(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle Normal Text Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  // Handle Story Text Changes
  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setAbout({
      ...about,
      story: {
        ...about.story,
        [name]: value,
      },
    });
  };

  // ==========================================
  // IMAGE UPLOAD HANDLER (NEW LOGIC)
  // ==========================================
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // Backend me multer ko 'image' key chahiye hoti h normally

    setUploading(true);
    try {
      // NOTE: Backend developer ko bol kar ek POST API banwani hogi '/api/admin/upload'
      // Jo image save kare aur uska URL return kare.
      const res = await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/admin/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const uploadedUrl = res.data.imageUrl; 
      if (fieldName === "bannerImage") {
        setAbout({ ...about, bannerImage: uploadedUrl });
      } else if (fieldName === "storyImage") {
        setAbout({ ...about, story: { ...about.story, image: uploadedUrl } });
      }

      alert("Image uploaded successfully! Please click 'Save Changes' to update.");
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle Final Save
  const handleSave = async () => {
    try {
      await axios.put("https://collegemilan-backend-2.onrender.com/api/admin/about", about);
      alert("About page updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update About page.");
    }
  };

  return (
    <Container fluid className="p-4">
      <h3 className="mb-4 fw-bold">About Page Settings</h3>

      <Row>
        {/* Banner Section */}
        <Col md={12}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Banner Section</Card.Title>

              <Form.Group className="mb-3">
                <Form.Label>Upload Banner Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "bannerImage")}
                  disabled={uploading}
                />
                {/* Image Preview */}
                {about.bannerImage && (
                  <div className="mt-3">
                    <p className="text-muted small mb-1">Current Banner:</p>
                    <img
                      src={about.bannerImage}
                      alt="Banner Preview"
                      style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Story Section */}
        <Col md={12}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Story Section</Card.Title>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Small Title</Form.Label>
                    <Form.Control type="text" name="smallTitle" value={about.story.smallTitle} onChange={handleStoryChange} />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Main Title</Form.Label>
                    <Form.Control type="text" name="mainTitle" value={about.story.mainTitle} onChange={handleStoryChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description 1</Form.Label>
                <Form.Control as="textarea" rows={3} name="description1" value={about.story.description1} onChange={handleStoryChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description 2</Form.Label>
                <Form.Control as="textarea" rows={3} name="description2" value={about.story.description2} onChange={handleStoryChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description 3</Form.Label>
                <Form.Control as="textarea" rows={3} name="description3" value={about.story.description3} onChange={handleStoryChange} />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Story Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "storyImage")}
                      disabled={uploading}
                    />
                    {/* Image Preview */}
                    {about.story.image && (
                      <div className="mt-3">
                        <p className="text-muted small mb-1">Current Story Image:</p>
                        <img
                          src={about.story.image}
                          alt="Story Preview"
                          style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }}
                        />
                      </div>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Since Text</Form.Label>
                    <Form.Control type="text" name="since" value={about.story.since} onChange={handleStoryChange} />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Mission */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Mission</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Mission Title</Form.Label>
                <Form.Control
                  type="text"
                  value={about.mission.title}
                  onChange={(e) => setAbout({ ...about, mission: { ...about.mission, title: e.target.value } })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mission Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={about.mission.description}
                  onChange={(e) => setAbout({ ...about, mission: { ...about.mission, description: e.target.value } })}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Vision */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Vision</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Vision Title</Form.Label>
                <Form.Control
                  type="text"
                  value={about.vision.title}
                  onChange={(e) => setAbout({ ...about, vision: { ...about.vision, title: e.target.value } })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Vision Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={about.vision.description}
                  onChange={(e) => setAbout({ ...about, vision: { ...about.vision, description: e.target.value } })}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-end mt-2 mb-5">
        <Button variant="primary" size="lg" onClick={handleSave} disabled={uploading}>
          {uploading ? <Spinner animation="border" size="sm" /> : "Save Changes"}
        </Button>
      </div>
    </Container>
  );
};

export default AdminAboutUs;