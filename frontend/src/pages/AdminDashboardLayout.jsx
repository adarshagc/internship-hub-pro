import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
