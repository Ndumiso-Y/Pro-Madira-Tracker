import { useState } from 'react';
import type { ReactNode } from 'react';
import { Lock, X } from 'lucide-react';

function Phase2Modal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-300 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-amber-100">
          <Lock className="w-7 h-7 text-amber-500" />
        </div>

        <h3 className="text-xl font-black text-brand-navy text-center mb-2 tracking-tight">
          Feature Locked
        </h3>
        <p className="text-slate-500 text-sm text-center leading-relaxed mb-7">
          This feature activates in <strong className="text-slate-700">Phase 2</strong> of the build.
          <br />
          Your input has not been saved.
        </p>

        <button
          onClick={onClose}
          className="w-full px-6 py-2.5 bg-brand-navy text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
        >
          Understood
        </button>
      </div>
    </div>
  );
}

interface PreviewModeGuardProps {
  children: ReactNode;
}

export function PreviewModeGuard({ children }: PreviewModeGuardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span
        style={{ display: 'contents' }}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        {children}
      </span>
      {showModal && <Phase2Modal onClose={() => setShowModal(false)} />}
    </>
  );
}
