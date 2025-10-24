# 🌿 EM-PULSE v2 — Development Log

## 🧩 Contexto del proyecto

**EM-PULSE** es una aplicación creada para concienciar sobre la esclerosis múltiple, mostrando de forma empática cómo se sienten las personas que la padecen y cómo se les puede ayudar.  
La app cuenta con secciones de síntomas, noticias y una newsletter informativa.

El proyecto original (v1) fue una primera versión experimental.  
Ahora estamos construyendo una **versión 2.0 completamente nueva**, con una arquitectura moderna y un backend real conectado a base de datos.

---

## 🗂️ Estructura del repositorio

```text
v2-development/
├─ v1-legacy/              ← Versión antigua (guardada como referencia)
│   ├─ frontend/
│   └─ backend/
│
├─ em-pulse-v2/            ← Nueva versión 2.0 en desarrollo
│   ├─ backend/            ← API Node.js + Express + PostgreSQL
│   └─ (frontend próximamente)
│
└─ README.md
```

---

## 🌳 Control de versiones (Git / GitHub)

Para mantener el historial limpio y poder comparar fácilmente la evolución:

1. Se ha conservado la versión anterior dentro de la carpeta `v1-legacy/`.
2. En GitHub, se debe crear una nueva rama para el desarrollo actual:

```bash
git checkout -b v2-development
```

3. Todo el trabajo de la nueva versión (`em-pulse-v2/`) se desarrollará en esta rama.

---

## 🧱 Base de datos

### 🔹 Motor utilizado
**PostgreSQL** (administrado con **DBeaver**)

### 🔹 Configuración local

| Elemento  | Valor |
|------------|-------|
| Base de datos | `empulse_db` |
| Usuario | `postgre` |
| Host | `localhost` |
| Puerto | `5432` |

### 🔹 Tablas creadas

#### 1. `Symptom`
Guarda los síntomas y descripciones empáticas.

```sql
CREATE TABLE "Symptom" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description_patient TEXT NOT NULL,
    description_support TEXT NOT NULL
);
```

#### 2. `News`
Para futuras noticias relacionadas con la enfermedad.

```sql
CREATE TABLE "News" (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    summary TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL
);
```

#### 3. `NewsletterSubscriber`
Lista de suscriptores a la newsletter.

```sql
CREATE TABLE "NewsletterSubscriber" (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

#### Ejemplo de datos en `Symptom`

```sql
INSERT INTO "Symptom" (name, description_patient, description_support)
VALUES
('Fatiga extrema',
 'Siento que el cuerpo pesa el triple. No es cansancio normal, es como arrastrar cemento.',
 'Ayúdame a descansar sin hacerme sentir culpable. Puedes ofrecerte a hacer las tareas físicas. Evita frases tipo "venga que tú puedes".'),

('Visión borrosa / doble',
 'Mi vista se desenfoca, como mirar bajo el agua. A veces veo doble.',
 'No me hagas leer letras pequeñas ni conducir. Baja luces, dame tiempo, acompáñame si tengo que moverme.');
```

---

## ⚙️ Backend v2

### 🔸 Tecnologías utilizadas
- **Node.js**
- **Express**
- **CORS**
- **Dotenv**
- **pg** (cliente oficial de PostgreSQL)
- **Nodemon** para desarrollo

### 🔸 Estructura del backend

```text
em-pulse-v2/backend/
├─ src/
│  ├─ server.js
│  ├─ db/
│  │   └─ pool.js
│  ├─ routes/
│  │   ├─ health.routes.js
│  │   └─ symptoms.routes.js
│  └─ controllers/
│      ├─ health.controller.js
│      └─ symptoms.controller.js
├─ .gitignore
└─ package.json
```

### 🔸 Scripts útiles

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con reinicio automático)
npm run dev

# Producción
npm start
```

### 🔸 Rutas disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Verifica que el backend está funcionando |
| `GET` | `/api/symptoms` | Devuelve la lista de síntomas desde la base de datos |

#### Ejemplo de respuesta de `/api/symptoms`

```json
[
  {
    "id": 1,
    "name": "Fatiga extrema",
    "description_patient": "Siento que el cuerpo pesa el triple...",
    "description_support": "Ayúdame a descansar sin hacerme sentir culpable..."
  },
  {
    "id": 2,
    "name": "Visión borrosa / doble",
    "description_patient": "Mi vista se desenfoca, como mirar bajo el agua...",
    "description_support": "No me hagas leer letras pequeñas ni conducir..."
  }
]
```

