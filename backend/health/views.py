from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.db.models import Q
from .models import Symptom
from .serializers import SymptomSerializer, SymptomListSerializer


class SymptomViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API solo de lectura para síntomas.
    - GET /api/symptoms/        -> lista de síntomas (caché 1 hora)
    - GET /api/symptoms/{id}/   -> detalle de un síntoma (caché 2 horas)
    - GET /api/symptoms/?search=... -> búsqueda de síntomas
    """

    permission_classes = [AllowAny]

    def get_queryset(self):
        """Permitir búsqueda por nombre y descripción"""
        queryset = Symptom.objects.filter(is_active=True).order_by("name")
        
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search)
            )
        
        return queryset

    def get_serializer_class(self):
        """Usar serializer ligero para listados"""
        if self.action == 'list':
            return SymptomListSerializer
        return SymptomSerializer

    @method_decorator(cache_page(60 * 60))  # Caché de 1 hora
    def list(self, request, *args, **kwargs):
        """Listar síntomas con caché"""
        return super().list(request, *args, **kwargs)

    @method_decorator(cache_page(60 * 60 * 2))  # Caché de 2 horas
    def retrieve(self, request, *args, **kwargs):
        """Obtener síntoma individual con caché"""
        return super().retrieve(request, *args, **kwargs)
