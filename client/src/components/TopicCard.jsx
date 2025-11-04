import React, { useState, useEffect } from 'react';
import { getProblemsByTopic } from '../services/dsaService';
import ProblemTable from './ProblemTable';
import Spinner from './ui/Spinner';

function TopicCard({ topic }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await getProblemsByTopic(topic._id);
        setProblems(res.data);
      } catch (err) {
        console.error('Failed to fetch problems', err);
        setError('Could not load problems for this topic.');
      }
      setLoading(false);
    };
    fetchProblems();
  }, [topic._id]);

  return (
    <section className="overflow-hidden bg-white rounded-2xl shadow-xl">
      <h2 className="p-5 text-2xl font-semibold text-gray-900 bg-gray-50 border-b border-gray-200">
        {topic.title}
      </h2>
      
      {loading && (
        <div className="p-10 text-center">
          <Spinner />
        </div>
      )}
      
      {error && (
        <div className="p-10 text-center text-red-600">
          {error}
        </div>
      )}
      
      {!loading && !error && (
        <ProblemTable data={problems} />
      )}
    </section>
  );
}

export default TopicCard;
