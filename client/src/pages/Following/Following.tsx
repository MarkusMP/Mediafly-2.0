import React, { useEffect } from "react";
import Back from "../../components/Back/Back";
import styles from "./Following.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { fetchFollowing } from "../../features/follower/followerSlice";
import { profileByusername } from "../../features/profile/profileSlice";
import ProfileListItem from "../../components/ProfileListItem/ProfileListItem";

type FollowingParams = {
  username: string;
};

const Followers = () => {
  const dispatch = useAppDispatch();
  const { follwing } = useAppSelector((state) => state.follower);
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);

  const { username } = useParams<FollowingParams>();

  useEffect(() => {
    if (!username && user) {
      dispatch(fetchFollowing(user.profile_id));
    }
    if (username && profile?.username !== username) {
      dispatch(profileByusername(username));
    }
    if (profile && profile?.username === username) {
      dispatch(fetchFollowing(profile.id));
    }
  }, [dispatch, username, user, profile]);
  return (
    <div>
      <div className={styles.container}>
        <Back />
        {follwing.length === 0 && <h1>This user isn't following anyone...</h1>}
        <div className={styles.list}>
          {follwing &&
            follwing.map((profile) => (
              <ProfileListItem profile={profile.following} key={profile.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
