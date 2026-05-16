import React, { useState, useEffect } from 'react';
import api from '../services/api';

const InternshipDiary = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ date: '', workDone: '', hoursSpent: '' });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get('/diary');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/diary', newEntry);
      setNewEntry({ date: '', workDone: '', hoursSpent: '' });
      fetchEntries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Internship Diary</h1>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Add New Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Date</label>
              <input type="date" required value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Hours Spent</label>
              <input type="number" step="0.5" required value={newEntry.hoursSpent} onChange={e => setNewEntry({...newEntry, hoursSpent: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Work Done</label>
            <textarea required rows="3" value={newEntry.workDone} onChange={e => setNewEntry({...newEntry, workDone: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Save Entry
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Previous Entries</h2>
        {entries.length === 0 ? (
          <p className="text-slate-400">No diary entries found.</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <span className="text-blue-400 font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${entry.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {entry.status}
                </span>
              </div>
              <p className="text-slate-300">{entry.workDone}</p>
              <p className="text-sm text-slate-500 mt-2">Hours: {entry.hoursSpent}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InternshipDiary;
