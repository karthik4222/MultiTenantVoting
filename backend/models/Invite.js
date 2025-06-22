const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // Optional: auto-delete after 7 days
});

module.exports = mongoose.model('Invite', inviteSchema);