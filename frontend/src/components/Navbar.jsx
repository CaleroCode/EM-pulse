import { useState, useEffect } from "react";
import { Menu, X, Search, Users, Heart, Shield, FileText, Leaf } from "lucide-react";

// Inyectar estilos CSS para la animación de pulso
const pulseStyles = `
  @keyframes heartbeatPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    25% { transform: scale(1.08); }
    50% { transform: scale(1); }
  }
  
  .heartbeat-pulse {
    animation: heartbeatPulse 1.5s ease-in-out infinite;
  }

  .heartbeat-pulse:hover {
    animation: heartbeatPulse 0.8s ease-in-out infinite;
  }
  
  @keyframes glowPulse {
    0%, 100% { 
      text-shadow: 0 0 10px rgba(21, 188, 230, 0.5), 0 0 20px rgba(255, 255, 255, 0.1);
    }
    50% { 
      text-shadow: 0 0 20px rgba(21, 188, 230, 0.8), 0 0 40px rgba(255, 255, 255, 0.4);
    }
  }

  @keyframes glowPulseIntense {
    0%, 100% { 
      text-shadow: 0 0 20px rgba(21, 188, 230, 0.9), 0 0 30px rgba(255, 255, 255, 0.3);
    }
    50% { 
      text-shadow: 0 0 40px rgba(21, 188, 230, 1), 0 0 60px rgba(255, 255, 255, 0.6);
    }
  }
  
  .glow-pulse {
    animation: glowPulse 2s ease-in-out infinite;
  }

  .glow-pulse:hover {
    animation: glowPulseIntense 1s ease-in-out infinite;
  }
`;

// Inyectar estilos
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = pulseStyles;
  document.head.appendChild(style);
}

