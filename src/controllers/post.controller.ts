import { IGetUserAuthInfoRequest } from "../utils/definitionFile";
import { Request, Response } from "express";
import {
  postcreate,
  getAllPostsByProfileId,
  getPostById,
  postDelete,
  getPosts,
} from "../services/post.service";

// @route   POST api/post
// @desc    Create new post
// @access  Private
const createPost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { image, text } = req.body;

  const post = await postcreate({ image, text, id: req.user?.profile_id });

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(409).json({ messsage: "Failed to create post" });
  }
};

// @route   GET api/post
// @desc    fetch all posts
// @access  Public
const fetchPosts = async (req: Request, res: Response) => {
  const posts = await getPosts();

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(409).json({ messsage: "Failed to fetch posts" });
  }
};

// @route   GET api/post/all/:profileId
// @desc    Fetch all posts by profileId
// @access  Public
const fetchAllPostsByProfileId = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const posts = await getAllPostsByProfileId(profileId);

  if (posts) {
    res.json(posts);
  } else {
    res.status(404).json({ message: "Failed to find posts" });
  }
};

// @route   GET api/post/:postId
// @desc    Fetch post by id
// @access  Public
const fetchPostById = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const post = await getPostById(postId);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Failed to find post" });
  }
};

// @route   DELETE api/post/:postId
// @desc    Delete post
// @access  Private
const deletePost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { postId } = req.params;

  try {
    await postDelete(postId, req.user?.profile_id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(404).json({
      message: "Post failed to delete",
      error: error,
    });
  }
};

export {
  fetchPostById,
  fetchAllPostsByProfileId,
  createPost,
  deletePost,
  fetchPosts,
};
