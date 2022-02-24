import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Comment.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  deleteComment,
  commentLike,
  commentUnlike,
  likeSuccess,
  unlikeSuccess,
} from "../../features/comment/commentSlice";
import { deleteCommentSuccess } from "../../features/post/postSlice";
import Message from "../Message/Message";
import axios from "axios";

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
  const [likedMessage, setLikedMessage] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();
  const { text, profile, likesCount, post_id, id } = comment;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const isCommentLiked = async () => {
        const response = await axios.get(`/api/like/comment/${id}/user`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log(response.data.message);

        setLikedMessage(response.data.message);
      };

      isCommentLiked();
    }
  }, []);

  const addDefaultSrc = (ev: any) => [
    (ev.target.src =
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"),
  ];

  const handleCommentDelete = () => {
    if (user) {
      dispatch(deleteComment({ commentId: comment.id, token: user.token }));
      dispatch(deleteCommentSuccess(post_id));
    } else {
      navigate("/login");
    }
  };

  const handleCommentLike = () => {
    if (user) {
      dispatch(commentLike({ commentId: comment.id, token: user.token }));
      dispatch(likeSuccess(comment.id));
      setLikedMessage("Comment is liked");
    } else {
      navigate("/login");
    }
  };

  const handleCommentUnlike = () => {
    if (user) {
      dispatch(commentUnlike({ commentId: comment.id, token: user.token }));
      dispatch(unlikeSuccess(comment.id));
      setLikedMessage("");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {message === "Something went wrong deleting a comment" && (
        <Message message={message} error={true} />
      )}
      {message === "Comment deleted successfully" && (
        <Message message={message} error={false} />
      )}
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
              {likesCount}{" "}
              {likedMessage === "Comment is liked" ? (
                <BsHeartFill onClick={handleCommentUnlike} />
              ) : (
                <BsHeart onClick={handleCommentLike} />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
