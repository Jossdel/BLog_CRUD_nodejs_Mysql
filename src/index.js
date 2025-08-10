import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/dataSource.js";
import {
  postRouter,
  getRouter,
  getRouterId,
  deleteRouterId,
} from "./routes/user.route.js";

cors();
config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Inicio the la ruta
app.get("/", async (req, res) => {
  res.send("WELCOMEEEE JOSHUAA");
});
//RUTAS
app.use("/users", getRouter);
app.use("/users", getRouterId);
app.use("/users", deleteRouterId);
app.use("/createblogs", postRouter);

//server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
