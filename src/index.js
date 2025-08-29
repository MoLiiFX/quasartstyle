import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Configuración para el PWA (opcional)
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si quieres medir el rendimiento de tu app, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o enviar a un servicio de análisis. Más info: https://bit.ly/CRA-vitals
// reportWebVitals();
