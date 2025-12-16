#!/usr/bin/env python
"""
Test script para verificar la API del foro
Ejecutar: python test_forum_api.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'empulse_backend.settings')
django.setup()

from forum.models import ForumPost

print("=" * 50)
print("TEST: Verificar posts en BD")
print("=" * 50)

total_posts = ForumPost.objects.count()
print(f"\n✓ Total de posts en BD: {total_posts}")

all_posts = ForumPost.objects.all().order_by('-created_at')
print(f"\nPosts (últimos 5):")
for post in all_posts[:5]:
    print(f"  - ID {post.id}: {post.title} ({post.category}) - {post.created_at}")

if total_posts == 0:
    print("\n⚠️  NO HAY POSTS EN LA BD")
else:
    print(f"\n✓ Los {total_posts} posts están en la BD")

# Probar queryset del viewset
from forum.views import ForumPostViewSet
from django.test import RequestFactory

print("\n" + "=" * 50)
print("TEST: Verificar queryset del ViewSet")
print("=" * 50)

factory = RequestFactory()
request = factory.get('/api/forum/posts/')
viewset = ForumPostViewSet()
viewset.request = request
viewset.format_kwarg = None

queryset = viewset.get_queryset()
count = queryset.count()
ids = list(queryset.values_list('id', flat=True))

print(f"\n✓ QuerySet retorna {count} posts")
print(f"  IDs: {ids}")

if count != total_posts:
    print(f"\n⚠️  PROBLEMA: Queryset retorna {count} pero hay {total_posts} en BD")
else:
    print(f"\n✓ QuerySet correcto")

print("\n" + "=" * 50)
