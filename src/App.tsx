import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import CatalogView from './components/CatalogView';
import ProfileView from './components/ProfileView';
import TariffModal from './components/TariffModal';
import CheckoutModal from './components/CheckoutModal';
import CompatModal from './components/CompatModal';
import Toast from './components/Toast';
import { countriesData } from './data';
import { hasEsimPlans } from './data/eSIMCatalog';
import type { Country, Currency, SelectedTariff } from './types';
import {
  getInitialLanguage,
  translations,
  type Language,
} from './components/translations';

type Tab = 'home' | 'profile';
type ToastVariant = 'success' | 'error';

type OrderSelection = {
  country: Country;
  tariff: SelectedTariff;
};

const REGION_BY_CATEGORY: Record<string, string> = {
  europe: 'EU',
  asia: 'ASIA',
  middleEast: 'ME',
  america: 'AMERICA',
  africa: 'AFRICA',
};

const demoTexts: Record<Language, {
  title: string;
  description: string;
  notCharged: string;
  returnToCatalog: string;
  viewProfile: string;
  qrUnavailable: string;
}> = {
  ru: {
    title: 'Демонстрация заказа',
    description: 'Сценарий оформления пройден. Это предварительный просмотр интерфейса: настоящий заказ не создан.',
    notCharged: 'Оплата не проводилась. eSIM и QR-код не выдавались.',
    returnToCatalog: 'Вернуться в каталог',
    viewProfile: 'Открыть профиль',
    qrUnavailable: 'QR-код пока недоступен: в профиле отображается демонстрационная eSIM.',
  },
  en: {
    title: 'Order preview',
    description: 'You have completed the checkout preview. No real order has been created.',
    notCharged: 'No payment was made. No eSIM or QR code was issued.',
    returnToCatalog: 'Back to catalog',
    viewProfile: 'Open profile',
    qrUnavailable: 'QR code is unavailable: the eSIM shown in your profile is a demo.',
  },
  kk: {
    title: 'Тапсырыс үлгісі',
    description: 'Рәсімдеу интерфейсінің үлгісін аяқтадыңыз. Нақты тапсырыс жасалған жоқ.',
    notCharged: 'Төлем алынбады. eSIM және QR-код берілген жоқ.',
    returnToCatalog: 'Каталогқа қайту',
    viewProfile: 'Профильді ашу',
    qrUnavailable: 'QR-код әзірге қолжетімсіз: профильдегі eSIM — демо-нұсқа.',
  },
  uz: {
    title: 'Buyurtma namoyishi',
    description: 'Buyurtma berish jarayonining namoyishi tugadi. Haqiqiy buyurtma yaratilmagan.',
    notCharged: 'To‘lov amalga oshirilmadi. eSIM yoki QR-kod berilmadi.',
    returnToCatalog: 'Katalogga qaytish',
    viewProfile: 'Profilni ochish',
    qrUnavailable: 'QR-kod hozircha mavjud emas: profildagi eSIM demo hisoblanadi.',
  },
  uk: {
    title: 'Демонстрація замовлення',
    description: 'Перегляд оформлення завершено. Справжнє замовлення не створено.',
    notCharged: 'Оплату не проведено. eSIM та QR-код не видано.',
    returnToCatalog: 'Повернутися до каталогу',
    viewProfile: 'Відкрити профіль',
    qrUnavailable: 'QR-код поки недоступний: eSIM у профілі демонстраційна.',
  },
  de: {
    title: 'Bestellvorschau',
    description: 'Du hast die Vorschau des Bestellablaufs abgeschlossen. Es wurde keine echte Bestellung erstellt.',
    notCharged: 'Es wurde nichts bezahlt. Keine eSIM oder QR-Code wurde ausgestellt.',
    returnToCatalog: 'Zurück zum Katalog',
    viewProfile: 'Profil öffnen',
    qrUnavailable: 'QR-Code nicht verfügbar: Die eSIM im Profil ist nur eine Demo.',
  },
};

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [currency, setCurrency] = useState<Currency>('KZT');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('popular');
  const [lang, setLang] = useState<Language>(() => getInitialLanguage());
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [checkout, setCheckout] = useState<OrderSelection | null>(null);
  const [demoOrder, setDemoOrder] = useState<OrderSelection | null>(null);
  const [compatOpen, setCompatOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);

  const t = (key: string): string =>
    translations[lang]?.[key] ?? translations.ru[key] ?? key;

  const changeLanguage = (nextLanguage: Language) => {
    setLang(nextLanguage);
    try {
      localStorage.setItem('app_lang', nextLanguage);
    } catch {
      // Language selection still works for the current session.
    }
  };

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    setToast({ message, variant });
  }, []);

  
