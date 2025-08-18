agregarBlog = () => {
  let agregartitulo = document.getElementById("title").value;
  let agregarDescripcion = document.getElementById("description").value;
  if (agregartitulo === "" || agregarDescripcion === "") {
    alert("The fields cant be empty");
    return;
  }
  let nuevoblog = document.createElement("div");
  nuevoblog.classList.add("blog");
  let titulo = document.createElement("h2");
  titulo.textContent = agregartitulo;
  let descripcion = document.createElement("p");
  descripcion.textContent = agregarDescripcion;

  nuevoblog.appendChild(titulo);
  nuevoblog.appendChild(descripcion);
  document.getElementById("blogs").appendChild(nuevoblog);
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
};
