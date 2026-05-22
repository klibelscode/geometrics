import { Drawer, Box, Typography, IconButton, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Country } from '../hooks/useCountries';

interface CountryDetailProps {
  country: Country | null;
  onClose: () => void;
  getPercentage: (population: number) => number;
}

export default function CountryDetail({ country, onClose, getPercentage }: CountryDetailProps) {
  if (!country) return null;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((curr) => `${curr.name} ${curr.symbol ? `(${curr.symbol})` : ''}`)
        .join(', ')
    : 'No registra';

  const languages = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'No registra';

  const populationPercent = getPercentage(country.population);

  return (
    <Drawer 
      anchor="right" 
      open={Boolean(country)} 
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: '100%', maxWidth: '450px', backgroundColor: '#ffffff' }
        }
      }}
    >
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Cabecera del Panel */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Detalles del País
          </Typography>
          <IconButton onClick={onClose} aria-label="Cerrar panel">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: 2, mb: 4, boxShadow: 2 }}>
          <img 
            src={country.flags.svg} 
            alt={country.flags.alt || `Bandera de ${country.name.common}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1a252f' }}>
          {country.name.common}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#7f8c8d', fontStyle: 'italic', mb: 4 }}>
          {country.name.official}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <Typography variant="body1">
            <strong>📍 Capital:</strong> {country.capital ? country.capital.join(', ') : 'No tiene'}
          </Typography>
          <Typography variant="body1">
            <strong>💱 Moneda(s):</strong> {currencies}
          </Typography>
          <Typography variant="body1">
            <strong>🗣️ Idiomas:</strong> {languages}
          </Typography>
          <Typography variant="body1">
            <strong>👥 Población Total:</strong> {country.population.toLocaleString()} habitantes
          </Typography>
        </Box>

        {/* Métrica con UI (LinearProgress) */}
        <Box sx={{ mb: 4, bgcolor: '#f8f9fa', p: 3, borderRadius: 2, border: '1px solid #e9ecef' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#495057' }}>
              Proporción de Población Global
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007bff' }}>
              {populationPercent.toFixed(2)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={populationPercent < 0.1 ? 1 : populationPercent} 
            sx={{ height: 10, borderRadius: 5, backgroundColor: '#e9ecef' }} 
          />
          <Typography variant="caption" sx={{ color: '#6c757d', mt: 1, display: 'block' }}>
            * Comparado porcentualmente contra el país más poblado del mundo.
          </Typography>
        </Box>

        {/* Lista de Países Fronterizos */}
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
            🗺️ Países Fronterizos:
          </Typography>
          {country.borders && country.borders.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {country.borders.map((border) => (
                <span 
                  key={border} 
                  className="badge bg-secondary px-3 py-2 rounded-2 fw-bold text-uppercase"
                  style={{ fontSize: '0.85rem' }}
                >
                  {border}
                </span>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: '#7f8c8d', fontStyle: 'italic' }}>
              Este país no comparte borders terrestres.
            </Typography>
          )}
        </Box>

      </Box>
    </Drawer>
  );
}