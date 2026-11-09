import type { Currency } from './types';
import { USD_RATE } from './types';

export function pluralDays(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} день`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} дня`;
  return `${n} дней`;
}

export function pluralCountries(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} страна`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} страны`;
  return `${n} стран`;
}

export function formatPrice(kzt: number, currency: Currency): string {
  if (currency === 'KZT') return `${kzt.toLocaleString('ru-RU')} ₸`;
  return `$${(kzt / USD_RATE).toFixed(2)}`;
}

export function copyToClipboard(text: string): void {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
  } catch {
    // ignore
  }
  document.body.removeChild(el);
}
