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

  //Fetch Courses
  const fetchCourses = async () => {
    const res = await axios.get(
      "https://collegemilan-backend-2.onrender.com/api/courses/admin/all",
      config
    );
    setCourses(res.data);
  };

  //Fetch Universities (for dropdown)
  const fetchUniversities = async () => {
    const res = await axios.get("https://collegemilan-backend-2.onrender.com/api/university");
    setUniversities(res.data);
  };

  useEffect(() => {
    fetchCourses();
    fetchUniversities();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Submit
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

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(
        `https://collegemilan-backend-2.onrender.com/api/courses/admin/${id}`,
        config
      );
      fetchCourses();
    }
  };

  // Edit
  const handleEdit = (course) => {
    setFormData({
      course_name: course.course_name,
      university: course.university._id,
      status: course.status,
    });
    setEditId(course._id);
  };

  return (
    <div className="admin-course-container">
      <h2>Manage Courses</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="course-form">
        <input
          type="text"
          name="course_name"
          placeholder="Course Name"
          value={formData.course_name}
          onChange={handleChange}
          required
        />

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

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit">
          {editId ? "Update Course" : "Add Course"}
        </button>
      </form>

      {/* TABLE */}
      <table>
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
                <span className={course.status}>
                  {course.status}
                </span>
              </td>
              <td>
                <button onClick={() => handleEdit(course)}>
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
  );
};

export default AdminCourses;