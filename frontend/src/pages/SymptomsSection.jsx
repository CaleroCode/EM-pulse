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
                <p className="text-xs text-slate-300">
                  {symptom.description || "Sin descripción detallada."}
                </p>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}
