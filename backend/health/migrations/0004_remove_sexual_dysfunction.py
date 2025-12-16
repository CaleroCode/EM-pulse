# Generated migration for removing sexual dysfunction symptom

from django.db import migrations

def remove_dysfunction_sexual(apps, schema_editor):
    """Elimina el síntoma Disfunción sexual si existe"""
    Symptom = apps.get_model('health', 'Symptom')
    Symptom.objects.filter(name="Disfunción sexual").delete()
    print('✅ Síntoma "Disfunción sexual" eliminado.')

def reverse_dysfunction_sexual(apps, schema_editor):
    """No hace nada en reversa"""
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('health', '0003_add_indexes'),
    ]

    operations = [
        migrations.RunPython(remove_dysfunction_sexual, reverse_dysfunction_sexual),
    ]
