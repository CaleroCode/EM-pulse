from rest_framework.routers import DefaultRouter
from django.urls import path
from django.http import JsonResponse
from .views import NewsViewSet
# from .chat_views import chat_em_pulse, ollama_health_check

# Endpoint de prueba
def test_view(request):
    return JsonResponse({'status': 'ok', 'message': 'Communications app is working'})

router = DefaultRouter()
router.register(r"news", NewsViewSet, basename="news")

urlpatterns = [
    path("test/", test_view, name="test"),
    # path("chat-em-pulse/", chat_em_pulse, name="chat-em-pulse"),
    # path("chat-health/", ollama_health_check, name="chat-health"),
] + router.urls
