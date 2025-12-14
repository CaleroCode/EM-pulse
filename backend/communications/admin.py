from django.contrib import admin
from .models import News, SubscriberNews, NotificationLog


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("title", "published_at", "is_active")
    list_filter = ("is_active", "published_at")
    search_fields = ("title",)


@admin.register(SubscriberNews)
class SubscriberNewsAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "news", "sent_at", "is_opened", "opened_at")
    list_filter = ("is_opened", "sent_at")
    search_fields = ("subscriber__email", "news__title")


@admin.register(NotificationLog)
class NotificationLogAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "channel", "status", "created_at", "sent_at")
    list_filter = ("channel", "status", "created_at")
    search_fields = ("subscriber__email", "subject")
