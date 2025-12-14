# 🚀 Guía de Despliegue en Render

## Resumen
Este proyecto se desplegará en Render.com con:
- **Frontend**: `https://empulse.onrender.com`
- **Backend API**: `https://empulse-api.onrender.com`

## Pasos de Despliegue

### 1. Preparación en GitHub
✅ El repositorio ya está en: https://github.com/CaleroCode/EM-pulse

Asegúrate de que los archivos estén commiteados:
- `render.yaml` - Configuración de Render
- `Procfile` - Instrucciones de ejecución
- `backend/requirements.txt` - Dependencias actualizadas
- `.gitignore` - Archivos ignorados

### 2. Crear Cuenta en Render
1. Ve a https://render.com
2. Regístrate/Inicia sesión con GitHub
3. Autoriza Render a acceder a tu repositorio

### 3. Desplegar Backend (empulse-api)

#### Opción A: Usando render.yaml (Recomendado)
1. En el dashboard de Render, haz clic en "New +" → "Blueprint"
2. Selecciona tu repositorio `EM-pulse`
3. Render leerá automáticamente `render.yaml` y creará los servicios

#### Opción B: Manual (si prefieres)
1. Dashboard de Render → "New +" → "Web Service"
2. Conectar repositorio `EM-pulse`
3. Configurar:
   - **Name**: `empulse-api`
   - **Region**: Frankfurt (o tu preferencia)
   - **Branch**: `main`
   - **Build Command**: `cd backend && pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `cd backend && gunicorn empulse_backend.wsgi:application --bind 0.0.0.0:$PORT`
   - **Plan**: Free (o paid si lo prefieres)

4. Variables de entorno:
   ```
   DEBUG=False
   SECRET_KEY=(Render generará uno)
   ALLOWED_HOSTS=empulse-api.onrender.com,empulse.onrender.com,localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=https://empulse.onrender.com,http://localhost:5173,http://localhost:3000
   ```

5. Database (opcional):
   - Render proporciona PostgreSQL gratuito
   - Se asignará una `DATABASE_URL` automáticamente
   - Nuestro settings.py lo detectará automáticamente

### 4. Desplegar Frontend (empulse)

1. Dashboard de Render → "New +" → "Web Service"
2. Conectar repositorio `EM-pulse`
3. Configurar:
   - **Name**: `empulse`
   - **Region**: Frankfurt
   - **Branch**: `main`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm run preview`
   - **Plan**: Free

4. Variables de entorno:
   ```
   VITE_API_URL=https://empulse-api.onrender.com
   ```

5. Static Publish Path:
   - `frontend/dist`

### 5. Verificar el Despliegue

Una vez completado:
- **Frontend**: https://empulse.onrender.com
- **Backend API**: https://empulse-api.onrender.com
- **Admin Django**: https://empulse-api.onrender.com/admin

### 6. Primeras Migraciones

Si es la primera vez:
1. Ve a https://empulse-api.onrender.com/admin
2. Usa las credenciales de Django (crea un superuser si es necesario)
3. Crea los datos iniciales (síntomas, categorías, etc.)

### 7. Configuración de Email (Opcional)

Si quieres configurar newsletter:
1. En Render, actualiza las variables de entorno del backend:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=tu-email@gmail.com
   EMAIL_HOST_PASSWORD=tu-app-password
   ```

2. Para Gmail:
   - Ve a https://myaccount.google.com/security
   - Habilita "2-Step Verification"
   - Crea una "App Password" para Mail
   - Copia esa contraseña en `EMAIL_HOST_PASSWORD`

## Troubleshooting

### El frontend no carga
- Verifica que `VITE_API_URL` apunta a `https://empulse-api.onrender.com`
- Revisa la consola del navegador (F12) para errores CORS

### El backend da error 500
- Revisa los logs en Render: Dashboard → Service → Logs
- Verifica que todas las migrations pasaron correctamente

### Base de datos vacía
- Conecta a PostgreSQL y ejecuta un dump de datos
- O crea los datos iniciales a través del admin

### API no responde
- Verifica que ALLOWED_HOSTS incluya `empulse-api.onrender.com`
- Asegúrate de que DEBUG=False en producción

## URLs Útiles

- **Aplicación**: https://empulse.onrender.com
- **API Backend**: https://empulse-api.onrender.com
- **Admin**: https://empulse-api.onrender.com/admin
- **Dashboard Render**: https://dashboard.render.com

## Notas Importantes

- ✅ Los free services en Render se ponen en "sleep" después de 15 min sin actividad
- ✅ El primer startup tarda más tiempo (puede ser 1-2 minutos)
- ✅ Las migraciones se ejecutan automáticamente en el `release` step
- ✅ Todos los archivos `.env` han sido limpiados de secretos reales

¡Tu aplicación EM-PULSE está lista para producción! 🚀
