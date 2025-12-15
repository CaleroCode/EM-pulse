# 🏥 EM-PULSE - Plataforma de Apoyo para Esclerosis Múltiple

Plataforma comunitaria y educativa para personas con Esclerosis Múltiple, con recursos, chat de apoyo emocional con IA, seguimiento de síntomas, foro comunitario y accesibilidad WCAG 2.1 AA.

## ✨ Características Principales

### 🎯 Módulos Core

- **📰 Noticias** - Noticias relevantes sobre EM filtradas por algoritmo (NewsAPI)
- **💬 Chat EM-PULSE** - Apoyo emocional con IA conversacional (Hugging Face)
- **🏥 Síntomas** - Base de datos de síntomas comunes de EM con detalles
- **📚 Recursos Educativos** - 6 secciones completas:
  - **¿Qué es la EM?** - Explicación profesional de la enfermedad
  - **Tipos y Diagnóstico** - Tipos de EM, proceso diagnóstico y pruebas
  - **EM-FORMA** - Guías de movimiento y ejercicio adaptado
  - **Salud Mental** - Manejo del estrés, depresión y burnout
  - **Tus Derechos** - Discapacidad, incapacidad permanente, protección laboral
  - **Guías y Recursos** - Recursos médicos, comunidades online, psicológicos
- **🤝 Comunidad** - Asociaciones, ICDATA y contactos de apoyo
- **💬 Foro Comunitario** - Espacio para compartir experiencias y apoyo mutuo
- **📧 Newsletter** - Suscripción personalizada con noticias semanales
- **👤 Perfil de Usuario** - Gestión de cuenta personalizada

### ♿ Accesibilidad (WCAG 2.1 AA) 

- **Modo Oscuro/Claro** - Toggle para preferencias de visualización
- **Tamaño de Fuente Ajustable** - 80% a 160% de tamaño normal
- **Indicadores de Enfoque Mejorados** - Contornos amarillos para navegación por teclado
- **Movimiento Reducido** - Desactiva animaciones para usuarios sensibles
- **Soporte Lector de Pantalla** - Clases `sr-only` y atributos `aria-label`
- **Persistencia en localStorage** - Tus preferencias se guardan automáticamente
- **Botón Accesibilidad** - ♿ en navbar para acceso rápido a todas las opciones

### 🔒 Certificaciones y Seguridad

- **Política de Privacidad** - 10 secciones GDPR-compliant
- **Términos de Servicio** - Con descargo médico prominente
- **Aviso GDPR** - Consentimiento explícito para cookies/datos
- **Footer Profesional** - Contacto, legal, recursos y certificaciones
- **Cumplimiento LSSI-CE** - Legislación española
- **Badges de Certificación** - Indicadores visuales de seguridad

## 🚀 Instalación y Setup

### Requisitos Previos
- Python 3.8+ 
- Node.js 14+ y npm/yarn
- Git
- Variables de entorno configuradas

### Instalación Paso a Paso

#### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd em-pulse
```

#### 2. Configurar Backend

```bash
cd backend

# Crear variables de entorno
# Crear archivo .env en backend/ con:
# DEBUG=False
# SECRET_KEY=tu-secret-key-aqui
# ALLOWED_HOSTS=localhost,127.0.0.1,tu-dominio.com
# NEWSAPI_KEY=tu-key-aqui

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
# Estará disponible en: http://localhost:8000
```

#### 3. Configurar Frontend

```bash
cd ../frontend

# Crear variables de entorno
# Crear archivo .env en frontend/ con:
# VITE_API_URL=http://localhost:8000
# VITE_HF_TOKEN=tu-huggingface-token

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
# Estará disponible en: http://localhost:5173
```

#### 4. Verificar Instalación

```bash
# Frontend está listo cuando veas:
# ➜  Local:   http://localhost:5173/