const visibleCountries = useMemo(() => {
  const query = search.trim().toLocaleLowerCase();
  const region = REGION_BY_CATEGORY[category];

  return countriesData.filter((country) => {
    if (!hasEsimPlans(country.id)) return false;
    
    const translatedName =
      translations[lang]?.[country.id.toLowerCase()] ??
      translations[lang]?.[country.name.toLowerCase()] ??
      country.name;

    // Когда пользователь вводит текст,
    // ищем по всем странам без ограничения региона.
    if (query) {
      return (
        country.name.toLocaleLowerCase().includes(query) ||
        country.id.toLocaleLowerCase().includes(query) ||
        translatedName.toLocaleLowerCase().includes(query)
      );
    }

    // Когда поиск пустой, применяем выбранную категорию.
    return (
      category === 'global' ||
      (category === 'popular'
        ? country.popular
        : country.region === region)
    );
  });
}, [search, category, lang]);

  const closeCheckout = useCallback(() => {
    if (checkout) {
      setSelectedCountry(checkout.country); // Back to the chosen country's tariffs.
      setCheckout(null);
    }
  }, [checkout]);

  const closeTopmost = useCallback(() => {
    if (demoOrder) setDemoOrder(null);
    else if (checkout) closeCheckout();
    else if (selectedCountry) setSelectedCountry(null);
    else if (compatOpen) setCompatOpen(false);
  }, [demoOrder, checkout, selectedCountry, compatOpen, closeCheckout]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTopmost();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeTopmost]);

  const localeDemo = demoTexts[lang];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col font-sans">
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        currentLang={lang}
        onLanguageChange={changeLanguage}
      />

      <main className="flex-1 pb-24">
        {tab === 'home' ? (
          <CatalogView
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            countries={visibleCountries}
            currency={currency}
            onSelectCountry={setSelectedCountry}
            onOpenCompat={() => setCompatOpen(true)}
            t={t}
          />
        ) : (
          <ProfileView
            onShowToast={showToast}
            onSelectCountryById={(id) => {
              const country = countriesData.find((item) => item.id === id);
              if (country) setSelectedCountry(country);
            }}
            onShowActiveQR={() => showToast(localeDemo.qrUnavailable, 'error')}
            t={t}
            lang={lang}
          />
        )}
      </main>

      <NavBar active={tab} onChange={setTab} />

      {selectedCountry && (
        <TariffModal
          key={selectedCountry.id}
          open={true}
          country={selectedCountry}
          currency={currency}
          onClose={() => setSelectedCountry(null)}
          onCheckout={(tariff) => {
            setCheckout({ country: selectedCountry, tariff });
            setSelectedCountry(null);
          }}
          t={t}
          lang={lang}
        />
      )}

      
{checkout && (
  <CheckoutModal
    open={true}
    country={checkout.country}
    tariff={checkout.tariff}
    currency={currency}
    lang={lang}
    t={t}
    onClose={closeCheckout}
    onPaySuccess={() => {
      // Демонстрационный режим: реальная оплата не производится.
      setDemoOrder(checkout);
      setCheckout(null);
    }}
    onShowToast={showToast}
  />
)}


      <CompatModal
  open={compatOpen}
  onClose={() => setCompatOpen(false)}
  lang={lang}
/>

      {demoOrder && (
        <div className="fixed inset-0 z-[55] flex flex-col justify-end bg-black/85 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="demo-order-title">
          <div className="mx-auto w-full max-w-md space-y-4 rounded-t-3xl border-t border-gray-800 bg-gray-950 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] shadow-2xl drawer-slide-up">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15 text-2xl">✓</div>
            <h2 id="demo-order-title" className="text-center text-xl font-extrabold">
              {localeDemo.title}
            </h2>
            <p className="text-center text-sm leading-relaxed text-gray-300">{localeDemo.description}</p>
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 text-sm text-gray-200">
              <div className="font-semibold">{demoOrder.country.flag} {t(demoOrder.country.id.toLowerCase()) === demoOrder.country.id.toLowerCase() ? demoOrder.country.name : t(demoOrder.country.id.toLowerCase())}</div>
              <div className="mt-1 text-gray-400">{demoOrder.tariff.volume}</div>
            </div>
            <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-center text-xs text-amber-200">
              {localeDemo.notCharged}
            </p>
            <button
              type="button"
              onClick={() => { setDemoOrder(null); setTab('home'); }}
              className="w-full rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-white"
            >
              {localeDemo.returnToCatalog}
            </button>
            <button
              type="button"
              onClick={() => { setDemoOrder(null); setTab('profile'); }}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900 py-3 text-sm font-semibold text-white"
            >
              {localeDemo.viewProfile}
            </button>
          </div>
        </div>
      )}

      <Toast
        message={toast?.message ?? ''}
        visible={Boolean(toast)}
        variant={toast?.variant ?? 'success'}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
