const User = require('../models/user');
const Tenant = require('../models/tenant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Unified login for User or Tenant
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    // Try to find user first
    let account = await User.findOne({ username });
    let role = 'user';
    if (!account) {
      // If not found, try tenant
      account = await Tenant.findOne({ username });
      role = 'tenant';
    }
    if (!account) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    // Create JWT
    const token = jwt.sign(
      { id: account._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
