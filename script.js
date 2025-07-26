document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.querySelector('.content-container');

  // Menú hamburguesa
  function bindHamburger() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
      hamburger.onclick = () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
      };
    }
  }

  // Validación de formulario
  function bindFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const errores = document.getElementById("errores");
      const mensajeOk = document.getElementById("mensajeOk");
      const formResponse = document.getElementById("form-response");

      errores.innerHTML = "";
      mensajeOk.textContent = "";
      formResponse.textContent = "";

      let hayErrores = false;

      if (nombre.length < 3) {
        errores.innerHTML += "🔴 El nombre debe tener al menos 3 letras.<br>";
        hayErrores = true;
      }

      if (
        !email.includes("@") ||
        !email.includes(".") ||
        (!email.endsWith(".com") && !email.endsWith(".es"))
      ) {
        errores.innerHTML += "🔴 El correo debe tener un formato válido (.com o .es).<br>";
        hayErrores = true;
      }

      if (!hayErrores) {
        mensajeOk.textContent = "✅ Formulario enviado correctamente.";
        formResponse.textContent = "Mensaje enviado, le responderemos pronto.";
      }
    });
  }

  // Noticias desde API
  async function fetchNoticias() {
    const loader = document.getElementById('noticias-loader');
    loader.style.display = 'block'; // Mostrar loader mientras carga

    const API_KEY = '7b90f2bb076c4c58b58a305bcf742730';
    const query = 'esclerosis múltiple';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=es&pageSize=5&sortBy=publishedAt&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const contenedor = document.getElementById('noticias-container');
      contenedor.innerHTML = '';

      if (!data.articles || data.articles.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron noticias.</p>';
        return;
      }

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
      const contenedor = document.getElementById('noticias-container');
      contenedor.innerHTML = '<p>Error al cargar noticias. Intenta más tarde.</p>';
    } finally {
      loader.style.display = 'none'; // Ocultar loader después de cargar
    }
  }

  // Actualizar última entrada del blog
  function actualizarUltimaEntrada(posts) {
    const postPreview = document.getElementById('latest-post');
    if (!postPreview || posts.length === 0) return;

    const ultima = posts[posts.length - 1];
    const titulo = ultima.querySelector("h2")?.textContent || 'Entrada sin título';
    const id = ultima.id;

    postPreview.innerHTML = `<a href="pages/blog.html#${id}">${titulo}</a>`;
  }

  // Generar índice de entradas en el aside
  function generarIndiceEntradas(posts) {
    const aside = document.querySelector('#indice-entradas ul');
    if (!aside) return;

    aside.innerHTML = '';

    posts.forEach((entrada) => {
      const id = entrada.id;
      const titulo = entrada.querySelector("h2")?.textContent || 'Entrada sin título';

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `blog.html#${id}`;
      a.textContent = titulo;

      li.appendChild(a);
      aside.appendChild(li);
    });
  }

  // Cargar entradas del blog (inicial y dinámica)
function cargarEntradasBlog() {
  const mainContent = document.querySelector("main");
  const blogSidebar = document.getElementById("latest-post");

  fetch("pages/blog.html")
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const posts = doc.querySelectorAll("article.post");
      if (posts.length === 0) {
        mainContent.innerHTML = "No hay entradas disponibles.";
        blogSidebar.innerHTML = "No hay entradas disponibles.";
        return;
      }

      // Cargar última entrada en el sidebar
      const ultimaEntrada = posts[posts.length - 1];
      const tituloUltimaEntrada = ultimaEntrada.querySelector("h2")?.textContent || "Entrada sin título";
      const idUltimaEntrada = ultimaEntrada.id;

      blogSidebar.innerHTML = `
        <h3>Última Entrada</h3>
        <a href="pages/blog.html#${idUltimaEntrada}">${tituloUltimaEntrada}</a>
      `;

      // Cargar todas las entradas en el main
      posts.forEach((post) => {
        const postTitle = post.querySelector("h2")?.textContent || "Entrada sin título";
        const postContent = post.querySelector("p")?.textContent || "Sin contenido disponible.";
        const postId = post.id;

        const postElement = document.createElement("article");
        postElement.classList.add("post");
        postElement.innerHTML = `
          <h2>${postTitle}</h2>
          <p>${postContent}</p>
          <a href="blog.html#${postId}">Leer más...</a>
        `;
        
        mainContent.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error al cargar entradas del blog:", error);
      mainContent.innerHTML = "No se pudieron cargar las entradas.";
      blogSidebar.innerHTML = "No se pudieron cargar las entradas.";
    });
}
  // Cargar secciones externas
  function cargarSeccion(seccion) {
    const url = `pages/${seccion}.html`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Archivo no encontrado: ${url}`);
        return res.text();
      })
      .then(html => {
        contentContainer.innerHTML = html;

        bindHamburger();
        bindFormValidation();
        if (seccion === 'noticias') fetchNoticias();
        if (seccion === 'asociaciones') inicializarCarrusel();
        if (seccion === 'blog') cargarEntradasBlog();
      })
      .catch(error => {
        contentContainer.innerHTML = `<p style="color:red;">❌ Error al cargar ${seccion}.html</p>`;
        console.error(error);
      });
  }

  // Navegación entre secciones
  function bindNavLinks() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const seccion = link.getAttribute('href').substring(1);
        cargarSeccion(seccion);
      });
    });
  }

  // Inicialización
  bindHamburger();
  bindNavLinks();
  bindFormValidation();
  cargarEntradasBlog();
});

// Modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Cambio de idioma (simulado)
function changeLanguage(lang) {
  alert("Idioma cambiado a: " + lang);
}
