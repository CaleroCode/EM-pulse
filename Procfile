release: cd backend && python manage.py migrate && python manage.py load_symptoms
web: cd backend && gunicorn empulse_backend.wsgi:application --bind 0.0.0.0:$PORT --workers 4 --worker-class sync --timeout 120
