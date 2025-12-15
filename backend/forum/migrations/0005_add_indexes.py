# Generated migration for adding database indexes for forum

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0004_forumcomment_likes_forumlike'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='forumpost',
            index=models.Index(fields=['category', '-created_at'], name='forum_post_category_date_idx'),
        ),
        migrations.AddIndex(
            model_name='forumpost',
            index=models.Index(fields=['-created_at'], name='forum_post_date_idx'),
        ),
        migrations.AddIndex(
            model_name='forumcomment',
            index=models.Index(fields=['post', 'created_at'], name='forum_comment_post_date_idx'),
        ),
        migrations.AddIndex(
            model_name='forumlike',
            index=models.Index(fields=['user_identifier', 'post'], name='forum_like_user_post_idx'),
        ),
    ]
