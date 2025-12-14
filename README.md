# 🏥 EM-PULSE - Plataforma de Apoyo para Esclerosis Múltiple

Plataforma comunitaria y educativa para personas con Esclerosis Múltiple, con recursos, chat de apoyo emocional con IA, seguimiento de síntomas y comunicación con especialistas.

## ✨ Características Principales

### 🎯 Módulos Core

- **📰 Noticias** - Noticias relevantes sobre EM filtradas por algoritmo
- **💬 Chat EM-PULSE** - Apoyo emocional con IA (Hugging Face)
- **🏥 Síntomas** - Base de datos de síntomas comunes de EM
- **📚 Recursos Educativos** - Información sobre tipos, diagnóstico, ejercicio, salud mental
- **🤝 Comunidad** - Asociaciones y recursos de apoyo
- **📧 Newsletter** - Suscripción personalizada

### 🔒 Certificaciones y Seguridad (✨ NUEVO)

- **Política de Privacidad completa** - 10 secciones GDPR-compliant
- **Términos de Servicio profesionales** - Con descargo médico prominente
- **Aviso GDPR flotante** - Consentimiento para cookies/datos
- **Footer profesional** - Contacto, legal, recursos
- **Badges de certificación** - Indicadores de seguridad y privacidad
- **Chat "Privado"** - Indicador de privacidad en conversaciones

## 🚀 Quick Start

### Requisitos
- Python 3.8+
- Node.js 14+
- npm o yarn

### Instalación

```bash
# Clone el repositorio
git clone <repository-url>
cd em-pulse

# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

### Acceso
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Admin Django: http://localhost:8000/admin

## 📁 Estructura del Proyecto

```
em-pulse/
├── backend/                    # Django REST API
│   ├── empulse_backend/       # Configuración principal
│   ├── communications/        # Chat y noticias
│   ├── health/                # Síntomas y salud
│   ├── subscribers/           # Newsletter
│   ├── activity/              # Actividad de usuario
│   ├── compliance/            # Cumplimiento legal
│   ├── db.sqlite3            # Base de datos
│   └── manage.py
│
└── frontend/                   # React + Vite
    ├── src/
    │   ├── pages/            # Páginas principales
    │   │   ├── PrivacyPolicy.jsx          (NUEVO)
    │   │   ├── TermsOfService.jsx         (NUEVO)
    │   │   ├── GDPRNotice.jsx             (NUEVO)
    │   │   ├── ChatEmPulse.jsx            (MEJORADO)
    │   │   └── ...otros
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Footer.jsx             (MEJORADO)
    │   │   ├── ui/
    │   │   │   ├── CertificationBadge.jsx (NUEVO)
    │   │   │   └── ...otros
    │   │   └── ...otros
    │   ├── App.jsx                         (MODIFICADO)
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🔐 Cumplimiento Legal (✨ NUEVO)

### GDPR
- ✅ Política de privacidad con 6 derechos GDPR explicados
- ✅ Consentimiento explícito para cookies/datos
- ✅ Contacto de privacidad: CaleroCode@gmail.com
- ✅ Información de seguridad clara

### España
- ✅ Cumplimiento LSSI-CE
- ✅ Ley aplicable especificada
- ✅ Contacto legal: CaleroCode@gmail.com

### Médico/Salud
- ✅ **Descargo de responsabilidad médica prominente**
- ✅ "EM-PULSE no sustituye consejo médico profesional"
- ✅ En caja destacada en Términos de Servicio

## 🎯 Características Implementadas

### Punto 1: Certificaciones y Cumplimiento Legal ✅
- [x] Política de Privacidad completa (10 secciones)
- [x] Términos de Servicio (11 secciones + descargo médico)
- [x] Aviso GDPR flotante con consentimiento
- [x] Footer profesional 4 columnas
- [x] Badges de certificación reutilizables
- [x] Chat indicado como "Privado"
- [x] Documentación completa

### Punto 2: Symptom Tracker (Próximo)
- [ ] Dashboard de síntomas
- [ ] Historial personal
- [ ] Seguimiento de tendencias
- [ ] Exportar datos

### Punto 3: Verificación de Contenido (Próximo)
- [ ] Badges de contenido verificado
- [ ] Fechas de actualización
- [ ] Fuentes citadas

## 🛠️ Tecnologías

### Backend
- Django 4.2+
- Django REST Framework
- SQLite (desarrollo)
- NewsAPI (noticias externas)

### Frontend
- React 18+
- Vite 5+
- Tailwind CSS
- Lucide Icons
- Hugging Face API (chat)

## 📊 API Endpoints

```
GET  /api/health/symptoms/           # Lista de síntomas
GET  /api/communications/news/       # Noticias filtradas
POST /api/communications/chat-em-pulse/  # Chat con IA
POST /api/subscribers/newsletter/    # Suscribirse a newsletter
GET  /api/communications/chat-health/    # Health check
```

## 🎨 Diseño

- **Tema**: Dark theme con acentos cyan (empulsePrimary)
- **Responsivo**: Mobile-first, desktop-optimized
- **Accesibilidad**: WCAG 2.1 AA
- **Colores**:
  - Primario: `#15BCE6` (Cyan EM-PULSE)
  - Fondo: `#021922` (Azul oscuro)
  - Texto: `#E2E8F0` (Gris claro)

## 🔄 Flujo de Usuario

```
1. Landing → IndexPage
2. "Entrar" → HomePage
3. Navbar → Elegir sección
4. Explorar contenido
5. Newsletter (opcional)
6. Chat (IA conversacional)
7. Footer → Legal/Contacto
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚢 Deployment

### Render (Recomendado)
1. Push a GitHub
2. Crear Web Service en Render
3. Set environment variables
4. Deploy

## 🔧 Configuración

### Backend (.env)
```
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
NEWSAPI_KEY=your-newsapi-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
VITE_HF_TOKEN=your-huggingface-token
```

## 🐛 Troubleshooting

### Chat no funciona
- Verificar que backend está corriendo
- Verificar OLLAMA o Hugging Face API

### Noticias no cargan
- Verificar NEWSAPI_KEY
- Verificar conexión a internet

### GDPR notice no aparece
- Limpiar localStorage: `localStorage.removeItem('gdpr_accepted')`
- Recargar página


## ‍💼 Créditos

Desarrollado por: Iván Calero (ICDATA)
Base de datos: NewsAPI
IA Chat: Hugging Face

## 📄 Licencia

Proyecto final personal del bootcamp Full Stack Developer SuperKode de Factoria F5. Código abierto para fines educativos y de demostración.

## 🎉 Status

```
✅ Punto 1: Certificaciones y Cumplimiento Legal - COMPLETADO
⏳ Punto 2: Symptom Tracker - PENDIENTE
⏳ Punto 3: Verificación de Contenido - PENDIENTE
```

---

**Última actualización**: December 9, 2025
**Versión**: 1.0 + Mejoras de Profesionalidad
**Estado**: ✅ PRODUCCIÓN READY
