import express from "express";
import { protect } from "../middleware/authMiddleware";
import validate from "../middleware/validateRequest";
import {
  likePost,
  postUnlike,
  likeComment,
  unlikeComment,
} from "../controllers/like.controller";
import {
  likePostSchema,
  unLikePostSchema,
  likeCommentSchema,
  unlikeCommentSchema,
} from "../schemas/like.schema";

const router = express.Router();

router
  .post("/post/:postId", protect, validate(likePostSchema), likePost)
  .delete("/post/:postId", protect, validate(unLikePostSchema), postUnlike)
  .post(
    "/comment/:commentId",
    protect,
    validate(likeCommentSchema),
    likeComment
  )
  .delete(
    "/comment/:commentId",
    protect,
    validate(unlikeCommentSchema),
    unlikeComment
  );

export default router;
