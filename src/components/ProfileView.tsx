import { useState } from 'react';
import {
  UserPlus,
  MessageSquare,
  ChevronRight,
  CreditCard,
  List,
  Copy,
  DollarSign,
  Users,
  ShoppingCart,
  X,
} from 'lucide-react';
import Modal from './Modal';
import { copyToClipboard } from '../utils';
import type { Language } from './translations';

interface ProfileViewProps {
  onShowToast: (msg: string, variant?: 'success' | 'error') => void;
  onSelectCountryById: (id: string) => void;
  onShowActiveQR: () => void;
  t: (key: string) => string;
  lang: Language;
}

// Тексты, которых пока нет в общем словаре translations.ts.
// Позже их можно перенести туда без изменения разметки профиля.
const profileLabels = {
  ru: {
    copyDone: 'Скопировано в буфер', linkCopied: 'Ссылка скопирована',
    referralDescription: 'Приглашайте других и начните получать дополнительный доход. Чем выше уровень — тем больше процент от нашей чистой прибыли.',
    invited: 'Приглашено', purchases: 'Покупки', yourLink: 'Ваша ссылка:',
    available: 'Доступно к выводу', minWithdrawal: 'Вывод от $10', request: 'Запросить',
    howItWorks: 'Как это работает',
    levelDescription: 'Каждый уровень даёт процент от нашей чистой прибыли с покупок приглашённых. Уровень повысится после выполнения условий.',
    basicLevel: 'Базовый уровень', yours: 'ВАШ', invite10: 'Пригласить 10 человек', invite30: 'Пригласить 30 человек',
    userLabel: 'Пользователь A-Mobile Global eSIM',
  },
  en: {
    copyDone: 'Copied to clipboard', linkCopied: 'Link copied',
    referralDescription: 'Invite others and earn rewards. The higher your level, the larger your share of our net profit.',
    invited: 'Invited', purchases: 'Purchases', yourLink: 'Your link:',
    available: 'Available to withdraw', minWithdrawal: 'Minimum withdrawal $10', request: 'Request',
    howItWorks: 'How it works',
    levelDescription: 'Each level earns a share of our net profit from purchases by your referrals. Complete the requirements to level up.',
    basicLevel: 'Basic level', yours: 'YOURS', invite10: 'Invite 10 people', invite30: 'Invite 30 people',
    userLabel: 'A-Mobile Global eSIM user',
  },
  kk: {
    copyDone: 'Алмасу буферіне көшірілді', linkCopied: 'Сілтеме көшірілді',
    referralDescription: 'Достарыңызды шақырып, қосымша табыс табыңыз. Деңгейіңіз жоғарылаған сайын таза пайдамыздан алатын үлесіңіз өседі.',
    invited: 'Шақырылғандар', purchases: 'Сатып алулар', yourLink: 'Сілтемеңіз:',
    available: 'Шешіп алуға қолжетімді', minWithdrawal: 'Ең аз сома — $10', request: 'Сұрау',
    howItWorks: 'Қалай жұмыс істейді',
    levelDescription: 'Әр деңгей шақырылғандардың сатып алуларынан түскен таза пайдамыздың белгілі бір үлесін береді. Шарттарды орындап, деңгейіңізді көтеріңіз.',
    basicLevel: 'Бастапқы деңгей', yours: 'СІЗДІКІ', invite10: '10 адам шақыру', invite30: '30 адам шақыру',
    userLabel: 'A-Mobile Global eSIM пайдаланушысы',
  },
  uz: {
    copyDone: 'Buferga nusxalandi', linkCopied: 'Havola nusxalandi',
    referralDescription: 'Do‘stlaringizni taklif qiling va qo‘shimcha daromad oling. Darajangiz oshgan sari sof foydamizdan ulushingiz ko‘payadi.',
    invited: 'Taklif qilinganlar', purchases: 'Xaridlar', yourLink: 'Havolangiz:',
    available: 'Yechib olish mumkin', minWithdrawal: 'Eng kam yechish — $10', request: 'So‘rov yuborish',
    howItWorks: 'Qanday ishlaydi',
    levelDescription: 'Har bir daraja taklif qilinganlarning xaridlaridan tushgan sof foydamizdan ulush beradi. Shartlarni bajarib, darajangizni oshiring.',
    basicLevel: 'Boshlang‘ich daraja', yours: 'SIZNIKI', invite10: '10 kishini taklif qiling', invite30: '30 kishini taklif qiling',
    userLabel: 'A-Mobile Global eSIM foydalanuvchisi',
  },
  uk: {
    copyDone: 'Скопійовано до буфера', linkCopied: 'Посилання скопійовано',
    referralDescription: 'Запрошуйте друзів та отримуйте додатковий дохід. Що вищий рівень, то більша ваша частка нашого чистого прибутку.',
    invited: 'Запрошено', purchases: 'Покупки', yourLink: 'Ваше посилання:',
    available: 'Доступно до виведення', minWithdrawal: 'Виведення від $10', request: 'Запросити',
    howItWorks: 'Як це працює',
    levelDescription: 'Кожен рівень дає частку нашого чистого прибутку від покупок запрошених. Виконайте умови, щоб підвищити рівень.',
    basicLevel: 'Базовий рівень', yours: 'ВАШ', invite10: 'Запросити 10 людей', invite30: 'Запросити 30 людей',
    userLabel: 'Користувач A-Mobile Global eSIM',
  },
  de: {
    copyDone: 'In die Zwischenablage kopiert', linkCopied: 'Link kopiert',
    referralDescription: 'Lade Freunde ein und verdiene zusätzlich. Je höher deine Stufe, desto größer dein Anteil an unserem Nettogewinn.',
    invited: 'Eingeladen', purchases: 'Käufe', yourLink: 'Dein Link:',
    available: 'Zur Auszahlung verfügbar', minWithdrawal: 'Auszahlung ab 10 $', request: 'Anfordern',
    howItWorks: 'So funktioniert es',
    levelDescription: 'Jede Stufe gibt dir einen Anteil an unserem Nettogewinn aus Käufen deiner Empfehlungen. Erfülle die Bedingungen, um aufzusteigen.',
    basicLevel: 'Basisstufe', yours: 'DEINE', invite10: '10 Personen einladen', invite30: '30 Personen einladen',
    userLabel: 'A-Mobile Global eSIM Nutzer',
  },
} as const;

