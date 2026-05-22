//import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Cargando datos...' }: LoadingSpinnerProps) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3 text-muted fw-semibold small tracking-wide">
        {message}
      </p>
    </div>
  );
}