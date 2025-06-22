const Tenant = require('../models/tenant');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Register a new tenant
exports.registerTenant = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Check if username already exists
    const existingTenant = await Tenant.findOne({ username });
    if (existingTenant) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a unique tenant_id (optional, can use uuid or just rely on _id)
    const tenant_id = uuidv4();
    // Create and save the tenant
    const tenant = new Tenant({
      username,
      password: hashedPassword,
      tenant_id,
      name
    });
    await tenant.save();
    res.status(201).json({ message: 'Tenant registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
