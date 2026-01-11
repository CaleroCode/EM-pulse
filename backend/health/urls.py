from rest_framework.routers import SimpleRouter
from .views import SymptomViewSet

router = SimpleRouter()
router.register(r"symptoms", SymptomViewSet, basename="symptom")

urlpatterns = router.urls
