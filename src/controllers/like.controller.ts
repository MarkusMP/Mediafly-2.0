import { IGetUserAuthInfoRequest } from "../utils/definitionFile";
import { Response } from "express";
import {
  postLike,
  unlikePost,
  commentLike,
  commentUnlike,
} from "../services/like.service";

// @route   POST api/like/post/:postId
// @desc    Like Post
// @access  Private
const likePost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { postId } = req.params;

  try {
    await postLike(postId, req.user!.profile_id);

    return res.status(200).json({
      message: "Successfully liked post",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to like post",
    });
  }
};

// @route   DELETE api/like/post/:postId
// @desc    Unlike post
// @access  Private
const postUnlike = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { postId } = req.params;
  try {
    await unlikePost(req.user!.profile_id, postId);

    return res.status(200).json({
      message: "Successfully unfollowed user",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Failed to unfollow user",
    });
  }
};

// @route   POST api/like/comment/:commentId
// @desc    Like comment
// @access  Private
const likeComment = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { commentId } = req.params;

  try {
    await commentLike(req.user!.profile_id, commentId);

    return res.status(200).json({
      message: "Successfully liked comment",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to like comment",
    });
  }
};

// @route   DELETE api/like/comment/:commentId
// @desc    Unlike comment
// @access  Private
const unlikeComment = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { commentId } = req.params;

  try {
    await commentUnlike(req.user!.profile_id, commentId);
    return res.status(200).json({
      message: "Successfully unfollowed comment",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to unfollow comment",
    });
  }
};

export { likePost, postUnlike, likeComment, unlikeComment };