# Backend está listo cuando veas:
# Starting development server at http://127.0.0.1:8000/
# Quit the server with CONTROL-C
```

### Acceso Posterior

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin (con superusuario)
- **API Docs**: http://localhost:8000/api/docs (si DRF schemas está instalado)

## 📁 Estructura del Proyecto

```
em-pulse/
├── backend/                    # Django REST API
│   ├── empulse_backend/       # Configuración principal + Sitemaps
│   ├── communications/        # Chat IA, noticias, endpoints
│   ├── health/                # Síntomas y datos de salud
│   ├── subscribers/           # Newsletter y suscriptores
│   ├── activity/              # Seguimiento de actividad de usuarios
│   ├── compliance/            # GDPR, privacidad, legal
│   ├── forum/                 # Foro comunitario
│   ├── db.sqlite3            # Base de datos SQLite
│   ├── manage.py             # Manage script
│   └── requirements.txt       # Dependencias Python
│
└── frontend/                   # React + Vite + Tailwind
    ├── src/
    │   ├── pages/            # Páginas principales (16+)
    │   │   ├── AccessibilityPage.jsx        (♿ ACCESIBILIDAD)
    │   │   ├── PrivacyPolicy.jsx            (GDPR)
    │   │   ├── TermsOfService.jsx           (Legal)
    │   │   ├── GDPRNotice.jsx               (Consentimiento)
    │   │   ├── ChatEmPulse.jsx              (Chat IA)
    │   │   ├── Forum.jsx                    (Foro comunitario)
    │   │   ├── WhatIsEM.jsx                 (¿Qué es EM?)
    │   │   ├── TypesAndDiagnosis.jsx        (Tipos y diagnóstico)
    │   │   ├── SymptomsDetail.jsx           (Síntomas)
    │   │   ├── EMForma.jsx                  (Ejercicio)
    │   │   ├── MentalHealth.jsx             (Salud mental)
    │   │   ├── TusDerechos.jsx              (Derechos laborales)
    │   │   ├── GuiasYRecursos.jsx           (Guías y recursos)
    │   │   ├── AssociationsSection.jsx      (Asociaciones)
    │   │   ├── ProfilePage.jsx              (Perfil usuario)
    │   │   └── AllNewsSection.jsx           (Noticias)
    │   │
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx               (Navegación principal)
    │   │   │   ├── Footer.jsx               (Footer legal)
    │   │   │   └── Hero.jsx                 (Sección hero)
    │   │   │
    │   │   ├── ui/
    │   │   │   ├── Badge.jsx                (Badges componentes)
    │   │   │   ├── Modal.jsx                (Modal reusable)
    │   │   │   ├── CertificationBadge.jsx   (Badges certificación)
    │   │   │   └── ...otros componentes UI
    │   │   │
    │   │   └── ...otros componentes
    │   │
    │   ├── services/
    │   │   ├── apiService.js        (Cliente API centralizado)
    │   │   ├── newsService.js       (NewsAPI integration)
    │   │   ├── chatService.js       (Hugging Face IA)
    │   │   └── forumAPI.js          (Forum endpoints)
    │   │
    │   ├── utils/
    │   │   └── ...utilidades y helpers
    │   │
    │   ├── App.jsx                  (Componente raíz + estado global)
    │   ├── App.css                  (Estilos globales)
    │   ├── index.css                (Tailwind imports)
    │   └── main.jsx                 (Punto de entrada)
    │
    ├── public/
    │   ├── robots.txt              (SEO)
    │   └── sitemap.xml             (SEO)
    │
    ├── package.json                 # Dependencias Node
    ├── tailwind.config.js           # Configuración Tailwind
    ├── vite.config.js              # Configuración Vite
    ├── eslint.config.js            # Configuración ESLint
    └── postcss.config.js           # Configuración PostCSS
