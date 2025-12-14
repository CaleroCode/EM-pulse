import re

with open('App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Reemplazo completo
old_section = """{/* SECCIÓN SÍNTOMAS */}
        <section
          id="symptoms"
          className="border-t border-empulseAccent/40 bg-empulseBg/90"
        >
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Síntomas de la Esclerosis Múltiple</h2>
                <p className="text-sm text-slate-300">
                  Una colección de síntomas habituales en la esclerosis
                  múltiple, explicados de forma sencilla para que puedas
                  empatizar mejor.
                </p>
              </div>
              <button
                onClick={() => scrollToSection("navbar")}
                className="px-3 py-2 rounded-full bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40 transition h-fit"
                title="Volver al inicio"
              >
                <span className="text-lg">↑</span>
              </button>
            </div>

            {symptomsLoading && (
              <p className="text-sm text-slate-400">Cargando síntomas...</p>
            )}

            {symptomsError && (
              <p className="text-sm text-red-400">{symptomsError}</p>
            )}

            {/* Sin datos en la API */}
            {!symptomsLoading &&
              !symptomsError &&
              symptoms.length === 0 && (
                <p className="text-sm text-slate-400">
                  Todavía no hay síntomas configurados. Añádelos desde el panel
                  de administración.
                </p>
              )}

            {/* Hay síntomas, pero el buscador no encuentra nada */}
            {!symptomsLoading &&
              !symptomsError &&
              symptoms.length > 0 &&
              filteredSymptoms.length === 0 &&
              normalizedQuery && (
                <p className="text-sm text-slate-400">
                  No se han encontrado síntomas que coincidan con "
                  {searchQuery}".
                </p>
              )}

            {/* Resultados filtrados */}
            {!symptomsLoading &&
              !symptomsError &&
              filteredSymptoms.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {filteredSymptoms.map((symptom) => (
                    <article
                      key={symptom.id}
                      className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 flex flex-col justify-between"
                    >
                      <div>
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
                      </div>
                    </article>
                  ))}
                </div>
              )}
          </div>

        </section>

        {/* SECCIÓN NOTICIAS */}
        <section
          id="news"
          className="border-t border-empulseAccent/40 bg-empulseBg/90"
        >
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Noticias y boletines</h2>
                <p className="text-sm text-slate-300">
                  Las últimas noticias sobre Esclerosis Múltiple de todo el mundo, actualizadas automáticamente.
                </p>
              </div>
              <button
                onClick={() => scrollToSection("navbar")}
                className="px-3 py-2 rounded-full bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40 transition h-fit"
                title="Volver al inicio"
              >
                <span className="text-lg">↑</span>
              </button>
            </div>

            {/* Botones de filtro de idioma */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setNewsLanguageFilter("es")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  newsLanguageFilter === "es"
                    ? "bg-empulsePrimary text-slate-950"
                    : "bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40"
                }`}
              >
                Buscar noticias en español
              </button>
              <button
                onClick={() => setNewsLanguageFilter("en")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  newsLanguageFilter === "en"
                    ? "bg-empulsePrimary text-slate-950"
                    : "bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40"
                }`}
              >
                Buscar noticias en inglés
              </button>
              <button
                onClick={() => setNewsLanguageFilter("both")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  newsLanguageFilter === "both"
                    ? "bg-empulsePrimary text-slate-950"
                    : "bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40"
                }`}
              >
                Buscar noticias en español e inglés
              </button>
            </div>

            {externalNewsLoading && (
              <p className="text-sm text-slate-400">Cargando noticias externas...</p>
            )}

            {externalNewsError && (
              <p className="text-sm text-yellow-400">{externalNewsError}</p>
            )}

            {/* Noticias externas recientes (mostrar solo si no hay error grave) */}
            {!externalNewsLoading && externalNews.length > 0 && (
              <>
                <div className="space-y-4 mt-4">
                  {externalNews.slice(0, 3).map((item) => (
                    <article
                      key={item.id}
                      className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 hover:border-empulsePrimary/50 transition"
                    >
                      <div className="grid md:grid-cols-4 gap-4">
                        {item.image_url && (
                          <div className="md:col-span-1">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-32 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                        )}
                        <div className={item.image_url ? "md:col-span-3" : "md:col-span-4"}>
                          <div className="flex items-baseline justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold leading-tight">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-[11px] text-empulseAccent mb-2 uppercase tracking-wide">
                            {item.source}
                          </p>
                          <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-500">
                              {formatDate(item.published_at)}
                            </span>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-empulsePrimary hover:text-empulseMid transition"
                            >
                              Leer más →
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Botón para ver todas las noticias */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleLoadAllNews}
                    disabled={allNewsLoading}
                    className="px-6 py-3 rounded-full bg-empulsePrimary text-slate-950 text-sm font-semibold hover:bg-empulseMid disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {allNewsLoading ? "Cargando..." : "Mira todas las noticias sobre la Esclerosis Múltiple"}
                  </button>
                </div>
              </>
            )}

            {/* Mostrar sección de todas las noticias si está activada */}
            {showAllNews && (
              <div id="all-news-section" className="mt-12 pt-8 border-t border-empulseAccent/40">
                <div className="flex items-center justify-between mb-6 gap-4">
                  <h3 className="text-2xl font-semibold">Todas las noticias sobre Esclerosis Múltiple</h3>
                  <button
                    onClick={() => setShowAllNews(false)}
                    className="px-3 py-2 rounded-full bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40 transition text-sm"
                  >
                    Cerrar
                  </button>
                </div>

                {allNewsLoading && (
                  <p className="text-sm text-slate-400">Cargando todas las noticias...</p>
                )}

                {!allNewsLoading && allExternalNews.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {allExternalNews.map((item) => (
                      <article
                        key={item.id}
                        className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 hover:border-empulsePrimary/50 transition"
                      >
                        <div className="grid md:grid-cols-4 gap-4">
                          {item.image_url && (
                            <div className="md:col-span-1">
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                          <div className={item.image_url ? "md:col-span-3" : "md:col-span-4"}>
                            <div className="flex items-baseline justify-between gap-2 mb-2">
                              <h3 className="text-sm font-semibold leading-tight">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-[11px] text-empulseAccent mb-2 uppercase tracking-wide">
                              {item.source}
                            </p>
                            <p className="text-xs text-slate-300 mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-slate-500">
                                {formatDate(item.published_at)}
                              </span>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-empulsePrimary hover:text-empulseMid transition"
                              >
                                Leer más →
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>"""

new_section = """{/* SECCIÓN SÍNTOMAS Y NOTICIAS - LAYOUT RESPONSIVE CON SCROLL PERSONALIZADO */}
        <section
          className="border-t border-empulseAccent/40 bg-empulseBg/90"
        >
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #1e293b;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #3b82f6;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #2563eb;
            }
          `}</style>
          <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Grid responsive: 1 columna en móvil, 2 en lg */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* COLUMNA 1: SÍNTOMAS */}
              <div id="symptoms">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Síntomas de la Esclerosis Múltiple</h2>
                  <p className="text-sm text-slate-300">
                    Una colección de síntomas habituales en la esclerosis múltiple, explicados de forma sencilla.
                  </p>
                </div>

                {symptomsLoading && (
                  <p className="text-sm text-slate-400">Cargando síntomas...</p>
                )}

                {symptomsError && (
                  <p className="text-sm text-red-400">{symptomsError}</p>
                )}

                {!symptomsLoading && !symptomsError && symptoms.length === 0 && (
                  <p className="text-sm text-slate-400">Todavía no hay síntomas configurados.</p>
                )}

                {!symptomsLoading && !symptomsError && filteredSymptoms.length > 0 && (
                  <div className="h-96 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                    {filteredSymptoms.map((symptom) => (
                      <article
                        key={symptom.id}
                        className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 hover:border-empulsePrimary/50 transition flex-shrink-0"
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
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* COLUMNA 2: NOTICIAS */}
              <div id="news">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Noticias y boletines</h2>
                  <p className="text-sm text-slate-300">
                    Las últimas noticias sobre Esclerosis Múltiple actualizadas automáticamente.
                  </p>
                </div>

                {/* Botones de filtro de idioma */}
                <div className="flex flex-col gap-2 mb-6">
                  <button
                    onClick={() => setNewsLanguageFilter("es")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition text-left ${
                      newsLanguageFilter === "es"
                        ? "bg-empulsePrimary text-slate-950"
                        : "bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40"
                    }`}
                  >
                    Buscar en español
                  </button>
                  <button
                    onClick={() => setNewsLanguageFilter("en")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition text-left ${
                      newsLanguageFilter === "en"
                        ? "bg-empulsePrimary text-slate-950"
                        : "bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40"
                    }`}
                  >
                    Buscar en inglés
                  </button>
                  <button
                    onClick={() => setNewsLanguageFilter("both")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition text-left ${
                      newsLanguageFilter === "both"
                        ? "bg-empulsePrimary text-slate-950"
                        : "bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40"
                    }`}
                  >
                    Ambos idiomas
                  </button>
                </div>

                {externalNewsLoading && (
                  <p className="text-sm text-slate-400">Cargando noticias...</p>
                )}

                {externalNewsError && (
                  <p className="text-sm text-yellow-400">{externalNewsError}</p>
                )}

                {!externalNewsLoading && externalNews.length > 0 && (
                  <div className="h-96 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                    {externalNews.map((item) => (
                      <article
                        key={item.id}
                        className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 hover:border-empulsePrimary/50 transition flex-shrink-0"
                      >
                        <h3 className="text-sm font-semibold leading-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-empulseAccent mb-2 uppercase tracking-wide">
                          {item.source}
                        </p>
                        <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-500">
                            {formatDate(item.published_at)}
                          </span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-empulsePrimary hover:text-empulseMid transition"
                          >
                            Leer más →
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* Botón para ver todas las noticias */}
                {!externalNewsLoading && externalNews.length > 0 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleLoadAllNews}
                      disabled={allNewsLoading}
                      className="px-6 py-3 rounded-full bg-empulsePrimary text-slate-950 text-sm font-semibold hover:bg-empulseMid disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                      {allNewsLoading ? "Cargando..." : "Ver todas"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botón para volver arriba */}
            <div className="mt-10 text-center">
              <button
                onClick={() => scrollToSection("navbar")}
                className="px-3 py-2 rounded-full bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40 transition"
                title="Volver al inicio"
              >
                <span className="text-lg">↑</span>
              </button>
            </div>

            {/* Sección de todas las noticias - ahora debajo en full width */}
            {showAllNews && (
              <div id="all-news-section" className="mt-12 pt-8 border-t border-empulseAccent/40">
                <div className="flex items-center justify-between mb-6 gap-4">
                  <h3 className="text-2xl font-semibold">Todas las noticias sobre Esclerosis Múltiple</h3>
                  <button
                    onClick={() => setShowAllNews(false)}
                    className="px-3 py-2 rounded-full bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40 transition text-sm"
                  >
                    Cerrar
                  </button>
                </div>

                {allNewsLoading && (
                  <p className="text-sm text-slate-400">Cargando todas las noticias...</p>
                )}

                {!allNewsLoading && allExternalNews.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {allExternalNews.map((item) => (
                      <article
                        key={item.id}
                        className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 hover:border-empulsePrimary/50 transition"
                      >
                        <div className="grid md:grid-cols-4 gap-4">
                          {item.image_url && (
                            <div className="md:col-span-1">
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                          <div className={item.image_url ? "md:col-span-3" : "md:col-span-4"}>
                            <h3 className="text-sm font-semibold leading-tight mb-2">
                              {item.title}
                            </h3>
                            <p className="text-[11px] text-empulseAccent mb-2 uppercase tracking-wide">
                              {item.source}
                            </p>
                            <p className="text-xs text-slate-300 mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-slate-500">
                                {formatDate(item.published_at)}
                              </span>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-empulsePrimary hover:text-empulseMid transition"
                              >
                                Leer más →
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>"""

content = content.replace(old_section, new_section)

with open('App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Reemplazo completado exitosamente')
