import { useState, useEffect } from "react";
import {
  Navbar,
  Hero,
  SymptomsSection,
  NewsSection,
  NewsletterSection,
  Footer,
  AuthModal,
  ProfilePage,
  AllNewsSection,
  AssociationsSection,
  ICDATASection,
  IndexPage,
  WhatIsEM,
  AdvancedSearch,
} from "./components";
import AlertModal from "./components/AlertModal";
import SEOSchema from "./components/SEOSchema";
import TypesAndDiagnosis from "./pages/TypesAndDiagnosis";
import SymptomsDetail from "./pages/SymptomsDetail";
import EMForma from "./pages/EMForma";
import MentalHealth from "./pages/MentalHealth";
import TusDerechos from "./pages/TusDerechos";
import GuiasYRecursos from "./pages/GuiasYRecursos";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GDPRNotice from "./pages/GDPRNotice";
import Forum from "./pages/Forum";
import AccessibilityPage from "./pages/AccessibilityPage";
import AdminPanel from "./pages/AdminPanel";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  // ======================
  // Estado: Newsletter
  // ======================
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("es");
  const [frequency, setFrequency] = useState("weekly");
  const [favoriteTopics, setFavoriteTopics] = useState("síntomas, noticias");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ======================
  // Estado: AlertModal
  // ======================
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  });

  // ======================
  // Estado: Síntomas
  // ======================
  const [symptoms, setSymptoms] = useState([]);
  const [symptomsLoading, setSymptomsLoading] = useState(true);
  const [symptomsError, setSymptomsError] = useState("");

  // ======================
  // Estado: Noticias Externas
  // ======================
  const [externalNews, setExternalNews] = useState([]);
  const [externalNewsLoading, setExternalNewsLoading] = useState(true);
  const [externalNewsError, setExternalNewsError] = useState("");
  const [newsLanguageFilter, setNewsLanguageFilter] = useState("both");
  const [showAllNews, setShowAllNews] = useState(false);
  const [allExternalNews, setAllExternalNews] = useState([]);
  const [allNewsLoading, setAllNewsLoading] = useState(false);

  // ======================
  // Estado: Buscador
  // ======================
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // ======================
  // Estado: Autenticación
  // ======================
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authPasswordConfirm, setAuthPasswordConfirm] = useState("");
  const [authName, setAuthName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profile_image") || ""
  );
  const [editingProfileName, setEditingProfileName] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profilePreferences, setProfilePreferences] = useState(
    JSON.parse(localStorage.getItem("profile_preferences")) || {
      topics: [],
      language: "es",
      frequency: "weekly",
    }
  );

  // ======================
  // Estado: Asociaciones
  // ======================
  const [showAssociations, setShowAssociations] = useState(false);

  // ======================
  // Estado: ICDATA
  // ======================
  const [showICDATA, setShowICDATA] = useState(false);

  // ======================
  // Estado: Página Index
  // ======================
  const [showIndex, setShowIndex] = useState(true);

  // ======================
  // Estado: ¿Qué es EM?
  // ======================
  const [showWhatIsEM, setShowWhatIsEM] = useState(false);

  // ======================
  // Estado: Tipos y Diagnóstico
  // ======================
  const [showTypesAndDiagnosis, setShowTypesAndDiagnosis] = useState(false);

  // ======================
  // Estado: Detalle de Síntoma
  // ======================
  const [showSymptomsDetail, setShowSymptomsDetail] = useState(false);

  // ======================
  // Estado: Movimiento y Ejercicio
  // ======================
  const [showMovement, setShowMovement] = useState(false);

  // ======================
  // Estado: Salud Mental
  // ======================
  const [showMentalHealth, setShowMentalHealth] = useState(false);

  // ======================
  // Estado: Tus Derechos
  // ======================
  const [showRights, setShowRights] = useState(false);

  // ======================
  // Estado: Guías y Recursos
  // ======================
  const [showGuides, setShowGuides] = useState(false);

  // ======================
  // Estado: Política de Privacidad
  // ======================
  const [showPrivacy, setShowPrivacy] = useState(false);

  // ======================
  // Estado: Términos de Servicio
  // ======================
  const [showTerms, setShowTerms] = useState(false);

  // ======================
  // Estado: Chat EM-PULSE
  // ======================
  const [_showChat, setShowChat] = useState(false);

  // ======================
  // Estado: Foro
  // ======================
  const [showForum, setShowForum] = useState(false);
  const [sectionToNavigate, setSectionToNavigate] = useState(null);

  // ======================
  // Estado: Accesibilidad
  // ======================
  const [showAccessibility, setShowAccessibility] = useState(false);

  // ======================
  // Estado: Admin Panel
  // ======================
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // ======================
  // Efectos: cargar datos
  // ======================

  // Cargar síntomas
  // Cargar síntomas PRIMERO (solo texto, más rápido)
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setSymptomsLoading(true);
        setSymptomsError("");

        const response = await fetch(`${API_BASE_URL}/api/symptoms/`);
        if (!response.ok) {
          throw new Error("No se pudieron cargar los síntomas.");
        }

        const data = await response.json();
        setSymptoms(data);
      } catch (err) {
        console.error(err);
        setSymptomsError(
          "No se han podido cargar los síntomas. Intenta más tarde."
        );
      } finally {
        setSymptomsLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  // Cargar noticias externas DESPUÉS (contenido más pesado)
  // Se ejecuta después de que los síntomas se carguen
  useEffect(() => {
    const fetchExternalNews = async () => {
      try {
        setExternalNewsLoading(true);
        setExternalNewsError("");

        const response = await fetch(
          `${API_BASE_URL}/api/communications/news/external_recent/?language=${newsLanguageFilter}`
        );
        if (!response.ok) {
          throw new Error("No se pudieron cargar las noticias externas.");
        }

        const data = await response.json();
        setExternalNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setExternalNewsError(
          "No se han podido cargar las noticias externas. Intenta más tarde."
        );
      } finally {
        setExternalNewsLoading(false);
      }
    };

    // Pequeño delay (50ms) para asegurar que síntomas se cargan primero
    const newsTimer = setTimeout(() => {
      fetchExternalNews();
    }, 50);

    return () => clearTimeout(newsTimer);
  }, [newsLanguageFilter]);

  // Aplicar preferencias de accesibilidad guardadas al cargar
  useEffect(() => {
    const darkMode = localStorage.getItem("em-pulse-dark-mode") === "true";
    const highContrast = localStorage.getItem("em-pulse-high-contrast") === "true";
    const focusIndicators = localStorage.getItem("em-pulse-focus-indicators") === "true";
    const reducedMotion = localStorage.getItem("em-pulse-reduced-motion") === "true";
    const fontSize = parseInt(localStorage.getItem("em-pulse-font-size")) || 100;

    document.documentElement.classList.toggle("dark-mode-em", darkMode);
    document.documentElement.classList.toggle("high-contrast-em", highContrast);
    document.documentElement.classList.toggle("enhanced-focus-em", focusIndicators);
    document.documentElement.classList.toggle("reduce-motion-em", reducedMotion);
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, []);

  // Restaurar usuario del token al cargar
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/me/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            localStorage.removeItem("auth_token");
            setToken(null);
          }
        } catch (err) {
          console.error("Error restaurando usuario:", err);
        }
      };
      fetchUser();
    }
  }, [token]);

  // Manejar scroll a sección después de cerrar el Forum
  useEffect(() => {
    if (!showForum && sectionToNavigate) {
      // Dar tiempo a que el DOM se actualice
      setTimeout(() => {
        scrollToSection(sectionToNavigate);
        setSectionToNavigate(null);
      }, 100);
    }
  }, [showForum, sectionToNavigate]);

  // Atajo de teclado para búsqueda avanzada (⌘K o Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowAdvancedSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Detectar acceso al panel admin por URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#admin-em-pulse-panel') {
      setShowAdminPanel(true);
    } else {
      setShowAdminPanel(false);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash === '#admin-em-pulse-panel') {
        setShowAdminPanel(true);
      } else {
        setShowAdminPanel(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ======================
  // Handlers de autenticación
  // ======================

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    // Validación para registro: contraseñas coinciden
    if (authMode === "register" && authPassword !== authPasswordConfirm) {
      setAuthError("Las contraseñas no coinciden. Intenta de nuevo.");
      return;
    }

    setAuthLoading(true);

    try {
      const endpoint =
        authMode === "login"
          ? `${API_BASE_URL}/api/auth/login/`
          : `${API_BASE_URL}/api/auth/register/`;

      const body =
        authMode === "login"
          ? { email: authEmail, password: authPassword }
          : { email: authEmail, password: authPassword, name: authName };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error en autenticación");
      }

      const data = await response.json();
      localStorage.setItem("auth_token", data.token);
      setToken(data.token);
      setUser(data);
      setShowAuthModal(false);
      setAuthSuccess(
        authMode === "login"
          ? "✅ ¡Has iniciado sesión!"
          : "✅ ¡Te has registrado correctamente!"
      );

      setAuthEmail("");
      setAuthPassword("");
      setAuthPasswordConfirm("");
      setAuthName("");
    } catch (err) {
      console.error(err);
      setAuthError(err.message || "Error en autenticación");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    setAuthEmail("");
    setAuthPassword("");
    setAuthPasswordConfirm("");
    setAuthName("");
    setShowProfilePage(false);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar que sea una imagen y no un PDF
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      const isPDF = file.type === 'application/pdf';
      
      if (isPDF) {
        alert('❌ No se puede usar un PDF como imagen de perfil. Por favor, selecciona un archivo de imagen (JPG, PNG, GIF, WebP, etc.)');
        return;
      }
      
      if (!validImageTypes.includes(file.type)) {
        alert('⚠️ Formato de archivo no válido. Por favor, selecciona una imagen válida (JPG, PNG, GIF, WebP, etc.)');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profile_image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfileName = async (newName) => {
    if (!user || !token) {
      alert('⚠️ Debes iniciar sesión para actualizar tu perfil.');
      return false;
    }

    if (!newName.trim()) {
      alert('⚠️ El nombre no puede estar vacío.');
      return false;
    }

    try {
      // Buscar el suscriptor por email
      const response = await fetch(`${API_BASE_URL}/api/subscribers/?email=${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("No se encontró el perfil del usuario.");
      }

      const subscribers = await response.json();
      if (!subscribers || subscribers.length === 0) {
        // Si no existe como suscriptor, crearlo
        await fetch(`${API_BASE_URL}/api/subscribers/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: newName,
            preferences: profilePreferences,
          }),
        });
      } else {
        // Si existe, actualizar el nombre
        const subscriberId = subscribers[0].id;
        const updateResponse = await fetch(`${API_BASE_URL}/api/subscribers/${subscriberId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error("No se pudo actualizar el nombre.");
        }
      }

      // Actualizar el estado local
      setUser({
        ...user,
        name: newName,
      });
      setProfileName(newName);
      alert('✅ Nombre actualizado correctamente.');
      return true;
    } catch (err) {
      console.error("Error actualizando nombre:", err);
      alert('❌ Error al actualizar el nombre. Intenta de nuevo.');
      return false;
    }
  };

  const handlePreferencesChange = (preferences) => {
    setProfilePreferences(preferences);
    localStorage.setItem("profile_preferences", JSON.stringify(preferences));
  };

  const handleSubmitNewsletter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          preferences: {
            language,
            frequency,
            favorite_topics: favoriteTopics,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error("Error al crear suscriptor:", data);
        throw new Error("No se pudo registrar el newsletter.");
      }

      setSuccessMsg("✅ ¡Te has suscrito correctamente a EM-PULSE!");
      setEmail("");
      setName("");
      setLanguage("es");
      setFrequency("weekly");
      setFavoriteTopics("síntomas, noticias");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "❌ Ha ocurrido un error al suscribirte. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoadAllNews = async () => {
    try {
      setAllNewsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/communications/news/external_all/?language=${newsLanguageFilter}`
      );
      if (!response.ok) {
        throw new Error("No se pudieron cargar todas las noticias.");
      }
      const data = await response.json();
      setAllExternalNews(Array.isArray(data) ? data : []);
      setShowAllNews(true);
      scrollToSection("all-news-section");
    } catch (err) {
      console.error(err);
      setAlertModal({
        isOpen: true,
        title: 'Error',
        message: 'Error al cargar todas las noticias. Intenta más tarde.',
        type: 'error'
      });
    } finally {
      setAllNewsLoading(false);
    }
  };

  // Función para ir a la página inicial cerrando todos los overlays
  const goToHome = () => {
    setShowIndex(false);
    setShowProfilePage(false);
    setShowAuthModal(false);
    setShowAssociations(false);
    setShowICDATA(false);
    setShowWhatIsEM(false);
    setShowTypesAndDiagnosis(false);
    setShowSymptomsDetail(false);
    setShowMovement(false);
    setShowMentalHealth(false);
    setShowRights(false);
    setShowGuides(false);
    setShowForum(false);
    setShowAllNews(false);
    setShowPrivacy(false);
    setShowTerms(false);
    setShowChat(false);
    setShowAccessibility(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // scroll suave
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbar = document.getElementById("navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // formatear fecha
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Lógica de filtrado buscador
  const normalizedQuery = searchQuery.toLowerCase().trim();

  const filteredSymptoms = symptoms.filter((symptom) => {
    if (!normalizedQuery) return true;
    const text = `
      ${symptom.name || ""}
      ${symptom.category || ""}
      ${symptom.description || ""}
    `.toLowerCase();
    return text.includes(normalizedQuery);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #021922;
        }
        ::-webkit-scrollbar-thumb {
          background: #15BCE6;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #5CC4DE;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #15BCE6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5CC4DE;
        }

        /* Estilos de Accesibilidad Globales */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .dark-mode-em {
          color-scheme: dark;
          filter: invert(1) hue-rotate(180deg);
        }

        .dark-mode-em body {
          background-color: #020f18;
          color: #e2e8f0;
        }

        .high-contrast-em {
          --text-color: #000000;
          --bg-color: #ffffff;
          --primary-color: #0066cc;
        }

        .high-contrast-em body {
          background-color: #ffffff;
          color: #000000;
        }

        .high-contrast-em button {
          border: 2px solid #000000;
        }

        .enhanced-focus-em *:focus-visible {
          outline: 4px solid #ffff00;
          outline-offset: 2px;
        }

        .reduce-motion-em * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>

      {/* Mostrar IndexPage si showIndex es true */}
      {showIndex ? (
        <IndexPage onEnter={() => setShowIndex(false)} />
      ) : (
        <>
          <SEOSchema />
          <Navbar
            user={user}
            profileImage={profileImage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            scrollToSection={scrollToSection}
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
            setShowProfilePage={setShowProfilePage}
            setShowAssociations={setShowAssociations}
            setShowICDATA={setShowICDATA}
            setShowChat={setShowChat}
            setShowWhatIsEM={setShowWhatIsEM}
            setShowForum={setShowForum}
            setShowTypesAndDiagnosis={setShowTypesAndDiagnosis}
            setShowSymptomsDetail={setShowSymptomsDetail}
            setShowMovement={setShowMovement}
            setShowMentalHealth={setShowMentalHealth}
            setShowRights={setShowRights}
            setShowGuides={setShowGuides}
            setSectionToNavigate={setSectionToNavigate}
            setShowAllNews={setShowAllNews}
            setShowAccessibility={setShowAccessibility}
            handleLogout={handleLogout}
            goToHome={goToHome}
          />

      <main className="flex-1">
        {showAdminPanel ? (
          <AdminPanel />
        ) : showAccessibility ? (
          <AccessibilityPage onClose={() => setShowAccessibility(false)} />
        ) : showForum ? (
          <Forum user={user} profileImage={profileImage} showForum={showForum} />
        ) : showAllNews ? (
          <AllNewsSection
            showAllNews={showAllNews}
            setShowAllNews={setShowAllNews}
            allExternalNews={allExternalNews}
            allNewsLoading={allNewsLoading}
            formatDate={formatDate}
          />
        ) : showAssociations ? (
          <AssociationsSection
            showAssociations={showAssociations}
            setShowAssociations={setShowAssociations}
          />
        ) : showICDATA ? (
          <ICDATASection
            showICDATA={showICDATA}
          />
        ) : showMovement ? (
          <EMForma
            showMovement={showMovement}
            setShowMovement={setShowMovement}
          />
        ) : showMentalHealth ? (
          <MentalHealth
            showMentalHealth={showMentalHealth}
            setShowMentalHealth={setShowMentalHealth}
          />
        ) : showRights ? (
          <TusDerechos
            showRights={showRights}
            setShowRights={setShowRights}
          />
        ) : showGuides ? (
          <GuiasYRecursos
            showGuides={showGuides}
            setShowGuides={setShowGuides}
          />
        ) : showTypesAndDiagnosis ? (
          <TypesAndDiagnosis
            showTypesAndDiagnosis={showTypesAndDiagnosis}
            setShowTypesAndDiagnosis={setShowTypesAndDiagnosis}
          />
        ) : showWhatIsEM ? (
          <WhatIsEM
            showWhatIsEM={showWhatIsEM}
            setShowWhatIsEM={setShowWhatIsEM}
          />
        ) : showSymptomsDetail ? (
          <SymptomsDetail
            allSymptoms={symptoms}
            showSymptomsDetail={showSymptomsDetail}
            setShowSymptomsDetail={setShowSymptomsDetail}
          />
        ) : (
          <>
            <Hero setShowAdvancedSearch={setShowAdvancedSearch} />

            <section className="border-t border-empulseAccent/40 bg-empulseBg/90">
              <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <SymptomsSection
                symptoms={symptoms}
                filteredSymptoms={filteredSymptoms}
                symptomsLoading={symptomsLoading}
                symptomsError={symptomsError}
                setShowSymptomsDetail={setShowSymptomsDetail}
              />              <NewsSection
                externalNews={externalNews}
                externalNewsLoading={externalNewsLoading}
                externalNewsError={externalNewsError}
                newsLanguageFilter={newsLanguageFilter}
                setNewsLanguageFilter={setNewsLanguageFilter}
                handleLoadAllNews={handleLoadAllNews}
                allNewsLoading={allNewsLoading}
                formatDate={formatDate}
              />
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => scrollToSection("hero")}
                className="px-3 py-2 rounded-full bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40 transition"
                title="Volver al inicio"
              >
                <span className="text-lg">↑</span>
              </button>
            </div>
          </div>
        </section>

        <NewsletterSection
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          language={language}
          setLanguage={setLanguage}
          frequency={frequency}
          setFrequency={setFrequency}
          favoriteTopics={favoriteTopics}
          setFavoriteTopics={setFavoriteTopics}
          loading={loading}
          successMsg={successMsg}
          errorMsg={errorMsg}
          handleSubmitNewsletter={handleSubmitNewsletter}
          scrollToSection={scrollToSection}
        />
          </>
        )}
      </main>

      <Footer 
        onPrivacyClick={() => setShowPrivacy(true)}
        onTermsClick={() => setShowTerms(true)}
      />
        </>
      )}

      {!showAssociations && (
        <>
          <ProfilePage
            showProfilePage={showProfilePage}
            setShowProfilePage={setShowProfilePage}
            user={user}
            profileImage={profileImage}
            handleProfileImageChange={handleProfileImageChange}
            editingProfileName={editingProfileName}
            setEditingProfileName={setEditingProfileName}
            profileName={profileName}
            setProfileName={setProfileName}
            handleUpdateProfileName={handleUpdateProfileName}
            profilePreferences={profilePreferences}
            handlePreferencesChange={handlePreferencesChange}
            handleLogout={handleLogout}
          />

          <AuthModal
            showAuthModal={showAuthModal}
            setShowAuthModal={setShowAuthModal}
            authMode={authMode}
            setAuthMode={setAuthMode}
            authEmail={authEmail}
            setAuthEmail={setAuthEmail}
            authPassword={authPassword}
            setAuthPassword={setAuthPassword}
            authPasswordConfirm={authPasswordConfirm}
            setAuthPasswordConfirm={setAuthPasswordConfirm}
            authName={authName}
            setAuthName={setAuthName}
            authLoading={authLoading}
            authError={authError}
            authSuccess={authSuccess}
            handleAuthSubmit={handleAuthSubmit}
          />
        </>
      )}

      <ProfilePage
        showProfilePage={showProfilePage}
        setShowProfilePage={setShowProfilePage}
        user={user}
        profileImage={profileImage}
        handleProfileImageChange={handleProfileImageChange}
        editingProfileName={editingProfileName}
        setEditingProfileName={setEditingProfileName}
        profileName={profileName}
        setProfileName={setProfileName}
        handleUpdateProfileName={handleUpdateProfileName}
        profilePreferences={profilePreferences}
        handlePreferencesChange={handlePreferencesChange}
        handleLogout={handleLogout}
      />

      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        authMode={authMode}
        setAuthMode={setAuthMode}
        authEmail={authEmail}
        setAuthEmail={setAuthEmail}
        authPassword={authPassword}
        setAuthPassword={setAuthPassword}
        authPasswordConfirm={authPasswordConfirm}
        setAuthPasswordConfirm={setAuthPasswordConfirm}
        authName={authName}
        setAuthName={setAuthName}
        authLoading={authLoading}
        authError={authError}
        authSuccess={authSuccess}
        handleAuthSubmit={handleAuthSubmit}
      />

      {showPrivacy && (
        <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
      )}

      {showTerms && (
        <TermsOfService onClose={() => setShowTerms(false)} />
      )}

      <GDPRNotice 
        onPrivacyClick={() => setShowPrivacy(true)}
        onTermsClick={() => setShowTerms(true)}
      />

      <AlertModal 
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({...alertModal, isOpen: false})}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />

      {showAdvancedSearch && (
        <AdvancedSearch 
          onClose={() => setShowAdvancedSearch(false)}
          setShowMentalHealth={setShowMentalHealth}
          setShowRights={setShowRights}
          setShowGuides={setShowGuides}
          setShowForum={setShowForum}
          sectionToNavigate={sectionToNavigate}
          setSectionToNavigate={setSectionToNavigate}
        />
      )}
    </div>
  );
}

export default App;
