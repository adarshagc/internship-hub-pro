import React from 'react';

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">System Settings</h1>
      
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 max-w-2xl text-slate-300">
        <p className="mb-4">System configuration settings are managed here. Feature flag toggles, maintenance mode, and global app settings will be implemented in future iterations.</p>
        <button disabled className="bg-slate-700 text-slate-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
