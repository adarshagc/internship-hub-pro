import React, { useState } from 'react';
import api from '../services/api';

const AdminAnnouncements = () => {
  const [announcement, setAnnouncement] = useState({ title: '', content: '', targetRole: 'ALL' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/announcements', announcement);
      setAnnouncement({ title: '', content: '', targetRole: 'ALL' });
      alert('Announcement published!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Create Announcement</h1>
      
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Target Audience</label>
            <select value={announcement.targetRole} onChange={e => setAnnouncement({...announcement, targetRole: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white">
              <option value="ALL">Everyone</option>
              <option value="STUDENT">Students Only</option>
              <option value="MENTOR">Mentors Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Title</label>
            <input type="text" required value={announcement.title} onChange={e => setAnnouncement({...announcement, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Content</label>
            <textarea required rows="4" value={announcement.content} onChange={e => setAnnouncement({...announcement, content: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Publish Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
