const { v4: uuidv4 } = require('uuid');
const Invite = require('../models/Invite');

// Create a new invite (for authenticated tenants only)
exports.createInvite = async (req, res) => {
  try {
    const token = uuidv4();
    const invite = new Invite({ token, tenant: req.tenant._id });
    await invite.save();
    res.json({ inviteLink: `${token}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
