import { useEffect } from 'react';
import principalImage from "../assets/image/principal.jpg";

const ICDATASection = ({ showICDATA }) => {
  useEffect(() => {
    if (showICDATA) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showICDATA]);

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
            Sé lo que es sentarte frente a un neurólogo y escuchar dos palabras que no piden permiso para arrasarlo todo: esclerosis múltiple. Sé lo que es notar cómo el suelo se hunde bajo los pies, no de golpe, sino despacio, con crueldad, lo justo para que tengas tiempo de entender que nada vuelve a ser igual. Sé lo que es salir de la consulta con un folleto mal impreso, la cabeza llena de preguntas sin respuesta y una certeza única, afilada como un cuchillo: <strong>el miedo</strong>.
          </p>
          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Miedo al mañana. Miedo al cuerpo, que empieza a ser territorio enemigo. Miedo a esa sombra que se sienta contigo a la mesa y te informa, sin dramatismos, de que ha venido para quedarse.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            También sé lo que es la soledad maquillada de buenas intenciones. Los “ánimo”, los “eres muy fuerte”, los “todo irá bien” dichos con cariño, sí, pero que a veces suenan huecos, como voces lejanas rebotando en una habitación vacía. Y luego está Internet, ese vertedero infinito: información técnica escrita para médicos con prisas, testimonios rotos en foros olvidados, cifras que no explican nada y asustan demasiado. Ruido. Mucho ruido. Y ninguna brújula.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
           Mientras aprendía a ser Full Stack Developer, una idea insistente me golpeaba la cabeza como un martillo: si iba a construir algo, no podía ser solo para adornar un portfolio. 
           <p><span className="text-[#2D8659] text-[18px]">Tenía que servir. Tenía que ser útil. Tenía que ser para nosotros.</span> </p> 
           
           <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">Para los que convivimos con la EM, día sí y día también. <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">Para quienes aprendimos a medir la vida en brotes, resonancias, analíticas y silencios incómodos. </p></p>
           <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">Para quienes sabemos que esta guerra no siempre se nota desde fuera, pero nunca se detiene por dentro. </p>
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Así nació <strong>EM-PULSE</strong>. Porque necesitábamos un lugar donde encontrar, sin rodeos ni humo, todo aquello que siempre buscamos a trompicones. Los síntomas, explicados con claridad y sin florituras. Las noticias, en español y en inglés, para no vivir siempre un paso por detrás. Nuestros derechos, para que nadie nos los arrebate por ignorancia o desidia. Consejos y pautas realistas para intentar que la enfermedad no avance más de lo inevitable. Información sobre la medicación, sin promesas milagrosas ni cuentos de feria, solo verdad.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Y, sobre todo, lo que casi nunca aparece en los folletos: la salud mental. Lo que esto le hace a la cabeza. Al ánimo. A la identidad. A la forma en que te miras al espejo y te reconoces —o no—.
          </p>

          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            No soy médico, ni gurú, ni salvador de nadie; soy tan solo alguien que sabe lo que es convivir con esta guerra silenciosa y que ha intentado poner algo de orden en el caos. No sé si lo he logrado. Ojalá, al menos, haya conseguido una pequeña grieta por la que entre algo de luz. Si no es así, perdonadme. Pero EM-PULSE está hecho con todo mi corazón, con todas mis dudas y con toda mi rabia bien dirigida.
          </p>

           <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Va por vosotros. Va por nosotros.
          </p>


          <p className="text-base text-empulseSoft leading-relaxed text-justify indent-8">
            Y recordadlo, incluso cuando cueste creerlo: sois más fuertes de lo que pensáis.
          </p>

          <div className="text-center pt-4 border-t border-empulseAccent/20">
            <p className="text-empulseSoft">
              <a
                href="http://icdata.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2D8659] hover:text-[#1f5d3f] transition-colors"
              >
                Iván Calero
              </a>{" "}
              <span className="text-empulseSoft/70">
                (
                <a
                  href="http://icdata.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2D8659] hover:text-[#1f5d3f] transition-colors"
                >
                  icdata.onrender.com
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
