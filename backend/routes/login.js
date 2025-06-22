const express = require('express');
const router = express.Router();
const loginController = require('../controllers/Login');

// Unified login for user or tenant
router.post('/login', loginController.login);

module.exports = router;
