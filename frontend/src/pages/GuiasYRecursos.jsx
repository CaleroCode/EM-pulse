import { useState } from 'react';
import Button from '../components/ui/Button';

export default function GuiasYRecursos({ showGuides, setShowGuides }) {
  const [showMenu, setShowMenu] = useState(false);

  if (!showGuides) return null;

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
            Guías y Recursos
          </h1>
          <Button
            onClick={() => setShowGuides(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>

        {/* Menú de Navegación Interna - Desktop */}
        <div className="hidden md:block border-t border-empulseAccent/20 bg-empulseBg/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => scrollToSection('guias')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Guías Oficiales
            </button>

            <button
              onClick={() => scrollToSection('asociaciones')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Asociaciones
            </button>

            <button
              onClick={() => scrollToSection('medicos')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Recursos Médicos
            </button>

            <button
              onClick={() => scrollToSection('digitales')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Comunidades Online
            </button>

            <button
              onClick={() => scrollToSection('psicologicos')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Apoyo Psicológico
            </button>

            <button
              onClick={() => scrollToSection('practicos')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Consejos Prácticos
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
                onClick={() => { scrollToSection('guias'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Guías Oficiales
              </button>
              <button
                onClick={() => { scrollToSection('asociaciones'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Asociaciones
              </button>
              <button
                onClick={() => { scrollToSection('medicos'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Recursos Médicos
              </button>
              <button
                onClick={() => { scrollToSection('digitales'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Comunidades Online
              </button>
              <button
                onClick={() => { scrollToSection('psicologicos'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Apoyo Psicológico
              </button>
              <button
                onClick={() => { scrollToSection('practicos'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Consejos Prácticos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="space-y-12 text-slate-200 leading-relaxed">
          
          {/* Introducción */}
          <section className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
            <p className="text-lg text-empulseSoft leading-relaxed">
              Vivir con EM es más manejable cuando tienes el conocimiento correcto y apoyo adecuado. Aquí compilamos guías, organizaciones y recursos prácticos que pueden ayudarte en tu camino. 
              <strong> Desde derechos hasta estrategias de vida cotidiana.</strong>
            </p>
          </section>

          {/* Guías Oficiales */}
          <section id="guias" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">📚 Guías Oficiales</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Guía Práctica para la Defensa de Derechos</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Publicada por Esclerosis Múltiple España, esta guía jurídica proporciona orientación general sobre:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li>Pasar por tribunales médicos</li>
                  <li>Solicitar valoración de discapacidad</li>
                  <li>Protecciones laborales</li>
                  <li>Procedimientos administrativos</li>
                </ul>
                <div className="mt-4 p-4 bg-empulsePrimary/15 rounded-lg border border-empulsePrimary/30">
                  <p className="text-sm text-empulsePrimary">📖 Descárgala gratuitamente en <strong>esclerosismultiple.com</strong></p>
                </div>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Información Oficial del Gobierno</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Los ministerios españoles publican información sobre:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li><strong>Ministerio de Inclusión, Seguridad Social y Migraciones:</strong> Prestaciones y derechos sociales</li>
                  <li><strong>Ministerio de Derechos Sociales:</strong> Políticas de discapacidad</li>
                  <li><strong>Servicios autonómicos de salud:</strong> Información sobre tratamientos y programas</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Baremo de Discapacidad Actualizado</h3>
                <p className="text-slate-300 leading-relaxed">
                  El Real Decreto que actualiza el baremo de discapacidad contiene la evaluación de criterios médicos para EM. Consultarlo te ayudará a entender cómo se valoran tus síntomas.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Asociaciones */}
          <section id="asociaciones" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">🤝 Asociaciones y Organizaciones</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Esclerosis Múltiple España</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  La organización oficial referente en España.
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li>🌐 Web: <strong>esclerosismultiple.com</strong></li>
                  <li>📞 Teléfono: <strong>+34 914 410 159</strong></li>
                  <li>📧 Email: <strong>info@esclerosismultiple.com</strong></li>
                  <li>📍 Oficina: C. del Limonero, 22. Madrid 28020</li>
                </ul>
                <div className="mt-4 p-4 bg-empulseAccent/15 rounded-lg border border-empulseAccent/30">
                  <p className="text-sm text-empulseAccent">💡 Ofrecen: Asesoría gratuita, grupos de apoyo, información sobre derechos, recursos educativos.</p>
                </div>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Asociaciones Autonómicas</h3>
                <p className="text-slate-300 leading-relaxed">
                  Cada comunidad autónoma tiene asociaciones locales de EM que ofrecen apoyo más cercano, programas de actividad física, charlas informativas y grupos de apoyo.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">EMSP (European MS Platform)</h3>
                <p className="text-slate-300 leading-relaxed">
                  Plataforma europea que coordina información y recursos para personas con EM en toda Europa. Útil si viajas o necesitas información internacional.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">MSIF (MS International Federation)</h3>
                <p className="text-slate-300 leading-relaxed">
                  Federación internacional de organizaciones de EM con recursos, investigación y advocacy global.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Recursos Médicos */}
          <section id="medicos" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">⚕️ Recursos Médicos y de Salud</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Búsqueda de Neurólogos Especializados</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Es crucial tener un neurólogo que conozca EM:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li><strong>Servicio de Salud de tu comunidad:</strong> Solicita derivación a neurologo especialista en EM</li>
                  <li><strong>Asociación de EM:</strong> Pueden recomendar especialistas cercanos</li>
                  <li><strong>Hospitales universitarios:</strong> Suelen tener unidades de EM bien establecidas</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Investigación en EM</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Mantenerse informado sobre avances:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li><strong>CADEM:</strong> Centro de Estudios de Esclerosis Múltiple en España</li>
                  <li><strong>NIH (National Institutes of Health):</strong> ClinicalTrials.gov para ensayos clínicos</li>
                  <li><strong>European MS Platform:</strong> Información sobre nuevos tratamientos</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Terapias Complementarias</h3>
                <p className="text-slate-300 leading-relaxed">
                  Complementan (no reemplazan) el tratamiento médico:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2 mt-3">
                  <li><strong>Fisioterapia especializada:</strong> Crucial para mantener movilidad</li>
                  <li><strong>Logopedia:</strong> Si hay problemas de deglución o voz</li>
                  <li><strong>Terapia ocupacional:</strong> Para adaptación en actividades diarias</li>
                  <li><strong>Neuropsicología:</strong> Si hay afectación cognitiva</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Comunidades Online */}
          <section id="digitales" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">💻 Comunidades Online</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Redes de EM-PULSE</h3>
                <p className="text-slate-300 leading-relaxed">
                  ¡Estás en ella! Nuestra plataforma conecta a personas con EM, ofrece información compartida y comunidad.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Redes Sociales de Asociaciones</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Las principales asociaciones tienen presencia activa:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li><strong>Facebook:</strong> Grupos de apoyo específicos por región</li>
                  <li><strong>Instagram:</strong> Contenido educativo y motivacional</li>
                  <li><strong>TikTok:</strong> Historias reales de vida con EM</li>
                  <li><strong>LinkedIn:</strong> Información sobre empleo y derechos laborales</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Foros Internacionales</h3>
                <p className="text-slate-300 leading-relaxed">
                  Comunidades donde puedes conectar con personas de todo el mundo:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2 mt-3">
                  <li>MS Lifeline</li>
                  <li>MS Research Tracker</li>
                  <li>Patient Communities en Healthcare Platforms</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Canales de YouTube Educativos</h3>
                <p className="text-slate-300 leading-relaxed">
                  Busca canales de neurología, EM y salud que carguen regularmente. Muchos ofrecen charlas de expertos y testimonios.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Apoyo Psicológico */}
          <section id="psicologicos" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">🧠 Apoyo Psicológico y Emocional</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Psicólogo Especializado en EM</h3>
                <p className="text-slate-300 leading-relaxed">
                  La salud mental es parte crucial del manejo de EM. Muchos servicios públicos ofrecen psicólogo en centros de salud. Para uno especializado en enfermedades crónicas, solicita a tu asociación local.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Terapia Online</h3>
                <p className="text-slate-300 leading-relaxed">
                  Si la movilidad es limitada, la terapia telemática es una opción. Plataformas como Mindfulness, apps de meditación, y terapia cognitivo-conductual online.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Grupos de Apoyo Emocional</h3>
                <p className="text-slate-300 leading-relaxed">
                  Conectar con otros que viven lo mismo es terapéutico. Las asociaciones ofrecen grupos presenciales y online donde compartir experiencias.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Crisis o Emergencia Psicológica</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Si sientes que necesitas ayuda inmediata:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li><strong>Teléfono de la Esperanza:</strong> 717 003 717 (España)</li>
                  <li><strong>Urgencias de tu hospital:</strong> Si hay riesgo inmediato</li>
                  <li><strong>Centro de salud mental:</strong> Para citas rápidas</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Consejos Prácticos */}
          <section id="practicos" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">💪 Consejos Prácticos Día a Día</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Gestión de la Fatiga</h3>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li>Planifica actividades alrededor de cuando tienes más energía</li>
                  <li>Usa técnicas de energización (pacing): reparte actividades a lo largo del día</li>
                  <li>Aprende a decir "no" sin culpa</li>
                  <li>Prioriza lo que es realmente importante</li>
                  <li>Duerme suficiente (7-9 horas para muchos)</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Documentación Importante</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Mantén organizados:
                </p>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li>Informes médicos y pruebas (resonancia, análisis)</li>
                  <li>Carnet de discapacidad y documentación legal</li>
                  <li>Recetas actuales y alergias</li>
                  <li>Contactos de especialistas</li>
                  <li>Diario de síntomas (útil para médicos)</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Accesibilidad en el Hogar</h3>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li>Pasamanos en baños y escaleras</li>
                  <li>Pisos antideslizantes</li>
                  <li>Asientos elevados de inodoro si ayuda</li>
                  <li>Luz apropiada (especialmente si hay problemas visuales)</li>
                  <li>Aparatos de cocina accesibles</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Comunicación con tu Equipo Médico</h3>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li>Anota preguntas antes de citas</li>
                  <li>Sé honesto sobre síntomas que afectan tu vida</li>
                  <li>Reporta efectos secundarios de medicamentos</li>
                  <li>Pide explicaciones claras</li>
                  <li>Lleva a alguien de confianza si lo necesitas</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Red de Apoyo Social</h3>
                <ul className="text-slate-300 space-y-2 list-disc list-inside ml-2">
                  <li>Comunica tus necesidades a familia y amigos</li>
                  <li>No te aísles—el aislamiento empeora fatiga y depresión</li>
                  <li>Busca actividades que puedas hacer (aunque sean pequeñas)</li>
                  <li>Considera cuidador o asistente si lo necesitas</li>
                  <li>Mantén roles sociales significativos para ti</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button onClick={scrollToTop} className="text-empulsePrimary hover:text-empulseMid transition-colors">
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Conclusión */}
          <section className="bg-gradient-to-r from-empulseAccent/10 to-empulseMid/10 border border-empulseAccent/30 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-empulsePrimary mb-4">🌟 Recuerda</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vivir con EM es desafiante, pero <strong>no estás solo</strong>. Hay recursos, profesionales, y una comunidad entera de personas que entienden. El conocimiento es poder: cuanto más sepas sobre tus derechos, opciones y estrategias, mejor podrás navegar tu camino.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Alcanza a asociaciones, únete a comunidades, busca apoyo profesional. Tu salud mental y física importan. Mereces vivir con dignidad, autonomía y esperanza.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