```

## 🔐 Cumplimiento Legal y Normativo

### GDPR (Europeo)
- ✅ Política de privacidad con 6 derechos GDPR explicados
- ✅ Consentimiento explícito para cookies/datos
- ✅ Información de seguridad y procesamiento de datos clara
- ✅ Contacto de privacidad: CaleroCode@gmail.com
- ✅ Opción de descargar/eliminar datos (derecho al olvido)

### LSSI-CE (España)
- ✅ Cumplimiento total de legislación española
- ✅ Ley aplicable especificada (Ley 34/1988)
- ✅ Contacto legal y responsable del sitio
- ✅ Información clara de identificación

### Médico/Sanitario
- ✅ **Descargo de responsabilidad prominente**: "EM-PULSE no sustituye consejo médico profesional"
- ✅ Indicación clara en Términos de Servicio
- ✅ Aviso en chat IA
- ✅ Referencias a profesionales médicos reales

### Accesibilidad
- ✅ **WCAG 2.1 Nivel AA** - Cumplimiento de estándares web
- ✅ Modo oscuro/claro
- ✅ Tamaño de fuente ajustable
- ✅ Contraste suficiente en todos los elementos
- ✅ Navegación por teclado completa
- ✅ Etiquetas ARIA y atributos semánticos
- ✅ Soporte para lectores de pantalla

## 🎯 Características Implementadas ✅

### 1. Infraestructura Base
- [x] Configuración Django + React/Vite
- [x] Autenticación por Token (DRF)
- [x] CORS configurado correctamente
- [x] SQLite + PostgreSQL ready
- [x] Sitemaps XML para SEO
- [x] Admin Django funcional

### 2. Módulos de Contenido
- [x] Síntomas con base de datos (50+ síntomas)
- [x] Noticias integradas (NewsAPI)
- [x] Chat IA (Hugging Face)
- [x] Newsletter con suscriptores
- [x] 6 Módulos educativos completos
- [x] Foro comunitario con comentarios y likes

### 3. Seguridad y Cumplimiento Legal
- [x] Política de Privacidad (GDPR compliant)
- [x] Términos de Servicio con descargo médico
- [x] Aviso GDPR con consentimiento
- [x] Cumplimiento LSSI-CE
- [x] Footer profesional con certificaciones
- [x] Badges de seguridad y privacidad

### 4. Accesibilidad (♿ WCAG 2.1 AA)
- [x] Modo Oscuro/Claro personalizable
- [x] Tamaño de fuente ajustable (80%-160%)
- [x] Indicadores de enfoque mejorados
- [x] Movimiento reducido/animaciones deshabilitables
- [x] Soporte lector de pantalla (aria-labels, sr-only)
- [x] Persistencia en localStorage
- [x] Botón de accesibilidad (♿) en navbar

### 5. Optimización de Rendimiento
- [x] Lazy loading de imágenes
- [x] Caché de datos (Backend LocMemCache)
- [x] Índices de base de datos
- [x] Serializers optimizados
- [x] Minificación CSS/JS (Vite)
- [x] Code splitting automático

### 6. UX/UI
- [x] Diseño responsivo (Mobile-first)
- [x] Dark theme profesional
- [x] Iconografía moderna (Lucide)
- [x] Transiciones suaves
- [x] Formularios validados
- [x] Modales y overlays

### 7. SEO
- [x] Sitemaps XML generados
- [x] Meta tags descriptivos
- [x] Estructura semántica HTML5
- [x] robots.txt configurado
- [x] Open Graph tags

## 🛠️ Stack Tecnológico Completo

### 🖥️ Backend
- **Django 5.2+** - Framework web Python
- **Django REST Framework 3.16+** - API RESTful
- **Django CORS Headers** - Manejo de CORS
- **Token Authentication (DRF)** - Autenticación segura
- **python-dotenv** - Variables de entorno
- **NewsAPI** - Integración de noticias externas
- **SQLite** - Base de datos (desarrollo)
- **PostgreSQL** - Base de datos (producción - psycopg2)
- **Gunicorn** - Servidor WSGI

### 🎨 Frontend
- **React 19.2.0** - Framework UI moderno
- **Vite 7.2.4** - Build tool y dev server ultrarrápido
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Lucide React Icons** - Iconografía moderna
- **PostCSS + Autoprefixer** - Procesamiento de CSS
- **ESLint 9+** - Code quality y linting

### 🤖 APIs Externas Integradas
- **Hugging Face API** - Chat IA conversacional
- **NewsAPI** - Noticias actuales sobre EM
- **Render** - Hosting y deployment

### 🗄️ Módulos Django Implementados

| Módulo | Descripción | Endpoints Principales |
|--------|-------------|----------------------|
| **health** | Gestión de síntomas y salud | `GET /api/health/symptoms/` |
| **communications** | Noticias y chat IA | `GET /api/communications/news/`, `POST /api/communications/chat-em-pulse/` |
| **subscribers** | Newsletter y suscriptores | `POST /api/subscribers/newsletter/` |
| **forum** | Foro comunitario | `GET /api/forum/posts/`, `POST /api/forum/posts/` |
| **activity** | Seguimiento de actividad | `GET /api/activity/` |
| **compliance** | Cumplimiento legal y GDPR | Páginas estáticas |
| **empulse_backend** | Configuración principal y Sitemaps | Sitemaps XML, CORS, Admin |

## 🌐 API Endpoints Principales

### Health (Síntomas)
```
GET  /api/health/symptoms/          # Lista completa de síntomas
GET  /api/health/symptoms/{id}/     # Detalle de síntoma específico
```

### Communications (Noticias & Chat)
```
GET  /api/communications/news/              # Noticias filtradas
GET  /api/communications/news/?search=...   # Búsqueda de noticias
POST /api/communications/chat-em-pulse/     # Chat IA conversacional
GET  /api/communications/chat-health/       # Health check del servidor
```

### Subscribers (Newsletter)
```
POST /api/subscribers/newsletter/     # Suscribirse a newsletter
GET  /api/subscribers/newsletter/     # Listar suscriptores
```

### Forum (Comunidad)
```
GET  /api/forum/posts/                # Listar posts del foro
POST /api/forum/posts/                # Crear nuevo post
GET  /api/forum/posts/{id}/           # Detalle de post
POST /api/forum/posts/{id}/comments/  # Agregar comentario
POST /api/forum/likes/                # Dar like a post
```

### Activity (Actividad)
```
GET  /api/activity/                   # Historial de actividad
```

### Auth (Autenticación)
```
POST /api/auth/register/              # Registrar usuario
POST /api/auth/login/                 # Login
POST /api/auth/logout/                # Logout
GET  /api/auth/me/                    # Datos del usuario actual
POST /api/auth/refresh/               # Refrescar token
```

## 🎨 Diseño y Paleta de Colores

### Tema Visual
- **Modo Principal**: Dark theme con acentos cyan
- **Filosofía**: Profesional, accesible, moderno
- **Responsividad**: Mobile-first, desktop-optimized
- **Tipografía**: Sistema nativo de cada SO (mejor rendimiento)

### Colores
```
Primario (EM-PULSE):    #15BCE6 (Cyan brillante)
Secundario:              #0d7fa8 (Azul más oscuro)
Fondo:                   #021922 (Azul muy oscuro)
Fondo Secundario:        #0F2E3D (Azul oscuro)
Texto Principal:         #E2E8F0 (Gris claro)
Texto Secundario:        #94A3B8 (Gris medio)
Bordes:                  #334155 (Gris borde)
Success:                 #4ADE80 (Verde)
Warning:                 #FCD34D (Amarillo)
Error:                   #F87171 (Rojo)
```

### Breakpoints Responsive
```
Mobile:      < 768px      (Teléfonos)
Tablet:      768px-1024px (Tablets)
Desktop:     > 1024px     (Escritorio)
```

### CSS Global
- Scrollbar personalizado con colores EM-PULSE
- Clases accesibilidad:
  - `.dark-mode-em` - Modo oscuro invertido
  - `.enhanced-focus-em` - Contornos amarillos en focus
  - `.reduce-motion-em` - Animaciones deshabilitadas
  - `.sr-only` - Texto solo para lectores de pantalla

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

## 🚢 Deployment en Render

### Pasos para Desplegar

1. **Push a GitHub**
   ```bash
   git add -A
   git commit -m "Deploy a Render"
   git push origin main
   ```

2. **Crear Web Service en Render**
   - Ve a https://render.com/
   - Conecta tu repositorio GitHub
   - Selecciona `em-pulse`
   - **Runtime**: Python 3.11+
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn empulse_backend.wsgi:application --bind 0.0.0.0:$PORT`

