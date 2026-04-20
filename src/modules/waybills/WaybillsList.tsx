import { useState } from 'react';
import { Truck, Copy } from 'lucide-react';

export default function WaybillsList() {
  const [tab, setTab] = useState('mine');

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50">
        <h2 className="text-xl font-bold text-brand-navy flex items-center mb-4 sm:mb-0">
          <Truck className="w-5 h-5 mr-2 text-slate-400" /> Waybills Matrix
        </h2>
        
        <div className="flex bg-slate-200 p-1 rounded-lg">
          <button 
             onClick={() => setTab('mine')}
             className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${tab === 'mine' ? 'bg-white shadow-sm text-brand-navy' : 'text-slate-500 hover:text-slate-700'}`}>
            Mine / Client Waybills
          </button>
          <button 
             onClick={() => setTab('internal')}
             className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${tab === 'internal' ? 'bg-white shadow-sm text-brand-navy' : 'text-slate-500 hover:text-slate-700'}`}>
            Internal / OEM Dispatch
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-white text-slate-500 font-medium sticky top-0 shadow-sm border-b border-slate-200">
            {tab === 'mine' ? (
              <tr>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Waybill #</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Source Client</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Associated Job</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Received Date</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs text-right">Status</th>
              </tr>
            ) : (
               <tr>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Internal WB #</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Destination OEM</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Associated Job</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Dispatch Date</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">SLA Return Date</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs text-right">Return Status</th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tab === 'mine' && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-brand-navy flex items-center gap-2">WB-19920 <Copy className="w-3 h-3 text-slate-300 cursor-pointer hover:text-brand-accent"/></td>
                <td className="px-6 py-4 font-medium">Rustenburg Platinum</td>
                <td className="px-6 py-4 text-brand-accent hover:underline cursor-pointer font-medium">PRO-2024-001</td>
                <td className="px-6 py-4 text-slate-500">Oct 12, 2024</td>
                <td className="px-6 py-4 text-right"><span className="bg-green-50 text-green-700 px-2.5 py-1 rounded text-xs font-semibold uppercase">Logged</span></td>
              </tr>
            )}
            {tab === 'internal' && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-brand-navy flex items-center gap-2">WB-INT-441 <Copy className="w-3 h-3 text-slate-300 cursor-pointer hover:text-brand-accent"/></td>
                <td className="px-6 py-4 font-medium">ValveMaster SA</td>
                <td className="px-6 py-4 text-brand-accent hover:underline cursor-pointer font-medium">PRO-2024-003</td>
                <td className="px-6 py-4 text-slate-800">Oct 14, 2024</td>
                <td className="px-6 py-4 text-slate-500">Oct 28, 2024</td>
                <td className="px-6 py-4 text-right"><span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded text-xs font-semibold uppercase">Dispatched</span></td>
              </tr>
            )}
            {/* Mock duplication for visual density */}
            {tab === 'internal' && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-brand-navy flex items-center gap-2">WB-INT-442 <Copy className="w-3 h-3 text-slate-300 cursor-pointer hover:text-brand-accent"/></td>
                <td className="px-6 py-4 font-medium">PneumaPro Services</td>
                <td className="px-6 py-4 text-brand-accent hover:underline cursor-pointer font-medium">PRO-2024-002</td>
                <td className="px-6 py-4 text-slate-800">Oct 05, 2024</td>
                <td className="px-6 py-4 text-slate-500">Oct 19, 2024</td>
                <td className="px-6 py-4 text-right"><span className="bg-green-50 text-green-700 px-2.5 py-1 rounded text-xs font-semibold uppercase">Returned</span></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
