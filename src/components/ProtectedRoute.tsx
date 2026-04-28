import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SUPABASE_CONFIGURED = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
);

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Passthrough when Supabase env vars are absent (preview/demo deployments)
  if (!SUPABASE_CONFIGURED || sessionStorage.getItem('demo_mode') === 'true') {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
