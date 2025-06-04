import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  const linkClasses = (path) =>
    `flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 hover:text-black ${
      pathname === path ? 'bg-gray-100 text-black font-semibold' : ''
    }`;

  return (
    <div className="flex min-h-screen bg-[#2A1E2E]">
      {/* Sidebar */}
      <aside
        className={`bg-[#2A1E2E] border-r w-64 fixed text-white z-30 top-0 left-0 h-full transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:block`}
      >
        <div className="p-4 font-bold text-xl border-b">🔥 FireLog</div>
        <nav className="p-4 flex flex-col gap-4">
          <Link to="/admin/dashboard" className={linkClasses('/admin/dashboard')}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/logs" className={linkClasses('/admin/logs')}>
            <FileText size={18} /> Logs
          </Link>
          <Link to="/admin/alerts" className={linkClasses('/admin/alerts')}>
            <Bell size={18} /> Alerts
          </Link>
          <Link to="/admin/settings" className={linkClasses('/admin/settings')}>
            <Settings size={18} /> Settings
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 flex items-center gap-2 mt-4 md:hidden"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full min-h-screen ml-0 bg-[#F9FAFB]">
        {/* Mobile Topbar */}
        <div className="md:hidden p-4 shadow bg-white flex items-center justify-between">
          <div className="font-bold text-lg">FireLog Dashboard</div>
          <button onClick={toggleSidebar}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Header with Logout (desktop) */}
        <div className="hidden md:flex justify-end items-center p-4 shadow bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Dynamic Page Content */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
