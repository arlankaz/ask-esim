
import { useState } from 'react';
import {
  Smartphone,
  CheckCircle2,
  Info,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import Modal from './Modal';
import type { Language } from './translations';

interface CompatModalProps {
  open: boolean;
  onClose: () => void;
  lang?: Language;
}

type Device = 'ios' | 'android';

const content: Record<Language, {
  title: string;
  intro: string;
  iphone: string;
  android: string;
  steps: string;
  iosSteps: string[];
  androidSteps: string[];
  samsung: string;
  pixel: string;
  other: string;
  samsungPath: string;
  pixelPath: string;
  otherPath: string;
  found: string;
  warningTitle: string;
  warning: string;
  note: string;
  done: string;
}> = {
  ru: {
    title: 'Совместимость с eSIM',
    intro: 'Проверьте, поддерживает ли ваш смартфон установку электронной SIM-карты.',
    iphone: 'iPhone',
    android: 'Android',
    steps: 'Как проверить',
    iosSteps: [
      'Откройте «Настройки».',
      'Перейдите в раздел «Сотовая связь».',
      'Найдите пункт «Добавить eSIM».',
    ],
    androidSteps: [
      'Откройте настройки телефона.',
      'Перейдите в раздел управления SIM-картами или мобильной сетью.',
      'Найдите функцию добавления eSIM.',
    ],
    samsung: 'Samsung',
    pixel: 'Google Pixel',
    other: 'Другие Android',
    samsungPath: 'Настройки → Подключения → Диспетчер SIM-карт → Добавить eSIM',
    pixelPath: 'Настройки → Сеть и интернет → SIM-карты → Добавить SIM-карту',
    otherPath: 'Настройки → Мобильная сеть или SIM-карты → Добавить eSIM',
    found: 'Если функция доступна, телефон, вероятно, поддерживает eSIM.',
    warningTitle: 'Обратите внимание',
    warning: 'Некоторые модели и региональные версии смартфонов не поддерживают eSIM. Телефон также должен быть разблокирован для использования с другим оператором.',
    note: 'Наличие пункта «Добавить eSIM» не гарантирует работу любого тарифного плана. Перед покупкой необходимо проверить точную модель и условия оператора.',
    done: 'Понятно',
  },
  en: {
    title: 'eSIM compatibility',
    intro: 'Check whether your phone supports installing an electronic SIM.',
    iphone: 'iPhone',
    android: 'Android',
    steps: 'How to check',
    iosSteps: [
      'Open Settings.',
      'Go to Cellular or Mobile Data.',
      'Look for Add eSIM.',
    ],
    androidSteps: [
      'Open your phone settings.',
      'Find SIM management or Mobile network.',
      'Look for an option to add an eSIM.',
    ],
    samsung: 'Samsung',
    pixel: 'Google Pixel',
    other: 'Other Android',
    samsungPath: 'Settings → Connections → SIM manager → Add eSIM',
    pixelPath: 'Settings → Network & internet → SIMs → Add SIM',
    otherPath: 'Settings → Mobile network or SIMs → Add eSIM',
    found: 'If the option is available, your phone likely supports eSIM.',
    warningTitle: 'Important',
    warning: 'Some models and regional variants do not support eSIM. Your phone must also be carrier-unlocked.',
    note: 'An Add eSIM option does not guarantee compatibility with every plan. Check your exact model and carrier requirements before buying.',
    done: 'Got it',
  },
  kk: {
    title: 'eSIM үйлесімділігі',
    intro: 'Телефоныңыз электрондық SIM-картаны қолдайтынын тексеріңіз.',
    iphone: 'iPhone',
    android: 'Android',
    steps: 'Қалай тексеруге болады',
    iosSteps: [
      '«Баптауларды» ашыңыз.',
      '«Ұялы байланыс» бөліміне өтіңіз.',
      '«eSIM қосу» тармағын іздеңіз.',
    ],
    androidSteps: [
      'Телефон баптауларын ашыңыз.',
      'SIM-карталарды басқару немесе мобильді желі бөліміне өтіңіз.',
      'eSIM қосу мүмкіндігін іздеңіз.',
    ],
    samsung: 'Samsung',
    pixel: 'Google Pixel',
    other: 'Басқа Android',
    samsungPath: 'Баптаулар → Қосылымдар → SIM менеджері → eSIM қосу',
    pixelPath: 'Баптаулар → Желі және интернет → SIM → SIM қосу',
    otherPath: 'Баптаулар → Мобильді желі немесе SIM → eSIM қосу',
    found: 'Бұл мүмкіндік бар болса, телефон eSIM қолдауы мүмкін.',
    warningTitle: 'Назар аударыңыз',
    warning: 'Кейбір модельдер мен аймақтық нұсқалар eSIM қолдамайды. Телефон басқа операторлар үшін бұғатталмаған болуы керек.',
    note: '«eSIM қосу» батырмасы барлық тарифтердің жұмыс істейтініне кепілдік бермейді. Сатып алар алдында модель мен оператор шарттарын тексеріңіз.',
    done: 'Түсінікті',
  },
  uz: {
    title: 'eSIM mosligi',
    intro: 'Telefoningiz elektron SIM-kartani qo‘llab-quvvatlashini tekshiring.',
    iphone: 'iPhone',
    android: 'Android',
    steps: 'Qanday tekshirish mumkin',
    iosSteps: [
      'Sozlamalarni oching.',
      'Mobil aloqa bo‘limiga o‘ting.',
      'eSIM qo‘shish bandini toping.',
    ],
    androidSteps: [
      'Telefon sozlamalarini oching.',
      'SIM boshqaruvi yoki mobil tarmoq bo‘limiga o‘ting.',
      'eSIM qo‘shish funksiyasini toping.',
    ],
    samsung: 'Samsung',
    pixel: 'Google Pixel',
    other: 'Boshqa Android',
    samsungPath: 'Sozlamalar → Ulanishlar → SIM menejeri → eSIM qo‘shish',
    pixelPath: 'Sozlamalar → Tarmoq va internet → SIM → SIM qo‘shish',
    otherPath: 'Sozlamalar → Mobil tarmoq yoki SIM → eSIM qo‘shish',
    found: 'Bu funksiya mavjud bo‘lsa, telefon eSIMni qo‘llashi mumkin.',
    warningTitle: 'Muhim',
    warning: 'Ayrim modellar va mintaqaviy versiyalar eSIMni qo‘llamaydi. Telefon operatorga bog‘lanmagan bo‘lishi kerak.',
    note: 'eSIM qo‘shish tugmasi barcha tariflar ishlashini kafolatlamaydi. Xarid qilishdan oldin model va operator shartlarini tekshiring.',
    done: 'Tushunarli',
  },
  uk: {
    title: 'Сумісність з eSIM',
    intro: 'Перевірте, чи підтримує телефон електронну SIM-картку.',
    iphone: 'iPhone',
    android: 'Android',
    steps: 'Як перевірити',
    iosSteps: [
      'Відкрийте «Налаштування».',
      'Перейдіть до розділу «Стільниковий зв’язок».',
      'Знайдіть пункт «Додати eSIM».',
    ],
    androidSteps: [
      'Відкрийте налаштування телефону.',
      'Перейдіть до керування SIM-картками або мобільної мережі.',
      'Знайдіть функцію додавання eSIM.',
    ],
    samsung: 'Samsung',
    pixel: 'Google Pixel',
    other: 'Інші Android',
    samsungPath: 'Налаштування → Підключення → Диспетчер SIM → Додати eSIM',
    pixelPath: 'Налаштування → Мережа й інтернет → SIM → Додати SIM',
    otherPath: 'Налаштування → Мобільна мережа або SIM → Додати eSIM',
    found: 'Якщо функція доступна, телефон, імовірно, підтримує eSIM.',
    warningTitle: 'Зверніть увагу',
    warning: 'Деякі моделі та регіональні версії не підтримують eSIM. Телефон також має бути розблокований для інших операторів.',
    note: 'Наявність кнопки «Додати eSIM» не гарантує роботу кожного тарифу. Перевірте модель і вимоги оператора перед покупкою.',
    done: 'Зрозуміло',
  },
  de: {
    title: 'eSIM-Kompatibilität',
    intro: 'Prüfe, ob dein Smartphone eine elektronische SIM unterstützt.',
    iphone: 'iPhone',
    android: 'Android',
    steps: 'So überprüfst du es',
    iosSteps: [
      'Öffne die Einstellungen.',
      'Gehe zu Mobilfunk.',
      'Suche nach eSIM hinzufügen.',
    ],
    androidSteps: [
      'Öffne die Einstellungen deines Smartphones.',
      'Gehe zur SIM-Verwaltung oder zum Mobilfunknetz.',
      'Suche nach einer Option zum Hinzufügen einer eSIM.',
    ],
    samsung: 'Samsung',
    pixel: 'Google Pixel',
    other: 'Andere Android-Geräte',
    samsungPath: 'Einstellungen → Verbindungen → SIM-Manager → eSIM hinzufügen',
    pixelPath: 'Einstellungen → Netzwerk & Internet → SIMs → SIM hinzufügen',
    otherPath: 'Einstellungen → Mobilfunknetz oder SIMs → eSIM hinzufügen',
    found: 'Wenn die Option vorhanden ist, unterstützt dein Telefon wahrscheinlich eSIM.',
    warningTitle: 'Wichtig',
    warning: 'Einige Modelle und regionale Varianten unterstützen keine eSIM. Das Gerät muss außerdem ohne SIM-Lock nutzbar sein.',
    note: 'Die Option eSIM hinzufügen garantiert nicht die Kompatibilität mit jedem Tarif. Prüfe das genaue Modell und die Anbieterbedingungen vor dem Kauf.',
    done: 'Verstanden',
  },
};

export default function CompatModal({
  open,
  onClose,
  lang = 'ru',
}: CompatModalProps) {
  const [device, setDevice] = useState<Device>('ios');
  const c = content[lang] ?? content.ru;
  const steps = device === 'ios' ? c.iosSteps : c.androidSteps;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-400" />
          <h3 className="text-base font-bold text-white">{c.title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-gray-900 p-2 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <span className="text-lg leading-none">×</span>
        </button>
      </div>

      <p className="text-xs leading-relaxed text-gray-400">{c.intro}</p>

      <div className="grid grid-cols-2 gap-2">
        {(['ios', 'android'] as const).map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={device === id}
            onClick={() => setDevice(id)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition-colors ${
              device === id
                ? 'border-brand-500 bg-brand-500/15 text-brand-400'
                : 'border-gray-800 bg-gray-900 text-gray-400'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            {id === 'ios' ? c.iphone : c.android}
          </button>
        ))}
      </div>

      <div className="space-y-3 rounded-2xl border border-gray-800 bg-gray-900 p-4">
        <h4 className="text-sm font-bold text-white">{c.steps}</h4>
        {steps.map((step, index) => (
          <div key={`${device}-${index}`} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-400">
              {index + 1}
            </span>
            <p className="pt-1 text-xs leading-relaxed text-gray-300">
              {step}
            </p>
          </div>
        ))}
      </div>

      {device === 'android' && (
        <div className="space-y-2">
          {[
            { name: c.samsung, path: c.samsungPath },
            { name: c.pixel, path: c.pixelPath },
            { name: c.other, path: c.otherPath },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-gray-800 bg-gray-900/60 p-3"
            >
              <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-white">
                <ChevronRight className="h-4 w-4 text-brand-400" />
                {item.name}
              </div>
              <p className="text-xs leading-relaxed text-gray-400">
                {item.path}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        <p className="text-xs leading-relaxed text-emerald-100">
          {c.found}
        </p>
      </div>

      <div className="space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-amber-300" />
          <span className="text-xs font-bold text-amber-200">
            {c.warningTitle}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-amber-100">
          {c.warning}
        </p>
        <p className="text-xs leading-relaxed text-amber-100/80">
          {c.note}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-2xl bg-brand-500 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
      >
        {c.done}
      </button>
    </Modal>
  );
}