3. **Configurar Variables de Entorno**
   - `DEBUG=False`
   - `SECRET_KEY=tu-secret-key-aleatorio`
   - `ALLOWED_HOSTS=tu-app.render.com`
   - `NEWSAPI_KEY=tu-key`
   - `DATABASE_URL=postgres://...` (si usas PostgreSQL)

4. **Para Frontend en Render (separado)**
   - Crear otro Web Service para frontend
   - **Runtime**: Node.js
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`
   - **Root Directory**: `frontend`

### Alternativas de Hosting
- **Vercel**: Excelente para frontend React
- **Railway**: Similar a Render, buena para full stack
- **Heroku**: Clásico, requiere Credit Card (Eco Dynos pagos)
- **AWS/Google Cloud**: Para aplicaciones grandes

### Consideraciones
- Usar PostgreSQL en producción (más robusto que SQLite)
- Configurar HTTPS automático
- Setup de email para newsletter (SendGrid, Mailgun)
- Backups automáticos de base de datos
- Monitoreo y logs

## 🔧 Configuración de Variables de Entorno

### Backend (.env)
```
# Django
DEBUG=False                              # False en producción
SECRET_KEY=tu-secret-key-super-seguro   # Cambiar en producción
ALLOWED_HOSTS=localhost,127.0.0.1,tu-dominio.com

