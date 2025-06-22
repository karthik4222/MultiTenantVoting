const express = require('express');
const router = express.Router();
const tenantAuthenticate = require('../middleware/tenantAuth');
const inviteController = require('../controllers/CreateInvite');

// POST /api/invites
router.post('/', tenantAuthenticate, inviteController.createInvite);

module.exports = router;