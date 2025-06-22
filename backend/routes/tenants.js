const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const pollController = require('../controllers/PollController');
const tenantAuthenticate = require('../middleware/tenantAuth');


// Register a new tenant
router.post('/register', tenantController.registerTenant);
//post a poll
router.post('/createpoll', tenantAuthenticate, pollController.createPoll);
//tenant can see poll results
router.get('/poll/:pollId/results', tenantAuthenticate, pollController.getPollResults)
//edit a poll
//delete a poll
//manage your users...for now,just go small...look at your users...talk to them,send mails 
module.exports = router;
