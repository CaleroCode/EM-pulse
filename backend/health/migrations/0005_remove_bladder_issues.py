# Generated migration for removing urinary problems symptom

from django.db import migrations

def remove_bladder_issues(apps, schema_editor):
    """Elimina el síntoma Problemas de vejiga si existe"""
    Symptom = apps.get_model('health', 'Symptom')
    Symptom.objects.filter(name="Problemas de vejiga").delete()
    print('✅ Síntoma "Problemas de vejiga" eliminado.')

def reverse_bladder_issues(apps, schema_editor):
    """No hace nada en reversa"""
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('health', '0004_remove_sexual_dysfunction'),
    ]

    operations = [
        migrations.RunPython(remove_bladder_issues, reverse_bladder_issues),
    ]
