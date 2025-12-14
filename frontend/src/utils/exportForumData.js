/**
 * Script para exportar datos del Forum localStorage a Django
 * Ejecutar en la consola del navegador (F12) cuando estés en la página del Forum
 */

export const exportForumDataToJSON = () => {
  const forumPosts = localStorage.getItem('forumPosts');
  const forumLikedPosts = localStorage.getItem('forumLikedPosts');
  const forumNextPostId = localStorage.getItem('forumNextPostId');
  const forumNextReplyId = localStorage.getItem('forumNextReplyId');

  const data = {
    posts: forumPosts ? JSON.parse(forumPosts) : {},
    likedPosts: forumLikedPosts ? JSON.parse(forumLikedPosts) : [],
    nextPostId: forumNextPostId ? parseInt(forumNextPostId) : 9,
    nextReplyId: forumNextReplyId ? parseInt(forumNextReplyId) : 1,
    exportedAt: new Date().toISOString(),
  };

  console.log(JSON.stringify(data, null, 2));
  
  // Copiar al portapapeles
  const jsonString = JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(jsonString).then(() => {
    console.log('✅ Datos copiados al portapapeles. Puedes pegarlos donde necesites.');
  });

  return data;
};

// Ejecutar en consola: exportForumDataToJSON()
