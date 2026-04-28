import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SUPABASE_CONFIGURED = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Demo credentials — active until Supabase is connected
    if (email === 'demo@promadira.co.za' && password === 'demo1234') {
      sessionStorage.setItem('demo_mode', 'true');
      navigate('/dashboard', { replace: true });
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/dashboard', { replace: true });
    }
  }

  function enterDemoMode() {
    sessionStorage.setItem('demo_mode', 'true');
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#0a1222] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img
            src="/ProMadiraLogoTransparent.png"
            alt="ProMadira"
            className="h-14 object-contain filter drop-shadow-lg"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-black text-brand-navy tracking-tight mb-1">Sign in</h1>
          <p className="text-sm text-slate-400 font-medium mb-8">Promodira Operations Platform</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@promodira.co.za"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 outline-none transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-accent text-white font-black rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        {!SUPABASE_CONFIGURED && (
          <div className="mt-4">
            <div className="relative flex items-center mb-4">
              <div className="flex-1 border-t border-slate-700" />
              <span className="px-3 text-xs text-slate-500 font-medium">or</span>
              <div className="flex-1 border-t border-slate-700" />
            </div>
            <button
              type="button"
              onClick={enterDemoMode}
              className="w-full py-3 bg-white/5 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              Enter Demo Mode (no backend required)
            </button>
          </div>
        )}

        <p className="text-center text-slate-500 text-xs mt-6">
          Promodira Phase 1 · Restricted Access
        </p>
      </div>
    </div>
  );
}
