export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CurrencyInfo {
  name: string;
  symbol: string;
}

export interface CountryCurrencies {
  [key: string]: CurrencyInfo;
}

export interface CountryLanguages {
  [key: string]: string;
}

export interface Country {
  cca3: string; 
  name: CountryName;
  flags: CountryFlags;
  population: number;
  region: string;
  capital?: string[];
  currencies?: CountryCurrencies;
  languages?: CountryLanguages;
  borders?: string[];
}