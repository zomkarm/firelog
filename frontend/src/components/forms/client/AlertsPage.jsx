import React, { useState, useEffect } from 'react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state: example filter by search text (could expand later)
  const [searchText, setSearchText] = useState('');

  // Fetch logs from API
  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/client/alerts`;
      // Optionally, you could append query params for filtering here
      if (searchText.trim()) {
        url += `?search=${encodeURIComponent(searchText.trim())}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when searchText changes
  useEffect(() => {
    fetchAlerts();
  }, [searchText]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Alerts</h2>

      {/* Filter section */}
      <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search alerts..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded flex-1 max-w-md"
        />
        <button
          onClick={fetchAlerts}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Loading, error */}
      {loading && <p>Loading alerts...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Logs Table */}
      {!loading && !error && alerts.length === 0 && <p>No alerts found.</p>}

      {!loading && !error && alerts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">IP Address</th>
                <th className="border px-3 py-2 text-left">Severity</th>
                <th className="border px-3 py-2 text-left">Status</th>
                <th className="border px-3 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{alert.ip}</td>
                  <td className="border px-3 py-2 capitalize">{alert.severity}</td>
                  <td className="border px-3 py-2">{alert.status}</td>
                  <td className="border px-3 py-2">{new Date(alert.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
  }
  