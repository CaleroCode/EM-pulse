from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ForumPostViewSet, ForumCommentViewSet

router = SimpleRouter()
router.register(r'posts', ForumPostViewSet, basename='forum-post')
router.register(r'comments', ForumCommentViewSet, basename='forum-comment')

urlpatterns = [
    path('', include(router.urls)),
]