export default function ProfileView({
  onShowToast,
  onSelectCountryById,
  onShowActiveQR,
  t,
  lang,
}: ProfileViewProps) {
  const [referralOpen, setReferralOpen] = useState(false);
  const labels = profileLabels[lang] ?? profileLabels.ru;

  const refLink = 't.me/askesim_bot?startapp=ref_user982';

  return (
    <section className="space-y-4 fade-in">
      <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-500 to-brand-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
            <span>T</span>
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base leading-tight">TommyHellaTiger</h2>
            <p className="text-[10px] text-gray-400">{labels.userLabel}</p>
          </div>
        </div>
        <span className="bg-gray-700 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
          1 {t('level')}
        </span>
      </div>

      <div className="bg-gray-900/90 border border-gray-800 rounded-3xl divide-y divide-gray-800/70 overflow-hidden text-xs font-semibold">
        <button
          onClick={() => setReferralOpen(true)}
          className="w-full p-3.5 flex items-center justify-between hover:bg-gray-850 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <UserPlus className="w-4 h-4 text-brand-400" />
            <span className="text-white">{t('referralSystem')}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        <a
          href="https://t.me/AskSIM_Support"
          target="_blank"
          rel="noreferrer"
          className="p-3.5 flex items-center justify-between hover:bg-gray-850 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-4 h-4 text-brand-400" />
            <span className="text-white">{t('support')}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </a>
      </div>

      <div className="space-y-2 pt-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5" />
          <span>{t('myEsim')}</span>
        </h3>

        <div className="space-y-3">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-4 space-y-3.5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🇹🇷</span>
                <div>
                  <h3 className="font-bold text-white text-sm">{t('tr')} 5 GB</h3>
                  <p className="text-[10px] text-emerald-400 font-medium">● {t('active')}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  copyToClipboard('LPA:1$rsp.truphone.com$ASK-TR-5GB-982314');
                  onShowToast(labels.copyDone);
                }}
                className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-[10px] font-semibold flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>{t('lpaCode')}</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">{t('remainingTraffic')}</span>
                <span className="text-white">3.8 GB / 5.0 GB</span>
              </div>
              <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full"
                  style={{ width: '76%' }}
                />
              </div>
              <p className="text-[10px] text-gray-500 text-right">{t('validFor')} 24 {t('days')}</p>
            </div>

            <div className="pt-1 flex gap-2">
              <button
                onClick={() => onSelectCountryById('TR')}
                className="flex-1 py-2 bg-brand-500/15 hover:bg-brand-500/25 text-brand-400 border border-brand-500/30 rounded-xl text-xs font-bold transition-all"
              >
                {t('extendTraffic')}
              </button>
              <button onClick={onShowActiveQR} className="py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-semibold">
                {t('showQr')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <List className="w-3.5 h-3.5" />
          <span>{t('myOrders')}</span>
        </h3>
        <div className="bg-gray-900/40 border border-dashed border-gray-800 rounded-3xl py-6 text-center text-xs text-gray-500">
          {t('emptyHistory')}
        </div>
      </div>

      <Modal open={referralOpen} onClose={() => setReferralOpen(false)}>
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-400" />
            <span>{t('referralSystem')}</span>
          </h3>
          <button
            onClick={() => setReferralOpen(false)}
            className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {labels.referralDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold">{labels.invited}</p>
              <p className="text-base font-extrabold text-white">0</p>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold">{labels.purchases}</p>
              <p className="text-base font-extrabold text-white">0</p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{labels.yourLink}</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={refLink}
              className="bg-gray-900 text-xs text-gray-300 font-mono p-3 rounded-xl border border-gray-800 w-full select-all"
            />
            <button
              onClick={() => {
                copyToClipboard(refLink);
                onShowToast(labels.linkCopied);
              }}
              className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white rounded-xl shrink-0 active:scale-95 transition-all"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase">{labels.available}</p>
            <p className="text-xl font-extrabold text-emerald-400">$0.00</p>
            <p className="text-[10px] text-gray-500">{labels.minWithdrawal}</p>
          </div>
          <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-xl text-xs font-bold cursor-not-allowed">
            {labels.request}
          </button>
        </div>

        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{labels.howItWorks}</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            {labels.levelDescription}
          </p>

          <div className="bg-gray-900 border border-brand-500 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                <span>1 {t('level')} 10%</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-0.5 ml-4.5">{labels.basicLevel}</span>
            </div>
            <span className="text-[10px] bg-brand-600 text-white font-extrabold px-2 py-0.5 rounded-md">{labels.yours}</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                <span>2 {t('level')} 20%</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-0.5 ml-4.5">{labels.invite10}</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                <span>3 {t('level')} 35%</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-0.5 ml-4.5">{labels.invite30}</span>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
