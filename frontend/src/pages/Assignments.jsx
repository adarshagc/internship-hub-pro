import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await api.get('/assignments');
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (e, assignmentId) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadRes = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const fileUrl = uploadRes.data.fileUrl;
      
      await api.post(`/assignments/${assignmentId}/submit`, {
        fileUrl: fileUrl,
        comments: 'Submitted via portal'
      });
      
      alert('Assignment submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload assignment.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Assignments</h1>
      
      {assignments.length === 0 ? (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
          No assignments available.
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map(assignment => (
            <div key={assignment.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{assignment.title}</h3>
                <p className="text-slate-400 mt-1">{assignment.description}</p>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="text-yellow-400">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  <span className="text-emerald-400">Marks: {assignment.maxMarks}</span>
                </div>
              </div>
              <div className="flex items-center">
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap">
                  {uploading ? 'Uploading...' : 'Upload Submission'}
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, assignment.id)} disabled={uploading} />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;
