import { FileText, Search, ExternalLink } from 'lucide-react';

export default function QuotesList() {
  const quotes = [
    { num: 'QT-2024-001', job: 'PRO-2024-001', client: 'Rustenburg Platinum', version: 1, oem: 32000, margin: 13200, total: 45200, status: 'awaiting_approval', date: 'Oct 14, 2024' },
    { num: 'QT-2024-002', job: 'PRO-2024-002', client: 'Sibanye Stillwater', version: 2, oem: 15600, margin: 4000, total: 19600, status: 'approved', date: 'Oct 10, 2024' },
    { num: 'QT-2024-003', job: 'PRO-2024-004', client: 'Rustenburg Platinum', version: 1, oem: 85000, margin: 25000, total: 110000, status: 'draft', date: 'Oct 15, 2024' },
    { num: 'QT-2024-004', job: 'PRO-2024-005', client: 'Anglo American', version: 1, oem: 12000, margin: 3000, total: 15000, status: 'rejected', date: 'Oct 05, 2024' },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Quotations</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search quotes..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quotes.map((q, i) => (
             <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-brand-accent transition-colors bg-white shadow-sm flex flex-col relative group cursor-pointer">
                <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-slate-300 group-hover:text-brand-accent transition-colors" />
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-brand-accent" />
                  <h3 className="font-bold text-brand-navy">{q.num}</h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-1">v{q.version}</span>
                </div>
                <div className="space-y-1 mb-4 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{q.client}</p>
                  <p className="text-xs text-slate-500 flex justify-between">Job Ref: <span className="font-semibold text-brand-navy">{q.job}</span></p>
                  <p className="text-xs text-slate-500 flex justify-between">Valid Until: <span>{q.date}</span></p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3 space-y-1 mb-4 border border-slate-100">
                   <div className="flex justify-between text-xs text-slate-500"><span>OEM Cost:</span> <span>R {q.oem.toLocaleString()}</span></div>
                   <div className="flex justify-between text-xs text-slate-500"><span>Markup:</span> <span>R {q.margin.toLocaleString()}</span></div>
                   <div className="flex justify-between text-sm font-bold text-slate-800 mt-1 pt-1 border-t border-slate-200"><span>Client Total:</span> <span>R {q.total.toLocaleString()}</span></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide
                    ${q.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      q.status === 'awaiting_approval' ? 'bg-orange-100 text-orange-700' : 
                      q.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                    {q.status.replace('_', ' ')}
                  </span>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
