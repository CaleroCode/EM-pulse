import principalImage from "../assets/image/principal.jpg";

const ICDATASection = ({ showICDATA }) => {
  if (!showICDATA) return null;

  return (
    <section className="w-full h-full overflow-y-auto custom-scrollbar bg-empulseBg">
      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto w-full px-4 py-10">
        {/* Imagen circular centrada */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <img
              src={principalImage}
              alt="Iván Calero"
              className="w-48 h-48 rounded-full object-cover border-4 border-[#2D8659] shadow-2xl"
            />
          </div>
        </div>

        {/* Título */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-empulsePrimary mb-6">
            ¿Qué es ICDATA?
          </h2>
        </div>

        {/* Contenido de presentación con párrafos separados */}
        <div className="space-y-6 mb-10 text-left">
          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Sé lo que es sentarte delante de un neurólogo, escuchar las dos palabras malditas —esclerosis múltiple— y notar cómo el suelo se abre medio metro bajo tus pies. Sé lo que es salir de la consulta con un folleto en la mano, mil preguntas en la cabeza y una sola certeza: el miedo. El miedo al mañana, al cuerpo que ya no reconoces del todo, a esa sombra que de repente se ha sentado a tu mesa y dice que piensa quedarse.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            También sé lo que es la soledad disfrazada de buenas palabras. Los "ánimo", los "eres muy fuerte", los "va a salir todo bien" que te dicen con cariño, pero que a veces suenan lejos, como ecos en una habitación vacía. Y luego está Internet: información dispersa, técnica, contradictoria. Artículos que parecen escritos para médicos, testimonios perdidos en foros, datos que asustan más de lo que ayudan. Mucho ruido. Muy pocas brújulas.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Mientras aprendía a ser Full Stack Developer, una idea no dejaba de golpearme la cabeza: si iba a construir mi primer gran proyecto, tenía que servir para algo más que para un portfolio bonito. <span className="text-[#2D8659] text-[18px]">Tenía que servir para nosotros.</span> Para los que convivimos con la EM, día sí y día también. Para los que sabemos lo que es mirar el calendario y medir la vida en brotes, resonancias y analíticas.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Así nació EM-PULSE: porque necesitábamos un lugar donde estuviera todo lo que siempre buscamos a trompicones. Los síntomas, explicados sin florituras. Las noticias, en español y en inglés, para no ir siempre un paso por detrás. Nuestros derechos, para que nadie nos pase por encima. Pautas y consejos para intentar que la enfermedad no avance más de lo que tiene que avanzar. Información sobre la medicación, sin promesas mágicas, pero con claridad. Y, sobre todo, lo más importante: la salud mental. Lo que esto le hace a la cabeza, al ánimo, a la identidad. Lo que casi nunca sale en los folletos.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            No soy médico, ni gurú, ni salvador de nadie. Solo soy alguien que sabe lo que es convivir con esta guerra silenciosa y que ha intentado poner algo de orden en el caos. No sé si lo he conseguido. Ojalá, al menos, haya logrado una pizca, una brizna de ayuda. Si no es así, perdonadme. Pero os aseguro que EM-PULSE está hecho con todo mi corazón, con todas mis dudas y con toda mi rabia bien enfocada.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Va por vosotros, por nosotros. Sois más fuertes de lo que creéis.
          </p>

          <div className="text-center pt-4 border-t border-empulseAccent/20">
            <p className="text-empulseSoft">
              <a
                href="http://icdata.onreal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2D8659] hover:text-[#1f5d3f] transition-colors"
              >
                Iván Calero
              </a>{" "}
              <span className="text-empulseSoft/70">
                (
                <a
                  href="http://icdata.onreal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2D8659] hover:text-[#1f5d3f] transition-colors"
                >
                  icdata.onreal.com
                </a>
                )
              </span>
            </p>
          </div>
        </div>

        {/* Botón subir */}
        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-3 py-2 rounded-full bg-empulseAccent/20 border border-empulseAccent/50 hover:bg-empulseAccent/40 transition"
            title="Volver al inicio"
          >
            <span className="text-lg">↑</span>
          </button>
        </div>

        {/* Footer spacing */}
        <div className="h-12"></div>
      </div>
    </section>
  );
};

export default ICDATASection;
