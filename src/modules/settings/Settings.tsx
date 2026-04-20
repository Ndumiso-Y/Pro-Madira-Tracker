import { User, Bell, Shield, Paintbrush } from 'lucide-react';

export default function Settings() {
  return (
    <div className="h-full flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0">
        <ul className="space-y-1">
          <li>
             <button className="w-full flex items-center px-4 py-2.5 bg-white shadow-sm border border-slate-200 rounded-lg text-sm font-bold text-brand-navy">
               <User className="w-4 h-4 mr-3 text-brand-accent" /> Profile & Account
             </button>
          </li>
          <li>
             <button className="w-full flex items-center px-4 py-2.5 hover:bg-slate-200/50 rounded-lg text-sm font-medium text-slate-600 transition-colors">
               <Shield className="w-4 h-4 mr-3 text-slate-400" /> Team & Roles
             </button>
          </li>
          <li>
             <button className="w-full flex items-center px-4 py-2.5 hover:bg-slate-200/50 rounded-lg text-sm font-medium text-slate-600 transition-colors">
               <Bell className="w-4 h-4 mr-3 text-slate-400" /> SLA Reminders
             </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
         <h2 className="text-2xl font-bold text-brand-navy mb-6">Profile Settings</h2>
         
         <div className="max-w-xl space-y-6">
           <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-brand-navy rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-inner">
               OP
             </div>
             <div>
               <h3 className="text-lg font-bold text-slate-800">Operational User</h3>
               <p className="text-sm text-slate-500 mb-2">Role: Operations Controller</p>
               <button className="text-sm font-medium text-brand-accent border border-brand-accent/30 rounded px-3 py-1 hover:bg-orange-50 transition-colors">Change Avatar</button>
             </div>
           </div>

           <div className="border-t border-slate-100 pt-6 space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-sm font-medium text-slate-700">First Name</label>
                 <input type="text" defaultValue="Operational" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none text-sm" />
               </div>
               <div className="space-y-1">
                 <label className="text-sm font-medium text-slate-700">Last Name</label>
                 <input type="text" defaultValue="User" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none text-sm" />
               </div>
               <div className="col-span-2 space-y-1">
                 <label className="text-sm font-medium text-slate-700">Email Address</label>
                 <input type="email" defaultValue="ops@promodira.co.za" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none text-sm" />
               </div>
             </div>
             
             <button className="px-6 py-2.5 bg-brand-navy text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">Save Changes</button>
           </div>
         </div>
         
         <div className="mt-12 max-w-xl bg-orange-50 border border-orange-200 rounded-xl p-5 flex gap-4">
           <Paintbrush className="w-10 h-10 text-orange-600 shrink-0" />
           <div>
             <h4 className="font-bold text-orange-800 mb-1">Coming Soon: Extended Integrations</h4>
             <p className="text-sm text-orange-700">Sage Accounting APIs and Coupa submission gateways are slated for Phase 2 deployments. Config options will appear here.</p>
           </div>
         </div>
      </div>
    </div>
  );
}
