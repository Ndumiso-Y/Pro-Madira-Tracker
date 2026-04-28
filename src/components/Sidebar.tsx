import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, FileText, Truck, Users,
  BookOpen, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Jobs', path: '/jobs', icon: Briefcase },
  { name: 'Waybills', path: '/waybills', icon: Truck },
  { name: 'Quotations', path: '/quotes', icon: FileText },
  { name: 'OEM Management', path: '/oems', icon: Settings },
  { name: 'Documents', path: '/documents', icon: BookOpen },
  { name: 'Clients', path: '/clients', icon: Users },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleDesktop: () => void;
  onCloseMobile: () => void;
}

export default function Sidebar({ collapsed, onToggleDesktop, onCloseMobile }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'OP';
  const displayName = profile?.full_name ?? 'Ops User';
  const displayRole = profile?.role === 'admin' ? 'Administrator' : 'Controller';

  return (
    <div
      className={`
        relative flex flex-col h-full bg-[#0a1222] text-white shadow-2xl z-20
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[68px]' : 'w-64'}
      `}
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-center border-b border-white/5 shrink-0 bg-[#0f172a] relative overflow-hidden min-h-[100px]">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, #ea580c 0%, transparent 60%)' }} />
        {!collapsed && (
          <img
            src="/ProMadiraLogoTransparent.png"
            alt="ProMadira Logo"
            className="w-full max-h-20 object-contain relative z-10 filter drop-shadow-lg"
          />
        )}
        {collapsed && (
          <div className="w-9 h-9 rounded-xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center mx-auto relative z-10">
            <span className="text-xs font-black text-brand-accent">PM</span>
          </div>
        )}

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden relative z-10 ml-2 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop collapse toggle */}
      <button
        onClick={onToggleDesktop}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full shadow-md items-center justify-center text-slate-500 hover:text-brand-accent transition-colors z-50"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {!collapsed && (
        <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#64748b] mt-2">
          Main Menu
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto w-full px-2 pb-4 mt-1">
        <ul className="space-y-1 w-full">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <NavLink
                to={item.path}
                onClick={onCloseMobile}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium border border-transparent ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }`
                }
              >
                <item.icon className={`w-[18px] h-[18px] shrink-0 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="border-t border-white/5 bg-[#0d1527] shrink-0 w-full">
        <NavLink
          to="/settings"
          onClick={onCloseMobile}
          title={collapsed ? 'Settings' : undefined}
          className={({ isActive }) =>
            `flex items-center px-3 py-3 m-2 rounded-lg transition-all duration-200 text-sm font-medium border border-transparent ${
              collapsed ? 'justify-center' : ''
            } ${
              isActive ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
            }`
          }
        >
          <Settings className={`w-[18px] h-[18px] shrink-0 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        {!collapsed && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shadow-inner shrink-0">
                <span className="text-xs font-bold text-brand-accent">{initials}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-200 truncate">{displayName}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{displayRole}</span>
              </div>
            </div>
            <button
              onClick={signOut}
              title="Sign out"
              className="p-2 rounded-md hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-colors shrink-0"
            >
              <LogOut className="w-[18px] h-[18px]" />
            </button>
          </div>
        )}

        {collapsed && (
          <div className="flex justify-center py-3 border-t border-white/5">
            <button
              onClick={signOut}
              title="Sign out"
              className="p-2 rounded-md hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-colors"
            >
              <LogOut className="w-[18px] h-[18px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
