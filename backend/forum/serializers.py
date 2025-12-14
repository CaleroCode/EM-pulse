from rest_framework import serializers
from .models import ForumPost, ForumComment, ForumLike


class ForumCommentSerializer(serializers.ModelSerializer):
    user_has_liked = serializers.SerializerMethodField()

    class Meta:
        model = ForumComment
        fields = ['id', 'author', 'author_avatar', 'content', 'likes', 'created_at', 'user_has_liked']
        read_only_fields = ['id', 'created_at', 'likes']

    def get_user_has_liked(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            user_identifier = self.context.get('user_identifier')
            if user_identifier:
                return ForumLike.objects.filter(user_identifier=user_identifier, comment=obj).exists()
            return False
        return ForumLike.objects.filter(user_identifier=request.user.email, comment=obj).exists()


class ForumPostSerializer(serializers.ModelSerializer):
    comments = ForumCommentSerializer(many=True, read_only=True)
    comments_count = serializers.SerializerMethodField()
    user_has_liked = serializers.SerializerMethodField()

    class Meta:
        model = ForumPost
        fields = ['id', 'author', 'author_avatar', 'title', 'content', 'category', 'likes', 'created_at', 'updated_at', 'comments', 'comments_count', 'user_has_liked']
        read_only_fields = ['id', 'created_at', 'updated_at', 'likes']

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_user_has_liked(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            user_identifier = self.context.get('user_identifier')
            if user_identifier:
                return ForumLike.objects.filter(user_identifier=user_identifier, post=obj).exists()
            return False
        return ForumLike.objects.filter(user_identifier=request.user.email, post=obj).exists()
