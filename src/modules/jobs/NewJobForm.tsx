import { useState } from 'react';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewJobForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Stepper */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-brand-navy mb-6">Capture New Job</h1>
        <div className="flex items-center">
          {[
             { num: 1, label: 'Client Details' },
             { num: 2, label: 'Line Items' },
             { num: 3, label: 'Review' }
          ].map((s, i) => (
            <div key={s.num} className="flex-1 flex items-center">
               <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= s.num ? 'bg-brand-accent text-white' : 'bg-slate-200 text-slate-500'} font-bold text-sm`}>
                 {step > s.num ? <Check className="w-4 h-4" /> : s.num}
               </div>
               <span className={`ml-3 text-sm font-medium ${step >= s.num ? 'text-brand-navy' : 'text-slate-400'}`}>{s.label}</span>
               {i < 2 && <div className={`flex-1 h-1 mx-4 rounded-full ${step > s.num ? 'bg-brand-accent' : 'bg-slate-100'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Client & Collection</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Client / Mine Site</label>
                <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent outline-none">
                  <option>Select client...</option>
                  <option>Rustenburg Platinum Mine</option>
                  <option>Sibanye Stillwater</option>
                  <option>Anglo American Platinum</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Priority Level</label>
                <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent outline-none">
                  <option>Standard (14 days SLA)</option>
                  <option>Urgent (3 days SLA)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Mine Waybill Reference</label>
                <input type="text" placeholder="e.g. WB-009123" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Mine Waybill Date</label>
                <input type="date" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent outline-none" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Asset Line Items</h2>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
               <div className="grid grid-cols-12 gap-4">
                 <div className="col-span-4 space-y-2">
                   <label className="block text-xs font-medium text-slate-700 uppercase">Asset Type</label>
                   <select className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none">
                     <option>Hydraulic Cylinder</option>
                     <option>Pump</option>
                     <option>Valve</option>
                     <option>Motor</option>
                   </select>
                 </div>
                 <div className="col-span-4 space-y-2">
                   <label className="block text-xs font-medium text-slate-700 uppercase">Serial Number</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none" placeholder="SN-..." />
                 </div>
                 <div className="col-span-4 space-y-2">
                   <label className="block text-xs font-medium text-slate-700 uppercase">Description / Notes</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded-md text-sm outline-none" placeholder="Leaking seals..." />
                 </div>
               </div>
               <button className="text-sm text-brand-accent font-medium hover:underline">+ Add another item</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-800">Review & Submit</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-lg mx-auto text-left space-y-3">
              <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Client:</span> <strong className="text-slate-800">Rustenburg Platinum Mine</strong></p>
              <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Priority:</span> <strong className="text-red-600">Urgent</strong></p>
              <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Waybill Ref:</span> <strong className="text-slate-800">WB-009123</strong></p>
              <p className="text-sm"><span className="text-slate-500 w-32 inline-block">Items:</span> <strong className="text-slate-800">1x Hydraulic Cylinder</strong></p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors">Back</button>
          ) : <div></div>}
          
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="px-5 py-2.5 text-sm font-medium text-white bg-brand-navy hover:bg-slate-800 rounded-lg transition-colors flex items-center">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <Link to="/jobs" className="px-6 py-2.5 text-sm font-bold text-white bg-brand-accent hover:bg-orange-700 rounded-lg transition-colors shadow-md">
              Create Job PRO-2024-006
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
