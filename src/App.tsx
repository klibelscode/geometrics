import { useCountries } from './hooks/useCountries'; 
import Navbar from './components/navBar';
import Footer from './components/footer';
import CountryCard from './components/countryCard';   
import CountryDetail from './components/countryDeatils'; 
import type { Country } from './hooks/useCountries';
import { 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  CircularProgress
} from '@mui/material';

export default function App() {
  const { 
    countries, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    selectedRegion, 
    setSelectedRegion, 
    selectedCountry, 
    setSelectedCountry, 
    getPopulationPercentage 
  } = useCountries();

  const mostPopulatedCountry = countries.length > 0 
    ? [...countries].sort((a, b) => b.population - a.population)[0]
    : null;

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      
      <Navbar />

      <div 
        className="position-sticky py-3 bg-light border-bottom"
        style={{ 
          top: '70px', 
          zIndex: 1000, 
          backgroundColor: 'rgba(241, 245, 249, 0.82) !important',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="container-fluid px-4" style={{ maxWidth: '1440px' }}>
          <div className="d-flex flex-column flex-sm-row gap-3 bg-white p-3 rounded-4 shadow-sm">
            <TextField
              fullWidth
              label="Buscar por nombre"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />

            <FormControl sx={{ minWidth: { xs: '100%', sm: 260 } }} size="small">
              <InputLabel id="region-select-label">Región / Continente</InputLabel>
              <Select
                labelId="region-select-label"
                value={selectedRegion}
                label="Región / Continente"
                onChange={(e) => setSelectedRegion(e.target.value)}
                sx={{ borderRadius: '10px' }}
              >
                <MenuItem value="">Todas las regiones</MenuItem>
                <MenuItem value="Africa">África</MenuItem>
                <MenuItem value="Americas">América</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europa</MenuItem>
                <MenuItem value="Oceania">Oceanía</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4 flex-grow-1" style={{ maxWidth: '1440px' }}>
        
        {!loading && !error && mostPopulatedCountry && !searchQuery && !selectedRegion && (
          <div 
            onClick={() => setSelectedCountry(mostPopulatedCountry)}
            className="d-flex flex-column-reverse flex-md-row justify-content-between align-items-center gap-4 p-4 mb-5 rounded-4 bg-white border"
            style={{ 
              cursor: 'pointer',
              boxShadow: '0 10px 30px -5px rgba(148, 163, 184, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(148, 163, 184, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(148, 163, 184, 0.25)';
            }}
          >
            <div className="d-flex align-items-center w-100 text-center text-md-start">
              <div className="w-100">
                <span 
                  className="text-uppercase fw-bold" 
                  style={{ 
                    fontSize: '0.75rem', 
                    letterSpacing: '1px', 
                    color: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  Indicador Demográfico Líder
                </span>
                <h5 className="fw-bolder mt-3 mb-2" style={{ letterSpacing: '-0.5px', color: '#0f172a' }}>
                  {mostPopulatedCountry.name.common} es el país más poblado de la lista
                </h5>
                <p className="mb-0" style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  Registra un total masivo de <strong style={{ color: '#0f172a' }}>{mostPopulatedCountry.population.toLocaleString()}</strong> habitantes.
                </p>
              </div>
            </div>
            <img 
              src={mostPopulatedCountry.flags.svg}
              alt="Bandera líder"
              className="rounded shadow-sm"
              style={{ 
                width: '130px', 
                height: '85px', 
                objectFit: 'cover',
                border: '1px solid #e2e8f0'
              }}
            />
          </div>
        )}

        {loading && (
          <div className="d-flex justify-content-center my-5 py-5">
            <CircularProgress size={50} sx={{ color: '#0f172a' }} thickness={4} />
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center shadow-sm fw-bold border-0 p-4 rounded-4" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }} role="alert">
            🛑 No se pudo sincronizar la data: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {countries.map((country: Country) => (
              <div className="col" key={country.cca3 || country.name.common}>
                <CountryCard 
                  country={country} 
                  onOpenDetail={() => setSelectedCountry(country)} 
                />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && countries.length === 0 && (
          <div className="text-center py-5 bg-white rounded-4 p-4 border border-dashed">
            <h6 className="text-secondary fw-bold">
              Ningún territorio coincide con el filtro
            </h6>
            <p className="text-muted small mb-0 mt-1">
              Asegúrate de escribir correctamente o limpia el filtro de continentes.
            </p>
          </div>
        )}

      </div>

      <CountryDetail 
        country={selectedCountry} 
        onClose={() => setSelectedCountry(null)} 
        getPercentage={getPopulationPercentage} 
      />

      <Footer />
      
    </div>
  );
}