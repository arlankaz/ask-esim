import { useMemo, useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import CatalogView from './components/CatalogView';
import ProfileView from './components/ProfileView';
import TariffModal from './components/TariffModal';
import CheckoutModal from './components/CheckoutModal';
import CompatModal from './components/CompatModal';
import SuccessModal from './components/SuccessModal';
import Toast from './components/Toast';
import { countriesData } from './data';
import type { Country, Currency, SelectedTariff } from './types';
import { getInitialLanguage, translations, Language } from './components/translations';

type Tab = 'home' | 'profile';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [currency, setCurrency] = useState<Currency>('KZT');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('popular');

  const [lang, setLang] = useState<Language>(() => {
    try {
      return getInitialLanguage() || 'ru';
    } catch {
      return 'ru';
    }
  });

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('app_lang', newLang);
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key: string) => translations?.[lang]?.[key] || translations?.['ru']?.[key] || key;

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [checkoutCountry, setCheckoutCountry] =
  useState<Country | null>(null);
  const [selectedTariff, setSelectedTariff] = useState<SelectedTariff | null>(null);
  const [compatOpen, setCompatOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
  setToastMessage(msg);
};

  // Поиск и фильтрация по всем 78 странам на любом языке
  const visibleCountries = useMemo(() => {
    if (!Array.isArray(countriesData)) return [];

    return countriesData.filter((c: any) => {
      if (!c) return false;
      const searchLower = (search || '').trim().toLowerCase();

      // Оригинальное имя страны и переведенное имя
      const origName = (c.name || '').toLowerCase();
      const key = (c.id || c.name || '').toLowerCase();
      const translatedName = (translations?.[lang]?.[key] || '').toLowerCase();

      // Поиск совпадения по оригинальному ИЛИ переведенному названию
      const matchSearch =
        !searchLower ||
        origName.includes(searchLower) ||
        translatedName.includes(searchLower);

      const isPop = c.isPopular ?? c.popular ?? true;
      const regionMap: Record<string, string> = {
  europe: 'EU',
  asia: 'ASIA',
  middleEast: 'ME',
  america: 'AMERICA',
  africa: 'AFRICA',
};

const countryRegion = c.region;
const currentCategory = regionMap[category] || category;

      const matchCat =
        currentCategory === 'popular'
          ? isPop
          : currentCategory === 'global'
          ? true
          : countryRegion === currentCategory;

      return matchSearch && matchCat;
    });
  }, [search, category, lang]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col justify-between font-sans">
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        currentLang={lang}
        onLanguageChange={changeLanguage}
      />

      <main className="pb-24">
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
    const found = countriesData.find((c) => c.id === id);
    if (found) setSelectedCountry(found);
  }}
  onShowActiveQR={() => setSuccessOpen(true)}
  t={t}
  lang={lang}
/>

        )}
      </main>

      <NavBar active={tab} onChange={setTab} />

      {selectedCountry && (
        <TariffModal
          open={Boolean(selectedCountry)}
          country={selectedCountry}
          currency={currency}
          onClose={() => setSelectedCountry(null)}
          onCheckout={(tariff) => {
  setCheckoutCountry(selectedCountry);
  setSelectedTariff(tariff);
  setSelectedCountry(null);
}}
          t={t}
        />
      )}

      {selectedTariff && (
        <CheckoutModal
          open={Boolean(selectedTariff)}
          tariff={selectedTariff}
          country={checkoutCountry}
          currency={currency}
          onClose={() => setSelectedTariff(null)}
          onPaySuccess={() => {
            setSelectedTariff(null);
            setSuccessOpen(true);
          }}
          onShowToast={showToast}
        />
      )}

      <CompatModal open={compatOpen} onClose={() => setCompatOpen(false)} />
      <SuccessModal
  open={successOpen}
  onShowToast={showToast}
  onFinish={() => {
    setSuccessOpen(false);
    setTab('profile');
  }}
/>
      <Toast
  message={toastMessage || ''}
  visible={Boolean(toastMessage)}
  onDismiss={() => setToastMessage(null)}
/>
    </div>
  );
}
