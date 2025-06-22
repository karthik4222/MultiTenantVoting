const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // or use 'email'
  password: { type: String, required: true }, // store hashed password!
  name: { type: String, required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },// References Tenant's tenant_id field
  // ...other fields...
});

module.exports = mongoose.model('User', userSchema);