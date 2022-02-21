import axios from "axios";
import { IFollower } from "./followerSlice";

const isFollowing = async (data: IFollower) => {
  const response = await axios.get(`/api/follower/${data.profileId}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return response.data;
};

const follow = async (data: IFollower) => {
  console.log(data);
  const response = await axios.post(
    `/api/follower/${data.profileId}`,
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
  const response = await axios.delete(`/api/follower/${data.profileId}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return response.data;
};

const fetchFollowers = async (profileId: string) => {
  const response = await axios.get(`/api/follower/followers/${profileId}`);

  return response.data;
};

const fetchFollowing = async (profileId: string) => {
  const response = await axios.get(`/api/follower/following/${profileId}`);

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
