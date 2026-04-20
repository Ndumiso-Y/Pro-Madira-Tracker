import { Bell, Search, Hexagon, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts.length > 0 ? pathParts[0] : 'Dashboard';

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-10 w-full shadow-[0_4px_20px_-15px_rgba(0,0,0,0.05)] sticky top-0">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-brand-navy hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 capitalize tracking-tight">
          <Hexagon className="w-4 h-4 text-brand-accent hidden sm:block" fill="currentColor" />
          <span className="text-slate-400 font-medium tracking-normal hidden sm:inline">Promodira</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-slate-800 font-bold capitalize">
            {title === 'jobs' && pathParts.length > 1 ? `Job ${pathParts[1]}` : title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search — hidden on very small screens, visible from sm */}
        <div className="relative group hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
          <input
            type="text"
            placeholder="Search job #, client..."
            className="pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 rounded-full bg-slate-50 border border-slate-200 text-sm w-48 lg:w-64 xl:w-72 transition-all shadow-inner"
          />
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        <button className="relative p-2 text-slate-400 hover:text-brand-navy hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-white shadow-sm" />
        </button>
      </div>
    </header>
  );
}
