import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminQualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch All
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

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price) {
      Swal.fire("Error", "Name and Price are required", "error");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/api/admin/qualifications/${editingId}`,
          { name, price, oldPrice },
          { headers }
        );

        Swal.fire("Updated!", "Qualification updated successfully", "success");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/admin/qualifications`,
          { name, price, oldPrice },
          { headers }
        );

        Swal.fire("Added!", "Qualification added successfully", "success");
      }

      setName("");
      setPrice("");
      setOldPrice("");
      setEditingId(null);
      fetchQualifications();
    } catch (error) {
      console.error("Submit Error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This qualification will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/qualifications/${id}`,
        { headers }
      );

      Swal.fire("Deleted!", "Qualification deleted successfully", "success");
      fetchQualifications();
    } catch (error) {
      console.error("Delete Error:", error);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // Edit
  const handleEdit = (qualification) => {
    setName(qualification.name);
    setPrice(qualification.price || "");
    setOldPrice(qualification.oldPrice || "");
    setEditingId(qualification._id);
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Qualifications</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Qualification Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Old Price"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
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
                  setPrice("");
                  setOldPrice("");
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
              <th>Price</th>
              <th>Old Price</th>
              <th>Created On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {qualifications.length > 0 ? (
              qualifications.map((q) => (
                <tr key={q._id}>
                  <td>{q.name}</td>
                  <td>₹ {q.price}</td>
                  <td>₹ {q.oldPrice || "-"}</td>
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
                <td colSpan="5" className="text-center">
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