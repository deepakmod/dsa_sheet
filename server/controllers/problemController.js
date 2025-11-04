const Problem = require('../models/Problem');

// @route   POST /api/problems
exports.createProblem = async (req, res) => {
  try {
    const problemsData = Array.isArray(req.body) ? req.body : [req.body];
    
    const validProblems = [];
    const validationErrors = [];
    const allowedLevels = ['Easy', 'Medium', 'Tough'];

    for (let i = 0; i < problemsData.length; i++) {
      const problem = problemsData[i];
      const { title, topic, level } = problem;

      const problemErrors = [];

      if (!title || title.trim() === '') {
        problemErrors.push('Title is required.');
      }
      if (!topic || topic.trim() === '') {
        problemErrors.push('Topic (ID) is required.');
      }
      if (!level) {
        problemErrors.push('Level is required.');
      } else if (!allowedLevels.includes(level)) {
        problemErrors.push(`Level must be one of: ${allowedLevels.join(', ')}.`);
      }

      if (problemErrors.length > 0) {
        validationErrors.push({ 
          problemIndex: i, 
          title: title || 'N/A', 
          errors: problemErrors 
        });
      } else {
        validProblems.push(problem);
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        msg: 'Validation failed. No problems were created.', 
        errors: validationErrors,
      });
    }

    const createdProblems = await Problem.insertMany(validProblems);
    
    res.status(201).json(createdProblems);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error during problem creation', error: err.message });
  }
};


// @route   GET /api/problems/topic/:topicId
exports.getProblemsByTopic = async (req, res) => {
  try {
    const problems = await Problem.find({ topic: req.params.topicId });
    res.json(problems);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


// @route   GET /api/problems
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};  