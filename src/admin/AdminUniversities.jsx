import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    bitlink: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // ================= FETCH UNIVERSITIES =================
  const fetchUniversities = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/admin/universities`,
        { headers }
      );

      // ✅ Important fix (backend structured response)
      setUniversities(res.data.data || []);

    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= ADD / UPDATE UNIVERSITY =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/api/admin/universities/${editingId}`,
          formData,
          { headers }
        );
        Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'University updated successfully!',
  confirmButtonText: 'OK'
});
      } else {
        await axios.post(
          `${API_BASE_URL}/api/admin/universities`,
          formData,
          { headers }
        );
        Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'University added successfully!',
  confirmButtonText: 'OK'
});
      }

      // Reset form
      setFormData({
        name: "",
        state: "",
        bitlink: "",
      });

      setEditingId(null);
      fetchUniversities();

    } catch (error) {
      console.error(
        "Error saving university:",
        error.response?.data || error.message
      );
     Swal.fire({
  icon: 'error',
  title: 'Failed!',
  text: 'Failed to save University.',
  confirmButtonText: 'OK'
});
    }
  };

  // ================= EDIT =================
  const handleEdit = (uni) => {
    setFormData({
      name: uni.name || "",
      state: uni.state || "",
      bitlink: uni.bitlink || "",
    });
    setEditingId(uni._id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this University?"))
      return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/universities/${id}`,
        { headers }
      );
      Swal.fire({
  icon: 'success',
  title: 'Deleted!',
  text: 'University deleted successfully!',
  confirmButtonText: 'OK'
});
      fetchUniversities();
    } catch (error) {
      console.error("Error deleting university:", error);
      Swal.fire({
  icon: 'success',
  title: 'Deleted!',
  text: 'Cannot deleted University!',
  confirmButtonText: 'OK'
});
    }
  };

  return (
    <div>
      <h3 className="mb-4">Manage Universities</h3>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">

          <div className="col-md-4">
            <input
              type="text"
              name="name"
              placeholder="University Name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="state"
              placeholder="State (optional)"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="bitlink"
              placeholder="Admission Bitlink (optional)"
              className="form-control"
              value={formData.bitlink}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              {editingId ? "Update" : "+ Add"}
            </button>
          </div>

        </div>
      </form>

      {/* ================= TABLE ================= */}
      <table className="table table-bordered table-hover mt-4">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Bitlink</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {universities.length > 0 ? (
            universities.map((uni) => (
              <tr key={uni._id}>
                <td>{uni.name}</td>
                <td>{uni.state || "-"}</td>
                <td>
                  {uni.bitlink ? (
                    <a
                      href={uni.bitlink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
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
              <td colSpan="4" className="text-center text-muted">
                No universities found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUniversities;