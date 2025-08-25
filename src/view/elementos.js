const API_URL = "http://localhost:3000/createblogs";

const agregarBlog = async () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (!title || !description) {
    alert("Debes llenar todos los campos");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json(); // obtener respuesta del backend
    console.log("Blog creado:", data);

    alert("Blog Created");
  } catch (error) {
    console.error("Error enviando blog:", error);
  }

  // limpiar inputs
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  mostrarBlogs(); // refrescar lista
};

async function mostrarBlogs() {
  try {
    const res = await fetch("http://localhost:3000/createblogs");
    const blogs = await res.json();

    const contenedor = document.getElementById("blogs");
    contenedor.innerHTML = ""; // limpiar antes de volver a renderizar

    blogs.forEach((blog) => {
      const card = document.createElement("div");
      card.classList.add("blog-card");
      card.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando blogs:", error);
  }
}

// Ejecutar al cargar la página
window.onload = mostrarBlogs;
