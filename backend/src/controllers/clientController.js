const User = require('../models/User');
const ClientConfig = require('../models/ClientConfig');
const bcrypt = require('bcrypt'); 
const crypto = require('crypto');
const Log = require('../models/Log');
const Alert = require('../models/Alert');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.user.id}).select('-password');
    if (!user) return res.status(404).json({ error: 'No user found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile details', details: err.message });
  }
};

exports.getApiKey = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('apiKey');
    console.log(user);
    if (!user) return res.status(404).json({ error: 'No user found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch details', details: err.message });
  }
};

exports.setApiKey = async (req, res) => {
  try {
    const apiKey = crypto.randomBytes(24).toString('hex');
    const updateData = { apiKey };

    const updatedClient = await User.findByIdAndUpdate(
      req.user.id, // from auth middleware
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'X-Api-Key updated successfully',
    });
  } catch (err) {
    console.error('Error updating X-Api-Key:', err);
    res.status(500).json({ message: 'Server error' });
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

    const updatedClient = await User.findByIdAndUpdate(
      req.user.id, // from auth middleware
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('name email');

    res.json({
      message: 'Settings updated successfully',
      client: updatedClient,
    });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getConfig = async (req, res) => {
  try {
    const userId = req.user.id;
    const config = await ClientConfig.findOne({ userId });
    if (!config) return res.status(404).json({ error: 'No config found' });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch config', details: err.message });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const config = await ClientConfig.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    res.json({ message: 'Configuration updated', config });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update config', details: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    await ClientConfig.deleteOne({ userId });
    await User.deleteOne({ _id: userId });
    res.json({ message: 'Account and config deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed', details: err.message });
  }
};

// GET /logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find({clientId: req.user.id}).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

// GET /alerts
exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({clientId: req.user.id}).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

exports.getLogStats = async (req, res) => {
  try {
    const clientId = req.user.id;

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Total logs for client
    const totalLogs = await Log.countDocuments({ clientId });

    // Logs today for client
    const logsToday = await Log.countDocuments({
      clientId,
      createdAt: { $gte: today },
    });

    // Unique IPs for client
    const uniqueIPs = await Log.distinct("ip", { clientId }).then(ips => ips.length);

    // Logs per day (last 7 days)
    const logsPerDay = await Log.aggregate([
      {
        $match: {
          clientId: req.user._id,
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Logs by level for client
    const logsByLevel = await Log.aggregate([
      { $match: { clientId: req.user._id } },
      {
        $group: {
          _id: "$level",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      logsPerDay,
      logsByLevel,
      totalLogs,
      logsToday,
      uniqueIPs,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
