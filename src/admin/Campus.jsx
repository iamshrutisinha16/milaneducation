import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const CampusAdmin = () => {
  const [campuses, setCampuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampus, setCurrentCampus] = useState({ name: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  
  // 1. TOKEN CHECK (Check karein ki baaki pages 'token' use kar rahe hain ya 'adminToken')
  const getToken = () => localStorage.getItem("adminToken") || localStorage.getItem("token");

  const fetchCampuses = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    setFetching(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/campuses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampuses(res.data);
    } catch (err) {
      console.error("Fetch Error Status:", err.response?.status);
      if(err.response?.status === 403) {
         console.error("403 Forbidden: Check backend route path or token expiration");
      }
    } finally {
      setFetching(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => { fetchCampuses(); }, [fetchCampuses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return alert("Session expired, please login again");

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = getToken(); // FIXED: Token was missing here
    if (window.confirm("Are you sure you want to delete this campus?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/admin/campuses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCampuses();
      } catch (err) { 
        alert(err.response?.data?.message || "Delete failed"); 
      }
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
      <div className="card shadow border-0 rounded-4">
        
        {/* HEADER */}
        <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center border-bottom">
          <div>
            <h4 className="fw-bold mb-1 text-dark">Campus Management</h4>
            <p className="text-muted small mb-0">Add, edit or remove university campuses</p>
          </div>
          <button onClick={() => openModal()} className="btn btn-primary px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2">
            <Plus size={18} /> Add Campus
          </button>
        </div>

        {/* TABLE BODY */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 text-secondary small fw-bold uppercase">CAMPUS NAME</th>
                  <th className="px-4 py-3 text-end text-secondary small fw-bold uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {fetching ? (
                   <tr><td colSpan="2" className="text-center py-5"><Loader2 className="animate-spin mx-auto text-primary" /></td></tr>
                ) : campuses.map((c) => (
                  <tr key={c._id}>
                    <td className="px-4 fw-semibold text-dark">{c.name}</td>
                    <td className="px-4 text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button onClick={() => openModal(c, true)} className="btn btn-outline-primary btn-sm rounded-3 p-2 border-0">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(c._id)} className="btn btn-outline-danger btn-sm rounded-3 p-2 border-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!fetching && campuses.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-5 text-muted">
                      <AlertCircle className="mx-auto mb-2 text-warning" size={32} />
                      <p className="mb-0">No campuses found. Click 'Add Campus' to create one.</p>
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
             style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050, backdropFilter: "blur(5px)" }}>
          <div className="bg-white rounded-4 shadow-lg p-0 w-100 m-3 overflow-hidden" style={{ maxWidth: "480px" }}>
            
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
              <h5 className="fw-bold mb-0">{isEdit ? "Update Campus" : "Add New Campus"}</h5>
              <button onClick={closeModal} className="btn-close shadow-none"></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted mb-2 text-uppercase">Campus Full Name</label>
                <input 
                  type="text" 
                  value={currentCampus.name}
                  onChange={(e) => setCurrentCampus({...currentCampus, name: e.target.value})}
                  className="form-control form-control-lg border shadow-none"
                  placeholder="e.g. School of Art and Architecture"
                  autoFocus
                  required
                />
              </div>

              <div className="d-flex gap-2 pt-2">
                <button type="button" onClick={closeModal} className="btn btn-light flex-grow-1 py-2 fw-semibold">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary flex-grow-1 py-2 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                  {isEdit ? "Update Campus" : "Create Campus"}
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