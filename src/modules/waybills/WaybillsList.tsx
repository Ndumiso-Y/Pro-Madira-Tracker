import { useState } from 'react';
import { Truck, Copy } from 'lucide-react';

export default function WaybillsList() {
  const [tab, setTab] = useState('mine');

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-slate-50 gap-4">
        <h2 className="text-xl font-bold text-brand-navy flex items-center shrink-0">
          <Truck className="w-5 h-5 mr-2 text-slate-400 shrink-0" /> Waybills Matrix
        </h2>
        
        <div className="flex bg-slate-200 p-1 rounded-xl w-full lg:w-auto overflow-x-auto scrollbar-hide">
          <button 
             onClick={() => setTab('mine')}
             className={`flex-1 lg:flex-none px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${tab === 'mine' ? 'bg-white shadow-md text-brand-navy' : 'text-slate-500 hover:text-slate-700'}`}>
            Mine / Client Records
          </button>
          <button 
             onClick={() => setTab('internal')}
             className={`flex-1 lg:flex-none px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${tab === 'internal' ? 'bg-white shadow-md text-brand-navy' : 'text-slate-500 hover:text-slate-700'}`}>
            Internal / OEM Dispatch
          </button>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="lg:hidden flex-1 overflow-auto bg-[#fafafa] p-4 space-y-4">
        {tab === 'mine' && (
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Waybill</p>
                <p className="font-bold text-brand-navy text-base flex items-center gap-2">
                  WB-19920
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-brand-accent transition-colors"><Copy className="w-3.5 h-3.5"/></button>
                </p>
              </div>
              <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-200 shrink-0">Logged</span>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Source Client</p>
                <p className="text-sm font-bold text-slate-700">Rustenburg Platinum</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Associated Job</p>
                <p className="text-sm font-bold text-brand-accent">PRO-2024-001</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Received Date</p>
                <p className="text-sm font-medium text-slate-600">Oct 12, 2024</p>
              </div>
            </div>
          </div>
        )}
        {tab === 'internal' && (
          <>
            {[
              { wb: 'WB-INT-441', oem: 'ValveMaster SA', job: 'PRO-2024-003', dispatch: 'Oct 14, 2024', sla: 'Oct 28, 2024', status: 'Dispatched', sc: 'bg-blue-100 text-blue-700 border-blue-200' },
              { wb: 'WB-INT-442', oem: 'PneumaPro Services', job: 'PRO-2024-002', dispatch: 'Oct 05, 2024', sla: 'Oct 19, 2024', status: 'Returned', sc: 'bg-green-100 text-green-700 border-green-200' },
            ].map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Internal WB</p>
                    <p className="font-bold text-brand-navy text-base flex items-center gap-2">
                      {row.wb}
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-brand-accent transition-colors"><Copy className="w-3.5 h-3.5"/></button>
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0 ${row.sc}`}>{row.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Destination OEM</p>
                    <p className="text-sm font-bold text-slate-700">{row.oem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Linked Job</p>
                    <p className="text-sm font-bold text-brand-accent">{row.job}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Dispatch Date</p>
                    <p className="text-sm font-medium text-slate-600">{row.dispatch}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">SLA Deadline</p>
                    <p className="text-sm font-medium text-slate-600">{row.sla}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block flex-1 overflow-auto bg-white">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-[#f8fafc] text-slate-500 font-bold sticky top-0 shadow-sm border-b border-slate-200 z-10 uppercase text-[10px] tracking-widest">
            {tab === 'mine' ? (
              <tr>
                <th className="px-6 py-5">Waybill #</th>
                <th className="px-6 py-5">Source Client</th>
                <th className="px-6 py-5">Associated Job</th>
                <th className="px-6 py-5">Received Date</th>
                <th className="px-6 py-5 text-right">Status</th>
              </tr>
            ) : (
              <tr>
                <th className="px-6 py-5">Internal WB #</th>
                <th className="px-6 py-5">Destination OEM</th>
                <th className="px-6 py-5">Linked Job</th>
                <th className="px-6 py-5">Dispatch Date</th>
                <th className="px-6 py-5">SLA Deadline</th>
                <th className="px-6 py-5 text-right">Return Status</th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tab === 'mine' && (
              <tr className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-bold text-brand-navy">
                  <div className="flex items-center gap-2">
                    WB-19920
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-brand-accent transition-colors"><Copy className="w-3.5 h-3.5"/></button>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-700">Rustenburg Platinum</td>
                <td className="px-6 py-4">
                  <span className="text-brand-accent hover:underline cursor-pointer font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100">PRO-2024-001</span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">Oct 12, 2024</td>
                <td className="px-6 py-4 text-right">
                  <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-200">Logged</span>
                </td>
              </tr>
            )}
            {tab === 'internal' && (
              <>
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-brand-navy">
                    <div className="flex items-center gap-2">
                      WB-INT-441
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-brand-accent transition-colors"><Copy className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">ValveMaster SA</td>
                  <td className="px-6 py-4">
                    <span className="text-brand-accent hover:underline cursor-pointer font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100">PRO-2024-003</span>
                  </td>
                  <td className="px-6 py-4 text-slate-800 font-medium whitespace-nowrap">Oct 14, 2024</td>
                  <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">Oct 28, 2024</td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-200">Dispatched</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-brand-navy">
                    <div className="flex items-center gap-2">
                      WB-INT-442
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-brand-accent transition-colors"><Copy className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">PneumaPro Services</td>
                  <td className="px-6 py-4">
                    <span className="text-brand-accent hover:underline cursor-pointer font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100">PRO-2024-002</span>
                  </td>
                  <td className="px-6 py-4 text-slate-800 font-medium whitespace-nowrap">Oct 05, 2024</td>
                  <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">Oct 19, 2024</td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-200">Returned</span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
