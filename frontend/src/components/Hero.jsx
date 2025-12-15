import React from 'react';

export default function Hero({ searchQuery, setSearchQuery }) {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);

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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // Mostrar instrucciones según navegador
                const ua = navigator.userAgent.toLowerCase();
                if (ua.includes('iphone') || ua.includes('ipad')) {
                  alert('1. Toca el botón Compartir (↑)\n2. Selecciona "Agregar a pantalla de inicio"\n3. ¡Listo! EM-PULSE en tu pantalla principal');
                } else if (ua.includes('android')) {
                  alert('1. Busca el menú (⋮) en tu navegador\n2. Selecciona "Instalar aplicación"\n3. ¡Listo! EM-PULSE en tu pantalla principal');
                } else {
                  alert('1. Busca el icono de instalación en la barra del navegador\n2. Toca "Instalar EM-PULSE"\n3. ¡Listo!');
                }
              }}
              className="px-6 py-3 border-2 border-empulsePrimary text-empulsePrimary font-bold rounded-lg hover:bg-empulsePrimary/10 transition-all duration-200 text-sm sm:text-base"
            >
              ℹ️ Ver Instrucciones
            </a>
          </div>
        </div>
        
        {/* Buscador */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-empulseAccent/60 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-empulseBg/50 border border-empulseAccent/40 pl-10 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-empulsePrimary focus:border-empulsePrimary placeholder:text-slate-500 transition-all duration-200 hover:bg-empulseBg/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
        </div>
      </div>
    </section>
  );
}
