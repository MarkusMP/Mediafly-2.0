import { IGetUserAuthInfoRequest } from "../utils/definitionFile";
import { Request, Response } from "express";
import {
  followUser,
  unFollowUser,
  getFollowersByProfileId,
  getFollowingProfileById,
  isUserFollowing,
} from "../services/follower.service";

// @route   POST api/follower
// @desc    Follow user
// @access  Private
const userFollow = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { profileId } = req.params;

  try {
    if (req.user) {
      await followUser(req.user.profile_id, profileId);

      return res.status(200).json({
        message: "Successfully followed user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Failed to follow user",
    });
  }
};

// @route   DELETE api/follower
// @desc    UnFollow user
// @access  Private
const userUnFollow = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { profileId } = req.params;
  try {
    if (req.user) {
      await unFollowUser(req.user?.profile_id, profileId);
    }

    return res.status(200).json({
      message: "Successfully unfollowed user",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Failed to unfollow user",
    });
  }
};

// @route   GET api/follower/:profileId
// @desc    Fetch followers by profile id
// @access  Public
const getIsUserFollowing = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const { profileId } = req.params;

  if (!req.user?.profile_id) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const following = await isUserFollowing(req.user!.profile_id, profileId);

  try {
    if (following) {
      return res.status(200).json({
        message: "User is following",
      });
    } else {
      return res.status(200).json({
        message: "User is not following",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Failed to fetch following user",
    });
  }
};

// @route   GET api/follower/followers/:profileId
// @desc    Fetch followers by user id
// @access  Public
const fetchFollowersByProfileId = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const followers = await getFollowersByProfileId(profileId);

  if (followers) {
    res.json(followers);
  } else {
    return res.status(404).json({
      message: "Followers not found",
    });
  }
};

// @route   GET api/follower/following/:profileId
// @desc    Fetch following by profile id
// @access  Public
const fetchFollowingProfileId = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const followers = await getFollowingProfileById(profileId);

  if (followers) {
    res.json(followers);
  } else {
    return res.status(404).json({
      message: "Following users not found",
    });
  }
};

export {
  userFollow,
  userUnFollow,
  fetchFollowersByProfileId,
  fetchFollowingProfileId,
  getIsUserFollowing,
};
