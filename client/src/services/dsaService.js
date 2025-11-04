import api from './api';

const getAllTopics = () => {
  return api.get('/topics');
};

const getAllProblems = () => {
  return api.get('/problems');
};

const getProblemsByTopic = (topicId) => {
  return api.get(`/problems/topic/${topicId}`);
};

const toggleProblemStatus = (problemId) => {
  return api.post(`/user/progress/toggle/${problemId}`);
};

export { getAllTopics, getAllProblems, getProblemsByTopic, toggleProblemStatus };
