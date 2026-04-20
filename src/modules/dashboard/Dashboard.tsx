import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { mockData, statusColors, priorityColors } from '../../lib/utils';
import { AlertCircle, CheckCircle2, Clock, Activity, TrendingUp, TrendingDown } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Active Jobs', value: mockData.kpis.totalActive, icon: Activity, trend: '+12% vs last week', trendUp: true, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'Awaiting Action', value: mockData.kpis.awaitingAction, icon: Clock, trend: '-2 since yesterday', trendUp: true, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Overdue (>14d)', value: mockData.kpis.overdue, icon: AlertCircle, trend: '+3 critical alerts', trendUp: false, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
          { label: 'Closed This Month', value: mockData.kpis.closedThisMonth, icon: CheckCircle2, trend: '+24% vs last month', trendUp: true, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.border} border`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <span className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full bg-slate-50 border border-slate-100 ${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trendUp ? <TrendingUp className="w-3 h-3 mr-1"/> : <TrendingDown className="w-3 h-3 mr-1"/>}
                {kpi.trend}
              </span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-brand-navy tracking-tight">{kpi.value}</p>
              <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 lg:col-span-1 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-navy tracking-tight">Active Pipeline Volume</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">Real-time job distribution across statuses</p>
          </div>
          <div className="h-[280px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.chartData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 600}} width={80} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600, fontSize: '13px'}} 
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                  {mockData.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#ea580c' : '#0f172a'} opacity={index === 4 ? 1 : 0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Table */}
        <div className="bg-white p-0 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white text-brand-navy">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Requires Attention</h3>
              <p className="text-xs font-medium text-slate-400 mt-1 whitespace-nowrap">Jobs exceeding age limits or awaiting input</p>
            </div>
            <button className="text-brand-accent text-sm font-bold px-4 py-2 hover:bg-brand-accent/5 rounded-lg transition-colors border border-transparent hover:border-brand-accent/20">View all priority</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-[#f8fafc] text-slate-500 font-bold border-b border-slate-200 shadow-sm">
                <tr>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest w-32">Job Reference</th>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Client & Asset</th>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest">Pipeline Status</th>
                  <th className="px-6 py-4 uppercase text-[10px] tracking-widest text-right">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {mockData.recentJobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-brand-navy group-hover:text-brand-accent transition-colors">{job.id}</div>
                      <span className={`status-badge mt-1 text-[9px] ${priorityColors[job.priority]}`}>{job.priority}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{job.client}</p>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">{job.asset}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`status-badge border ${statusColors[job.status]}`}>{job.status.replace(/_/g, ' ')}</span>
                      <p className="text-[10px] text-slate-400 mt-1.5 flex items-center"><Clock className="w-3 h-3 mr-1"/> Assigned: {job.assignedTo}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className={`font-bold text-base ${job.age > 14 ? 'text-red-600' : job.age > 7 ? 'text-amber-600' : 'text-slate-700'}`}>{job.age} d</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
