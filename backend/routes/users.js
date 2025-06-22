const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const registerUserController = require('../controllers/UserController');
const userAuthenticate = require('../middleware/userAuth');
const voteController = require('../controllers/VoteController');

// Register a new user with invite token
router.post('/register', registerUserController.registerUser);
//A user can see all the polls his organisation posted...


// Get all polls for the user's organization (tenant)
router.get('/polls', userAuthenticate, registerUserController.getUserPolls);

//A user can vote for a poll his organisation posted...
router.post('/vote', userAuthenticate, voteController.voteForPoll);
// ...existing or future user routes...

module.exports = router;

