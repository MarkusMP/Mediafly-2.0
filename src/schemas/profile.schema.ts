import { object, string } from "yup";

const params = {
  params: object({
    profileId: string().required("profile ID is required"),
  }),
};

export const fetchProfileByIdSchema = object({
  ...params,
});

export const updateProfileSchema = object({
  body: object({
    username: string(),
    bio: string(),
    firstName: string(),
    lastName: string(),
    profile_image: string(),
  }),
});

export const fetchProfileByUsernameSchema = object({
  params: object({
    username: string().required("Username is required"),
  }),
});
