import { Bell, Search, Hexagon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Topbar() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts.length > 0 ? pathParts[0] : 'Dashboard';

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 h-16 flex items-center justify-between px-8 shrink-0 z-10 w-full shadow-[0_4px_20px_-15px_rgba(0,0,0,0.05)] sticky top-0">
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-800 capitalize tracking-tight">
        <Hexagon className="w-4 h-4 text-brand-accent" fill="currentColor" />
        <span className="text-slate-400 font-medium tracking-normal">Promodira</span> 
        <span className="text-slate-300">/</span> 
        {title === 'jobs' && pathParts.length > 1 ? `Job ${pathParts[1]}` : title}
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
          <input
            type="text"
            placeholder="Search job #, client, serial..."
            className="pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 rounded-full bg-slate-50 border border-slate-200 text-sm w-72 transition-all shadow-inner"
          />
        </div>
        <div className="h-6 w-px bg-slate-200"></div>
        <button className="relative p-2 text-slate-400 hover:text-brand-navy hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-white shadow-sm"></span>
        </button>
      </div>
    </header>
  );
}
