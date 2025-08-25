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
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);
config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Inicio the la ruta
app.get("/", async (req, res) => {
  res.send("WELCOMEEEE JOSHUAA");
});
//RUTAS
app.use("/users", getRouter);
app.use("/users/:id", getRouterId);
app.use("/users/:id", deleteRouterId);
app.use("/createblogs", postRouter);

//server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
