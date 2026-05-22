//import React from 'react';

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="card border-0 shadow-sm rounded-2 my-4">
      <div className="alert alert-danger mb-0 p-4 rounded-2 d-flex align-items-center" role="alert">
        {/* Ícono de advertencia */}
        <span className="fs-4 me-3" aria-hidden="true">⚠️</span>
        <div>
          <h5 className="alert-heading fw-bold mb-1">¡Oops! Algo salió mal</h5>
          <p className="mb-0 small text-dark-emphasis">{message}</p>
        </div>
      </div>
    </div>
  );
}