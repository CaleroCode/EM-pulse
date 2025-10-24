document.addEventListener('DOMContentLoaded', () => {
  fetch('blog.html')
    .then(response => response.text())
    .then(html => {
      console.log(html);

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      const firstPost = tempDiv.querySelector('article.post h2');
      if (firstPost) {
        const title = firstPost.textContent.trim();
        const postId = firstPost.closest('article')?.id || '';
        const postLink = postId ? `blog.html#${postId}` : 'blog.html';

        document.getElementById('latest-post').innerHTML = 
          `<a href="${postLink}" target="_blank">${title}</a>`;
      } else {
        document.getElementById('latest-post').textContent = 'No hay entradas disponibles.';
      }
    })
    .catch(error => {
      console.error('Error al cargar el blog:', error);
      document.getElementById('latest-post').textContent = 'No se pudo cargar la entrada.';
    });
});
