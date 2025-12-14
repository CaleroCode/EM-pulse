"""
Chat con IA usando Hugging Face
Proporciona apoyo emocional e información sobre EM
"""

import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import os

# Hugging Face API - Usar distilgpt2 que es más rápido
HF_API_TOKEN = os.getenv("HUGGINGFACE_API_KEY", "")
HF_API_URL = "https://router.huggingface.co/models/distilgpt2"

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
    Endpoint para chat con IA (Hugging Face - Llama 2)
    
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
        
        if not HF_API_TOKEN:
            return Response(
                {
                    'error': 'API de Hugging Face no configurada',
                    'hint': 'Establece la variable HUGGINGFACE_API_KEY en Render'
                },
                status=status.HTTP_502_BAD_GATEWAY
            )
        
        # Prompt completo
        full_prompt = f"{SYSTEM_PROMPT}\n\nUsuario: {user_message}\n\nAsistente:"
        
        # Llamar a Hugging Face API
        headers = {
            "Authorization": f"Bearer {HF_API_TOKEN}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": full_prompt,
            "parameters": {
                "max_new_tokens": 128,
                "temperature": 0.7,
            }
        }
        
        response = requests.post(
            HF_API_URL,
            json=payload,
            headers=headers,
            timeout=60
        )
        
        if response.status_code != 200:
            return Response(
                {'error': f'Error en Hugging Face: {response.status_code} - {response.text}'},
                status=status.HTTP_502_BAD_GATEWAY
            )
        
        response_data = response.json()
        
        # Extraer el texto de la respuesta
        if isinstance(response_data, list) and len(response_data) > 0:
            ai_reply = response_data[0].get('generated_text', '').strip()
        else:
            ai_reply = str(response_data).strip()
        
        if not ai_reply:
            return Response(
                {'error': 'No se obtuvo respuesta del modelo'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        return Response({
            'reply': ai_reply,
            'model': 'DistilGPT-2 (Hugging Face)',
            'success': True
        })
    
    except requests.exceptions.ConnectionError:
        return Response(
            {
                'error': 'No se puede conectar con Hugging Face API',
                'hint': 'Verifica tu conexión a internet'
            },
            status=status.HTTP_502_BAD_GATEWAY
        )
    except requests.exceptions.Timeout:
        return Response(
            {
                'error': 'Timeout. El modelo está procesando.',
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
    Verifica que el servicio de chat esté disponible
    """
    try:
        if not HF_API_TOKEN:
            return Response({
                'status': 'error',
                'message': 'HUGGINGFACE_API_KEY no está configurada',
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        # Verificar conectividad básica con HF API
        headers = {
            "Authorization": f"Bearer {HF_API_TOKEN}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": "Hola",
            "parameters": {
                "max_new_tokens": 10,
            }
        }
        
        response = requests.post(
            HF_API_URL,
            json=payload,
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            return Response({
                'status': 'ok',
                'message': 'Chat EM-PULSE disponible (Hugging Face)',
                'model': 'Llama-2',
            })
        else:
            return Response({
                'status': 'error',
                'message': f'Error en Hugging Face: {response.status_code}',
            }, status=status.HTTP_502_BAD_GATEWAY)
    
    except requests.exceptions.ConnectionError:
        return Response({
            'status': 'error',
            'message': 'No se puede conectar con Hugging Face API. Verifica tu conexión.',
        }, status=status.HTTP_502_BAD_GATEWAY)
    
    except requests.exceptions.Timeout:
        return Response({
            'status': 'error',
            'message': 'Timeout al conectar con Hugging Face API',
        }, status=status.HTTP_408_REQUEST_TIMEOUT)
    
    except Exception as e:
        return Response({
            'status': 'error',
            'message': f'Error: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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

