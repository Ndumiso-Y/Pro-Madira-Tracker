import { Activity, Clock, DownloadCloud } from 'lucide-react';
import { PreviewBadge } from '../../components/PreviewBadge';

export default function Reports() {
  return (
    <div className="h-full overflow-y-auto w-full max-w-[1600px] mx-auto pb-10 px-2 sm:px-0 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 border-b border-slate-200 pb-6 bg-white/50 p-4 rounded-2xl md:bg-transparent md:p-0 md:rounded-none">
        <div>
           <div className="flex items-center gap-3 flex-wrap">
             <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Intelligence Node</h1>
             <PreviewBadge />
           </div>
           <p className="text-sm font-medium text-slate-500 mt-1 tracking-wide line-clamp-2 md:line-clamp-none">Macro-level SLA throughput, asset routing volumes, and partner efficacy analytics.</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-3 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center justify-center focus:ring-4 focus:ring-slate-300">
          <DownloadCloud className="w-4 h-4 mr-2" /> Export Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
         
         {/* SLA Card */}
         <div className="bg-white rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-6 md:p-8 flex flex-col min-h-[400px]">
           <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="font-extrabold text-brand-navy text-xl tracking-tight">SLA Adherence</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Active Jobs by Aging Tier</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shadow-inner shrink-0"><Clock className="w-5 h-5" /></div>
           </div>

           <div className="space-y-4 md:space-y-6 flex-1 flex flex-col justify-center">
              {[
                { label: 'Safeguard < 7d', value: 24, color: 'bg-green-500', text: 'text-brand-navy' },
                { label: 'Warning 8-14d', value: 12, color: 'bg-amber-400', text: 'text-brand-navy', width: '65%' },
                { label: 'Critical > 15d', value: 4, color: 'bg-red-600', text: 'text-red-700', width: '20%', bgOverlay: 'bg-red-50/50', border: 'border-red-100', glow: 'shadow-[0_0_8px_rgba(220,38,38,0.5)]' }
              ].map((tier, idx) => (
                <div key={idx} className={`${tier.bgOverlay || 'bg-slate-50'} rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border ${tier.border || 'border-slate-100'} gap-3 relative overflow-hidden group hover:shadow-md transition-all`}>
                  {tier.bgOverlay && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>}
                  <span className={`${tier.text} font-bold text-sm tracking-tight ${tier.bgOverlay ? 'pl-2' : ''}`}>{tier.label}</span>
                   <div className="flex items-center gap-4 w-full sm:flex-1 sm:pl-4">
                     <div className="h-2.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${tier.color} rounded-full ${tier.glow || ''} transition-all duration-1000`} style={{ width: tier.width || '100%' }}></div>
                     </div>
                     <span className={`font-black text-xl ${tier.text} w-8 text-right`}>{tier.value}</span>
                   </div>
                </div>
              ))}
           </div>
         </div>

         {/* OEM Card */}
         <div className="bg-white rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-6 md:p-8 flex flex-col min-h-[400px]">
           <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="font-extrabold text-brand-navy text-xl tracking-tight">OEM Yield Velocity</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Aggregate Vendor Performance</p>
              </div>
              <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-2xl border border-brand-accent/20 shadow-inner shrink-0"><Activity className="w-5 h-5" /></div>
           </div>

           <div className="overflow-x-auto flex-1 border border-slate-200 rounded-2xl bg-slate-50 relative">
             <table className="w-full text-sm text-left min-w-[350px]">
               <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-white shadow-sm sticky top-0">
                 <tr>
                   <th className="px-5 py-4 font-black">Partner</th>
                   <th className="px-5 py-4 font-black">Latency</th>
                   <th className="px-5 py-4 font-black text-right">Hit Rate</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 bg-white">
                 {[
                   { name: 'PneumaPro Services', days: '5.2', hit: '98.4%' },
                   { name: 'ValveMaster SA', days: '9.1', hit: '95.0%' },
                   { name: 'Hydratech Repairs', days: '16.4', hit: '82.1%', low: true }
                 ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group leading-tight md:leading-normal">
                      <td className="px-5 py-4 font-bold text-brand-navy text-sm">{row.name}</td>
                      <td className="px-5 py-4 font-bold text-slate-600">{row.days} <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">days</span></td>
                      <td className={`px-5 py-4 text-right font-black ${row.low ? 'text-amber-600' : 'text-green-600'}`}>{row.hit}</td>
                    </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>

      </div>
    </div>
  );
}
