import { useState, useEffect } from "react";
import { Search, X, Filter, ChevronDown } from "lucide-react";

export default function AdvancedSearch({ onSearch, onClose }) {
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

  // Simulación de búsqueda
  useEffect(() => {
    if (query.trim().length > 2) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [query, searchType, category, sortBy]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const api = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      // Construir URL de búsqueda
      const params = new URLSearchParams({
        search: query,
        type: searchType !== "all" ? searchType : "",
        category: category !== "all" ? category : "",
        sort: sortBy,
      });

      // Ejemplo: búsqueda en posts
      if (searchType === "all" || searchType === "posts") {
        const postsRes = await fetch(`${api}/api/forum/posts/?search=${encodeURIComponent(query)}`);
        if (postsRes.ok) {
          const posts = await postsRes.json();
          const formattedPosts = (Array.isArray(posts) ? posts : posts.results || []).map(p => ({
            id: p.id,
            type: "post",
            title: p.title,
            description: p.content.substring(0, 100),
            category: p.category,
            date: p.created_at,
            url: "#",
          }));
          setResults(prev => [...prev, ...formattedPosts]);
        }
      }

      // Ejemplo: búsqueda en noticias
      if (searchType === "all" || searchType === "news") {
        const newsRes = await fetch(`${api}/api/communications/news/?search=${encodeURIComponent(query)}`);
        if (newsRes.ok) {
          const news = await newsRes.json();
          const formattedNews = (Array.isArray(news) ? news : news.results || []).map(n => ({
            id: n.id,
            type: "news",
            title: n.title,
            description: n.description,
            category: "Noticias",
            date: n.publishedAt,
            url: n.url,
          }));
          setResults(prev => [...prev, ...formattedNews]);
        }
      }

      // Ejemplo: búsqueda en síntomas
      if (searchType === "all" || searchType === "symptoms") {
        const symptomsRes = await fetch(`${api}/api/health/symptoms/?search=${encodeURIComponent(query)}`);
        if (symptomsRes.ok) {
          const symptoms = await symptomsRes.json();
          const formattedSymptoms = (Array.isArray(symptoms) ? symptoms : symptoms.results || []).map(s => ({
            id: s.id,
            type: "symptom",
            title: s.name,
            description: s.description,
            category: "Síntomas",
            date: s.created_at,
            url: "#",
          }));
          setResults(prev => [...prev, ...formattedSymptoms]);
        }
      }
    } catch (error) {
      console.error("Error en búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

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
        return "Artículo";
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
              <p className="text-slate-400">No se encontraron resultados para "{query}"</p>
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
                <a
                  key={`${result.type}-${result.id}-${idx}`}
                  href={result.url}
                  className="block p-4 rounded-lg bg-empulseAccent/10 hover:bg-empulseAccent/20 border border-empulseAccent/20 hover:border-empulseAccent/40 transition-all group"
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
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
