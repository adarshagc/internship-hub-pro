import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Layouts
import StudentDashboardLayout from './pages/StudentDashboardLayout';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import MyProgress from './pages/MyProgress';
import Resources from './pages/Resources';
import Assignments from './pages/Assignments';
import InternshipDiary from './pages/InternshipDiary';
import Documents from './pages/Documents';
import Projects from './pages/Projects';
import Feedback from './pages/Feedback';
import LeaveRequests from './pages/LeaveRequests';
import WriteAdmin from './pages/WriteAdmin';

// Other Pages
import DashboardPlaceholder from './pages/DashboardPlaceholder';
import AdminDashboardLayout from './pages/AdminDashboardLayout';
import MentorDashboardLayout from './pages/MentorDashboardLayout';

import AdminDashboard from './pages/AdminDashboard';
import UserApproval from './pages/UserApproval';
import ManageUsers from './pages/ManageUsers';
import AdminAnnouncements from './pages/AdminAnnouncements';
import SystemSettings from './pages/SystemSettings';

import MentorDashboard from './pages/MentorDashboard';

const Unauthorized = () => (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <p className="text-xl text-slate-300">You do not have permission to access this page.</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_STUDENT']} />}>
            <Route path="/student" element={<StudentDashboardLayout />}>
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="progress" element={<MyProgress />} />
              <Route path="resources" element={<Resources />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="diary" element={<InternshipDiary />} />
              <Route path="documents" element={<Documents />} />
              <Route path="projects" element={<Projects />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="leaves" element={<LeaveRequests />} />
              <Route path="messages" element={<WriteAdmin />} />
            </Route>
          </Route>

          {/* Mentor Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_MENTOR']} />}>
            <Route path="/mentor" element={<MentorDashboardLayout />}>
              <Route index element={<Navigate to="/mentor/dashboard" replace />} />
              <Route path="dashboard" element={<MentorDashboard />} />
              <Route path="resources" element={<DashboardPlaceholder title="Manage Resources" />} />
              <Route path="assignments" element={<DashboardPlaceholder title="Manage Assignments" />} />
              <Route path="submissions" element={<DashboardPlaceholder title="Review Submissions" />} />
              <Route path="quizzes" element={<DashboardPlaceholder title="Manage Quizzes" />} />
              <Route path="progress" element={<DashboardPlaceholder title="Student Progress" />} />
              <Route path="leaves" element={<DashboardPlaceholder title="Leave Requests" />} />
              <Route path="announcements" element={<DashboardPlaceholder title="Announcements" />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin" element={<AdminDashboardLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="approvals" element={<UserApproval />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="settings" element={<SystemSettings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
