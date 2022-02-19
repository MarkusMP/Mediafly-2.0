import { object, string } from "yup";

const params = {
  params: object({
    userId: string().required("User ID is required"),
  }),
};

export const createUserSchema = object({
  body: object({
    username: string().required("Username is required"),
    firstName: string(),
    lastName: string(),
    email: string().email("Email is invalid").required("Email is required"),
    password: string()
      .required()
      .min(6, "Password must be at least 6 characters"),
    profile_image: string(),
    bio: string(),
  }),
});

export const updateUserSchema = object({
  body: object({
    email: string().email("Email is invalid"),
    password: string().min(6, "Password must be at least 6 characters"),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string().email("Email is invalid").required("Email is required"),
    password: string().required("Password is required"),
  }),
});

export const fetchUserByIdSchema = object({
  ...params,
});
