import { Router } from "express";
import {
  deleteUserId,
  getuser,
  getUserId,
  postUser,
} from "../controllers/user.controller.js";
let router = Router();
export const getRouter = router.get("/", getuser);
export const postRouter = router.post("/", postUser);
export const getRouterId = router.get("/:id", getUserId);
export const deleteRouterId = router.delete("/:id", deleteUserId);
