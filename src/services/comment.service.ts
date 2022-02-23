import { createQueryBuilder, getRepository } from "typeorm";
import { Comment } from "../entities/comment.entity";

export const commentCreate = async (postId, text, profileId) => {
  try {
    const newComment = await createQueryBuilder("comment")
      .insert()
      .into(Comment)
      .values({
        text,
        profile_id: profileId,
        post_id: postId,
      })
      .returning("id")
      .execute();

    const comment = await getRepository(Comment)
      .createQueryBuilder("comment")
      .where("comment.id = :id", { id: newComment.raw[0].id })
      .leftJoinAndSelect("comment.profile", "profile")
      .loadRelationCountAndMap("comment.likesCount", "comment.likes")
      .select([
        "comment.text",
        "comment.post_id",
        "comment.id",
        "profile_id",
        "profile.username",
        "profile.profile_image",
        "profile.id",
        "profile.firstName",
        "profile.lastName",
        "comment.created_at",
      ])
      .getOne();

    return comment;
  } catch (error: any) {
    return;
  }
};

export const getAllCommentsByPostId = async (postId) => {
  try {
    const comments = await getRepository(Comment)
      .createQueryBuilder("comment")
      .where("comment.post_id = :id", { id: postId })
      .leftJoinAndSelect("comment.profile", "profile")
      .loadRelationCountAndMap("comment.likesCount", "comment.likes")
      .select([
        "comment.text",
        "comment.post_id",
        "comment.id",
        "profile_id",
        "profile.username",
        "profile.profile_image",
        "profile.id",
        "profile.firstName",
        "profile.lastName",
        "comment.created_at",
      ])
      .getMany();

    return comments;
  } catch (error: any) {
    return;
  }
};

export const getCommentByid = async (commentId) => {
  try {
    const comment = await Comment.findOne({
      where: { id: commentId },
      select: ["id", "text", "created_at", "profile_id"],
    });

    return comment;
  } catch (error: any) {
    return;
  }
};

export const commentDelete = async (commentId, profileId) => {
  try {
    return await createQueryBuilder()
      .delete()
      .from(Comment)
      .where("id = :id", { id: commentId })
      .andWhere("profile_id = :profileId", { profileId })
      .execute();
  } catch (error: any) {
    return;
  }
};
