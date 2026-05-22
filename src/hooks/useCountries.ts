import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// tipado estricto de la estructura que nos interesa de la API
export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string; 
  };
  flags: {
    svg: string;
    alt?: string;
  };
  region: string;
  population: number;
  capital?: string[];
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  borders?: string[];
}

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de filtros
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Country[]>(
          'https://restcountries.com/v3.1/all?fields=name,cca3,flags,population,region,capital,currencies,languages,borders'
        );
        setCountries(response.data);
        setError(null);
      } catch (err) {
        setError('Error al conectar con el servidor de Geografía Global. Intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const maxPopulation = useMemo(() => {
    if (countries.length === 0) return 1; 
    return Math.max(...countries.map((c) => c.population));
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || 
        country.name.official.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
      
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, selectedRegion]);

  const getPopulationPercentage = (population: number): number => {
    if (maxPopulation === 0) return 0;
    return (population / maxPopulation) * 100;
  };

  return {
    // Lista filtrada para las tarjetas
    countries: filteredCountries,
    loading,
    error,
    
    // Control de filtros
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,    
    selectedCountry,
    setSelectedCountry,
    getPopulationPercentage,
  };
}