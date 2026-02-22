import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // 🔥 Fetch Enquiries
  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      let url = `${API_BASE_URL}/api/admin/enquiries`;
      if (statusFilter) {
        url += `?status=${statusFilter}`;
      }

      const res = await axios.get(url, { headers });
      setEnquiries(res.data.data);

    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  // 🔥 Update Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/enquiries/${id}/status`,
        { status: newStatus },
        { headers }
      );

      fetchEnquiries();
    } catch (error) {
      console.error("Status Update Error:", error);
    }
  };

  // 🔥 Update Remarks
  const handleRemarksChange = async (id, remarks) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/enquiries/${id}/remarks`,
        { remarks },
        { headers }
      );

    } catch (error) {
      console.error("Remarks Update Error:", error);
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/enquiries/${id}`,
        { headers }
      );

      fetchEnquiries();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Enquiry Management</h3>

      {/* 🔎 Status Filter */}
      <div className="mb-3">
        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Converted">Converted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Course</th>
              <th>University</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq._id}>
                <td>{enq.fullName}</td>
                <td>{enq.mobile}</td>
                <td>{enq.course?.name}</td>
                <td>{enq.university?.name}</td>

                {/* Status Dropdown */}
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={enq.status}
                    onChange={(e) =>
                      handleStatusChange(enq._id, e.target.value)
                    }
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Converted">Converted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>

                {/* Remarks */}
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    defaultValue={enq.remarks || ""}
                    onBlur={(e) =>
                      handleRemarksChange(enq._id, e.target.value)
                    }
                    placeholder="Add note..."
                  />
                </td>

                <td>
                  {new Date(enq.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(enq._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {enquiries.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEnquiries;