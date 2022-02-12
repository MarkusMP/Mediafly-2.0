import { Request, Response } from "express";
import {
  createUser,
  fetchUserByEmail,
  getUserById,
  userUpdate,
  userDelete,
} from "../services/user.service";
import { User } from "../entities/user.entity";
import { IGetUserAuthInfoRequest } from "../utils/definitionFile";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";
import { Profile } from "../entities/profile.entity";

// @route   POST api/user
// @desc    Register user & get token
// @access  Public
const registerUser = async (req: Request, res: Response) => {
  const { username, firstName, lastName, email, password, profile_image } =
    req.body;

  const userExistsUsername = await Profile.findOne({ username });
  const userExistsEmail = await User.findOne({ email });

  if (userExistsUsername) {
    return res.status(400).json({
      message: "Username already exists",
    });
  } else if (userExistsEmail) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const user = await createUser({
    username,
    firstName,
    lastName,
    email,
    password,
    profile_image,
  });

  if (user) {
    const token = generateToken({
      id: user.id,
    });

    res.json({ ...user, token }).status(200);
  } else {
    return res.status(409).json({
      message: "Failed to create user",
    });
  }
};

// @route   POST api/user/login
// @desc    Authenticate user & get token
// @access  Public
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await fetchUserByEmail(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      profile_id: user.profile_id,
      token: generateToken({ id: user.id }),
    });
  } else {
    return res.status(401).json({
      message: "Credentials are incorrect",
    });
  }
};

// @route   GET api/user/:id
// @desc    Fetch user by id
// @access  Public
const fetchUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }
};

// @route   PUT api/user/
// @desc    Update user
// @access  Private
const updateUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { username, firstName, lastName, email, password, profile_image } =
    req.body;

  const updatedUser = await userUpdate({
    username,
    firstName,
    lastName,
    email,
    password,
    profile_image,
    id: req.user!.id,
  });

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    return res.status(400).json({
      message: "Failed to update user",
    });
  }
};

// @route   DELETE api/user/
// @desc    Delete user
// @access  Private
const deleteUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    await userDelete(req.user!.profile_id);
    res.json({ message: "User deleted" });
  } catch (error) {
    return res.status(404).json({
      message: "User failed to delete",
      error: error,
    });
  }
};

export { registerUser, loginUser, fetchUserById, updateUser, deleteUser };
