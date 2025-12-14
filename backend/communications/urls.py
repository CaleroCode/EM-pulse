from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import NewsViewSet
from .chat_views import chat_em_pulse, ollama_health_check

router = DefaultRouter()
router.register(r"news", NewsViewSet, basename="news")

urlpatterns = [
    path("chat-em-pulse/", chat_em_pulse, name="chat-em-pulse"),
    path("chat-health/", ollama_health_check, name="chat-health"),
] + router.urls
