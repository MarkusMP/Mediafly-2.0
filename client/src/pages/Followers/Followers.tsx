import React, { useEffect } from "react";
import Back from "../../components/Back/Back";
import styles from "./Followers.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFollowers } from "../../features/follower/followerSlice";
import { profileByusername } from "../../features/profile/profileSlice";
import ProfileListItem from "../../components/ProfileListItem/ProfileListItem";
import Message from "../../components/Message/Message";

type FollowersParams = {
  username: string;
};

const Followers = () => {
  const dispatch = useAppDispatch();
  const { followers } = useAppSelector((state) => state.follower);
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);

  const { username } = useParams<FollowersParams>();

  useEffect(() => {
    if (!username && user) {
      dispatch(fetchFollowers(user.profile_id));
    }
    if (username && profile?.username !== username) {
      dispatch(profileByusername(username));
    }
    if (profile && profile?.username === username) {
      dispatch(fetchFollowers(profile.id));
    }
  }, [dispatch, username, user, profile]);
  return (
    <div>
      <div className={styles.container}>
        <Back />

        {followers.length === 0 && <h1>No followers found.</h1>}
        <div className={styles.list}>
          {followers &&
            followers.map((profile) => (
              <ProfileListItem profile={profile.followers} key={profile.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
