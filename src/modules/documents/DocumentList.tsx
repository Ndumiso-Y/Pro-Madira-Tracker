import { FileText, Download, Filter, Search } from 'lucide-react';
import { PreviewBadge } from '../../components/PreviewBadge';

export default function DocumentList() {
  const docs = [
    { name: 'Mine_Waybill_001.pdf', type: 'Waybill', job: 'PRO-2024-001', date: 'Oct 12, 2024', user: 'Ops User', size: '1.2 MB' },
    { name: 'Quote_Approval_Signoff.pdf', type: 'Approval', job: 'PRO-2024-002', date: 'Oct 11, 2024', user: 'Jane Doe', size: '0.8 MB' },
    { name: 'ValveMaster_Assessment.pdf', type: 'Assessment', job: 'PRO-2024-003', date: 'Oct 10, 2024', user: 'ValveMaster SA', size: '3.4 MB' },
    { name: 'Delivery_Note_099.pdf', type: 'Delivery Note', job: 'PRO-2024-004', date: 'Oct 09, 2024', user: 'Ops User', size: '1.1 MB' },
    { name: 'Photo_Proof_Damage.jpg', type: 'Image', job: 'PRO-2024-003', date: 'Oct 10, 2024', user: 'Workshop', size: '4.5 MB' },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-extrabold text-brand-navy tracking-tight">Document Center</h2>
            <PreviewBadge />
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest">Unified object storage & compliance logs</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search files..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all bg-white" />
          </div>
          <button className="flex items-center px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 bg-white font-bold transition-colors"><Filter className="w-4 h-4 mr-2"/>Filter</button>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="lg:hidden flex-1 overflow-auto bg-[#fafafa] p-4 space-y-3">
        {docs.map((doc, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-3 hover:border-brand-accent/30 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-brand-accent border border-orange-100 shadow-sm shrink-0">
              <FileText className="w-5 h-5"/>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-slate-800 tracking-tight text-sm truncate group-hover:text-brand-accent transition-colors">{doc.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{doc.size} • {doc.type}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-xs font-bold text-brand-accent">{doc.job}</span>
                  <span className="text-[10px] text-slate-400 font-medium ml-2">· {doc.date}</span>
                </div>
                <button className="text-slate-400 hover:text-brand-accent p-1.5 bg-slate-50 hover:bg-orange-50 rounded-lg border border-slate-100 hover:border-orange-200 transition-all">
                  <Download className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block flex-1 overflow-auto bg-white">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-[#f8fafc] text-slate-500 font-bold sticky top-0 z-10 shadow-sm border-b border-slate-200 uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-6 py-5">Object Name & Size</th>
              <th className="px-6 py-5">Classification</th>
              <th className="px-6 py-5">Assoc. Job</th>
              <th className="px-6 py-5">Log Identity</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {docs.map((doc, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-brand-accent border border-orange-100 shadow-sm transition-transform group-hover:scale-105 shrink-0">
                    <FileText className="w-5 h-5"/>
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-slate-800 tracking-tight truncate">{doc.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{doc.size} • PDF Object</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200">{doc.type}</span>
                </td>
                <td className="px-6 py-4 font-black text-brand-accent">{doc.job}</td>
                <td className="px-6 py-4">
                  <p className="text-slate-800 font-bold">{doc.date}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">by {doc.user}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-brand-accent p-2 bg-slate-50 hover:bg-orange-50 rounded-lg border border-slate-100 hover:border-orange-200 transition-all"><Download className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
