import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';

export default function TusDerechos({ showRights, setShowRights }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showRights) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showRights]);

  if (!showRights) return null;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 180;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-empulseBg flex flex-col">
      {/* Header sticky */}
      <div className="sticky top-0 z-40 border-b border-empulseAccent/20 bg-empulseBg/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-empulsePrimary to-empulseMid">
            Tus Derechos
          </h1>
          <Button
            onClick={() => setShowRights(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>

        {/* Menú de Navegación Interna - Desktop */}
        <div className="hidden md:block border-t border-empulseAccent/20 bg-empulseBg/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => scrollToSection('discapacidad')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Valoración Discapacidad
            </button>

            <button
              onClick={() => scrollToSection('incapacidad')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Incapacidad Permanente
            </button>

            <button
              onClick={() => scrollToSection('laboral')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Derechos Laborales
            </button>

            <button
              onClick={() => scrollToSection('jubilacion')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Jubilación Anticipada
            </button>

            <button
              onClick={() => scrollToSection('desempleo')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Desempleo
            </button>

            <button
              onClick={() => scrollToSection('sanitaria')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Asistencia Sanitaria
            </button>
          </div>
        </div>

        {/* Menú Mobile - Botón compacto */}
        <div className="md:hidden border-t border-empulseAccent/20 bg-empulseBg/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
            <button
              onClick={scrollToTop}
              className="flex-shrink-0 px-3 py-2 rounded-lg bg-empulsePrimary/20 border border-empulsePrimary/40 text-empulsePrimary hover:bg-empulsePrimary/30 transition-all duration-200 text-sm font-semibold"
              title="Volver al inicio"
            >
              ↑
            </button>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex-1 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
            >
              {showMenu ? 'Ocultar Menú ▲' : 'Mostrar Menú ▼'}
            </button>
          </div>

          {/* Menú desplegable Mobile */}
          {showMenu && (
            <div className="border-t border-empulseAccent/20 bg-empulseBg/90 backdrop-blur-xl py-2 px-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button
                onClick={() => { scrollToSection('discapacidad'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Valoración Discapacidad
              </button>
              <button
                onClick={() => { scrollToSection('incapacidad'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Incapacidad Permanente
              </button>
              <button
                onClick={() => { scrollToSection('laboral'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Derechos Laborales
              </button>
              <button
                onClick={() => { scrollToSection('jubilacion'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Jubilación Anticipada
              </button>
              <button
                onClick={() => { scrollToSection('desempleo'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Desempleo
              </button>
              <button
                onClick={() => { scrollToSection('sanitaria'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Asistencia Sanitaria
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="space-y-12 text-slate-200 leading-relaxed">
          
          {/* Introducción empática */}
          <section className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
            <p className="text-lg text-empulseSoft leading-relaxed">
              Vivir con Esclerosis Múltiple implica navegar un sistema legal complejo. Esta sección te proporciona información sobre tus derechos como persona con EM: desde valoración de discapacidad hasta protección laboral. 
              <strong> Recuerda: esta es información general. Consulta siempre con profesionales especializados para tu situación específica.</strong>
            </p>
          </section>

          {/* Valoración de Discapacidad */}
          <section id="discapacidad" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">📋 Valoración del Grado de Discapacidad</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">¿Por Qué es Importante?</h3>
                <p className="text-slate-300 leading-relaxed">
                  El reconocimiento oficial de discapacidad abre puertas a prestaciones, beneficios fiscales y protecciones laborales. Con la EM, muchas funciones se ven afectadas: movilidad, fatiga, visión, concentración. Una valoración adecuada refleja la realidad de tu vida.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Nuevo Baremo de Discapacidad</h3>
                <p className="text-slate-300 leading-relaxed">
                  Se ha actualizado el baremo de discapacidad en España. Los cambios incluyen mejor consideración de enfermedades crónicas y sus impactos en la vida diaria. La EM, como enfermedad neurológica progresiva, puede afectar múltiples dimensiones: movilidad, fatiga, función cognitiva, visión.
                </p>
                <div className="mt-4 p-4 bg-empulseAccent/15 rounded-lg border border-empulseAccent/30">
                  <p className="text-sm text-empulseAccent">💡 Consejo: Documenta bien cómo la EM afecta tu vida cotidiana. Fotos, diarios de síntomas, informes médicos detallados son cruciales.</p>
                </div>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">El Proceso</h3>
                <ul className="text-slate-300 space-y-3 list-disc list-inside">
                  <li><strong>Solicitud:</strong> Presentada ante la Administración Pública competente (pueden hacerlo tú, tu médico o un profesional legal)</li>
                  <li><strong>Evaluación médica:</strong> El equipo médico evaluará tus capacidades y limitaciones</li>
                  <li><strong>Tribunal médico:</strong> Si no estás de acuerdo con la evaluación inicial, puedes reclamar ante el tribunal</li>
                  <li><strong>Resolución:</strong> Se emite el grado de discapacidad (33%, 45%, 65% o 75%)</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Incapacidad Permanente */}
          <section id="incapacidad" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">🏥 Incapacidad Permanente</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">¿Qué es?</h3>
                <p className="text-slate-300 leading-relaxed">
                  La incapacidad permanente (IP) reconoce que, tras el tratamiento prescrito, una enfermedad o accidente ha reducido tu capacidad laboral de forma permanente. La EM, siendo una enfermedad crónica y progresiva, es candidata para solicitar IP.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Grados de Incapacidad</h3>
                <ul className="text-slate-300 space-y-3 list-disc list-inside">
                  <li><strong>Parcial:</strong> No puedes realizar tu profesión habitual, pero sí otras</li>
                  <li><strong>Total:</strong> No puedes realizar tu profesión actual, aunque puedas hacer otras tareas</li>
                  <li><strong>Absoluta:</strong> No puedes hacer ningún trabajo, ni siquiera otro distinto</li>
                  <li><strong>Gran Invalidez:</strong> Absolutamente imposibilitado y necesitas asistencia para tareas básicas</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">El Proceso</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  La solicitud se presenta a la Seguridad Social. Es importante demostrar que la EM ha reducido tu capacidad laboral tras tratamiento médico adecuado. Con frecuencia, requiere pasar por un tribunal médico si hay discrepancias.
                </p>
                <div className="p-4 bg-empulseAccent/15 rounded-lg border border-empulseAccent/30">
                  <p className="text-sm text-empulseAccent">⚠️ Importante: Si te declaran en IP, recibes una pensión mensual. Si mejoras y puedes trabajar de nuevo, puedes perder este estatus.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Derechos Laborales */}
          <section id="laboral" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">💼 Derechos Laborales</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Protección contra la Discriminación</h3>
                <p className="text-slate-300 leading-relaxed">
                  No pueden despedirte ni discriminarte por tener EM. La ley protege tu derecho a trabajar con adaptaciones razonables.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Incentivos para Empresas</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Si tienes discapacidad ≥ 33%, las empresas que te contraten disfrutan de bonificaciones fiscales. Esto puede hacerte más atractivo como candidato:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside">
                  <li><strong>Contratación indefinida:</strong> Bonificación significativa en cuotas empresariales</li>
                  <li><strong>Beneficios fiscales:</strong> Deducciones en el Impuesto de Sociedades</li>
                  <li><strong>Subvenciones:</strong> Para adaptación de puestos de trabajo</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Adaptaciones en el Trabajo</h3>
                <p className="text-slate-300 leading-relaxed">
                  Tienes derecho a solicitar ajustes razonables: horarios flexibles, pausas para fatiga, teletrabajo, ergonomía adaptada. El empleador debe valorar estas solicitudes siempre que no supongan una carga desproporcionada.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Jubilación Anticipada */}
          <section id="jubilacion" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">🎯 Jubilación Anticipada</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">¿Quién Puede Acceder?</h3>
                <p className="text-slate-300 leading-relaxed">
                  Trabajadores con discapacidad ≥ 45% pueden jubilarse anticipadamente sin penalización. Con la EM, si alcanzas este grado de discapacidad reconocido, podrías acceder a jubilación anticipada aunque no hayas alcanzado la edad ordinaria (65-67 años).
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Requisitos Específicos</h3>
                <ul className="text-slate-300 space-y-2 list-disc list-inside">
                  <li>Grado de discapacidad reconocido ≥ 45%</li>
                  <li>Estar en situación de alta en la Seguridad Social o asimilado</li>
                  <li>Cumplir requisitos de cotización (varía según régimen)</li>
                  <li>No estar ya en situación de incapacidad permanente</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">La Pensión</h3>
                <p className="text-slate-300 leading-relaxed">
                  Se calcula como una pensión de jubilación ordinaria (sin penalización por edad). Esto es importante: no pierdes dinero por jubilarte antes, a diferencia de la jubilación voluntaria anticipada.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Desempleo */}
          <section id="desempleo" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">📊 Prestación por Desempleo</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Si Pierdes tu Trabajo</h3>
                <p className="text-slate-300 leading-relaxed">
                  Tienes derecho a prestación por desempleo si cumples requisitos de cotización y estás en paro involuntario. Con la EM, hay situaciones especiales que protegen tu derecho.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Situación Especial: Baja Médica</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Si tu contrato termina mientras estás de baja por incapacidad temporal (IT) debido a EM:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside">
                  <li>Continuarás cobrando la prestación de IT, no pasarás a desempleo</li>
                  <li>Si se convierte en IP, pasarás a pensión de incapacidad permanente</li>
                  <li>La baja no interrumpe tus derechos de protección social</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Duración y Cuantía</h3>
                <p className="text-slate-300 leading-relaxed">
                  La prestación depende de tu cotización previa (mínimo 360 días). La duración varía entre 120 y 720 días según edad y antigüedad en cotización. La cuantía es el 70% del salario base los primeros 180 días, 60% después.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Asistencia Sanitaria */}
          <section id="sanitaria" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">🌍 Asistencia Sanitaria en el Extranjero</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Dentro de la Unión Europea</h3>
                <p className="text-slate-300 leading-relaxed">
                  Como ciudadano de un estado miembro de la UE, tienes derecho a recibir atención sanitaria en otro estado miembro, tanto pública como privada. Esto incluye consultas, diagnósticos, tratamientos y medicamentos.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Cómo Acceder</h3>
                <ul className="text-slate-300 space-y-2 list-disc list-inside">
                  <li>Solicita una Tarjeta Sanitaria Europea a tu aseguradora (gratuita)</li>
                  <li>Esta tarjeta te cubre en cualquier país de la UE</li>
                  <li>Para tratamientos programados, pide autorización previa a tu administración sanitaria</li>
                  <li>Conserva los recibos y documentos médicos para reembolso</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Viajes y Medicamentos</h3>
                <p className="text-slate-300 leading-relaxed">
                  Si viajas con medicamentos controlados (especialmente inyecciones para EM), asegúrate de llevar:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside mt-3">
                  <li>Receta o prescripción del médico en inglés</li>
                  <li>Carta de tu neurólogo explicando tu tratamiento</li>
                  <li>Documentos de aduana si es necesario</li>
                  <li>Información sobre temperaturas de conservación si requiere refrigeración</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Conducción</h3>
                <p className="text-slate-300 leading-relaxed">
                  <strong>No está prohibido conducir con EM</strong>, salvo que tengas limitaciones funcionales importantes. Si experimentas síntomas que afecten tu capacidad (visión borrosa, debilidad), debe evaluarse específicamente. Algunos países requieren certificación médica.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Llamada a acción final */}
          <section className="bg-gradient-to-r from-empulseAccent/10 to-empulseMid/10 border border-empulseAccent/30 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-empulsePrimary mb-4">📞 Busca Asesoría Especializada</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Estos derechos son complejos y tu situación es única. Te recomendamos:
            </p>
            <ul className="text-slate-300 space-y-3 list-disc list-inside">
              <li><strong>Asociaciones de EM:</strong> Organizaciones como Esclerosis Múltiple España ofrecen asesoría gratuita</li>
              <li><strong>Abogados especializados:</strong> En derecho administrativo y social (muchos ofrecen primera consulta gratuita)</li>
              <li><strong>Trabajador social:</strong> Tu hospital o clínica puede conectarte con servicios de apoyo</li>
              <li><strong>Servicios públicos:</strong> Oficinas de atención a la discapacidad en tu comunidad</li>
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
}
