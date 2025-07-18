// -------------------- MENÚ HAMBURGUESA --------------------
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
});

// -------------------- NAVEGACIÓN POR SECCIONES --------------------
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  const contentContainer = document.querySelector('.content-container');
  const logoImg = document.querySelector('.navbar img'); // Logo

  const sections = {
    'inicio': `
      <section id="inicio" class="section">
        <h2>Bienvenid@ a EM-PULSE</h2>
        <p>Bienvenido a este espacio dedicado a la esclerosis múltiple, donde podrás comprender mejor los síntomas, tratamientos y cómo convivir con esta condición.</p>
      </section>
    `,
    'que-es': `
      <section id="que-es" class="section">
        <h2>¿Qué es la Esclerosis Múltiple?</h2>
        <p>La esclerosis múltiple es una enfermedad neurológica crónica que afecta al sistema nervioso central, deteriorando la comunicación entre el cerebro y el cuerpo.</p>
      </section>
    `,
    'sintomas': `
      <section id="sintomas" class="section">
        <h2>Síntomas</h2>
        <p>Los síntomas más comunes incluyen fatiga, visión borrosa, entumecimiento, debilidad muscular, dificultades para caminar y problemas cognitivos.</p>
      </section>
    `,
    'tratamientos': `
      <section id="tratamientos" class="section">
        <h2>Tratamientos</h2>
        <p>Existen tratamientos que ayudan a ralentizar la progresión de la enfermedad, controlar brotes y mejorar la calidad de vida del paciente.</p>
      </section>
    `,
    'noticias': `
      <section id="noticias" class="section">
        <h2>Últimas noticias sobre Esclerosis Múltiple</h2>
        <div id="noticias-container">
          <p>Cargando noticias...</p>
        </div>
      </section>
    `,
    'contacto': `
      <section id="contacto" class="section">
        <h2>Contacto</h2>
        <form id="contact-form">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required>

          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required>

          <button type="submit">Enviar</button>

          <div id="errores" style="color: red;"></div>
          <div id="mensajeOk" style="color: green;"></div>
          <div id="form-response"></div>
        </form>
      </section>
    `,
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = e.target.getAttribute('href').substring(1);
      if (sections[sectionId]) {
        contentContainer.innerHTML = sections[sectionId];

        if (sectionId === 'noticias') {
          fetchNoticias();
        }

        if (sectionId === 'contacto') {
          bindFormValidation();
        }
      }
    });
  });

  if (logoImg) {
    logoImg.addEventListener('click', () => {
      contentContainer.innerHTML = sections['inicio'];
    });
  }

  // Cargar la sección de inicio por defecto
  contentContainer.innerHTML = sections['inicio'];
});

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
