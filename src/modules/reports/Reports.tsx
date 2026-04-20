import { Activity, Clock, DownloadCloud } from 'lucide-react';

export default function Reports() {
  return (
    <div className="h-full overflow-y-auto w-full max-w-[1600px] mx-auto pb-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-5">
        <div>
           <h1 className="text-3xl font-black text-brand-navy tracking-tight">Intelligence Node</h1>
           <p className="text-sm font-medium text-slate-500 mt-1 tracking-wide">Macro-level SLA throughput, asset routing volumes, and partner efficacy.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-navy text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-[0_4px_10px_-2px_rgba(0,0,0,0.2)] flex items-center focus:ring-4 focus:ring-slate-300">
          <DownloadCloud className="w-4 h-4 mr-2" /> Export Matrix Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-8 flex flex-col h-[400px]">
           <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="font-extrabold text-brand-navy text-xl tracking-tight">SLA Adherence</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest">Active Jobs by Aging Tier</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shadow-inner"><Clock className="w-5 h-5" /></div>
           </div>

           <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center border border-slate-100">
                <span className="text-slate-700 font-bold w-32 tracking-tight">Safeguard &lt; 7d</span>
                 <div className="flex items-center gap-4 flex-1 pl-4">
                   <div className="h-2.5 flex-1 bg-green-500 rounded-full shadow-inner"></div>
                   <span className="font-extrabold text-lg text-brand-navy w-8 text-right">24</span>
                 </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center border border-slate-100">
                <span className="text-slate-700 font-bold w-32 tracking-tight">Warning 8-14d</span>
                 <div className="flex items-center gap-4 flex-1 pl-4">
                   <div className="h-2.5 w-[65%] bg-amber-400 rounded-full shadow-inner"></div>
                   <span className="font-extrabold text-lg text-brand-navy w-8 text-right">12</span>
                 </div>
              </div>
              <div className="bg-red-50/50 rounded-xl p-4 flex justify-between items-center border border-red-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                <span className="text-red-700 font-bold w-32 tracking-tight pl-2">Critical &gt; 15d</span>
                 <div className="flex items-center gap-4 flex-1 pl-4">
                   <div className="h-2.5 w-[20%] bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                   <span className="font-extrabold text-lg text-red-700 w-8 text-right">4</span>
                 </div>
              </div>
           </div>
         </div>

         <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-8 flex flex-col h-[400px]">
           <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="font-extrabold text-brand-navy text-xl tracking-tight">OEM Yield Velocity</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest">Aggregate Vendor Performance</p>
              </div>
              <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-xl border border-brand-accent/20 shadow-inner"><Activity className="w-5 h-5" /></div>
           </div>

           <div className="overflow-x-auto flex-1 border border-slate-200 rounded-xl bg-slate-50">
             <table className="w-full text-sm text-left">
               <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200 bg-white shadow-sm">
                 <tr>
                   <th className="px-5 py-4 font-bold">Partner Identity</th>
                   <th className="px-5 py-4 font-bold">Latency (Avg Days)</th>
                   <th className="px-5 py-4 font-bold text-right">SLA Target Hit</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 bg-white">
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-5 py-4 font-bold text-brand-navy text-[15px]">PneumaPro Services</td>
                   <td className="px-5 py-4 font-bold text-slate-600">5.2 <span className="text-xs text-slate-400 font-medium ml-1">days</span></td>
                   <td className="px-5 py-4 text-right text-green-600 font-extrabold">98.4%</td>
                 </tr>
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-5 py-4 font-bold text-brand-navy text-[15px]">ValveMaster SA</td>
                   <td className="px-5 py-4 font-bold text-slate-600">9.1 <span className="text-xs text-slate-400 font-medium ml-1">days</span></td>
                   <td className="px-5 py-4 text-right text-green-600 font-extrabold">95.0%</td>
                 </tr>
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-5 py-4 font-bold text-brand-navy text-[15px]">Hydratech Repairs</td>
                   <td className="px-5 py-4 font-bold text-slate-600">16.4 <span className="text-xs text-slate-400 font-medium ml-1">days</span></td>
                   <td className="px-5 py-4 text-right text-amber-600 font-extrabold">82.1%</td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>

      </div>
    </div>
  );
}
