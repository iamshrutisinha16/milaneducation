import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Plus, Edit2, Trash2, X, CheckCircle } from "lucide-react"; 

const CampusAdmin = () => {
  const [campuses, setCampuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampus, setCurrentCampus] = useState({ name: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Constants
  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";
  const token = localStorage.getItem("adminToken");

  // Auth Headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 1. Fetch all campuses
  const fetchCampuses = async () => {
    try {
      // API URL fix kiya aur headers add kiye
      const res = await axios.get(`${API_BASE_URL}/api/admin/campuses`, config);
      setCampuses(res.data);
    } catch (err) {
      console.error("Error fetching campuses:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  // 2. Add or Update Campus
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        // PUT Request with Base URL and Headers
        await axios.put(`${API_BASE_URL}/api/admin/campuses/${currentCampus._id}`, currentCampus, config);
      } else {
        // POST Request with Base URL and Headers
        await axios.post(`${API_BASE_URL}/api/admin/campuses`, currentCampus, config);
      }
      fetchCampuses();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed!");
    }
    setLoading(false);
  };

  // 3. Delete Campus
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campus?")) {
      try {
        // DELETE Request with Base URL and Headers
        await axios.delete(`${API_BASE_URL}/api/admin/campuses/${id}`, config);
        fetchCampuses();
      } catch (err) {
        alert("Error deleting campus");
      }
    }
  };

  const openModal = (campus = { name: "" }, edit = false) => {
    setCurrentCampus(campus);
    setIsEdit(edit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCampus({ name: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        
        {/* Header Area */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Campus Management</h2>
            <p className="text-gray-500 text-sm">Manage all active campuses from here</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-md active:scale-95"
          >
            <Plus size={18} /> Add New Campus
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Campus Name</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campuses.map((campus) => (
                <tr key={campus._id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-700">{campus.name}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button 
                      onClick={() => openModal(campus, true)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(campus._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {campuses.length === 0 && (
                <tr>
                  <td colSpan="2" className="px-6 py-8 text-center text-gray-400 italic">No campuses found. Add one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL / POPUP --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEdit ? "Edit Campus Details" : "Add New Campus"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={22} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Campus Name</label>
                <input 
                  type="text" 
                  value={currentCampus.name}
                  onChange={(e) => setCurrentCampus({...currentCampus, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. School of Art and Architecture"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center gap-2"
                >
                  {loading ? "Processing..." : isEdit ? "Update Campus" : "Save Campus"}
                  {!loading && <CheckCircle size={18} />}
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