import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', profile);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Profile Management</h1>
      
      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Full Name</label>
            <input type="text" name="fullName" value={profile.fullName || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email (Read Only)</label>
            <input type="email" readOnly value={profile.email || ''} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Phone</label>
            <input type="text" name="phone" value={profile.phone || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">College</label>
            <input type="text" name="college" value={profile.college || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Branch</label>
            <input type="text" name="branch" value={profile.branch || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Semester</label>
            <input type="number" name="semester" value={profile.semester || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">LinkedIn URL</label>
            <input type="text" name="linkedinUrl" value={profile.linkedinUrl || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-1">Bio</label>
          <textarea name="bio" rows="4" value={profile.bio || ''} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"></textarea>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
