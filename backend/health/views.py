from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Symptom
from .serializers import SymptomSerializer


class SymptomViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API solo de lectura para síntomas.
    - GET /api/symptoms/        -> lista de síntomas
    - GET /api/symptoms/{id}/   -> detalle de un síntoma
    """

    queryset = Symptom.objects.filter(is_active=True).order_by("name")
    serializer_class = SymptomSerializer
    permission_classes = [AllowAny]
