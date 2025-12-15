/**
 * Hook personalizado para lazy loading de componentes
 * Reduce el tiempo de carga inicial del sitio
 */
import { lazy, Suspense } from 'react';

export const useLazyComponent = (importFn, fallback = null) => {
  const LazyComponent = lazy(importFn);
  
  return (props) => (
    <Suspense fallback={fallback || <div className="p-4 text-center text-slate-400">Cargando...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Hook para caché en memoria del navegador
 * Evita re-fetchs innecesarios
 */
export const useMemoryCache = (fetchFn, key, ttl = 5 * 60 * 1000) => {
  const cache = new Map();
  
  return async (...args) => {
    const cacheKey = `${key}-${JSON.stringify(args)}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.time < ttl) {
      return cached.data;
    }
    
    const data = await fetchFn(...args);
    cache.set(cacheKey, { data, time: Date.now() });
    return data;
  };
};

/**
 * Hook para intersección (lazy loading de elementos)
 * Carga elementos solo cuando son visibles en pantalla
 */
export const useIntersectionObserver = (ref, options = {}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  
  return isVisible;
};
