import { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendURL = "https://college-milan-backend.onrender.com/api/admin/settings";

  useEffect(() => {
    axios.get(backendURL)
      .then(res => {
        setSettings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(backendURL, settings);
      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!settings) return <p>No settings found</p>;

  return (
    <div className="p-4">
      <h2 className="mb-4">Admin Panel Settings</h2>

      {/* General */}
      <div className="mb-4">
        <h4>General</h4>
        <input
          type="text"
          placeholder="Site Name"
          value={settings.general.siteName}
          onChange={e => handleChange("general", "siteName", e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="color"
          value={settings.general.primaryColor}
          onChange={e => handleChange("general", "primaryColor", e.target.value)}
          className="mb-2"
        />
        <input
          type="color"
          value={settings.general.secondaryColor}
          onChange={e => handleChange("general", "secondaryColor", e.target.value)}
          className="mb-2"
        />
      </div>

      {/* Admin */}
      <div className="mb-4">
        <h4>Admin</h4>
        <input
          type="email"
          value={settings.admin.email}
          onChange={e => handleChange("admin", "email", e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={e => handleChange("admin", "password", e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
      </div>

      {/* Notifications */}
      <div className="mb-4">
        <h4>Notifications</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications.newUser}
            onChange={e => handleChange("notifications", "newUser", e.target.checked)}
          /> New User Signup
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={settings.notifications.newEnquiry}
            onChange={e => handleChange("notifications", "newEnquiry", e.target.checked)}
          /> New Enquiry
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;