import { object, string } from "yup";

const params = {
  params: object({
    postId: string().required("Post ID is required"),
  }),
};

export const createCommentSchema = object({
  body: object({
    text: string()
      .required("Comment text is required")
      .max(300, "Comment text is too long (max 300 characters)"),
  }),
  ...params,
});

export const fetchCommentsByPostIdSchema = object({
  ...params,
});

export const deleteCommentSchema = object({
  params: object({
    commentId: string().required("Comment ID is required"),
  }),
});
