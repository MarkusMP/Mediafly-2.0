import { object, string } from "yup";

const params = {
  params: object({
    profileId: string().required("Profile ID is required"),
  }),
};

export const userFollowSchema = object({
  ...params,
});

export const userUnFollowSchema = object({
  ...params,
});

export const fetchFollowersByProfileIdSchema = object({
  ...params,
});

export const fetchFollowingByProfileIdSchema = object({
  ...params,
});
