import { useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
  variant?: 'success' | 'error';
  onDismiss: () => void;
}

export default function Toast({ message, visible, variant = 'success', onDismiss }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onDismiss, 2500);
      return () => clearTimeout(t);
    }
  }, [visible, onDismiss]);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-gray-800/95 border border-gray-700 text-white px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {variant === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      ) : (
        <AlertCircle className="w-4 h-4 text-amber-400" />
      )}
      <span>{message}</span>
    </div>
  );
}
