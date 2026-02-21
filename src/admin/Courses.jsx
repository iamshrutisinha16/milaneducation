import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    duration: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch Courses
  const fetchCourses = async () => {
    const res = await axios.get(
      `${API_BASE_URL}/api/admin/courses`,
      { headers }
    );
    setCourses(res.data);
  };

  // Fetch Qualifications for Dropdown
  const fetchQualifications = async () => {
    const res = await axios.get(
      `${API_BASE_URL}/api/admin/qualifications`,
      { headers }
    );
    setQualifications(res.data);
  };

  useEffect(() => {
    fetchCourses();
    fetchQualifications();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(
        `${API_BASE_URL}/api/admin/courses/${editingId}`,
        formData,
        { headers }
      );
    } else {
      await axios.post(
        `${API_BASE_URL}/api/admin/courses`,
        formData,
        { headers }
      );
    }

    setFormData({ name: "", qualification: "", duration: "" });
    setEditingId(null);
    fetchCourses();
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await axios.delete(
      `${API_BASE_URL}/api/admin/courses/${id}`,
      { headers }
    );

    fetchCourses();
  };

  // Edit
  const handleEdit = (course) => {
    setFormData({
      name: course.name,
      qualification: course.qualification._id,
      duration: course.duration,
    });
    setEditingId(course._id);
  };

  return (
    <div>
      <h3 className="mb-4">Manage Courses</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">

          <div className="col-md-4">
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <select
              name="qualification"
              className="form-control"
              value={formData.qualification}
              onChange={handleChange}
              required
            >
              <option value="">Select Qualification</option>
              {qualifications.map((q) => (
                <option key={q._id} value={q._id}>
                  {q.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g. 3 Years)"
              className="form-control"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-1">
            <button className="btn btn-primary w-100">
              {editingId ? "✔" : "+"}
            </button>
          </div>

        </div>
      </form>

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Qualification</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.qualification?.name}</td>
              <td>{course.duration}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCourses;