from django.contrib import admin
from .models import ForumPost, ForumComment, ForumLike

@admin.register(ForumPost)
class ForumPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'likes', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'content', 'author')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Información del Post', {
            'fields': ('title', 'author', 'content', 'category')
        }),
        ('Estadísticas', {
            'fields': ('likes',)
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ForumComment)
class ForumCommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'likes', 'created_at')
    list_filter = ('created_at', 'post')
    search_fields = ('content', 'author', 'post__title')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Información', {
            'fields': ('post', 'author', 'content')
        }),
        ('Estadísticas', {
            'fields': ('likes',)
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ForumLike)
class ForumLikeAdmin(admin.ModelAdmin):
    list_display = ('user_identifier', 'post', 'comment', 'created_at')
    list_filter = ('created_at', 'post', 'comment')
    search_fields = ('user_identifier', 'post__title', 'comment__content')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Usuario', {
            'fields': ('user_identifier',)
        }),
        ('Contenido', {
            'fields': ('post', 'comment')
        }),
        ('Fecha', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
