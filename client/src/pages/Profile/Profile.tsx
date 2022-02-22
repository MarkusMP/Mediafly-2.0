import React, { useEffect } from "react";
import styles from "./Profile.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  profileById,
  profileByusername,
} from "../../features/profile/profileSlice";
import Message from "../../components/Message/Message";
import Back from "../../components/Back/Back";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
import { getAllPostsByProfileId } from "../../features/post/postSlice";
import Post from "../../components/Post/Post";
import PostCreate from "../../components/PostCreate/PostCreate";

type ProfileParams = {
  username: string;
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { isFollowing } = useAppSelector((state) => state.follower);
  const { postsProfile, message: postMessage } = useAppSelector(
    (state) => state.post
  );
  const { profile, isError, message } = useAppSelector(
    (state) => state.profile
  );
  const { username } = useParams<ProfileParams>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!username && user) {
      dispatch(profileById(user.profile_id));
    }
    if (username) {
      dispatch(profileByusername(username));
    }
    if (profile) {
      dispatch(getAllPostsByProfileId(profile.id));
    }
  }, [user, dispatch, username, navigate, isFollowing]);
  return (
    <>
      {message && isError && <Message message={message} error={true} />}
      {postMessage && <Message message={postMessage} error={true} />}
      <div>
        <div className={styles.container}>
          <Back />
        </div>

        <div
          className={
            profile?.id === user?.profile_id
              ? `${styles.profile} ${styles.container}`
              : ""
          }
        >
          <div>{profile && <ProfileItem profile={profile} />}</div>
          {profile && profile.id === user?.profile_id && (
            <div className={styles.create}>
              <PostCreate />
            </div>
          )}
          <div className={styles.posts}>
            {postsProfile.length !== 0 && <h2>Posts by {profile?.username}</h2>}
            {postsProfile.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
