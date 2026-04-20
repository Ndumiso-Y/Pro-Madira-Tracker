import { Link } from 'react-router-dom';
import { Plus, Filter, HardDrive, Clock } from 'lucide-react';
import { mockData, statusColors, priorityColors } from '../../lib/utils';

export default function JobList() {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden animate-in fade-in duration-300">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white shadow-sm relative z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-brand-navy tracking-tight">Active Pipeline</h2>
            <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-2.5 py-1 rounded-md text-xs font-bold tracking-wide">12 ACTIVE</span>
          </div>
          <p className="text-sm font-medium text-slate-400 mt-1">Found 12 matching operations from 4 clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors shadow-sm focus:ring-2 focus:ring-slate-200">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            Filters
          </button>
          <Link to="/jobs/new" className="flex items-center px-5 py-2.5 text-sm font-bold text-white bg-brand-accent rounded-lg hover:bg-[#d04a08] transition-colors shadow-[0_4px_10px_-2px_rgba(234,88,12,0.3)] focus:ring-2 focus:ring-orange-300">
            <Plus className="w-[18px] h-[18px] mr-2" />
            New Job
          </Link>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-[#fafafa]">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-[#f8fafc] text-slate-500 font-bold sticky top-0 z-10 shadow-sm border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Job Reference</th>
              <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Client Integration</th>
              <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Asset Details</th>
              <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Status Matrix</th>
              <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Age</th>
              <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Ownership</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {mockData.recentJobs.concat(mockData.recentJobs).map((job, i) => (
              <tr key={job.id + i} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <Link to={`/jobs/${job.id}`} className="font-extrabold text-brand-navy group-hover:text-brand-accent transition-colors text-[15px]">{job.id}</Link>
                    <div className="mt-1">
                      <span className={`status-badge ${priorityColors[job.priority]}`}>{job.priority}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <p className="font-bold text-slate-800">{job.client}</p>
                   <p className="text-xs text-slate-400 font-medium">Rustenburg Area</p>
                </td>
                <td className="px-6 py-4">
                   <p className="font-bold text-slate-700 flex items-center"><HardDrive className="w-3.5 h-3.5 mr-1.5 text-slate-400"/> {job.asset}</p>
                   <p className="text-xs text-slate-400 font-medium mt-0.5 ml-5">Qty: 1 Unit</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`status-badge border ${statusColors[job.status]}`}>{job.status.replace(/_/g, ' ')}</span>
                </td>
                <td className="px-6 py-4">
                  <div className={`font-bold text-base flex items-center ${job.age > 14 ? 'text-red-500' : job.age > 7 ? 'text-amber-500' : 'text-slate-700'}`}>
                    <Clock className={`w-4 h-4 mr-1.5 ${job.age > 14 ? 'text-red-400' : job.age > 7 ? 'text-amber-400' : 'text-slate-300'}`}/>
                    {job.age}d
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-500 border border-slate-200">
                      {job.assignedTo.charAt(0)}
                    </div>
                    {job.assignedTo}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
