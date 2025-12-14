from django.contrib import admin
from .models import ConsentRecord, AuditLog, ErrorReport


@admin.register(ConsentRecord)
class ConsentRecordAdmin(admin.ModelAdmin):
    list_display = ("subscriber", "consent_type", "granted", "granted_at", "revoked_at", "source")
    list_filter = ("consent_type", "granted", "source")
    search_fields = ("subscriber__email",)


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("entity", "entity_id", "action", "performed_by", "created_at")
    list_filter = ("action", "created_at")
    search_fields = ("entity", "entity_id", "performed_by")


@admin.register(ErrorReport)
class ErrorReportAdmin(admin.ModelAdmin):
    list_display = ("error_type", "severity", "occurred_at", "resolved", "resolved_at")
    list_filter = ("severity", "resolved", "occurred_at")
    search_fields = ("error_type", "message")
