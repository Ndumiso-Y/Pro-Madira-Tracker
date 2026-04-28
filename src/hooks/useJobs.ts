import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Job } from '../types';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
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
