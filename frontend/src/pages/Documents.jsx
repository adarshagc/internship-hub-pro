import React, { useState } from 'react';
import api from '../services/api';

const Documents = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadRes = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedUrl(uploadRes.data.fileUrl);
      alert('Document uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">My Documents</h1>
      
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Upload New Document</h2>
        <p className="text-slate-400 mb-6">Upload your resume, certificates, or other required documents here.</p>
        
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-900 hover:bg-slate-800/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-slate-500">PDF, DOCX, JPG or PNG (MAX. 10MB)</p>
            </div>
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>
        
        {uploading && <p className="text-blue-400 mt-4 text-center">Uploading document...</p>}
        {uploadedUrl && (
          <div className="mt-4 p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 rounded-lg">
            Document uploaded successfully! URL: {uploadedUrl}
          </div>
        )}
      </div>

      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Uploaded Documents</h2>
        <div className="text-slate-400 italic">
          No documents uploaded yet.
        </div>
      </div>
    </div>
  );
};

export default Documents;
