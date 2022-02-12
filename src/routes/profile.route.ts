import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  fetchProfileById,
  updateProfile,
  fetchProfileByUsername,
} from "../controllers/profile.controller";
import validate from "../middleware/validateRequest";
import {
  fetchProfileByIdSchema,
  updateProfileSchema,
  fetchProfileByUsernameSchema,
} from "../schemas/profile.schema";

const router = express.Router();

router
  .get("/:profileId", validate(fetchProfileByIdSchema), fetchProfileById)
  .put("/", protect, validate(updateProfileSchema), updateProfile)
  .get(
    "/username/:username",
    validate(fetchProfileByUsernameSchema),
    fetchProfileByUsername
  );

export default router;
