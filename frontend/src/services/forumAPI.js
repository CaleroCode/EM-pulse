import { forumStorage } from '../utils/forumStorage.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_FORUM_URL = `${API_BASE_URL}/api/forum`;

export const forumAPI = {
  /**
   * Obtener todos los posts (desde servidor, con fallback a localStorage)
   * NO sobrescribe posts locales pendientes - los mergea
   */
  getPosts: async (category = null, search = null, userIdentifier = null) => {
    try {
      let url = `${API_FORUM_URL}/posts/`;
      const params = [];
      
      if (category) params.push(`category=${category}`);
      if (search) params.push(`search=${search}`);
      if (userIdentifier) params.push(`user_identifier=${encodeURIComponent(userIdentifier)}`);
      
      if (params.length > 0) url += '?' + params.join('&');
      
      const response = await fetch(url, { timeout: 5000 });
      if (!response.ok) throw new Error('Error al obtener posts');
      const data = await response.json();
      
      // Si es respuesta paginada de DRF, extraer results
      let posts = [];
      if (data && typeof data === 'object' && 'results' in data) {
        posts = Array.isArray(data.results) ? data.results : [];
      } else if (Array.isArray(data)) {
        posts = data;
      }
      
      // Mergear posts del servidor con posts locales pendientes
      if (posts.length > 0) {
        const localPosts = forumStorage.getPosts();
        const mergedPosts = forumAPI.mergePosts(posts, localPosts);
        forumStorage.savePosts(mergedPosts);
        return mergedPosts;
      }
      
      return posts;
    } catch (error) {
      console.warn('Error al obtener posts del servidor, usando localStorage:', error);
      // Fallback: obtener posts del localStorage
      const localPosts = forumStorage.getPosts();
      if (localPosts.length > 0) {
        console.log(`Usando ${localPosts.length} posts del almacenamiento local`);
        return localPosts;
      }
      return [];
    }
  },

  /**
   * Mergear posts del servidor con posts locales pendientes
   * Mantiene posts locales pendientes y actualiza posts del servidor
   */
  mergePosts: (serverPosts, localPosts) => {
    // Posts locales que están pendientes (tiene ID temporal)
    const pendingLocalPosts = localPosts.filter(
      p => p.is_local || (typeof p.id === 'string' && p.id.startsWith('temp_'))
    );
    
    // Crear mapa de IDs para búsqueda rápida
    const serverPostMap = new Map();
    serverPosts.forEach(post => {
      serverPostMap.set(post.id, post);
    });
    
    // Combinar: posts del servidor + posts locales pendientes
    const merged = [...serverPosts];
    
    // Agregar posts locales que no están en el servidor
    pendingLocalPosts.forEach(localPost => {
      if (!serverPostMap.has(localPost.id)) {
        merged.unshift(localPost);
      }
    });
    
    // Ordenar por fecha (más recientes primero)
    return merged.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  },

  /**
   * Crear un nuevo post (guardar en BD Neon solo, sin fallback a localStorage)
   */
  createPost: async (postData) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        const errorMsg = responseData?.detail || responseData?.error || responseData?.errors || 'Error al crear post';
        throw new Error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
      }
      
      return responseData;
    } catch (error) {
      // No hay fallback a localStorage - lanzar error directamente
      console.error('Error creating post in Neon:', error);
      throw error;
    }
  },

  /**
   * Actualizar un post
   */
  updatePost: async (postId, postData) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/posts/${postId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('Error al actualizar post');
      return await response.json();
    } catch (error) {
      console.error('Error en updatePost:', error);
      throw error;
    }
  },

  /**
   * Eliminar un post
   */
  deletePost: async (postId) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/posts/${postId}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar post');
      return true;
    } catch (error) {
      console.error('Error en deletePost:', error);
      throw error;
    }
  },

  /**
   * Dar like a un post
   */
  likePost: async (postId, userIdentifier) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/posts/${postId}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_identifier: userIdentifier }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData?.error || 'Error al dar like';
        throw new Error(errorMsg);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en likePost:', error);
      throw error;
    }
  },

  /**
   * Quitar like de un post
   */
  unlikePost: async (postId, userIdentifier) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/posts/${postId}/unlike/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_identifier: userIdentifier }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData?.error || 'Error al quitar like';
        throw new Error(errorMsg);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en unlikePost:', error);
      throw error;
    }
  },

  /**
   * Agregar comentario a un post (guardar en BD Neon solo, sin fallback a localStorage)
   */
  addComment: async (postId, commentData) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/posts/${postId}/add_comment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData?.detail || errorData?.error || 'Error al agregar comentario';
        throw new Error(errorMsg);
      }
      const responseData = await response.json();
      
      return responseData;
    } catch (error) {
      // No hay fallback a localStorage - lanzar error directamente
      console.error('Error adding comment to Neon:', error);
      throw error;
    }
  },

  /**
   * Eliminar comentario
   */
  deleteComment: async (commentId) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/comments/${commentId}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar comentario');
      return true;
    } catch (error) {
      console.error('Error en deleteComment:', error);
      throw error;
    }
  },

  /**
   * Dar like a un comentario
   */
  likeComment: async (commentId, userIdentifier) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/comments/${commentId}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_identifier: userIdentifier }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData?.error || 'Error al dar like';
        throw new Error(errorMsg);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en likeComment:', error);
      throw error;
    }
  },

  /**
   * Quitar like de un comentario
   */
  unlikeComment: async (commentId, userIdentifier) => {
    try {
      const response = await fetch(`${API_FORUM_URL}/comments/${commentId}/unlike/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_identifier: userIdentifier }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData?.error || 'Error al quitar like';
        throw new Error(errorMsg);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en unlikeComment:', error);
      throw error;
    }
  },
};
