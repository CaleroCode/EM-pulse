from django.db import models


class Symptom(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class SubscriberSymptom(models.Model):
    SEVERITY_SCALE = [(i, str(i)) for i in range(1, 11)]  # 1-10

    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.CASCADE,
        related_name="reported_symptoms",
    )
    symptom = models.ForeignKey(
        Symptom,
        on_delete=models.CASCADE,
        related_name="reports",
    )
    severity = models.IntegerField(choices=SEVERITY_SCALE)
    reported_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.subscriber.email} - {self.symptom.name} ({self.severity})"


class Diagnosis(models.Model):
    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.CASCADE,
        related_name="diagnoses",
    )
    summary = models.TextField()
    confidence = models.FloatField(help_text="0.0 a 1.0")
    created_at = models.DateTimeField(auto_now_add=True)
    source = models.CharField(
        max_length=50,
        default="system",
        help_text="Origen del diagnóstico (ej: system, clinician, imported)",
    )

    def __str__(self):
        return f"Diagnóstico para {self.subscriber.email} ({self.confidence})"


class ModelOutput(models.Model):
    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.SET_NULL,
        related_name="model_outputs",
        null=True,
        blank=True,
    )
    model_name = models.CharField(max_length=150)
    input_data = models.JSONField()
    output_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(blank=True, default=dict)

    def __str__(self):
        return f"{self.model_name} → {self.subscriber.email if self.subscriber else 'sin suscriptor'}"
