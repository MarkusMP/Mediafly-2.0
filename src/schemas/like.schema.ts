import { object, string } from "yup";

export const likePostSchema = object({
  params: object({
    postId: string().required("Post ID is required"),
  }),
});

export const unLikePostSchema = object({
  params: object({
    postId: string().required("Post ID is required"),
  }),
});

export const likeCommentSchema = object({
  params: object({
    commentId: string().required("Comment ID is required"),
  }),
});

export const unlikeCommentSchema = object({
  params: object({
    commentId: string().required("Comment ID is required"),
  }),
});
export const isUnlikedCommentSchema = object({
  params: object({
    commentId: string().required("Comment ID is required"),
  }),
});

export const isLikedPostSchema = object({
  params: object({
    postId: string().required("Post ID is required"),
  }),
});
