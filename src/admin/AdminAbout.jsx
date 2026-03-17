import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Container, Row, Col, Card, Form, Button, Spinner, Toast, ToastContainer 
} from "react-bootstrap";

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
    values: [], 
  });

  const [uploading, setUploading] = useState(false);
  
  // 🔥 NAYA: Toast (Popup) State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // 'success' ya 'danger'
  });

  // Helper function to show popup
  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/admin/about") 
      .then((res) => {
        if (res.data) {
          setAbout({ ...res.data, values: res.data.values || [] });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setAbout({
      ...about,
      story: { ...about.story, [name]: value },
    });
  };

  // ==========================================
  // VALUES (DYNAMIC ARRAY) HANDLERS
  // ==========================================
  const handleValueChange = (index, e) => {
    const { name, value } = e.target;
    const newValues = [...about.values]; 
    newValues[index][name] = value; 
    setAbout({ ...about, values: newValues }); 
  };

  const addValue = () => {
    setAbout({
      ...about,
      values: [...about.values, { icon: "", title: "", desc: "" }]
    });
  };

  const removeValue = (index) => {
    const newValues = about.values.filter((_, i) => i !== index);
    setAbout({ ...about, values: newValues });
  };

  // ==========================================
  // IMAGE UPLOAD HANDLER
  // ==========================================
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
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

      // 🔥 Premium Success Popup
      showNotification("Image uploaded! Click 'Save All Changes' to update.", "success");
    } catch (error) {
      console.error("Image upload failed", error);
      // 🔥 Premium Error Popup
      showNotification("Failed to upload image. Please try again.", "danger");
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // SAVE CHANGES
  // ==========================================
  const handleSave = async () => {
    try {
      await axios.put("https://collegemilan-backend-2.onrender.com/api/admin/about", about);
      // 🔥 Premium Success Popup
      showNotification("About page updated successfully! 🎉", "success");
    } catch (error) {
      console.error("Update failed", error);
      // 🔥 Premium Error Popup
      showNotification("Failed to update About page.", "danger");
    }
  };

  return (
    <Container fluid className="p-4 position-relative">
      
      {/* 🔥 MODERN FLOATING POPUP (TOAST) 🔥 */}
      <ToastContainer 
        position="top-end" 
        className="p-3" 
        style={{ zIndex: 9999, position: "fixed", top: "20px", right: "20px" }}
      >
        <Toast 
          onClose={() => setToast({ ...toast, show: false })} 
          show={toast.show} 
          delay={3500} 
          autohide 
          bg={toast.type}
        >
          <Toast.Header closeButton={false} className="d-flex justify-content-between">
            <strong className="me-auto text-dark">
              {toast.type === "success" ? "✅ Success" : "❌ Error"}
            </strong>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setToast({ ...toast, show: false })}
            ></button>
          </Toast.Header>
          <Toast.Body className="text-white fw-bold">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>


      <h3 className="mb-4 fw-bold">About Page Settings</h3>

      <Row>
        {/* Banner Section */}
        <Col md={12}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Banner Section</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Upload Banner Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "bannerImage")}
                  disabled={uploading}
                />
                {about.bannerImage && (
                  <div className="mt-3">
                    <img src={about.bannerImage} alt="Banner Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
                  </div>
                )}
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Story Section */}
        <Col md={12}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Story Section</Card.Title>
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
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "storyImage")} disabled={uploading} />
                    {about.story.image && (
                      <div className="mt-3">
                        <img src={about.story.image} alt="Story" style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "8px" }} />
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

        {/* Mission & Vision */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Mission</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Mission Title</Form.Label>
                <Form.Control type="text" value={about.mission.title} onChange={(e) => setAbout({ ...about, mission: { ...about.mission, title: e.target.value } })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mission Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={about.mission.description} onChange={(e) => setAbout({ ...about, mission: { ...about.mission, description: e.target.value } })} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Vision</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Vision Title</Form.Label>
                <Form.Control type="text" value={about.vision.title} onChange={(e) => setAbout({ ...about, vision: { ...about.vision, title: e.target.value } })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Vision Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={about.vision.description} onChange={(e) => setAbout({ ...about, vision: { ...about.vision, description: e.target.value } })} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* VALUES SECTION */}
        <Col md={12}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="mb-0 text-primary fw-bold">Core Values (Icons & Text)</Card.Title>
                <Button variant="success" size="sm" onClick={addValue} className="fw-bold shadow-sm">
                  + Add New Value
                </Button>
              </div>

              {about.values && about.values.length > 0 ? (
                about.values.map((val, index) => (
                  <div key={index} className="p-4 mb-3 border rounded bg-light position-relative shadow-sm">
                    
                    {/* Delete Button */}
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      className="position-absolute fw-bold" 
                      style={{ top: "15px", right: "15px" }}
                      onClick={() => removeValue(index)}
                    >
                      Delete
                    </Button>

                    <Row className="mt-2">
                      <Col md={2}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Icon (Emoji/Text)</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="icon" 
                            value={val.icon} 
                            placeholder="e.g. 🌟"
                            onChange={(e) => handleValueChange(index, e)} 
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Title</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="title" 
                            value={val.title} 
                            placeholder="e.g. Integrity"
                            onChange={(e) => handleValueChange(index, e)} 
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">Description</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={2} 
                            name="desc" 
                            value={val.desc} 
                            placeholder="Short description..."
                            onChange={(e) => handleValueChange(index, e)} 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 border rounded bg-light text-muted">
                  No values added yet. Click "+ Add New Value" to start.
                </div>
              )}

            </Card.Body>
          </Card>
        </Col>

      </Row>

      <div className="text-end mt-3 mb-5">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleSave} 
          disabled={uploading}
          className="fw-bold px-5 shadow"
        >
          {uploading ? <Spinner animation="border" size="sm" /> : "Save All Changes"}
        </Button>
      </div>
    </Container>
  );
};

export default AdminAboutUs;

/*import React, { useEffect, useState } from "react";
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
    values: [], // 🔥 NAYA ADD KIYA: Values array
    // ctaTitle: "", // Agar CTA bhi chahiye toh yahan add kar sakte hain
    // ctaDesc: ""
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


  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); 

    setUploading(true);
    try {
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

export default AdminAboutUs;*/