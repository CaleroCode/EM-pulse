import { useState, useMemo } from "react";
import { MapPin, Phone, Mail, Globe, ChevronDown } from "lucide-react";
import Button from '../components/ui/Button';

// Base de datos de asociaciones EM en España (fuera del componente)
const ASSOCIATIONS_DATA = [
    // Andalucía
    {
      id: 1,
      name: "Asociación de Esclerosis Múltiple de Andalucía (ASEMA)",
      community: "andalucía",
      address: "Calle Larios, 2, Málaga, 29005",
      phone: "+34 952 22 51 63",
      email: "info@asemaem.org",
      website: "https://www.asemaem.org",
      googleMapsLink: "https://maps.google.com/?q=Asociación+Esclerosis+Múltiple+Andalucía+Málaga",
      description: "Asociación dedicada a mejorar la calidad de vida de personas con EM en Andalucía",
    },
    {
      id: 2,
      name: "Federación de Asociaciones de Esclerosis Múltiple de Andalucía",
      community: "andalucía",
      address: "Granada, Andalucía",
      phone: "+34 958 27 50 00",
      email: "federacion@faem.org",
      website: "https://www.faem.org",
      googleMapsLink: "https://maps.google.com/?q=Federación+EM+Andalucía+Granada",
      description: "Federación que agrupa asociaciones de EM en toda Andalucía",
    },
    // Aragón
    {
      id: 3,
      name: "Asociación de Esclerosis Múltiple de Aragón (ASEM Aragón)",
      community: "aragón",
      address: "Calle Predicadores, 7, Zaragoza, 50003",
      phone: "+34 976 39 87 43",
      email: "info@asemaraon.es",
      website: "https://www.asemaraon.es",
      googleMapsLink: "https://maps.google.com/?q=ASEM+Aragón+Zaragoza",
      description: "Asociación de EM en Aragón con servicios de apoyo integral",
    },
    // Asturias
    {
      id: 4,
      name: "Asociación de Esclerosis Múltiple de Asturias (ASEMA Asturias)",
      community: "asturias",
      address: "Avenida de Oviedo, 12, Gijón, 33203",
      phone: "+34 985 35 37 53",
      email: "info@asemaasturias.org",
      website: "https://www.asemaasturias.org",
      googleMapsLink: "https://maps.google.com/?q=ASEMA+Asturias+Gijón",
      description: "Asociación asturiana de apoyo a personas con esclerosis múltiple",
    },
    // Baleares
    {
      id: 5,
      name: "Asociación de Esclerosis Múltiple de Baleares (AEM Baleares)",
      community: "baleares",
      address: "Palma de Mallorca, 07001",
      phone: "+34 971 70 95 68",
      email: "info@aembaleares.org",
      website: "https://www.aembaleares.org",
      googleMapsLink: "https://maps.google.com/?q=AEM+Baleares+Palma",
      description: "Asociación de EM en las Islas Baleares",
    },
    // Canarias
    {
      id: 6,
      name: "Asociación Canaria de Esclerosis Múltiple (ACEM)",
      community: "canarias",
      address: "Las Palmas de Gran Canaria, 35001",
      phone: "+34 928 31 51 81",
      email: "info@acem.es",
      website: "https://www.acem.es",
      googleMapsLink: "https://maps.google.com/?q=ACEM+Las+Palmas+Canarias",
      description: "Asociación canaria dedicada al apoyo de personas con EM",
    },
    // Cantabria
    {
      id: 7,
      name: "Asociación de Esclerosis Múltiple de Cantabria",
      community: "cantabria",
      address: "Santander, Cantabria",
      phone: "+34 942 27 23 08",
      email: "info@aemcantabria.org",
      website: "https://www.aemcantabria.org",
      googleMapsLink: "https://maps.google.com/?q=AEM+Cantabria+Santander",
      description: "Asociación de Cantabria para la esclerosis múltiple",
    },
    // Castilla y León
    {
      id: 8,
      name: "Federación de Asociaciones de Esclerosis Múltiple de Castilla y León",
      community: "castilla y león",
      address: "Valladolid, Castilla y León",
      phone: "+34 983 39 26 06",
      email: "info@faemcyl.org",
      website: "https://www.faemcyl.org",
      googleMapsLink: "https://maps.google.com/?q=FAEM+Castilla+León+Valladolid",
      description: "Federación regional con asociaciones en toda Castilla y León",
    },
    // Castilla-La Mancha
    {
      id: 9,
      name: "Asociación de Esclerosis Múltiple de Castilla-La Mancha",
      community: "castilla-la mancha",
      address: "Toledo, Castilla-La Mancha",
      phone: "+34 925 25 33 21",
      email: "info@aemclm.org",
      website: "https://www.aemclm.org",
      googleMapsLink: "https://maps.google.com/?q=AEM+Castilla+La+Mancha+Toledo",
      description: "Asociación regional de esclerosis múltiple",
    },
    // Cataluña
    {
      id: 10,
      name: "Asociación de Esclerosis Múltiple de Cataluña (AEMC)",
      community: "cataluña",
      address: "Calle Còrsega, 465, Barcelona, 08025",
      phone: "+34 934 10 52 54",
      email: "info@aemc.cat",
      website: "https://www.aemc.cat",
      googleMapsLink: "https://maps.google.com/?q=AEMC+Barcelona+Cataluña",
      description: "Principal asociación de EM en Cataluña con servicios integrales",
    },
    // Comunidad Valenciana
    {
      id: 11,
      name: "Asociación de Esclerosis Múltiple de la Comunidad Valenciana (AEMC Valencia)",
      community: "comunidad valenciana",
      address: "Valencia, 46004",
      phone: "+34 963 35 34 14",
      email: "info@aemc-valencia.org",
      website: "https://www.aemc-valencia.org",
      googleMapsLink: "https://maps.google.com/?q=AEMC+Valencia",
      description: "Asociación valenciana de esclerosis múltiple",
    },
    // Extremadura
    {
      id: 12,
      name: "Asociación de Esclerosis Múltiple de Extremadura",
      community: "extremadura",
      address: "Badajoz, Extremadura",
      phone: "+34 924 25 18 97",
      email: "info@aemextremadura.org",
      website: "https://www.aemextremadura.org",
      googleMapsLink: "https://maps.google.com/?q=AEM+Extremadura+Badajoz",
      description: "Asociación extremeña de EM",
    },
    // Galicia
    {
      id: 13,
      name: "Asociación de Esclerosis Múltiple de Galicia (AEMEG)",
      community: "galicia",
      address: "Santiago de Compostela, 15705",
      phone: "+34 981 53 31 84",
      email: "info@aemeg.org",
      website: "https://www.aemeg.org",
      googleMapsLink: "https://maps.google.com/?q=AEMEG+Santiago+Compostela",
      description: "Asociación gallega con servicios de apoyo integral",
    },
    // La Rioja
    {
      id: 14,
      name: "Asociación de Esclerosis Múltiple de La Rioja",
      community: "la rioja",
      address: "Logroño, La Rioja",
      phone: "+34 941 27 39 48",
      email: "info@aemrioja.org",
      website: "https://www.aemrioja.org",
      googleMapsLink: "https://maps.google.com/?q=AEM+La+Rioja+Logroño",
      description: "Asociación riojana de EM",
    },
    // Madrid
    {
      id: 15,
      name: "Asociación de Esclerosis Múltiple de Madrid (AEM Madrid)",
      community: "madrid",
      address: "Calle Príncipe de Vergara, 156, Madrid, 28002",
      phone: "+34 915 64 63 44",
      email: "info@aemmadrid.org",
      website: "https://www.aemmadrid.org",
      googleMapsLink: "https://maps.google.com/?q=AEM+Madrid+Príncipe+Vergara",
      description: "Principal asociación de EM en la Comunidad de Madrid",
    },
    // Murcia
    {
      id: 16,
      name: "Asociación de Esclerosis Múltiple de Murcia (AEM Murcia)",
      community: "murcia",
      address: "Murcia, 30001",
      phone: "+34 968 21 61 49",
      email: "info@aemmurcia.org",
      website: "https://www.aemmurcia.org",
      googleMapsLink: "https://maps.google.com/?q=AEM+Murcia",
      description: "Asociación murciana de esclerosis múltiple",
    },
    // Navarra
    {
      id: 17,
      name: "Asociación de Esclerosis Múltiple de Navarra (AEMN)",
      community: "navarra",
      address: "Pamplona, Navarra",
      phone: "+34 948 20 87 70",
      email: "info@aemnavarra.org",
      website: "https://www.aemnavarra.org",
      googleMapsLink: "https://maps.google.com/?q=AEMN+Pamplona+Navarra",
      description: "Asociación navarra de EM",
    },
    // País Vasco
    {
      id: 18,
      name: "Asociación de Esclerosis Múltiple del País Vasco (AEMPV)",
      community: "país vasco",
      address: "Bilbao, País Vasco",
      phone: "+34 944 23 01 50",
      email: "info@aempv.org",
      website: "https://www.aempv.org",
      googleMapsLink: "https://maps.google.com/?q=AEMPV+Bilbao+País+Vasco",
      description: "Asociación vasca con servicios en Bizkaia, Gipuzkoa y Álava",
    },
];

