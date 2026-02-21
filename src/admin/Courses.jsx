import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [formData, setFormData] = useState({
    course_name: "",
    university: "",
    status: "active",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("adminToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCourses = async () => {
    const res = await axios.get(
      "https://collegemilan-backend-2.onrender.com/api/courses/admin/all",
      config
    );
    setCourses(res.data);
  };

  const fetchUniversities = async () => {
    const res = await axios.get(
      "https://collegemilan-backend-2.onrender.com/api/university"
    );
    setUniversities(res.data);
  };

  useEffect(() => {
    fetchCourses();
    fetchUniversities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(
        `https://collegemilan-backend-2.onrender.com/api/courses/admin/${editId}`,
        formData,
        config
      );
    } else {
      await axios.post(
        "https://collegemilan-backend-2.onrender.com/api/courses/admin",
        formData,
        config
      );
    }

    setFormData({ course_name: "", university: "", status: "active" });
    setEditId(null);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await axios.delete(
        `https://collegemilan-backend-2.onrender.com/api/courses/admin/${id}`,
        config
      );
      fetchCourses();
    }
  };

  const handleEdit = (course) => {
    setFormData({
      course_name: course.course_name,
      university: course.university._id,
      status: course.status,
    });
    setEditId(course._id);
  };

  return (
    <div className="admin-course-page">
      <div className="admin-course-header">
        <h2>Course Management</h2>
        <p>Manage all courses from here</p>
      </div>

      <div className="admin-course-card">
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              name="course_name"
              value={formData.course_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>University</label>
            <select
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
            >
              <option value="">Select University</option>
              {universities.map((uni) => (
                <option key={uni._id} value={uni._id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button className="primary-btn">
            {editId ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>University</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.course_name}</td>
                <td>{course.university?.name}</td>
                <td>
                  <span className={`status ${course.status}`}>
                    {course.status}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
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
    </div>
  );
};

export default AdminCourses;