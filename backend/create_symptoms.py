#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'empulse_backend.settings')
django.setup()

from health.models import Symptom

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
        "name": "Espasticidad",
        "description": "Tensión muscular involuntaria que causa rigidez y dificultad para moverse.",
        "category": "Motriz"
    },
    {
        "name": "Disfunción urinaria",
        "description": "Problemas con el control de la vejiga o urgencia para orinar.",
        "category": "Fisiológico"
    }
]

print("Creando síntomas...")
for symptom_data in symptoms_data:
    symptom, created = Symptom.objects.get_or_create(
        name=symptom_data["name"],
        defaults={
            "description": symptom_data["description"],
            "category": symptom_data["category"],
            "is_active": True
        }
    )
    if created:
        print(f"✓ Creado: {symptom.name}")
    else:
        print(f"→ Ya existe: {symptom.name}")

print(f"\n✅ Total de síntomas en la base de datos: {Symptom.objects.count()}")
