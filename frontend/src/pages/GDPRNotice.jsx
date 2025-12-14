import { useState } from "react";

export default function GDPRNotice({ onPrivacyClick, onTermsClick }) {
  const [showNotice, setShowNotice] = useState(() => {
    const gdprAccepted = localStorage.getItem("gdpr_accepted");
    return !gdprAccepted;
  });

  const handleAccept = () => {
    localStorage.setItem("gdpr_accepted", "true");
    setShowNotice(false);
  };

  const handleReject = () => {
    localStorage.setItem("gdpr_accepted", "rejected");
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-0 right-0 left-0 z-40 bg-dark-bg border-t border-empulseAccent/40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-300 leading-relaxed">
              🔒 <strong>Privacidad y Cookies:</strong> Utilizamos cookies y analizamos tu actividad para mejorar tu experiencia. Al continuar, aceptas nuestra{" "}
              <button 
                onClick={() => { setShowNotice(false); onPrivacyClick && onPrivacyClick(); }} 
                className="text-empulsePrimary hover:text-empulseMid transition underline cursor-pointer"
              >
                Política de Privacidad
              </button>
              {" "}y{" "}
              <button 
                onClick={() => { setShowNotice(false); onTermsClick && onTermsClick(); }} 
                className="text-empulsePrimary hover:text-empulseMid transition underline cursor-pointer"
              >
                Términos de Servicio
              </button>
              .
            </p>
          </div>
          <div className="flex gap-2 whitespace-nowrap">
            <button
              onClick={handleReject}
              className="px-3 py-2 text-sm border border-slate-600 text-slate-300 hover:text-slate-100 hover:border-slate-400 rounded transition"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-empulsePrimary text-dark-bg font-semibold hover:bg-empulseMid rounded transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
