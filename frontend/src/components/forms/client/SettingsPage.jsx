import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch current client profile
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/settings/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
        }));
      } catch (err) {
        console.error('Failed to load settings',err);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = { ...formData };
      if (!payload.password || payload.password.trim() === '') {
        delete payload.password; // remove empty password before sending
      }
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      setMessage({ type: 'success', text: 'Settings updated successfully!' });
      setFormData((prev) => ({ ...prev, password: '' })); // clear password field
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded p-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded p-2"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
