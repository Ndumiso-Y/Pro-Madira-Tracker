import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleMobile = useCallback(() => setSidebarOpen(o => !o), []);
  const toggleDesktop = useCallback(() => setDesktopCollapsed(c => !c), []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 lg:relative lg:z-auto
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${desktopCollapsed ? 'lg:w-[68px]' : 'lg:w-64'}
        `}
      >
        <Sidebar
          collapsed={desktopCollapsed}
          onToggleDesktop={toggleDesktop}
          onCloseMobile={closeSidebar}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <Topbar onMenuClick={toggleMobile} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
