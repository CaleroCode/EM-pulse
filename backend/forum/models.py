from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User

CATEGORY_CHOICES = [
    ('general', 'General'),
    ('sintomas', 'Síntomas'),
    ('tratamientos', 'Tratamientos'),
    ('experiencias', 'Experiencias'),
    ('ejercicio', 'Ejercicio y Bienestar'),
    ('ayuda', 'Pedir Ayuda'),
]

class ForumPost(models.Model):
    """Modelo para posts del foro de discusión"""
    author = models.CharField(max_length=100)
    author_avatar = models.TextField(null=True, blank=True, help_text="URL o data URI de la imagen de perfil del autor")
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Post del Foro"
        verbose_name_plural = "Posts del Foro"
    
    def __str__(self):
        return f"{self.title} - {self.author}"


class ForumComment(models.Model):
    """Modelo para comentarios/respuestas en posts"""
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name='comments')
    author = models.CharField(max_length=100)
    author_avatar = models.TextField(null=True, blank=True, help_text="URL o data URI de la imagen de perfil del autor")
    content = models.TextField()
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['created_at']
        verbose_name = "Comentario del Foro"
        verbose_name_plural = "Comentarios del Foro"
    
    def __str__(self):
        return f"Respuesta de {self.author} en '{self.post.title}'"


class ForumLike(models.Model):
    """Modelo para rastrear likes de usuarios en posts y comentarios"""
    user_identifier = models.CharField(max_length=100, help_text="Identificador único del usuario (email o username)")
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name='user_likes', null=True, blank=True)
    comment = models.ForeignKey(ForumComment, on_delete=models.CASCADE, related_name='user_likes', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = [('user_identifier', 'post'), ('user_identifier', 'comment')]
        verbose_name = "Like del Foro"
        verbose_name_plural = "Likes del Foro"
    
    def __str__(self):
        if self.post:
            return f"{self.user_identifier} liked post '{self.post.title}'"
        return f"{self.user_identifier} liked comment"
