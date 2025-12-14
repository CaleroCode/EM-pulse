@echo off
REM Script para iniciar EM-PULSE con Ollama

echo.
echo ====================================
echo   EM-PULSE + Ollama Startup
echo ====================================
echo.

REM Verificar Ollama
echo [1/3] Verificando Ollama...
ollama --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Ollama no está instalado o no está en PATH
    echo Descárgalo desde: https://ollama.ai/
    pause
    exit /b 1
)
echo OK - Ollama encontrado

REM Iniciar Ollama en background
echo [2/3] Iniciando Ollama (necesita estar en otra terminal)...
echo.
echo INSTRUCCIONES:
echo 1. Abre una NEW terminal separada
echo 2. Ejecuta: ollama serve
echo 3. Espera a que diga "listening on" 
echo 4. Vuelve aquí y presiona ENTER
echo.
pause

REM Iniciar Django
echo [3/3] Iniciando servicios...
echo.

REM En la misma ventana: Django
echo === Starting Django (Puerto 8000) ===
start cmd /k "cd /d %cd%\backend\em-pulse\backend && python manage.py runserver 0.0.0.0:8000"

REM En nuevas ventanas: Frontend
echo === Starting Frontend (Puerto 5173) ===
start cmd /k "cd /d %cd%\backend\em-pulse\frontend && npm run dev"

echo.
echo ====================================
echo  ✓ Servicios iniciados:
echo  - Ollama: http://localhost:11434
echo  - Backend: http://localhost:8000
echo  - Frontend: http://localhost:5173
echo ====================================
echo.
echo Abre http://localhost:5173/ en tu navegador
echo.
pause
