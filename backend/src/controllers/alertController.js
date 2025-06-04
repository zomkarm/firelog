// src/controllers/alertController.js
const Alert = require('../models/Alert');

// POST /alerts
exports.createAlert = async (req, res) => {
  try {
    const alert = new Alert({...req.body,clientId: req.clientId});
    const saved = await alert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create alert', details: err.message });
  }
};

// GET /alerts
exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({clientId: req.clientId}).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

// GET /alerts/:id
exports.getAlertById = async (req, res) => {
  try {
    const alert = await Alert.find({_id:req.params.id,clientId: req.clientId});
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching alert' });
  }
};

// DELETE /alerts/:id (acknowledge)
exports.deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json({ message: 'Alert acknowledged and removed.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete alert' });
  }
};