# APIs Externas
NEWSAPI_KEY=tu-apikey-de-newsapi        # De newsapi.org
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxx    # Opcional si usas HF backend

# Base de datos (opcional, usa SQLite por defecto)
# DATABASE_URL=postgresql://user:password@localhost:5432/empulse

# Email (para newsletter, opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=tu-email@gmail.com
EMAIL_HOST_PASSWORD=tu-app-password
```

### Frontend (.env)
```
# API Backend
VITE_API_URL=http://localhost:8000              # En desarrollo
# VITE_API_URL=https://tu-dominio.com/api      # En producción

# Hugging Face (para chat IA)
VITE_HF_TOKEN=hf_xxxxxxxxxxxx                   # De huggingface.co
```

### Variables Importantes
- `SECRET_KEY`: Generar con `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
- `NEWSAPI_KEY`: Obtener en https://newsapi.org/
- `VITE_HF_TOKEN`: Obtener en https://huggingface.co/settings/tokens
- En producción: siempre `DEBUG=False`

## 🐛 Troubleshooting

### Frontend
| Problema | Solución |
|----------|----------|
| **"Vite cannot find module"** | Ejecutar `npm install` nuevamente |
| **Servidor no inicia** | Verificar puerto 5173 no esté en uso: `npm run dev -- --port 3000` |
| **CORS errors** | Verificar que backend esté corriendo en puerto 8000 |
| **Accesibilidad no guarda** | Limpiar localStorage: `localStorage.clear()` y recargar |
| **Imágenes no cargan** | Verificar rutas en `public/` y imports en src |

### Backend
| Problema | Solución |
|----------|----------|
| **ModuleNotFoundError** | Ejecutar `pip install -r requirements.txt` |
| **Database errors** | Ejecutar `python manage.py migrate` |
| **Port 8000 already in use** | `python manage.py runserver 8001` |
| **NewsAPI no funciona** | Verificar `NEWSAPI_KEY` en .env y límite de requests |
| **Static files 404** | Ejecutar `python manage.py collectstatic` |

### General
| Problema | Solución |
|----------|----------|
| **Chat IA no responde** | Verificar `VITE_HF_TOKEN` en .env y límites de API |
| **Newsletter no envía emails** | Configurar EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD |
| **Admin Django no abre** | Crear superusuario: `python manage.py createsuperuser` |
| **Página en blanco** | Abrir DevTools (F12), revisar Console por errores |

