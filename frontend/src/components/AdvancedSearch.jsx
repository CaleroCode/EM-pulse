import { useState, useEffect } from "react";
import { Search, X, Filter, ChevronDown } from "lucide-react";

export default function AdvancedSearch({ 
  onClose,
  setShowMentalHealth,
  setShowRights,
  setShowGuides,
  setShowForum,
  sectionToNavigate,
  setSectionToNavigate
}) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("all"); // all, posts, news, symptoms, articles
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance"); // relevance, date, popular
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTypes = [
    { id: "all", name: "Todo", icon: "🔍" },
    { id: "posts", name: "Posts del Foro", icon: "💬" },
    { id: "news", name: "Noticias", icon: "📰" },
    { id: "symptoms", name: "Síntomas", icon: "🏥" },
    { id: "articles", name: "Artículos", icon: "📚" },
  ];

  const categories = [
    { id: "all", name: "Todas las categorías" },
    { id: "general", name: "General" },
    { id: "sintomas", name: "Síntomas" },
    { id: "tratamientos", name: "Tratamientos" },
    { id: "experiencias", name: "Experiencias" },
    { id: "ejercicio", name: "Ejercicio y Bienestar" },
    { id: "ayuda", name: "Pedir Ayuda" },
  ];

  const sortOptions = [
    { id: "relevance", name: "Más Relevante" },
    { id: "date", name: "Más Reciente" },
    { id: "popular", name: "Más Popular" },
  ];

  // Función para buscar coincidencias parciales
  const searchInText = (text, query) => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    return lowerText.includes(lowerQuery);
  };

  // Función para buscar en array de palabras clave
  const matchesKeywords = (item, query) => {
    const keywords = [
      item.name,
      item.title,
      item.description,
      item.content,
      item.symptoms?.join(" "),
    ].join(" ").toLowerCase();
    
    return keywords.includes(query.toLowerCase());
  };

  const performSearch = async () => {
    setLoading(true);
    let allResults = [];
    try {
      const api = import.meta.env.VITE_API_URL || "http://localhost:8000";

      // Búsqueda en posts
      if (searchType === "all" || searchType === "posts") {
        try {
          const postsRes = await fetch(`${api}/api/forum/posts/?search=${encodeURIComponent(query)}`);
          if (postsRes.ok) {
            const posts = await postsRes.json();
            const postList = Array.isArray(posts) ? posts : (posts.results || []);
            const formattedPosts = postList
              .filter(p => matchesKeywords(p, query))
              .map(p => ({
                id: p.id,
                type: "post",
                title: p.title,
                description: p.content?.substring(0, 100) || "Sin descripción",
                category: p.category || "General",
                date: p.created_at,
                url: "#",
              }));
            allResults = [...allResults, ...formattedPosts];
          }
        } catch (err) {
          console.error("Error en búsqueda de posts:", err);
        }
      }

      // Búsqueda en noticias
      if (searchType === "all" || searchType === "news") {
        try {
          const newsRes = await fetch(`${api}/api/communications/news/?search=${encodeURIComponent(query)}`);
          if (newsRes.ok) {
            const news = await newsRes.json();
            const newsList = Array.isArray(news) ? news : (news.results || []);
            const formattedNews = newsList
              .filter(n => matchesKeywords(n, query))
              .map(n => ({
                id: n.id,
                type: "news",
                title: n.title || "Sin título",
                description: n.description?.substring(0, 100) || "Sin descripción",
                category: "Noticias",
                date: n.publishedAt || n.published_at || n.created_at,
                url: n.url || "#",
              }));
            allResults = [...allResults, ...formattedNews];
          }
        } catch (err) {
          console.error("Error en búsqueda de noticias:", err);
        }
      }

      // Búsqueda en síntomas
      if (searchType === "all" || searchType === "symptoms") {
        try {
          const symptomsRes = await fetch(`${api}/api/health/symptoms/?search=${encodeURIComponent(query)}`);
          if (symptomsRes.ok) {
            const symptoms = await symptomsRes.json();
            const symptomList = Array.isArray(symptoms) ? symptoms : (symptoms.results || []);
            const formattedSymptoms = symptomList
              .filter(s => matchesKeywords(s, query))
              .map(s => ({
                id: s.id,
                type: "symptom",
                title: s.name || "Sin nombre",
                description: s.description?.substring(0, 100) || "Sin descripción",
                category: s.category || "Síntomas",
                date: s.created_at || new Date().toISOString(),
                url: "#",
              }));
            allResults = [...allResults, ...formattedSymptoms];
          }
        } catch (err) {
          console.error("Error en búsqueda de síntomas:", err);
        }
      }

      // Si no hay resultados exactos, buscar en páginas estáticas relacionadas
      if (allResults.length === 0 && query.trim().length > 2) {
        const staticResults = getStaticSearchResults(query);
        allResults = staticResults;
      }

      setResults(allResults);
    } catch (error) {
      console.error("Error general en búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  // Búsqueda en contenido estático (Guías, Derechos, Salud Mental, etc)
  const getStaticSearchResults = (query) => {
    const staticData = [
      {
        id: "mental-depression",
        type: "article",
        title: "Depresión y Esclerosis Múltiple",
        description: "Cómo la EM afecta la salud mental y cómo gestionar la depresión",
        category: "Salud Mental",
        section: "mental",
        tags: ["depresión", "ansiedad", "salud mental", "emocional", "tristeza", "melancolía"]
      },
      {
        id: "fatiga-depression",
        type: "article",
        title: "Fatiga Mental y Depresión",
        description: "La relación entre la fatiga de la EM y los síntomas depresivos",
        category: "Síntomas",
        section: "mental",
        tags: ["depresión", "fatiga", "cansancio", "agotamiento", "energía", "extenuación"]
      },
      {
        id: "psychological-support",
        type: "article",
        title: "Apoyo Psicológico para la EM",
        description: "Recursos y terapias disponibles para la salud emocional",
        category: "Apoyo Psicológico",
        section: "mental",
        tags: ["depresión", "psicológico", "terapia", "apoyo mental", "psiquiatra", "psicólogo", "consejería"]
      },
      {
        id: "rights-depression",
        type: "article",
        title: "Derechos Laborales con Depresión y EM",
        description: "Tus derechos si tienes depresión asociada a la esclerosis múltiple",
        category: "Derechos",
        section: "rights",
        tags: ["depresión", "derechos", "incapacidad", "laboral", "trabajo", "baja"]
      },
      {
        id: "coping-strategies",
        type: "article",
        title: "Estrategias de Afrontamiento",
        description: "Técnicas prácticas para manejar síntomas emocionales y cognitivos",
        category: "Consejos Prácticos",
        section: "mental",
        tags: ["depresión", "ansiedad", "estrés", "mindfulness", "meditación", "técnicas", "coping"]
      },
      {
        id: "pain-management",
        type: "article",
        title: "Gestión del Dolor y Síntomas",
        description: "Cómo manejar el dolor crónico y otros síntomas de la EM",
        category: "Síntomas",
        section: "guides",
        tags: ["dolor", "crónico", "malestar", "ardor", "entumecimiento", "parestesias", "espasmos"]
      },
      {
        id: "cognitive-symptoms",
        type: "article",
        title: "Problemas Cognitivos en la EM",
        description: "Memoria, concentración y neblina mental: síntomas cognitivos de la EM",
        category: "Síntomas",
        section: "mental",
        tags: ["cognitivo", "memoria", "concentración", "confusión", "neblina mental", "brain fog", "olvido"]
      },
      {
        id: "exercise-movement",
        type: "article",
        title: "Movimiento y Ejercicio con EM",
        description: "Ejercicios seguros y beneficiosos para personas con esclerosis múltiple",
        category: "Movimiento y Ejercicio",
        section: "guides",
        tags: ["ejercicio", "movimiento", "actividad", "físico", "deporte", "movilidad", "parálisis"]
      },
      {
        id: "nutrition",
        type: "article",
        title: "Nutrición y Alimentación en la EM",
        description: "Dieta recomendada para personas con esclerosis múltiple",
        category: "Guías Médicas",
        section: "guides",
        tags: ["nutrición", "dieta", "alimentación", "vitaminas", "minerales", "comida", "antioxidantes"]
      },
      {
        id: "sexuality",
        type: "article",
        title: "Sexualidad y Relaciones Íntimas",
        description: "Cómo la EM afecta la vida sexual y cómo sobrellevarlo",
        category: "Calidad de Vida",
        section: "guides",
        tags: ["sexualidad", "relaciones", "íntima", "disfunción", "libido", "intimidad"]
      },
      {
        id: "employment",
        type: "article",
        title: "Empleo y Esclerosis Múltiple",
        description: "Derechos laborales, adaptaciones y cómo comunicar tu diagnóstico en el trabajo",
        category: "Derechos",
        section: "rights",
        tags: ["empleo", "trabajo", "laboral", "derechos", "adaptaciones", "incapacidad", "empresa"]
      },
      {
        id: "disability-benefits",
        type: "article",
        title: "Prestaciones por Discapacidad",
        description: "Información sobre pensiones, ayudas económicas y beneficios sociales",
        category: "Derechos",
        section: "rights",
        tags: ["discapacidad", "pensión", "prestación", "ayuda", "económico", "beneficio", "subsidio"]
      },
      {
        id: "vision-problems",
        type: "article",
        title: "Problemas de Visión en la EM",
        description: "Neuritis óptica, visión borrosa y otros problemas visuales",
        category: "Síntomas",
        section: "guides",
        tags: ["visión", "ojo", "vista", "ceguera", "borroso", "neuritis óptica", "diplopia"]
      },
      {
        id: "bladder-bowel",
        type: "article",
        title: "Problemas de Vejiga e Intestinos",
        description: "Incontinencia, retención y otros problemas urinarios en la EM",
        category: "Síntomas",
        section: "guides",
        tags: ["vejiga", "incontinencia", "intestinal", "micción", "orina", "constipación"]
      },
      {
        id: "treatment-options",
        type: "article",
        title: "Opciones de Tratamiento",
        description: "Terapias modificadoras de la enfermedad y tratamientos sintomáticos",
        category: "Tratamientos",
        section: "guides",
        tags: ["tratamiento", "medicamento", "terapia", "fármaco", "inmunodisruptor", "DMT"]
      }
    ];

    return staticData.filter(item => 
      item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Función para manejar clicks en resultados
  const handleResultClick = (result) => {
    onClose(); // Cerrar el buscador
    
    // Navegar según el tipo de resultado
    if (result.type === "article" && result.section) {
      switch (result.section) {
        case "mental":
          if (setShowMentalHealth) setShowMentalHealth(true);
          break;
        case "rights":
          if (setShowRights) setShowRights(true);
          break;
        case "guides":
          if (setShowGuides) setShowGuides(true);
          break;
        case "forum":
          if (setShowForum) {
            setShowForum(true);
            if (setSectionToNavigate) setSectionToNavigate(result.id);
          }
          break;
        default:
          break;
      }
    } else if (result.type === "post" && setShowForum) {
      setShowForum(true);
      if (setSectionToNavigate) setSectionToNavigate(result.id);
    }
  };

  // Simulación de búsqueda
  useEffect(() => {
    if (query.trim().length > 2) {
      performSearch();
    } else {
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchType]);

  const getIcon = (type) => {
    switch (type) {
      case "post":
        return "💬";
      case "news":
        return "📰";
      case "symptom":
        return "🏥";
      case "article":
        return "📚";
      default:
        return "📄";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "post":
        return "Post del Foro";
      case "news":
        return "Noticia";
      case "symptom":
        return "Síntoma";
      case "article":
        return "Artículo/Guía";
      default:
        return "Resultado";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-empulseBg border-2 border-empulsePrimary rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-empulseBg border-b border-empulseAccent/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-empulsePrimary flex items-center gap-2">
              <Search className="w-6 h-6" />
              Búsqueda Avanzada
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-empulseAccent/20 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-empulseAccent/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Busca posts, noticias, síntomas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full rounded-lg bg-empulseBg/50 border border-empulseAccent/40 pl-10 pr-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-empulsePrimary focus:border-empulsePrimary placeholder:text-slate-500 transition-all"
            />
          </div>

          {/* Filtros Rápidos */}
          <div className="flex flex-wrap gap-2">
            {searchTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSearchType(type.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  searchType === type.id
                    ? "bg-empulsePrimary text-empulseBg"
                    : "bg-empulseAccent/20 text-slate-300 hover:bg-empulseAccent/40"
                }`}
              >
                {type.icon} {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros Avanzados */}
        <div className="border-b border-empulseAccent/20 p-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-empulsePrimary font-semibold hover:text-empulsePrimary/80 transition mb-4"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Ocultar" : "Mostrar"} Filtros Avanzados
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {showFilters && (
            <div className="grid grid-cols-2 gap-4">
              {/* Categoría */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg bg-empulseBg/50 border border-empulseAccent/40 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-empulsePrimary"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ordenar Por */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Ordenar Por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg bg-empulseBg/50 border border-empulseAccent/40 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-empulsePrimary"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="p-6">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border border-empulseAccent border-t-empulsePrimary"></div>
              </div>
              <p className="text-slate-400 mt-4">Buscando...</p>
            </div>
          )}

          {!loading && query.length > 2 && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">No se encontraron resultados exactos para "{query}"</p>
              <p className="text-slate-500 text-sm">Intenta con diferentes palabras clave o explora nuestras secciones de Guías y Recursos</p>
            </div>
          )}

          {!loading && query.length <= 2 && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">Escribe al menos 3 caracteres para buscar</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.map((result, idx) => (
                <button
                  key={`${result.type}-${result.id}-${idx}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-4 rounded-lg bg-empulseAccent/10 hover:bg-empulseAccent/20 border border-empulseAccent/20 hover:border-empulseAccent/40 transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-1">{getIcon(result.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-slate-100 font-semibold group-hover:text-empulsePrimary transition truncate">
                          {result.title}
                        </h3>
                        <span className="text-xs bg-empulseAccent/30 text-empulseAccent px-2 py-1 rounded whitespace-nowrap">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2">{result.description}</p>
                      <div className="text-xs text-slate-500 mt-2">{result.category}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
