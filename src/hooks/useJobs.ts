import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { mockJobs } from '../lib/utils';
import type { Job } from '../types';

const SUPABASE_CONFIGURED = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
);

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!SUPABASE_CONFIGURED) {
      setJobs(mockJobs);
      setLoading(false);
      return;
    }

    const { data, error: err } = await supabase
      .from('jobs')
      .select('*, client:clients(id, name, site_name, contact_person, contact_phone, contact_email, created_at)')
      .eq('cancelled', false)
      .order('created_at', { ascending: false });

    if (err) setError(err.message);
    else setJobs((data as Job[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { jobs, loading, error, refetch: fetch };
}

export function useJob(id: string | undefined) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    if (!SUPABASE_CONFIGURED) {
      const found = mockJobs.find(j => j.id === id) ?? null;
      setJob(found);
      setLoading(false);
      return;
    }

    const { data, error: err } = await supabase
      .from('jobs')
      .select('*, client:clients(id, name, site_name, contact_person, contact_phone, contact_email, created_at)')
      .eq('id', id)
      .single();

    if (err) setError(err.message);
    else setJob(data as Job);
    setLoading(false);
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { job, loading, error, refetch: fetch };
}
