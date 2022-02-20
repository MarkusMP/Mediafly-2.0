import { Follower } from "../entities/follower.entity";
import { createQueryBuilder, getRepository } from "typeorm";
import { User } from "../entities/user.entity";

export const followUser = async (followerId, followingId) => {
  try {
    const user = await User.findOne({ id: followerId });

    const followUser = await createQueryBuilder("follower")
      .insert()
      .into(Follower)
      .values({
        follower_id: user!.profile_id,
        following_id: followingId,
      })
      .execute();

    return followUser;
  } catch (error: any) {
    return;
  }
};

export const unFollowUser = async (followerId, followingId) => {
  try {
    const user = await User.findOne({ id: followerId });

    const unfollowUser = await createQueryBuilder("follower")
      .delete()
      .from(Follower)
      .where("follower_id = :followerId", { followerId: user!.profile_id })
      .andWhere("following_id = :followingId", { followingId })
      .execute();

    return unfollowUser;
  } catch (error: any) {
    return;
  }
};

export const getFollowersByProfileId = async (profileId) => {
  try {
    const followers = await getRepository(Follower)
      .createQueryBuilder("follower")
      .where("follower.following_id = :profileId", { profileId })
      .leftJoinAndSelect("follower.followers", "profile")
      .select(["profile.id", "profile.username", "profile.profile_image"])
      .getRawMany();
    return followers;
  } catch (error: any) {
    return;
  }
};

export const getFollowingProfileById = async (profileId) => {
  try {
    const followers = await getRepository(Follower)
      .createQueryBuilder("follower")
      .where("follower.follower_id = :profileId", { profileId })
      .leftJoinAndSelect("follower.following", "profile")
      .select(["profile.id", "profile.username", "profile.profile_image"])
      .getRawMany();
    return followers;
  } catch (error: any) {
    return;
  }
};
