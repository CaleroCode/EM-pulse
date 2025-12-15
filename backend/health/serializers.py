from rest_framework import serializers
from .models import Symptom


class SymptomListSerializer(serializers.ModelSerializer):
    """Serializer ligero para listar síntomas (sin descripción)"""
    class Meta:
        model = Symptom
        fields = ["id", "name", "category"]
        read_only_fields = ("id",)


class SymptomSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle de síntoma"""
    class Meta:
        model = Symptom
        fields = [
            "id",
            "name",
            "description",
            "category",
            "created_at",
            "is_active",
        ]
        read_only_fields = ("id", "created_at")
