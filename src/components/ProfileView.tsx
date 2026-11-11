
import { useState } from 'react';
import {
  UserRound,
  UserPlus,
  MessageSquare,
  ChevronRight,
  CreditCard,
  List,
  ShoppingBag,
  DollarSign,
  Users,
  X,
  LockKeyhole,
  Info,
} from 'lucide-react';
import Modal from './Modal';
import type { Language } from './translations';

interface ProfileViewProps {
  onShowToast: (msg: string, variant?: 'success' | 'error') => void;
  onSelectCountryById: (id: string) => void;
  onShowActiveQR: () => void;
  t: (key: string) => string;
  lang: Language;
}

type ProfileText = {
  guest: string;
  subtitle: string;
  preview: string;
  noEsimTitle: string;
  noEsimText: string;
  noOrdersTitle: string;
  noOrdersText: string;
  referralIntro: string;
  referralPreview: string;
  invited: string;
  purchases: string;
  linkLabel: string;
  linkUnavailable: string;
  balance: string;
  withdraw: string;
  howItWorks: string;
  rewardInfo: string;
  level: string;
  baseLevel: string;
  current: string;
  invite10: string;
  invite30: string;
};

const copy: Record<Language, ProfileText> = {
  ru: {
    guest: 'Гость',
    subtitle: 'Профиль A-Mobile eSIM',
    preview: 'Демо-режим',
    noEsimTitle: 'Пока нет eSIM',
    noEsimText:
      'После подключения заказов здесь появятся ваши eSIM и остаток интернета.',
    noOrdersTitle: 'Заказов пока нет',
    noOrdersText:
      'История покупок появится здесь после запуска оформления заказов.',
    referralIntro:
      'Приглашайте других и начните получать дополнительный доход. Чем выше уровень — тем больше процент от нашей чистой прибыли.',
    referralPreview:
      'Реферальная программа находится в разработке. Ссылки, начисления и выплаты пока недоступны.',
    invited: 'Приглашено',
    purchases: 'Покупки',
    linkLabel: 'Ваша реферальная ссылка',
    linkUnavailable: 'Будет доступна после запуска',
    balance: 'Доступно к выводу',
    withdraw: 'Запросить',
    howItWorks: 'Уровни реферальной программы',
    rewardInfo:
      'Проценты и условия показаны для демонстрации. Окончательные правила будут опубликованы перед запуском.',
    level: 'Уровень',
    baseLevel: 'Базовый уровень',
    current: 'ДЕМО',
    invite10: 'Пригласить 10 человек',
    invite30: 'Пригласить 30 человек',
  },
  en: {
    guest: 'Guest',
    subtitle: 'A-Mobile eSIM profile',
    preview: 'Demo mode',
    noEsimTitle: 'No eSIMs yet',
    noEsimText:
      'Once orders are connected, your eSIMs, QR codes and data balance will appear here.',
    noOrdersTitle: 'No orders yet',
    noOrdersText:
      'Purchase history will appear here when ordering is launched.',
    referralIntro:
      'Invite friends and earn rewards on their purchases.',
    referralPreview:
      'The referral program is in development. Links, rewards and payouts are not available yet.',
    invited: 'Invited',
    purchases: 'Purchases',
    linkLabel: 'Your referral link',
    linkUnavailable: 'Available after launch',
    balance: 'Available to withdraw',
    withdraw: 'Request',
    howItWorks: 'Referral program levels',
    rewardInfo:
      'Percentages and requirements are design examples only. Final terms will be published before launch.',
    level: 'Level',
    baseLevel: 'Basic level',
    current: 'DEMO',
    invite10: 'Invite 10 people',
    invite30: 'Invite 30 people',
  },
  kk: {
    guest: 'Қонақ',
    subtitle: 'A-Mobile eSIM профилі',
    preview: 'Демо режим',
    noEsimTitle: 'Әзірге eSIM жоқ',
    noEsimText:
      'Тапсырыстар қосылғаннан кейін eSIM, QR-кодтар және интернет қалдығы осында көрінеді.',
    noOrdersTitle: 'Әзірге тапсырыс жоқ',
    noOrdersText:
      'Сатып алу тарихы тапсырыс беру іске қосылғаннан кейін осында шығады.',
    referralIntro:
      'Достарыңызды шақырып, олардың сатып алуларынан сыйақы алыңыз.',
    referralPreview:
      'Рефералдық бағдарлама әзірленуде. Сілтемелер, есептеулер және төлемдер әзірге қолжетімсіз.',
    invited: 'Шақырылғандар',
    purchases: 'Сатып алулар',
    linkLabel: 'Рефералдық сілтемеңіз',
    linkUnavailable: 'Іске қосылғаннан кейін қолжетімді',
    balance: 'Шығаруға қолжетімді',
    withdraw: 'Сұрау',
    howItWorks: 'Рефералдық бағдарлама деңгейлері',
    rewardInfo:
      'Пайыздар мен шарттар тек дизайн үлгісі. Нақты ережелер іске қосылар алдында жарияланады.',
    level: 'Деңгей',
    baseLevel: 'Бастапқы деңгей',
    current: 'ДЕМО',
    invite10: '10 адам шақыру',
    invite30: '30 адам шақыру',
  },
  uz: {
    guest: 'Mehmon',
    subtitle: 'A-Mobile eSIM profili',
    preview: 'Demo rejim',
    noEsimTitle: 'Hozircha eSIM yo‘q',
    noEsimText:
      'Buyurtmalar ulangach, eSIM, QR-kodlar va internet qoldig‘i shu yerda ko‘rinadi.',
    noOrdersTitle: 'Hozircha buyurtmalar yo‘q',
    noOrdersText:
      'Xaridlar tarixi buyurtma xizmati ishga tushgach shu yerda ko‘rinadi.',
    referralIntro:
      'Do‘stlaringizni taklif qiling va xaridlaridan mukofot oling.',
    referralPreview:
      'Referal dasturi ishlab chiqilmoqda. Havolalar, mukofotlar va to‘lovlar hozircha mavjud emas.',
    invited: 'Taklif qilinganlar',
    purchases: 'Xaridlar',
    linkLabel: 'Referal havolangiz',
    linkUnavailable: 'Ishga tushgandan keyin mavjud',
    balance: 'Yechish mumkin',
    withdraw: 'So‘rov yuborish',
    howItWorks: 'Referal dasturi darajalari',
    rewardInfo:
      'Foizlar va shartlar faqat dizayn namunasi. Yakuniy qoidalar ishga tushishdan oldin e’lon qilinadi.',
    level: 'Daraja',
    baseLevel: 'Boshlang‘ich daraja',
    current: 'DEMO',
    invite10: '10 kishini taklif qilish',
    invite30: '30 kishini taklif qilish',
  },
  uk: {
    guest: 'Гість',
    subtitle: 'Профіль A-Mobile eSIM',
    preview: 'Демо-режим',
    noEsimTitle: 'Поки немає eSIM',
    noEsimText:
      'Після підключення замовлень тут з’являться eSIM, QR-коди та залишок інтернету.',
    noOrdersTitle: 'Замовлень поки немає',
    noOrdersText:
      'Історія покупок з’явиться тут після запуску оформлення замовлень.',
    referralIntro:
      'Запрошуйте друзів та отримуйте винагороди за їхні покупки.',
    referralPreview:
      'Реферальна програма розробляється. Посилання, нарахування та виплати поки недоступні.',
    invited: 'Запрошено',
    purchases: 'Покупки',
    linkLabel: 'Ваше реферальне посилання',
    linkUnavailable: 'Буде доступне після запуску',
    balance: 'Доступно до виведення',
    withdraw: 'Запросити',
    howItWorks: 'Рівні реферальної програми',
    rewardInfo:
      'Відсотки й умови наведено лише для демонстрації. Остаточні правила опублікуємо перед запуском.',
    level: 'Рівень',
    baseLevel: 'Базовий рівень',
    current: 'ДЕМО',
    invite10: 'Запросити 10 людей',
    invite30: 'Запросити 30 людей',
  },
  de: {
    guest: 'Gast',
    subtitle: 'A-Mobile eSIM Profil',
    preview: 'Demomodus',
    noEsimTitle: 'Noch keine eSIMs',
    noEsimText:
      'Sobald Bestellungen verfügbar sind, erscheinen hier deine eSIMs, QR-Codes und dein Datenvolumen.',
    noOrdersTitle: 'Noch keine Bestellungen',
    noOrdersText:
      'Der Kaufverlauf erscheint hier nach dem Start des Bestellsystems.',
    referralIntro:
      'Lade Freunde ein und erhalte Prämien für ihre Einkäufe.',
    referralPreview:
      'Das Empfehlungsprogramm wird entwickelt. Links, Prämien und Auszahlungen sind noch nicht verfügbar.',
    invited: 'Eingeladen',
    purchases: 'Käufe',
    linkLabel: 'Dein Empfehlungslink',
    linkUnavailable: 'Nach dem Start verfügbar',
    balance: 'Zur Auszahlung verfügbar',
    withdraw: 'Anfordern',
    howItWorks: 'Stufen des Empfehlungsprogramms',
    rewardInfo:
      'Prozentsätze und Bedingungen dienen nur der Designvorschau. Die endgültigen Regeln werden vor dem Start veröffentlicht.',
    level: 'Stufe',
    baseLevel: 'Basisstufe',
    current: 'DEMO',
    invite10: '10 Personen einladen',
    invite30: '30 Personen einladen',
  },
};

