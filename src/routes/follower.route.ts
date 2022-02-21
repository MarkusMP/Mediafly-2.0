import express from "express";
import {
  userFollowSchema,
  userUnFollowSchema,
  fetchFollowersByProfileIdSchema,
  fetchFollowingByProfileIdSchema,
  userIsFollowingSchema,
} from "../schemas/follower.schema";
import { protect } from "../middleware/authMiddleware";
import validate from "../middleware/validateRequest";
import {
  userFollow,
  userUnFollow,
  fetchFollowersByProfileId,
  fetchFollowingProfileId,
  getIsUserFollowing,
} from "../controllers/follower.controller";

const router = express.Router();

router
  .post("/:profileId", protect, validate(userFollowSchema), userFollow)
  .delete("/:profileId", protect, validate(userUnFollowSchema), userUnFollow)
  .get(
    "/followers/:profileId",
    validate(fetchFollowersByProfileIdSchema),
    fetchFollowersByProfileId
  )
  .get(
    "/following/:profileId",
    validate(fetchFollowingByProfileIdSchema),
    fetchFollowingProfileId
  )
  .get(
    "/:profileId",
    protect,
    validate(userIsFollowingSchema),
    getIsUserFollowing
  );

export default router;
