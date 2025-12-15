import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';

export default function EMForma({ showMovement, setShowMovement }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMovement) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showMovement]);

  if (!showMovement) return null;

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
            Movimiento y Ejercicio
          </h1>
          <Button
            onClick={() => setShowMovement(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>

        {/* Menú de Navegación Interna - Desktop */}
        <div className="hidden md:block border-t border-empulseAccent/20 bg-empulseBg/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => scrollToSection('vital')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              ¿Por Qué Vital?
            </button>

            <button
              onClick={() => scrollToSection('problema')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              El Problema
            </button>

            <button
              onClick={() => scrollToSection('redefinir')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Redefinir Ejercicio
            </button>

            <button
              onClick={() => scrollToSection('encerrado')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              No Quedarse Encerrado
            </button>

            <button
              onClick={() => scrollToSection('practico')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Consejos Prácticos
            </button>

            <button
              onClick={() => scrollToSection('cuidadores')}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold whitespace-nowrap"
            >
              Para Cuidadores
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
                onClick={() => { scrollToSection('vital'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                ¿Por Qué Vital?
              </button>
              <button
                onClick={() => { scrollToSection('problema'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                El Problema
              </button>
              <button
                onClick={() => { scrollToSection('redefinir'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Redefinir Ejercicio
              </button>
              <button
                onClick={() => { scrollToSection('encerrado'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                No Quedarse Encerrado
              </button>
              <button
                onClick={() => { scrollToSection('practico'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Consejos Prácticos
              </button>
              <button
                onClick={() => { scrollToSection('cuidadores'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-empulseAccent/15 text-slate-300 hover:bg-empulseAccent/25 hover:text-white transition-all duration-200 text-sm font-semibold"
              >
                Para Cuidadores
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="space-y-12 text-slate-200 leading-relaxed text-justify">
          
          {/* Introducción empática */}
          <section className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
            <p className="text-lg text-empulseSoft leading-relaxed">
              "No tengo energía", "Me duele demasiado", "No puedo hacer lo que solía hacer". Si vives con Esclerosis Múltiple, estas frases resonarán contigo. 
              Pero aquí está la verdad incómoda: <strong>el movimiento es precisamente lo que necesitas, incluso cuando es lo más difícil de hacer.</strong>
            </p>
          </section>

          {/* Por qué el movimiento importa */}
          <section id="vital" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">¿Por Qué el Movimiento es Vital?</h2>
            
            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">💪 Fortaleza Muscular</h3>
                <p className="text-slate-300 leading-relaxed">
                  La EM causa debilidad muscular. El movimiento regular ayuda a mantener la fuerza que tienes y ralentiza la pérdida de músculo. 
                  No se trata de convertirte en un atleta. Se trata de mantener el cuerpo trabajando, de cualquier manera que puedas.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">⚖️ Equilibrio y Prevención de Caídas</h3>
                <p className="text-slate-300 leading-relaxed">
                  La EM afecta el equilibrio. Ejercicios simples de equilibrio pueden significar la diferencia entre vivir independientemente 
                  y depender de ayuda. Una caída puede cambiar todo. El movimiento es prevención.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">🧠 Salud Cerebral</h3>
                <p className="text-slate-300 leading-relaxed">
                  El ejercicio aumenta el flujo sanguíneo al cerebro, mejora la cognición, reduce el "brain fog", 
                  y combate la depresión y la ansiedad. En la EM, el ejercicio puede ayudar a proteger la función neurológica.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">💓 Salud Cardiovascular</h3>
                <p className="text-slate-300 leading-relaxed">
                  Las personas con EM tienen mayor riesgo de enfermedad cardíaca. El movimiento fortalece el corazón, 
                  mejora la circulación y reduce los problemas cardiovasculares. Tu corazón necesita movimiento para permanecer fuerte.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">🌞 Bienestar Mental</h3>
                <p className="text-slate-300 leading-relaxed">
                  El ejercicio es uno de los mejores tratamientos para la depresión y la ansiedad. No es solo sobre la salud física. 
                  Es sobre sentirse vivo, tener propósito, y recordar que tu cuerpo aún puede hacer cosas.
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

          {/* El problema: "No puedo" */}
          <section id="problema" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">El Problema: "No Puedo"</h2>
            
            <div className="bg-empulsePrimary/10 border border-empulsePrimary/30 rounded-xl p-6 mb-6">
              <p className="text-slate-300 leading-relaxed">
                <strong>Entendemos que esto es difícil.</strong> Muy difícil. Cuando vives con EM, el movimiento puede ser agónico. 
                La fatiga puede ser tan severa que levantarse de la cama siente como escalar una montaña. 
                El dolor puede ser insoportable. La debilidad puede hacer que caminar sea peligroso.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">😩 La Fatiga</h3>
                <p className="text-slate-300 text-sm">
                  No es pereza. No se cura con "hacer más" o "simplemente supéralo". Es neurológica. 
                  Algunos días, el movimiento es imposible, y eso está bien. Pero los días que sí puedes, el movimiento importa.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">🔥 El Dolor</h3>
                <p className="text-slate-300 text-sm">
                  El movimiento puede dolery eso es frustrante. Pero hay un equilibrio: movimiento suave, 
                  adaptado a tu cuerpo, puede ayudar a manejar el dolor a largo plazo.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">🌡️ Intolerancia al Calor</h3>
                <p className="text-slate-300 text-sm">
                  Muchas personas con EM no toleran el calor. El ejercicio genera calor. Esto significa que necesitas ser creativo: 
                  ejercicio en la mañana, en el agua, o en ambientes frescos.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">😔 La Depresión</h3>
                <p className="text-slate-300 text-sm">
                  La depresión roba la motivación. Sabes que necesitas moverte, pero no puedes encontrar la energía emocional. 
                  Aquí es donde necesitas a alguien a tu lado, no juzgando, sino apoyando.
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

          {/* Redefinir el "ejercicio" */}
          <section id="redefinir" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Redefinir el Ejercicio</h2>
            
            <div className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-xl p-6 mb-6">
              <p className="text-slate-300 leading-relaxed">
                <strong>Olvida lo que crees que "ejercicio" significa.</strong> No es CrossFit. No es correr. 
                No es ir al gimnasio. El ejercicio con EM es cualquier movimiento que sea seguro y sostenible para TI.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulsePrimary mb-3">Algunos ejemplos:</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>✓ <strong>Caminar:</strong> 5 minutos, 10 minutos, o simplemente por la casa. Cualquier cantidad cuenta.</li>
                  <li>✓ <strong>Agua:</strong> Nadar o hacer aqua-aeróbicos. El agua apoya tu cuerpo y reduce la intolerancia al calor.</li>
                  <li>✓ <strong>Yoga suave:</strong> No acroyoga. Yoga lento que se enfoca en flexibilidad y calma.</li>
                  <li>✓ <strong>Tai Chi:</strong> Movimiento lento, equilibrio, calma. Perfecto para EM.</li>
                  <li>✓ <strong>Pilates modificado:</strong> Core strength sin impacto.</li>
                  <li>✓ <strong>Estiramientos:</strong> Combate la espasticidad y ayuda con el rango de movimiento.</li>
                  <li>✓ <strong>Fisioterapia:</strong> Ejercicios específicos para TUS necesidades, supervisados por profesionales.</li>
                  <li>✓ <strong>Movimiento en la casa:</strong> Bailar lentamente, hacer tareas del hogar, subir escaleras lentamente.</li>
                  <li>✓ <strong>Ciclismo estacionario:</strong> Control total de la intensidad. Puedes parar cuando quieras.</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-3">Lo Importante:</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Debe ser <strong>seguro</strong> para TU cuerpo, <strong>adaptable</strong> a cómo te sientas ese día, 
                  y <strong>sostenible</strong> a largo plazo. No debe dejarte tan exhausto que pierdas días. 
                  Debe ser algo que puedas hacer regularmente, incluso si es pequeño.
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

          {/* No quedarse encerrado */}
          <section id="encerrado" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">No Quedarse Encerrado</h2>
            
            <div className="bg-empulsePrimary/10 border border-empulsePrimary/30 rounded-xl p-6 mb-6">
              <p className="text-slate-300 leading-relaxed text-lg">
                <strong>Es fácil quedarse en casa.</strong> Es seguro. No hay que preocuparse por caerse en público, 
                sobre explicaciones, o juicios. La casa es controlable.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Pero...</h3>
                <p className="text-slate-300 leading-relaxed">
                  Quedarse encerrado crea más aislamiento. Aumenta la depresión. Te quita conexión con el mundo y con la gente. 
                  Y psicológicamente, refuerza la creencia de que no puedes hacer nada. Te debilita, no solo el cuerpo, 
                  sino también el espíritu.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-empulseMid mb-3">Salir, sea como sea:</h3>
                <ul className="space-y-3 text-slate-300">
                  <li>✓ <strong>Camina por el barrio</strong> aunque sea 5 minutos. El cambio de aire y la luz natural son medicina.</li>
                  <li>✓ <strong>Siéntate en un parque.</strong> No necesitas moverte para estar fuera. Estar en la naturaleza importa.</li>
                  <li>✓ <strong>Visita a alguien.</strong> Incluso si tienes que sentarte todo el tiempo. La conexión es movimiento emocional.</li>
                  <li>✓ <strong>Ve a un café, una tienda, una biblioteca.</strong> Estar en espacios públicos, aunque sea pasivamente.</li>
                  <li>✓ <strong>Únete a un grupo de apoyo.</strong> En persona o en línea. La comunidad es vital.</li>
                  <li>✓ <strong>Participa en actividades desde casa.</strong> Yoga en línea, clases virtuales. Sigue siendo conexión.</li>
                </ul>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-3">Por qué importa no quedarse encerrado:</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  La aislamiento amplifica todo lo malo: depresión, ansiedad, pérdida de identidad, pérdida de esperanza. 
                  Pero salir, aunque sea un poco, te recuerda que sigues siendo parte del mundo. 
                  Que aún tienes capacidad, aunque sea diferente.
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

          {/* Consejos prácticos */}
          <section id="practico" className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Consejos Prácticos</h2>
            
            <div className="space-y-4">
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">Empieza Pequeño</h3>
                <p className="text-slate-300 text-sm">
                  Si no has hecho nada, comienza con 5 minutos. Una vez alrededor de la casa. 
                  Luego, cuando sea sostenible, aumenta gradualmente. No esperes lograr en una semana lo que otros hacen todos los días.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">Encuentra Tu Paced Exertion (PE)</h3>
                <p className="text-slate-300 text-sm">
                  No sobrecargues tu energía. Muchas personas con EM sufren "post-exertional malaise" (PEM): 
                  hacer demasiado hoy significa que sufres mañana. El ejercicio debe ser sostenible.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">Busca Profesionales que Entiendan EM</h3>
                <p className="text-slate-300 text-sm">
                  Un fisioterapeuta que entienda EM es oro puro. Te pueden prescribir ejercicios específicos para TI. 
                  No todos los terapeutas entienden la EM. Busca uno que sí.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">Clima y Horario Importan</h3>
                <p className="text-slate-300 text-sm">
                  Ejercítate en la mañana o noche si el calor es un problema. En invierno o en agua. 
                  Planifica alrededor de tu cuerpo, no contra él.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">Crea Consistencia, No Perfección</h3>
                <p className="text-slate-300 text-sm">
                  Mejor hacer 10 minutos, 3 veces por semana, cada semana, que 60 minutos una vez 
                  y luego caer en la depresión porque no puedes mantenerlo. La consistencia, aunque sea mínima, es poderosa.
                </p>
              </div>

              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-empulseMid mb-2">Celebra Todo Movimiento</h3>
                <p className="text-slate-300 text-sm">
                  Caminar 5 minutos es victoria. Hacer 10 estiramientos es excelente. Salir de la casa es éxito. 
                  No compares tu movimiento con el de otras personas. Tu movimiento es suficiente.
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

          {/* Mensaje para los cuidadores */}
          <section id="cuidadores" className="bg-gradient-to-r from-empulseAccent/10 to-empulsePrimary/10 border border-empulseAccent/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-empulseAccent mb-6">Para los Cuidadores y Familia:</h2>
            
            <div className="space-y-4 text-slate-300 text-sm">
              <p>
                <strong>✓ Anima, pero no obligues.</strong> "¿Quieres dar una caminata hoy?" es mejor que "Necesitas hacer más ejercicio."
              </p>
              <p>
                <strong>✓ Acompaña si es necesario.</strong> Muchas personas se sienten más seguras y motivadas con compañía. Camina con ellos, aunque sea lentamente.
              </p>
              <p>
                <strong>✓ Adapta el ritmo.</strong> Si eso significa caminar muy lentamente, parar frecuentemente, o solo 5 minutos, ese es el ritmo correcto.
              </p>
              <p>
                <strong>✓ Reconoce el esfuerzo, no solo el resultado.</strong> "Veo que lo intentaste incluso cuando fue difícil. Eso es increíble."
              </p>
              <p>
                <strong>✓ No critiques días de poco movimiento.</strong> Algunos días, su EM no permite movimiento. Eso no es fracaso. Es la enfermedad.
              </p>
              <p>
                <strong>✓ Sé un recordatorio de que la vida sigue.</strong> Ayuda a mantener salidas, conexiones, vida. Salir y movimiento son parte de estar vivo.
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

          {/* Mensaje final */}
          <section className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-empulsePrimary mb-4">La Verdad Final</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Vivir con EM significa que algunos días, "movimiento" significa levantarse de la cama. 
              Otros días significa una caminata. Algunos días, solo estar sentado afuera. 
              <strong> Todo cuenta. Todo importa. Todo es victoria.</strong>
            </p>
            <p className="text-slate-300 leading-relaxed text-lg mt-4">
              No se trata de volverte saludable o "normal". Se trata de mantener tu cuerpo lo mejor posible, 
              proteger tu mente, y recordarte a ti mismo que aunque la EM es limitante, 
              <strong> tú no lo eres completamente.</strong>
            </p>
            <p className="text-slate-300 leading-relaxed text-lg mt-4 italic">
              Muévete, de la forma que puedas. Sal, aunque sea poco. Y recuerda: tu movimiento, 
              sin importar cuán pequeño sea, es un acto de amor hacia ti mismo.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
