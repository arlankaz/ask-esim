export type Language = 'ru' | 'en' | 'kk' | 'uz' | 'uk' | 'de';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'kk', label: 'Қазақша', flag: '🇰🇿' },
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const translations: Record<Language, Record<string, string>> = {
  ru: {
    searchPlaceholder: 'Куда летите? ✈️ (например: Турция)',
    popular: '🔥 Популярные',
    europe: 'Европа',
    asia: 'Азия',
    middleEast: 'Ближний Восток',
    america: 'Америка',
    africa: 'Африка',
    global: 'Весь мир',
    myEsim: 'Мои eSIM',
    referralSystem: 'Реферальная система',
    support: 'Поддержка',
    ourChannel: 'Наш канал',
    myOrders: 'Мои заказы',
    extendTraffic: 'Продлить трафик',
    showQr: 'Показать QR',
    lpaCode: 'LPA Код',
    active: 'Активна',
    level: 'уровень',
    user: 'Пользователь A-Mobile',
    selectLanguage: 'Выберите язык',
  },
  en: {
    searchPlaceholder: 'Where are you flying? ✈️ (e.g. Turkey)',
    popular: '🔥 Popular',
    europe: 'Europe',
    asia: 'Asia',
    middleEast: 'Middle East',
    america: 'America',
    africa: 'Africa',
    global: 'Global',
    myEsim: 'My eSIMs',
    referralSystem: 'Referral Program',
    support: 'Support',
    ourChannel: 'Our Channel',
    myOrders: 'My Orders',
    extendTraffic: 'Top up data',
    showQr: 'Show QR',
    lpaCode: 'LPA Code',
    active: 'Active',
    level: 'level',
    user: 'A-Mobile User',
    selectLanguage: 'Select Language',
  },
  kk: {
    searchPlaceholder: 'Қайда ұшасыз? ✈️ (мысалы: Түркия)',
    popular: '🔥 Танымал',
    europe: 'Еуропа',
    asia: 'Азия',
    middleEast: 'Таяу Шығыс',
    america: 'Америка',
    africa: 'Африка',
    global: 'Бүкіл әлем',
    myEsim: 'Менің eSIM-дерім',
    referralSystem: 'Реферальды жүйе',
    support: 'Қолдау қызметі',
    ourChannel: 'Біздің арна',
    myOrders: 'Менің тапсырыстарым',
    extendTraffic: 'Трафикті ұзарту',
    showQr: 'QR көрсету',
    lpaCode: 'LPA Коды',
    active: 'Белсенді',
    level: 'деңгей',
    user: 'A-Mobile пайдаланушысы',
    selectLanguage: 'Тілді таңдаңыз',
  },
  uz: {
    searchPlaceholder: 'Qayerga uchasiz? ✈️ (masalan: Turkiya)',
    popular: '🔥 Ommabop',
    europe: 'Yevropa',
    asia: 'Osiyo',
    middleEast: 'Yaqin Sharq',
    america: 'Amerika',
    africa: 'Afrika',
    global: 'Butun dunyo',
    myEsim: 'Mening eSIM-larim',
    referralSystem: 'Tavsiya tizimi',
    support: "Qo'llab-quvvatlash",
    ourChannel: 'Bizning kanal',
    myOrders: 'Mening buyurtmalarim',
    extendTraffic: 'Trafikni uzaytirish',
    showQr: 'QR-ni ko’rsatish',
    lpaCode: 'LPA Kodi',
    active: 'Faol',
    level: 'daraja',
    user: 'A-Mobile foydalanuvchisi',
    selectLanguage: 'Tilni tanlang',
  },
  uk: {
    searchPlaceholder: 'Куди летите? ✈️ (наприклад: Туреччина)',
    popular: '🔥 Популярні',
    europe: 'Європа',
    asia: 'Азія',
    middleEast: 'Близький Схід',
    america: 'Америка',
    africa: 'Африка',
    global: 'Весь світ',
    myEsim: 'Мої eSIM',
    referralSystem: 'Реферальна система',
    support: 'Підтримка',
    ourChannel: 'Наш канал',
    myOrders: 'Мої замовлення',
    extendTraffic: 'Продовжити трафік',
    showQr: 'Показати QR',
    lpaCode: 'LPA Код',
    active: 'Активна',
    level: 'рівень',
    user: 'Користувач A-Mobile',
    selectLanguage: 'Оберіть мову',
  },
  de: {
    searchPlaceholder: 'Wohin fliegen Sie? ✈️ (z. B. Türkei)',
    popular: '🔥 Beliebt',
    europe: 'Europa',
    asia: 'Asien',
    middleEast: 'Naher Osten',
    america: 'Amerika',
    africa: 'Afrika',
    global: 'Weltweit',
    myEsim: 'Meine eSIMs',
    referralSystem: 'Empfehlungsprogramm',
    support: 'Support',
    ourChannel: 'Unser Kanal',
    myOrders: 'Meine Bestellungen',
    extendTraffic: 'Daten aufladen',
    showQr: 'QR anzeigen',
    lpaCode: 'LPA-Code',
    active: 'Aktiv',
    level: 'Stufe',
    user: 'A-Mobile Nutzer',
    selectLanguage: 'Sprache wählen',
  },
};

export const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'ru';
  try {
    const saved = localStorage.getItem('app_lang') as Language;
    if (saved && translations[saved]) return saved;

    const tgLang = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.language_code?.toLowerCase();
    if (tgLang) {
      if (tgLang.startsWith('kk')) return 'kk';
      if (tgLang.startsWith('uz')) return 'uz';
      if (tgLang.startsWith('uk')) return 'uk';
      if (tgLang.startsWith('de')) return 'de';
      if (tgLang.startsWith('en')) return 'en';
    }
  } catch (e) {
    console.error(e);
  }
  return 'ru';
};
