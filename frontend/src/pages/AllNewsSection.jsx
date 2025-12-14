import { useEffect } from 'react';
import Button from '../components/ui/Button';

export default function AllNewsSection({
  showAllNews,
  setShowAllNews,
  allExternalNews,
  allNewsLoading,
  formatDate,
}) {
  useEffect(() => {
    if (showAllNews) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showAllNews]);

  if (!showAllNews) return null;

  return (
    <div className="min-h-screen bg-empulseBg flex flex-col">
      {/* Header sticky */}
      <div className="sticky top-0 z-40 border-b border-empulseAccent/20 bg-empulseBg/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-empulsePrimary to-empulseMid">
            Todas las Noticias
          </h1>
          <Button
            onClick={() => setShowAllNews(false)}
            size="md"
          >
            ← Volver
          </Button>
        </div>
      </div>

      {/* Contenido */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        {allNewsLoading && (
          <p className="text-sm text-slate-400 text-center py-8">Cargando todas las noticias...</p>
        )}

        {!allNewsLoading && allExternalNews.length > 0 && (
          <div className="space-y-4">
            {allExternalNews.map((item) => (
              <article
                key={item.id}
                className="bg-empulseAccent/10 border border-empulseAccent/20 rounded-2xl p-6 hover:border-empulsePrimary/50 transition-all duration-200"
              >
                <div className="grid md:grid-cols-4 gap-6">
                  {item.image_url && (
                    <div className="md:col-span-1">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className={item.image_url ? "md:col-span-3" : "md:col-span-4"}>
                    <h3 className="text-lg font-semibold leading-snug mb-2 text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-empulseAccent mb-3 uppercase tracking-wide font-semibold">
                      {item.source}
                    </p>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {formatDate(item.published_at)}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-empulsePrimary hover:text-empulseMid hover:underline transition"
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

        {!allNewsLoading && allExternalNews.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-12">
            No se encontraron noticias. Intenta cambiar el filtro de idioma.
          </p>
        )}
      </main>
    </div>
  );
}
