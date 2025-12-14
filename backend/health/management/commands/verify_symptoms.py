from django.core.management.base import BaseCommand
import sys

class Command(BaseCommand):
    help = 'Verifica si hay síntomas en la base de datos'

    def handle(self, *args, **options):
        try:
            from health.models import Symptom
            
            count = Symptom.objects.count()
            self.stdout.write(
                self.style.SUCCESS(f'✅ Total de síntomas en la BD: {count}')
            )
            
            if count == 0:
                self.stdout.write(
                    self.style.WARNING('⚠️ No hay síntomas. Ejecuta: python manage.py load_symptoms')
                )
            else:
                self.stdout.write(self.style.SUCCESS('✅ Los síntomas están cargados correctamente'))
                # Listar todos
                symptoms = Symptom.objects.all()
                self.stdout.write('\n📋 Síntomas en la base de datos:')
                for symptom in symptoms:
                    self.stdout.write(f'  • {symptom.name} ({symptom.category})')
                    
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Error: {str(e)}')
            )
            sys.exit(1)
