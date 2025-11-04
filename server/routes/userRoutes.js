const express = require('express');
const router = express.Router();
const { toggleProblemStatus } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/progress/toggle/:problemId', authMiddleware, toggleProblemStatus);

module.exports = router;