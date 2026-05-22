//import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-4 mt-auto shadow-sm">
      <div className="container">
        <div className="row align-items-center justify-content-between g-3">
          
          {/* Créditos del Desarrollador */}
          <div className="col-12 col-md-auto text-center text-md-start">
            <span className="text-muted small fw-medium">
              &copy; {currentYear} <strong>Klibel's Code</strong>. Desarrollado para la Prueba Técnica.
            </span>
          </div>

          {/* Enlaces de Contacto Profesional */}
          <div className="col-12 col-md-auto text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-link btn-sm text-secondary text-decoration-none fw-semibold p-0"
              >
                GitHub
              </a>
              <span className="text-muted small">|</span>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-link btn-sm text-secondary text-decoration-none fw-semibold p-0"
              >
                LinkedIn
              </a>
              <span className="text-muted small">|</span>
              <a 
                href="mailto:tu-correo@email.com" 
                className="btn btn-link btn-sm text-secondary text-decoration-none fw-semibold p-0"
              >
                Contacto
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}