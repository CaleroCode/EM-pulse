#!/usr/bin/env python
import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'empulse_backend.settings')
django.setup()

from forum.models import ForumPost, ForumComment

def migrate_forum_data():
    # Leer los datos
    with open('forum_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    posts_data = data.get('posts', {})
    total_posts = 0
    total_comments = 0

    print("🔄 Iniciando migración de datos del Forum...\n")

    # Iterar sobre todas las categorías
    for category_id, posts_list in posts_data.items():
        print(f"📂 Procesando categoría: {category_id}")
        
        for post_data in posts_list:
            try:
                # Crear el post
                forum_post = ForumPost.objects.create(
                    author=post_data.get('author', 'Anónimo'),
                    title=post_data.get('title', 'Sin título'),
                    content=post_data.get('content', ''),
                    category=category_id,
                    likes=post_data.get('likes', 0),
                )
                total_posts += 1
                
                # Crear los comentarios del post
                comments = post_data.get('comments', [])
                for comment_data in comments:
                    ForumComment.objects.create(
                        post=forum_post,
                        author=comment_data.get('author', 'Anónimo'),
                        content=comment_data.get('content', ''),
                    )
                    total_comments += 1
                
                print(f"  ✅ Post: '{post_data.get('title', 'Sin título')}' - {len(comments)} comentarios")
                
            except Exception as e:
                print(f"  ❌ Error al crear post: {e}")
                continue

    print(f"\n✅ Migración completada!")
    print(f"   - Posts creados: {total_posts}")
    print(f"   - Comentarios creados: {total_comments}")

if __name__ == '__main__':
    migrate_forum_data()
