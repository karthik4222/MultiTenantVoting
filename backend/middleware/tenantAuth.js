const jwt = require('jsonwebtoken');
const Tenant = require('../models/tenant');

// Middleware to authenticate tenants only
module.exports = async function tenantAuthenticate(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the tenant by ID from the token payload
    const tenant = await Tenant.findById(decoded.id);
    if (!tenant) {
      return res.status(401).json({ message: 'Invalid tenant token' });
    }
    req.tenant = tenant;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
