const User = require('../models/User');
const Log = require('../models/Log');
const Alert = require('../models/Alert');
const bcrypt = require('bcrypt'); 

// Users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

// Logs
exports.getAllLogs = async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 });
  res.json(logs);
};

exports.getLogById = async (req, res) => {
  const log = await Log.findById(req.params.id);
  if (!log) return res.status(404).json({ error: 'Log not found' });
  res.json(log);
};

exports.deleteLogById = async (req, res) => {
  await Log.findByIdAndDelete(req.params.id);
  res.json({ message: 'Log deleted' });
};

// Alerts
exports.getAllAlerts = async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json(alerts);
};

exports.getAlertById = async (req, res) => {
  const alert = await Alert.findById(req.params.id);
  if (!alert) return res.status(404).json({ error: 'Alert not found' });
  res.json(alert);
};

exports.deleteAlertById = async (req, res) => {
  await Alert.findByIdAndDelete(req.params.id);
  res.json({ message: 'Alert acknowledged/removed' });
};

// Stats already done earlier:
exports.getLogsCount = async (req, res) => {
  const stats = await Log.aggregate([
    {
      $group: {
        _id: '$severity',
        count: { $sum: 1 }
      }
    }
  ]);
  res.json(stats);
};

exports.getTopUsers = async (req, res) => {
  const topUsers = await Log.aggregate([
    {
      $group: {
        _id: '$userId',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.json(topUsers);
};

exports.getIPHeatmap = async (req, res) => {
  const heatmap = await Log.aggregate([
    {
      $group: {
        _id: '$ip',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 50 }
  ]);
  res.json(heatmap);
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.user.id}).select('-password');
    if (!user) return res.status(404).json({ error: 'No user found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile details', details: err.message });
  }
};

exports.setProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updateData = { name, email };

    // Optional password update
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedAdmin = await User.findByIdAndUpdate(
      req.user.id, // from auth middleware
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('name email');

    res.json({
      message: 'Settings updated successfully',
      admin: updatedAdmin,
    });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};