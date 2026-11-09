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

type Tab = 'home' | 'profile';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [currency, setCurrency] = useState<Currency>('KZT');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('popular');

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedTariff, setSelectedTariff] = useState<SelectedTariff | null>(null);

  const [tariffOpen, setTariffOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [compatOpen, setCompatOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [toast, setToast] = useState({ msg: '', visible: false, variant: 'success' as 'success' | 'error' });

  const showToast = (msg: string, variant: 'success' | 'error' = 'success') => {
    setToast({ msg, visible: true, variant });
  };

  const visibleCountries = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (q) return countriesData.filter((c) => c.name.toLowerCase().includes(q));
    if (category === 'popular') return countriesData.filter((c) => c.popular);
    if (category === 'all') return countriesData;
    return countriesData.filter((c) => c.region === category);
  }, [search, category]);

  const handleSelectCountry = (c: Country) => {
    setSelectedCountry(c);
    setTariffOpen(true);
  };

  const handleSelectCountryById = (id: string) => {
    const c = countriesData.find((x) => x.id === id);
    if (c) handleSelectCountry(c);
  };

  const handleCheckout = (t: SelectedTariff) => {
    setSelectedTariff(t);
    setTariffOpen(false);
    setCheckoutOpen(true);
  };

  const handlePaySuccess = () => {
    setCheckoutOpen(false);
    setSuccessOpen(true);
  };

  const handleFinishOrder = () => {
    setSuccessOpen(false);
    setTab('profile');
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen font-sans pb-28 antialiased selection:bg-brand-500 selection:text-white">
      <Toast
        message={toast.msg}
        visible={toast.visible}
        variant={toast.variant}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div className="max-w-md mx-auto relative min-h-screen flex flex-col justify-between">
        <Header
          currency={currency}
          onCurrencyChange={setCurrency}
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={(c) => {
            setCategory(c);
            setSearch('');
          }}
          countryCount=""
          compact={tab === 'profile'}
        />

        <main className="p-4 flex-1 safe-pb space-y-4">
          {tab === 'home' ? (
            <CatalogView
              countries={visibleCountries}
              currency={currency}
              onSelectCountry={handleSelectCountry}
              onOpenCompat={() => setCompatOpen(true)}
            />
          ) : (
            <ProfileView
              onShowToast={showToast}
              onSelectCountryById={handleSelectCountryById}
              onShowActiveQR={() => setSuccessOpen(true)}
            />
          )}
        </main>

        <NavBar active={tab} onChange={setTab} />

        <TariffModal
          open={tariffOpen}
          country={selectedCountry}
          currency={currency}
          onClose={() => setTariffOpen(false)}
          onCheckout={handleCheckout}
        />

        <CheckoutModal
          open={checkoutOpen}
          country={selectedCountry}
          tariff={selectedTariff}
          currency={currency}
          onClose={() => setCheckoutOpen(false)}
          onPaySuccess={handlePaySuccess}
          onShowToast={showToast}
        />

        <CompatModal open={compatOpen} onClose={() => setCompatOpen(false)} />

        <SuccessModal open={successOpen} onShowToast={showToast} onFinish={handleFinishOrder} />
      </div>
    </div>
  );
}
