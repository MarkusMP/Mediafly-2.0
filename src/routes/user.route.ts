import {
  registerUser,
  loginUser,
  fetchUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import validate from "../middleware/validateRequest";
import express from "express";
import {
  createUserSchema,
  loginUserSchema,
  fetchUserByIdSchema,
  updateUserSchema,
} from "../schemas/user.schema";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router
  .post("/", validate(createUserSchema), registerUser)
  .post("/login", validate(loginUserSchema), loginUser)
  .get("/:userId", validate(fetchUserByIdSchema), fetchUserById)
  .put("/", protect, validate(updateUserSchema), updateUser)
  .delete("/", protect, deleteUser);

export default router;
