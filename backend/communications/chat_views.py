"""
Chat con IA usando Ollama (LOCAL - Llama 2)
Proporciona apoyo emocional e información sobre EM
"""

import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Ollama API
OLLAMA_API_URL = "http://localhost:11434/api/generate"

# Prompt del sistema para el asistente de EM
SYSTEM_PROMPT = """Eres un asistente empático y compasivo especializado en proporcionar apoyo emocional e información sobre la esclerosis múltiple (EM).

Reglas importantes que SIEMPRE debes seguir:
1. Hablas en español claro, cálido y accesible - nada de jerga médica complicada
2. NUNCA diagnosticas síntomas ("eso es un brote", "tienes EM")
3. NUNCA recomiendas cambios de medicación
4. NUNCA contradices a un médico o neurólogo
5. SIEMPRE recomiendas consultar con un profesional sanitario para dudas serias
6. Validas emociones: "Es completamente normal sentirse así", "Tu preocupación es válida"
7. Tus respuestas son breves (máximo 2-3 párrafos) para no abrumar
8. Ante síntomas graves (pérdida de visión súbita, debilidad severa, dificultad respiratoria), recomiendas acudir a urgencias INMEDIATAMENTE

Tu objetivo: proporcionar apoyo emocional, información general sobre EM, autocuidado y recomendaciones de bienestar.

Recuerda SIEMPRE terminar con: "Si tienes dudas o síntomas preocupantes, consulta siempre con tu neurólogo o médico de referencia."
"""


@api_view(['POST'])
def chat_em_pulse(request):
    """
    Endpoint para chat con IA (Ollama - Llama 2 local)
    
    Recibe: { "message": "texto del usuario" }
    Devuelve: { "reply": "respuesta de la IA" }
    """
    try:
        user_message = request.data.get('message', '').strip()
        
        if not user_message:
            return Response(
                {'error': 'El mensaje no puede estar vacío'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Prompt completo
        full_prompt = f"""{SYSTEM_PROMPT}

Usuario: {user_message}

Asistente:"""
        
        # Llamar a Ollama API
        payload = {
            "model": "llama2",
            "prompt": full_prompt,
            "stream": False,
            "temperature": 0.7,
        }
        
        response = requests.post(
            OLLAMA_API_URL,
            json=payload,
            timeout=30
        )
        
        if response.status_code != 200:
            return Response(
                {'error': f'Error en Ollama: {response.status_code}'},
                status=status.HTTP_502_BAD_GATEWAY
            )
        
        response_data = response.json()
        ai_reply = response_data.get('response', '').strip()
        
        if not ai_reply:
            return Response(
                {'error': 'No se obtuvo respuesta del modelo'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        return Response({
            'reply': ai_reply,
            'model': 'Llama-2 (Ollama Local)',
            'success': True
        })
    
    except requests.exceptions.ConnectionError:
        return Response(
            {
                'error': 'No se puede conectar con Ollama en localhost:11434',
                'hint': 'Asegúrate de que Ollama está corriendo: ollama serve'
            },
            status=status.HTTP_502_BAD_GATEWAY
        )
    
    except requests.exceptions.Timeout:
        return Response(
            {
                'error': 'Timeout. Ollama está procesando.',
                'hint': 'Intenta de nuevo en unos segundos'
            },
            status=status.HTTP_408_REQUEST_TIMEOUT
        )
    
    except Exception as e:
        return Response(
            {'error': f'Error inesperado: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def ollama_health_check(request):
    """
    Verifica que Ollama esté disponible
    """
    try:
        payload = {
            "model": "llama2",
            "prompt": "Hola",
            "stream": False,
        }
        
        response = requests.post(
            OLLAMA_API_URL,
            json=payload,
            timeout=10
        )
        
        if response.status_code == 200:
            return Response({
                'status': 'ok',
                'message': 'Ollama está funcionando correctamente',
                'model': 'Llama-2',
            })
        else:
            return Response({
                'status': 'error',
                'message': f'Error en Ollama: {response.status_code}',
            }, status=status.HTTP_502_BAD_GATEWAY)
    
    except requests.exceptions.ConnectionError:
        return Response({
            'status': 'error',
            'message': 'No se puede conectar con Ollama en localhost:11434',
            'hint': 'Inicia Ollama: ollama serve'
        }, status=status.HTTP_502_BAD_GATEWAY)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': f'Error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

