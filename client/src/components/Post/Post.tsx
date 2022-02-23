import React, { useEffect } from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePost } from "../../features/post/postSlice";
import {
  fetchCommentsByPostId,
  reset,
} from "../../features/comment/commentSlice";
import Message from "../Message/Message";
import { FaComment } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import CommentCreate from "../CommentCreate/CommentCreate";
import Comment from "../Comment/Comment";

interface PostProps {
  id: string;
  text: string;
  image: string | null;
  likesCount: number;
  commentsCount: number;
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
  const [showComment, setShowComment] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.post);
  const { comments } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();
  const { id, text, image, likesCount, profile, commentsCount } = post;

  const addDefaultSrc = (ev: any) => [
    (ev.target.src =
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"),
  ];

  useEffect(() => {
    if (showComment) {
      dispatch(fetchCommentsByPostId(id));
    } else {
      dispatch(reset(id));
    }
  }, [id, showComment, dispatch]);

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
        <div className={styles.bot}>
          <div className={styles.likes}>
            <span>
              {likesCount} <BsHeart />
            </span>
          </div>
          <div
            className={styles.comments}
            onClick={() => setShowComment((prevState) => !prevState)}
          >
            <span>
              {commentsCount} {!showComment ? <FaRegComment /> : <FaComment />}
            </span>
          </div>
        </div>
        {showComment && (
          <div>
            <CommentCreate postId={id} />
            {comments
              .filter((comment) => comment.post_id === id)
              .sort((a, b) => {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              })
              .map((comment) => (
                <Comment comment={comment} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
