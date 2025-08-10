import { appDataSource } from "../config/dataSource.js";

const blogUser = appDataSource.getRepository("Blog");
//Buscar todos los Ususarios
export const getuser = async (req, res) => {
  try {
    const getblogusers = await blogUser.find();
    res.status(201).json({
      blog: getblogusers,
    });
  } catch (error) {
    res.status(500).json({ error: "Problem with the server" });
  }
};
export const postUser = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBlog = blogUser.create({ title, description });
    const saveBlogUser = await blogUser.save(newBlog);
    res.status(201).json({
      message: "creation success",
      save: saveBlogUser,
    });
  } catch (error) {
    console.error(error); // Para ver el error en consola
    res.status(500).json({ error: "Problem with the server" });
  }
};
//encontrar usuario por el id
export const getUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const getIdBlogUser = await blogUser.findOne({ where: { id } });

    if (!getIdBlogUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("id recibido", id);
    res.status(200).json({
      blog: getIdBlogUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Problem with the server" });
  }
};
// borrar usuario por el id
export const deleteUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteIdBlogUser = await blogUser.delete({ id: Number(id) });

    if (!deleteIdBlogUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: `User with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Problem with the server" });
  }
};
