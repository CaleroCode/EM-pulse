from rest_framework.routers import DefaultRouter
from .views import SubscriberViewSet, AuthViewSet

router = DefaultRouter()
router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"subscribers", SubscriberViewSet, basename="subscriber")

urlpatterns = router.urls
