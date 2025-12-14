from django.contrib import admin
from django.urls import path, include
from .sitemaps import sitemap_xml

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # SEO
    path("sitemap.xml", sitemap_xml, name="sitemap"),

    # API
    path("api/", include("subscribers.urls")),
    path("api/", include("health.urls")),
    path("api/forum/", include("forum.urls")),
    # más adelante:
    path("api/", include("communications.urls")),
    # path("api/", include("activity.urls")),
    # path("api/", include("compliance.urls")),
]
