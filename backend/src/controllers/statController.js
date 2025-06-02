const Log = require('../models/Log');

// GET /stats/logs-count
exports.getLogStats = async (req, res) => {
    try {
      const total = await Log.countDocuments();
  
      const severityGroups = await Log.aggregate([
        { $group: { _id: "$severity", count: { $sum: 1 } } }
      ]);
  
      const bySeverity = {};
      severityGroups.forEach(item => {
        bySeverity[item._id] = item.count;
      });
  
      res.json({ total, bySeverity });
    } catch (err) {
      res.status(500).json({ error: "Failed to get log stats", details: err.message });
    }
  };
  
  // GET /stats/top-users
exports.getTopSuspiciousUsers = async (req, res) => {
    try {
      const topIps = await Log.aggregate([
        { $match: { severity: { $in: ["medium", "high"] } } },
        { $group: { _id: "$ip", logCount: { $sum: 1 } } },
        { $sort: { logCount: -1 } },
        { $limit: 5 }
      ]);
  
      res.json(topIps.map(entry => ({
        ip: entry._id,
        logCount: entry.logCount
      })));
    } catch (err) {
      res.status(500).json({ error: "Failed to get top users", details: err.message });
    }
  };

  // GET /stats/ip-heatmap
exports.getIpHeatmapData = async (req, res) => {
    try {
      const ipCounts = await Log.aggregate([
        { $group: { _id: "$ip", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
  
      res.json(ipCounts.map(entry => ({
        ip: entry._id,
        count: entry.count
      })));
    } catch (err) {
      res.status(500).json({ error: "Failed to get IP heatmap data", details: err.message });
    }
  };
  