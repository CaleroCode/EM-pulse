import { useState, useEffect } from "react";
import {
  Accessibility,
  Moon,
  Sun,
  Volume2,
  Type,
  Contrast,
  Keyboard,
  X,
} from "lucide-react";

export default function AccessibilityPage({ onClose }) {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("em-pulse-dark-mode") === "true"
  );
  const [fontSize, setFontSize] = useState(
    () => parseInt(localStorage.getItem("em-pulse-font-size")) || 100
  );
  const [screenReader, setScreenReader] = useState(
    () => localStorage.getItem("em-pulse-screen-reader") === "true"
  );
  const [focusIndicators, setFocusIndicators] = useState(
    () => localStorage.getItem("em-pulse-focus-indicators") === "true"
  );
  const [animationReduced, setAnimationReduced] = useState(
    () => localStorage.getItem("em-pulse-reduced-motion") === "true"
  );

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("em-pulse-dark-mode", darkMode);
    document.documentElement.classList.toggle("dark-mode-em", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("em-pulse-font-size", fontSize);
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("em-pulse-screen-reader", screenReader);
  }, [screenReader]);

  useEffect(() => {
    localStorage.setItem("em-pulse-focus-indicators", focusIndicators);
    document.documentElement.classList.toggle("enhanced-focus-em", focusIndicators);
  }, [focusIndicators]);

  useEffect(() => {
    localStorage.setItem("em-pulse-reduced-motion", animationReduced);
    document.documentElement.classList.toggle("reduce-motion-em", animationReduced);
  }, [animationReduced]);

  // Anunciar cambios a lectores de pantalla
  const announceChange = (message) => {
    if (screenReader) {
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "status");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 2000);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    announceChange(
      !darkMode ? "Modo oscuro activado" : "Modo claro activado"
    );
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    announceChange(`Tamaño de fuente ajustado a ${newSize}%`);
  };

  const handleScreenReaderToggle = () => {
    setScreenReader(!screenReader);
    announceChange(
      !screenReader
        ? "Asistencia de lector de pantalla activada"
        : "Asistencia de lector de pantalla desactivada"
    );
  };

  const handleFocusIndicatorsToggle = () => {
    setFocusIndicators(!focusIndicators);
    announceChange(
      !focusIndicators
        ? "Indicadores de enfoque mejorados activados"
        : "Indicadores de enfoque estándar"
    );
  };

  const handleAnimationToggle = () => {
    setAnimationReduced(!animationReduced);
    announceChange(
      !animationReduced
        ? "Movimiento reducido activado"
        : "Animaciones normales restauradas"
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        darkMode ? "dark-mode-em" : ""
      }`}
      aria-label="Página de accesibilidad"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className={`relative bg-empulseBg rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-empulseAccent/30`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-6 border-b bg-empulseAccent/10 border-empulseAccent/30`}
          >
            <div className="flex items-center gap-3">
              <Accessibility
                className="w-8 h-8 text-empulsePrimary"
                aria-hidden="true"
              />
              <h1
                id="accessibility-title"
                className="text-2xl font-bold text-empulsePrimary"
              >
                Accesibilidad
              </h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-empulseAccent/20 rounded-lg transition"
              aria-label="Cerrar página de accesibilidad"
              title="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Modo Claro/Oscuro */}
            <div
              className="p-6 rounded-lg border-2 bg-slate-900/30 border-empulseAccent/40"
              role="region"
              aria-labelledby="dark-mode-title"
            >
              <div className="flex items-center gap-4 mb-4">
                {darkMode ? (
                  <Moon
                    className="w-6 h-6 text-empulsePrimary"
                    aria-hidden="true"
                  />
                ) : (
                  <Sun
                    className="w-6 h-6 text-empulsePrimary"
                    aria-hidden="true"
                  />
                )}
                <h2
                  id="dark-mode-title"
                  className="text-xl font-semibold text-empulsePrimary"
                >
                  Modo Claro/Oscuro
                </h2>
              </div>
              <p className="text-slate-300 mb-4">
                Elige entre modo claro u oscuro para una mejor experiencia visual.
                Tu preferencia se guardará automáticamente.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDarkModeToggle}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    darkMode
                      ? "bg-empulsePrimary text-slate-900"
                      : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                  }`}
                  aria-pressed={darkMode}
                  title={darkMode ? "Activado" : "Desactivado"}
                >
                  {darkMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
                </button>
              </div>
            </div>

            {/* Tamaño de Fuente */}
            <div
              className="p-6 rounded-lg border-2 bg-slate-900/30 border-empulseAccent/40"
              role="region"
              aria-labelledby="font-size-title"
            >
              <div className="flex items-center gap-4 mb-4">
                <Type
                  className="w-6 h-6 text-empulsePrimary"
                  aria-hidden="true"
                />
                <h2
                  id="font-size-title"
                  className="text-xl font-semibold text-empulsePrimary"
                >
                  Tamaño de Fuente
                </h2>
              </div>
              <p className="text-slate-300 mb-4">
                Ajusta el tamaño del texto para mejorar la legibilidad. El valor actual es
                {" "}{fontSize}%.
              </p>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {[80, 100, 120, 140, 160].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFontSizeChange(size)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        fontSize === size
                          ? "bg-empulsePrimary text-slate-900"
                          : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                      }`}
                      aria-pressed={fontSize === size}
                      title={`Tamaño ${size}%`}
                    >
                      {size}%
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-empulseAccent/10 rounded">
                  <p style={{ fontSize: `${fontSize}%` }} className="text-slate-300">
                    Este es un ejemplo de texto con el tamaño ajustado.
                  </p>
                </div>
              </div>
            </div>

            {/* Indicadores de Enfoque */}
            <div
              className="p-6 rounded-lg border-2 bg-slate-900/30 border-empulseAccent/40"
              role="region"
              aria-labelledby="focus-title"
            >
              <div className="flex items-center gap-4 mb-4">
                <Keyboard
                  className="w-6 h-6 text-empulsePrimary"
                  aria-hidden="true"
                />
                <h2
                  id="focus-title"
                  className="text-xl font-semibold text-empulsePrimary"
                >
                  Indicadores de Enfoque Mejorados
                </h2>
              </div>
              <p className="text-slate-300 mb-4">
                Activa indicadores de enfoque más visibles para una mejor navegación por teclado.
                Presiona Tab para navegar entre elementos.
              </p>
              <button
                onClick={handleFocusIndicatorsToggle}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  focusIndicators
                    ? "bg-empulsePrimary text-slate-900"
                    : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                }`}
                aria-pressed={focusIndicators}
                title={focusIndicators ? "Activado" : "Desactivado"}
              >
                {focusIndicators ? "✓ Indicadores Mejorados" : "Indicadores Estándar"}
              </button>
            </div>

            {/* Movimiento Reducido */}
            <div
              className="p-6 rounded-lg border-2 bg-slate-900/30 border-empulseAccent/40"
              role="region"
              aria-labelledby="motion-title"
            >
              <div className="flex items-center gap-4 mb-4">
                <Volume2
                  className="w-6 h-6 text-empulsePrimary"
                  aria-hidden="true"
                />
                <h2
                  id="motion-title"
                  className="text-xl font-semibold text-empulsePrimary"
                >
                  Movimiento Reducido
                </h2>
              </div>
              <p className="text-slate-300 mb-4">
                Reduce las animaciones y transiciones para personas sensibles al movimiento
                o con mareos.
              </p>
              <button
                onClick={handleAnimationToggle}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  animationReduced
                    ? "bg-empulsePrimary text-slate-900"
                    : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                }`}
                aria-pressed={animationReduced}
                title={animationReduced ? "Activado" : "Desactivado"}
              >
                {animationReduced ? "✓ Movimiento Reducido" : "Movimiento Normal"}
              </button>
            </div>

            {/* Asistencia de Lector de Pantalla */}
            <div
              className="p-6 rounded-lg border-2 bg-slate-900/30 border-empulseAccent/40"
              role="region"
              aria-labelledby="screen-reader-title"
            >
              <div className="flex items-center gap-4 mb-4">
                <Volume2
                  className="w-6 h-6 text-empulsePrimary"
                  aria-hidden="true"
                />
                <h2
                  id="screen-reader-title"
                  className="text-xl font-semibold text-empulsePrimary"
                >
                  Lector de Pantalla
                </h2>
              </div>
              <p className="text-slate-300 mb-4">
                Si usas un lector de pantalla como NVDA o JAWS, activa esta opción para
                mejorar la experiencia con anuncios optimizados.
              </p>
              <button
                onClick={handleScreenReaderToggle}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  screenReader
                    ? "bg-empulsePrimary text-slate-900"
                    : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                }`}
                aria-pressed={screenReader}
                title={screenReader ? "Activado" : "Desactivado"}
              >
                {screenReader ? "✓ Lector de Pantalla" : "Lector de Pantalla"}
              </button>
            </div>

            {/* Info */}
            <div
              className="p-4 bg-empulseAccent/10 rounded-lg border border-empulseAccent/40"
              role="complementary"
              aria-label="Información de accesibilidad"
            >
              <h3 className="font-semibold text-empulsePrimary mb-2">
                ♿ Acerca de Accesibilidad
              </h3>
              <p className="text-sm text-slate-300">
                EM-PULSE cumple con las directrices WCAG 2.1 nivel AA. Todas tus preferencias
                de accesibilidad se guardan localmente. Si encuentras problemas de accesibilidad,
                por favor contáctanos a través del foro o correo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .dark-mode-em {
          color-scheme: dark;
        }

        .dark-mode-em body {
          background-color: #020f18;
          color: #e2e8f0;
        }

        .high-contrast-em {
          --text-color: #000000;
          --bg-color: #ffffff;
          --primary-color: #0066cc;
        }

        .high-contrast-em body {
          background-color: #ffffff;
          color: #000000;
        }

        .high-contrast-em button {
          border: 2px solid #000000;
        }

        .enhanced-focus-em *:focus-visible {
          outline: 4px solid #ffff00;
          outline-offset: 2px;
        }

        .reduce-motion-em * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>
    </div>
  );
}
