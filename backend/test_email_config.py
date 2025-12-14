#!/usr/bin/env python
"""
Script para probar la configuración de email en EM-PULSE.

Uso:
    python test_email_config.py
"""

import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'empulse_backend.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings


def test_email_configuration():
    """Prueba la configuración de email"""
    
    print("=" * 60)
    print("PRUEBA DE CONFIGURACIÓN DE EMAIL - EM-PULSE")
    print("=" * 60)
    
    # Verificar configuración
    print("\n📧 Configuración actual:")
    print(f"  EMAIL_BACKEND: {settings.EMAIL_BACKEND}")
    print(f"  EMAIL_HOST: {settings.EMAIL_HOST}")
    print(f"  EMAIL_PORT: {settings.EMAIL_PORT}")
    print(f"  EMAIL_USE_TLS: {settings.EMAIL_USE_TLS}")
    print(f"  EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
    print(f"  DEFAULT_FROM_EMAIL: {settings.DEFAULT_FROM_EMAIL}")
    
    # Validar que haya credenciales configuradas
    if not settings.EMAIL_HOST_USER or settings.EMAIL_HOST_USER == '':
        print("\n❌ ERROR: EMAIL_HOST_USER no está configurado")
        print("   Por favor, actualiza tu archivo .env con tus credenciales de Gmail")
        return False
    
    if not settings.EMAIL_HOST_PASSWORD or settings.EMAIL_HOST_PASSWORD == '':
        print("\n❌ ERROR: EMAIL_HOST_PASSWORD no está configurado")
        print("   Por favor, actualiza tu archivo .env con tu contraseña de aplicación")
        return False
    
    # Intentar enviar un email de prueba
    print("\n📨 Intentando enviar email de prueba...")
    
    try:
        send_mail(
            subject='Prueba de Configuración - EM-PULSE',
            message='''
Este es un email de prueba para verificar que tu configuración de email es correcta.

Si recibes este email, ¡la configuración está funcionando! 🎉

---
EM-PULSE: Tu plataforma de apoyo emocional para la esclerosis múltiple
            ''',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        
        print("✅ ¡Email enviado correctamente!")
        print(f"   Revisa tu bandeja de entrada en: {settings.EMAIL_HOST_USER}")
        return True
        
    except Exception as e:
        print(f"❌ ERROR al enviar email: {str(e)}")
        print("\nPosibles causas:")
        print("  1. Las credenciales de Gmail son incorrectas")
        print("  2. No hay conexión a internet")
        print("  3. Gmail rechaza la conexión (revisa tu cuenta)")
        print("  4. Falta habilitar verificación en dos pasos")
        return False


if __name__ == '__main__':
    success = test_email_configuration()
    sys.exit(0 if success else 1)
