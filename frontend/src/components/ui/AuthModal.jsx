import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function AuthModal({
  showAuthModal,
  setShowAuthModal,
  authMode,
  setAuthMode,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  authPasswordConfirm,
  setAuthPasswordConfirm,
  authName,
  setAuthName,
  authLoading,
  authError,
  authSuccess,
  handleAuthSubmit,
}) {
  // Estados para recuperación de contraseña
  const [recoveryStep, setRecoveryStep] = useState(1);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryPassword, setRecoveryPassword] = useState("");
  const [recoveryPasswordConfirm, setRecoveryPasswordConfirm] = useState("");
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState("");
  const [recoverySuccess, setRecoverySuccess] = useState("");

  if (!showAuthModal) return null;

  const handleRecoveryStep1 = async (e) => {
    e.preventDefault();
    setRecoveryLoading(true);
    setRecoveryError("");
    setRecoverySuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/password-recovery/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: recoveryEmail
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al enviar el email");
      }

      setRecoverySuccess("Se ha enviado un enlace a tu email. Revisa tu bandeja de entrada.");
      // Cambiar al paso 2 después de 2 segundos
      setTimeout(() => {
        setRecoveryStep(2);
        setRecoverySuccess("");
      }, 2000);
    } catch (err) {
      setRecoveryError(err.message || "Error al procesar la solicitud");
    } finally {
      setRecoveryLoading(false);
    }
  };

  const handleRecoveryStep2 = async (e) => {
    e.preventDefault();
    
    if (recoveryPassword !== recoveryPasswordConfirm) {
      setRecoveryError("Las contraseñas no coinciden");
      return;
    }

    setRecoveryLoading(true);
    setRecoveryError("");
    setRecoverySuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: recoveryEmail,
          new_password: recoveryPassword
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al cambiar la contraseña");
      }

      setRecoverySuccess("✅ Tu contraseña ha sido cambiada correctamente");
      // Volver a login después de 2 segundos
      setTimeout(() => {
        setAuthMode("login");
        setRecoveryStep(1);
        setRecoveryEmail("");
        setRecoveryPassword("");
        setRecoveryPasswordConfirm("");
        setRecoverySuccess("");
      }, 2000);
    } catch (err) {
      setRecoveryError(err.message || "Error al cambiar la contraseña");
    } finally {
      setRecoveryLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-empulseBg border border-empulseAccent/40 rounded-2xl p-8 max-w-md w-full mx-4">
        {/* Título dinámico según el modo */}
        <h2 className="text-2xl font-semibold mb-6">
          {authMode === "login" && "Iniciar sesión"}
          {authMode === "register" && "Crear cuenta"}
          {authMode === "password-recovery" && "Recuperar contraseña"}
        </h2>

        {(authError || recoveryError) && (
          <p className="text-sm text-red-400 mb-4">{authError || recoveryError}</p>
        )}
        {(authSuccess || recoverySuccess) && (
          <p className="text-sm text-green-400 mb-4">{authSuccess || recoverySuccess}</p>
        )}

        {/* MODO LOGIN Y REGISTRO */}
        {(authMode === "login" || authMode === "register") && (
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === "register" && (
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                  placeholder="Tu nombre"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                placeholder="••••••••"
                required
              />
            </div>

            {authMode === "register" && (
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Repetir contraseña
                </label>
                <input
                  type="password"
                  value={authPasswordConfirm}
                  onChange={(e) => setAuthPasswordConfirm(e.target.value)}
                  className={`w-full rounded-lg bg-empulseBg border px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 transition ${
                    authPassword && authPasswordConfirm
                      ? authPassword === authPasswordConfirm
                        ? "border-green-500/50 focus:ring-green-500"
                        : "border-red-500/50 focus:ring-red-500"
                      : "border-empulseAccent/40 focus:ring-empulsePrimary"
                  }`}
                  placeholder="••••••••"
                  required
                />
                {authPassword && authPasswordConfirm && authPassword !== authPasswordConfirm && (
                  <p className="text-xs text-red-400 mt-1">Las contraseñas no coinciden</p>
                )}
                {authPassword && authPasswordConfirm && authPassword === authPasswordConfirm && (
                  <p className="text-xs text-green-400 mt-1">✓ Las contraseñas coinciden</p>
                )}
              </div>
            )}

            {authMode === "login" && (
              <button
                type="button"
                onClick={() => {
                  setAuthMode("password-recovery");
                  setRecoveryError("");
                  setRecoverySuccess("");
                }}
                className="w-full px-4 py-2 rounded-lg bg-empulsePrimary text-slate-950 font-semibold hover:bg-empulseMid transition"
              >
                Recuperar contraseña
              </button>
            )}

            <button
              type="submit"
              disabled={authLoading || (authMode === "register" && authPassword !== authPasswordConfirm)}
              className="w-full mt-6 px-4 py-2 rounded-lg bg-empulsePrimary text-slate-950 font-semibold hover:bg-empulseMid disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {authLoading
                ? "Cargando..."
                : authMode === "login"
                ? "Iniciar sesión"
                : "Crear cuenta"}
            </button>
          </form>
        )}

        {/* MODO RECUPERACIÓN DE CONTRASEÑA - PASO 1: Introducir email */}
        {authMode === "password-recovery" && recoveryStep === 1 && (
          <form onSubmit={handleRecoveryStep1} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Introduce tu email registrado
              </label>
              <input
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                placeholder="tu@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={recoveryLoading}
              className="w-full mt-6 px-4 py-2 rounded-lg bg-empulsePrimary text-slate-950 font-semibold hover:bg-empulseMid disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {recoveryLoading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        )}

        {/* MODO RECUPERACIÓN DE CONTRASEÑA - PASO 2: Nueva contraseña */}
        {authMode === "password-recovery" && recoveryStep === 2 && (
          <form onSubmit={handleRecoveryStep2} className="space-y-4">
            <p className="text-xs text-slate-300 mb-4">
              Introduce tu nueva contraseña
            </p>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={recoveryPassword}
                onChange={(e) => setRecoveryPassword(e.target.value)}
                className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Repetir contraseña
              </label>
              <input
                type="password"
                value={recoveryPasswordConfirm}
                onChange={(e) => setRecoveryPasswordConfirm(e.target.value)}
                className={`w-full rounded-lg bg-empulseBg border px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 transition ${
                  recoveryPassword && recoveryPasswordConfirm
                    ? recoveryPassword === recoveryPasswordConfirm
                      ? "border-green-500/50 focus:ring-green-500"
                      : "border-red-500/50 focus:ring-red-500"
                    : "border-empulseAccent/40 focus:ring-empulsePrimary"
                }`}
                placeholder="••••••••"
                required
              />
              {recoveryPassword && recoveryPasswordConfirm && recoveryPassword !== recoveryPasswordConfirm && (
                <p className="text-xs text-red-400 mt-1">Las contraseñas no coinciden</p>
              )}
              {recoveryPassword && recoveryPasswordConfirm && recoveryPassword === recoveryPasswordConfirm && (
                <p className="text-xs text-green-400 mt-1">✓ Las contraseñas coinciden</p>
              )}
            </div>

            <button
              type="submit"
              disabled={recoveryLoading || recoveryPassword !== recoveryPasswordConfirm}
              className="w-full mt-6 px-4 py-2 rounded-lg bg-empulsePrimary text-slate-950 font-semibold hover:bg-empulseMid disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {recoveryLoading ? "Cambiando..." : "Cambiar contraseña"}
            </button>
          </form>
        )}

        {/* Enlace para cambiar de modo en login/register */}
        {(authMode === "login" || authMode === "register") && (
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              {authMode === "login"
                ? "¿No tienes cuenta? "
                : "¿Ya tienes cuenta? "}
              <button
                onClick={() => {
                  setAuthMode(authMode === "login" ? "register" : "login");
                }}
                className="text-empulsePrimary hover:text-empulseMid font-semibold"
              >
                {authMode === "login" ? "Registrarse" : "Iniciar sesión"}
              </button>
            </p>
          </div>
        )}

        {/* Botón volver en recuperación de contraseña */}
        {authMode === "password-recovery" && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setRecoveryStep(1);
                setRecoveryEmail("");
                setRecoveryPassword("");
                setRecoveryPasswordConfirm("");
                setRecoveryError("");
                setRecoverySuccess("");
              }}
              className="text-xs text-empulsePrimary hover:text-empulseMid font-semibold"
            >
              ← Volver a iniciar sesión
            </button>
          </div>
        )}

        {/* Botón cerrar modal */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
