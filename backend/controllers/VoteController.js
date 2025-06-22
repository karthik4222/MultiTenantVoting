const Vote = require('../models/vote');
const Poll = require('../models/poll');

// User votes for a poll
exports.voteForPoll = async (req, res) => {
  try {
    const user = req.user;
    const { pollId, choice } = req.body;
    if (!pollId || !choice) {
      return res.status(400).json({ message: 'Poll ID and choice are required.' });
    }
    // Find the poll and check if it belongs to the user's tenant
    const poll = await Poll.findOne({ _id: pollId, tenant: user.tenant });
    if (!poll) {
      return res.status(403).json({ message: 'You can only vote in your organization\'s polls.' });
    }
    // Check if user already voted (optional, for one vote per poll)
    const existingVote = await Vote.findOne({ poll: pollId, user: user._id });
    if (existingVote) {
      return res.status(409).json({ message: 'You have already voted in this poll.' });
    }
    // Save the vote
    const vote = new Vote({ poll: pollId, user: user._id, choice });
    await vote.save();
    res.status(201).json({ message: 'Vote recorded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
