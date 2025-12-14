from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import requests
import os
from datetime import datetime, timedelta
from .models import News
from .serializers import NewsSerializer


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API solo lectura para noticias/boletines.
    - GET /api/news/      -> lista de noticias
    - GET /api/news/{id}/ -> detalle de una noticia
    - GET /api/news/external/recent/ -> últimas 3 noticias externas sobre EM
    - GET /api/news/external/all/ -> todas las noticias externas sobre EM
    """

    queryset = News.objects.filter(is_active=True).order_by("-published_at")
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def external_recent(self, request):
        """Obtiene las últimas 3 noticias externas sobre Esclerosis Múltiple"""
        try:
            language = request.query_params.get('language', 'both')  # 'es', 'en', 'both'
            external_news = self._fetch_external_news(limit=3, language=language)
            return Response(external_news, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def external_all(self, request):
        """Obtiene todas las noticias externas sobre Esclerosis Múltiple"""
        try:
            language = request.query_params.get('language', 'both')  # 'es', 'en', 'both'
            external_news = self._fetch_external_news(limit=50, language=language)
            return Response(external_news, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _fetch_external_news(self, limit=3, language='both'):
        """
        Obtiene noticias de NewsAPI sobre Esclerosis Múltiple
        Requiere una API key de https://newsapi.org
        
        Args:
            limit: Número máximo de noticias a devolver
            language: 'es' para español, 'en' para inglés, 'both' para ambos
        """
        api_key = os.getenv("NEWS_API_KEY", "")
        
        if not api_key:
            # Noticias de demostración en modo sin API KEY
            demo_news = [
                {
                    "id": 1,
                    "source": "Institutos Nacionales de Salud",
                    "title": "Nuevo avance en tratamiento de Esclerosis Múltiple",
                    "description": "Investigadores descubren un nuevo enfoque terapéutico que muestra resultados prometedores en pacientes con EM.",
                    "url": "https://www.nih.gov",
                    "image_url": None,
                    "published_at": (datetime.now() - timedelta(days=2)).isoformat(),
                },
                {
                    "id": 2,
                    "source": "MS Foundation",
                    "title": "Importancia del ejercicio adaptado en la Esclerosis Múltiple",
                    "description": "Especialistas recomiendan rutinas de ejercicio personalizado para mejorar la calidad de vida de pacientes con EM.",
                    "url": "https://www.msfoundation.org",
                    "image_url": None,
                    "published_at": (datetime.now() - timedelta(days=1)).isoformat(),
                },
                {
                    "id": 3,
                    "source": "Asociación Española de Esclerosis Múltiple",
                    "title": "Jornada de sensibilización sobre Esclerosis Múltiple",
                    "description": "Se celebra una jornada dedicada a aumentar la conciencia sobre la EM y apoyar a los pacientes.",
                    "url": "https://www.aem.es",
                    "image_url": None,
                    "published_at": datetime.now().isoformat(),
                },
                {
                    "id": 4,
                    "source": "Journal of Neurology",
                    "title": "Nuevas terapias inmunológicas para EM",
                    "description": "Un estudio reciente demuestra la efectividad de nuevas terapias inmunológicas en la progresión de la EM.",
                    "url": "https://www.neurology.org",
                    "image_url": None,
                    "published_at": (datetime.now() - timedelta(days=3)).isoformat(),
                },
                {
                    "id": 5,
                    "source": "Patient Advocacy Network",
                    "title": "Apoyo psicológico y salud mental en EM",
                    "description": "La salud mental es crucial en el manejo integral de la Esclerosis Múltiple. Conoce recursos disponibles.",
                    "url": "https://www.patientnetwork.org",
                    "image_url": None,
                    "published_at": (datetime.now() - timedelta(days=5)).isoformat(),
                },
                {
                    "id": 6,
                    "source": "International MS Federation",
                    "title": "Acceso a medicamentos para EM en diferentes países",
                    "description": "Comparativa de disponibilidad y acceso a tratamientos para la Esclerosis Múltiple a nivel mundial.",
                    "url": "https://www.imsfederation.org",
                    "image_url": None,
                    "published_at": (datetime.now() - timedelta(days=7)).isoformat(),
                },
            ]
            
            # Filtrar por idioma si se especifica
            if language in ['es', 'en']:
                # Para demostración, devolvemos todos porque son genéricos
                return demo_news[:limit]
            
            return demo_news[:limit]

        try:
            # Determinar qué búsquedas ejecutar basado en el idioma
            queries = []
            if language in ['es', 'both']:
                queries.append(("esclerosis múltiple OR EM OR \"multiple sclerosis\" OR MS", "es"))
            if language in ['en', 'both']:
                queries.extend([
                    ("multiple sclerosis OR \"MS disease\" OR \"MS patients\" OR \"MS research\"", "en"),
                ])
            
            all_articles = []
            
            for query, query_language in queries:
                url = "https://newsapi.org/v2/everything"
                params = {
                    "q": query,
                    "language": query_language,
                    "sortBy": "publishedAt",
                    "pageSize": 50,  # Aumentado para mejor filtrado
                    "apiKey": api_key,
                }
                
                response = requests.get(url, params=params, timeout=10)
                response.raise_for_status()
                data = response.json()
                
                if data.get("status") == "ok":
                    all_articles.extend(data.get("articles", []))
            
            # Palabras clave para filtrar contenido relevante
            em_keywords = [
                'esclerosis múltiple', 'multiple sclerosis', 'ms',
                'neurología', 'neurology', 'tratamiento', 'treatment',
                'síntomas', 'symptoms', 'investigación', 'research',
                'medicamento', 'medicine', 'therapy', 'terapia',
                'paciente', 'patient', 'enfermedad', 'disease'
            ]
            
            # Palabras clave para excluir contenido no relevante
            exclude_keywords = [
                'microsoft', 'master of science', 'mississippi',
                'motivational speaker', 'military school',
                'ms word', 'ms office', 'ms-dos'
            ]
            
            # Filtrar artículos relevantes
            filtered_articles = []
            for article in all_articles:
                title_lower = (article.get("title", "") or "").lower()
                desc_lower = (article.get("description", "") or "").lower()
                content_lower = (title_lower + " " + desc_lower).lower()
                
                # Excluir si contiene palabras no relevantes
                if any(exclude in content_lower for exclude in exclude_keywords):
                    continue
                
                # Incluir si contiene palabras clave de EM
                if any(keyword in content_lower for keyword in em_keywords):
                    filtered_articles.append(article)
            
            # Eliminar duplicados y ordenar por fecha
            seen_urls = set()
            unique_articles = []
            for article in filtered_articles:
                if article["url"] not in seen_urls:
                    seen_urls.add(article["url"])
                    unique_articles.append(article)
            
            unique_articles.sort(
                key=lambda x: x.get("publishedAt", ""),
                reverse=True
            )
            
            # Formatear respuesta
            formatted_news = []
            for article in unique_articles[:limit]:
                formatted_news.append({
                    "id": hash(article["url"]) % (10 ** 8),
                    "source": article.get("source", {}).get("name", "Unknown"),
                    "title": article.get("title", ""),
                    "description": article.get("description", "") or article.get("content", ""),
                    "url": article.get("url", ""),
                    "image_url": article.get("urlToImage"),
                    "published_at": article.get("publishedAt", ""),
                })
            
            return formatted_news
            
        except requests.exceptions.RequestException as e:
            raise Exception(f"Error al obtener noticias: {str(e)}")
        except Exception as e:
            raise Exception(f"Error procesando noticias: {str(e)}")
