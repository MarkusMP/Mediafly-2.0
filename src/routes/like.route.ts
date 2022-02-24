import express from "express";
import { protect } from "../middleware/authMiddleware";
import validate from "../middleware/validateRequest";
import {
  likePost,
  postUnlike,
  likeComment,
  unlikeComment,
  getIsPostLiked,
  getIsCommentLiked,
} from "../controllers/like.controller";
import {
  likePostSchema,
  unLikePostSchema,
  likeCommentSchema,
  unlikeCommentSchema,
  isLikedPostSchema,
  isUnlikedCommentSchema,
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
  )
  .get(
    "/post/:postId/user",
    protect,
    validate(isLikedPostSchema),
    getIsPostLiked
  )
  .get(
    "/comment/:commentId/user",
    protect,
    validate(isUnlikedCommentSchema),
    getIsCommentLiked
  );

export default router;
