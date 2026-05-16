import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPlaceholder = ({ title }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">{title}</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
          <p className="text-slate-400">Role: <span className="text-emerald-400 font-mono">{user?.role}</span></p>
          <p className="text-slate-400 mt-2">Account Status: <span className="text-yellow-400 font-mono">{user?.approvalStatus}</span></p>
          <p className="mt-8 text-slate-500 italic">This dashboard module will be implemented in subsequent phases.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPlaceholder;
