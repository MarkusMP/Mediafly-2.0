import express from "express";
import { protect } from "../middleware/authMiddleware";
import validate from "../middleware/validateRequest";
import {
  createCommentSchema,
  fetchCommentsByPostIdSchema,
  deleteCommentSchema,
} from "../schemas/comment.schema";
import {
  createComment,
  fetchCommentsByPostId,
  deleteComment,
} from "../controllers/comment.controller";

const router = express.Router();

router
  .post("/:postId", protect, validate(createCommentSchema), createComment)
  .get("/:postId", validate(fetchCommentsByPostIdSchema), fetchCommentsByPostId)
  .delete("/:commentId", protect, validate(deleteCommentSchema), deleteComment);

export default router;
