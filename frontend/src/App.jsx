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
  ChatEmPulse,
  IndexPage,
  WhatIsEM,
} from "./components";
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
  // Estado: Chat EM-PULSE
  // ======================
  const [showChat, setShowChat] = useState(false);

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
  // Estado: Foro
  // ======================
  const [showForum, setShowForum] = useState(false);
  const [sectionToNavigate, setSectionToNavigate] = useState(null);

  // ======================
  // Efectos: cargar datos
  // ======================

  // Cargar síntomas
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

  // Cargar noticias externas (recientes)
  useEffect(() => {
    const fetchExternalNews = async () => {
      try {
        setExternalNewsLoading(true);
        setExternalNewsError("");

        const response = await fetch(
          `${API_BASE_URL}/api/news/external_recent/?language=${newsLanguageFilter}`
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

    fetchExternalNews();
  }, [newsLanguageFilter]);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profile_image", reader.result);
      };
      reader.readAsDataURL(file);
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
        `${API_BASE_URL}/api/news/external_all/?language=${newsLanguageFilter}`
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
      alert("Error al cargar todas las noticias. Intenta más tarde.");
    } finally {
      setAllNewsLoading(false);
    }
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
            setShowTypesAndDiagnosis={setShowTypesAndDiagnosis}
            setShowSymptomsDetail={setShowSymptomsDetail}
            setShowMovement={setShowMovement}
            setShowMentalHealth={setShowMentalHealth}
            setShowRights={setShowRights}
            setShowGuides={setShowGuides}
            setShowForum={setShowForum}
            setSectionToNavigate={setSectionToNavigate}
            setShowAllNews={setShowAllNews}
            handleLogout={handleLogout}
          />

      <main className="flex-1">
        {showAssociations ? (
          <AssociationsSection
            showAssociations={showAssociations}
          />
        ) : showICDATA ? (
          <ICDATASection
            showICDATA={showICDATA}
          />
        ) : showChat ? (
          <ChatEmPulse />
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
        ) : showForum ? (
          <Forum user={user} profileImage={profileImage} />
        ) : showAllNews ? (
          <AllNewsSection
            showAllNews={showAllNews}
            setShowAllNews={setShowAllNews}
            allExternalNews={allExternalNews}
            allNewsLoading={allNewsLoading}
            formatDate={formatDate}
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
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
    </div>
  );
}

export default App;
