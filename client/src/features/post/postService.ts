import { IPostCreate, IPostDelete, IPostLike } from "./postSlice";
import axios from "axios";

const createPost = async (post: IPostCreate) => {
  const response = await axios.post(
    "/api/post",
    {
      text: post.text,
      ...(post.image && { image: post.image }),
    },
    {
      headers: {
        Authorization: `Bearer ${post.token}`,
      },
    }
  );

  return response.data;
};

const getAllPosts = async () => {
  const response = await axios.get("/api/post");

  return response.data;
};

const deletePost = async (data: IPostDelete) => {
  const response = await axios.delete(`/api/post/${data.postId}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (response.data.message === "Post deleted successfully") {
    return { message: response.data.message, postId: data.postId };
  }
  return response.data;
};

const getAllPostsByProfileId = async (profileId: string) => {
  const response = await axios.get(`/api/post/all/${profileId}`);

  return response.data;
};

const likePost = async (data: IPostLike) => {
  const response = await axios.post(
    `/api/like/post/${data.postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

const unLikePost = async (data: IPostLike) => {
  const response = await axios.delete(`/api/like/post/${data.postId}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return response.data;
};

const postService = {
  createPost,
  getAllPosts,
  deletePost,
  getAllPostsByProfileId,
  likePost,
  unLikePost,
};

export default postService;
