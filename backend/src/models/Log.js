const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  ip: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'suspicious', 'critical'], default: 'info' },
  message: { type: String, required: true },
  meta: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);
