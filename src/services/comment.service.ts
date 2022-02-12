import { createQueryBuilder, getRepository } from "typeorm";
import { Comment } from "../entities/comment.entity";

export const commentCreate = async (postId, text, profileId) => {
  try {
    const comment = await createQueryBuilder("comment")
      .insert()
      .into(Comment)
      .values({
        text,
        profile_id: profileId,
        post_id: postId,
      })
      .returning("*")
      .execute();

    return comment.raw[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllCommentsByPostId = async (postId) => {
  try {
    const comments = await getRepository(Comment)
      .createQueryBuilder("comment")
      .where("comment.post_id = :postId", { postId })
      .loadRelationCountAndMap("comment.likesCount", "comment.likes")
      .orderBy("created_at", "DESC")
      .getMany();

    return comments;
  } catch (error: any) {
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
  }
};
