const express = require('express');
const router = express.Router();
const { createProblem, getProblemsByTopic, getAllProblems } = require('../controllers/problemController');

router.post('/', createProblem);
router.get('/', getAllProblems);
router.get('/topic/:topicId', getProblemsByTopic);

module.exports = router;