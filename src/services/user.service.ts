import { User } from "../entities/user.entity";
import { createQueryBuilder } from "typeorm";
import { Profile } from "../entities/profile.entity";

export const createUser = async (userObject) => {
  try {
    const profile = await createQueryBuilder("profile")
      .insert()
      .into(Profile)
      .values({
        username: userObject.username,
        ...(userObject.firstName && { firstName: userObject.firstName }),
        ...(userObject.lastName && { lastName: userObject.lastName }),
        ...(userObject.bio && { lastName: userObject.bio }),
        ...(userObject.profile_image && {
          profile_image: userObject.profile_image,
        }),
      })
      .returning("id")
      .execute();

    const user = new User();

    user.email = userObject.email;
    user.password = userObject.password;
    user.profile_id = profile.generatedMaps[0].id;

    await user.save();

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const user = await createQueryBuilder("user")
      .select("user.password")
      .addSelect("user.id")
      .addSelect("user.email")
      .addSelect("user.created_at")
      .addSelect("user.profile_id")
      .from(User, "user")
      .where("user.email = :email", { email })
      .getOne();

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      select: ["id", "email", "created_at", "profile_id"],
    });

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const userUpdate = async (updatedUser) => {
  try {
    await User.update(updatedUser.id, {
      ...(updatedUser.email && { email: updatedUser.email }),
      ...(updatedUser.password && { password: updatedUser.password }),
    });

    return await User.findOneOrFail(updatedUser.id);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const userDelete = async (profileId: string) => {
  try {
    await createQueryBuilder()
      .delete()
      .from(Profile)
      .where("id = :id", { id: profileId })
      .execute();
  } catch (error: any) {
    throw new Error(error);
  }
};
