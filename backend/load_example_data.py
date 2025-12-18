# Script para cargar datos de ejemplo en la BD de Neon

from forum.models import ForumPost, ForumComment

posts_data = [
    {
        "author": "María García",
        "title": "Mi experiencia con la fatiga en EM",
        "content": "Hola a todos, quería compartir mi experiencia con la fatiga que experimento diariamente...",
        "category": "experiencias",
    },
    {
        "author": "Juan López",
        "title": "¿Alguien ha probado la fisioterapia?",
        "content": "He estado considerando comenzar fisioterapia. ¿Alguien tiene experiencia con esto?",
        "category": "ejercicio",
    },
    {
        "author": "Ana Rodríguez",
        "title": "Nuevos tratamientos en 2025",
        "content": "He leído que hay nuevos tratamientos que están saliendo este año...",
        "category": "tratamientos",
    },
    {
        "author": "Carlos Martínez",
        "title": "Apoyo emocional - No estoy solo",
        "content": "Encontrar esta comunidad ha sido crucial para mí.",
        "category": "ayuda",
    },
    {
        "author": "Laura Sánchez",
        "title": "Dolor neuropático - ¿Consejos?",
        "content": "El dolor neuropático es uno de mis síntomas más difíciles de manejar...",
        "category": "sintomas",
    },
]

# Crear posts
for post_data in posts_data:
    ForumPost.objects.create(
        author=post_data["author"],
        title=post_data["title"],
        content=post_data["content"],
        category=post_data["category"],
        author_avatar=f"https://ui-avatars.com/api/?name={post_data['author'].replace(' ', '+')}"
    )

print(f"✅ {ForumPost.objects.count()} posts creados en Neon")
