import { FileText, Download, Filter, Search } from 'lucide-react';

export default function DocumentList() {
  const docs = [
    { name: 'Mine_Waybill_001.pdf', type: 'Waybill', job: 'PRO-2024-001', date: 'Oct 12, 2024', user: 'Ops User', size: '1.2 MB' },
    { name: 'Quote_Approval_Signoff.pdf', type: 'Approval', job: 'PRO-2024-002', date: 'Oct 11, 2024', user: 'Jane Doe', size: '0.8 MB' },
    { name: 'ValveMaster_Assessment.pdf', type: 'Assessment', job: 'PRO-2024-003', date: 'Oct 10, 2024', user: 'ValveMaster SA', size: '3.4 MB' },
    { name: 'Delivery_Note_099.pdf', type: 'Delivery Note', job: 'PRO-2024-004', date: 'Oct 09, 2024', user: 'Ops User', size: '1.1 MB' },
    { name: 'Photo_Proof_Damage.jpg', type: 'Image', job: 'PRO-2024-003', date: 'Oct 10, 2024', user: 'Workshop', size: '4.5 MB' },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Document Center</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search files..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent outline-none" />
          </div>
          <button className="flex items-center px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"><Filter className="w-4 h-4 mr-2"/>Filter</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
         <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10 shadow-sm border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 uppercase tracking-wider text-xs">File Name</th>
              <th className="px-6 py-4 uppercase tracking-wider text-xs">Type</th>
              <th className="px-6 py-4 uppercase tracking-wider text-xs">Associated Job</th>
              <th className="px-6 py-4 uppercase tracking-wider text-xs">Uploaded</th>
              <th className="px-6 py-4 uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {docs.map((doc, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-brand-accent">
                    <FileText className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{doc.name}</p>
                    <p className="text-xs text-slate-400">{doc.size}</p>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">{doc.type}</span></td>
                <td className="px-6 py-4 font-semibold text-brand-accent">{doc.job}</td>
                <td className="px-6 py-4">
                  <p className="text-slate-800">{doc.date}</p>
                  <p className="text-xs text-slate-400">by {doc.user}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-brand-accent p-2"><Download className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
