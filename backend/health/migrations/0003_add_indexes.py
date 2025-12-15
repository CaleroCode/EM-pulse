# Generated migration for adding database indexes

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('health', '0002_load_symptoms'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='symptom',
            index=models.Index(fields=['is_active', 'name'], name='health_symptom_active_name_idx'),
        ),
        migrations.AddIndex(
            model_name='symptom',
            index=models.Index(fields=['category'], name='health_symptom_category_idx'),
        ),
        migrations.AddIndex(
            model_name='subscribersymptom',
            index=models.Index(fields=['subscriber', 'reported_at'], name='health_subsympt_subscriber_date_idx'),
        ),
    ]
