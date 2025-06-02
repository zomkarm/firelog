// src/controllers/logController.js
const Log = require('../models/Log');
const Alert = require('../models/Alert');
const axios = require('axios');

// POST /logs
exports.createLog = async (req, res) => {
    try {
      const { ip, userId, type, message, severity } = req.body;
  
      // Save the log
      const newLog = new Log({ ip, userId, type, message, severity });
      const savedLog = await newLog.save();
  
      // === ALERT GENERATION LOGIC ===
      const timeWindowStart = new Date(Date.now() - 5 * 60 * 1000); // last 5 min
  
      const logCount = await Log.countDocuments({
        ip,
        type,
        createdAt: { $gte: timeWindowStart }
      });
  
      if (logCount > 10) {
        const existingAlert = await Alert.findOne({
          ip,
          reason: 'Repeated failed attempts',
          createdAt: { $gte: timeWindowStart }
        });
  
        if (!existingAlert) {
          await Alert.create({
            ip,
            reason: 'Repeated failed attempts',
            severity: 'high',
          });
        }
      }
  
      res.status(201).json(savedLog);
    } catch (err) {
      console.error('Error saving log:', err);
      res.status(400).json({ error: 'Failed to save log', details: err.message });
    }
  };
  

// GET /logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

// GET /logs/:id
exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching log' });
  }
};

// GET /logs/ip/:ip
exports.getLogsByIp = async (req, res) => {
  try {
    const logs = await Log.find({ ip: req.params.ip });
    if (!logs) return res.status(404).json({ error: 'Logs not found' });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching logs by IP' });
  }
};
