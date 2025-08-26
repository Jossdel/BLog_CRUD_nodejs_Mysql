const API_URL_POST = "http://localhost:3000/createblogs";

// 👉 Función para agregar un nuevo blog
const agregarBlog = async () => {
  const title = document.getElementById("title").value.trim().toLowerCase();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Debes llenar todos los campos");
    return;
  }

  // Generar la fecha actual en formato ISO
  const create_At = new Date().toISOString();

  try {
    const res = await fetch(API_URL_POST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, create_At }),
    });

    const data = await res.json();
    console.log("Blog creado:", data);

    alert("✅ Blog creado con éxito");
  } catch (error) {
    console.error("Error enviando blog:", error);
  }

  // limpiar inputs
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  mostrarBlogs(); // refrescar lista
};
const API_URL_GET = "http://localhost:3000/users";
// 👉 Función para mostrar todos los blogs
async function mostrarBlogs() {
  try {
    const res = await fetch(API_URL_GET);
    const blogs = await res.json();

    const contenedor = document.getElementById("blogs");
    contenedor.innerHTML = ""; // limpiar antes de volver a renderizar

    blogs.forEach((blog) => {
      const card = document.createElement("div");
      card.classList.add("blog-card");

      // Formatear la fecha a un estilo legible
      const fecha = new Date(blog.create_At).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      card.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <p class = "fecha" ><em> ${fecha}</em></p>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando blogs:", error);
  }
}

// 👉 Ejecutar al cargar la página
window.onload = mostrarBlogs;
