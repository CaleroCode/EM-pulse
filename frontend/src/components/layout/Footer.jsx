import { MapPin, Mail, Phone, Shield, FileText, Eye } from "lucide-react";

export default function Footer({ onPrivacyClick, onTermsClick, onCookiesClick }) {
  return (
    <footer className="border-t border-empulseAccent/40 bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-empulsePrimary font-bold text-lg mb-4">EM-PULSE</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Plataforma de apoyo comunitario para personas con Esclerosis Múltiple.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="bg-empulsePrimary/10 border border-empulsePrimary/30 rounded-full p-2">
                <Shield className="w-4 h-4 text-empulsePrimary" />
              </div>
              <div className="text-xs">
                <p className="text-empulsePrimary font-semibold">Certificado GDPR</p>
                <p className="text-slate-500">Cumplimiento legal garantizado</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-slate-400 bg-dark-bg-secondary/30 border border-empulseAccent/20 rounded-lg p-3">
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-empulsePrimary flex-shrink-0 mt-0.5" />
                <a href="mailto:calerocode@gmail.com" className="hover:text-empulsePrimary transition">
                  calerocode@gmail.com
                </a>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-empulsePrimary flex-shrink-0 mt-0.5" />
                <span>+34 684 661 600</span>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-empulsePrimary flex-shrink-0 mt-0.5" />
                <span>Asturias, España</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 mb-4">Legal</h4>
            <div className="space-y-2 text-sm bg-dark-bg-secondary/30 border border-empulseAccent/20 rounded-lg p-3">
              <button
                onClick={onPrivacyClick}
                className="flex gap-2 text-slate-400 hover:text-empulsePrimary transition w-full"
              >
                <Eye className="w-4 h-4" />
                Política de Privacidad
              </button>
              <button
                onClick={onTermsClick}
                className="flex gap-2 text-slate-400 hover:text-empulsePrimary transition w-full"
              >
                <FileText className="w-4 h-4" />
                Términos de Servicio
              </button>
              <a
                onClick={onCookiesClick}
                className="flex gap-2 text-slate-400 hover:text-empulsePrimary transition w-full cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                Política de Cookies
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-empulseAccent/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center md:text-left">
            <p>© {new Date().getFullYear()} EM-PULSE · Plataforma de Apoyo a Pacientes con Esclerosis Múltiple</p>
            <p className="mt-1">Desarrollado por <a href="https://icdata.onrender.com" target="_blank" rel="noopener noreferrer" className="text-empulsePrimary hover:text-empulseMid transition">Iván Calero</a></p>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex gap-1">
              <Shield className="w-3 h-3 text-empulsePrimary" />
              Datos Seguros
            </span>
            <span className="flex gap-1">
              <FileText className="w-3 h-3 text-empulsePrimary" />
              Verificado
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
