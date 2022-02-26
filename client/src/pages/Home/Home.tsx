import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Message from "../../components/Message/Message";
import Post from "../../components/Post/Post";
import PostCreate from "../../components/PostCreate/PostCreate";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
import { getAllPosts } from "../../features/post/postSlice";
import { profileById } from "../../features/profile/profileSlice";
import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.posts);
  const { user } = useAppSelector((state) => state.auth);
  const { profile, message } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllPosts());

    if (user) {
      dispatch(profileById(user.profile_id));
    }
  }, [dispatch, user]);

  console.log(posts);
  return (
    <>
      {message && <Message message={message} error={true} />}
      <div className={styles.container}>
        <div className={styles.profile}>
          {profile && user?.profile_id === profile.id && (
            <ProfileItem profile={profile} />
          )}
        </div>
        <div className={styles.posts}>
          <PostCreate />
          <div className={styles.posts}>
            {posts && posts.map((post) => <Post key={post.id} post={post} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
