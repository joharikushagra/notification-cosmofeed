// models/notificationLog.js
const mongoose = require('mongoose');

const notificationLogSchema = new mongoose.Schema({
  // user: { type: String, required: true },
  message: { type: String, required: true },
  recipient: { type: String, required: true },
  success: { type: Boolean, required: true },
  channel: {type: String, require: true},
  timestamp: { type: Date, default: Date.now }
});

const NotificationLog = mongoose.model('NotificationLog', notificationLogSchema);

module.exports = NotificationLog;
