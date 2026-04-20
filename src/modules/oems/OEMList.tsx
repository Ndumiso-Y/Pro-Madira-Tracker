import { Building2, Search, MoreVertical } from 'lucide-react';

export default function OEMList() {
  const oems = [
    { name: 'Hydratech Repairs', specialisation: ['Cylinder', 'Pump'], tnd: 14, active: true, jobs: 12 },
    { name: 'PneumaPro Services', specialisation: ['Valve', 'Actuator'], tnd: 7, active: true, jobs: 4 },
    { name: 'ValveMaster SA', specialisation: ['Valve'], tnd: 10, active: true, jobs: 8 },
    { name: 'CylTech Workshop', specialisation: ['Cylinder'], tnd: 14, active: true, jobs: 19 },
    { name: 'GearCorp Limited', specialisation: ['Gearbox', 'Motor'], tnd: 21, active: false, jobs: 0 },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">OEM Database</h2>
          <p className="text-sm text-slate-500 mt-1">Manage vendor assignments and turnaround SLAs.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search OEMs..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none" />
          </div>
          <button className="bg-brand-navy text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap hidden sm:block">+ Register OEM</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {oems.map((oem, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors bg-slate-50 flex flex-col">
             <div className="flex items-start justify-between mb-4">
               <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 flex items-center justify-center text-brand-navy shadow-sm">
                 <Building2 className="w-6 h-6" />
               </div>
               <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
             </div>
             <h3 className="text-lg font-bold text-slate-800 mb-1">{oem.name}</h3>
             <div className="flex flex-wrap gap-2 mb-4">
               {oem.specialisation.map(s => <span key={s} className="px-2 py-0.5 bg-brand-navy/5 text-brand-navy font-medium text-xs rounded-md">{s}</span>)}
             </div>
             
             <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Active Jobs</p>
                  <p className="text-xl font-bold text-slate-800">{oem.jobs}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Default SLA</p>
                  <p className="text-xl font-bold text-slate-800">{oem.tnd} Days</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
