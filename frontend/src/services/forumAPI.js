const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_FORUM_URL = `${API_BASE_URL}/api/forum`;

export const forumAPI = {
  /**
   * Obtener todos los posts
   */
  getPosts: async (category = null, search = null, userIdentifier = null) => {
    try {
      let url = `${API_FORUM_URL}/posts/`;
      const params = [];
      
      if (category) params.push(`category=${category}`);
      if (search) params.push(`search=${search}`);
      if (userIdentifier) params.push(`user_identifier=${encodeURIComponent(userIdentifier)}`);
      
      if (params.length > 0) url += '?' + params.join('&');
      
      console.log('Obteniendo posts desde:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener posts');
      const data = await response.json();
      console.log('Datos obtenidos:', data);
      
      // Si es respuesta paginada de DRF, extraer results
      if (data && typeof data === 'object' && 'results' in data) {
        console.log('Respuesta paginada detectada, retornando results');
        return Array.isArray(data.results) ? data.results : [];
      }
      
      // Si es un array directo
      if (Array.isArray(data)) {
        console.log('Respuesta es array directo');
        return data;
      }
      
      console.warn('Respuesta inesperada:', data);
      return [];
    } catch (error) {
      console.error('Error en getPosts:', error);
      return [];
    }
  },

  /**
   * Crear un nuevo post
   */
  createPost: async (postData) => {
    try {
      console.log('Enviando post:', postData);
      const response = await fetch(`${API_FORUM_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      console.log('Respuesta status:', response.status);
      const responseData = await response.json();
      console.log('Respuesta data:', responseData);
      
      if (!response.ok) {
        const errorMsg = responseData?.detail || responseData?.error || responseData?.errors || 'Error al crear post';
        console.error('Error response:', errorMsg);
        throw new Error(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg);
      }
      return responseData;
    } catch (error) {
      console.error('Error en createPost:', error);
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
   * Agregar comentario a un post
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
      return await response.json();
    } catch (error) {
      console.error('Error en addComment:', error);
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
