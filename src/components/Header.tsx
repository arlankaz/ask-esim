
import { useState } from 'react';
import { RadioTower } from 'lucide-react';
import type { Currency } from '../types';
import { LANGUAGES, type Language } from './translations';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({
  currency,
  onCurrencyChange,
  currentLang,
  onLanguageChange,
}: HeaderProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLangObj =
    LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-slate-800 bg-[#0b0f19]/90 px-3 py-3 backdrop-blur-md">

      {/* Логотип и название */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
          <RadioTower className="h-5 w-5" strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h1 className="whitespace-nowrap text-[14px] font-extrabold leading-tight tracking-tight text-white">
            A-Mobile eSIM
          </h1>
          <p className="mt-0.5 text-[10px] font-medium leading-none tracking-wide text-cyan-400">
            Global Internet
          </p>
        </div>
      </div>

      {/* Язык и валюта */}
      <div className="flex shrink-0 items-center gap-1.5">

        {/* Выбор языка */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            aria-label="Select language"
            aria-expanded={isLangOpen}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            <span>{currentLangObj.flag}</span>
            <span className="uppercase">
              {currentLangObj.code}
            </span>
          </button>

          {isLangOpen && (
            <>
              <button
                type="button"
                aria-label="Close language menu"
                onClick={() => setIsLangOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />

              <div className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 py-1 shadow-xl">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onLanguageChange(item.code);
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition hover:bg-slate-700 ${
                      currentLang === item.code
                        ? 'bg-cyan-500/20 font-bold text-cyan-400'
                        : 'text-slate-200'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Выбор валюты */}
        <div className="flex rounded-lg border border-slate-700 bg-slate-800 p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => onCurrencyChange('KZT')}
            className={`rounded-md px-1.5 py-1 font-semibold transition ${
              currency === 'KZT'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ₸ KZT
          </button>

          <button
            type="button"
            onClick={() => onCurrencyChange('USD')}
            className={`rounded-md px-1.5 py-1 font-semibold transition ${
              currency === 'USD'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            $ USD
          </button>
        </div>
      </div>
    </header>
  );
}
