import { createQueryBuilder, getRepository } from "typeorm";
import { Post } from "../entities/post.entity";

export const postcreate = async (newPostObject) => {
  try {
    const newPost = await Post.create({
      text: newPostObject.text,
      image: newPostObject.image,
      profile_id: newPostObject.id,
    });

    await newPost.save();

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPostsByProfileId = async (id) => {
  try {
    const posts = await getRepository(Post)
      .createQueryBuilder("post")
      .where("post.profile_id = :id", { id })
      .leftJoinAndSelect("post.profile", "profile")
      .loadRelationCountAndMap("post.likesCount", "post.likes")
      .select([
        "post.text",
        "post.image",
        "post.id",
        "profile_id",
        "profile.username",
        "profile.profile_image",
        "profile.id",
        "post.created_at",
      ])
      .getMany();

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPostById = async (postId) => {
  try {
    const post = await getRepository(Post)
      .createQueryBuilder("post")
      .where("post.id = :id", { id: postId })
      .leftJoinAndSelect("post.profile", "profile")
      .loadRelationCountAndMap("post.likesCount", "post.likes")
      .select([
        "post.text",
        "post.image",
        "post.id",
        "profile_id",
        "profile.username",
        "profile.profile_image",
        "profile.id",
        "post.created_at",
      ])
      .getOne();

    return post;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPosts = async () => {
  try {
    const posts = await getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.profile", "profile")
      .loadRelationCountAndMap("post.likesCount", "post.likes")
      .select([
        "post.text",
        "post.image",
        "post.id",
        "profile_id",
        "profile.username",
        "profile.profile_image",
        "profile.id",
        "post.created_at",
      ])
      .getMany();

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postDelete = async (postId, profileId) => {
  try {
    return await createQueryBuilder()
      .delete()
      .from(Post)
      .where("id = :id", { id: postId })
      .andWhere("profile_id = :profileId", { profileId })
      .execute();
  } catch (error: any) {
    throw new Error(error);
  }
};