// Собственная SVG-иконка SIM-карты.
// Не зависит от установленной версии lucide-react.
function SimCardIcon({
  className = 'h-6 w-6',
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
      <path d="M14 2v5h5" />
      <rect x="7" y="11" width="9" height="7" rx="1.5" />
      <path d="M10 11v7M13 11v7M7 14.5h9" />
    </svg>
  );
}

// Данные Telegram используются только для отображения имени.
// Это не является серверной авторизацией.
function getTelegramDisplayName(): string | null {
  if (typeof window === 'undefined') return null;

  const tgWindow = window as Window & {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            first_name?: string;
            last_name?: string;
            username?: string;
          };
        };
      };
    };
  };

  const user = tgWindow.Telegram?.WebApp?.initDataUnsafe?.user;

  if (!user) return null;

  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(' ')
    .trim();

  return fullName || (user.username ? `@${user.username}` : null);
}

export default function ProfileView({
  t,
  lang,
}: ProfileViewProps) {
  const [referralOpen, setReferralOpen] = useState(false);

  const labels = copy[lang] ?? copy.ru;

  const telegramName = getTelegramDisplayName();
  const displayName = telegramName || labels.guest;
  const initial =
    displayName.slice(0, 1).toLocaleUpperCase() || 'A';

  return (
    <section className="mx-auto w-full max-w-2xl space-y-4 px-4 pb-6 pt-4 fade-in">

      {/* Профиль пользователя */}
      <div className="flex items-center justify-between gap-3 rounded-3xl border border-gray-800 bg-gray-900/90 p-4 shadow-xl">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 to-brand-600 text-lg font-extrabold text-white shadow-lg">
            {telegramName ? (
              initial
            ) : (
              <UserRound
                className="h-6 w-6"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-extrabold leading-tight text-white">
              {displayName}
            </h2>

            <p className="mt-1 text-[11px] text-gray-400">
              {labels.subtitle}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold text-cyan-300">
          {labels.preview}
        </span>
      </div>

      {/* Меню профиля */}
      <div className="divide-y divide-gray-800/70 overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/90 text-xs font-semibold">

        <button
          type="button"
          onClick={() => setReferralOpen(true)}
          className="flex w-full items-center justify-between p-3.5 text-left transition-colors hover:bg-gray-800/80"
        >
          <span className="flex items-center gap-3">
            <UserPlus className="h-4 w-4 text-brand-400" />

            <span className="text-white">
              {t('referralSystem')}
            </span>
          </span>

          <ChevronRight className="h-4 w-4 text-gray-500" />
        </button>

        <a
          href="https://t.me/AskSIM_Support"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3.5 transition-colors hover:bg-gray-800/80"
        >
          <span className="flex items-center gap-3">
            <MessageSquare className="h-4 w-4 text-brand-400" />

            <span className="text-white">
              {t('support')}
            </span>
          </span>

          <ChevronRight className="h-4 w-4 text-gray-500" />
        </a>
      </div>

      {/* Мои eSIM */}
      <div className="space-y-2 pt-1">
        <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
          <CreditCard className="h-4 w-4" />
          {t('myEsim')}
        </h3>

        <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-gray-700 bg-gray-900/55 px-5 py-8 text-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
            <SimCardIcon className="h-6 w-6" />
          </div>

          <p className="text-sm font-bold text-white">
            {labels.noEsimTitle}
          </p>

          <p className="max-w-xs text-xs leading-relaxed text-gray-400">
            {labels.noEsimText}
          </p>
        </div>
      </div>

      {/* История заказов */}
      <div className="space-y-2 pt-1">
        <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
          <List className="h-4 w-4" />
          {t('myOrders')}
        </h3>

        <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-gray-700 bg-gray-900/55 px-5 py-7 text-center">

          <ShoppingBag className="h-6 w-6 text-gray-500" />

          <p className="text-sm font-bold text-white">
            {labels.noOrdersTitle}
          </p>

          <p className="max-w-xs text-xs leading-relaxed text-gray-400">
            {labels.noOrdersText}
          </p>
        </div>
      </div>

      {/* Реферальная система */}
      <Modal
        open={referralOpen}
        onClose={() => setReferralOpen(false)}
      >

        {/* Заголовок */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="flex items-center gap-2 text-base font-bold text-white">
            <UserPlus className="h-5 w-5 text-brand-400" />
            {t('referralSystem')}
          </h3>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setReferralOpen(false)}
            className="rounded-full bg-gray-900 p-2 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Описание */}
        <div className="flex items-start gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>

          <p className="text-xs leading-relaxed text-gray-300">
            {labels.referralIntro}
          </p>
        </div>

        {/* Демо-предупреждение */}
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{labels.referralPreview}</span>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3">

          <div className="flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
              <Users className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-semibold text-gray-400">
                {labels.invited}
              </p>
              <p className="text-base font-extrabold text-white">
                —
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShoppingBag className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-semibold text-gray-400">
                {labels.purchases}
              </p>
              <p className="text-base font-extrabold text-white">
                —
              </p>
            </div>
          </div>
        </div>

        {/* Реферальная ссылка */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {labels.linkLabel}
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 p-3 text-xs text-gray-500">
            <LockKeyhole className="h-4 w-4 shrink-0" />
            <span>{labels.linkUnavailable}</span>
          </div>
        </div>

        {/* Баланс */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-800 bg-gray-900 p-4">

          <div>
            <p className="text-[10px] font-semibold uppercase text-gray-400">
              {labels.balance}
            </p>

            <p className="mt-1 text-xl font-extrabold text-gray-500">
              —
            </p>
          </div>

          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl bg-gray-800 px-4 py-2 text-xs font-bold text-gray-500"
          >
            {labels.withdraw}
          </button>
        </div>

        {/* Уровни программы */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {labels.howItWorks}
          </h4>

          <p className="text-xs leading-relaxed text-gray-400">
            {labels.rewardInfo}
          </p>

          {[
            {
              num: 1,
              percent: 10,
              detail: labels.baseLevel,
            },
            {
              num: 2,
              percent: 20,
              detail: labels.invite10,
            },
            {
              num: 3,
              percent: 35,
              detail: labels.invite30,
            },
          ].map((item) => (
            <div
              key={item.num}
              className="flex items-center justify-between rounded-2xl border border-gray-800 bg-gray-900 p-3"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />

                  {item.num} {labels.level} · {item.percent}%
                </div>

                <span className="ml-[18px] text-[10px] text-gray-500">
                  {item.detail}
                </span>
              </div>

              {item.num === 1 && (
                <span className="rounded-md bg-gray-800 px-2 py-1 text-[10px] font-bold text-gray-400">
                  {labels.current}
                </span>
              )}
            </div>
          ))}
        </div>

      </Modal>
    </section>
  );
}
