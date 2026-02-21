import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminQualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";

  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // ✅ Fetch All
  const fetchQualifications = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/admin/qualifications`,
        { headers }
      );
      setQualifications(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/api/admin/qualifications/${editingId}`,
          { name },
          { headers }
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/api/admin/qualifications`,
          { name },
          { headers }
        );
      }

      setName("");
      setEditingId(null);
      fetchQualifications();
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this qualification?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/qualifications/${id}`,
        { headers }
      );
      fetchQualifications();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // ✅ Edit
  const handleEdit = (qualification) => {
    setName(qualification.name);
    setEditingId(qualification._id);
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="mb-4">Manage Qualifications</h3>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Enter qualification name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>

          {editingId && (
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Created On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {qualifications.length > 0 ? (
              qualifications.map((q) => (
                <tr key={q._id}>
                  <td>{q.name}</td>
                  <td>
                    {new Date(q.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(q)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(q._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No qualifications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQualifications;