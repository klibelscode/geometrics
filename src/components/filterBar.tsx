//import React from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
}: FilterBarProps) {
  
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="sticky-top pt-2 pb-3 bg-light" style={{ top: '0', zIndex: 1020 }}>
      <div className="card border-0 shadow-sm p-4 bg-white rounded-3">
        <div className="row g-3 align-items-center">
          
          {/* Buscador de texto - Toma las 12 columnas en móvil y 7 en escritorio */}
          <div className="col-12 col-md-7">
            <TextField
              fullWidth
              label="Buscar país por nombre..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          {/* Selector de Región - Toma las 12 columnas en móvil y 5 en escritorio */}
          <div className="col-12 col-md-5">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="region-select-label">Filtrar por Continente</InputLabel>
              <Select
                labelId="region-select-label"
                label="Filtrar por Continente"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <MenuItem value=""><em>Todos los continentes</em></MenuItem>
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region === 'Americas' ? 'América' : region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

        </div>
      </div>
    </div>
  );
}