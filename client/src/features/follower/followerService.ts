import axios from "axios";
import { IFollower } from "./followerSlice";

const isFollowing = async (data: IFollower) => {
  const response = await axios.get(
    `https://sma-sql.herokuapp.com/api/follower/${data.profileId}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

const follow = async (data: IFollower) => {
  console.log(data);
  const response = await axios.post(
    `https://sma-sql.herokuapp.com/api/follower/${data.profileId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

const unFollow = async (data: IFollower) => {
  const response = await axios.delete(
    `https://sma-sql.herokuapp.com/api/follower/${data.profileId}`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );

  return response.data;
};

const fetchFollowers = async (profileId: string) => {
  const response = await axios.get(
    `https://sma-sql.herokuapp.com/api/follower/followers/${profileId}`
  );

  return response.data;
};

const fetchFollowing = async (profileId: string) => {
  const response = await axios.get(
    `https://sma-sql.herokuapp.com/api/follower/following/${profileId}`
  );

  return response.data;
};

const followerService = {
  isFollowing,
  follow,
  unFollow,
  fetchFollowers,
  fetchFollowing,
};

export default followerService;
