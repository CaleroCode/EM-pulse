export default function PrivacyPolicy({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto">
      <div className="min-h-screen text-slate-100" style={{ backgroundColor: '#021922' }}>
        <div className="sticky top-0 border-b border-empulseAccent/40 z-10" style={{ backgroundColor: '#021922' }}>
          <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-empulsePrimary">Política de Privacidad</h1>
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
              EM-PULSE ("el Sitio", "nosotros" o "la Plataforma") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y salvaguardamos su información cuando utiliza nuestro sitio web y servicios relacionados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">2. Información que Recopilamos</h2>
            <div className="space-y-3 text-slate-300">
              <h3 className="text-lg font-semibold text-empulseMid">2.1 Información Proporcionada Directamente</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Datos de registro (nombre, correo electrónico, contraseña)</li>
                <li>Información de perfil (foto, preferencias de contenido)</li>
                <li>Datos de suscripción a boletín (tema favorito, frecuencia)</li>
                <li>Historial de síntomas e información de salud compartida voluntariamente</li>
              </ul>

              <h3 className="text-lg font-semibold text-empulseMid mt-3">2.2 Información Recopilada Automáticamente</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Datos de navegación (página visitada, tiempo de permanencia)</li>
                <li>Información del dispositivo (navegador, sistema operativo, dirección IP)</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">3. Uso de la Información</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li>Proporcionar, operar y mantener el Sitio</li>
              <li>Mejorar, personalizar y expandir nuestros servicios</li>
              <li>Enviar boletines y comunicaciones solicitadas</li>
              <li>Responder a consultas y proporcionar soporte</li>
              <li>Monitorear y analizar tendencias de uso</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">4. Protección de Datos (GDPR)</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Si resides en la Unión Europea, tienes los siguientes derechos bajo el Reglamento General de Protección de Datos (GDPR):
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li><strong>Derecho de acceso:</strong> Solicitar acceso a tus datos personales</li>
              <li><strong>Derecho de rectificación:</strong> Corregir datos inexactos</li>
              <li><strong>Derecho al olvido:</strong> Solicitar la eliminación de datos</li>
              <li><strong>Derecho a limitar el tratamiento:</strong> Restringir cómo procesamos tus datos</li>
              <li><strong>Derecho a la portabilidad:</strong> Recibir tus datos en formato estructurado</li>
              <li><strong>Derecho a oponerme:</strong> Oponerme al procesamiento de datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">5. Seguridad de Datos</h2>
            <p className="text-slate-300 leading-relaxed">
              Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye: encriptación SSL/TLS, contraseñas hasheadas, acceso restringido a datos sensibles y auditorías de seguridad regulares.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">6. Cookies</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Utilizamos cookies para mejorar tu experiencia. Puedes controlar las cookies a través de la configuración de tu navegador.
            </p>
            <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4">
              <p className="text-sm text-slate-400">
                Al continuar usando EM-PULSE, aceptas nuestra uso de cookies para análisis, preferencias personalizadas y funcionalidad del sitio.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">7. Terceros y Compartición de Datos</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              <strong>No vendemos tu información personal.</strong> Sin embargo, podemos compartir datos con:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li>Proveedores de servicios (hosting, análisis) bajo acuerdos de confidencialidad</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
              <li>Profesionales médicos (solo si lo solicitas específicamente)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">8. Retención de Datos</h2>
            <p className="text-slate-300 leading-relaxed">
              Retenemos tus datos personales solo mientras sea necesario para proporcionar nuestros servicios o cumplir con obligaciones legales. Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">9. Cambios en la Política</h2>
            <p className="text-slate-300 leading-relaxed">
              Nos reservamos el derecho a actualizar esta política. Te notificaremos de cambios significativos mediante correo electrónico o una notificación prominente en el Sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">10. Contacto</h2>
            <p className="text-slate-300 leading-relaxed">
              Para preguntas sobre privacidad o para ejercer tus derechos GDPR, contacta a: <span className="text-empulsePrimary font-semibold">privacy@empulse.es</span>
            </p>
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
