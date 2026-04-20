import { Users, MoreVertical, Search, HardDrive } from 'lucide-react';

export default function ClientList() {
  const clients = [
    { name: 'Rustenburg Platinum Mine', site: 'Process Plant A', contact: 'Mark Evans', jobs: 12 },
    { name: 'Sibanye Stillwater', site: 'Shaft 2', contact: 'Sarah Jenkins', jobs: 8 },
    { name: 'Anglo American Platinum', site: 'Main Plant', contact: 'David Smith', jobs: 3 },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
      <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
        <div>
          <h2 className="text-xl font-extrabold text-brand-navy tracking-tight">Client Relationship Network</h2>
          <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest leading-relaxed">Enterprise accounts & site-specific operations</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search clients..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all bg-white" />
          </div>
          <button className="hidden sm:block bg-brand-navy text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-all">+ Add Client</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#fafafa]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {clients.map((c, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-brand-accent/40 hover:shadow-lg transition-all bg-white flex flex-col group animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
               <div className="flex items-start justify-between mb-5">
                 <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-brand-accent transition-colors shadow-inner">
                   <Users className="w-6 h-6" />
                 </div>
                 <button className="text-slate-400 hover:text-brand-navy p-1.5 hover:bg-slate-50 rounded-lg transition-all"><MoreVertical className="w-5 h-5" /></button>
               </div>
               <h3 className="text-lg font-black text-brand-navy leading-tight tracking-tight mb-1 uppercase line-clamp-2 min-h-[50px]">{c.name}</h3>
               <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                 <div className="w-1 h-1 rounded-full bg-brand-accent mr-2"></div>
                 {c.site}
               </div>
               
               <div className="mt-auto pt-5 border-t border-slate-100 flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Key Liaison</p>
                    <p className="text-sm font-bold text-slate-700">{c.contact}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Active Flow</p>
                    <div className="flex items-center gap-1.5 bg-orange-50 text-brand-accent px-2 py-1 rounded-md border border-orange-100">
                      <HardDrive className="w-3 h-3" />
                      <span className="text-sm font-black leading-none">{c.jobs}</span>
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
        <button className="sm:hidden w-full mt-6 bg-brand-navy text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-slate-200">+ Register New Client Account</button>
      </div>
    </div>
  );
}
