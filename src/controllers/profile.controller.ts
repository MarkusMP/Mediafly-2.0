import { IGetUserAuthInfoRequest } from "../utils/definitionFile";
import { Request, Response } from "express";
import {
  getProfileById,
  getUsernameExists,
  profileUpdate,
  getProfileByUsername,
} from "../services/profile.service";

// @route   GET api/profile/:profileId
// @desc    Get Profile
// @access  Public
export const fetchProfileById = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const profile = await getProfileById(profileId);

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
};

// @route   GET api/profile/username/:username
// @desc    Get Profile by username
// @access  Public
const fetchProfileByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  const profile = await getProfileByUsername(username);

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
};

// @route   PUT api/profile
// @desc    Update Profile
// @access  Public
const updateProfile = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { username, firstName, lastName, bio, profile_image } = req.body;

  if (username) {
    const usernameExists = await getUsernameExists(username);

    if (usernameExists && usernameExists.username === username) {
      return res.status(409).json({ message: "Username already exists" });
    }
  }

  const updatedProfile = await profileUpdate({
    username,
    firstName,
    lastName,
    bio,
    profile_image,
    id: req.user!.profile_id,
  });

  if (updatedProfile) {
    res.status(200).json(updatedProfile);
  } else {
    res.json(400).json({ message: "Failed to update profile" });
  }
};

export { getProfileById, updateProfile, fetchProfileByUsername };
