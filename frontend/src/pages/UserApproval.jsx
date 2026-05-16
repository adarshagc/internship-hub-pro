import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UserApproval = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get('/admin/users/pending');
      setPendingUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      await api.put(`/admin/users/${id}/approve`, { status });
      fetchPendingUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">User Approval Queue</h1>
      
      {pendingUsers.length === 0 ? (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
          No pending users at the moment.
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 border-b border-slate-700 text-slate-400">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Registered</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {pendingUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 text-white">{user.fullName}</td>
                  <td className="p-4 text-slate-300">{user.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApproval(user.id, 'APPROVED')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleApproval(user.id, 'REJECTED')}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserApproval;
