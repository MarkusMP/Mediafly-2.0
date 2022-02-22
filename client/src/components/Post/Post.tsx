import React from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePost } from "../../features/post/postSlice";
import Message from "../Message/Message";

interface PostProps {
  id: string;
  text: string;
  image: string | null;
  likesCount: number;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    profile_image: string;
  };
}

interface Props {
  post: PostProps;
}

const Post = ({ post }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const { id, text, image, likesCount, profile } = post;

  const addDefaultSrc = (ev: any) => [
    (ev.target.src =
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"),
  ];

  const handlePostDelete = () => {
    if (user) {
      dispatch(deletePost({ postId: id, token: user.token }));
    }
  };
  return (
    <>
      {message && message === "Post deleted successfully" && (
        <Message message={message} error={false} />
      )}
      {message && message !== "Post deleted successfully" && (
        <Message message={message} error={true} />
      )}
      <div className={styles.post}>
        <div className={styles.profile}>
          <Link to={`/profile/${profile.username}`}>
            <img
              src={profile.profile_image}
              alt="profile-img"
              onError={addDefaultSrc}
            />

            <div className={styles.info}>
              <h1>
                {profile.firstName} {profile.lastName}
              </h1>
              <h2>@{profile.username}</h2>
            </div>
          </Link>
          {user && user.profile_id === profile.id && (
            <button
              type="button"
              className={styles.btnError}
              onClick={handlePostDelete}
            >
              X
            </button>
          )}
        </div>
        <div className={styles.postContent}>
          <div className={styles.img}>
            {image && <img src={image} alt="post-img" />}
          </div>

          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
