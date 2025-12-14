import { useState } from 'react';
import logoImg from '../../assets/image/logo.png';
import Button from './Button';

export default function IndexPage({ onEnter }) {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    // Esperar a que termine la animación antes de cambiar de página
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(90deg, #084563 0%, #0a7a99 100%)',
      }}>
      {/* Fondo sin efectos adicionales */}

      {/* Card centrada */}
      <div 
        className={`relative z-10 max-w-md w-full mx-4 transition-all duration-600 transform ${
          isEntering ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div 
          className="rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/20 p-8 md:p-12 card-glow-pulse"
          style={{
            background: 'linear-gradient(135deg, rgba(8, 69, 99, 0.95) 0%, rgba(10, 122, 153, 0.90) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Logo */}
          <div className="flex justify-center -mb-6 animate-fade-in">
            <img 
              src={logoImg} 
              alt="EM-PULSE Logo" 
              className="h-24 w-24 object-contain drop-shadow-lg glow-pulse"
            />
          </div>

          {/* Título EM-PULSE con animación */}
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-5xl font-bold tracking-tighter heartbeat-pulse glow-pulse inline-block pointer-events-none">
                <span className="text-empulsePrimary">EM</span>
                <span className="text-slate-100">-PULSE</span>
              </span>
            </div>
          </div>

          {/* Texto de presentación */}
          <div className="text-center animate-fade-in" style={{ marginBottom: '4rem', animationDelay: '0.4s' }}>
            <p className="text-slate-100 text-sm md:text-base leading-relaxed drop-shadow text-justify mb-4">
              La <strong>esclerosis múltiple</strong> es la enfermedad de las mil caras: nunca sabes con cuál va a presentarse.
            </p>
            <p className="text-slate-100 text-sm md:text-base leading-relaxed drop-shadow text-justify">
              <strong>EM-PULSE</strong> es el lugar donde pones nombre a esas caras, encuentras respuestas y descubres que no afrontas la batalla sin aliados
            </p>
          </div>

          {/* Botón Entrar */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={handleEnter}
              size="md"
              className="text-white drop-shadow-lg"
            >
              Entrar
            </Button>
          </div>
        </div>

        {/* Breve descripción debajo */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-slate-400 text-xs md:text-sm">
            Conocemos tu <strong>dolor</strong> y tus <strong>miedos</strong>.
          </p>
          <p className="text-slate-400 text-xs md:text-sm">
            Aquí tienes un <strong>lugar seguro</strong> y una <strong>mano amiga</strong>.
          </p>
        </div>
      </div>

      {/* Estilos personalizados para animaciones */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .heartbeat-pulse {
          animation: heartbeatPulse 2s ease-in-out infinite;
        }

        .heartbeat-pulse:hover {
          animation: heartbeatPulse 2s ease-in-out infinite;
        }

        @keyframes heartbeatPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          25% { transform: scale(1.08); }
          50% { transform: scale(1); }
        }

        .glow-pulse {
          animation: glowPulse 2s ease-in-out infinite;
        }

        .glow-pulse:hover {
          animation: glowPulseIntense 1s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(21, 188, 230, 0.3);
          }
          50% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(21, 188, 230, 0.6);
          }
        }

        @keyframes glowPulseIntense {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(21, 188, 230, 0.8);
          }
          50% { 
            text-shadow: 0 0 40px rgba(255, 255, 255, 1), 0 0 60px rgba(21, 188, 230, 1);
          }
        }

        .card-glow-pulse {
          animation: cardGlowPulse 2s ease-in-out infinite;
        }

        @keyframes cardGlowPulse {
          0%, 100% { 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(21, 188, 230, 0.25);
          }
          50% { 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 40px rgba(21, 188, 230, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
