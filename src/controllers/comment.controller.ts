import { IGetUserAuthInfoRequest } from "../utils/definitionFile";
import { Request, Response } from "express";
import {
  commentCreate,
  getAllCommentsByPostId,
  commentDelete,
  getCommentByid,
} from "../services/comment.service";

// @route   POST api/comment/:postId
// @desc    Create comment
// @access  Private
const createComment = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { text } = req.body;

  const { postId } = req.params;

  const comment = await commentCreate(postId, text, req.user?.profile_id);

  if (comment) {
    return res.status(200).json(comment);
  } else {
    return res.status(500).json({
      message: "Something went wrong creating a comment",
    });
  }
};

// @route   GET api/comment/:postId
// @desc    Fetch comments by post id
// @access  Public
const fetchCommentsByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const comments = await getAllCommentsByPostId(postId);

  if (comments) {
    return res.status(200).json(comments);
  } else {
    return res.status(500).json({
      message: "Something went wrong fetching comments",
    });
  }
};

// @route   DELETE api/comment/:commentId
// @desc    Delete comment
// @access  Private
const deleteComment = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { commentId } = req.params;

  const comment = await getCommentByid(commentId);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  try {
    await commentDelete(commentId, req.user?.profile_id);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong deleting a comment",
    });
  }
};

export { createComment, fetchCommentsByPostId, deleteComment };
