from django.http import HttpResponse
from django.views.decorators.http import condition
from forum.models import ForumPost
from datetime import datetime
import xml.etree.ElementTree as ET


def sitemap_latest_timestamp(request):
    """Obtiene la última modificación del sitemap dinámico"""
    try:
        latest_post = ForumPost.objects.latest('updated_at')
        return latest_post.updated_at
    except ForumPost.DoesNotExist:
        return datetime.now()


@condition(last_modified_func=sitemap_latest_timestamp)
def sitemap_xml(request):
    """Genera el sitemap XML dinámico incluyendo posts del foro"""
    
    # Crear el elemento raíz del sitemap
    urlset = ET.Element('urlset')
    urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    
    # URLs estáticas
    static_urls = [
        ('https://em-pulse.com/', 'weekly', '1.0', None),
        ('https://em-pulse.com/#que-es-em', 'monthly', '0.9', None),
        ('https://em-pulse.com/#tipos-y-diagnostico', 'monthly', '0.9', None),
        ('https://em-pulse.com/#sintomas', 'monthly', '0.9', None),
        ('https://em-pulse.com/#salud-mental', 'monthly', '0.9', None),
        ('https://em-pulse.com/#movimiento-y-ejercicio', 'monthly', '0.9', None),
        ('https://em-pulse.com/#noticias', 'daily', '0.8', None),
        ('https://em-pulse.com/#comunidad', 'daily', '0.8', None),
        ('https://em-pulse.com/#habla', 'daily', '0.8', None),
        ('https://em-pulse.com/#politica-privacidad', 'yearly', '0.5', None),
        ('https://em-pulse.com/#terminos-servicio', 'yearly', '0.5', None),
        ('https://em-pulse.com/#gdpr', 'yearly', '0.5', None),
        ('https://em-pulse.com/#icdata', 'monthly', '0.7', None),
        ('https://em-pulse.com/#guias', 'monthly', '0.7', None),
    ]
    
    # Agregar URLs estáticas
    for url, changefreq, priority, lastmod in static_urls:
        url_elem = ET.SubElement(urlset, 'url')
        loc_elem = ET.SubElement(url_elem, 'loc')
        loc_elem.text = url
        
        if lastmod:
            lastmod_elem = ET.SubElement(url_elem, 'lastmod')
            lastmod_elem.text = lastmod.isoformat()
        
        changefreq_elem = ET.SubElement(url_elem, 'changefreq')
        changefreq_elem.text = changefreq
        
        priority_elem = ET.SubElement(url_elem, 'priority')
        priority_elem.text = priority
    
    # Agregar URLs dinámicas de posts del foro (últimos 100)
    posts = ForumPost.objects.all().order_by('-updated_at')[:100]
    for post in posts:
        url_elem = ET.SubElement(urlset, 'url')
        
        loc_elem = ET.SubElement(url_elem, 'loc')
        loc_elem.text = f'https://em-pulse.com/#foro-post-{post.id}'
        
        lastmod_elem = ET.SubElement(url_elem, 'lastmod')
        lastmod_elem.text = post.updated_at.isoformat()
        
        changefreq_elem = ET.SubElement(url_elem, 'changefreq')
        changefreq_elem.text = 'weekly'
        
        priority_elem = ET.SubElement(url_elem, 'priority')
        priority_elem.text = '0.6'
    
    # Convertir a string XML
    xml_str = ET.tostring(urlset, encoding='unicode')
    xml_declaration = '<?xml version="1.0" encoding="UTF-8"?>\n'
    
    return HttpResponse(xml_declaration + xml_str, content_type='application/xml')
