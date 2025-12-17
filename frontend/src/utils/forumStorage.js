/**
 * Utilidad para gestionar persistencia de datos del foro en localStorage
 * Actúa como respaldo cuando la API no está disponible
 */

const STORAGE_KEYS = {
  POSTS: 'forum_posts_db',
  SYNC_QUEUE: 'forum_sync_queue',
  LAST_SYNC: 'forum_last_sync',
};

export const forumStorage = {
  /**
   * Obtener todos los posts del localStorage
   */
  getPosts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.POSTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading posts from storage:', error);
      return [];
    }
  },

  /**
   * Guardar todos los posts en localStorage
   */
  savePosts: (posts) => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error saving posts to storage:', error);
      return false;
    }
  },

  /**
   * Agregar un nuevo post al localStorage
   */
  addPost: (post) => {
    try {
      const posts = forumStorage.getPosts();
      // Si el post no tiene ID (es local), asignar uno temporal
      if (!post.id) {
        post.id = `temp_${Date.now()}_${Math.random()}`;
        post.is_local = true;
      }
      posts.unshift(post);
      forumStorage.savePosts(posts);
      return post;
    } catch (error) {
      console.error('Error adding post to storage:', error);
      return null;
    }
  },

  /**
   * Actualizar un post en localStorage
   */
  updatePost: (postId, updates) => {
    try {
      const posts = forumStorage.getPosts();
      const postIndex = posts.findIndex(p => p.id === postId || p.id === parseInt(postId));
      if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...updates };
        forumStorage.savePosts(posts);
        return posts[postIndex];
      }
      return null;
    } catch (error) {
      console.error('Error updating post in storage:', error);
      return null;
    }
  },

  /**
   * Eliminar un post del localStorage
   */
  deletePost: (postId) => {
    try {
      let posts = forumStorage.getPosts();
      posts = posts.filter(p => p.id !== postId && p.id !== parseInt(postId));
      forumStorage.savePosts(posts);
      return true;
    } catch (error) {
      console.error('Error deleting post from storage:', error);
      return false;
    }
  },

  /**
   * Agregar un comentario a un post en localStorage
   */
  addCommentToPost: (postId, comment) => {
    try {
      const posts = forumStorage.getPosts();
      const post = posts.find(p => p.id === postId || p.id === parseInt(postId));
      
      if (post) {
        if (!comment.id) {
          comment.id = `temp_${Date.now()}_${Math.random()}`;
          comment.is_local = true;
        }
        if (!post.comments) {
          post.comments = [];
        }
        post.comments.push(comment);
        forumStorage.savePosts(posts);
        return comment;
      }
      return null;
    } catch (error) {
      console.error('Error adding comment to storage:', error);
      return null;
    }
  },

  /**
   * Sincronizar posts del localStorage con el servidor
   * Retorna posts que se sincronizaron correctamente
   */
  syncWithServer: async (forumAPI) => {
    try {
      const localPosts = forumStorage.getPosts();
      let syncedCount = 0;
      const syncedPosts = [];

      for (const post of localPosts) {
        // Si el post tiene ID local (temporal), intentar guardarlo en servidor
        if (post.is_local || (typeof post.id === 'string' && post.id.startsWith('temp_'))) {
          try {
            // Crear en el servidor
            const serverPost = await forumAPI.createPost({
              author: post.author,
              author_avatar: post.author_avatar,
              title: post.title,
              content: post.content,
              category: post.category,
            });
            
            // Actualizar localmente con el ID del servidor
            if (serverPost && serverPost.id) {
              forumStorage.updatePost(post.id, {
                id: serverPost.id,
                is_local: false,
                created_at: serverPost.created_at,
                updated_at: serverPost.updated_at,
              });
              syncedCount++;
              syncedPosts.push(serverPost);
            }
          } catch (error) {
            console.warn(`No se pudo sincronizar post ${post.id}:`, error);
          }
        }
      }

      return { syncedCount, syncedPosts };
    } catch (error) {
      console.error('Error during sync:', error);
      return { syncedCount: 0, syncedPosts: [] };
    }
  },

  /**
   * Limpiar localStorage (útil para testing o reset)
   */
  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.POSTS);
      localStorage.removeItem(STORAGE_KEYS.SYNC_QUEUE);
      localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  /**
   * Obtener estadísticas de almacenamiento
   */
  getStats: () => {
    const posts = forumStorage.getPosts();
    const localPosts = posts.filter(p => p.is_local || (typeof p.id === 'string' && p.id.startsWith('temp_')));
    const serverPosts = posts.filter(p => !p.is_local && typeof p.id === 'number');
    
    return {
      totalPosts: posts.length,
      localPosts: localPosts.length,
      serverPosts: serverPosts.length,
      lastSync: localStorage.getItem(STORAGE_KEYS.LAST_SYNC),
    };
  },
};
