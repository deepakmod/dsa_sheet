const express = require('express');
const router = express.Router();
const { createTopic, getAllTopics } = require('../controllers/topicController');

router.route('/').post(createTopic).get(getAllTopics);

module.exports = router;