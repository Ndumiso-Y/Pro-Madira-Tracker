import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText, ArrowRight, Truck, Wrench, FileCheck, Clock,
  UploadCloud, ChevronRight, ChevronLeft, AlertCircle, X, CheckCircle2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useJob } from '../../hooks/useJobs';
import { useAuth } from '../../contexts/AuthContext';
import { getStatusColor, priorityColors } from '../../lib/utils';
import { PreviewBadge } from '../../components/PreviewBadge';
import type { StatusLog, JobDocument } from '../../types';
import { JOB_STATUSES } from '../../types';

const STEPPER_STATUSES = [
  'Requested', 'Collected', 'At Workshop', 'At OEM',
  'Quoting', 'Awaiting Approval', 'In Repair', 'Ready for Delivery', 'Delivered', 'Closed',
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-ZA', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ─── Status Update Modal ─────────────────────────────────────────────────────

interface StatusModalProps {
  currentStatus: string;
  onClose: () => void;
  onSave: (newStatus: string, note: string) => Promise<void>;
}

function StatusModal({ currentStatus, onClose, onSave }: StatusModalProps) {
  const [nextStatus, setNextStatus] = useState(currentStatus);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (nextStatus === currentStatus) { onClose(); return; }
    setSaving(true);
    await onSave(nextStatus, note);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-black text-brand-navy">Update Status</h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">New Status</label>
            <select
              value={nextStatus}
              onChange={e => setNextStatus(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none"
            >
              {JOB_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Note (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              placeholder="Add context for this status change…"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 bg-brand-navy text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {saving ? 'Saving…' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const { job, loading, error, refetch } = useJob(id);
  const { user } = useAuth();

  const [statusLogs, setStatusLogs] = useState<StatusLog[]>([]);
  const [documents, setDocuments] = useState<JobDocument[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('status_logs')
      .select('*')
      .eq('job_id', id)
      .order('changed_at', { ascending: false })
      .then(({ data }) => setStatusLogs((data as StatusLog[]) ?? []));

    supabase
      .from('job_documents')
      .select('*')
      .eq('job_id', id)
      .order('uploaded_at', { ascending: false })
      .then(({ data }) => setDocuments((data as JobDocument[]) ?? []));
  }, [id]);

  async function handleStatusUpdate(newStatus: string, note: string) {
    if (!job) return;
    const { error: updateErr } = await supabase
      .from('jobs')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', job.id);

    if (updateErr) return;

    await supabase.from('status_logs').insert([{
      job_id: job.id,
      previous_status: job.status,
      new_status: newStatus,
      changed_by: user?.id ?? null,
      note: note || null,
    }]);

    setShowStatusModal(false);
    await refetch();
    // Refresh logs
    const { data } = await supabase
      .from('status_logs')
      .select('*')
      .eq('job_id', job.id)
      .order('changed_at', { ascending: false });
    setStatusLogs((data as StatusLog[]) ?? []);
  }

  async function handleFileUpload(files: FileList | null) {
    if (!files || !files[0] || !job) return;
    setUploadLoading(true);
    setUploadError('');
    setUploadSuccess(false);

    const file = files[0];
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${job.id}/${Date.now()}_${safeName}`;

    const { error: uploadErr } = await supabase.storage
      .from('job-documents')
      .upload(path, file);

    if (uploadErr) {
      setUploadError(uploadErr.message);
      setUploadLoading(false);
      return;
    }

    await supabase.from('job_documents').insert([{
      job_id: job.id,
      file_name: file.name,
      storage_path: path,
      mime_type: file.type || null,
      uploaded_by: user?.id ?? null,
    }]);

    // Refresh document list
    const { data } = await supabase
      .from('job_documents')
      .select('*')
      .eq('job_id', job.id)
      .order('uploaded_at', { ascending: false });
    setDocuments((data as JobDocument[]) ?? []);
    setUploadSuccess(true);
    setUploadLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => setUploadSuccess(false), 3000);
  }

  async function handleDownload(doc: JobDocument) {
    const { data } = await supabase.storage.from('job-documents').createSignedUrl(doc.storage_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="font-bold text-slate-700 text-sm mb-1">Job not found</p>
          <p className="text-xs text-slate-400 mb-4">{error}</p>
          <Link to="/jobs" className="text-brand-accent text-sm font-bold hover:underline">← Back to jobs</Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = Math.max(STEPPER_STATUSES.findIndex(s => s === job.status), 0);
  const progressPct = STEPPER_STATUSES.length > 1
    ? (currentStepIndex / (STEPPER_STATUSES.length - 1)) * 100
    : 0;

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8 lg:pb-2">
      {showStatusModal && (
        <StatusModal
          currentStatus={job.status}
          onClose={() => setShowStatusModal(false)}
          onSave={handleStatusUpdate}
        />
      )}

      {/* LEFT PANEL */}
      <div className="flex-1 space-y-6 lg:w-[60%] xl:w-[65%] min-w-0">

        {/* Header Card */}
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-brand-accent opacity-[0.03] rounded-bl-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{job.client?.name ?? '—'}</p>
              <h1 className="text-xl md:text-3xl font-black text-brand-navy tracking-tight flex flex-wrap items-center gap-1 md:gap-2">
                {job.job_number}
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300" />
                <span className="text-lg md:text-xl font-bold text-slate-600">Asset File</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {job.asset_type ?? '—'}{job.asset_description ? ` · ${job.asset_description}` : ''}
              </p>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
              <span className={`status-badge px-2 md:px-3 py-1 ${getStatusColor(job.status)}`}>{job.status}</span>
              <span className={`status-badge opacity-80 ${priorityColors[job.urgency]}`}>{job.urgency}</span>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="mt-6 md:mt-8 relative bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100 shadow-inner">
            <div className="overflow-hidden h-2 md:h-2.5 mb-4 md:mb-6 text-xs flex rounded-full bg-slate-200 shadow-inner">
              <div style={{ width: `${progressPct}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-accent transition-all duration-700" />
            </div>
            <div className="flex justify-between overflow-x-auto pb-2 scrollbar-hide">
              {STEPPER_STATUSES.map((status, i) => (
                <div key={status} className="text-center min-w-[60px] md:min-w-[70px] flex flex-col items-center">
                  <div className={`w-1.5 h-1.5 rounded-full mb-2 ${i <= currentStepIndex ? 'bg-brand-accent' : 'bg-slate-300'}`} />
                  <span className={`text-[8px] md:text-[10px] font-bold tracking-wider leading-tight text-center ${i <= currentStepIndex ? 'text-brand-navy' : 'text-slate-400'}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowStatusModal(true)}
              className="w-full sm:w-auto bg-brand-navy hover:bg-[#0a1222] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Advance Status <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Line Items — Phase 2 preview */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-extrabold text-brand-navy text-base md:text-lg flex items-center tracking-tight">
              <Wrench className="w-5 h-5 mr-2 text-brand-accent" /> Assessed Line Items
            </h2>
            <PreviewBadge />
          </div>
          <div className="p-6 text-center text-slate-400 text-sm">
            <p className="font-medium">Line item tracking activates in Phase 2.</p>
          </div>
        </div>

        {/* Logistics — Phase 2 preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-5 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center">
                <Truck className="w-5 h-5 mr-2 text-slate-400" /> Logistics Tracking
              </h3>
              <PreviewBadge />
            </div>
            <p className="text-sm text-slate-400">Waybill tracking activates in Phase 2.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-5 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center">
                <FileText className="w-5 h-5 mr-2 text-slate-400" /> Financial Summary
              </h3>
              <PreviewBadge />
            </div>
            <p className="text-sm text-slate-400">Quote and financial data activates in Phase 2.</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col gap-6 shrink-0 lg:h-full lg:overflow-y-auto">

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-hidden min-h-[300px]">
          <div className="p-5 border-b border-slate-100 bg-white z-10">
            <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center">
              <Clock className="w-5 h-5 mr-2 text-slate-400" /> Status History
            </h3>
          </div>
          <div className="p-5 md:p-6 flex-1 overflow-y-auto bg-slate-50/50">
            {statusLogs.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">No status history yet.</p>
            ) : (
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
                {statusLogs.map((log, i) => (
                  <div key={log.id} className="pl-6 relative">
                    <div className={`absolute w-3.5 h-3.5 rounded-full -left-[8px] top-1 border-2 border-white shadow-sm ${i === 0 ? 'bg-brand-accent' : 'bg-slate-300'}`} />
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{formatDate(log.changed_at)}</p>
                    <p className="text-sm font-bold text-brand-navy leading-snug">{log.new_status}</p>
                    {log.previous_status && (
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <ChevronLeft className="w-3 h-3" /> from {log.previous_status}
                      </p>
                    )}
                    {log.note && <p className="text-xs text-slate-500 mt-1 italic">"{log.note}"</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white z-10">
            <h3 className="font-extrabold text-brand-navy tracking-tight flex items-center">
              <FileCheck className="w-5 h-5 mr-2 text-slate-400" /> Documents
            </h3>
            <label className="cursor-pointer text-slate-500 hover:text-brand-accent bg-slate-100 hover:bg-orange-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-orange-200">
              <UploadCloud className="w-4 h-4" />
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={e => handleFileUpload(e.target.files)}
              />
            </label>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-2 bg-slate-50/20 max-h-[300px]">
            {uploadError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3 py-2 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {uploadError}
              </div>
            )}
            {uploadLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium px-3 py-2">
                <span className="w-3.5 h-3.5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                Uploading…
              </div>
            )}
            {uploadSuccess && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> File uploaded successfully
              </div>
            )}

            {documents.length === 0 && !uploadLoading && (
              <p className="text-xs text-slate-400 text-center py-4">No documents attached yet.</p>
            )}

            {documents.map(doc => (
              <button
                key={doc.id}
                onClick={() => handleDownload(doc)}
                className="flex items-start gap-3 p-3 bg-white border border-slate-100 shadow-sm rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all cursor-pointer group w-full text-left"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 border bg-orange-50 text-brand-accent border-orange-100">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-brand-navy truncate group-hover:text-brand-accent transition-colors">{doc.file_name}</p>
                  <p className="text-xs text-slate-400 font-medium">{formatDate(doc.uploaded_at)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Problem Description */}
        {job.problem_description && (
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-5">
            <h3 className="font-extrabold text-brand-navy tracking-tight text-sm mb-3">Problem Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{job.problem_description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
