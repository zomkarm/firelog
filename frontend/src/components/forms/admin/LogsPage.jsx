import React, { useState, useEffect } from 'react';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state: example filter by search text (could expand later)
  const [searchText, setSearchText] = useState('');

  // Fetch logs from API
  const fetchLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/logs`;
      // Optionally, you could append query params for filtering here
      if (searchText.trim()) {
        url += `?search=${encodeURIComponent(searchText.trim())}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch logs');
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when searchText changes
  useEffect(() => {
    fetchLogs();
  }, [searchText]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Logs</h2>

      {/* Filter section */}
      <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search logs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded flex-1 max-w-md"
        />
        <button
          onClick={fetchLogs}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Loading, error */}
      {loading && <p>Loading logs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Logs Table */}
      {!loading && !error && logs.length === 0 && <p>No logs found.</p>}

      {!loading && !error && logs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Timestamp</th>
                <th className="border px-3 py-2 text-left">IP Address</th>
                <th className="border px-3 py-2 text-left">Level</th>
                <th className="border px-3 py-2 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="border px-3 py-2">{log.ip}</td>
                  <td className="border px-3 py-2 capitalize">{log.level}</td>
                  <td className="border px-3 py-2">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
