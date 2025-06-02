// models/ClientConfig.js
const mongoose = require('mongoose');

const clientConfigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  webhookUrl: { type: String },
  alertThresholds: {
    failedLogin: { type: Number, default: 10 },
    rateLimit: { type: Number, default: 100 }
  }
}, { timestamps: true });

module.exports = mongoose.model('ClientConfig', clientConfigSchema);
