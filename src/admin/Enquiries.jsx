import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      let url = `${API_BASE_URL}/api/admin/enquiries`;
      if (statusFilter) {
        url += `?status=${statusFilter}`;
      }

      const res = await axios.get(url, { headers });
      setEnquiries(res.data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  // ✅ Update Status
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

  // ✅ Confirm Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/enquiries/${deleteId}`,
        { headers }
      );
      setDeleteId(null);
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
          <option value="Follow-Up">Follow-Up</option>
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
              <th>City</th>
              <th>State</th>
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
                <td>{enq.course?.name || "-"}</td>
                <td>{enq.university?.name || "-"}</td>
                <td>{enq.city || "-"}</td>
                <td>{enq.state || "-"}</td>

                {/* Status */}
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
                    <option value="Follow-Up">Follow-Up</option>
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
                    onClick={() => setDeleteId(enq._id)}
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
      {deleteId && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this enquiry?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;