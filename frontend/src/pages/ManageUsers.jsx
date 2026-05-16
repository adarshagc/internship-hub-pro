import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Users</h1>
      </div>
      
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-700 text-slate-400">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="p-4 text-white">{user.fullName}</td>
                <td className="p-4 text-slate-300">{user.email}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded-full">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    user.approvalStatus === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400' :
                    user.approvalStatus === 'REJECTED' ? 'bg-red-500/10 text-red-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {user.approvalStatus}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
