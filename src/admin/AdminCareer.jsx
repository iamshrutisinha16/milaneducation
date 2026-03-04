import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";

const AdminCareer = () => {
  const [careers, setCareers] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    qualification: "",
    career: "",
    steps: [""],
  });

  const [deleteId, setDeleteId] = useState(null);

  const baseURL = "https://collegemilan-backend-2.onrender.com/api";

  // Fetch careers
  const fetchCareers = () => {
    fetch(`${baseURL}/careers`)
      .then(res => res.json())
      .then(data => setCareers(data));
  };

  // Fetch qualifications
  useEffect(() => {
    fetchCareers();

    fetch(`${baseURL}/qualifications`)
      .then(res => res.json())
      .then(data => setQualifications(data));
  }, []);

  // Open Add Modal
  const handleAdd = () => {
    setEditId(null);
    setFormData({ qualification: "", career: "", steps: [""] });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (career) => {
    setEditId(career._id);
    setFormData({
      qualification: career.qualification,
      career: career.career,
      steps: career.steps || [""],
    });
    setShowModal(true);
  };

  // Save (Add / Update)
  const handleSave = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${baseURL}/careers/${editId}`
      : `${baseURL}/careers`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setShowModal(false);
    fetchCareers();
  };

  // Delete
  const handleDelete = async () => {
    await fetch(`${baseURL}/careers/${deleteId}`, {
      method: "DELETE",
    });

    setShowDelete(false);
    fetchCareers();
  };

  // Handle Step Change
  const handleStepChange = (index, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };

  const addStepField = () => {
    setFormData({ ...formData, steps: [...formData.steps, ""] });
  };

  const removeStepField = (index) => {
    const updatedSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: updatedSteps });
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Manage Careers</h3>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleAdd}>+ Add Career</Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Qualification</th>
            <th>Career</th>
            <th>Steps</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((item) => (
            <tr key={item._id}>
              <td>{item.qualification}</td>
              <td>{item.career}</td>
              <td>{item.steps?.length || 0} Steps</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setDeleteId(item._id);
                    setShowDelete(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add / Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Career" : "Add Career"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Select
                value={formData.qualification}
                onChange={(e) =>
                  setFormData({ ...formData, qualification: e.target.value })
                }
              >
                <option value="">Select Qualification</option>
                {qualifications.map((q) => (
                  <option key={q._id} value={q.name}>
                    {q.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Career Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.career}
                onChange={(e) =>
                  setFormData({ ...formData, career: e.target.value })
                }
              />
            </Form.Group>

            <Form.Label>Career Steps</Form.Label>
            {formData.steps.map((step, index) => (
              <Row key={index} className="mb-2">
                <Col md={10}>
                  <Form.Control
                    type="text"
                    value={step}
                    onChange={(e) =>
                      handleStepChange(index, e.target.value)
                    }
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeStepField(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}

            <Button variant="secondary" size="sm" onClick={addStepField}>
              + Add Step
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editId ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Career</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this career?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminCareer;