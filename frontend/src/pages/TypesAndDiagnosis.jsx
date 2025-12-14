import Button from '../components/ui/Button';

export default function TypesAndDiagnosis({ showTypesAndDiagnosis, setShowTypesAndDiagnosis }) {
  if (!showTypesAndDiagnosis) return null;

  return (
    <div className="min-h-screen bg-empulseBg flex flex-col">
      {/* Header con botón para volver */}
      <div className="sticky top-0 z-30 border-b border-empulseAccent/20 bg-empulseBg/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-empulsePrimary to-empulseMid">
            Tipos, Diagnóstico y Tratamiento
          </h1>
          <Button
            onClick={() => setShowTypesAndDiagnosis(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>
      </div>

      {/* Contenido */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="space-y-12 text-slate-200 leading-relaxed">
          {/* Introducción */}
          <section className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <p className="text-lg text-empulseSoft">
              Cada caso de Esclerosis Múltiple es único. La forma en que la enfermedad progresa varía significativamente de una persona a otra. Aquí te presentamos los distintos tipos de EM, cómo se diagnostica y las opciones de tratamiento disponibles.
            </p>
          </section>

          {/* TIPOS DE ESCLEROSIS MÚLTIPLE */}
          <section className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Tipos de Esclerosis Múltiple</h2>
            
            <div className="space-y-6">
              {/* EMRR */}
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6 hover:border-empulsePrimary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🔄</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-empulseMid mb-3">Esclerosis Múltiple Remitente-Recurrente (EMRR)</h3>
                    <p className="text-empulseSoft mb-4">
                      <strong>Prevalencia:</strong> 85% de los pacientes diagnosticados inicialmente
                    </p>
                    <p className="text-empulseSoft mb-4">
                      La EMRR se caracteriza por períodos de <strong>nuevos síntomas o empeoramientos</strong> (llamados recaídas) seguidos de períodos de recuperación parcial o completa (remisiones). Durante las remisiones, los síntomas pueden desaparecer completamente o quedar residuos.
                    </p>
                    <p className="text-empulseSoft">
                      <strong>Lo importante:</strong> Entre recaídas hay estabilidad. Cada recaída es impredecible en cuanto a timing y severidad. Con el tratamiento adecuado, muchas personas logran reducir significativamente la frecuencia de recaídas.
                    </p>
                  </div>
                </div>
              </div>

              {/* EMPP */}
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6 hover:border-empulsePrimary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📈</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-empulseMid mb-3">Esclerosis Múltiple Progresiva Primaria (EMPP)</h3>
                    <p className="text-empulseSoft mb-4">
                      <strong>Prevalencia:</strong> 10-15% de los pacientes
                    </p>
                    <p className="text-empulseSoft mb-4">
                      En la EMPP, el deterioro neurológico es <strong>progresivo desde el inicio</strong> sin recaídas o remisiones claras. El paciente experimenta un empeoramiento gradual y consistente de los síntomas desde el comienzo de la enfermedad.
                    </p>
                    <p className="text-empulseSoft">
                      <strong>Lo importante:</strong> Aunque la progresión es constante, la velocidad varía. Algunas personas tienen una progresión muy lenta, mientras que otras avanzan más rápidamente. El tratamiento busca ralentizar esta progresión.
                    </p>
                  </div>
                </div>
              </div>

              {/* EMPS */}
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6 hover:border-empulsePrimary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🔀</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-empulseMid mb-3">Esclerosis Múltiple Progresiva Secundaria (EMPS)</h3>
                    <p className="text-empulseSoft mb-4">
                      <strong>Prevalencia:</strong> Evolución de EMRR no tratada o insuficientemente tratada
                    </p>
                    <p className="text-empulseSoft mb-4">
                      La EMPS comienza como EMRR con recaídas y remisiones, pero con el tiempo <strong>evoluciona hacia una progresión más constante</strong>. Las recaídas pueden seguir ocurriendo, pero el fondo general es de deterioro gradual.
                    </p>
                    <p className="text-empulseSoft">
                      <strong>Lo importante:</strong> Este cambio de patrón es la razón por la que el tratamiento temprano en EMRR es crítico. Cuanto más se controlen las recaídas iniciales, menor es el riesgo de progresión secundaria.
                    </p>
                  </div>
                </div>
              </div>

              {/* EMPP Progresiva */}
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6 hover:border-empulsePrimary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⬆️</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-empulseMid mb-3">Esclerosis Múltiple Progresiva con Recaídas (EMPR)</h3>
                    <p className="text-empulseSoft mb-4">
                      <strong>Prevalencia:</strong> Rara (menos del 5%)
                    </p>
                    <p className="text-empulseSoft">
                      Es una forma progresiva que ocasionalmente presenta recaídas agudas además de la progresión constante de fondo. Combina características de EMPP con episodios de empeoramiento abrupto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DIAGNÓSTICO */}
          <section className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">El Diagnóstico de la EM</h2>
            
            <div className="space-y-6">
              <p className="text-lg text-empulseSoft">
                Diagnosticar la EM es complejo porque no existe una única prueba definitiva. Los médicos utilizan una combinación de herramientas para confirmar el diagnóstico.
              </p>

              <div className="bg-empulseBg/80 border-l-4 border-empulsePrimary p-6 rounded">
                <h3 className="text-xl font-semibold text-empulsePrimary mb-4">Criterios de Diagnóstico MacDonald (2017)</h3>
                <p className="text-empulseSoft mb-4">
                  Los criterios modernos buscan evidencia de <strong>"diseminación en espacio y tiempo"</strong>: lesiones en diferentes áreas del sistema nervioso central que han ocurrido en diferentes momentos.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-empulseMid mb-3">🧠 Resonancia Magnética (RMN)</h4>
                  <p className="text-empulseSoft mb-3">
                    <strong>La prueba más importante.</strong> Detecta lesiones (plaques) en el cerebro y la médula espinal.
                  </p>
                  <ul className="space-y-2 text-empulseSoft">
                    <li>• <strong>RMN del cerebro:</strong> Detecta lesiones típicas de EM</li>
                    <li>• <strong>RMN de médula espinal:</strong> Busca lesiones en la médula espinal</li>
                    <li>• <strong>RMN con contraste:</strong> Identifica lesiones activas recientes</li>
                  </ul>
                </div>

                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-empulseMid mb-3">💧 Punción Lumbar (Análisis del LCR)</h4>
                  <p className="text-empulseSoft mb-3">
                    Analiza el <strong>líquido cefalorraquídeo</strong> (fluido que rodea el cerebro y médula espinal).
                  </p>
                  <p className="text-empulseSoft">
                    Busca bandas oligoclonales (patrones de proteínas) y presencia de inmunoglobulinas que son características de la EM.
                  </p>
                </div>

                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-empulseMid mb-3">⚡ Potenciales Evocados</h4>
                  <p className="text-empulseSoft mb-3">
                    Miden la velocidad de las señales eléctricas en el sistema nervioso.
                  </p>
                  <ul className="space-y-2 text-empulseSoft">
                    <li>• <strong>Potencial Evocado Visual (PEV):</strong> Detecta problemas en el nervio óptico</li>
                    <li>• <strong>Potencial Evocado Somatosensorial (PESS):</strong> Evalúa nervios sensoriales</li>
                    <li>• <strong>Potencial Evocado Motor:</strong> Prueba la función motora</li>
                  </ul>
                </div>

                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-empulseMid mb-3">🩸 Análisis de Sangre</h4>
                  <p className="text-empulseSoft">
                    Se realizan pruebas para descartar otras enfermedades con síntomas similares (Lyme, sífilis, VIH, lupus) y para buscar anticuerpos específicos (anti-MOG, anti-AQP4).
                  </p>
                </div>

                <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-empulseMid mb-3">📋 Historia Clínica</h4>
                  <p className="text-empulseSoft">
                    Descripción detallada de síntomas, cuándo comenzaron, cómo han progresado y los antecedentes médicos personales y familiares.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TRATAMIENTO Y MEDICACIÓN */}
          <section className="bg-empulseBg/50 border border-empulseAccent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-empulsePrimary mb-8">Tratamiento de la EM</h2>
            
            <div className="space-y-6">
              <p className="text-lg text-empulseSoft mb-6">
                No existe cura para la EM, pero los tratamientos actuales son muy efectivos para ralentizar la progresión y reducir la frecuencia de recaídas. El objetivo es <strong>retrasar la discapacidad</strong> y mantener la mejor calidad de vida posible.
              </p>

              {/* Medicación que más está sirviendo */}
              <div className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-empulsePrimary mb-6">Medicamentos Más Efectivos Actualmente</h3>
                
                <div className="space-y-5">
                  <div className="bg-empulseBg/60 border border-empulseAccent/30 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-empulseMid mb-2">🌟 Terapias de Infusión (Alta Eficacia)</h4>
                    <p className="text-empulseSoft mb-3">
                      <strong>Natalizumab (Tysabri):</strong> Reduce recaídas en ~68% en EMRR. Requiere monitoreo por riesgo de LEMP.
                    </p>
                    <p className="text-empulseSoft mb-3">
                      <strong>Ocrelizumab (Ocrevus):</strong> Aprobado para EMRR y EMPP. Reduce recaídas y ralentiza progresión en EMPP de forma significativa.
                    </p>
                    <p className="text-empulseSoft">
                      <strong>Alemtuzumab (Lemtrada):</strong> Muy efectivo pero con efectos secundarios. Se reserva para casos más severos.
                    </p>
                  </div>

                  <div className="bg-empulseBg/60 border border-empulseAccent/30 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-empulseMid mb-2">⭐ Medicamentos Orales (Muy Populares)</h4>
                    <p className="text-empulseSoft mb-3">
                      <strong>Fingolimod (Gilenya):</strong> Primera opción oral. Reduce recaídas en ~50-55%. Bien tolerado.
                    </p>
                    <p className="text-empulseSoft mb-3">
                      <strong>Teriflunomida (Aubagio):</strong> Opción oral semanal. Eficacia moderada, buen perfil de tolerancia.
                    </p>
                    <p className="text-empulseSoft">
                      <strong>Dimetilfumarato (Tecfidera):</strong> Muy popular por ser dos veces al día. Eficacia moderada-buena.
                    </p>
                  </div>

                  <div className="bg-empulseBg/60 border border-empulseAccent/30 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-empulseMid mb-2">💊 Inyectables (Primera Generación)</h4>
                    <p className="text-empulseSoft mb-3">
                      <strong>Interferón Beta (Avonex, Betaferon):</strong> Clásicos, menos efectivos que opciones modernas.
                    </p>
                    <p className="text-empulseSoft">
                      <strong>Acetato de Glatiramero (Copaxone):</strong> Opción segura con pocos efectos secundarios.
                    </p>
                  </div>
                </div>
              </div>

              {/* Información sobre medicamentos */}
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-empulseMid mb-4">Factores a Considerar en la Elección</h4>
                <ul className="space-y-3 text-empulseSoft">
                  <li className="flex items-start gap-3">
                    <span className="text-empulsePrimary font-bold mt-1">→</span>
                    <span><strong>Tipo de EM:</strong> Algunos medicamentos solo funcionan para EMRR, otros para EMPP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-empulsePrimary font-bold mt-1">→</span>
                    <span><strong>Actividad de la enfermedad:</strong> A mayor actividad, medicamentos más potentes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-empulsePrimary font-bold mt-1">→</span>
                    <span><strong>Efectos secundarios:</strong> Tolerabilidad personal y perfil de riesgos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-empulsePrimary font-bold mt-1">→</span>
                    <span><strong>Vía de administración:</strong> Preferencia por inyecciones, infusiones u orales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-empulsePrimary font-bold mt-1">→</span>
                    <span><strong>Comorbilidades:</strong> Otras enfermedades pueden contraindicar ciertos medicamentos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-empulsePrimary font-bold mt-1">→</span>
                    <span><strong>Disponibilidad y cobertura:</strong> Acceso en tu país/sistema de salud</span>
                  </li>
                </ul>
              </div>

              {/* Tratamiento de síntomas */}
              <div className="bg-empulseBg/80 border border-empulseAccent/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-empulseMid mb-4">Tratamiento de Síntomas</h4>
                <p className="text-empulseSoft mb-4">
                  Además de medicamentos para modificar la enfermedad, se utilizan otros para controlar síntomas específicos:
                </p>
                <ul className="space-y-2 text-empulseSoft">
                  <li>• <strong>Fatiga:</strong> Amantadina, Modafinilo</li>
                  <li>• <strong>Espasticidad:</strong> Baclofeno, Diazepam, THC/CBD</li>
                  <li>• <strong>Dolor neuropático:</strong> Pregabalina, Gabapentina</li>
                  <li>• <strong>Problemas de vejiga:</strong> Oxibutinina, intermitencia cateterismo</li>
                  <li>• <strong>Disfunción sexual:</strong> Sildenafilo, consejería</li>
                  <li>• <strong>Depresión/Ansiedad:</strong> Antidepresivos, psicoterapia</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mensaje esperanzador */}
          <section className="bg-gradient-to-r from-empulsePrimary/10 to-empulseMid/10 border border-empulsePrimary/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-empulsePrimary mb-4">Esperanza en el Tratamiento</h2>
            <p className="text-lg text-empulseSoft mb-4">
              En los últimos 20 años, el tratamiento de la EM ha revolucionado. Los medicamentos modernos son significativamente más efectivos que los anteriores, y los estudios muestran que muchas personas con EMRR pueden alcanzar <strong>"No Evidence of Disease Activity" (NEDA)</strong>: sin recaídas, sin progresión, sin nuevas lesiones.
            </p>
            <p className="text-lg text-empulseSoft">
              El diagnóstico temprano y el tratamiento inmediato son cruciales. <strong>Cuanto antes comiences, mejores serán tus perspectivas a largo plazo.</strong> Incluso en EMPP, los nuevos tratamientos están mostrando capacidad para ralentizar significativamente la progresión.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}