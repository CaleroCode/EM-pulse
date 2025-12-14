import Button from '../components/ui/Button';

export default function WhatIsEM({ showWhatIsEM, setShowWhatIsEM }) {
  if (!showWhatIsEM) return null;

  return (
    <div className="min-h-screen bg-empulseBg flex flex-col">
      {/* Header con botón para volver */}
      <div className="sticky top-0 z-30 border-b border-empulseAccent/20 bg-empulseBg/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-empulsePrimary to-empulseMid">
            ¿Qué es la Esclerosis Múltiple?
          </h1>
          <Button
            onClick={() => setShowWhatIsEM(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>
      </div>

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="space-y-12 text-slate-200 leading-relaxed">
          {/* Introducción empática */}
          <section className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <p className="text-lg text-empulseSoft">
              Cuando te diagnostican <strong>Esclerosis Múltiple</strong>, el mundo puede parecer cambiar de repente. Nuevas palabras entran en tu vocabulario, nuevas preocupaciones ocupan tu mente. Pero es importante que sepas que <strong>no estás solo</strong> y que entender qué es la EM es el primer paso para aprender a vivirla.
            </p>
          </section>

          {/* Qué es la EM */}
          <section className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-6">¿Qué es la Esclerosis Múltiple?</h2>
            <div className="space-y-6">
              <p className="text-lg">
                La <strong>Esclerosis Múltiple (EM)</strong> es una enfermedad neurológica que afecta el sistema nervioso central —el cerebro y la médula espinal—. Tu cuerpo posee un sistema inmunológico diseñado para protegerte de virus y bacterias, pero en el caso de la EM, este sistema de defensa comete un error.
              </p>
              <p className="text-lg">
                Las fibras nerviosas de tu cerebro y médula espinal están protegidas por una cubierta llamada <strong>vaina de mielina</strong>, similar a los aislantes en los cables eléctricos. En la EM, el sistema inmunológico ataca erróneamente esta protección, dañándola de forma repetida e impredecible.
              </p>
              <div className="bg-empulsePrimary/5 border-l-4 border-empulsePrimary p-6 rounded">
                <p className="text-empulseSoft italic">
                  Es como si tu cuerpo confundiera sus propias defensas con una amenaza y las atacara a sí mismo. No es tu culpa. No es algo que hiciste. Es simplemente lo que pasó.
                </p>
              </div>
            </div>
          </section>

          {/* Por qué ocurre */}
          <section className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-6">¿Por qué ocurre?</h2>
            <div className="space-y-6">
              <p className="text-lg">
                Honestamente, los científicos aún no comprenden completamente por qué el sistema inmunológico ataca la vaina de mielina. Lo que sí saben es que la EM es el resultado de una <strong>combinación de factores</strong>:
              </p>
              <div className="space-y-4">
                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-empulsePrimary mb-2">🧬 Genética</h3>
                  <p className="text-empulseSoft">
                    Heredas una predisposición a que tu cuerpo sea más susceptible a desarrollar enfermedades autoinmunes. Pero tener los genes no significa que forzosamente tendrás EM.
                  </p>
                </div>
                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-empulsePrimary mb-2">🌍 Factores ambientales</h3>
                  <p className="text-empulseSoft">
                    Ciertas infecciones, el estrés prolongado, la falta de vitamina D o la ubicación geográfica pueden aumentar el riesgo. Tu ambiente interactúa con tu biología de maneras complejas.
                  </p>
                </div>
                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-empulsePrimary mb-2">⚡ Un evento detonador</h3>
                  <p className="text-empulseSoft">
                    A veces, algo como una infección viral específica puede activar el error inmunológico. Es como si tu cuerpo aprendiera a atacarse a sí mismo tras un malentendido.
                  </p>
                </div>
              </div>
              <div className="bg-empulseMid/5 border-l-4 border-empulseMid p-6 rounded">
                <p className="text-empulseSoft italic">
                  Lo importante es que la EM <strong>no es contagiosa</strong>, no es causada por algo que hiciste o no hiciste. No es debilidad ni castigo. Es una condición médica compleja con la que millones de personas viven cada día.
                </p>
              </div>
            </div>
          </section>

          {/* Mensaje de esperanza */}
          <section className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-empulsePrimary mb-6">Un Camino de Aprendizaje</h2>
            <div className="space-y-4 text-lg">
              <p>
                La Esclerosis Múltiple es <strong>la enfermedad de las mil caras</strong>, como decimos en la comunidad. Cada persona la experimenta de manera completamente diferente. Lo que alguien experimenta podría no ser lo que tú experimentes.
              </p>
              <p>
                Pero con el tratamiento adecuado, el apoyo de profesionales de salud, la comprensión de tu círculo cercano y, más importante aún, con <strong>conexión con otros que lo entienden</strong>, muchas personas con EM logran vivir vidas significativas, productivas y llenas.
              </p>
              <p className="text-empulseMid font-semibold">
                No estás aquí por azar. Estás en EM-PULSE porque queremos que sepas que <strong>no estás solo en este camino</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
