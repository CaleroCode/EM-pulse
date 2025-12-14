import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';

// Mapeo de síntomas comunes a explicaciones empáticas para cuidadores
const symptomExplanations = {
  'fatiga': {
    title: 'Comprendiendo la Fatiga en la EM',
    caregiverNote: 'La fatiga en la EM no es como el cansancio normal. No se resuelve con descanso típico.',
    explanation: 'La fatiga es uno de los síntomas más debilitantes y menos visibles de la EM. Puede aparecer sin motivo aparente y hacer que tareas simples (ducharse, preparar comida) parezcan montañas imposibles de escalar. Es una sensación de agotamiento profundo que afecta el cuerpo y la mente simultáneamente.',
    howToSupport: [
      '✓ No asumas que necesita "más descanso". La fatiga de la EM es neurológica.',
      '✓ Ayuda a priorizar tareas. Algunos días son mejores que otros.',
      '✓ Entiende que puede estar bien mentalmente pero exhausto físicamente.',
      '✓ Ofrece ayuda en actividades diarias sin presionar.',
      '✓ Celebra los días productivos, sin juzgar los días de recuperación.'
    ],
    quotes: '"Me despiertas después de 12 horas de sueño y siento como si no hubiera dormido nada."'
  },
  'dolor': {
    title: 'Comprendiendo el Dolor en la EM',
    caregiverNote: 'El dolor en la EM puede ser crónico, intermitente y extremadamente frustrante.',
    explanation: 'El dolor en la EM viene en muchas formas: ardor, punzadas, entumecimiento doloroso, calambres musculares. El dolor crónico afecta emocionalmente. La persona vive con la incertidumbre de cuándo llegará, cuánto durará y qué actividades podrá hacer ese día.',
    howToSupport: [
      '✓ Escucha sin minimizar. El dolor no es imaginario.',
      '✓ No preguntes "¿Duele mucho?" con escepticismo. Hay dolor incluso cuando se ve "bien".',
      '✓ Ayuda a encontrar posiciones cómodas o técnicas de alivio que funcionan.',
      '✓ Sé comprensivo con los cambios de planes por dolor inesperado.',
      '✓ Apoya las opciones de tratamiento del dolor sin juzgar.'
    ],
    quotes: '"Es como si tuviera vidrio molido debajo de la piel. Duele constantemente."'
  },
  'debilidad': {
    title: 'Comprendiendo la Debilidad en la EM',
    caregiverNote: 'La debilidad puede ser selectiva (un brazo, una pierna) o generalizada.',
    explanation: 'La debilidad en la EM significa que los músculos no responden como deberían. Puede afectar un lado del cuerpo, varias extremidades, o ser generalizada. Lo más frustrante es la inconsistencia: algunos días puede caminar bien, otros días no.',
    howToSupport: [
      '✓ Ofrece tu brazo para apoyarse sin hacer que se sienta como una carga.',
      '✓ Ayuda con tareas que requieren fuerza sin hacer que se sienta débil emocionalmente.',
      '✓ Entiende que rechazar ayuda no es orgullo, es necesidad de independencia.',
      '✓ Sé paciente si tarda más tiempo. No apures.',
      '✓ Celebra los días cuando tiene más fuerza.'
    ],
    quotes: '"Mis piernas no obedecen mis órdenes. Es como si estuvieran bajo control de otra persona."'
  },
  'entumecimiento': {
    title: 'Comprendiendo el Entumecimiento en la EM',
    caregiverNote: 'El entumecimiento puede afectar la sensibilidad, el equilibrio y la conciencia corporal.',
    explanation: 'El entumecimiento significa que la comunicación entre nervios y cerebro está interrumpida. La persona puede no sentir temperatura, dolor o texturas adecuadamente. Es aterrador porque pierden la conciencia de dónde está su cuerpo en el espacio.',
    howToSupport: [
      '✓ Ayuda a prevenir lesiones por accidentes no detectados (quemaduras, golpes).',
      '✓ Entiende que la falta de sensación es tan discapacitante como el dolor.',
      '✓ Sé considerado con la temperatura: verifica si tienen frío o calor.',
      '✓ Ayuda con el equilibrio si es necesario, discretamente.',
      '✓ Reconoce el miedo que puede traer la pérdida de sensación.'
    ],
    quotes: '"No puedo sentir mis pies. Es como caminar sobre dos bloques de hielo."'
  },
  'visión': {
    title: 'Comprendiendo los Problemas de Visión en la EM',
    caregiverNote: 'Los problemas de visión pueden ser temporales o progresivos.',
    explanation: 'La EM puede afectar los nervios ópticos, causando visión borrosa, dolor al mover los ojos, pérdida de visión en partes del campo visual. Los problemas visuales son especialmente aterradores porque afectan la independencia.',
    howToSupport: [
      '✓ Ayuda con la lectura o la navegación sin presionar.',
      '✓ Entiende que esto afecta la confianza y la independencia.',
      '✓ Sé paciente si necesita tiempo para enfocarse o moverse lentamente.',
      '✓ Avisa sobre obstáculos o cambios en el entorno.',
      '✓ Apoya las adaptaciones visuales (lentes, ampliación, etc.).'
    ],
    quotes: '"Un día veo perfectamente, al siguiente toda una parte de mi visión desaparece."'
  },
  'problemas cognitivos': {
    title: 'Comprendiendo el "Brain Fog" en la EM',
    caregiverNote: 'Los problemas cognitivos son reales pero a menudo invisibles para otros.',
    explanation: 'El "brain fog" es cuando la mente se siente nublada, hay dificultad para concentrarse, problemas de memoria, lentitud mental. La persona sabe lo que quiere decir pero no puede acceder a las palabras.',
    howToSupport: [
      '✓ No tomes silencio como desinterés. Pueden estar lidiando con la niebla mental.',
      '✓ Sé paciente si repite información o olvida detalles recientes.',
      '✓ Ayuda con organizadores o recordatorios sin hacer que se sienta infantil.',
      '✓ Reconoce que es real, aunque no lo puedas "ver".',
      '✓ Valida su frustración.'
    ],
    quotes: '"Mi mente no funciona como antes. Es como si estuviera bajo el agua."'
  },
  'depresión': {
    title: 'Comprendiendo la Depresión en la EM',
    caregiverNote: 'La depresión en la EM es tanto neurológica como emocional.',
    explanation: 'La depresión en personas con EM puede ser causada por la inflamación cerebral (neurológica) o por la realidad de vivir con una enfermedad crónica (emocional). No es debilidad. Es una complicación médica grave.',
    howToSupport: [
      '✓ No digas "míralo por el lado positivo". La depresión no responde al pensamiento positivo.',
      '✓ Anima a buscar ayuda profesional sin juzgar.',
      '✓ Sé comprensivo si necesitan días en cama. La depresión es agotadora.',
      '✓ Ofrece compañía sin obligar a sociabilizar.',
      '✓ Toma los pensamientos suicidas en serio.'
    ],
    quotes: '"No es que esté triste. Es que nada tiene sentido. Incluso lo que amaba me deja vacío."'
  },
  'ansiedad': {
    title: 'Comprendiendo la Ansiedad en la EM',
    caregiverNote: 'La ansiedad en la EM es causada por la enfermedad y por la incertidumbre constante.',
    explanation: 'La ansiedad aparece porque el futuro es incierto. ¿Empeorará? ¿Perderá funcionalidad? La ansiedad es anticipatoria: la persona anticipa lo peor. También hay ansiedad de "recaída".',
    howToSupport: [
      '✓ Reconoce que sus miedos tienen base en la realidad, pero no son certeza.',
      '✓ No minimices la ansiedad. "Relájate" no funciona.',
      '✓ Ayuda con técnicas de manejo de ansiedad (respiración, meditación).',
      '✓ Ofrece seguridad en el presente, no en el futuro incierto.',
      '✓ Apoya el acceso a terapia si es incapacitante.'
    ],
    quotes: '"Cada síntoma nuevo me aterroriza. ¿Será permanente? ¿Perderé más funcionalidad?"'
  },
  'equilibrio': {
    title: 'Comprendiendo los Problemas de Equilibrio en la EM',
    caregiverNote: 'Los problemas de equilibrio afectan la movilidad, la seguridad y la confianza.',
    explanation: 'El equilibrio requiere entrada visual, información de los músculos, y función cerebelosa. La EM puede afectar cualquiera de estas. La persona puede sentir que todo se mueve o que su cuerpo no está donde cree.',
    howToSupport: [
      '✓ Ofrece estabilidad discreta pero firme cuando sea necesario.',
      '✓ Adapta el entorno para prevenir caídas: elimina obstáculos, mejora iluminación.',
      '✓ Entiende que el miedo a caer es tan limitante como el problema de equilibrio.',
      '✓ Celebra cada paso dado con seguridad.',
      '✓ Sé comprensivo con la lentitud en el movimiento.'
    ],
    quotes: '"La habitación gira cuando cierro los ojos. Tengo miedo de caer incluso caminando."'
  },
  'vejiga': {
    title: 'Comprendiendo los Problemas de Vejiga en la EM',
    caregiverNote: 'Los problemas de vejiga afectan la dignidad, la vida social y la confianza.',
    explanation: 'La EM puede causar urgencia urinaria, incontinencia, o dificultad para vaciar la vejiga. Estos problemas son especialmente mortificantes porque afectan la dignidad y la vida social.',
    howToSupport: [
      '✓ Sé discreto. Nunca hagas que se sienta avergonzado.',
      '✓ Aprende sobre cateterismo intermitente si es necesario, sin disgusto.',
      '✓ Conoce ubicaciones de baños cuando salgan juntos.',
      '✓ Normaliza la discusión sobre estos problemas de salud.',
      '✓ Apoya las soluciones (absorbentes, compresas) sin juzgar.'
    ],
    quotes: '"No puedo salir de casa sin estar seguro de dónde está el baño más cercano."'
  },
  'intestino': {
    title: 'Comprendiendo los Problemas de Intestino en la EM',
    caregiverNote: 'Los problemas digestivos son comunes pero raramente discutidos.',
    explanation: 'La EM afecta el sistema nervioso autónomo que controla la digestión, causando estreñimiento crónico, diarrea, o inconsistencia. Estos problemas crean un ciclo difícil de manejar.',
    howToSupport: [
      '✓ No hagas que se sienta avergonzado por discutir estos temas.',
      '✓ Ayuda a mantener hidratación y dieta apropiadas.',
      '✓ Sé comprensivo si necesita acceso rápido a baños o cambios de planes.',
      '✓ Apoya soluciones (fibra, medicamentos, etc.) sin juzgar.',
      '✓ Entiende que estos problemas afectan la salud y la dignidad.'
    ],
    quotes: '"Mi sistema digestivo es impredecible. Nunca sé qué esperar cada día."'
  }
};

