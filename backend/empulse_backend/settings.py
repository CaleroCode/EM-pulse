import os
from pathlib import Path
from dotenv import load_dotenv

# Ruta base del proyecto (carpeta backend)
BASE_DIR = Path(__file__).resolve().parent.parent

# Cargar variables de entorno desde backend/.env
load_dotenv(BASE_DIR / ".env")

# =========================
# CONFIGURACIÓN BÁSICA
# =========================

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-cámbiame-en-producción")

# DEBUG: por defecto True si no se indica otra cosa en .env
DEBUG = os.getenv("DEBUG", "True") == "True"

# ALLOWED_HOSTS: en desarrollo puede estar vacío
raw_allowed_hosts = os.getenv("ALLOWED_HOSTS", "")
if raw_allowed_hosts:
    ALLOWED_HOSTS = [host.strip() for host in raw_allowed_hosts.split(",")]
else:
    ALLOWED_HOSTS = []  # En desarrollo con DEBUG=True no pasa nada

# =========================
# APLICACIONES INSTALADAS
# =========================

INSTALLED_APPS = [
    # Apps de Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Terceros
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",

    # Tus apps (las irás añadiendo aquí)
    # "subscribers",
    # "news",
    # "symptoms",
    "subscribers",
    "communications",
    "health",
    "activity",
    "compliance",
    "forum",
]

# =========================
# MIDDLEWARE
# =========================

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # CORS SIEMPRE ARRIBA DEL TODO
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# =========================
# URLS / WSGI / ASGI
# =========================

ROOT_URLCONF = "empulse_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Si luego tienes templates frontend/django, los añades aquí
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "empulse_backend.wsgi.application"
# Si en algún momento usas ASGI:
# ASGI_APPLICATION = "empulse_backend.asgi.application"

# =========================
# BASE DE DATOS (SQLite para desarrollo)
# =========================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# =========================
# VALIDACIÓN DE CONTRASEÑAS
# =========================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# =========================
# IDIOMA / ZONA HORARIA
# =========================

LANGUAGE_CODE = "es-es"

TIME_ZONE = "Europe/Madrid"

USE_I18N = True

USE_TZ = True

# =========================
# ESTÁTICOS Y MEDIA
# =========================

STATIC_URL = "static/"

# En producción puedes usar collectstatic a STATIC_ROOT
STATIC_ROOT = BASE_DIR / "staticfiles"

# Para archivos estáticos adicionales en desarrollo:
STATICFILES_DIRS = [
    # BASE_DIR / "static",  # si creas una carpeta backend/static
]

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# =========================
# CONFIG DJANGO REST FRAMEWORK
# =========================

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",  # para desarrollo; en producción cambia
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ],
}

# =========================
# CONFIGURACIÓN DE EMAIL
# =========================

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')  # Tu email de Gmail
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')  # Tu contraseña o app password
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', EMAIL_HOST_USER)

# =========================
# CORS
# =========================

# Para desarrollo, deja todo abierto (tu frontend Vite en 5173, etc.)
CORS_ALLOW_ALL_ORIGINS = True

# Si quieres ser más estricto:
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]

# =========================
# OTROS
# =========================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
