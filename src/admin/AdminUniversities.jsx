import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",  
  });
  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all Universities
  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/universities`, {
        headers,
      });
      setUniversities(res.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add / Update University
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(
          `${API_BASE_URL}/api/admin/universities/${editingId}`,
          formData,
          { headers }
        );
        alert("University updated successfully!");
      } else {
        // Create
        await axios.post(
          `${API_BASE_URL}/api/admin/universities`,
          formData,
          { headers }
        );
        alert("University added successfully!");
      }

      setFormData({ name: "" }); // Form clear karo
      setEditingId(null);
      fetchUniversities(); // Table refresh karo
    } catch (error) {
      console.error("Error saving university:", error.response?.data || error.message);
      alert("Failed to save University. Check console for details.");
    }
  };

  // Edit Button Click
  const handleEdit = (uni) => {
    setFormData({
      name: uni.name,
    });
    setEditingId(uni._id);
  };

  // Delete University
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this University?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/universities/${id}`, {
        headers,
      });
      alert("University deleted!");
      fetchUniversities();
    } catch (error) {
      console.error("Error deleting university:", error);
      alert("Cannot delete university. Note: Agar isme courses add hain, toh pehle courses delete karne pad sakte hain.");
    }
  };

  return (
    <div>
      <h3 className="mb-4">Manage Universities</h3>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-8">
            <input
              type="text"
              name="name"
              placeholder="Enter University Name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" type="submit">
              {editingId ? "Update University" : "+ Add University"}
            </button>
          </div>
        </div>
      </form>

      {/* Universities Table */}
      <table className="table table-bordered table-hover mt-4">
        <thead className="table-light">
          <tr>
            <th>University Name</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.length > 0 ? (
            universities.map((uni) => (
              <tr key={uni._id}>
                <td>{uni.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(uni)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(uni._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center text-muted">
                No universities found. Please add one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUniversities;