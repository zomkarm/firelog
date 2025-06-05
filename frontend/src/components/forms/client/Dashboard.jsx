import { useEffect, useState } from 'react';
import { BarChart,Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [mostFrequentLevel,setMostFrequentLevel] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/logs/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(res);
        const data = await res.json();
        setStats(data);
        setMostFrequentLevel(stats.logsByLevel.reduce((prev, current) =>
          current.count > prev.count ? current : prev
        )._id);
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
      <h2 className="text-2xl font-semibold">Welcome, Client</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

      {stats ? (
  <>
      <div className="bg-purple-100 p-5 rounded-xl shadow flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-600">Total Logs</p>
          <h3 className="text-2xl font-bold text-purple-900">{stats.totalLogs}</h3>
        </div>
        <div className="text-purple-500 text-3xl">📈</div>
      </div>
      <div className="bg-orange-100 p-5 rounded-xl shadow flex items-center justify-between">
        <div>
          <p className="text-sm text-orange-600">Logs Today</p>
          <h3 className="text-2xl font-bold text-orange-900">{stats.logsToday}</h3>
        </div>
        <div className="text-orange-500 text-3xl">🕒</div>
      </div>
      <div className="bg-green-100 p-5 rounded-xl shadow flex items-center justify-between">
        <div>
          <p className="text-sm text-green-600">Unique IPs</p>
          <h3 className="text-2xl font-bold text-green-900">{stats.uniqueIPs}</h3>
        </div>
        <div className="text-green-500 text-3xl">🌐</div>
      </div>
      <div className="bg-blue-100 p-5 rounded-xl shadow flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-600">Top Log Level</p>
          <h3 className="text-2xl font-bold text-green-900">{mostFrequentLevel}</h3>
        </div>
        <div className="text-green-500 text-3xl">⚠️</div>
      </div>
    
    


        {/* Chart 1: Logs per day */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold mb-2">Logs per Day (7 Days)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={stats.logsPerDay}>
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
                data={stats.logsByLevel}
                dataKey="count"
                nameKey="_id"
                outerRadius={60}
                label
              >
                {stats.logsByLevel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={levelColors[entry._id] || "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Logs by level */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-sm font-semibold mb-2">Logs per Day</h4>
          <ResponsiveContainer width="100%" height={150}>
                <LineChart data={stats.logsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#7E22CE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
        </div>

</> ) : (<p className="text-gray-500">Loading dashboard data...</p> )}
        
      </div>
    </div>
  );
}
