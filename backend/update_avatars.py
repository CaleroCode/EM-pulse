#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'empulse_backend.settings')
django.setup()

from forum.models import ForumPost, ForumComment

# Avatares de ejemplo para los posts
avatars = {
    "María García": "https://i.pravatar.cc/150?img=1",
    "Carlos López": "https://i.pravatar.cc/150?img=2",
    "Ana Rodríguez": "https://i.pravatar.cc/150?img=3",
    "Miguel Santos": "https://i.pravatar.cc/150?img=4",
    "Dr. Francisco López": "https://i.pravatar.cc/150?img=5",
    "Patricia González": "https://i.pravatar.cc/150?img=6",
    "Roberto Díaz": "https://i.pravatar.cc/150?img=7",
    "Sofia Ruiz": "https://i.pravatar.cc/150?img=8",
    "Vicente Martín": "https://i.pravatar.cc/150?img=9",
    "Trainer Cristian": "https://i.pravatar.cc/150?img=10",
    "Isabel Sánchez": "https://i.pravatar.cc/150?img=11",
    "Marco Antonio": "https://i.pravatar.cc/150?img=12",
    "Javier Pérez": "https://i.pravatar.cc/150?img=13",
    "María del Carmen": "https://i.pravatar.cc/150?img=14",
    "Psicólogo David": "https://i.pravatar.cc/150?img=15",
    "Asociación EM": "https://i.pravatar.cc/150?img=16",
    "Luis García": "https://i.pravatar.cc/150?img=17",
    "Juan Pérez": "https://i.pravatar.cc/150?img=18",
    "Laura Martínez": "https://i.pravatar.cc/150?img=19",
    "David Sánchez": "https://i.pravatar.cc/150?img=20",
    "Elena Fernández": "https://i.pravatar.cc/150?img=21",
    "Isabel Fernández": "https://i.pravatar.cc/150?img=22",
    "Elena González": "https://i.pravatar.cc/150?img=23",
}

print("🔄 Actualizando avatares de posts y comentarios...\n")

# Actualizar posts
for post in ForumPost.objects.all():
    if post.author in avatars:
        post.author_avatar = avatars[post.author]
        post.save()
        print(f"✅ Post: {post.title} - Avatar actualizado")

# Actualizar comentarios
for comment in ForumComment.objects.all():
    if comment.author in avatars:
        comment.author_avatar = avatars[comment.author]
        comment.save()
        print(f"✅ Comentario de {comment.author} - Avatar actualizado")

print("\n✅ Actualización completada!")
