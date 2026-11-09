import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, children, title, maxWidth = 'max-w-md' }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md flex flex-col justify-end">
      <div
        className={`bg-gray-950 border-t border-gray-800 rounded-t-3xl p-5 space-y-4 drawer-slide-up max-h-[92vh] overflow-y-auto mx-auto w-full ${maxWidth}`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
