// middleware/apiKeyMiddleware.js
const User = require('../models/User'); // assuming API key is stored with User
const crypto = require('crypto');

const apiKeyMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
      return res.status(401).json({ message: 'API key missing' });
    }

    const user = await User.findOne({ apiKey: apiKey });
    if (!user) {
      return res.status(403).json({ message: 'Invalid API key' });
    }

    // Attach client ID to request for downstream use
    req.clientId = user._id;

    next();
  } catch (err) {
    console.error('API key validation failed', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = apiKeyMiddleware;
