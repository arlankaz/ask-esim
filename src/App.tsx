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

  const [lang, setLang] = useState<Language>(getInitialLanguage);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const t = (key: string) => translations[lang]?.[key] || translations['ru'][key] || key;

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedTariff, setSelectedTariff] = useState<SelectedTariff | null>(null);
  const [compatOpen, setCompatOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const visibleCountries = useMemo(() => {
    return countriesData.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      // Поддержка обоих вариантов поля популярности из data.ts
      const isPop = c.isPopular ?? (c as any).popular ?? true;
      const matchCat = category === 'popular' ? isPop : c.region === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

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
          />
        )}
      </main>

      <NavBar active={tab} onChange={setTab} t={t} />

      {selectedCountry && (
        <TariffModal
          open={Boolean(selectedCountry)}
          country={selectedCountry}
          currency={currency}
          onClose={() => setSelectedCountry(null)}
          onCheckout={(tariff) => {
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
          currency={currency}
          onClose={() => setSelectedTariff(null)}
          onSuccess={() => {
            setSelectedTariff(null);
            setSuccessOpen(true);
          }}
          t={t}
        />
      )}

      <CompatModal open={compatOpen} onClose={() => setCompatOpen(false)} t={t} />
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} t={t} />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
