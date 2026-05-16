import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Award, BookOpen, Clock, FileText } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    { label: 'Completed Assignments', value: '0', icon: <FileText size={24} className="text-blue-400" /> },
    { label: 'Pending Assignments', value: '0', icon: <Clock size={24} className="text-yellow-400" /> },
    { label: 'Courses Enrolled', value: '0', icon: <BookOpen size={24} className="text-emerald-400" /> },
    { label: 'Current Progress', value: '0%', icon: <Award size={24} className="text-purple-400" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Student!</h1>
        <p className="text-slate-400">Here's what's happening with your internship today.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
          <div className="text-slate-400 italic">No announcements yet.</div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="text-slate-400 italic">No upcoming deadlines.</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
