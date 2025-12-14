from django.contrib import admin
from .models import Symptom, SubscriberSymptom, Diagnosis, ModelOutput


@admin.register(Symptom)
class SymptomAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "is_active", "created_at")
    list_filter = ("is_active", "category")
    search_fields = ("name", "category")


@admin.register(SubscriberSymptom)
class SubscriberSymptomAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "symptom", "severity", "reported_at")
    list_filter = ("severity", "reported_at")
    search_fields = ("subscriber__email", "symptom__name")


@admin.register(Diagnosis)
class DiagnosisAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "confidence", "source", "created_at")
    list_filter = ("source", "created_at")
    search_fields = ("subscriber__email",)


@admin.register(ModelOutput)
class ModelOutputAdmin(admin.ModelAdmin):
    list_display = ("model_name", "subscriber", "created_at")
    list_filter = ("model_name", "created_at")
    search_fields = ("subscriber__email", "model_name")
