import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Renderizar React INMEDIATAMENTE
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ocultar loader cuando React renderiza
const loader = document.getElementById('loader');
if (loader) {
  loader.remove();
}

// Registrar Service Worker SOLO en producción
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('✅ Service Worker registrado');
        setInterval(() => registration.update(), 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error('❌ Error SW:', error);
      });
    
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  });
}
