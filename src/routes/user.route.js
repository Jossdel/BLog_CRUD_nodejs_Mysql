import { Router } from "express";
import {
  deleteUserId,
  getUser,
  getUserId,
  postUser,
} from "../controllers/user.controller.js";
let router = Router();
export const getRouter = router.get("/", getUser);
export const postRouter = router.post("/", postUser);
export const getRouterId = router.get("/", getUserId);
export const deleteRouterId = router.delete("/", deleteUserId);
