import { FileText, Search, ExternalLink } from 'lucide-react';

export default function QuotesList() {
  const quotes = [
    { num: 'QT-2024-001', job: 'PRO-2024-001', client: 'Rustenburg Platinum', version: 1, oem: 32000, margin: 13200, total: 45200, status: 'awaiting_approval', date: 'Oct 14, 2024' },
    { num: 'QT-2024-002', job: 'PRO-2024-002', client: 'Sibanye Stillwater', version: 2, oem: 15600, margin: 4000, total: 19600, status: 'approved', date: 'Oct 10, 2024' },
    { num: 'QT-2024-003', job: 'PRO-2024-004', client: 'Rustenburg Platinum', version: 1, oem: 85000, margin: 25000, total: 110000, status: 'draft', date: 'Oct 15, 2024' },
    { num: 'QT-2024-004', job: 'PRO-2024-005', client: 'Anglo American', version: 1, oem: 12000, margin: 3000, total: 15000, status: 'rejected', date: 'Oct 05, 2024' },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
      <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
        <div>
          <h2 className="text-xl font-extrabold text-brand-navy tracking-tight">Quotations Archive</h2>
          <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest leading-relaxed">Live financial pipeline & historical records</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search quotes or jobs..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all bg-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#fafafa]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {quotes.map((q, i) => (
             <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-brand-accent/50 hover:shadow-lg transition-all bg-white shadow-sm flex flex-col relative group cursor-pointer group animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="absolute top-4 right-4 p-2 bg-slate-50 rounded-lg group-hover:bg-orange-50 transition-colors">
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-accent" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                    <FileText className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-brand-navy leading-none">{q.num}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 inline-block">Version {q.version}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-5 flex-1">
                  <p className="text-[15px] font-black text-slate-800 line-clamp-1">{q.client}</p>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-400">Job Ref:</span>
                    <span className="text-brand-navy">{q.job}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-400">Valid Until:</span>
                    <span className="text-slate-500 font-medium">{q.date}</span>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-4 space-y-1.5 mb-5 border border-slate-100 shadow-inner">
                   <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400"><span>OEM Cost</span> <span>R {q.oem.toLocaleString()}</span></div>
                   <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400"><span>Markup</span> <span>R {q.margin.toLocaleString()}</span></div>
                   <div className="flex justify-between text-base font-black text-brand-navy mt-2 pt-2 border-t border-slate-200"><span>Total</span> <span>R {q.total.toLocaleString()}</span></div>
                </div>

                <div className="flex justify-between items-center mt-auto">
                   <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border
                    ${q.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' : 
                      q.status === 'awaiting_approval' ? 'bg-orange-100 text-orange-700 border-orange-200' : 
                      q.status === 'rejected' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {q.status.replace(/_/g, ' ')}
                  </span>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
