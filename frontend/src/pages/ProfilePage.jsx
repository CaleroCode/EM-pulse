import Button from '../components/ui/Button';

export default function ProfilePage({
  showProfilePage,
  setShowProfilePage,
  user,
  profileImage,
  handleProfileImageChange,
  editingProfileName,
  setEditingProfileName,
  profileName,
  setProfileName,
  handleUpdateProfileName,
  profilePreferences,
  handlePreferencesChange,
  handleLogout,
}) {
  if (!showProfilePage || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-empulseBg overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Button
          onClick={() => setShowProfilePage(false)}
          variant="secondary"
          size="md"
          className="mb-6"
        >
          ← Volver
        </Button>

        <div className="bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-8 text-center">
          {/* Imagen de perfil */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Perfil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-empulsePrimary"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-empulseAccent/20 border-4 border-empulsePrimary flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              )}
              <label className="absolute bottom-2 right-2 bg-empulsePrimary rounded-full p-2 cursor-pointer hover:bg-empulseMid transition">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
                <span className="text-slate-950">📷</span>
              </label>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="mb-6">
            {editingProfileName ? (
              <div className="flex gap-2 justify-center mb-3">
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  className="rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                />
                <Button
                  onClick={async () => {
                    if (profileName.trim()) {
                      const success = await handleUpdateProfileName(profileName);
                      if (success) {
                        setEditingProfileName(false);
                      }
                    }
                  }}
                  size="md"
                  className="text-sm"
                >
                  ✓
                </Button>
                <Button
                  onClick={() => setEditingProfileName(false)}
                  variant="secondary"
                  size="md"
                  className="text-sm"
                >
                  ✗
                </Button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 mb-2">
                <h2 className="text-2xl font-semibold">{user.name || user.email}</h2>
                <button
                  onClick={() => {
                    setEditingProfileName(true);
                    setProfileName(user.name || "");
                  }}
                  className="text-empulsePrimary hover:text-empulseMid transition text-lg"
                  title="Editar nombre"
                >
                  ✏️
                </button>
              </div>
            )}
          </div>
          <p className="text-slate-400 mb-6">{user.email}</p>

          {/* Preferencias */}
          <div className="mt-8 text-left">
            <h3 className="text-xl font-semibold mb-4">
              Preferencias de Newsletter
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Idioma preferido
                </label>
                <select
                  value={profilePreferences.language}
                  onChange={(e) =>
                    handlePreferencesChange({
                      ...profilePreferences,
                      language: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Frecuencia de newsletter
                </label>
                <select
                  value={profilePreferences.frequency}
                  onChange={(e) =>
                    handlePreferencesChange({
                      ...profilePreferences,
                      frequency: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-empulsePrimary"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Temas de interés
                </label>
                <div className="space-y-2">
                  {["Síntomas", "Noticias", "Tratamientos", "Apoyo emocional", "Recursos"].map(
                    (topic) => (
                      <label key={topic} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profilePreferences.topics.includes(topic)}
                          onChange={(e) => {
                            const newTopics = e.target.checked
                              ? [...profilePreferences.topics, topic]
                              : profilePreferences.topics.filter(
                                  (t) => t !== topic
                                );
                            handlePreferencesChange({
                              ...profilePreferences,
                              topics: newTopics,
                            });
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{topic}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-empulseAccent/40 flex gap-3">
              <Button
                onClick={() => setShowProfilePage(false)}
                size="full"
              >
                Guardar cambios
              </Button>
              <Button
                onClick={handleLogout}
                variant="secondary"
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
