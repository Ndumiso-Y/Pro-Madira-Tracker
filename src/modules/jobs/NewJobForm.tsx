import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Client } from '../../types';
import { ASSET_TYPES } from '../../types';

const schema = z.object({
  client_id: z.string().min(1, 'Select a client'),
  urgency: z.enum(['standard', 'urgent']),
  request_date: z.string().min(1, 'Request date is required'),
  mine_waybill_ref: z.string().optional(),
  asset_type: z.string().min(1, 'Select an asset type'),
  asset_description: z.string().optional(),
  problem_description: z.string().min(5, 'Describe the problem (min 5 characters)'),
  pickup_address: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const STEPS = [
  { num: 1, label: 'Collection' },
  { num: 2, label: 'Asset' },
  { num: 3, label: 'Review' },
];

export default function NewJobForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [clients, setClients] = useState<Client[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { urgency: 'standard', request_date: new Date().toISOString().split('T')[0] },
  });

  const values = watch();

  useEffect(() => {
    supabase.from('clients').select('*').order('name').then(({ data }) => {
      if (data) setClients(data as Client[]);
    });
  }, []);

  async function goNext() {
    const stepFields: Record<number, (keyof FormValues)[]> = {
      1: ['client_id', 'urgency', 'request_date'],
      2: ['asset_type', 'problem_description'],
    };
    const valid = await trigger(stepFields[step]);
    if (valid) setStep(s => s + 1);
  }

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    setSubmitError('');

    const { data: job, error } = await supabase
      .from('jobs')
      .insert([{
        job_number: '',
        client_id: data.client_id,
        urgency: data.urgency,
        request_date: data.request_date,
        mine_waybill_ref: data.mine_waybill_ref || null,
        asset_type: data.asset_type,
        asset_description: data.asset_description || null,
        problem_description: data.problem_description,
        pickup_address: data.pickup_address || null,
        status: 'Requested',
        created_by: user?.id ?? null,
        cancelled: false,
      }])
      .select()
      .single();

    if (error) {
      setSubmitError(error.message);
      setSubmitting(false);
      return;
    }

    // Write the initial status log
    await supabase.from('status_logs').insert([{
      job_id: job.id,
      previous_status: null,
      new_status: 'Requested',
      changed_by: user?.id ?? null,
      note: 'Job created',
    }]);

    navigate(`/jobs/${job.id}`);
  }

  const selectedClient = clients.find(c => c.id === values.client_id);

  const inputCls = (hasError: boolean) =>
    `w-full p-2.5 bg-slate-50 border rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none transition-all ${hasError ? 'border-red-400 bg-red-50' : 'border-slate-200'}`;

  return (
    <div className="max-w-4xl mx-auto py-4 md:py-8 px-2 md:px-4">
      {/* Stepper */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6 text-center sm:text-left">Capture New Job</h1>
        <div className="flex items-center gap-2 max-w-2xl mx-auto sm:mx-0">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors text-sm ${step >= s.num ? 'bg-brand-accent text-white shadow-lg shadow-orange-200' : 'bg-slate-200 text-slate-500 font-bold'}`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[10px] sm:text-sm font-bold uppercase tracking-wider ${step >= s.num ? 'text-brand-navy' : 'text-slate-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${step > s.num ? 'bg-brand-accent' : 'bg-slate-100'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 p-5 md:p-8">

          {/* Step 1: Collection Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg md:text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Collection Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Client / Mine Site <span className="text-red-500">*</span></label>
                  <select {...register('client_id')} className={inputCls(!!errors.client_id)}>
                    <option value="">Select client…</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}{c.site_name ? ` — ${c.site_name}` : ''}</option>
                    ))}
                  </select>
                  {errors.client_id && <p className="text-xs text-red-500 font-medium">{errors.client_id.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Urgency Level <span className="text-red-500">*</span></label>
                  <select {...register('urgency')} className={inputCls(false)}>
                    <option value="standard">Standard (14-day SLA)</option>
                    <option value="urgent">Urgent (3-day SLA)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Request Date <span className="text-red-500">*</span></label>
                  <input type="date" {...register('request_date')} className={inputCls(!!errors.request_date)} />
                  {errors.request_date && <p className="text-xs text-red-500 font-medium">{errors.request_date.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Mine Waybill Reference</label>
                  <input type="text" {...register('mine_waybill_ref')} placeholder="e.g. WB-009123" className={inputCls(false)} />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Pickup Address</label>
                  <input type="text" {...register('pickup_address')} placeholder="Full collection address" className={inputCls(false)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Asset & Problem */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-lg md:text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Asset & Problem</h2>
              <div className="p-4 md:p-6 bg-slate-50/50 border border-slate-200 rounded-xl space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Type <span className="text-red-500">*</span></label>
                    <select {...register('asset_type')} className={inputCls(!!errors.asset_type)}>
                      <option value="">Select type…</option>
                      {ASSET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.asset_type && <p className="text-xs text-red-500 font-medium">{errors.asset_type.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Description</label>
                    <input type="text" {...register('asset_description')} placeholder="e.g. 200mm stroke double-acting cylinder" className={inputCls(false)} />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Problem Description <span className="text-red-500">*</span></label>
                    <textarea
                      {...register('problem_description')}
                      rows={3}
                      placeholder="Describe the fault or damage in detail…"
                      className={`${inputCls(!!errors.problem_description)} resize-none`}
                    />
                    {errors.problem_description && <p className="text-xs text-red-500 font-medium">{errors.problem_description.message}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Review & Submit</h2>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 md:p-6 max-w-lg mx-auto text-left space-y-3 shadow-inner">
                {[
                  ['Client', selectedClient?.name ?? '—'],
                  ['Site', selectedClient?.site_name ?? '—'],
                  ['Urgency', values.urgency],
                  ['Request Date', values.request_date],
                  ['Mine Waybill', values.mine_waybill_ref || '—'],
                  ['Asset Type', values.asset_type || '—'],
                  ['Asset Description', values.asset_description || '—'],
                  ['Pickup Address', values.pickup_address || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-slate-200 pb-2 last:border-0 last:pb-0 gap-4">
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest shrink-0">{label}</span>
                    <strong className="text-slate-800 text-sm text-right">{value}</strong>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Problem</p>
                  <p className="text-sm text-slate-700">{values.problem_description || '—'}</p>
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl max-w-lg mx-auto">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {submitError}
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
              >
                Previous
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-brand-navy hover:bg-slate-800 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-slate-200"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 text-sm font-black uppercase tracking-wider text-white bg-brand-accent hover:bg-orange-600 rounded-xl transition-all shadow-lg shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {submitting ? 'Creating…' : 'Create Job'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
