from django.db import models


class InteractionLog(models.Model):
    EVENT_TYPE_CHOICES = [
        ("view", "Vista"),
        ("click", "Click"),
        ("form_submit", "Envío de formulario"),
        ("other", "Otro"),
    ]

    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.SET_NULL,
        related_name="interactions",
        null=True,
        blank=True,
    )
    event_type = models.CharField(max_length=50, choices=EVENT_TYPE_CHOICES, default="other")
    path = models.CharField(max_length=255, help_text="Ruta o URL dentro de la app")
    description = models.TextField(blank=True)
    metadata = models.JSONField(blank=True, default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        who = self.subscriber.email if self.subscriber else "anónimo"
        return f"{who} - {self.event_type} - {self.path}"


class Feedback(models.Model):
    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.SET_NULL,
        related_name="feedbacks",
        null=True,
        blank=True,
    )
    related_news = models.ForeignKey(
        "communications.News",
        on_delete=models.SET_NULL,
        related_name="feedbacks",
        null=True,
        blank=True,
    )
    related_diagnosis = models.ForeignKey(
        "health.Diagnosis",
        on_delete=models.SET_NULL,
        related_name="feedbacks",
        null=True,
        blank=True,
    )
    message = models.TextField()
    rating = models.IntegerField(null=True, blank=True, help_text="Valoración 1-5 opcional")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        who = self.subscriber.email if self.subscriber else "anónimo"
        return f"Feedback de {who}"
