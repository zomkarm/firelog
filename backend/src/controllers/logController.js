// src/controllers/logController.js
const Log = require('../models/Log');
const Alert = require('../models/Alert');
const axios = require('axios');
const User = require('../models/User');
const { sendEmailAlert } = require('../utils/emailSender');
const { sendSlackAlert } = require('../utils/slackSender');

// POST /logs
exports.createLog = async (req, res) => {
    try {
      const { ip, userId, type, message, severity } = req.body;
  
      // Save the log
      const newLog = new Log({ ip, clientId: req.clientId, type, message, severity });
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
            clientId:req.clientId,
            ip,
            reason: 'Repeated failed attempts',
            severity: 'high',
          });
        }
      }
      // === SEND ALERTS IF ENABLED ===
    if (process.env.ALERTS === "Enable" && alertGenerated) {
      // Get client alert config (if exists)
      const client = await User.findById(req.clientId);

      const senderEmail = client?.alertEmail || process.env.EMAIL_USER;

      // Send Email
      await sendEmailAlert(
        senderEmail,
        '🚨 FireLog Alert: Repeated Attempts',
        alertMessage
      );

      // Send Slack Alert
      await sendSlackAlert(alertMessage);
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
    const logs = await Log.find({clientId: req.clientId}).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

// GET /logs/:id
exports.getLogById = async (req, res) => {
  try {
    const log = await Log.find({_id:req.params.id,clientId: req.clientId});
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching log' });
  }
};

// GET /logs/ip/:ip
exports.getLogsByIp = async (req, res) => {
  try {
    const logs = await Log.find({ ip: req.params.ip,clientId: req.clientId });
    if (!logs) return res.status(404).json({ error: 'Logs not found' });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching logs by IP' });
  }
};
