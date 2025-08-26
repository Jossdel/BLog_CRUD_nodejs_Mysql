import { appDataSource } from "../config/dataSource.js";

// Obtenemos el repositorio de la entidad Blog
const blogUser = appDataSource.getRepository("Blog");

// ===============================
// ✅ Obtener todos los blogs
// ===============================
export const getUser = async (req, res) => {
  try {
    const blogs = await blogUser.find(); // 🔹 trae todos los blogs
    res.json(blogs); // ✅ devuelve un array
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Problem with the server" });
  }
};
// ===============================
// ✅ Crear un nuevo blog
// ===============================
export const postUser = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // 🔹 Crear la entidad
    const newBlog = blogUser.create({ title, description });

    // 🔹 Guardar en la base de datos
    const savedBlog = await blogUser.save(newBlog);

    // 🔹 Devolver respuesta al frontend
    res.status(201).json({
      message: "Blog creado con éxito",
      save: savedBlog,
    });
  } catch (error) {
    console.error("Error al crear blog:", error);
    res.status(500).json({ error: "Problem with the server" });
  }
};

// ===============================
// ✅ Buscar un blog por ID
// ===============================
export const getUserId = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "No se proporcionó ningún id" });
    }

    const userId = Number(id); // 👈 conversión obligatoria

    // Validamos que realmente sea un número
    if (isNaN(userId)) {
      return res.status(400).json({ error: "El id debe ser un número válido" });
    }

    const getIdBlogUser = await blogUser.findOne({ where: { id: userId } });

    if (!getIdBlogUser) {
      return res
        .status(404)
        .json({ error: `No se encontró usuario con id ${id}` });
    }

    res.status(200).json({
      blog: getIdBlogUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Problem with the server" });
  }
};

// ===============================
// ✅ Actualizar un blog por ID
// ===============================
export const updateUserId = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // buscamos el registro a actualizar
    const blogToUpdate = await blogUser.findOne({ where: { id } });

    if (!blogToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    // actualizamos los valores
    blogToUpdate.title = title || blogToUpdate.title;
    blogToUpdate.description = description || blogToUpdate.description;

    // guardamos cambios
    const updatedBlog = await blogUser.save(blogToUpdate);

    res.status(200).json({
      message: `User with id ${id} updated successfully`,
      updated: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ error: "Problem with the server" });
  }
};

// ===============================
// ✅ Eliminar un blog por ID
// ===============================
export const deleteUserId = async (req, res) => {
  const { id } = req.params;

  try {
    // Primero validamos si mandaron un id
    if (!id) {
      return res.status(400).json({ message: "No se proporcionó ningún id" });
    }

    // Intentamos eliminar el usuario
    const result = await blogUser.delete({ id: Number(id) });

    // Si no se eliminó nada (porque no existía el id en DB)
    if (result.affected === 0) {
      return res
        .status(404)
        .json({ message: `No se encontró usuario con id ${id}` });
    }

    // Si todo salió bien
    res
      .status(200)
      .json({ message: `User with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Problem with the server" });
  }
};