const AssociationsSection = ({ showAssociations }) => {
  const [selectedCommunity, setSelectedCommunity] = useState("all");
  const [expandedAssociation, setExpandedAssociation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Comunidades autónomas únicas
  const communities = useMemo(() => {
    return ["all", ...new Set(ASSOCIATIONS_DATA.map((a) => a.community))].sort((a, b) => {
      if (a === "all") return -1;
      return a.localeCompare(b, "es");
    });
  }, []);

  // Filtrar asociaciones
  const filteredAssociations = useMemo(() => {
    return ASSOCIATIONS_DATA.filter((assoc) => {
      const matchCommunity = selectedCommunity === "all" || assoc.community === selectedCommunity;
      const matchSearch =
        searchTerm === "" ||
        assoc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assoc.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCommunity && matchSearch;
    });
  }, [selectedCommunity, searchTerm]);

  if (!showAssociations) return null;

  const toggleExpand = (id) => {
    setExpandedAssociation(expandedAssociation === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-empulseBg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Título */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-empulsePrimary mb-3">
            Asociaciones EM en España
          </h2>
          <p className="text-empulseSoft text-lg">
            Encuentra asociaciones de esclerosis múltiple en tu comunidad autónoma y obtén soporte local
          </p>
        </div>

        {/* Buscador de comunidad */}
        <div className="mb-8 flex flex-col gap-4">
          {/* Selector de comunidad autónoma */}
          <div className="flex flex-col gap-2">
            <label htmlFor="community-select" className="text-empulsePrimary font-semibold">
              Buscar por Comunidad Autónoma:
            </label>
            <select
              id="community-select"
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="px-4 py-3 rounded-lg bg-empulseBg/60 border border-empulseAccent/50 text-empulseSoft
                         focus:outline-none focus:ring-2 focus:ring-empulsePrimary focus:border-transparent
                         hover:bg-empulseBg/80 transition cursor-pointer"
            >
              <option value="all">Todas las Comunidades Autónomas</option>
              {communities.slice(1).map((community) => (
                <option key={community} value={community}>
                  {community.charAt(0).toUpperCase() + community.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Buscador de texto */}
          <div className="flex flex-col gap-2">
            <label htmlFor="search-input" className="text-empulsePrimary font-semibold">
              Buscar Asociación:
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="Escribe el nombre de una asociación o palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 rounded-lg bg-empulseBg/60 border border-empulseAccent/50 text-empulseSoft
                         placeholder-empulseSoft/50 focus:outline-none focus:ring-2 focus:ring-empulsePrimary
                         focus:border-transparent hover:bg-empulseBg/80 transition"
            />
          </div>
        </div>

        {/* Resultados */}
        <div className="text-empulseSoft mb-6">
          Mostrando <span className="font-bold text-empulsePrimary">{filteredAssociations.length}</span> asociación
          {filteredAssociations.length !== 1 ? "es" : ""} encontrada{filteredAssociations.length !== 1 ? "s" : ""}
        </div>

        {/* Grid de asociaciones */}
        {filteredAssociations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssociations.map((assoc) => (
              <div
                key={assoc.id}
                className="group rounded-xl bg-gradient-to-br from-empulseBg/80 to-empulseBg/40
                           border border-empulseAccent/30 hover:border-empulsePrimary/60 transition-all
                           overflow-hidden hover:shadow-lg hover:shadow-empulsePrimary/10"
              >
                {/* Encabezado de la tarjeta */}
                <div
                  onClick={() => toggleExpand(assoc.id)}
                  className="p-4 cursor-pointer hover:bg-empulsePrimary/5 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-empulsePrimary group-hover:text-empulseMid transition mb-2">
                        {assoc.name}
                      </h3>
                      <p className="text-sm text-empulseSoft line-clamp-2">{assoc.description}</p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-empulsePrimary flex-shrink-0 transition-transform ${
                        expandedAssociation === assoc.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Contenido expandible */}
                {expandedAssociation === assoc.id && (
                  <div className="border-t border-empulseAccent/20 p-4 bg-empulseBg/40 space-y-4 animate-in fade-in">
                    {/* Localización */}
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-empulsePrimary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-empulseSoft">Localización</p>
                        <p className="text-empulseSoft/80">{assoc.address}</p>
                        <a
                          href={assoc.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-empulsePrimary hover:text-empulseMid text-sm mt-1 inline-block transition"
                        >
                          📍 Ver en Google Maps →
                        </a>
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-empulsePrimary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-empulseSoft">Teléfono</p>
                        <a
                          href={`tel:${assoc.phone}`}
                          className="text-empulseSoft/80 hover:text-empulsePrimary transition"
                        >
                          {assoc.phone}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-empulsePrimary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-empulseSoft">Correo Electrónico</p>
                        <a
                          href={`mailto:${assoc.email}`}
                          className="text-empulseSoft/80 hover:text-empulsePrimary transition break-all"
                        >
                          {assoc.email}
                        </a>
                      </div>
                    </div>

                    {/* Sitio Web */}
                    <div className="flex items-start gap-3">
                      <Globe size={18} className="text-empulsePrimary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-empulseSoft">Sitio Web</p>
                        <a
                          href={assoc.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-empulsePrimary hover:text-empulseMid transition break-all text-sm"
                        >
                          {assoc.website}
                        </a>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => window.open(assoc.googleMapsLink, "_blank")}
                        variant="secondary"
                        size="sm"
                        className="flex-1 text-center justify-center"
                      >
                        Mapa
                      </Button>
                      <Button
                        onClick={() => window.open(`tel:${assoc.phone}`)}
                        variant="secondary"
                        size="sm"
                        className="flex-1 text-center justify-center"
                      >
                        Llamar
                      </Button>
                      <Button
                        onClick={() => window.open(`mailto:${assoc.email}`)}
                        variant="secondary"
                        size="sm"
                        className="flex-1 text-center justify-center"
                      >
                        Contactar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-lg border border-empulseAccent/30 bg-empulseBg/40">
            <p className="text-empulseSoft text-lg">
              No se encontraron asociaciones. Intenta con otros filtros.
            </p>
          </div>
        )}

        {/* Botón subir */}
        <div className="mt-10 text-center">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            variant="secondary"
            size="sm"
            title="Volver al inicio"
          >
            <span className="text-lg">↑</span>
          </Button>
        </div>

        {/* Nota informativa */}
        <div className="mt-12 p-6 rounded-lg bg-empulsePrimary/10 border border-empulsePrimary/30">
          <p className="text-empulseSoft text-sm">
            <span className="font-semibold text-empulsePrimary">ℹ️ Información importante:</span> Esta lista incluye las
            principales asociaciones de Esclerosis Múltiple en España. Si conoces otras asociaciones o deseas reportar
            cambios en la información de contacto, por favor contacta con nosotros.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AssociationsSection;
