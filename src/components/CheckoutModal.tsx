import { useEffect, useState } from 'react';
import { X, ShieldCheck, Zap, ChevronRight, CreditCard, Apple } from 'lucide-react';
import { formatPrice, pluralDays } from '../utils';
import type { Country, Currency, SelectedTariff } from '../types';

interface CheckoutModalProps {
  open: boolean;
  country: Country | null;
  tariff: SelectedTariff | null;
  currency: Currency;
  onClose: () => void;
  onPaySuccess: () => void;
  onShowToast: (msg: string, variant?: 'success' | 'error') => void;
}

export default function CheckoutModal({
  open,
  country,
  tariff,
  currency,
  onClose,
  onPaySuccess,
  onShowToast,
}: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [hasUpsell, setHasUpsell] = useState(false);
  const [terms, setTerms] = useState(true);

  useEffect(() => {
    if (open) {
      setEmail('');
      setHasUpsell(false);
      setTerms(true);
    }
  }, [open]);

  if (!open || !country || !tariff) return null;

  const baseKzt = tariff.priceKzt + (hasUpsell ? 890 : 0);
  const displayTotal = formatPrice(baseKzt, currency);
  const upsellDisplay = currency === 'KZT' ? '+890 ₸' : '+$1.78';

  const handlePay = () => {
    if (!email || !email.includes('@')) {
      onShowToast('Укажите корректный E-mail для чека', 'error');
      return;
    }
    if (!terms) {
      onShowToast('Подтвердите согласие с офертой', 'error');
      return;
    }
    onPaySuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md flex flex-col justify-end">
      <div className="bg-gray-950 border-t border-gray-800 rounded-t-3xl p-5 space-y-4 drawer-slide-up max-h-[92vh] overflow-y-auto mx-auto w-full max-w-md">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-freedom-500" />
            <span>Оформление и оплата</span>
          </h3>
          <button onClick={onClose} className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-3.5 flex items-center gap-2.5 text-sm text-brand-300 font-semibold">
          <span className="text-lg">{country.flag}</span>
          <span>
            Вы оформляете интернет для <strong className="text-white">{country.name}</strong>
          </span>
        </div>

        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-base">
              {tariff.volume} {pluralDays(tariff.days)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-800">
            <span className="text-gray-400">Итого к оплате:</span>
            <span className="font-extrabold text-brand-400 text-lg">{displayTotal}</span>
          </div>
        </div>

        <button
          onClick={() => setHasUpsell((v) => !v)}
          className={`w-full border rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-all ${
            hasUpsell
              ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/10'
              : 'bg-gray-900 border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">Добавить +3 GB про запас</p>
              <p className="text-[11px] text-amber-400 font-medium">Скидка 20% ({upsellDisplay})</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={hasUpsell}
            readOnly
            className="rounded text-brand-500 focus:ring-0 w-4 h-4 bg-gray-800 border-gray-700 pointer-events-none"
          />
        </button>

        <div className="space-y-1.5">
          <label className="text-sm text-gray-300 font-semibold">Укажите Email для дублирования QR-кода и чека:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@gmail.com"
            className="w-full bg-gray-900 text-sm text-white placeholder-gray-500 px-3.5 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Выберите способ оплаты:</label>

          <button
            onClick={handlePay}
            className="w-full bg-gray-900 hover:bg-gray-850 border border-gray-800 hover:border-brand-500/50 p-3.5 rounded-2xl flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Карты Visa & MasterCard</p>
                <p className="text-[11px] text-gray-400">Любые карты РК, СНГ и международные</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>

          <button
            onClick={handlePay}
            className="w-full bg-gray-900 hover:bg-gray-850 border border-gray-800 p-3.5 rounded-2xl flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Apple className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Apple Pay / Google Pay</p>
                <p className="text-[11px] text-gray-400">Быстрая оплата в 1 касание</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[12px] text-gray-400">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="rounded text-brand-500 focus:ring-0 w-3.5 h-3.5 bg-gray-900 border-gray-700"
          />
          <label>
            Согласен с <a href="#" className="text-brand-400 underline">Публичной офертой ИП Askaruly</a>
          </label>
        </div>
      </div>
    </div>
  );
}
