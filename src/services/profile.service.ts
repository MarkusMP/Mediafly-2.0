import { createQueryBuilder, getRepository } from "typeorm";
import { Profile } from "../entities/profile.entity";

export const getProfileById = async (profileId) => {
  try {
    const profile = await getRepository(Profile)
      .createQueryBuilder("profile")
      .where("id = :id", {
        id: profileId,
      })
      .loadRelationCountAndMap("profile.followersCount", "profile.followers")
      .loadRelationCountAndMap("profile.followingCount", "profile.following")
      .getOne();

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProfileByUsername = async (username) => {
  try {
    const profile = await getRepository(Profile)
      .createQueryBuilder("profile")
      .where("username = :username", {
        username,
      })
      .loadRelationCountAndMap("profile.followersCount", "profile.followers")
      .loadRelationCountAndMap("profile.followingCount", "profile.following")
      .getOne();

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUsernameExists = async (username) => {
  try {
    const exists = await Profile.findOne({
      where: { username },
      select: ["username"],
    });

    return exists;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const profileUpdate = async (updatedProfile) => {
  try {
    const updated = await createQueryBuilder("profile")
      .update()
      .set({
        ...(updatedProfile.username && { username: updatedProfile.username }),

        ...(updatedProfile.bio && { bio: updatedProfile.bio }),
        ...(updatedProfile.firstName && {
          firstName: updatedProfile.firstName,
        }),
        ...(updatedProfile.lastName && { lastName: updatedProfile.lastName }),
        ...(updatedProfile.profile_image && {
          profile_image: updatedProfile.profile_image,
        }),
      })
      .where("id = :id", { id: updatedProfile.id })
      .returning("*")
      .execute();

    return updated.raw[0];
  } catch (error: any) {
    throw new Error(error);
  }
};