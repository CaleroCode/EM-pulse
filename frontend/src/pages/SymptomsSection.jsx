// Mapeo de síntomas comunes a explicaciones empáticas para cuidadores
const symptomExplanations = {
  'fatiga': {
    explanation: 'La fatiga es uno de los síntomas más debilitantes y menos visibles de la EM. Puede aparecer sin motivo aparente y hacer que tareas simples (ducharse, preparar comida) parezcan montañas imposibles de escalar. Es una sensación de agotamiento profundo que afecta el cuerpo y la mente simultáneamente.',
  },
  'dolor': {
    explanation: 'El dolor en la EM viene en muchas formas: ardor, punzadas, entumecimiento doloroso, calambres musculares. El dolor crónico afecta emocionalmente. La persona vive con la incertidumbre de cuándo llegará, cuánto durará y qué actividades podrá hacer ese día.',
  },
  'debilidad': {
    explanation: 'La debilidad en la EM significa que los músculos no responden como deberían. Puede afectar un lado del cuerpo, varias extremidades, o ser generalizada. Lo más frustrante es la inconsistencia: algunos días puede caminar bien, otros días no.',
  },
  'entumecimiento': {
    explanation: 'El entumecimiento significa que la comunicación entre nervios y cerebro está interrumpida. La persona puede no sentir temperatura, dolor o texturas adecuadamente. Es aterrador porque pierden la conciencia de dónde está su cuerpo en el espacio.',
  },
  'visión': {
    explanation: 'La EM puede afectar los nervios ópticos, causando visión borrosa, dolor al mover los ojos, pérdida de visión en partes del campo visual. Los problemas visuales son especialmente aterradores porque afectan la independencia.',
  },
  'problemas cognitivos': {
    explanation: 'El "brain fog" es cuando la mente se siente nublada, hay dificultad para concentrarse, problemas de memoria, lentitud mental. La persona sabe lo que quiere decir pero no puede acceder a las palabras.',
  },
  'depresión': {
    explanation: 'La depresión en personas con EM puede ser causada por la inflamación cerebral (neurológica) o por la realidad de vivir con una enfermedad crónica (emocional). No es debilidad. Es una complicación médica grave.',
  },
  'ansiedad': {
    explanation: 'La ansiedad aparece porque el futuro es incierto. ¿Empeorará? ¿Perderá funcionalidad? La ansiedad es anticipatoria: la persona anticipa lo peor. También hay ansiedad de "recaída".',
  },
  'equilibrio': {
    explanation: 'El equilibrio requiere entrada visual, información de los músculos, y función cerebelosa. La EM puede afectar cualquiera de estas. La persona puede sentir que todo se mueve o que su cuerpo no está donde cree.',
  },
  'espasticidad': {
    explanation: 'La espasticidad es una tensión muscular involuntaria que causa rigidez, contracciones incontrolables y dolor. Afecta la movilidad, el confort y la calidad de vida. Los músculos se cierran sin que la persona pueda controlarlos, limitando el movimiento libre y natural.',
  },
  'coordinación': {
    explanation: 'Los problemas de coordinación significan que el cuerpo no responde de manera coordinada. La persona puede experimentar temblores, movimientos imprecisos, pérdida del equilibrio o falta de sincronización entre extremidades. Esto es especialmente frustrante porque afecta tareas que antes eran automáticas como caminar, escribir o comer.',
  }
};

const getSymptomDescription = (symptom) => {
  if (!symptom) return 'Sin descripción detallada.';
  
  // Buscar coincidencia con claves del mapeo
  const explanationKey = Object.keys(symptomExplanations).find(key => 
    symptom.name.toLowerCase().includes(key) || key.includes(symptom.name.toLowerCase())
  );
  
  if (explanationKey) {
    return symptomExplanations[explanationKey].explanation;
  }
  
  // Si hay descripción en el objeto síntoma, usarla
  if (symptom.description) {
    return symptom.description;
  }
  
  // Default fallback
  return 'Sin descripción detallada.';
};

export default function SymptomsSection({
  symptoms,
  filteredSymptoms,
  symptomsLoading,
  symptomsError,
  setShowSymptomsDetail,
}) {
  const handleSymptomClick = () => {
    setShowSymptomsDetail(true);
  };

  return (
    <div id="symptoms" className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-2">
        Síntomas de la Esclerosis Múltiple
      </h2>
      <p className="text-sm text-slate-300 mb-6">
        Una colección de síntomas habituales en la esclerosis múltiple. Haz click
        en cualquiera para saber más.
      </p>

      {symptomsLoading && (
        <p className="text-sm text-slate-400">Cargando síntomas...</p>
      )}

      {symptomsError && (
        <p className="text-sm text-red-400">{symptomsError}</p>
      )}

      {!symptomsLoading && !symptomsError && symptoms.length === 0 && (
        <p className="text-sm text-slate-400">
          Todavía no hay síntomas configurados.
        </p>
      )}

      {!symptomsLoading &&
        !symptomsError &&
        filteredSymptoms.length > 0 && (
          <div
            className="overflow-y-auto custom-scrollbar pr-2 space-y-3"
            style={{ maxHeight: "calc(3 * 168px + 24px)" }}
          >
            {filteredSymptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => handleSymptomClick(symptom)}
                className="w-full text-left bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 hover:border-empulsePrimary/50 hover:bg-empulseAccent/20 transition cursor-pointer"
              >
                <h3 className="text-sm font-semibold mb-1">
                  {symptom.name}
                </h3>
                {symptom.category && (
                  <p className="text-[11px] text-empulseAccent mb-2 uppercase tracking-wide">
                    {symptom.category}
                  </p>
                )}
                <p className="text-xs text-slate-300 line-clamp-2">
                  {getSymptomDescription(symptom)}
                </p>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}
