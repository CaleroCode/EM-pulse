from rest_framework import serializers
from .models import News


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = [
            "id",
            "title",
            "content",
            "published_at",
            "created_at",
            "is_active",
        ]
        read_only_fields = ("id", "created_at")
