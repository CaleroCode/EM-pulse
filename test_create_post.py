#!/usr/bin/env python
"""
Test para verificar qué está pasando con createPost
"""
import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'empulse_backend.settings')
django.setup()

from django.test import Client
from forum.models import ForumPost

client = Client()

print("\n" + "="*60)
print("TEST 1: Verificar posts actuales en BD")
print("="*60)
posts_before = ForumPost.objects.count()
print(f"Posts en BD antes: {posts_before}")

print("\n" + "="*60)
print("TEST 2: Intentar crear post via API")
print("="*60)

post_data = {
    'author': 'Test Usuario',
    'title': 'Post de Test Ahora',
    'content': 'Contenido de test para verificar que se guarda en Neon',
    'category': 'general',
    'author_avatar': ''
}

print(f"Datos enviados: {json.dumps(post_data, indent=2)}")

response = client.post(
    '/api/forum/posts/',
    data=json.dumps(post_data),
    content_type='application/json'
)

print(f"\nStatus Code: {response.status_code}")
print(f"Response Body: {response.content.decode()}")

print("\n" + "="*60)
print("TEST 3: Verificar posts después de crear")
print("="*60)
posts_after = ForumPost.objects.count()
print(f"Posts en BD después: {posts_after}")

if posts_after > posts_before:
    print(f"\n✅ SUCCESS: Se creó 1 post. Total: {posts_after}")
    new_post = ForumPost.objects.all().order_by('-created_at').first()
    print(f"  - ID: {new_post.id}")
    print(f"  - Título: {new_post.title}")
    print(f"  - Autor: {new_post.author}")
else:
    print(f"\n❌ ERROR: No se creó el post. Sigue habiendo {posts_after}")

print("\n" + "="*60)
