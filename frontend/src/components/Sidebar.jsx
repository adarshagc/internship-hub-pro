import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, UserCircle, BookOpen, FileText, 
  BookOpenCheck, CalendarDays, UploadCloud, FolderKanban, 
  MessageSquare, FileClock, LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentNavItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', path: '/student/profile', icon: <UserCircle size={20} /> },
    { name: 'My Progress', path: '/student/progress', icon: <BookOpenCheck size={20} /> },
    { name: 'Resources', path: '/student/resources', icon: <BookOpen size={20} /> },
    { name: 'Assignments', path: '/student/assignments', icon: <FileText size={20} /> },
    { name: 'Internship Diary', path: '/student/diary', icon: <CalendarDays size={20} /> },
    { name: 'Documents', path: '/student/documents', icon: <UploadCloud size={20} /> },
    { name: 'Projects', path: '/student/projects', icon: <FolderKanban size={20} /> },
    { name: 'Session Feedback', path: '/student/feedback', icon: <MessageSquare size={20} /> },
    { name: 'Leave Requests', path: '/student/leaves', icon: <FileClock size={20} /> },
    { name: 'Write to Admin', path: '/student/messages', icon: <MessageSquare size={20} /> },
  ];

  const mentorNavItems = [
    { name: 'Dashboard', path: '/mentor/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Resources', path: '/mentor/resources', icon: <BookOpen size={20} /> },
    { name: 'Assignments', path: '/mentor/assignments', icon: <FileText size={20} /> },
    { name: 'Review Submissions', path: '/mentor/submissions', icon: <BookOpenCheck size={20} /> },
    { name: 'Quizzes', path: '/mentor/quizzes', icon: <FileText size={20} /> },
    { name: 'Student Progress', path: '/mentor/progress', icon: <UserCircle size={20} /> },
    { name: 'Leave Requests', path: '/mentor/leaves', icon: <FileClock size={20} /> },
    { name: 'Announcements', path: '/mentor/announcements', icon: <MessageSquare size={20} /> },
  ];

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'User Approval', path: '/admin/approvals', icon: <UserCircle size={20} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <FolderKanban size={20} /> },
    { name: 'Announcements', path: '/admin/announcements', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <LayoutDashboard size={20} /> },
  ];

  let navItems = studentNavItems;
  if (user?.role === 'ROLE_MENTOR') navItems = mentorNavItems;
  if (user?.role === 'ROLE_ADMIN') navItems = adminNavItems;

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen flex flex-col transition-all">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Internship Hub
        </h2>
        <div className="mt-2 text-xs text-slate-400 truncate">
          {user?.email}
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/student/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
