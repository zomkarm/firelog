const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userId: { type: String }, // optional, if known
  type: { type: String, enum: ['info', 'warning', 'suspicious', 'critical'], default: 'info' },
  message: { type: String, required: true },
  meta: { type: Object }, // optional metadata (e.g., user agent, URL)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);
