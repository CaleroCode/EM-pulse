import Button from '../components/ui/Button';

export default function NewsletterSection({
  email,
  setEmail,
  name,
  setName,
  language,
  setLanguage,
  frequency,
  setFrequency,
  favoriteTopics,
  setFavoriteTopics,
  loading,
  successMsg,
  errorMsg,
  handleSubmitNewsletter,
  scrollToSection,
}) {
  return (
    <section
      id="newsletter"
      className="border-t border-empulseAccent/40 bg-empulseBg/90"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-2xl font-semibold">Newsletter de EM-PULSE</h2>
            <Button
              onClick={() => scrollToSection("hero")}
              variant="secondary"
              size="sm"
              className="h-fit"
              title="Volver al inicio"
            >
              <span className="text-lg">↑</span>
            </Button>
          </div>
          <p className="text-sm text-slate-300 mb-3">
            Recibe actualizaciones sobre síntomas, recursos y mejoras de la
            plataforma. Pensado para familiares, amigos, cuidadores y
            profesionales que quieren entender mejor la esclerosis múltiple.
          </p>
          <p className="text-xs text-slate-500">
            No spam, solo contenido útil. Podrás darte de baja cuando quieras.
          </p>
        </div>

        <div className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-6">
          <form className="space-y-4" onSubmit={handleSubmitNewsletter}>
            <div>
              <label className="block text-xs font-semibold mb-1">
                Nombre (opcional)
              </label>
              <input
                type="text"
                className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Email *
              </label>
              <input
                type="email"
                className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                placeholder="tuemail@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Idioma
                </label>
                <select
                  className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Frecuencia
                </label>
                <select
                  className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Temas que más te interesan
              </label>
              <input
                type="text"
                className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                value={favoriteTopics}
                onChange={(e) => setFavoriteTopics(e.target.value)}
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Ejemplo: síntomas, noticias, apoyo emocional...
              </p>
            </div>

            {successMsg && (
              <p className="text-xs text-emerald-400">{successMsg}</p>
            )}
            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}

            <Button
              type="submit"
              disabled={loading}
              size="full"
              className="mt-2"
            >
              {loading ? "Enviando..." : "Quiero recibir el newsletter"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
