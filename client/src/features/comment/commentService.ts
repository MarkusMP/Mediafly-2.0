import axios from "axios";
import { ICreateComment, IDeleteComment, ILikeComment } from "./commentSlice";

const createComment = async (data: ICreateComment) => {
  const response = await axios.post(`/api/comment/${data.postId}`, data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return response.data;
};

const fetchCommentsByPostId = async (postId: string) => {
  const response = await axios.get(`/api/comment/${postId}`);

  return response.data;
};

const deleteComment = async (data: IDeleteComment) => {
  const response = await axios.delete(`/api/comment/${data.commentId}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (response.data.message === "Comment deleted successfully") {
    return { message: response.data.message, commentId: data.commentId };
  }
  return response.data;
};

const commentLike = async (data: ILikeComment) => {
  const response = await axios.post(
    `/api/like/comment/${data.commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

const commentUnlike = async (data: ILikeComment) => {
  const response = await axios.delete(`/api/like/comment/${data.commentId}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return response.data;
};

const commentService = {
  createComment,
  fetchCommentsByPostId,
  deleteComment,
  commentLike,
  commentUnlike,
};

export default commentService;
