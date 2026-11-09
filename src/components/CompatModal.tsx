import Modal from './Modal';

interface CompatModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CompatModal({ open, onClose }: CompatModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Проверка поддержки eSIM">
      <div className="space-y-3">
        <div className="bg-gray-900 p-3.5 rounded-2xl border border-gray-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <span className="text-base"></span> iPhone (iOS)
          </div>
          <p className="text-xs text-gray-300">
            Настройки → Сотовая связь → Кнопка <strong>«Добавить eSIM»</strong>.
          </p>
        </div>

        <div className="bg-gray-900 p-3.5 rounded-2xl border border-gray-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <span className="text-base">🤖</span> Android (Samsung / Pixel / Xiaomi)
          </div>
          <p className="text-xs text-gray-300">
            Настройки → Подключения → Диспетчер SIM-карт → <strong>«Добавить eSIM»</strong>.
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 bg-gray-900 text-white font-bold rounded-2xl border border-gray-800 hover:bg-gray-800 transition-colors"
      >
        Понятно
      </button>
    </Modal>
  );
}
