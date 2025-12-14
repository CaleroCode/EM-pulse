from django.db import models


class ConsentRecord(models.Model):
    CONSENT_TYPE_CHOICES = [
        ("newsletter", "Newsletter"),
        ("data_sharing", "Compartir datos"),
        ("analytics", "Analítica"),
    ]

    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.CASCADE,
        related_name="consents",
    )
    consent_type = models.CharField(max_length=50, choices=CONSENT_TYPE_CHOICES)
    granted = models.BooleanField(default=True)
    granted_at = models.DateTimeField(auto_now_add=True)
    revoked_at = models.DateTimeField(null=True, blank=True)
    source = models.CharField(
        max_length=100,
        blank=True,
        help_text="Ej: web_form, admin_panel, import",
    )

    def __str__(self):
        return f"{self.subscriber.email} - {self.consent_type} ({'sí' if self.granted else 'no'})"


class AuditLog(models.Model):
    ACTION_CHOICES = [
        ("create", "Crear"),
        ("update", "Actualizar"),
        ("delete", "Eliminar"),
    ]

    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.SET_NULL,
        related_name="audit_logs",
        null=True,
        blank=True,
    )
    entity = models.CharField(max_length=100, help_text="Modelo o tabla afectada")
    entity_id = models.CharField(max_length=100, help_text="ID del registro afectado")
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    changes = models.JSONField(blank=True, default=dict)
    performed_by = models.CharField(
        max_length=150,
        blank=True,
        help_text="Usuario o sistema que hizo el cambio",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.entity} ({self.action}) - {self.created_at}"


class ErrorReport(models.Model):
    SEVERITY_CHOICES = [
        ("low", "Baja"),
        ("medium", "Media"),
        ("high", "Alta"),
        ("critical", "Crítica"),
    ]

    error_type = models.CharField(max_length=150)
    message = models.TextField()
    details = models.TextField(blank=True)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default="low")
    occurred_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"[{self.severity}] {self.error_type}"
