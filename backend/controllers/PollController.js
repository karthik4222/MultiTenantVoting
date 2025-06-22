const Poll = require('../models/poll');
const Vote = require('../models/vote'); // Assuming you have a Vote model to track votes

//create poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: 'Question and at least two options are required.' });
    }
    const poll = new Poll({
      question,
      options,
      tenant: req.tenant._id
    });
    await poll.save();
    res.status(201).json({ message: 'Poll created successfully.', poll });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get poll results for a specific poll (tenant only)
exports.getPollResults = async (req, res) => {
  try {
    const tenantId = req.tenant._id;
    const pollId = req.params.pollId;
    // Ensure the poll belongs to the tenant
    const poll = await Poll.findOne({ _id: pollId, tenant: tenantId });
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found or not authorized.' });
    }
    // Get all votes for this poll
    const votes = await Vote.find({ poll: pollId });
    // Tally results by choice
    const results = {};
    votes.forEach(vote => {
      results[vote.choice] = (results[vote.choice] || 0) + 1;
    });
    res.json({ poll: poll.question, options: poll.options, results });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//delete poll
