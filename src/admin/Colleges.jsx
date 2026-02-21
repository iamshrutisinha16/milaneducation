import React, { useEffect, useState } from "react";
import axios from "axios";

// Correct backend URL
const API_URL = "https://collegemilan-backend-2.onrender.com/api/admin/colleges";

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    state: "",
    website: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  // Admin token
  const token = localStorage.getItem("adminToken");

  // --- READ (Fetch Colleges) ---
  const fetchColleges = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setColleges(res.data);
    } catch (error) {
      console.error("Colleges laane me error:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired! Please login again.");
      }
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // --- CREATE & UPDATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await axios.put(`${API_URL}/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("College Updated Successfully!");
        setEditId(null);
      } else {
        // CREATE
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("New College Added Successfully!");
      }

      // Clear form
      setForm({
        name: "",
        location: "",
        state: "",
        website: "",
        description: "",
      });

      fetchColleges();
    } catch (error) {
      console.error("Save karne me error:", error);
      alert("Error! Check console for details.");
    }
  };

  // --- Edit Button ---
  const handleEdit = (college) => {
    setForm(college);
    setEditId(college._id);
  };

  // --- DELETE ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("College Deleted!");
        fetchColleges();
      } catch (error) {
        console.error("Delete karne me error:", error);
        alert("Delete failed!");
      }
    }
  };

  return (
    <div>
      <h3 className="fw-bold mb-4">College Management</h3>

      {/* --- FORM SECTION --- */}
      <div className="card shadow p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="College Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {editId ? "Update College" : "Add College"}
          </button>
        </form>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="card shadow p-4">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>State</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((college) => (
                <tr key={college._id}>
                  <td>{college.name}</td>
                  <td>{college.location}</td>
                  <td>{college.state}</td>
                  <td>
                    <span className="badge bg-success">
                      {college.status || "Active"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(college)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(college._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {colleges.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No colleges added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollegeManagement;