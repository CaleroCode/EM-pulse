document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.querySelector('.content-container');

  // -------------------- MENÚ HAMBURGUESA --------------------
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

  // -------------------- VALIDACIÓN DE FORMULARIO --------------------
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

  // -------------------- FETCH NOTICIAS DESDE API --------------------
  async function fetchNoticias() {
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
    }
  }

  // -------------------- CARGAR SECCIONES EXTERNAS --------------------
  function cargarSeccion(seccion) {
    const url = `${seccion}.html`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Archivo no encontrado: ${url}`);
        return res.text();
      })
      .then(html => {
        contentContainer.innerHTML = html;

        // Reconectar eventos dentro de contenido dinámico
        bindHamburger();
        bindFormValidation();
        if (seccion === 'noticias') fetchNoticias();
      })
      .catch(error => {
        contentContainer.innerHTML = `<p style="color:red;">❌ Error al cargar ${seccion}.html</p>`;
        console.error(error);
      });
  }

  // -------------------- NAVEGACIÓN ENTRE SECCIONES --------------------
  function bindNavLinks() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const seccion = link.getAttribute('href').substring(1); // Quita el '#' del href
        cargarSeccion(seccion);
      });
    });
  }

  // Inicialización
  bindHamburger();
  bindNavLinks();
  bindFormValidation(); // si tienes el formulario en index.html
});