import Button from '../components/ui/Button';
import ShareButtons from '../components/ShareButtons';
import ExportPDF from '../components/ExportPDF';

export default function NewsSection({
  externalNews,
  externalNewsLoading,
  externalNewsError,
  newsLanguageFilter,
  setNewsLanguageFilter,
  handleLoadAllNews,
  allNewsLoading,
  formatDate,
}) {
  return (
    <div id="news" className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-2">Noticias y boletines</h2>
      <p className="text-sm text-slate-300 mb-4">
        Las últimas noticias sobre Esclerosis Múltiple actualizadas automáticamente.
      </p>

      {/* Botones de filtro de idioma */}
      <div className="flex flex-col gap-2 mb-6">
        <Button
          onClick={() => setNewsLanguageFilter("es")}
          variant="primary"
          size="full"
          active={newsLanguageFilter === "es"}
          className="text-left"
        >
          Buscar en español
        </Button>
        <Button
          onClick={() => setNewsLanguageFilter("en")}
          variant="primary"
          size="full"
          active={newsLanguageFilter === "en"}
          className="text-left"
        >
          Buscar en inglés
        </Button>
        <Button
          onClick={() => setNewsLanguageFilter("both")}
          variant="primary"
          size="full"
          active={newsLanguageFilter === "both"}
          className="text-left"
        >
          Ambos idiomas
        </Button>
      </div>

      {externalNewsLoading && (
        <p className="text-sm text-slate-400">Cargando noticias...</p>
      )}

      {externalNewsError && (
        <p className="text-sm text-yellow-400">{externalNewsError}</p>
      )}

      {!externalNewsLoading && externalNews.length > 0 && (
        <div
          className="overflow-y-auto custom-scrollbar pr-2 space-y-3"
          style={{ maxHeight: "calc(3 * 120px + 24px)" }}
        >
          {externalNews.map((item) => (
            <article
              key={item.id}
              className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4 hover:border-empulsePrimary/50 transition"
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
              <div className="mb-3 flex flex-wrap gap-2">
                <div className="flex-1">
                  <ShareButtons 
                    title={item.title}
                    url={item.url}
                    description={item.description}
                  />
                </div>
                <ExportPDF 
                  title={item.title}
                  content={`<h2>${item.title}</h2><p>${item.description || ''}</p><p><strong>Fuente:</strong> ${item.source}</p><p><a href="${item.url}" target="_blank">Leer noticia completa</a></p>`}
                  author={item.source}
                  date={new Date(item.published_at).toLocaleDateString('es-ES')}
                  buttonSize="sm"
                />
              </div>
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

      {!externalNewsLoading && externalNews.length > 0 && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleLoadAllNews}
            disabled={allNewsLoading}
            size="lg"
          >
            {allNewsLoading ? "Cargando..." : "Ver todas las noticias sobre Esclerosis Múltiple"}
          </Button>
        </div>
      )}
    </div>
  );
}
