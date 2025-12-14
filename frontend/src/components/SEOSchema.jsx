import { useEffect } from 'react';

/**
 * Agrega Schema.org structured data (JSON-LD) para SEO
 * Mejora la indexación en buscadores y aparición en rich snippets
 */
export function SEOSchema() {
  useEffect(() => {
    // Schema para Organization
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'EM Pulse',
      'alternateName': 'Encefalonmielitis Miálgica',
      'url': 'https://em-pulse.com',
      'logo': 'https://em-pulse.com/logo.png',
      'description': 'Comunidad completa y recursos para pacientes con Encefalonmielitis Miálgica (EM/ME)',
      'sameAs': [
        'https://www.facebook.com/empulse',
        'https://www.instagram.com/empulse',
        'https://www.twitter.com/empulse'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Support',
        'email': 'contacto@em-pulse.com'
      }
    };

    // Schema para WebApplication
    const webAppSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'EM Pulse',
      'url': 'https://em-pulse.com',
      'applicationCategory': 'HealthApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'EUR'
      },
      'features': [
        'Forum comunitario',
        'Información médica verificada',
        'Recursos descargables',
        'Noticias actualizadas',
        'Apoyo entre pacientes'
      ]
    };

    // Schema para HealthAndBeautyBusiness
    const healthBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'HealthAndBeautyBusiness',
      'name': 'EM Pulse',
      'description': 'Comunidad de pacientes y recursos para Encefalonmielitis Miálgica',
      'url': 'https://em-pulse.com',
      'knowsAbout': [
        'Encefalonmielitis Miálgica',
        'ME/CFS',
        'Síndrome de fatiga crónica',
        'Salud mental',
        'Rehabilitación',
        'Ejercicio terapéutico'
      ]
    };

    // Agregar schemas al documento
    const schemas = [organizationSchema, webAppSchema, healthBusinessSchema];
    
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        if (script.innerHTML.includes('EM Pulse')) {
          script.remove();
        }
      });
    };
  }, []);

  return null; // Este componente no renderiza nada, solo agrega scripts
}

export default SEOSchema;
