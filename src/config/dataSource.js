import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import { userBD } from "../model/user.js";

export const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT), // no olvides el puerto
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Solo desarrollo,
  entities: [userBD],
});
export const connectDB = () => {
  appDataSource
    .initialize()
    .then(() => {
      console.log("Connection to the database Success");
    })
    .catch((error) => {
      console.log("error connecting to the database ", error);
    });
};
