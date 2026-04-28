import { Link } from 'react-router-dom';
import { Plus, Filter, HardDrive, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';
import { getStatusColor, priorityColors } from '../../lib/utils';

function JobAge({ createdAt }: { createdAt: string }) {
  const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000);
  const color = days > 14 ? 'text-red-500' : days > 7 ? 'text-amber-500' : 'text-slate-700';
  return <span className={`font-bold flex items-center gap-1 ${color}`}><Clock className="w-3.5 h-3.5" />{days}d</span>;
}

export default function JobList() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-slate-100">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-medium">Loading jobs…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-slate-100">
        <div className="text-center max-w-sm px-6">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700 mb-1">Failed to load jobs</p>
          <p className="text-xs text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  const activeCount = jobs.length;

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 md:px-6 md:py-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between shrink-0 bg-white shadow-sm relative z-20 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-navy tracking-tight">Active Pipeline</h2>
            <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase">
              {activeCount} ACTIVE
            </span>
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-400 mt-1">
            {activeCount} operation{activeCount !== 1 ? 's' : ''} in the pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 md:py-2.5 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors shadow-sm">
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            Filters
          </button>
          <Link
            to="/jobs/new"
            className="flex-1 sm:flex-none flex items-center justify-center px-5 py-2 md:py-2.5 text-sm font-bold text-white bg-brand-accent rounded-lg hover:bg-[#d04a08] transition-colors shadow-[0_4px_10px_-2px_rgba(234,88,12,0.3)]"
          >
            <Plus className="w-[18px] h-[18px] mr-2" />
            New Job
          </Link>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <HardDrive className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="font-bold text-slate-400 text-sm">No jobs in the pipeline</p>
            <p className="text-xs text-slate-300 mt-1">Create the first job to get started.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile card list */}
          <div className="lg:hidden flex-1 overflow-auto bg-[#fafafa] p-4 space-y-4">
            {jobs.map(job => (
              <Link
                to={`/jobs/${job.id}`}
                key={job.id}
                className="block bg-white rounded-xl p-4 border border-slate-200 shadow-sm active:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-brand-navy tracking-widest uppercase opacity-60">{job.job_number}</span>
                    <h3 className="font-bold text-slate-800 text-base">{job.client?.name ?? '—'}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </div>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className={`status-badge text-[9px] ${priorityColors[job.urgency]}`}>{job.urgency}</span>
                  <span className={`status-badge border text-[9px] ${getStatusColor(job.status)}`}>{job.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Asset</span>
                    <p className="text-xs font-bold text-slate-700 flex items-center truncate">
                      <HardDrive className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                      {job.asset_type ?? '—'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Age</span>
                    <JobAge createdAt={job.created_at} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block flex-1 overflow-auto bg-[#fafafa]">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-[#f8fafc] text-slate-500 font-bold sticky top-0 z-10 shadow-sm border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Job Reference</th>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Client</th>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Asset</th>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Status</th>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest text-center">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <Link to={`/jobs/${job.id}`} className="font-extrabold text-brand-navy group-hover:text-brand-accent transition-colors text-[15px]">
                        {job.job_number}
                      </Link>
                      <div className="mt-1">
                        <span className={`status-badge ${priorityColors[job.urgency]}`}>{job.urgency}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{job.client?.name ?? '—'}</p>
                      <p className="text-xs text-slate-400 font-medium">{job.client?.site_name ?? ''}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 flex items-center">
                        <HardDrive className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        {job.asset_type ?? '—'}
                      </p>
                      {job.asset_description && (
                        <p className="text-xs text-slate-400 font-medium mt-0.5 ml-5 truncate max-w-[200px]">{job.asset_description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`status-badge border ${getStatusColor(job.status)}`}>{job.status}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <JobAge createdAt={job.created_at} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
