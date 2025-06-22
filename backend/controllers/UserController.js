const User = require('../models/user');
const Invite = require('../models/Invite');
const bcrypt = require('bcrypt');
const Poll = require('../models/poll');
// Register a new user with invite token
exports.registerUser = async (req, res) => {
  try {
    const { username, password, name, token } = req.body;
    if (!username || !password || !name || !token) {
      return res.status(400).json({ message: 'All fields and invite token are required.' });
    }
    // Find and validate invite
    const invite = await Invite.findOne({ token, used: false });
    if (!invite) {
      return res.status(400).json({ message: 'Invalid or used invite token.' });
    }
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create and save the user, associating with the tenant from the invite
    const user = new User({
      username,
      password: hashedPassword,
      name,
      tenant: invite.tenant
    });
    await user.save();
    // Mark invite as used
    invite.used = true;
    await invite.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//retrieves polls posted by a user's tenant(organisation)
exports.getUserPolls = async (req, res) => {
  try {
    // req.user should be set by user authentication middleware
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Find all polls for the user's tenant
    const polls = await Poll.find({ tenant: user.tenant });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
