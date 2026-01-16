export default function CookiePolicy({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto">
      <div className="min-h-screen text-slate-100" style={{ backgroundColor: '#021922' }}>
        <div className="sticky top-0 border-b border-empulseAccent/40 z-10" style={{ backgroundColor: '#021922' }}>
          <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-empulsePrimary">Política de Cookies</h1>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-empulsePrimary transition text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">1. Información General</h2>
            <p className="text-slate-300 leading-relaxed">
              EM-PULSE utiliza cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. Esta Política de Cookies explica qué son las cookies, cómo las utilizamos, qué información recopilamos y cómo puedes controlar su uso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">2. ¿Qué son las Cookies?</h2>
            <p className="text-slate-300 leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar información sobre tu visita, como preferencias de usuario, información de inicio de sesión y datos de navegación. Las cookies no contienen información personal identificable a menos que la hayas proporcionado específicamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">3. Tipos de Cookies que Utilizamos</h2>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="text-lg font-semibold text-empulseMid mb-2">3.1 Cookies Esenciales</h3>
                <p className="mb-2">
                  Son necesarias para el funcionamiento básico del sitio:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Autenticación de usuario (mantener sesión iniciada)</li>
                  <li>Seguridad (protección contra fraude y ataques)</li>
                  <li>Preferencias de navegación (idioma, tema)</li>
                  <li>Cumplimiento legal (aceptación de términos)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-empulseMid mb-2">3.2 Cookies de Rendimiento</h3>
                <p className="mb-2">
                  Nos ayudan a entender cómo usas el sitio:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Análisis de navegación (páginas visitadas, tiempo de permanencia)</li>
                  <li>Estadísticas de uso (dispositivo, navegador, ubicación)</li>
                  <li>Identificación de errores técnicos</li>
                  <li>Mejora de funcionalidades del sitio</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-empulseMid mb-2">3.3 Cookies de Funcionalidad</h3>
                <p className="mb-2">
                  Mejoran tu experiencia personalizada:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Recordar tus preferencias (tamaño de fuente, contraste)</li>
                  <li>Guardar información de formularios</li>
                  <li>Personalizar contenido recomendado</li>
                  <li>Mantener configuración de accesibilidad</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-empulseMid mb-2">3.4 Cookies de Marketing</h3>
                <p className="mb-2">
                  Utilizadas para mostrar contenido relevante:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Rastreo de fuentes de tráfico</li>
                  <li>Campañas publicitarias dirigidas</li>
                  <li>Integración con redes sociales</li>
                  <li>Análisis de eficacia de campañas</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">4. Tecnologías Similares a Cookies</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Además de cookies, utilizamos otras tecnologías para recopilar información:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li><strong>Balizas Web (Web Beacons):</strong> Pequeñas imágenes invisibles que rastrean actividad</li>
              <li><strong>Almacenamiento Local:</strong> Guarda datos más grandes en tu dispositivo sin expiración</li>
              <li><strong>Píxeles de Rastreo:</strong> Identifican acciones específicas del usuario</li>
              <li><strong>Scripts:</strong> Código JavaScript para recopilar datos de interacción</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">5. Servicios de Terceros</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Utilizamos servicios de terceros que pueden colocar cookies en tu navegador:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li><strong>Google Analytics:</strong> Análisis de tráfico y comportamiento del usuario</li>
              <li><strong>Redes Sociales:</strong> Botones de compartir y análisis de redes</li>
              <li><strong>Proveedores de Hosting:</strong> Análisis de rendimiento del servidor</li>
              <li><strong>Herramientas de Chat:</strong> Soporte y comunicación en vivo</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-3">
              Estos servicios tienen sus propias políticas de cookies. Te recomendamos revisar sus políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">6. Control de Cookies</h2>
            <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-semibold text-empulseMid">6.1 Configuración del Navegador</h3>
              <p className="text-slate-300 leading-relaxed">
                Puedes controlar las cookies mediante la configuración de tu navegador:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2">
                <li><strong>Bloquear todas las cookies:</strong> Afectará la funcionalidad del sitio</li>
                <li><strong>Bloquear cookies de terceros:</strong> Recomendado para privacidad</li>
                <li><strong>Eliminar cookies regularmente:</strong> Mejora la privacidad</li>
                <li><strong>Navegar en modo incógnito:</strong> Las cookies se eliminan al cerrar</li>
              </ul>
            </div>

            <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4 space-y-3 mt-3">
              <h3 className="text-lg font-semibold text-empulseMid">6.2 Opt-Out de Análisis</h3>
              <p className="text-slate-300 leading-relaxed">
                Puedes optar por no participar en análisis de Google Analytics instalando la extensión "Google Analytics Opt-out Browser Add-on". Visita <span className="text-empulsePrimary">https://tools.google.com/dlpage/gaoptout</span> para más información.
              </p>
            </div>

            <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4 space-y-3 mt-3">
              <h3 className="text-lg font-semibold text-empulseMid">6.3 Do Not Track</h3>
              <p className="text-slate-300 leading-relaxed">
                Algunos navegadores incluyen la función "Do Not Track" (No Rastrear). Si la activas, respetaremos tu preferencia en la medida que sea posible, aunque algunos servicios de terceros pueden no cumplirlo.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">7. Duración de las Cookies</h2>
            <div className="space-y-3 text-slate-300">
              <div>
                <h3 className="text-lg font-semibold text-empulseMid mb-1">Cookies de Sesión</h3>
                <p>Se eliminan cuando cierras el navegador. Se utilizan para mantener tu sesión activa.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-empulseMid mb-1">Cookies Persistentes</h3>
                <p>Permanecen en tu dispositivo incluso después de cerrar el navegador. La mayoría expiran en un plazo de 1 a 2 años.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">8. Privacidad y Seguridad</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Nos comprometemos a proteger tu privacidad:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li>Las cookies no contienen datos de salud sensibles (ver Política de Privacidad)</li>
              <li>Utilizamos encriptación SSL/TLS para proteger datos transmitidos</li>
              <li>Cumplimos con GDPR y regulaciones de privacidad</li>
              <li>No vendemos datos de cookies a terceros</li>
              <li>Las cookies están sujetas a nuestra Política de Privacidad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">9. Cambios en esta Política</h2>
            <p className="text-slate-300 leading-relaxed">
              Podemos actualizar esta Política de Cookies en cualquier momento para reflejar cambios en nuestras prácticas o por otras razones operacionales, legales o reglamentarias. Te notificaremos de cambios significativos mediante correo electrónico o una notificación prominente en el sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">10. Contacto</h2>
            <p className="text-slate-300 leading-relaxed">
              Si tienes preguntas sobre nuestro uso de cookies o deseas ejercer tus derechos de privacidad, contáctanos en:
            </p>
            <p className="text-empulsePrimary font-semibold mt-3">CaleroCode@gmail.com</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">11. Información Adicional</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Para más información sobre cómo protegemos tu privacidad, consulta:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2">
              <li>Política de Privacidad de EM-PULSE</li>
              <li>Términos de Servicio de EM-PULSE</li>
              <li>GDPR de la Unión Europea</li>
            </ul>
          </section>

          <div className="border-t border-empulseAccent/40 pt-6 mt-8">
            <p className="text-xs text-slate-500">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
