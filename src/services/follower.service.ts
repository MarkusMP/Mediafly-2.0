import { Follower } from "../entities/follower.entity";
import { createQueryBuilder, getRepository } from "typeorm";

export const followUser = async (followerId, followingId) => {
  try {
    // Check if user is already following
    const follower = await getRepository(Follower).findOne({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    if (!follower) {
      const followUser = await createQueryBuilder("follower")
        .insert()
        .into(Follower)
        .values({
          follower_id: followerId,
          following_id: followingId,
        })
        .returning("*")
        .execute();

      return followUser;
    } else {
      return;
    }
  } catch (error: any) {
    return;
  }
};

export const unFollowUser = async (followerId: string, followingId: string) => {
  try {
    const unfollowUser = await createQueryBuilder("follower")
      .delete()
      .from(Follower)
      .where("follower_id = :followerId", { followerId })
      .andWhere("following_id = :followingId", { followingId })
      .execute();

    return unfollowUser;
  } catch (error: any) {
    return;
  }
};

export const getFollowersByProfileId = async (profileId) => {
  try {
    const followers = Follower.find({
      where: { following_id: profileId },
      relations: ["followers"],
    });
    return followers;
  } catch (error: any) {
    return;
  }
};

export const getFollowingProfileById = async (profileId) => {
  try {
    const followers = Follower.find({
      where: {
        follower_id: profileId,
      },
      relations: ["following"],
    });
    return followers;
  } catch (error: any) {
    return;
  }
};

export const isUserFollowing = async (
  followerId: string,
  followingId: string
) => {
  try {
    const following = await createQueryBuilder("follower")
      .select("follower.id")
      .from(Follower, "follower")
      .where("follower.follower_id = :followerId", {
        followerId: followerId,
      })
      .andWhere("follower.following_id = :followingId", { followingId })
      .getRawOne();

    return following;
  } catch (error: any) {
    return;
  }
};
