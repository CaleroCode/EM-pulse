from django.db import models


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # por si luego quieres desactivar sin borrar
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email


class Preferences(models.Model):
    LANGUAGE_CHOICES = [
        ("es", "Español"),
        ("en", "Inglés"),
    ]

    FREQUENCY_CHOICES = [
        ("daily", "Diario"),
        ("weekly", "Semanal"),
        ("monthly", "Mensual"),
    ]

    subscriber = models.OneToOneField(
        Subscriber,
        on_delete=models.CASCADE,
        related_name="preferences",
    )
    language = models.CharField(
        max_length=5,
        choices=LANGUAGE_CHOICES,
        default="es",
    )
    frequency = models.CharField(
        max_length=20,
        choices=FREQUENCY_CHOICES,
        default="weekly",
    )
    favorite_topics = models.TextField(
        blank=True,
        help_text="Temas favoritos separados por comas (ej: síntomas, noticias, IA)",
    )

    def __str__(self):
        return f"Preferencias de {self.subscriber.email}"


class DeviceInfo(models.Model):
    DEVICE_TYPE_CHOICES = [
        ("desktop", "Escritorio"),
        ("mobile", "Móvil"),
        ("tablet", "Tablet"),
        ("other", "Otro"),
    ]

    subscriber = models.ForeignKey(
        Subscriber,
        on_delete=models.CASCADE,
        related_name="devices",
    )
    device_type = models.CharField(
        max_length=20,
        choices=DEVICE_TYPE_CHOICES,
        default="other",
    )
    os = models.CharField(max_length=100, blank=True)          # sistema operativo
    browser = models.CharField(max_length=100, blank=True)     # navegador
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device_type} - {self.subscriber.email}"


class SessionInfo(models.Model):
    subscriber = models.ForeignKey(
        Subscriber,
        on_delete=models.CASCADE,
        related_name="sessions",
    )
    session_token = models.CharField(max_length=255, unique=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Sesión de {self.subscriber.email} ({'activa' if self.is_active else 'cerrada'})"