---

## 🧾 .gitignore

El backend incluye un archivo `.gitignore` con lo siguiente:

```gitignore
node_modules/
.env
.env.local
.env.development
.env.production
dist/
.DS_Store
Thumbs.db
.vscode/
.idea/
```

De esta forma, las credenciales de la base de datos y las dependencias locales **no se suben a GitHub**.

---

## 🚀 Próximos pasos

1. Crear el **frontend v2** con React + Vite.
2. Conectar el frontend a las rutas del backend.
3. Diseñar la interfaz con TailwindCSS (Navbar, Footer, secciones de Inicio, Síntomas, Noticias y Newsletter).
4. Añadir más endpoints en el backend (`/api/news`, `/api/newsletter`).
5. Contenerizar el proyecto con Docker Compose (PostgreSQL + Backend).

---

**Autor:** Iván Calero  
**Estado del proyecto:** 🛠️ En desarrollo (fase inicial — backend y base de datos completados)







# VERSION 1.0.
⭕ ENGLISH VERSION BELOW!!


# 🧠 EM-PULSE: Plataforma informativa sobre Esclerosis Múltiple

Bienvenid@s a **EM-PULSE**, una aplicación web diseñada para informar, educar y conectar a personas interesadas en la Esclerosis Múltiple. Este proyecto nace con la idea de ofrecer apoyo e información, tanto a los enfermos como a las personas que conviven con ellos, ofreciendo contenido accesible sobre síntomas, tratamientos, noticias actualizadas y un formulario de contacto para resolver dudas.

---

## 📌 Características principales

- ✅ Navegación dinámica por secciones.
- 📰 Integración con NewsAPI para mostrar noticias recientes y en tiempo real sobre Esclerosis Múltiple.
- 📬 Formulario de contacto con validación en tiempo real.
- 📱 Menú hamburguesa para navegación móvil.
- 🎨 Estilo moderno y accesible con CSS personalizado.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5      | Estructura del contenido |
| CSS3       | Estilos y diseño responsive |
| JavaScript | Navegación dinámica, validación y consumo de API |
| NewsAPI    | Fuente de noticias médicas en tiempo real |

---

## 21/07/2025 Mejoras

- Versión en inglés y en otros idiomas (en proceso)
- Accesibilidad mejorada (para personas con discapacidad visual y/o auditiva)
- Modo oscuro para facilitar la lectura.
- Sección "Síntomas"

## 💡 Próximas mejoras

- EMpulseAPP
- Mejora de logotipos y aspecto general de la plataforma.
- Versión en inglés y en otros idiomas.
- Accesibilidad mejorada (para personas con discapacidad visual y/o auditiva)
- Buscador internno para encontrar contenido específico.
- Sección de newsletter, para recibir información, noticias y eventos.
- Blog colaborativo.
- Modo oscuro para facilitar la lectura.
- Chatbot informativo para responder preguntas sobre Esclerosis Múltiple.
- Integración con redes sociales.
- Mapa de centros especializados a nivel nacional.
- Guías descargables en PDF.



# ENGLISH VERSION


# 🧠 EM-PULSE: Multiple Sclerosis Information Platform

Welcome to **EM-PULSE**, a web application designed to inform, educate, and connect individuals interested in Multiple Sclerosis. This project was created with the goal of providing support and information, both for those with the disease and for those living with them, offering accessible content on symptoms, treatments, updated news, and a contact form to answer questions.

---

## 📌 Key Features

- ✅ Dynamic navigation through sections
- 📰 Integration with NewsAPI to display recent and real-time news on Multiple Sclerosis.
- 📬 Contact form with real-time validation.
- 📱 Hamburger menu for mobile navigation.
- 🎨 Modern and accessible design with custom CSS.

---

## 🚀 Technologies Used

| Technology | Purpose |
|------------|-----|
| HTML5      | Content structure |
| CSS3       | Styles and responsive design |
| JavaScript | Dynamic navigation, validation, and API consumption |
| NewsAPI    | Real-time medical news source |

---

## 💡 Upcoming Improvements

- EMpulseAPP.
- Enhancement of logos and the overall platform appearance.
- English version and other languages.
- Improved accessibility (for visually and/or hearing impaired users).
- Internal search engine to find specific content.
- Newsletter section to receive information, news, and events.
- Collaborative blog.
- Dark mode for easier reading.
- Informational chatbot to answer questions about Multiple Sclerosis.
- Integration with social media.
- Map of specialized centers nationwide.
- Downloadable PDF guides.