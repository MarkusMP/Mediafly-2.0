import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Comment.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BsHeart } from "react-icons/bs";
import { deleteComment } from "../../features/comment/commentSlice";
import { deleteCommentSuccess } from "../../features/post/postSlice";

interface CommentProps {
  comment: {
    id: string;
    post_id: string;
    text: string;
    created_at: string;
    likesCount: number;
    profile: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      profile_image: string;
    };
  };
}

const Comment = ({ comment }: CommentProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { text, profile, likesCount, post_id } = comment;

  const addDefaultSrc = (ev: any) => [
    (ev.target.src =
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"),
  ];

  const handleCommentDelete = () => {
    if (user) {
      dispatch(deleteComment({ commentId: comment.id, token: user.token }));
      dispatch(deleteCommentSuccess(post_id));
    }
  };

  return (
    <>
      <div className={styles.comment}>
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
              onClick={handleCommentDelete}
            >
              X
            </button>
          )}
        </div>
        <div className={styles.commentContent}>
          <p>{text}</p>
        </div>
        <div className={styles.bot}>
          <div className={styles.likes}>
            <span>
              {likesCount} <BsHeart />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
