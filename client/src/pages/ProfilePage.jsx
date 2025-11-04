import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getAllTopics, getAllProblems } from '../services/dsaService';
import { FiUser, FiMail, FiCheckCircle } from 'react-icons/fi';
import Spinner from '../components/ui/Spinner';

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [topicsRes, problemsRes] = await Promise.all([
          getAllTopics(),
          getAllProblems(),
        ]);
        setTopics(topicsRes.data);
        setProblems(problemsRes.data);
      } catch (err) {
        console.error('Failed to fetch profile data', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const progressStats = useMemo(() => {
    if (!user || problems.length === 0) {
      return {
        completedCount: 0,
        totalCount: 0,
        percentage: 0,
        completedProblems: [],
      };
    }

    const completedProblems = problems.filter((p) =>
      user.completedProblems.includes(p._id)
    );
    const totalCount = problems.length;
    const completedCount = completedProblems.length;
    const percentage =
      totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return { completedCount, totalCount, percentage, completedProblems };
  }, [user, problems]);


  const completedByTopic = useMemo(() => {
    const topicMap = new Map(topics.map((t) => [t._id, { ...t, problems: [] }]));
    
    progressStats.completedProblems.forEach((problem) => {
      const topic = topicMap.get(problem.topic);
      if (topic) {
        topic.problems.push(problem);
      }
    });
    
    return Array.from(topicMap.values()).filter(t => t.problems.length > 0);
  }, [topics, progressStats.completedProblems]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  const { completedCount, totalCount, percentage } = progressStats;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
        <div className="flex items-center space-x-4">
          <div className="shrink-0 p-3 bg-blue-100 rounded-full">
            <FiUser className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">{user.name}</p>
            <p className="text-md text-gray-600 flex items-center">
              <FiMail className="w-4 h-4 mr-2" />
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Overall Progress
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-medium text-blue-600">
            {completedCount} / {totalCount} Problems Solved
          </span>
          <span className="text-xl font-bold text-gray-800">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Completed Problems
        </h2>
        {completedByTopic.length > 0 ? (
          <div className="space-y-6">
            {completedByTopic.map((topic) => (
              <div key={topic._id}>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                  {topic.title}
                </h3>
                <ul className="space-y-2">
                  {topic.problems.map((problem) => (
                    <li
                      key={problem._id}
                      className="flex items-center text-gray-700"
                    >
                      <FiCheckCircle className="w-5 h-5 mr-3 text-green-500" />
                      <span>{problem.title}</span>
                      <span
                        className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium ${
                          problem.level === 'Easy'
                            ? 'bg-green-100 text-green-800'
                            : problem.level === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {problem.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            You haven't completed any problems yet. Head back to the dashboard to
            get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
