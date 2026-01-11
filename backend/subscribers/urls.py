from rest_framework.routers import SimpleRouter
from .views import SubscriberViewSet, AuthViewSet

router = SimpleRouter()
router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"subscribers", SubscriberViewSet, basename="subscriber")

urlpatterns = router.urls
