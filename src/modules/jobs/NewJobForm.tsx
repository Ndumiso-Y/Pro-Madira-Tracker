import { useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewJobForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto py-4 md:py-8 px-2 md:px-4">
      {/* Stepper */}
      <div className="mb-8 md:mb-10 text-center sm:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6">Capture New Job</h1>
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto sm:mx-0">
          {[
             { num: 1, label: 'Client' },
             { num: 2, label: 'Asset' },
             { num: 3, label: 'Review' }
          ].map((s, i) => (
            <div key={s.num} className="flex flex-1 items-center last:flex-none">
               <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors ${step >= s.num ? 'bg-brand-accent text-white shadow-lg shadow-orange-200' : 'bg-slate-200 text-slate-500 font-bold'} text-sm`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-[10px] sm:text-sm font-bold uppercase tracking-wider ${step >= s.num ? 'text-brand-navy' : 'text-slate-400'}`}>{s.label}</span>
               </div>
               {i < 2 && <div className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${step > s.num ? 'bg-brand-accent' : 'bg-slate-100'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-5 md:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Client & Collection Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Client / Mine Site</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all">
                  <option>Select client...</option>
                  <option>Rustenburg Platinum Mine</option>
                  <option>Sibanye Stillwater</option>
                  <option>Anglo American Platinum</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Priority Level</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all">
                  <option>Standard (14 days SLA)</option>
                  <option>Urgent (3 days SLA)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Mine Waybill Reference</label>
                <input type="text" placeholder="e.g. WB-009123" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Mine Waybill Date</label>
                <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Asset Line Items</h2>
            <div className="p-4 md:p-6 bg-slate-50/50 border border-slate-200 rounded-xl space-y-5">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                 <div className="md:col-span-4 space-y-2">
                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Type</label>
                   <select className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-accent/50">
                     <option>Hydraulic Cylinder</option>
                     <option>Pump</option>
                     <option>Valve</option>
                     <option>Motor</option>
                   </select>
                 </div>
                 <div className="md:col-span-4 space-y-2">
                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Serial Number</label>
                   <input type="text" className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-accent/50" placeholder="SN-..." />
                 </div>
                 <div className="md:col-span-4 space-y-2">
                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description / Notes</label>
                   <input type="text" className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-accent/50" placeholder="e.g. Scouring on rod..." />
                 </div>
               </div>
               <button className="text-sm text-brand-accent font-bold hover:text-orange-700 flex items-center transition-colors">
                 <Plus className="w-4 h-4 mr-1.5" /> Append Another Asset
               </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
               <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Review & Initialize Job</h2>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 md:p-6 max-w-lg mx-auto text-left space-y-4 shadow-inner">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Client Identity</span>
                <strong className="text-slate-800 text-sm">Rustenburg Platinum Mine</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Operational Priority</span>
                <strong className="text-red-600 text-sm uppercase">Urgent</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Ingress Waybill</span>
                <strong className="text-slate-800 text-sm font-mono">WB-009123</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Asset Volume</span>
                <strong className="text-slate-800 text-sm">1x Hydraulic Cylinder</strong>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all">Previous Phase</button>
          ) : <div className="hidden sm:block"></div>}
          
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-brand-navy hover:bg-slate-800 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-slate-200">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <Link to="/jobs" className="w-full sm:w-auto px-8 py-3 text-sm font-black uppercase tracking-wider text-white bg-brand-accent hover:bg-orange-600 rounded-xl transition-all shadow-lg shadow-orange-200 text-center">
              Instantiate Job PRO-2024-006
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

