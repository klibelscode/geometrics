import type { Country } from '../hooks/useCountries';

interface CountryCardProps {
  country: Country;
  onOpenDetail: () => void;
}

export default function CountryCard({ country, onOpenDetail }: CountryCardProps) {
  return (
    <div 
      className="card h-100 border border-transparent shadow-sm transition-transform" 
      style={{ 
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 20px -2px rgba(148, 163, 184, 0.12), 0 2px 8px -1px rgba(148, 163, 184, 0.08)',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(148, 163, 184, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(148, 163, 184, 0.12)';
      }}
      onClick={onOpenDetail}
    >
      <div className="position-relative overflow-hidden" style={{ height: '170px', borderRadius: '15px 15px 0 0' }}>
        <img 
          src={country.flags.svg} 
          className="w-100 h-100 object-fit-cover" 
          alt={country.flags.alt || `Bandera de ${country.name.common}`}
        />
        <div 
          className="position-absolute bottom-0 start-0 end-0" 
          style={{
            height: '40px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.03))'
          }}
        />
      </div>

      <div className="card-body d-flex flex-column p-4">
        <span 
          className="badge mb-2 align-self-start fw-bold text-xs"
          style={{ 
            backgroundColor: 'rgba(14, 165, 233, 0.1)', 
            color: '#0ea5e9',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem'
          }}
        >
          {country.region}
        </span>
        
        <h5 
          className="card-title fw-extrabold mb-3" 
          style={{ color: '#0f172a', fontSize: '1.2rem', letterSpacing: '-0.3px', lineHeight: '1.4' }}
        >
          {country.name.common}
        </h5>
        
        <div className="d-flex flex-column gap-2 mb-4 text-secondary" style={{ fontSize: '0.9rem' }}>
          <div className="d-flex align-items-center gap-2">
            <span>👥</span>
            <span><strong>Población:</strong> {country.population.toLocaleString()}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span>📍</span>
            <span><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'No registra'}</span>
          </div>
        </div>
        
        <button 
          className="btn btn-primary mt-auto w-100 fw-bold shadow-sm" 
          style={{ 
            borderRadius: '10px',
            padding: '10px',
            fontSize: '0.85rem'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail();
          }}
        >
          Detalles →
        </button>
      </div>
    </div>
  );
}