### Accesibilidad Específica
- **Modo oscuro no se aplica**: Limpiar localStorage → `localStorage.removeItem('em-pulse-dark-mode')`
- **Fuente no cambia**: Verificar `em-pulse-font-size` en DevTools → Application → Storage
- **Lector de pantalla no funciona**: Verificar navegador compatible (Chrome, Firefox, Safari)
- **Indicadores de enfoque no visibles**: Presionar TAB para navegar, deben verse bordes amarillos

### Líneas de Ayuda
```bash
# Revisar logs del backend
tail -f /tmp/django.log

# Revisar red en DevTools
# F12 → Network tab → filtrar por errores (rojo)

# Testear endpoints API
curl http://localhost:8000/api/health/symptoms/

# Verificar variables de entorno
python manage.py shell
>>> import os; print(os.getenv('NEWSAPI_KEY'))
```


## 👨‍💻 Créditos y Equipo

### Desarrollo
- **Desarrollador Principal**: Iván Calero
- **Empresa/Proyecto**: SuperKode Bootcamp - Factoría F5
- **Contacto**: CaleroCode@gmail.com

### Tecnologías Reconocidas
- **Frontend**: React, Vite, Tailwind CSS, Lucide React
- **Backend**: Django, Django REST Framework
- **IA & APIs**: Hugging Face (Chat), NewsAPI (Noticias)
- **Hosting**: Render
- **Diseño**: Open source icons y inspiración en diseño moderno

### Recursos
- Documentación: Django, React, Tailwind CSS
- Community: Stack Overflow, GitHub Issues
- Testing: Manual y automated testing en desarrollo

## 📄 Licencia

Proyecto final personal del bootcamp Full Stack Developer SuperKode de Factoria F5. Código abierto para fines educativos y de demostración.

## 📊 Estadísticas del Proyecto

### Líneas de Código
- **Backend Python**: ~3,000+ líneas
- **Frontend React/JSX**: ~5,000+ líneas
- **CSS/Tailwind**: ~500+ líneas
- **Total**: ~8,500+ líneas de código

### Componentes
- **Páginas React**: 16+
- **Componentes Reutilizables**: 20+
- **Modelos Django**: 12+
- **APIs Endpoints**: 25+

### Contenido
- **Síntomas en BD**: 50+
- **Artículos educativos**: 6 módulos completos
- **Secciones de derechos**: 5 subsecciones
- **Guías y recursos**: 50+ referencias

### Características de Accesibilidad
- **Opciones principales**: 5
- **Clases CSS accesibilidad**: 4
- **Atributos ARIA**: 15+
- **Validación a nivel AA**: ✅ Pasadas
## 🔄 Desarrollo y Mejoras Futuras

### Potenciales Mejoras
- [ ] **Dashboard Personal**: Historial y seguimiento personal de síntomas
- [ ] **Integración de Mapas**: Encontrar médicos especialistas cercanos
- [ ] **Notificaciones Push**: Alertas de noticias importantes
- [ ] **Exportación de Datos**: PDF con historial personal
- [ ] **Búsqueda Avanzada**: Filtros en síntomas y noticias
- [ ] **Certificación Médica**: Badges de contenido verificado por expertos
- [ ] **Multidioma**: Soporte para English, Français, Deutsch
- [ ] **Mobile App**: React Native / Flutter
- [ ] **Analytics**: Dashboard de uso y métricas
- [ ] **Gamificación**: Badges y logros para usuarios

### Optimizaciones Técnicas
- [x] Caché de datos (Backend)
- [x] Índices de BD (Frontend lazy loading)
- [x] Serializers optimizados
- [ ] Service Workers (PWA)
- [ ] CDN para assets estáticos
- [ ] Redis para sesiones
- [ ] Elasticsearch para búsqueda avanzada

### Seguridad Adicional
- [ ] Rate limiting en APIs
- [ ] Validación de inputs mejorada
- [ ] 2FA (Two-Factor Authentication)
- [ ] Encriptación de datos sensibles
- [ ] Security headers HTTP
---
