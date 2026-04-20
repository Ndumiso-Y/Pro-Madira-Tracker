import { Users, MoreVertical, Search } from 'lucide-react';

export default function ClientList() {
  const clients = [
    { name: 'Rustenburg Platinum Mine', site: 'Process Plant A', contact: 'Mark Evans', jobs: 12 },
    { name: 'Sibanye Stillwater', site: 'Shaft 2', contact: 'Sarah Jenkins', jobs: 8 },
    { name: 'Anglo American Platinum', site: 'Main Plant', contact: 'David Smith', jobs: 3 },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Client Network</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search clients..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none" />
          </div>
          <button className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">+ Add Client</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((c, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white flex flex-col cursor-pointer group">
             <div className="flex items-start justify-between mb-4">
               <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-brand-accent transition-colors">
                 <Users className="w-6 h-6" />
               </div>
               <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
             </div>
             <h3 className="text-lg font-bold text-brand-navy leading-tight">{c.name}</h3>
             <p className="text-sm text-slate-500 mt-1">{c.site}</p>
             
             <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Primary Contact</p>
                  <p className="text-sm font-medium text-slate-700">{c.contact}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Active Jobs</p>
                  <p className="text-lg font-bold text-brand-accent">{c.jobs}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
