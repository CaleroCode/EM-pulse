from rest_framework import serializers
from .models import Symptom


class SymptomSerializer(serializers.ModelSerializer):
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
