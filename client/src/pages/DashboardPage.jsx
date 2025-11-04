import React, { useEffect, useState } from 'react';
import { getAllTopics } from '../services/dsaService';
import TopicCard from '../components/TopicCard';
import Spinner from '../components/ui/Spinner';

function DashboardPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getAllTopics();
        setTopics(res.data);
      } catch (err) {
        console.error('Failed to fetch topics', err);
      }
      setLoading(false);
    };
    fetchTopics();
  }, []);

  if (loading) {
    return <div className="p-8 text-center"><Spinner size="2rem" /></div>;
  }

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Your DSA Progress
      </h1>
      {topics.length === 0 ? (
        <p>No topics found. Please ask your admin to add some.</p>
      ) : (
        <div className="space-y-8">
          {topics.map((topic) => (
            <TopicCard key={topic._id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
