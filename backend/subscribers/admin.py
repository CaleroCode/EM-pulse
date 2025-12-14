from django.contrib import admin
from .models import Subscriber, Preferences, DeviceInfo, SessionInfo


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "created_at", "is_active")
    search_fields = ("email", "name")
    list_filter = ("is_active", "created_at")


@admin.register(Preferences)
class PreferencesAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "language", "frequency")
    list_filter = ("language", "frequency")


@admin.register(DeviceInfo)
class DeviceInfoAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "device_type", "os", "browser", "created_at")
    list_filter = ("device_type", "os", "browser")


@admin.register(SessionInfo)
class SessionInfoAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "session_token", "ip_address", "is_active", "started_at", "ended_at")
    list_filter = ("is_active", "started_at")
