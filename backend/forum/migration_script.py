"""
Script de migración para transferir datos del Forum desde localStorage (JSON) a Django.

Uso en Django shell:
    python manage.py shell
    >>> exec(open('forum/migration_script.py').read())
    >>> migrate_forum_data(data_dict)
"""

from forum.models import ForumPost, ForumComment


def migrate_forum_data(data_dict):
    """
    Migra datos del Forum desde un diccionario (exportado de localStorage) a la BD.
    
    Args:
        data_dict: Diccionario con la estructura:
        {
            'posts': {
                'general': [...],
                'sintomas': [...],
                ...
            },
            'likedPosts': [...],
            'nextPostId': int,
            'nextReplyId': int
        }
    """
    posts_data = data_dict.get('posts', {})
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


if __name__ == "__main__":
    print("Este script debe ejecutarse desde Django shell:")
    print("python manage.py shell")
    print(">>> exec(open('forum/migration_script.py').read())")
    print(">>> migrate_forum_data(tu_diccionario_de_datos)")
