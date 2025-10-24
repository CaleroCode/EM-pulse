const API_KEY = '7b90f2bb076c4c58b58a305bcf742730';
const query = 'esclerosis múltiple';
const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=es&pageSize=5&sortBy=publishedAt&apiKey=${API_KEY}`;

async function fetchNoticias() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const contenedor = document.getElementById('noticias-container');
    contenedor.innerHTML = '';

    data.articles.forEach((articulo) => {
      const noticia = document.createElement('div');
      noticia.classList.add('noticia');

      noticia.innerHTML = `
        <h3><a href="${articulo.url}" target="_blank">${articulo.title}</a></h3>
        <p>${articulo.description || 'Sin descripción disponible.'}</p>
        <small>${new Date(articulo.publishedAt).toLocaleDateString()}</small>
        <hr>
      `;
      contenedor.appendChild(noticia);
    });
  } catch (error) {
    console.error('Error al cargar noticias:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchNoticias);
