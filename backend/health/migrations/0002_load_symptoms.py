from django.db import migrations

def load_symptoms(apps, schema_editor):
    """Carga síntomas iniciales en la base de datos"""
    Symptom = apps.get_model('health', 'Symptom')
    
    symptoms_data = [
        {
            "name": "Fatiga",
            "description": "Cansancio extremo que afecta las actividades diarias. Es uno de los síntomas más comunes en la EM.",
            "category": "General"
        },
        {
            "name": "Problemas de visión",
            "description": "Visión borrosa, pérdida temporal de visión en un ojo o cambios en la percepción de colores.",
            "category": "Neurológico"
        },
        {
            "name": "Entumecimiento",
            "description": "Pérdida de sensibilidad en extremidades o partes del cuerpo, generalmente en manos y pies.",
            "category": "Sensorial"
        },
        {
            "name": "Debilidad muscular",
            "description": "Pérdida de fuerza en los músculos que puede afectar la movilidad y el equilibrio.",
            "category": "Motriz"
        },
        {
            "name": "Problemas de coordinación",
            "description": "Dificultad para coordinar movimientos, temblores o falta de equilibrio.",
            "category": "Motriz"
        },
        {
            "name": "Dolor",
            "description": "Dolor crónico que puede ser neuropático, muscular o articular.",
            "category": "General"
        },
        {
            "name": "Problemas cognitivos",
            "description": "Dificultades de concentración, memoria o procesamiento de información.",
            "category": "Cognitivo"
        },
        {
            "name": "Depresión",
            "description": "Alteraciones del estado de ánimo y bienestar emocional.",
            "category": "Psicológico"
        },
        {
            "name": "Ansiedad",
            "description": "Sentimientos de preocupación y nerviosismo que pueden interferir en la vida diaria.",
            "category": "Psicológico"
        },
        {
            "name": "Espasticidad",
            "description": "Rigidez muscular y contracciones involuntarias que causan tensión y dolor.",
            "category": "Motriz"
        },
        {
            "name": "Problemas de vejiga",
            "description": "Incontinencia, retención de orina o urgencia para orinar frecuentemente.",
            "category": "Urológico"
        },
        {
            "name": "Disfunción sexual",
            "description": "Cambios en el deseo sexual o dificultades en la función sexual.",
            "category": "General"
        },
    ]

    created_count = 0
    for symptom_data in symptoms_data:
        symptom, created = Symptom.objects.get_or_create(
            name=symptom_data['name'],
            defaults={
                'description': symptom_data['description'],
                'category': symptom_data['category']
            }
        )
        if created:
            created_count += 1
            print(f'✅ Creado: {symptom.name}')
        else:
            print(f'⚠️ Ya existe: {symptom.name}')

    print(f'\n✅ Migración completada. {created_count} síntomas creados.')


def reverse_symptoms(apps, schema_editor):
    """Elimina los síntomas cargados"""
    Symptom = apps.get_model('health', 'Symptom')
    Symptom.objects.all().delete()
    print('⚠️ Síntomas eliminados.')


class Migration(migrations.Migration):

    dependencies = [
        ('health', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_symptoms, reverse_symptoms),
    ]
