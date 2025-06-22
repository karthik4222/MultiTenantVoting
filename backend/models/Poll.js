const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ 
    text: { type: String, required: true },
    votes: { type: Number, default: 0 }
  }],
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
  // Add other fields as needed
});

module.exports = mongoose.model('Poll', pollSchema);