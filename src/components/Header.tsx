import React, { useState } from 'react';
import type { Currency } from '../types';
import { Language, LANGUAGES } from '../translations';

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
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
          A
        </div>
        <div>
          <h1 className="text-base font-bold leading-none">A-Mobile</h1>
          <span className="text-[10px] text-cyan-400 font-medium">5G LTE</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Выбор языка */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 transition"
          >
            <span>{currentLangObj.flag}</span>
            <span className="uppercase">{currentLangObj.code}</span>
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden py-1">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    onLanguageChange(item.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-slate-700 transition ${
                    currentLang === item.code ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-200'
                  }`}
                >
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Выбор валюты */}
        <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
          <button
            onClick={() => onCurrencyChange('KZT')}
            className={`px-2 py-0.5 rounded-md font-semibold transition ${
              currency === 'KZT' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            ₸ KZT
          </button>
          <button
            onClick={() => onCurrencyChange('USD')}
            className={`px-2 py-0.5 rounded-md font-semibold transition ${
              currency === 'USD' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            $ USD
          </button>
        </div>
      </div>
    </header>
  );
}
