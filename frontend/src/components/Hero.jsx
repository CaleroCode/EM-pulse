export default function Hero({ searchQuery, setSearchQuery }) {
  return (
    <section id="hero" className="max-w-6xl mx-auto px-4 py-10 text-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-empulsePrimary via-empulseMid to-empulseAccent bg-clip-text text-transparent">
            ¡Comprende mejor la esclerosis múltiple!
          </span>
        </h1>
        <p className="text-sm text-slate-300 mb-8 max-w-2xl mx-auto">
          EM-PULSE te ayuda a visualizar cómo se sienten los síntomas en el
          día a día, para que puedas acompañar mejor a quienes los sufren.
          Además, podrás ver todas las noticias relacionadas con la enfermedad,
          y un newsletter para recibir toda la información que desees.
        </p>
        <p className="text-sm text-slate-300 mb-8 max-w-2xl mx-auto">
        EM-PULSE es para todos vosotros, para nosotros.
        </p>
        
        {/* Buscador */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-empulseAccent/60 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-empulseBg/50 border border-empulseAccent/40 pl-10 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-empulsePrimary focus:border-empulsePrimary placeholder:text-slate-500 transition-all duration-200 hover:bg-empulseBg/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
        </div>
      </div>
    </section>
  );
}
