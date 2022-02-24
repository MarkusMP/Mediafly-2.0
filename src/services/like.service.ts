import { Like } from "../entities/like.entity";
import { createQueryBuilder, getRepository } from "typeorm";
import { CommentLike } from "../entities/commentLike.entity";

export const postLike = async (postId, profileId) => {
  const liked = await Like.findOne({
    where: {
      post_id: postId,
      profile_id: profileId,
    },
  });

  if (liked) {
    return;
  }

  try {
    const likedPost = await createQueryBuilder("like")
      .insert()
      .into(Like)
      .values({
        post_id: postId,
        profile_id: profileId,
      })
      .execute();

    return likedPost;
  } catch (error: any) {
    return;
  }
};

export const unlikePost = async (profileId, postId) => {
  try {
    const unfollowUser = await createQueryBuilder("like")
      .delete()
      .from(Like)
      .where("post_id = :postId", { postId })
      .andWhere("profile_id = :profileId", { profileId })
      .execute();

    return unfollowUser;
  } catch (error: any) {
    return;
  }
};

export const commentLike = async (profileId, commentId) => {
  const liked = await CommentLike.findOne({
    where: {
      comment_id: commentId,
      profile_id: profileId,
    },
  });

  if (liked) {
    return;
  }

  try {
    const likedComment = await createQueryBuilder("CommentLike")
      .insert()
      .into(CommentLike)
      .values({
        comment_id: commentId,
        profile_id: profileId,
      })
      .execute();
    return likedComment;
  } catch (error: any) {
    return;
  }
};

export const commentUnlike = async (profileId, commentId) => {
  try {
    const unfollowUser = await createQueryBuilder("CommentLike")
      .delete()
      .from(CommentLike)
      .where("comment_id = :commentId", { commentId })
      .andWhere("profile_id = :profileId", { profileId })
      .execute();

    return unfollowUser;
  } catch (error: any) {
    return;
  }
};

export const isPostLiked = async (profileId: string, postId: string) => {
  try {
    const liked = await Like.findOne({
      where: {
        post_id: postId,
        profile_id: profileId,
      },
    });

    return liked;
  } catch (error: any) {
    return;
  }
};

export const isCommentLiked = async (profileId: string, commentId: string) => {
  try {
    const liked = await CommentLike.findOne({
      where: {
        comment_id: commentId,
        profile_id: profileId,
      },
    });

    return liked;
  } catch (error: any) {
    return;
  }
};
