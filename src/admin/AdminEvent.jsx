import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('https://collegemilan-backend-2.onrender.com/api/admin/events');
      setEvents(res.data);
    } catch (err) {
      showNotification('Failed to fetch events', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if(image) formData.append('image', image);

    try {
      if(editId){
        await axios.put(`https://collegemilan-backend-2.onrender.com/api/admin/events/${editId}`, formData);
        showNotification('Event updated successfully!', 'success');
        setEditId(null);
      } else {
        await axios.post('https://collegemilan-backend-2.onrender.com/api/admin/events', formData);
        showNotification('Event added successfully!', 'success');
      }

      setTitle(''); 
      setDescription(''); 
      setImage(null);
      fetchEvents();
    } catch (err) {
      showNotification('Something went wrong!', 'error');
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setEditId(event._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this event?')){
      try {
        await axios.delete(`https://collegemilan-backend-2.onrender.com/api/admin/events/${id}`);
        showNotification('Event deleted successfully!', 'error');
        fetchEvents();
      } catch (err) {
        showNotification('Failed to delete event', 'error');
      }
    }
  };

  return (
    <div className="admin-panel">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <h2>Admin Panel - Events</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={e=>setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={e=>setDescription(e.target.value)} 
          required 
        />
        <input type="file" onChange={e=>setImage(e.target.files[0])} />
        <button type="submit" className={editId ? 'update-btn' : 'add-btn'}>
          {editId ? "Update" : "Add"} Event
        </button>
      </form>

      <hr />

      <h3>Event List</h3>
      <div className="event-list">
        {events.map(ev => (
          <div key={ev._id} className="event-card">
            {ev.imageUrl && <img src={`https://collegemilan-backend-2.onrender.com/${ev.imageUrl}`} alt={ev.title} />}
            <div className="event-info">
              <h4>{ev.title}</h4>
              <p>{ev.description}</p>
            </div>
            <div className="event-actions">
              <button onClick={()=>handleEdit(ev)} className="edit-btn">Edit</button>
              <button onClick={()=>handleDelete(ev._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;