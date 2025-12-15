import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  // Registrar inmediatamente, no esperar a window load
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then((registration) => {
      console.log('✅ Service Worker registrado correctamente:', registration);
      // Buscar actualizaciones cada hora
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);
    })
    .catch((error) => {
      console.error('❌ Error registrando Service Worker:', error);
    });
  
  // Escuchar cambios del Service Worker
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Worker actualizado');
    window.location.reload();
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
