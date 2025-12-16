from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Prefetch, Q
from .models import ForumPost, ForumComment, ForumLike
from .serializers import ForumPostSerializer, ForumCommentSerializer


class ForumPostViewSet(viewsets.ModelViewSet):
    serializer_class = ForumPostSerializer
    permission_classes = []

    def get_queryset(self):
        """Optimizar queryset con prefetch_related para comentarios"""
        queryset = ForumPost.objects.prefetch_related(
            Prefetch('comments', queryset=ForumComment.objects.order_by('created_at'))
        )
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(content__icontains=search)
            )

        return queryset.order_by('-created_at')

    def list(self, request, *args, **kwargs):
        """Listar posts sin caché para mostrar posts nuevos inmediatamente"""
        return super().list(request, *args, **kwargs)

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
