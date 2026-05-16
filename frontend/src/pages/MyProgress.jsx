import React from 'react';

const MyProgress = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">My Progress</h1>
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Overall Internship Progress</h2>
        <div className="w-full bg-slate-900 rounded-full h-4 mb-2">
          <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <p className="text-slate-400 text-sm">45% Completed</p>
        
        <div className="mt-8 space-y-4">
          <h3 className="font-medium text-white">Milestones</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-slate-300"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Orientation Completed</li>
            <li className="flex items-center gap-3 text-slate-300"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Module 1 Assessment</li>
            <li className="flex items-center gap-3 text-slate-300"><span className="w-3 h-3 rounded-full bg-slate-600"></span> Mid-Internship Review (Pending)</li>
            <li className="flex items-center gap-3 text-slate-300"><span className="w-3 h-3 rounded-full bg-slate-600"></span> Final Project Submission</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
