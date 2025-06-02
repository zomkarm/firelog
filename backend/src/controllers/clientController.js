const ClientConfig = require('../models/ClientConfig');

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
