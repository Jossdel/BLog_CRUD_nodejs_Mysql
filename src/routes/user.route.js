import { Router } from "express";
import {
  deleteUserId,
  getUser,
  getUserId,
  postUser,
} from "../controllers/user.controller.js";
let router = Router();
router.get("/users", getUser);
router.post("/createblogs", postUser);
router.get("/users/:id", getUserId);
router.delete("/users/:id", deleteUserId);

export default router;
