import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ sessionDate: '', rating: 5, comments: '' });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/feedback');
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback', newFeedback);
      setNewFeedback({ sessionDate: '', rating: 5, comments: '' });
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Session Feedback</h1>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Submit Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Session Date</label>
              <input type="date" required value={newFeedback.sessionDate} onChange={e => setNewFeedback({...newFeedback, sessionDate: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Rating (1-5)</label>
              <input type="number" min="1" max="5" required value={newFeedback.rating} onChange={e => setNewFeedback({...newFeedback, rating: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Comments</label>
            <textarea required rows="3" value={newFeedback.comments} onChange={e => setNewFeedback({...newFeedback, comments: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Submit Feedback
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Past Feedbacks</h2>
        {feedbacks.map(fb => (
          <div key={fb.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">Session: {fb.sessionDate}</h3>
              <span className="text-yellow-400 font-bold">★ {fb.rating}/5</span>
            </div>
            <p className="text-slate-400 text-sm">{fb.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
