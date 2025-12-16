#!/bin/bash
set -e

echo "🚀 Iniciando setup de EM-PULSE en Render..."

# Verificar que estamos en el backend
cd /var/www/em-pulse/backend 2>/dev/null || cd backend

echo "📦 Instalando dependencias..."
pip install -r requirements.txt

echo "🗄️ Ejecutando migraciones de base de datos..."
python manage.py migrate --no-input

echo "🧹 Recolectando archivos estáticos..."
python manage.py collectstatic --no-input

echo "✅ Setup completado exitosamente!"
