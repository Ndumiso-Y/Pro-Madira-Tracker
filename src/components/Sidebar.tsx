import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, Truck, Users, BookOpen, BarChart3, Settings, LogOut } from 'lucide-react';

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

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#0a1222] text-white flex flex-col h-full shrink-0 shadow-2xl relative z-20">
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-center border-b border-white/5 shrink-0 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, #ea580c 0%, transparent 60%)' }}></div>
        <img src="/ProMadiraLogoTransparent.png" alt="ProMadira Logo" className="h-14 object-contain relative z-10 filter drop-shadow-md" />
      </div>

      <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#64748b] mt-2 border-b border-transparent">
        Main Menu
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto w-full px-3 pb-4">
        <ul className="space-y-1 w-full flex-col">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium border border-transparent ${
                    isActive 
                      ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }`
                }
              >
                <item.icon className={`w-[18px] h-[18px] mr-3 transition-colors ${
                  // isActive is not scoped out here directly in string interpretation nicely unless we replicate logic inside NavLink child function
                  // So we will rely on group classes or inherit text color.
                  ''
                }`} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/5 bg-[#0d1527] mt-auto shrink-0 w-full">
        <NavLink
            to="/settings"
            className={({ isActive }) =>
                `flex items-center px-3 py-2.5 mb-3 rounded-lg transition-all duration-200 text-sm font-medium border border-transparent ${
                isActive ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                }`
            }
        >
          <Settings className="w-[18px] h-[18px] mr-3" />
          Settings
        </NavLink>
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shadow-inner">
                <span className="text-xs font-bold text-brand-accent">OP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-200">Ops User</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Controller</span>
              </div>
            </div>
            <button className="p-2 rounded-md hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-colors tooltip group relative">
              <LogOut className="w-[18px] h-[18px]" />
            </button>
        </div>
      </div>
    </div>
  );
}
