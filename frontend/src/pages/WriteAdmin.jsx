import React, { useState, useEffect } from 'react';
import api from '../services/api';

const WriteAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ subject: '', message: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/messages', newMessage);
      setNewMessage({ subject: '', message: '' });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Write to Admin</h1>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Subject</label>
            <input type="text" required value={newMessage.subject} onChange={e => setNewMessage({...newMessage, subject: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Message</label>
            <textarea required rows="4" value={newMessage.message} onChange={e => setNewMessage({...newMessage, message: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Send Message
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Message History</h2>
        {messages.map(msg => (
          <div key={msg.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">{msg.subject}</h3>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300">
                {msg.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WriteAdmin;
