import { object, string } from "yup";

const params = {
  params: object({
    postId: string().required("Post ID is required"),
  }),
};

export const createPostSchema = object({
  body: object({
    text: string()
      .required("text is required")
      .max(300, { message: "Text should be max 300 characters" }),
    image: string(),
  }),
});

export const fetchAllPostsByProfileIdSchema = object({
  params: object({
    profileId: string().required("Profile ID is required"),
  }),
});

export const fetchPostByidSchema = object({
  ...params,
});

export const deletePostSchema = object({
  ...params,
});
