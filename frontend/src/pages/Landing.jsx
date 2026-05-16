import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Internship Hub
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
          The ultimate platform for managing your internship learning, tracking progress, and accelerating your career.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Link
            to="/login"
            className="px-8 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 rounded-lg font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
