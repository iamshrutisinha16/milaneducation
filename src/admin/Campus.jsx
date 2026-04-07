import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, CheckCircle, AlertCircle } from "lucide-react";

const CampusAdmin = () => {
  const [campuses, setCampuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampus, setCurrentCampus] = useState({ name: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  
  // GET TOKEN SAFELY
  const getToken = () => localStorage.getItem("adminToken");

  const fetchCampuses = async () => {
    const token = getToken();
    if (!token) return console.error("No token found!");

    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/campuses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampuses(res.data);
    } catch (err) {
      console.error("403 Error - Token Issue:", err.response?.status);
    }
  };

  useEffect(() => { fetchCampuses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    setLoading(true);
    try {
      const url = isEdit 
        ? `${API_BASE_URL}/api/admin/campuses/${currentCampus._id}`
        : `${API_BASE_URL}/api/admin/campuses`;
      
      const method = isEdit ? "put" : "post";

      await axios[method](url, currentCampus, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchCampuses();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed!");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this campus?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/admin/campuses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCampuses();
      } catch (err) { alert("Delete failed"); }
    }
  };

  const openModal = (campus = { name: "" }, edit = false) => {
    setCurrentCampus(campus);
    setIsEdit(edit);
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setCurrentCampus({ name: "" }); };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        
        {/* HEADER */}
        <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center border-bottom">
          <div>
            <h4 className="fw-bold mb-0 text-dark">Campus Management</h4>
            <small className="text-muted">Total {campuses.length} campuses found</small>
          </div>
          <button onClick={() => openModal()} className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm">
            <Plus size={18} /> Add Campus
          </button>
        </div>

        {/* TABLE BODY */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="px-4 py-3">Campus Name</th>
                  <th className="px-4 py-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {campuses.map((c) => (
                  <tr key={c._id}>
                    <td className="px-4 fw-medium text-dark">{c.name}</td>
                    <td className="px-4 text-end">
                      <button onClick={() => openModal(c, true)} className="btn btn-sm btn-light text-primary mx-1 rounded-circle p-2 shadow-sm">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-light text-danger mx-1 rounded-circle p-2 shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {campuses.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-5 text-muted">
                      <AlertCircle className="mb-2" /> <br/> No data available. Add a campus.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- PREMIUM MODAL POPUP --- */}
      {isModalOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999, backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 shadow-2xl p-4 w-100 m-3" style={{ maxWidth: "450px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">{isEdit ? "Update Campus" : "Create New Campus"}</h5>
              <button onClick={closeModal} className="btn-close"></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">CAMPUS NAME</label>
                <input 
                  type="text" 
                  value={currentCampus.name}
                  onChange={(e) => setCurrentCampus({...currentCampus, name: e.target.value})}
                  className="form-control form-control-lg border-2"
                  placeholder="Enter campus name..."
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button type="button" onClick={closeModal} className="btn btn-light flex-grow-1 py-2">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary flex-grow-1 py-2 shadow">
                  {loading ? "Processing..." : isEdit ? "Update" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusAdmin;