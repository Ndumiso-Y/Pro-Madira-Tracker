import { Building2, Search, MoreVertical } from 'lucide-react';
import { PreviewBadge } from '../../components/PreviewBadge';

export default function OEMList() {
  const oems = [
    { name: 'Hydratech Repairs', specialisation: ['Cylinder', 'Pump'], tnd: 14, active: true, jobs: 12 },
    { name: 'PneumaPro Services', specialisation: ['Valve', 'Actuator'], tnd: 7, active: true, jobs: 4 },
    { name: 'ValveMaster SA', specialisation: ['Valve'], tnd: 10, active: true, jobs: 8 },
    { name: 'CylTech Workshop', specialisation: ['Cylinder'], tnd: 14, active: true, jobs: 19 },
    { name: 'GearCorp Limited', specialisation: ['Gearbox', 'Motor'], tnd: 21, active: false, jobs: 0 },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
      <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-extrabold text-brand-navy tracking-tight">OEM Partnership Matrix</h2>
            <PreviewBadge />
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-widest leading-relaxed">Turnaround SLAs & capacity monitoring</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search OEMs..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all bg-white" />
          </div>
          <button className="hidden sm:block bg-brand-navy text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-all">+ Register OEM</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#fafafa]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {oems.map((oem, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-brand-accent/40 hover:shadow-lg transition-all bg-white flex flex-col group animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
               <div className="flex items-start justify-between mb-5">
                 <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-brand-navy shadow-inner group-hover:bg-orange-50 group-hover:text-brand-accent transition-colors">
                   <Building2 className="w-6 h-6" />
                 </div>
                 <button className="text-slate-400 hover:text-brand-navy p-1.5 hover:bg-slate-50 rounded-lg transition-all"><MoreVertical className="w-5 h-5" /></button>
               </div>
               <h3 className="text-lg font-black text-brand-navy tracking-tight mb-2 uppercase">{oem.name}</h3>
               <div className="flex flex-wrap gap-1.5 mb-6 min-h-[50px]">
                 {oem.specialisation.map(s => <span key={s} className="px-2 py-0.5 bg-slate-50 text-slate-500 font-bold text-[10px] uppercase tracking-wider rounded-md border border-slate-100">{s}</span>)}
               </div>
               
               <div className="mt-auto grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Load</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-black text-brand-navy leading-none">{oem.jobs}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Jobs</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">SLA Target</p>
                    <div className="flex items-baseline justify-end gap-1">
                      <p className="text-2xl font-black text-slate-800 leading-none">{oem.tnd}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Days</span>
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
        <button className="sm:hidden w-full mt-6 bg-brand-navy text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-slate-200">+ Register New OEM Partner</button>
      </div>
    </div>
  );
}
