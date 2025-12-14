# 🔧 Troubleshooting: Síntomas y Noticias No Cargan

## 1️⃣ VERIFICAR SÍNTOMAS EN RENDER

### Paso 1: Ver logs del backend en Render
1. Ve a https://dashboard.render.com
2. Selecciona el servicio **empulse-api** (Web Service)
3. Abre la pestaña **Logs**
4. Busca el texto: `Proceso completado` o `Error al cargar síntomas`

Si ves `0 síntomas creados`, los síntomas YA ESTÁN en la base de datos (eso es bueno).

### Paso 2: Acceder a la API desde el navegador
```
https://empulse-api.onrender.com/api/symptoms/
```

Si funciona, verás algo como:
```json
[
  {
    "id": 1,
    "name": "Fatiga",
    "description": "Cansancio extremo...",
    "category": "General",
    "created_at": "2025-12-14T10:30:00Z",
    "is_active": true
  },
  ...
]
```

Si ves `[]` (array vacío), el problema es que los síntomas no están cargados.

---

## 2️⃣ CARGAR SÍNTOMAS MANUALMENTE EN RENDER

Si los síntomas no están cargados:

### Opción A: Usar Render Shell (MÁS FÁCIL)
1. En la página del servicio **empulse-api**, ve a pestaña **Shell**
2. Ejecuta:
```bash
cd /opt/render/project/src/backend
python manage.py load_symptoms
python manage.py verify_symptoms
```

### Opción B: Redeployar (Menos controlado)
1. En GitHub, haz un commit vacío:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```
2. Render redeployará automáticamente y ejecutará el comando load_symptoms

---

## 3️⃣ CONFIGURAR NOTICIAS (NewsAPI)

El problema es que **NO TIENES NEWS_API_KEY configurada en Render**.

### Paso 1: Obtener API Key GRATUITA
1. Ve a https://newsapi.org/register
2. Regístrate (es GRATIS)
3. Copia tu API Key (algo como `abc123def456...`)

### Paso 2: Configurar en Render
1. En la página del servicio **empulse-api**
2. Ve a **Environment**
3. Busca la variable `NEWS_API_KEY`
4. Si no existe, crea una nueva:
   - **Key**: `NEWS_API_KEY`
   - **Value**: Tu API Key de newsapi.org
5. Click **Save**
6. El servicio se redeployará automáticamente

Verifica que ahora dice: **Auto Deploy: Enabled**

### Paso 3: Verificar que funciona
```
https://empulse-api.onrender.com/api/news/external_recent/?language=es
```

Deberías ver noticias reales sobre Esclerosis Múltiple.

---

## 4️⃣ CONFIGURAR HUGGING FACE (Para Chat)

Igualmente, necesitas tu token de HuggingFace:

### Paso 1: Obtener Token
1. Ve a https://huggingface.co/settings/tokens
2. Crea un nuevo token (Read access es suficiente)
3. Copia el token

### Paso 2: Configurar en Render
1. En **Environment** de **empulse-api**:
   - **Key**: `HUGGINGFACE_API_KEY`
   - **Value**: Tu token de HuggingFace
2. Click **Save**

---

## 5️⃣ CONFIGURAR FRONTEND VARIABLE

También necesita la variable `VITE_API_URL` en el Static Site:

1. Ve a tu servicio **empulse** (Static Site)
2. Ve a **Environment**
3. Busca `VITE_API_URL`
4. Debe tener el valor: `https://empulse-api.onrender.com`
5. Si no existe, créala

---

## 6️⃣ CHECKLIST FINAL

- [ ] API de síntomas responde con datos: `https://empulse-api.onrender.com/api/symptoms/`
- [ ] API de noticias responde con datos: `https://empulse-api.onrender.com/api/news/external_recent/?language=es`
- [ ] Logs de Render muestran: "Proceso completado. 12 síntomas creados."
- [ ] Frontend carga y muestra síntomas en la home
- [ ] Frontend carga y muestra noticias en la home
- [ ] Chat responde cuando escribes un mensaje

---

## 7️⃣ SI AÚN NO FUNCIONA

Comparte el **error específico** que ves:
- ¿Qué ves en la consola del navegador? (F12 → Console)
- ¿Qué ves en los logs de Render? (Dashboard → Logs)
- ¿Cuál es el STATUS CODE de la respuesta?

Ejemplo: "Error 500 en `/api/symptoms/`" o "Error 403 en NewsAPI"
