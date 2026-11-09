export type Currency = 'KZT' | 'USD';

export type Region = 'EU' | 'ASIA' | 'ME' | 'AFRICA' | 'AMERICA';

export interface Country {
  id: string;
  name: string;
  flag: string;
  region: Region;
  startUsd: number;
  popular: boolean;
}

export type TariffType = 'fixed' | 'unlimited';

export interface FixedTier {
  id: string;
  volume: string;
  days: number;
  mult: number;
  badge: string;
}

export interface UnlimitedTier {
  id: string;
  volume: string;
  days: number;
  mult: number;
  fup: string;
}

export type Tier = FixedTier | UnlimitedTier;

export interface SelectedTariff {
  id: string;
  volume: string;
  days: number;
  mult: number;
  badge?: string;
  fup?: string;
  priceKzt: number;
}

export const USD_RATE = 500;
