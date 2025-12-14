import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';

export default function MentalHealth({ showMentalHealth, setShowMentalHealth }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMentalHealth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showMentalHealth]);

  if (!showMentalHealth) return null;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 180; // Header (64px) + menu desktop (64px) + margin
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
            Salud Mental
          </h1>
          <Button
            onClick={() => setShowMentalHealth(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>

        {/* Menú de Navegación Interna - Desktop */}
        <div className="hidden md:block border-t border-empulseAccent/20 bg-empulseBg/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => scrollToSection('impacto')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Impacto de la EM
            </button>

            <button
              onClick={() => scrollToSection('importante')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Por Qué es Importante
            </button>

            <button
              onClick={() => scrollToSection('profesional')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Buscar Ayuda Profesional
            </button>

            <button
              onClick={() => scrollToSection('apoyo')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Red de Apoyo
            </button>

            <button
              onClick={() => scrollToSection('cuidado')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Autocuidado
            </button>

            <button
              onClick={() => scrollToSection('esperanza')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Hay Esperanza
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
                onClick={() => { scrollToSection('impacto'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Impacto de la EM
              </button>
              <button
                onClick={() => { scrollToSection('importante'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Por Qué es Importante
              </button>
              <button
                onClick={() => { scrollToSection('profesional'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Buscar Ayuda Profesional
              </button>
              <button
                onClick={() => { scrollToSection('apoyo'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Red de Apoyo
              </button>
              <button
                onClick={() => { scrollToSection('cuidado'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Autocuidado
              </button>
              <button
                onClick={() => { scrollToSection('esperanza'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Hay Esperanza
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
              La Esclerosis Múltiple no solo afecta tu cuerpo. Afecta tu mente, tus emociones, tu forma de verte a ti mismo y tu lugar en el mundo. 
              <strong> Tu salud mental es tan importante como tu salud física, quizás más.</strong>
            </p>
          </section>

          {/* Impacto de la EM en la salud mental */}
          <section id="impacto" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">El Impacto de la EM en tu Salud Mental</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">😔 La Depresión</h3>
                <p className="text-slate-300 leading-relaxed">
                  No es debilidad. No es falta de positivismo. La depresión en la EM es neurológica. Tu cerebro está inflamado, tus neurotransmisores están afectados. 
                  La depresión es una parte común de vivir con EM, y <strong>merece tratamiento profesional</strong>.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">😰 La Ansiedad</h3>
                <p className="text-slate-300 leading-relaxed">
                  ¿Y si empeoro? ¿Y si pierdo mi independencia? ¿Y si no puedo trabajar? La incertidumbre de la EM genera ansiedad constante. 
                  No sabemos qué vendrá mañana, y eso es aterrador. Tu ansiedad es válida, y también necesita apoyo.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">😔 Duelo y Pérdida</h3>
                <p className="text-slate-300 leading-relaxed">
                  Hemos perdido la vida que esperábamos tener. Los planes que hicimos. La independencia que dábamos por sentado. 
                  Este duelo es real, profundo, y merece ser honrado y procesado con ayuda.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">🤔 Aislamiento Emocional</h3>
                <p className="text-slate-300 leading-relaxed">
                  Es difícil hablar del dolor. Es difícil admitir que te estás hundiendo. Muchas personas con EM se retiran, pensando que otros no comprenderán. 
                  El silencio es veneno para la salud mental.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-lg bg-empulsePrimary/20 border border-empulsePrimary/40 text-empulsePrimary hover:bg-empulsePrimary/30 transition-all duration-200 text-sm font-semibold"
                title="Volver al inicio"
              >
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Por qué es importante */}
          <section id="importante" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Por Qué tu Salud Mental es Vital</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-3">🧠 Tu Salud Física Depende de Ella</h3>
                <p className="text-slate-300 text-sm">
                  La depresión y la ansiedad ralentizan la recuperación, debilitan el sistema inmunológico, aumentan la inflamación y empeoran los síntomas de la EM. 
                  Tu mente y tu cuerpo no están separados. Lo que sientes mentalmente afecta directamente cómo se comporta tu EM.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-3">💪 Te Da Fuerza para Seguir Adelante</h3>
                <p className="text-slate-300 text-sm">
                  La EM es una maratón, no un sprint. Para mantener la esperanza, la motivación y la resiliencia durante años o décadas, 
                  necesitas una salud mental sólida. Es lo que te permite levantarte cuando todo duele.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-3">🌟 Te Permite Vivir, No Solo Existir</h3>
                <p className="text-slate-300 text-sm">
                  La EM puede quitar muchas cosas, pero no tiene que quitarte la alegría, la conexión, el propósito y la esperanza. 
                  Cuidar tu salud mental es lo que te permite disfrutar de lo que aún tienes.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-3">🤝 Mejora tus Relaciones</h3>
                <p className="text-slate-300 text-sm">
                  Cuando estás deprimido o ansioso, es difícil conectar con otros. El aislamiento empeora todo. 
                  Cuidar tu salud mental te permite mantener las relaciones que son tu salvavidas.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-lg bg-empulsePrimary/20 border border-empulsePrimary/40 text-empulsePrimary hover:bg-empulsePrimary/30 transition-all duration-200 text-sm font-semibold"
                title="Volver al inicio"
              >
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Buscar ayuda profesional */}
          <section id="profesional" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">No Dejes de Buscar Ayuda Profesional</h2>
            
            <div className="bg-gradient-to-r from-empulseAccent/10 to-empulsePrimary/10 border border-empulseAccent/30 rounded-xl p-6 mb-6">
              <p className="text-slate-300 leading-relaxed text-lg">
                <strong>Buscar ayuda profesional no es debilidad. Es la cosa más valiente que puedes hacer.</strong>
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">🏥 Psicólogos y Psiquiatras</h3>
                <p className="text-slate-300 leading-relaxed">
                  Busca profesionales que entiendan la EM. Alguien que entienda que tu depresión no es por "pensar en negativo", 
                  sino que es una parte neurológica real de tu enfermedad. La terapia cognitivo-conductual y los medicamentos pueden ser transformadores.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">💬 Terapia en Línea</h3>
                <p className="text-slate-300 leading-relaxed">
                  Si salir de casa es difícil (como a menudo lo es con la EM), la terapia en línea es una opción increíble. 
                  Puedes conectar desde la comodidad de tu hogar, en tus mejores momentos del día.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">👥 Grupos de Apoyo</h3>
                <p className="text-slate-300 leading-relaxed">
                  Hablar con otras personas que viven exactamente lo que vives es sanador. Los grupos de apoyo entienden sin necesidad de explicar. 
                  Busca en línea o a través de asociaciones de EM en tu zona.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">🧘 Técnicas de Mindfulness y Meditación</h3>
                <p className="text-slate-300 leading-relaxed">
                  Estas prácticas pueden ayudar a manejar la ansiedad, reducir el estrés y mejorar tu relación con tu cuerpo. 
                  Hay muchas apps y recursos gratuitos disponibles.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-lg bg-empulsePrimary/20 border border-empulsePrimary/40 text-empulsePrimary hover:bg-empulsePrimary/30 transition-all duration-200 text-sm font-semibold"
                title="Volver al inicio"
              >
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Red de apoyo */}
          <section id="apoyo" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Tu Red de Apoyo: Familiares y Amigos</h2>
            
            <div className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-xl p-6 mb-6">
              <p className="text-slate-300 leading-relaxed text-lg">
                <strong>No estás solo en esto.</strong> La lucha contra la EM es una lucha compartida con quienes te aman.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">💬 Comunica lo que Necesitas</h3>
                <p className="text-slate-300 leading-relaxed">
                  Tu familia y amigos no pueden leer la mente. Diles cuando estés luchando. Diles específicamente qué tipo de apoyo necesitas: 
                  ¿Un abrazo? ¿Alguien que escuche? ¿Ayuda práctica? ¿Distracción? La comunicación clara es clave.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">🤝 Deja que te Ayuden</h3>
                <p className="text-slate-300 leading-relaxed">
                  Muchas personas con EM rechazamos la ayuda por orgullo o culpa. Pero dejar que otros te ayuden es un regalo para ellos también. 
                  Les das propósito, los haces sentir útiles. Aceptar ayuda es una forma de amor.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">📞 Mantén las Conexiones</h3>
                <p className="text-slate-300 leading-relaxed">
                  El aislamiento es veneno. Aunque sea una breve llamada telefónica, un mensaje de texto, o una videollamada cuando salir es difícil. 
                  Mantén la conexión con las personas que amas, incluso en tus peores días.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">❤️ Permite que te Vean Vulnerable</h3>
                <p className="text-slate-300 leading-relaxed">
                  No tienes que ser fuerte todo el tiempo. No tienes que pretender que estás bien cuando no lo estás. 
                  Las personas que te aman quieren conocer la versión real de ti, incluso la versión que está asustada o destrozada.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-lg bg-empulsePrimary/20 border border-empulsePrimary/40 text-empulsePrimary hover:bg-empulsePrimary/30 transition-all duration-200 text-sm font-semibold"
                title="Volver al inicio"
              >
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Autocuidado */}
          <section id="cuidado" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Prácticas de Autocuidado para tu Salud Mental</h2>
            
            <div className="space-y-4">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">🎨 Haz Algo que Ames</h3>
                <p className="text-slate-300 text-sm">
                  Leer, música, arte, escribir, películas. Aunque solo sea 15 minutos. Algo que te traiga alegría o te distraiga del dolor.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">😴 Duerme Bien</h3>
                <p className="text-slate-300 text-sm">
                  El insomnio y la fatiga son comunes con la EM. Pero el sueño es medicina para la salud mental. 
                  Habla con tu médico sobre opciones de tratamiento si el sueño es un problema.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">🌞 Luz Natural y Aire Fresco</h3>
                <p className="text-slate-300 text-sm">
                  Aunque sea sentarse en la ventana o en un patio. La luz natural y el aire fresco tienen un impacto real en el estado de ánimo.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">📔 Escribe tus Sentimientos</h3>
                <p className="text-slate-300 text-sm">
                  Un diario es un lugar seguro para tus emociones más oscuras. No tiene que ser perfecto, solo honesto.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">🚫 Cuida tu Relación con las Redes Sociales</h3>
                <p className="text-slate-300 text-sm">
                  Ver a otros viviendo vidas "perfectas" puede ser devastador cuando estás luchando. Está bien alejarte, desmutearlo o dejar de seguir.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">🎯 Sé Compasivo Contigo Mismo</h3>
                <p className="text-slate-300 text-sm">
                  Los malos días no significan que fracasaste. La depresión no es tu culpa. Hablate como hablarías a un amigo enfermo.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-lg bg-empulsePrimary/20 border border-empulsePrimary/40 text-empulsePrimary hover:bg-empulsePrimary/30 transition-all duration-200 text-sm font-semibold"
                title="Volver al inicio"
              >
                ↑ Arriba
              </button>
            </div>
          </section>

          {/* Hay esperanza */}
          <section id="esperanza" className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Hay Esperanza</h2>
            
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                La salud mental con la EM es posible. <strong>No es fácil, pero es posible.</strong>
              </p>

              <p>
                Millones de personas viven con EM y depresión, ansiedad, y dolor emocional. Millones de nosotros hemos estado en el fondo más oscuro 
                y hemos encontrado una forma de salir, o al menos de aprender a vivir con la oscuridad.
              </p>

              <p>
                Los medicamentos funcionan. La terapia funciona. El apoyo funciona. No funciona rápido, no es lineal, pero funciona.
              </p>

              <p>
                <strong>Tu depresión no define tu vida.</strong> Tu ansiedad no es el final de tu historia. Eres más grande que tu diagnóstico, 
                más resiliente que tu debilidad, más valioso que tu productividad.
              </p>

              <p>
                Mereces apoyo. Mereces cuidado. Mereces una vida con alegría y conexión y propósito, a pesar de la EM.
              </p>

              <p className="text-lg font-semibold text-empulseMid">
                No estás solo. Tu lucha por tu salud mental es exactamente eso: una lucha. Y estás luchando. Eso es suficiente. Eso es increíble.
              </p>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-lg bg-empulsePrimary/20 border border-empulsePrimary/40 text-empulsePrimary hover:bg-empulsePrimary/30 transition-all duration-200 text-sm font-semibold"
                title="Volver al inicio"
              >
                ↑ Arriba
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