export default function Navbar({
  user,
  profileImage,
  scrollToSection,
  setShowAuthModal,
  setAuthMode,
  setShowProfilePage,
  setShowAssociations,
  setShowICDATA,
  setShowChat,
  setShowWhatIsEM,
  setShowForum,
  handleLogout,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Detectar scroll para efecto blur mejorado
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detectar sección activa
      const sections = ["hero", "symptoms", "news", "newsletter"];
      for (let sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para navegar y cerrar overlays si están abiertos
  const handleNavigate = (sectionId) => {
    setShowAssociations(false);
    setShowICDATA(false);
    setShowChat(false);
    setShowWhatIsEM(false);
    setShowForum(false); // Cerrar foro si está abierto
    
    // Esperar a que React actualice el DOM después de cerrar el foro
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 50);
    
    setMobileMenuOpen(false);
  };

  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const isActive = (sectionId) => activeSection === sectionId;

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-empulseAccent/30 bg-empulseBg/98 backdrop-blur-2xl shadow-2xl"
          : "border-empulseAccent/20 bg-empulseBg/95 backdrop-blur-xl shadow-lg"
      }`}
      style={{ backdropFilter: scrolled ? "blur(16px)" : "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">
        {/* Fila superior: navegación principal a izquierda y buscador/perfil a derecha */}
        <div className="flex items-center justify-between gap-4">
          {/* Espacio vacío a la izquierda para centrar el logo */}
          <div className="flex-1"></div>

          {/* Logo centrado y grande */}
          <div className="flex-1 text-center">
            <button 
              onClick={() => handleNavigate("hero")}
              className="cursor-pointer transition-all duration-200 hover:scale-110"
            >
              <span className="text-4xl md:text-5xl font-bold tracking-tighter heartbeat-pulse glow-pulse inline-block">
                <span className="text-empulsePrimary">EM</span>
                <span className="text-slate-100">-PULSE</span>
              </span>
            </button>
          </div>

          {/* Botón hamburguesa a la derecha */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-empulseAccent/10 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MENÚ MOBILE - Solo visible en dispositivos pequeños */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-empulseBg to-empulseBg/95 border-t border-empulseAccent/20 py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* SÍNTOMAS */}
            <button
              onClick={() => {
                handleNavigate("symptoms");
              }}
              className="block w-full text-left px-4 py-3 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Heart size={16} />
              SÍNTOMAS
            </button>

            {/* NOTICIAS */}
            <button
              onClick={() => {
                handleNavigate("news");
              }}
              className="block w-full text-left px-4 py-3 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <FileText size={16} />
              NOTICIAS
            </button>

            {/* Separador */}
            <div className="h-px bg-empulseAccent/20 my-2"></div>

            {/* ESCLEROSIS MÚLTIPLE */}
            <div>
              <button
                onClick={() => toggleSubmenu("em")}
                className="w-full text-left px-4 py-3 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg flex items-center justify-between transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <Shield size={16} />
                  ESCLEROSIS MÚLTIPLE
                </span>
                <span className={`text-[10px] transition-transform duration-300 ${expandedMenu === "em" ? "rotate-180" : ""}`}>▾</span>
              </button>
              {expandedMenu === "em" && (
                <div className="pl-8 space-y-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <button 
                    onClick={() => {
                      setShowWhatIsEM(true);
                      setMobileMenuOpen(false);
                      setExpandedMenu(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/10 rounded-lg transition-all duration-200">
                    Qué es
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/10 rounded-lg transition-all duration-200">
                    Tipos y diagnóstico
                  </button>
                </div>
              )}
            </div>

            {/* PREVENCIÓN */}
            <div>
              <button
                onClick={() => toggleSubmenu("prevencion")}
                className="w-full text-left px-4 py-3 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg flex items-center justify-between transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <Leaf size={16} />
                  PREVENCIÓN
                </span>
                <span className={`text-[10px] transition-transform duration-300 ${expandedMenu === "prevencion" ? "rotate-180" : ""}`}>▾</span>
              </button>
              {expandedMenu === "prevencion" && (
                <div className="pl-8 space-y-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/10 rounded-lg transition-all duration-200">
                    EM-FORMA
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/10 rounded-lg transition-all duration-200">
                    Salud mental
                  </button>
                </div>
              )}
            </div>

            {/* EM-FERMOS */}
            <div>
              <button
                onClick={() => toggleSubmenu("fermos")}
                className="w-full text-left px-4 py-3 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg flex items-center justify-between transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <Users size={16} />
                  EM-FERMOS
                </span>
                <span className={`text-[10px] transition-transform duration-300 ${expandedMenu === "fermos" ? "rotate-180" : ""}`}>▾</span>
              </button>
              {expandedMenu === "fermos" && (
                <div className="pl-8 space-y-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/10 rounded-lg transition-all duration-200">
                    Tus derechos
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/10 rounded-lg transition-all duration-200">
                    Guías y recursos
                  </button>
                </div>
              )}
            </div>

            {/* Separador */}
            <div className="h-px bg-empulseAccent/20 my-2"></div>

            {/* ASOCIACIONES EM */}
            <button
              onClick={() => {
                setShowAssociations(true);
                setShowICDATA(false);
                setShowChat(false);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Users size={16} />
              ASOCIACIONES EM
            </button>

            {/* HABLA - Azul */}
            <button
              onClick={() => {
                setShowChat(true);
                setShowAssociations(false);
                setShowICDATA(false);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 font-semibold text-white rounded-lg transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:shadow-[#15bce6]/40"
              style={{ background: "linear-gradient(135deg, #15bce6 0%, #0d7fa8 100%)" }}
            >
              HABLA
            </button>

            {/* ICDATA */}
            <button
              onClick={() => {
                setShowAssociations(false);
                setShowICDATA(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 font-semibold text-white rounded-lg transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:shadow-[#2D8659]/40"
              style={{ backgroundColor: "#2D8659" }}
            >
              ICDATA
            </button>

            {/* Separador */}
            <div className="h-px bg-empulseAccent/20 my-2"></div>

            {/* Perfil de Usuario */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-empulseAccent/15 rounded-lg transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-empulsePrimary flex-shrink-0">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-empulsePrimary to-empulseAccent"></div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-100">{user.username || user.email}</span>
                </button>
                {showProfileMenu && (
                  <div className="absolute bottom-full mb-2 left-4 right-4 bg-empulseBg border border-empulseAccent/30 rounded-xl shadow-xl py-2 z-30">
                    <button
                      className="block w-full text-left px-4 py-2 text-xs text-slate-100 hover:bg-empulseAccent/15 transition-colors rounded"
                      onClick={() => {
                        setShowProfilePage(true);
                        setShowProfileMenu(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Mi perfil
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors rounded"
                      onClick={() => {
                        handleLogout();
                        setShowProfileMenu(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode("login");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        )}

        {/* Fila inferior: menú principal - Solo visible en md y superior */}
        <div className="hidden md:flex items-center gap-1 text-[11px] md:text-xs uppercase tracking-wide text-slate-300 border-t border-empulseAccent/10 pt-3">
          {/* Espaciador izquierdo para centrar el menú */}
          <div className="flex-1"></div>
          
          {/* Menú principal */}
          <div className="flex items-center gap-1">
          {/* Síntomas y Noticias */}
          <button
            onClick={() => handleNavigate("symptoms")}
            className={`px-3 py-2 font-semibold rounded-lg transition-all duration-300 flex items-center gap-1.5 relative group ${
              isActive("symptoms")
                ? "text-white bg-empulseAccent/25"
                : "text-empulsePrimary hover:text-white hover:bg-empulseAccent/15"
            }`}
          >
            <Heart size={14} />
            SÍNTOMAS Y NOTICIAS
            {isActive("symptoms") && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-empulsePrimary to-empulseAccent rounded-full"></div>
            )}
          </button>

          {/* Separador */}
          <div className="h-6 w-px bg-empulseAccent/30 mx-1"></div>

          {/* ESCLEROSIS MÚLTIPLE con submenús */}
          <div className="relative group">
            <button className="px-3 py-2 flex items-center gap-1.5 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200">
              <Shield size={14} />
              ESCLEROSIS MÚLTIPLE
              <span className="text-empulseAccent text-[10px]">▾</span>
            </button>

            {/* Dropdown con animación mejorada */}
            <div className="absolute left-0 mt-2 bg-empulseBg border border-empulseAccent/30 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[220px] z-30 origin-top group-hover:scale-y-100 scale-y-95">
                <button 
                  onClick={() => setShowWhatIsEM(true)}
                  className="block w-full text-left whitespace-nowrap px-4 py-2.5 text-[11px] md:text-xs text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/15 transition-all duration-200 group/item relative overflow-hidden">
                  <span className="relative z-10">Qué es</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-empulseAccent/0 via-empulseAccent/10 to-empulseAccent/0 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="block w-full text-left whitespace-nowrap px-4 py-2.5 text-[11px] md:text-xs text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/15 transition-all duration-200 group/item relative overflow-hidden">
                <span className="relative z-10">Tipos y diagnóstico</span>
                <div className="absolute inset-0 bg-gradient-to-r from-empulseAccent/0 via-empulseAccent/10 to-empulseAccent/0 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>

          {/* PREVENCIÓN con submenú */}
          <div className="relative group">
            <button className="px-3 py-2 flex items-center gap-1.5 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200">
              <Leaf size={14} />
              PREVENCIÓN
              <span className="text-empulseAccent text-[10px]">▾</span>
            </button>

            {/* Dropdown con animación mejorada */}
            <div className="absolute left-0 mt-2 bg-empulseBg border border-empulseAccent/30 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] z-30 origin-top group-hover:scale-y-100 scale-y-95">
              <button className="block w-full text-left whitespace-nowrap px-4 py-2.5 text-[11px] md:text-xs text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/15 transition-all duration-200 group/item relative overflow-hidden">
                <span className="relative z-10">EM-FORMA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-empulseAccent/0 via-empulseAccent/10 to-empulseAccent/0 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="block w-full text-left whitespace-nowrap px-4 py-2.5 text-[11px] md:text-xs text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/15 transition-all duration-200 group/item relative overflow-hidden">
                <span className="relative z-10">Salud mental</span>
                <div className="absolute inset-0 bg-gradient-to-r from-empulseAccent/0 via-empulseAccent/10 to-empulseAccent/0 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>

          {/* EM-FERMOS con submenú */}
          <div className="relative group">
            <button className="px-3 py-2 flex items-center gap-1.5 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200">
              <Users size={14} />
              EM-FERMOS
              <span className="text-empulseAccent text-[10px]">▾</span>
            </button>

            <div className="absolute left-0 mt-2 bg-empulseBg border border-empulseAccent/30 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] z-30 origin-top group-hover:scale-y-100 scale-y-95">
              <button className="block w-full text-left whitespace-nowrap px-4 py-2.5 text-[11px] md:text-xs text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/15 transition-all duration-200 group/item relative overflow-hidden">
                <span className="relative z-10">Tus derechos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-empulseAccent/0 via-empulseAccent/10 to-empulseAccent/0 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="block w-full text-left whitespace-nowrap px-4 py-2.5 text-[11px] md:text-xs text-slate-300 hover:text-empulsePrimary hover:bg-empulseAccent/15 transition-all duration-200 group/item relative overflow-hidden">
                <span className="relative z-10">Guías y recursos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-empulseAccent/0 via-empulseAccent/10 to-empulseAccent/0 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>

          {/* Separador */}
          <div className="h-6 w-px bg-empulseAccent/30 mx-1"></div>

          {/* ASOCIACIONES EM */}
          <button 
            onClick={() => {
              setShowAssociations(true);
              setShowICDATA(false);
              setShowChat(false);
            }}
            className="px-3 py-2 font-semibold text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 rounded-lg transition-all duration-200 flex items-center gap-1.5"
          >
            <Users size={14} />
            ASOCIACIONES EM
          </button>

          {/* Separador */}
          <div className="h-6 w-px bg-empulseAccent/30 mx-1"></div>

          {/* Newsletter */}
          <button
            onClick={() => {
              setShowChat(false);
              handleNavigate("newsletter");
            }}
            className={`px-3 py-2 font-semibold rounded-lg transition-all duration-300 flex items-center gap-1.5 relative group ${
              isActive("newsletter")
                ? "text-white bg-empulseAccent/25"
                : "text-empulsePrimary hover:text-white hover:bg-empulseAccent/15"
            }`}
          >
            <FileText size={14} />
            Newsletter
            {isActive("newsletter") && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-empulsePrimary to-empulseAccent rounded-full"></div>
            )}
          </button>
          </div>

          {/* Espaciador derecho para empujar HABLA e ICDATA */}
          <div className="flex-1"></div>

          {/* HABLA - Azul (color EM) con gradiente */}
          <button
            onClick={() => {
              setShowAssociations(false);
              setShowICDATA(false);
              setShowChat(true);
            }}
            className="px-3 py-1.5 rounded-lg text-white font-semibold text-[11px] transition-all duration-200 hover:shadow-lg hover:shadow-[#15bce6]/40 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #15bce6 0%, #0d7fa8 100%)" }}
          >
            HABLA
          </button>

          {/* Separador con espacio */}
          <div className="h-6 w-1 bg-empulseAccent/20 mx-1"></div>

          {/* ICDATA - Verde esmeralda con gradiente */}
          <button
            onClick={() => {
              setShowAssociations(false);
              setShowICDATA(true);
            }}
            className="px-3 py-1.5 rounded-lg text-white font-semibold text-[11px] transition-all duration-200 hover:shadow-lg hover:shadow-[#2D8659]/40 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2D8659 0%, #1f5a3d 100%)" }}
          >
            ICDATA
          </button>

          {/* Separador con más espacio */}
          <div className="h-6 w-1 bg-empulseAccent/20 mx-2"></div>

          {/* Perfil */}
          {user ? (
            <div className="relative">
              <button 
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-empulsePrimary hover:border-empulseMid transition-all duration-200 hover:shadow-md hover:shadow-empulsePrimary/20"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-empulsePrimary to-empulseAccent"></div>
                )}
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-empulseBg border border-empulseAccent/30 rounded-xl shadow-xl py-2 min-w-[140px] z-30">
                  <button
                    className="block w-full text-left px-4 py-2 text-xs hover:bg-empulseAccent/15 transition-colors"
                    onClick={() => {
                      setShowProfilePage(true);
                      setShowProfileMenu(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Mi perfil
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-xs hover:bg-red-500/10 text-red-400 transition-colors"
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowAuthModal(true);
                setAuthMode("login");
              }}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-empulsePrimary to-empulseMid text-slate-950 text-xs font-bold hover:shadow-md hover:shadow-empulsePrimary/40 transition-all duration-200"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
