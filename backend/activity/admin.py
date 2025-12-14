from django.contrib import admin
from .models import InteractionLog, Feedback


@admin.register(InteractionLog)
class InteractionLogAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "event_type", "path", "created_at")
    list_filter = ("event_type", "created_at")
    search_fields = ("subscriber__email", "path")


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "related_news", "related_diagnosis", "rating", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = ("subscriber__email", "message")
