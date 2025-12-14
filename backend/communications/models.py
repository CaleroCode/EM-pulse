from django.db import models


class News(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    published_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class SubscriberNews(models.Model):
    from subscribers.models import Subscriber  # import dentro para evitar ciclos

    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.CASCADE,
        related_name="news_links",
    )
    news = models.ForeignKey(
        News,
        on_delete=models.CASCADE,
        related_name="subscriber_links",
    )
    sent_at = models.DateTimeField(auto_now_add=True)
    opened_at = models.DateTimeField(null=True, blank=True)
    is_opened = models.BooleanField(default=False)

    class Meta:
        unique_together = ("subscriber", "news")

    def __str__(self):
        return f"{self.news.title} → {self.subscriber.email}"


class NotificationLog(models.Model):
    CHANNEL_CHOICES = [
        ("email", "Email"),
        ("push", "Notificación push"),
        ("sms", "SMS"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pendiente"),
        ("sent", "Enviado"),
        ("failed", "Fallido"),
    ]

    subscriber = models.ForeignKey(
        "subscribers.Subscriber",
        on_delete=models.CASCADE,
        related_name="notifications",
        null=True,
        blank=True,
    )
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)

    def __str__(self):
        return f"{self.channel} → {self.subscriber.email if self.subscriber else 'N/A'} ({self.status})"
