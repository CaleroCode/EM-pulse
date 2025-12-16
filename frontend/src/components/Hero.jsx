import React from 'react';
import AdvancedSearch from './AdvancedSearch';

export default function Hero() {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`El usuario respondió: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  return (
    <section id="hero" className="max-w-6xl mx-auto px-4 py-10 text-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-empulsePrimary via-empulseMid to-empulseAccent bg-clip-text text-transparent">
            ¡Comprende mejor la esclerosis múltiple!
          </span>
        </h1>
        <p className="text-sm text-slate-300 mb-8 max-w-2xl mx-auto">
          EM-PULSE te ayuda a visualizar cómo se sienten los síntomas en el
          día a día, para que puedas acompañar mejor a quienes los sufren.
          Además, podrás ver todas las noticias relacionadas con la enfermedad,
          y un newsletter para recibir toda la información que desees.
        </p>

         <p className="text-sm text-slate-300 mb-8 max-w-2xl mx-auto">
        La Esclerosis Múltiple es la enfermedad de las 1.000 caras, y no todo el mundo sufrirá los mismos síntomas (ni en la misma intensidad). Por eso, en EM-PULSE hemos creado una herramienta que te permitirá entender mejor cómo se vive esta enfermedad desde dentro.
        </p>

        <p className="text-sm text-slate-300 mb-8 max-w-2xl mx-auto">
        EM-PULSE es para todos vosotros, para nosotros.
        </p>

        {/* Sección de Descarga PWA */}
        <div className="bg-gradient-to-r from-empulsePrimary/20 to-empulseMid/20 border-2 border-empulsePrimary/50 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-empulsePrimary mb-4">
            ¡¡DESCARGA EM-PULSE EN TU SMARTPHONE!!
          </h2>
          <p className="text-sm text-slate-300 mb-6">
            Accede a EM-PULSE en cualquier momento desde tu dispositivo móvil, tablet o PC. Sin necesidad de App Store, completamente gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showInstallPrompt && deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="px-6 py-3 bg-gradient-to-r from-empulsePrimary to-empulseMid text-white font-bold rounded-lg hover:shadow-lg hover:shadow-empulsePrimary/50 transition-all duration-200 text-sm sm:text-base"
              >
                📱 Instalar Ahora
              </button>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 border-2 border-empulsePrimary text-empulsePrimary font-bold rounded-lg hover:bg-empulsePrimary/10 transition-all duration-200 text-sm sm:text-base"
            >
              📲 Instala EM-PULSE
            </button>
          </div>
        </div>
        
        {/* Buscador Avanzado */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md cursor-pointer" onClick={() => setShowAdvancedSearch(true)}>
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-empulseAccent/60 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="w-full rounded-lg bg-empulseBg/50 border border-empulseAccent/40 pl-10 pr-4 py-3 text-sm text-slate-500 hover:bg-empulseBg/70 hover:border-empulseAccent/60 transition-all duration-200 flex items-center">
              <span>Búsqueda avanzada...</span>
              <span className="ml-auto text-xs bg-empulseAccent/20 text-empulseAccent px-2 py-1 rounded">⌘K</span>
            </div>
          </div>
        </div>
        
        {/* Modal de Búsqueda Avanzada */}
        {showAdvancedSearch && (
          <AdvancedSearch 
            onClose={() => setShowAdvancedSearch(false)}
          />
        )}
        
        <div className="flex flex-col items-center gap-3">
        </div>
      </div>

      {/* Modal de Instrucciones */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-empulseBg border-2 border-empulsePrimary rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-empulsePrimary mb-6">📲 Cómo Instalar EM-PULSE</h3>
            
            <div className="space-y-6">
              {/* Android */}
              <div>
                <h4 className="text-lg font-bold text-empulseMid mb-2">📱 Android</h4>
                <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                  <li>Abre EM-PULSE en tu navegador</li>
                  <li>Busca el menú (⋮) en tu navegador</li>
                  <li>Selecciona "Instalar aplicación"</li>
                  <li>Confirma la instalación</li>
                  <li>¡Listo! Aparecerá en tu pantalla principal</li>
                </ol>
              </div>

              {/* iPhone */}
              <div>
                <h4 className="text-lg font-bold text-empulseMid mb-2">🍎 iPhone/iPad</h4>
                <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                  <li>Abre EM-PULSE en Safari</li>
                  <li>Toca el botón Compartir (↗️)</li>
                  <li>Selecciona "Agregar a pantalla de inicio"</li>
                  <li>Elige un nombre y toca "Añadir"</li>
                  <li>¡Listo! Aparecerá como app</li>
                </ol>
              </div>

              {/* PC */}
              <div>
                <h4 className="text-lg font-bold text-empulseMid mb-2">💻 Windows/Mac</h4>
                <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                  <li>Abre EM-PULSE en Chrome/Edge</li>
                  <li>Haz clic en el icono (⬇️) en la barra</li>
                  <li>Selecciona "Instalar EM-PULSE"</li>
                  <li>Confirma la instalación</li>
                  <li>¡Listo! Se añadirá a tus aplicaciones</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-empulsePrimary to-empulseMid text-white font-bold rounded-lg hover:shadow-lg hover:shadow-empulsePrimary/50 transition-all duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
