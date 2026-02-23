import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [universities, setUniversities] = useState([]);

  const [formData, setFormData] = useState({
    course_name: "",
    university: "",
    qualification: "",
    duration: "",
  });

  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = { Authorization: `Bearer ${token}` };

  // Fetch data
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/courses`, { headers });
      setCourses(res.data);
    } catch (err) {
      console.error("Courses fetch error:", err);
    }
  };

  const fetchQualifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/qualifications`, { headers });
      setQualifications(res.data);
    } catch (err) {
      console.error("Qualifications fetch error:", err);
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/universities`, { headers });
      setUniversities(res.data);
    } catch (err) {
      console.error("Universities fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchQualifications();
    fetchUniversities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation for required fields
    if (!formData.course_name || !formData.university || !formData.qualification) {
      alert("Course Name, University, and Qualification are required!");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/courses/${editingId}`, formData, { headers });
        alert("Course updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/courses`, formData, { headers });
        alert("Course added successfully!");
      }

      setFormData({ course_name: "", university: "", qualification: "", duration: "" });
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error: Check validation and try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/courses/${id}`, { headers });
      fetchCourses();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting course");
    }
  };

  const handleEdit = (course) => {
    setFormData({
      course_name: course.course_name || "",
      university: course.university?._id || "",
      qualification: course.qualification?._id || "",
      duration: course.duration || "",
    });
    setEditingId(course._id);
  };

  return (
    <div>
      <h3 className="mb-4">Manage Courses</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              name="course_name"
              placeholder="Course Name"
              className="form-control"
              value={formData.course_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <select
              name="university"
              className="form-control"
              value={formData.university}
              onChange={handleChange}
              required
            >
              <option value="">Select University</option>
              {universities.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
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

          <div className="col-md-2">
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              className="form-control"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              {editingId ? "Update" : "Add Course"}
            </button>
          </div>
        </div>
      </form>

      {/* Table */}
      <table className="table table-bordered table-hover mt-4">
        <thead className="table-light">
          <tr>
            <th>Course Name</th>
            <th>University</th>
            <th>Qualification</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.course_name}</td>
              <td>{course.university?.name || "N/A"}</td>
              <td>{course.qualification?.name || "N/A"}</td>
              <td>{course.duration || "N/A"}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(course)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course._id)}>
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