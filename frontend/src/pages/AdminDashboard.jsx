import React from 'react';
import { Users, FileText, CheckCircle, Bell } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '150', icon: <Users size={24} className="text-blue-400" /> },
    { label: 'Pending Approvals', value: '12', icon: <CheckCircle size={24} className="text-yellow-400" /> },
    { label: 'Active Courses', value: '8', icon: <FileText size={24} className="text-emerald-400" /> },
    { label: 'System Alerts', value: '0', icon: <Bell size={24} className="text-red-400" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">System analytics and user management overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
