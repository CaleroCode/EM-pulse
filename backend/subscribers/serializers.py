from rest_framework import serializers
from .models import Subscriber, Preferences, DeviceInfo, SessionInfo


class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        # el subscriber se asigna en el serializer de Subscriber
        exclude = ("subscriber",)


class DeviceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceInfo
        exclude = ("subscriber",)


class SessionInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionInfo
        exclude = ("subscriber",)


class SubscriberSerializer(serializers.ModelSerializer):
    # Nesting de preferencias
    preferences = PreferencesSerializer(required=False)

    class Meta:
        model = Subscriber
        fields = [
            "id",
            "email",
            "name",
            "created_at",
            "is_active",
            "preferences",
        ]
        read_only_fields = ("id", "created_at")

    def create(self, validated_data):
        # Sacamos las preferencias si vienen en el payload
        prefs_data = validated_data.pop("preferences", None)

        # Creamos el suscriptor
        subscriber = Subscriber.objects.create(**validated_data)

        # Creamos preferencias si se incluyeron
        if prefs_data:
            Preferences.objects.create(subscriber=subscriber, **prefs_data)

        return subscriber

    def update(self, instance, validated_data):
        # Actualizar preferencias si vienen
        prefs_data = validated_data.pop("preferences", None)

        # Actualizar campos básicos de Subscriber
        instance.email = validated_data.get("email", instance.email)
        instance.name = validated_data.get("name", instance.name)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()

        # Manejo de Preferences
        if prefs_data is not None:
            # si ya existe, actualizamos; si no, creamos
            prefs, created = Preferences.objects.get_or_create(subscriber=instance)
            for attr, value in prefs_data.items():
                setattr(prefs, attr, value)
            prefs.save()

        return instance
