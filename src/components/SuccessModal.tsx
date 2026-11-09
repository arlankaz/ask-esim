import { CheckCircle2, Copy } from 'lucide-react';
import { copyToClipboard } from '../utils';

interface SuccessModalProps {
  open: boolean;
  onShowToast: (msg: string, variant?: 'success' | 'error') => void;
  onFinish: () => void;
}

export default function SuccessModal({ open, onShowToast, onFinish }: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/85 z-50 backdrop-blur-md flex flex-col justify-end">
      <div className="bg-gray-950 border-t border-gray-800 rounded-t-3xl p-5 space-y-4 drawer-slide-up max-h-[95vh] overflow-y-auto text-center mx-auto w-full max-w-md">
        <div className="w-14 h-14 bg-freedom-500/20 border border-freedom-500/40 rounded-full flex items-center justify-center mx-auto text-freedom-500">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">Оплата прошла успешно!</h3>
          <p className="text-xs text-gray-400 mt-0.5">Ваш профиль eSIM сгенерирован и готов к активации</p>
        </div>

        <div className="bg-white p-3.5 rounded-3xl inline-block mx-auto shadow-2xl border-4 border-gray-800">
          <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="white" />
            <path d="M10 10H35V35H10V10ZM15 15V30H30V15H15Z" fill="black" />
            <path d="M65 10H90V35H65V10ZM70 15V30H85V15H70Z" fill="black" />
            <path d="M10 65H35V90H10V65ZM15 70V85H30V70H15Z" fill="black" />
            <rect x="20" y="20" width="5" height="5" fill="black" />
            <rect x="75" y="20" width="5" height="5" fill="black" />
            <rect x="20" y="75" width="5" height="5" fill="black" />
            <path
              d="M40 10H60V20H40V10ZM45 25H55V45H45V25ZM10 40H25V55H10V40ZM65 40H90V60H65V40ZM40 65H60V90H40V65ZM65 65H80V80H65V65ZM80 80H90V90H80V80Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="bg-gray-900 p-3.5 rounded-2xl border border-gray-800 text-left space-y-1.5">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Код ручной активации (LPA):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value="LPA:1$rsp.truphone.com$ASK-TR-5GB-982314"
              className="bg-gray-950 text-xs text-emerald-400 font-mono p-2 rounded-xl border border-gray-800 w-full select-all"
            />
            <button
              onClick={() => {
                copyToClipboard('LPA:1$rsp.truphone.com$ASK-TR-5GB-982314');
                onShowToast('Код скопирован');
              }}
              className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 active:scale-95 transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Копировать</span>
            </button>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl border border-gray-800 transition-colors text-sm"
        >
          Перейти в Мои eSIM
        </button>
      </div>
    </div>
  );
}
