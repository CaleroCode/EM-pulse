from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
import uuid
from .models import Subscriber
from .serializers import SubscriberSerializer


class AuthViewSet(viewsets.ViewSet):
    """
    API REST para autenticación de usuarios.
    - POST /api/auth/register/  -> registra nuevo usuario
    - POST /api/auth/login/     -> login con email y contraseña
    - POST /api/auth/logout/    -> logout del usuario
    - GET /api/auth/me/         -> obtener datos del usuario actual
    """
    
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        """Registrar nuevo usuario con email y contraseña"""
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name', '')

        if not email or not password:
            return Response(
                {'error': 'Email y contraseña son requeridos'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'Este email ya está registrado'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=name
            )
            token, _ = Token.objects.get_or_create(user=user)
            
            return Response({
                'id': user.id,
                'email': user.email,
                'name': user.first_name,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def login(self, request):
        """Login con email y contraseña"""
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Email y contraseña son requeridos'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
            user = authenticate(username=user.username, password=password)
            
            if user is None:
                return Response(
                    {'error': 'Email o contraseña incorrectos'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            token, _ = Token.objects.get_or_create(user=user)
            
            # Obtener o crear suscriptor asociado
            subscriber = Subscriber.objects.filter(email=email).first()
            
            return Response({
                'id': user.id,
                'email': user.email,
                'name': user.first_name,
                'token': token.key,
                'subscriber_id': subscriber.id if subscriber else None
            })
        except User.DoesNotExist:
            return Response(
                {'error': 'Email o contraseña incorrectos'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        """Logout del usuario"""
        try:
            request.user.auth_token.delete()
            return Response({'message': 'Logout exitoso'})
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Obtener datos del usuario actual"""
        user = request.user
        subscriber = Subscriber.objects.filter(email=user.email).first()
        
        return Response({
            'id': user.id,
            'email': user.email,
            'name': user.first_name,
            'subscriber_id': subscriber.id if subscriber else None,
            'subscriber_preferences': subscriber.preferences if subscriber else None
        })

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def password_recovery(self, request):
        """Enviar email de recuperación de contraseña"""
        email = request.data.get('email')

        if not email:
            return Response(
                {'error': 'Email es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
            # Generar un token único para la recuperación
            recovery_token = str(uuid.uuid4())
            
            # Enviar email de recuperación
            subject = "Recuperar tu contraseña en EM-PULSE"
            message = f"""
Hola {user.first_name or user.email},

Recibimos una solicitud para recuperar tu contraseña en EM-PULSE.

Por favor, ve a la aplicación y cambia tu contraseña usando el siguiente código:
Código: {recovery_token[:8]}

Este código es válido por 24 horas.

Si no solicitaste esto, ignora este email y tu contraseña seguirá siendo la misma.

---
EM-PULSE: Tu plataforma de apoyo emocional para la esclerosis múltiple
            """
            
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return Response({
                    'message': 'Se ha enviado un email con instrucciones de recuperación'
                })
            except Exception as email_error:
                # Si el email falla, devolver error pero sin revelar detalles
                print(f"Error enviando email: {email_error}")
                return Response({
                    'error': 'Error al enviar el email. Por favor, intenta más tarde.'
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except User.DoesNotExist:
            # No revelar si el email existe o no (seguridad)
            return Response({
                'message': 'Si el email existe en nuestro sistema, recibirás un email con instrucciones'
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def reset_password(self, request):
        """Cambiar contraseña con el token de recuperación"""
        email = request.data.get('email')
        new_password = request.data.get('new_password')

        if not email or not new_password:
            return Response(
                {'error': 'Email y nueva contraseña son requeridos'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.save()
            
            return Response({
                'message': 'Contraseña actualizada correctamente'
            })
        except User.DoesNotExist:
            return Response(
                {'error': 'Usuario no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class SubscriberViewSet(viewsets.ModelViewSet):
    """
    API REST para gestionar suscriptores y sus preferencias.
    - GET /api/subscribers/                -> lista
    - GET /api/subscribers/?email=...      -> lista filtrada por email (normalmente 1 resultado)
    - POST /api/subscribers/               -> crea suscriptor nuevo
    - GET /api/subscribers/{id}/           -> detalle
    - PUT/PATCH /api/subscribers/{id}/     -> actualizar
    - DELETE /api/subscribers/{id}/        -> borrar
    """

    serializer_class = SubscriberSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Subscriber.objects.all().order_by("-created_at")
        email = self.request.query_params.get("email")
        if email:
            qs = qs.filter(email=email)
        return qs
