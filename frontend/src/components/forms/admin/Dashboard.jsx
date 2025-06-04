import { useEffect, useState } from 'react';
import { BarChart,AreaChart,Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const [logsPerDay, setLogsPerDay] = useState([]);
  const [logsByLevel, setLogsByLevel] = useState([]);

  const data = [
    { date: 'Jun 01', logs: 40 },
    { date: 'Jun 02', logs: 75 },
    { date: 'Jun 03', logs: 60 },
    { date: 'Jun 04', logs: 90 },
    { date: 'Jun 05', logs: 50 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/logs/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setLogsPerDay(data.logsPerDay);
        setLogsByLevel(data.logsByLevel);
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };

    fetchStats();
  }, []);

  const levelColors = {
    info: "#34D399",
    warning: "#FBBF24",
    error: "#EF4444",
  };

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <h2 className="text-2xl font-semibold">Welcome, Admin</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Chart 1: Logs per day */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold mb-2">Logs per Day (7 Days)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={logsPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#7E22CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Logs by level */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold mb-2">Logs by Level</h4>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={logsByLevel}
                dataKey="count"
                nameKey="_id"
                outerRadius={60}
                label
              >
                {logsByLevel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={levelColors[entry._id] || "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
