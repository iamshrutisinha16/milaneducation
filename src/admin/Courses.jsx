import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [universities, setUniversities] = useState([]); // Naya state University ke liye

  // State mein 'name' ki jagah 'course_name' aur 'university' add kiya gaya hai
  const [formData, setFormData] = useState({
    course_name: "", 
    university: "",  
    qualification: "",
    duration: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch Courses (with Error Handling)
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/courses`, { headers });
      setCourses(res.data);
    } catch (error) {
      console.error("Courses fetch error:", error);
    }
  };

  // Fetch Qualifications
  const fetchQualifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/qualifications`, { headers });
      setQualifications(res.data);
    } catch (error) {
      console.error("Qualifications fetch error:", error);
    }
  };

  // Fetch Universities (Naya function taaki dropdown mein universities dikhein)
  const fetchUniversities = async () => {
    try {
      // Dhyan de: Agar backend pe university ka route kuch aur hai, toh yahan update kar lena
      const res = await axios.get(`${API_BASE_URL}/api/admin/universities`, { headers });
      setUniversities(res.data);
    } catch (error) {
      console.error("Universities fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchQualifications();
    fetchUniversities(); // Ise call karna zaroori hai
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/api/admin/courses/${editingId}`,
          formData,
          { headers }
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/api/admin/courses`,
          formData, // Ab yeh completely backend ke format se match karega
          { headers }
        );
      }

      // Reset form properly
      setFormData({ course_name: "", university: "", qualification: "", duration: "" });
      setEditingId(null);
      fetchCourses();
      alert(editingId ? "Course updated successfully!" : "Course added successfully!");

    } catch (error) {
      console.error("Save error:", error.response?.data || error.message);
      alert("Error: Data save nahi hua. Validation check karein.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/courses/${id}`, { headers });
      fetchCourses();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting course");
    }
  };

  // Edit (Populating correct fields)
  const handleEdit = (course) => {
    setFormData({
      course_name: course.course_name || course.name, // Agar backend 'name' de raha ho purane data ke liye
      university: course.university?._id || course.university, // University ID fetch karna
      qualification: course.qualification?._id || course.qualification,
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

          {/* Course Name Input */}
          <div className="col-md-3">
            <input
              type="text"
              name="course_name" // 'name' se badal kar 'course_name' kar diya
              placeholder="Course Name"
              className="form-control"
              value={formData.course_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* NEW: University Dropdown */}
          <div className="col-md-3">
            <select
              name="university"
              className="form-control"
              value={formData.university}
              onChange={handleChange}
              required
            >
              <option value="">Select University</option>
              {universities?.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} {/* Assuming university schema has 'name' */}
                </option>
              ))}
            </select>
          </div>

          {/* Qualification Dropdown */}
          <div className="col-md-2">
            <select
              name="qualification"
              className="form-control"
              value={formData.qualification}
              onChange={handleChange}
              required
            >
              <option value="">Qualification</option>
              {qualifications?.map((q) => (
                <option key={q._id} value={q._id}>
                  {q.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Input */}
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

          {/* Submit Button */}
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
          {courses?.map((course) => (
            <tr key={course._id}>
              <td>{course.course_name || course.name}</td>
              <td>{course.university?.name || "N/A"}</td> {/* Naya Column */}
              <td>{course.qualification?.name || "N/A"}</td>
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