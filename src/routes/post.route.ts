import express from "express";
import validate from "../middleware/validateRequest";
import {
  createPost,
  fetchAllPostsByProfileId,
  fetchPostById,
  deletePost,
} from "../controllers/post.controller";
import {
  createPostSchema,
  fetchAllPostsByProfileIdSchema,
  fetchPostByidSchema,
  deletePostSchema,
} from "../schemas/post.schema";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router
  .post("/", protect, validate(createPostSchema), createPost)
  .get(
    "/all/:profileId",
    validate(fetchAllPostsByProfileIdSchema),
    fetchAllPostsByProfileId
  )
  .get("/:postId", validate(fetchPostByidSchema), fetchPostById)
  .delete("/:postId", protect, validate(deletePostSchema), deletePost);
export default router;
