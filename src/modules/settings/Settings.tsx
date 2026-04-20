import { User, Bell, Shield, Paintbrush, ChevronRight } from 'lucide-react';

export default function Settings() {
  return (
    <div className="h-full flex flex-col lg:flex-row bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
      {/* Settings Navigation */}
      <div className="w-full lg:w-72 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 shrink-0 overflow-x-auto lg:overflow-y-auto">
        <ul className="flex flex-row lg:flex-col gap-2 min-w-max lg:min-w-0">
          <li className="flex-1 lg:flex-none">
             <button className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm border border-slate-200 rounded-xl text-sm font-bold text-brand-navy group transition-all">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-3 text-brand-accent transition-transform group-hover:scale-110" /> 
                  <span className="whitespace-nowrap">Profile & Account</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 hidden lg:block" />
             </button>
          </li>
          <li className="flex-1 lg:flex-none">
             <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-200/50 rounded-xl text-sm font-bold text-slate-500 transition-all group">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-3 text-slate-400 transition-transform group-hover:scale-110" /> 
                  <span className="whitespace-nowrap">Team & Roles</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 hidden lg:block" />
             </button>
          </li>
          <li className="flex-1 lg:flex-none">
             <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-200/50 rounded-xl text-sm font-bold text-slate-500 transition-all group">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-3 text-slate-400 transition-transform group-hover:scale-110" /> 
                  <span className="whitespace-nowrap">Reminders</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 hidden lg:block" />
             </button>
          </li>
        </ul>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-5 md:p-10 overflow-y-auto">
         <div className="max-w-2xl">
           <h2 className="text-2xl md:text-3xl font-black text-brand-navy mb-8 tracking-tight">Identity & Security</h2>
           
           <div className="space-y-10">
             <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
               <div className="w-24 h-24 bg-brand-navy rounded-full flex items-center justify-center text-3xl font-black text-white shadow-xl ring-4 ring-white">
                 OP
               </div>
               <div className="text-center sm:text-left flex-1 min-w-0">
                 <h3 className="text-xl font-bold text-slate-800 tracking-tight">Operational Account</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 mb-4">Level 4 Node Controller</p>
                 <button className="text-xs font-black text-brand-accent uppercase tracking-widest border-2 border-brand-accent/20 rounded-lg px-4 py-2 hover:bg-orange-50 transition-all focus:ring-4 focus:ring-orange-100 outline-none active:scale-95">Change Terminal Avatar</button>
               </div>
             </div>

             <div className="border-t border-slate-100 pt-8 space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Primary Node Name</label>
                   <input type="text" defaultValue="Operational" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none text-sm font-bold shadow-inner transition-all" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Access Identity</label>
                   <input type="text" defaultValue="User" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none text-sm font-bold shadow-inner transition-all" />
                 </div>
                 <div className="sm:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Secure Channel Email</label>
                   <input type="email" defaultValue="ops@promodira.co.za" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 outline-none text-sm font-bold shadow-inner transition-all" />
                 </div>
               </div>
               
               <div className="flex pt-4">
                 <button className="w-full sm:w-auto px-8 py-3 bg-brand-navy text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">Synchronize Profile Datapoints</button>
               </div>
             </div>

             <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 md:p-8 flex items-start gap-5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent opacity-[0.03] rounded-bl-full pointer-events-none"></div>
               <div className="p-3 bg-white rounded-2xl shadow-sm border border-orange-100 shrink-0">
                  <Paintbrush className="w-6 h-6 text-brand-accent" />
               </div>
               <div>
                 <h4 className="font-extrabold text-orange-900 text-lg tracking-tight mb-1">Module Pipeline: Extended APIs</h4>
                 <p className="text-xs md:text-sm text-orange-800/70 font-medium leading-relaxed">Sage One financial synchronization and carrier webhooks are currently in staging. Integration credentials will be manageable from this terminal in the next update.</p>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
