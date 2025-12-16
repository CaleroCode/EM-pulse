from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Prefetch, Q
from django.db import transaction
from .models import ForumPost, ForumComment, ForumLike
from .serializers import ForumPostSerializer, ForumCommentSerializer
import logging

logger = logging.getLogger(__name__)


class ForumPostViewSet(viewsets.ModelViewSet):
    serializer_class = ForumPostSerializer
    permission_classes = []
    queryset = ForumPost.objects.all()

    def get_queryset(self):
        """Optimizar queryset con prefetch_related para comentarios"""
        queryset = ForumPost.objects.all().prefetch_related(
            Prefetch('comments', queryset=ForumComment.objects.order_by('created_at'))
        )
        
        logger.info(f"Total posts en BD: {queryset.count()}")
        
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category:
            logger.info(f"Filtrando por categoría: {category}")
            queryset = queryset.filter(category=category)
        if search:
            logger.info(f"Buscando: {search}")
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(content__icontains=search)
            )

        result = queryset.order_by('-created_at')
        logger.info(f"Posts después de filtros: {result.count()}")
        logger.info(f"Posts IDs: {list(result.values_list('id', flat=True))}")
        return result

    def list(self, request, *args, **kwargs):
        """Listar posts sin caché para mostrar posts nuevos inmediatamente"""
        logger.info(f"GET /posts/ - Parámetros: {dict(request.query_params)}")
        response = super().list(request, *args, **kwargs)
        logger.info(f"Retornando {len(response.data)} posts")
        return response
    
    def create(self, request, *args, **kwargs):
        """Crear un nuevo post con validación"""
        logger.info(f"Recibido POST request con datos: {request.data}")
        
        # Validar datos requeridos
        required_fields = ['author', 'title', 'content', 'category']
        missing_fields = [field for field in required_fields if not request.data.get(field)]
        
        if missing_fields:
            error_msg = f'Campos requeridos faltantes: {", ".join(missing_fields)}'
            logger.warning(f"POST creation failed: {error_msg}")
            return Response(
                {'error': error_msg}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Crear post
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                logger.info("Validación OK, guardando post...")
                self.perform_create(serializer)
                logger.info(f"Post guardado exitosamente: {serializer.data}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error al guardar post: {str(e)}", exc_info=True)
                return Response(
                    {'error': f'Error al guardar el post: {str(e)}'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        logger.warning(f"Validación falló: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        """Guardar el post asegurando que se persiste a la base de datos"""
        logger.info("perform_create iniciado")
        with transaction.atomic():
            instance = serializer.save()
            logger.info(f"Post guardado en BD con ID: {instance.id}")
            return instance

    def get_serializer_context(self):
        context = super().get_serializer_context()
        user_identifier = self.request.query_params.get('user_identifier')
        if user_identifier:
            context['user_identifier'] = user_identifier
        return context

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """Agregar like a un post"""
        post = self.get_object()
        user_identifier = request.data.get('user_identifier') or request.query_params.get('user_identifier')
        
        if not user_identifier:
            return Response({'error': 'user_identifier is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar si ya existe like
        like_obj, created = ForumLike.objects.get_or_create(user_identifier=user_identifier, post=post)
        
        if created:
            post.likes += 1
            post.save()
            return Response({'likes': post.likes, 'liked': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Already liked this post', 'likes': post.likes, 'liked': True}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        """Remover like de un post"""
        post = self.get_object()
        user_identifier = request.data.get('user_identifier') or request.query_params.get('user_identifier')
        
        if not user_identifier:
            return Response({'error': 'user_identifier is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Intentar eliminar el like
        like_obj = ForumLike.objects.filter(user_identifier=user_identifier, post=post).first()
        
        if like_obj:
            like_obj.delete()
            post.likes = max(0, post.likes - 1)
            post.save()
            return Response({'likes': post.likes, 'liked': False})
        else:
            return Response({'error': 'Like not found', 'likes': post.likes, 'liked': False}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        """Agregar un comentario a un post"""
        post = self.get_object()
        serializer = ForumCommentSerializer(data=request.data, context=self.get_serializer_context())
        if serializer.is_valid():
            serializer.save(post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForumCommentViewSet(viewsets.ModelViewSet):
    queryset = ForumComment.objects.all()
    serializer_class = ForumCommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        user_identifier = self.request.query_params.get('user_identifier')
        if user_identifier:
            context['user_identifier'] = user_identifier
        return context

    def create(self, request, *args, **kwargs):
        """Crear comentario con validación"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(
                    {'error': f'Error al guardar el comentario: {str(e)}'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        """Guardar comentario con transacción"""
        with transaction.atomic():
            serializer.save()

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """Agregar like a un comentario"""
        comment = self.get_object()
        user_identifier = request.data.get('user_identifier') or request.query_params.get('user_identifier')
        
        if not user_identifier:
            return Response({'error': 'user_identifier is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar si ya existe like
        like_obj, created = ForumLike.objects.get_or_create(user_identifier=user_identifier, comment=comment)
        
        if created:
            comment.likes += 1
            comment.save()
            return Response({'likes': comment.likes, 'liked': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Already liked this comment', 'likes': comment.likes, 'liked': True}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        """Remover like de un comentario"""
        comment = self.get_object()
        user_identifier = request.data.get('user_identifier') or request.query_params.get('user_identifier')
        
        if not user_identifier:
            return Response({'error': 'user_identifier is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Intentar eliminar el like
        like_obj = ForumLike.objects.filter(user_identifier=user_identifier, comment=comment).first()
        
        if like_obj:
            like_obj.delete()
            comment.likes = max(0, comment.likes - 1)
            comment.save()
            return Response({'likes': comment.likes, 'liked': False})
        else:
            return Response({'error': 'Like not found', 'likes': comment.likes, 'liked': False}, status=status.HTTP_400_BAD_REQUEST)
