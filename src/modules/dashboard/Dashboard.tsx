import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Clock, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { getStatusColor, priorityColors } from '../../lib/utils';

function AgeBadge({ createdAt }: { createdAt: string }) {
  const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000);
  const color = days > 14 ? 'text-red-600' : days > 7 ? 'text-amber-600' : 'text-slate-700';
  return <span className={`font-bold text-base ${color}`}>{days} d</span>;
}

export default function Dashboard() {
  const { totalActive, awaitingAction, overdue, closedThisMonth, recentJobs, chartData, loading, error } = useDashboard();

  const kpis = [
    { label: 'Total Active Jobs', value: totalActive, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', trend: 'Live from database', trendUp: true },
    { label: 'Awaiting Action', value: awaitingAction, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', trend: 'Approval / Quoting / PO', trendUp: true },
    { label: 'Overdue (>14d)', value: overdue, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', trend: overdue > 0 ? 'Needs attention' : 'All on track', trendUp: overdue === 0 },
    { label: 'Closed This Month', value: closedThisMonth, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', trend: 'Closed / Delivered', trendUp: true },
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700 mb-1">Failed to load dashboard</p>
          <p className="text-xs text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-4 md:p-5 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.border} border`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full bg-slate-50 border border-slate-100 ${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {kpi.trend}
              </span>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">{kpi.value}</p>
              <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 lg:col-span-1 flex flex-col order-2 lg:order-1">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-navy tracking-tight">Active Pipeline Volume</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">Live job distribution across statuses</p>
          </div>
          {chartData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-sm text-slate-400 font-medium">No active jobs yet</p>
            </div>
          ) : (
            <div className="h-[250px] md:h-[280px] w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }} width={90} />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600, fontSize: '13px' }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === 'Urgent' ? '#ea580c' : entry.name === 'Delayed' ? '#dc2626' : '#0f172a'}
                        opacity={entry.name === 'Urgent' || entry.name === 'Delayed' ? 1 : 0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Requires Attention table */}
        <div className="bg-white p-0 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 lg:col-span-2 overflow-hidden flex flex-col order-1 lg:order-2">
          <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white text-brand-navy gap-3">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Requires Attention</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">Jobs exceeding age limits or awaiting input</p>
            </div>
            <Link
              to="/jobs"
              className="text-brand-accent text-sm font-bold px-4 py-2 hover:bg-brand-accent/5 rounded-lg transition-colors border border-transparent hover:border-brand-accent/20 w-fit"
            >
              View all jobs
            </Link>
          </div>

          {recentJobs.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <p className="text-sm text-slate-400 font-medium">No jobs in the pipeline yet.</p>
            </div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="lg:hidden overflow-auto flex-1 bg-[#fafafa] p-4 space-y-3">
                {recentJobs.map(job => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="block bg-white rounded-xl p-4 border border-slate-200 shadow-sm active:bg-slate-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-bold text-brand-navy tracking-widest uppercase opacity-60">{job.job_number}</span>
                        <p className="font-bold text-slate-800">{job.client?.name ?? '—'}</p>
                        <p className="text-xs text-slate-500">{job.asset_type ?? '—'}</p>
                      </div>
                      <AgeBadge createdAt={job.created_at} />
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`status-badge text-[9px] ${priorityColors[job.urgency]}`}>{job.urgency}</span>
                      <span className={`status-badge border text-[9px] ${getStatusColor(job.status)}`}>{job.status}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto flex-1">
                <table className="w-full text-left text-sm text-slate-600 min-w-[600px]">
                  <thead className="bg-[#f8fafc] text-slate-500 font-bold border-b border-slate-200 shadow-sm">
                    <tr>
                      <th className="px-6 py-4 uppercase text-[10px] tracking-widest w-36">Job Reference</th>
                      <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Client & Asset</th>
                      <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Status</th>
                      <th className="px-6 py-4 uppercase text-[10px] tracking-widest text-right">Age</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {recentJobs.map(job => (
                      <tr key={job.id} className="hover:bg-slate-50/80 transition-colors group leading-relaxed">
                        <td className="px-6 py-4">
                          <Link to={`/jobs/${job.id}`} className="font-bold text-brand-navy group-hover:text-brand-accent transition-colors">
                            {job.job_number}
                          </Link>
                          <div className="mt-1">
                            <span className={`status-badge text-[9px] ${priorityColors[job.urgency]}`}>{job.urgency}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800 line-clamp-1">{job.client?.name ?? '—'}</p>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">{job.asset_type ?? '—'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`status-badge border ${getStatusColor(job.status)}`}>{job.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <AgeBadge createdAt={job.created_at} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
