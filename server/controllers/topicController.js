const Topic = require('../models/Topic');

// @route   POST /api/topics
exports.createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ msg: 'Error creating topic', error: err.message });
  }
};

// @route   GET /api/topics
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};  