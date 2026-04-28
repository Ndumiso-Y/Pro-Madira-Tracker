import { Lock } from 'lucide-react';

export function PreviewBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200 tracking-wide uppercase whitespace-nowrap">
      <Lock className="w-3 h-3" />
      Preview — Activates Phase 2
    </span>
  );
}
