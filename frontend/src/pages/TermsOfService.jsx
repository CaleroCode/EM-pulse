export default function TermsOfService({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto">
      <div className="min-h-screen text-slate-100" style={{ backgroundColor: '#021922' }}>
        <div className="sticky top-0 border-b border-empulseAccent/40 z-10" style={{ backgroundColor: '#021922' }}>
          <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-empulsePrimary">Términos de Servicio</h1>
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
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">1. Aceptación de Términos</h2>
            <p className="text-slate-300 leading-relaxed">
              Al acceder y utilizar EM-PULSE, aceptas estar vinculado por estos Términos de Servicio. Si no estás de acuerdo con cualquier parte de estos términos, no puedes usar el Sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">2. Descripción del Servicio</h2>
            <p className="text-slate-300 leading-relaxed">
              EM-PULSE proporciona una plataforma de información y comunidad para personas afectadas por la Esclerosis Múltiple. Nuestros servicios incluyen noticias, recursos educativos, seguimiento de síntomas y comunidad de apoyo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">3. Responsabilidad del Usuario</h2>
            <p className="text-slate-300 leading-relaxed mb-3">Eres responsable de:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li>Mantener la confidencialidad de tu contraseña</li>
              <li>Aceptar responsabilidad por todas las actividades en tu cuenta</li>
              <li>Cumplir con todas las leyes y regulaciones aplicables</li>
              <li>No transmitir malware, virus o código destructivo</li>
              <li>No acosar, amenazar o difamar a otros usuarios</li>
              <li>No violar derechos de autor o propiedad intelectual</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">4. Limitación de Responsabilidad</h2>
            <div className="bg-dark-bg-secondary/50 border border-empulseAccent/20 rounded-lg p-4 space-y-3">
              <p className="text-slate-300 leading-relaxed">
                <strong>DESCARGO DE RESPONSABILIDAD MÉDICA:</strong> EM-PULSE no es un sustituto de la consulta médica profesional. La información proporcionada es solo educativa y no debe considerarse como diagnóstico, tratamiento o consejo médico.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Siempre consulta con un profesional médico calificado antes de tomar decisiones de salud.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">5. Limitación de Responsabilidad Técnica</h2>
            <p className="text-slate-300 leading-relaxed">
              EM-PULSE proporciona el Sitio "TAL CUAL" sin garantías de ningún tipo. No somos responsables de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li>Disponibilidad ininterrumpida del Sitio</li>
              <li>Pérdida de datos o información</li>
              <li>Errores, inexactitudes o retrasos en contenido</li>
              <li>Daños indirectos, incidentales o consecuentes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">6. Contenido del Usuario</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Al publicar contenido en EM-PULSE, otorgas permiso para usar, reproducir y distribuir dicho contenido en conexión con el Sitio.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Eres responsable de cualquier contenido que publiques y garantizas que no viola derechos de terceros o leyes aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">7. Propiedad Intelectual</h2>
            <p className="text-slate-300 leading-relaxed">
              Todo el contenido del Sitio (textos, imágenes, gráficos, logos) es propiedad de EM-PULSE o sus proveedores de contenido y está protegido por leyes de derechos de autor. No puedes reproducir, distribuir o transmitir contenido sin permiso explícito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">8. Enlaces a Terceros</h2>
            <p className="text-slate-300 leading-relaxed">
              El Sitio puede contener enlaces a sitios web externos. No somos responsables del contenido, precisión o prácticas de esos sitios. Tu uso de sitios externos está sujeto a sus términos y políticas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">9. Suspensión y Terminación</h2>
            <p className="text-slate-300 leading-relaxed">
              Nos reservamos el derecho a suspender o terminar tu acceso al Sitio si violas estos términos. Podemos hacerlo sin previo aviso si determinamos que tu conducta es inapropiada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">10. Ley Aplicable</h2>
            <p className="text-slate-300 leading-relaxed">
              Estos Términos se rigen por la ley española. Cualquier disputa se resolverá en los tribunales competentes de España.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-empulsePrimary mb-3">11. Contacto</h2>
            <p className="text-slate-300 leading-relaxed">
              Para preguntas sobre estos términos, contacta a: <span className="text-empulsePrimary font-semibold">CaleroCode@gmail.com</span>
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
