const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // or use 'email'
  password: { type: String, required: true }, // store hashed password!
  tenant_id: { type: String, required: true, unique: true }, // Changed to String and added unique constraint
  name: { type: String, required: true },
  // Add other fields as needed
});

module.exports = mongoose.model('Tenant', tenantSchema);