export default function SymptomsDetail({ allSymptoms = [], setShowSymptomsDetail, showSymptomsDetail }) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  useEffect(() => {
    if (showSymptomsDetail) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showSymptomsDetail]);

  if (!showSymptomsDetail) return null;

  const getEmpathyInfo = (symptom) => {
    if (!symptom) return null;
    
    const explanationKey = Object.keys(symptomExplanations).find(key => 
      symptom.name.toLowerCase().includes(key) || key.includes(symptom.name.toLowerCase())
    );
    
    const empathyInfo = explanationKey ? symptomExplanations[explanationKey] : null;
    
    if (empathyInfo) return empathyInfo;
    
    return {
      title: `Comprendiendo: ${symptom.name}`,
      caregiverNote: 'Cada síntoma de la EM requiere paciencia y comprensión.',
      explanation: symptom.description || 'Este síntoma afecta la vida diaria de formas invisibles.',
      howToSupport: [
        '✓ Escucha sin juzgar',
        '✓ Ofrece ayuda práctica',
        '✓ Normaliza la discusión',
        '✓ Busca información confiable',
        '✓ Apoya el tratamiento profesional'
      ],
      quotes: '"Necesito que entiendas que esto es real y me afecta profundamente."'
    };
  };

  const displayedSymptom = selectedSymptom || (allSymptoms.length > 0 ? allSymptoms[0] : null);
  const empathyInfo = getEmpathyInfo(displayedSymptom);

  return (
    <div className="min-h-screen bg-empulseBg flex flex-col">
      {/* Header sticky */}
      <div className="sticky top-0 z-30 border-b border-empulseAccent/20 bg-empulseBg/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-empulsePrimary to-empulseMid">
            Guía de Síntomas
          </h1>
          <Button
            onClick={() => setShowSymptomsDetail(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>
      </div>

      {/* Contenido en tres columnas */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Selector de Síntomas */}
          <section className="lg:col-span-1">
            <div className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-6 h-fit">
              <h2 className="text-xl font-semibold text-empulsePrimary mb-4">Selecciona un síntoma:</h2>
              <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: "calc(100vh - 300px)" }}>
                {allSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => setSelectedSymptom(symptom)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedSymptom?.id === symptom.id
                        ? 'bg-empulsePrimary/30 border border-empulsePrimary text-white'
                        : 'bg-empulseAccent/10 border border-empulseAccent/30 text-slate-300 hover:border-empulsePrimary/50 hover:bg-empulseAccent/20'
                    }`}
                  >
                    <h3 className="font-semibold text-sm">{symptom.name}</h3>
                    {symptom.category && (
                      <p className="text-[10px] text-empulseAccent uppercase tracking-wide mt-1">
                        {symptom.category}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* COLUMNA DERECHA: Información Empática */}
          <section className="lg:col-span-2 space-y-6">
            
            {displayedSymptom && empathyInfo && (
              <>
                {/* Información del síntoma */}
                <div className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-empulsePrimary to-empulseMid mb-2">
                    {displayedSymptom.name}
                  </h2>
                  {displayedSymptom.category && (
                    <p className="text-sm uppercase tracking-wider text-empulseAccent font-semibold mb-4">
                      Categoría: {displayedSymptom.category}
                    </p>
                  )}
                  {displayedSymptom.description && (
                    <div className="bg-empulseAccent/10 border border-empulseAccent/30 rounded-lg p-4 mt-4">
                      <h3 className="text-sm font-semibold text-empulseMid mb-3 uppercase">Descripción Médica</h3>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {displayedSymptom.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Título empático */}
                <div className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-empulsePrimary mb-3">
                    {empathyInfo.title}
                  </h2>
                  <p className="text-base text-empulseSoft italic border-l-4 border-empulsePrimary pl-4">
                    "{empathyInfo.caregiverNote}"
                  </p>
                </div>

                {/* Explicación empática */}
                <div className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-empulseMid mb-4">¿Qué es lo que experimenta?</h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    {empathyInfo.explanation}
                  </p>
                </div>

                {/* Cómo apoyar */}
                <div className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-empulseMid mb-6">Cómo puedes apoyar:</h3>
                  <div className="space-y-3">
                    {empathyInfo.howToSupport.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-empulseAccent/10 rounded-lg">
                        <span className="text-empulsePrimary font-bold flex-shrink-0">
                          {tip.split(' ')[0]}
                        </span>
                        <p className="text-slate-300 text-sm">
                          {tip.substring(tip.indexOf(' ') + 1)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cita inspiradora */}
                <div className="bg-gradient-to-r from-empulsePrimary/5 to-empulseMid/5 border-l-4 border-empulsePrimary rounded-lg p-8">
                  <p className="text-lg text-empulseSoft italic">
                    {empathyInfo.quotes}
                  </p>
                  <p className="text-xs text-slate-400 mt-4">
                    — Testimonio de personas viviendo con EM
                  </p>
                </div>

                {/* Recordatorio final */}
                <div className="bg-empulseAccent/10 border border-empulseAccent/30 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-empulseMid mb-3">Recuerda:</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Cada persona con EM es diferente. La clave es comunicación abierta, paciencia y disposición a aprender. Tus esfuerzos hacen una diferencia real.
                  </p>
                </div>
              </>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
