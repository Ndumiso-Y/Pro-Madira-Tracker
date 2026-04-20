import { useParams } from 'react-router-dom';
import { mockData, statusColors, priorityColors } from '../../lib/utils';
import { FileText, ArrowRight, Truck, Wrench, FileCheck, Clock, Plus, ChevronRight, UploadCloud } from 'lucide-react';

const steps = [
  { id: 'requested', label: 'Requested' },
  { id: 'workshop_intake', label: 'Intake' },
  { id: 'dispatched_to_oem', label: 'At OEM' },
  { id: 'awaiting_quote_approval', label: 'Quoting' },
  { id: 'repair_in_progress', label: 'Repairing' },
  { id: 'ready_for_delivery', label: 'Ready' },
  { id: 'closed', label: 'Closed' }
];

export default function JobDetail() {
  const { id } = useParams();
  const job = mockData.recentJobs.find(j => j.id === id) || mockData.recentJobs[0];

  const currentStepIndex = steps.findIndex(s => s.id === job.status) >= 0 ? steps.findIndex(s => s.id === job.status) : 3;

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8 lg:pb-2">
      {/* LEFT PANEL */}
      <div className="flex-1 space-y-6 lg:w-[60%] xl:w-[65%] min-w-0">
        
        {/* Superior Header Card */}
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-brand-accent opacity-[0.03] rounded-bl-full pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{job.client}</p>
              <h1 className="text-xl md:text-3xl font-black text-brand-navy tracking-tight flex flex-wrap items-center gap-1 md:gap-2">
                {job.id}
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300" />
                <span className="text-lg md:text-xl font-bold text-slate-600">Asset File</span>
              </h1>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
              <span className={`status-badge px-2 md:px-3 py-1 ${statusColors[job.status]}`}>{job.status.replace(/_/g, ' ')}</span>
              <span className={`status-badge opacity-80 ${priorityColors[job.priority]}`}>{job.priority}</span>
            </div>
          </div>

          {/* Stepper tracking */}
          <div className="mt-6 md:mt-10 relative bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100 shadow-inner">
            <div className="overflow-hidden h-2 md:h-2.5 mb-4 md:mb-6 text-xs flex rounded-full bg-slate-200 shadow-inner">
              <div style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-accent transition-all duration-700"></div>
            </div>
            <div className="flex justify-between overflow-x-auto pb-2 scrollbar-hide">
              {steps.map((step, i) => (
                <div key={step.id} className={`text-center min-w-[60px] md:w-16 flex flex-col items-center`}>
                   <div className={`w-1.5 h-1.5 rounded-full mb-2 ${i <= currentStepIndex ? 'bg-brand-accent' : 'bg-slate-300'}`}></div>
                   <span className={`text-[9px] md:text-[11px] font-bold tracking-wider uppercase transition-colors ${(i <= currentStepIndex) ? 'text-brand-navy' : 'text-slate-400'}`}>
                    {step.label}
                   </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button className="w-full sm:w-auto bg-brand-navy hover:bg-[#0a1222] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center focus:ring-4 focus:ring-slate-200 outline-none">
              Advance Status Matrix
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Dense Line Items Table/Cards */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="font-extrabold text-brand-navy text-base md:text-lg flex items-center tracking-tight"><Wrench className="w-5 h-5 mr-2 text-brand-accent" /> Assessed Line Items</h2>
            <button className="text-xs md:text-sm text-brand-accent bg-orange-50 px-3 py-1.5 rounded-md hover:bg-orange-100 font-bold flex items-center transition-colors border border-orange-100 truncate"><Plus className="w-4 h-4 mr-1"/> Append Item</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[500px]">
              <thead className="text-[10px] tracking-widest text-slate-500 uppercase bg-[#f8fafc] border-b border-slate-100">
                <tr>
                  <th className="px-5 py-4 font-bold">Identified Asset</th>
                  <th className="px-5 py-4 font-bold">Serial Hash</th>
                  <th className="px-5 py-4 font-bold">Allocated OEM</th>
                  <th className="px-5 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50">
                  <td className="px-5 py-5">
                    <p className="font-bold text-brand-navy text-[15px]">{job.asset} Block</p>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-slate-500 font-mono text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">SN-99824-A</span>
                  </td>
                  <td className="px-5 py-5 font-bold text-slate-700">ValveMaster SA</td>
                  <td className="px-5 py-5 text-right">
                    <button className="text-brand-accent text-sm font-bold hover:text-orange-700 hover:underline">Inspect</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial & Transit Clusters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-5 md:p-6 group cursor-pointer hover:border-brand-accent/30 transition-colors">
            <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center mb-5"><Truck className="w-5 h-5 mr-2 text-slate-400 group-hover:text-brand-accent transition-colors" /> Logistics Tracking</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center p-3.5 border border-slate-200 rounded-xl bg-slate-50">
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">WB-MINE-092</p>
                    <p className="text-[10px] md:text-[11px] font-medium tracking-wide text-slate-500 uppercase mt-0.5">Ingress Record</p>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold tracking-wider uppercase text-green-700 bg-green-100 px-2 py-1 rounded-md border border-green-200 shadow-sm">Verified</span>
               </div>
               <div className="flex justify-between items-center p-3.5 border border-slate-200 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">WB-INT-441</p>
                    <p className="text-[10px] md:text-[11px] font-medium tracking-wide text-slate-500 uppercase mt-0.5">OEM Egress</p>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold tracking-wider uppercase text-blue-700 bg-blue-100 px-2 py-1 rounded-md border border-blue-200 shadow-sm">In Transit</span>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-5 md:p-6 group cursor-pointer hover:border-brand-accent/30 transition-colors flex flex-col">
            <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center mb-5"><FileText className="w-5 h-5 mr-2 text-slate-400 group-hover:text-brand-accent transition-colors" /> Financial Summary</h3>
            <div className="flex-1">
               <div className="p-4 md:p-5 border border-brand-accent/20 rounded-xl bg-brand-accent/5">
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-bold text-brand-accent tracking-tight truncate">QT-2024-001 <span className="opacity-70 font-normal ml-1">v1</span></p>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-white bg-brand-accent px-2 py-0.5 rounded shadow-sm shrink-0 h-fit">Pending</span>
                  </div>
                  <p className="text-2xl font-black text-brand-navy mt-3">R 45,200<span className="text-base text-slate-400 font-bold">.00</span></p>
               </div>
            </div>
            <button className="w-full mt-4 bg-slate-900 border border-slate-700 text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-800 transition-colors tracking-tight">Approve Finance File</button>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL - Deep Context */}
      <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col gap-6 shrink-0 lg:h-full lg:overflow-y-auto">
        {/* Immutable Timeline */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 flex-1 flex flex-col overflow-hidden relative min-h-[400px]">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center z-10 bg-white">
            <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center"><Clock className="w-5 h-5 mr-2 text-slate-400" /> Immutable Graph</h3>
          </div>
          <div className="p-5 md:p-6 flex-1 overflow-y-auto bg-slate-50/50">
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-7">
              {[
                { time: 'Today, 09:41', action: 'Quotation payload locked (v1)', user: 'System Authority', important: true },
                { time: 'Yesterday, 14:20', action: 'ValveMaster SA submitted Assessment', user: 'External API', important: false },
                { time: 'Mon, 11:00', action: 'Dispatched to OEM / Carrier ID 4', user: 'Logistics Desk', important: false },
                { time: 'Mon, 08:30', action: 'Job UUID instantiated at Intake', user: 'Receiving Auth', important: true }
              ].map((event, i) => (
                <div key={i} className="pl-6 relative group">
                  <div className={`absolute w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full -left-[8px] md:-left-[10px] top-1 border-[2px] md:border-[3px] border-white shadow-sm flex items-center justify-center transition-colors ${event.important ? 'bg-brand-accent' : 'bg-slate-300 group-hover:bg-brand-navy'}`}></div>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{event.time}</p>
                  <p className={`text-sm tracking-tight leading-snug ${event.important ? 'text-brand-navy font-bold' : 'text-slate-600 font-medium'}`}>{event.action}</p>
                  <p className="text-xs text-slate-400 mt-1.5 flex items-center"><span className="w-4 h-4 bg-slate-200 rounded px-1 flex items-center justify-center text-[8px] mr-1 text-slate-500 font-black">{event.user.charAt(0)}</span>{event.user}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-slate-100 bg-white z-10 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.02)]">
             <div className="relative">
               <input type="text" placeholder="Append contextual note..." className="w-full pl-4 pr-12 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all placeholder:text-slate-400" />
               <button className="absolute right-2 top-2 p-1.5 bg-brand-navy text-white rounded-lg hover:bg-brand-accent transition-colors">
                 <ArrowRight className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>

        {/* File Objects */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-hidden shrink-0">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white shadow-sm z-10">
            <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center"><FileCheck className="w-5 h-5 mr-2 text-slate-400" /> Objects</h3>
            <button className="text-slate-500 hover:text-brand-accent bg-slate-100 hover:bg-orange-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-orange-200 focus:outline-none"><UploadCloud className="w-4 h-4" /></button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50/20 max-h-[250px]">
             {[
               { name: 'Quote_v1_Fin.pdf', size: '1.2 MB', date: 'Today, 09:41', color: 'bg-red-50 text-red-600', border: 'border-red-100' },
               { name: 'OEM_Eval_Report.pdf', size: '4.5 MB', date: 'Yesterday', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' }
             ].map((file, i) => (
                <div key={i} className="flex items-start gap-4 p-3 bg-white border border-slate-100 shadow-sm rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all cursor-pointer group">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 border ${file.color} ${file.border}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-brand-navy truncate group-hover:text-brand-accent transition-colors">{file.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{file.size} • {file.date}</p>
                    </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
