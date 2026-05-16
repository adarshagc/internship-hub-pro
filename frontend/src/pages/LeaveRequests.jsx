import React, { useState, useEffect } from 'react';
import api from '../services/api';

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [newLeave, setNewLeave] = useState({ fromDate: '', toDate: '', reason: '' });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leaves');
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leaves', newLeave);
      setNewLeave({ fromDate: '', toDate: '', reason: '' });
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Leave Requests</h1>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">From Date</label>
              <input type="date" required value={newLeave.fromDate} onChange={e => setNewLeave({...newLeave, fromDate: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">To Date</label>
              <input type="date" required value={newLeave.toDate} onChange={e => setNewLeave({...newLeave, toDate: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Reason</label>
            <textarea required rows="3" value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Submit Request
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Past Requests</h2>
        {leaves.map(leave => (
          <div key={leave.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div>
              <p className="text-white font-medium">{leave.fromDate} to {leave.toDate}</p>
              <p className="text-slate-400 text-sm mt-1">{leave.reason}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              leave.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500' : 
              leave.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {leave.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequests;
