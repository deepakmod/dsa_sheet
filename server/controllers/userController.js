const User = require('../models/User');

// @route   POST /api/user/progress/toggle/:problemId
exports.toggleProblemStatus = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware
    const problemId = req.params.problemId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const problemIndex = user.completedProblems.indexOf(problemId);

    if (problemIndex > -1) {
      user.completedProblems.splice(problemIndex, 1);
    } else {
      user.completedProblems.push(problemId);
    }

    await user.save();
    
    res.json(user.completedProblems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};