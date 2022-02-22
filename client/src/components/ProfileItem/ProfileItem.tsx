import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./ProfileItem.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { deleteProfile } from "../../features/profile/profileSlice";
import { logout } from "../../features/auth/authSlice";
import {
  isFollowing,
  follow,
  unFollow,
} from "../../features/follower/followerSlice";
import Modal from "../Modal/Modal";

interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
  followersCount: number;
  followingCount: number;
}

interface IProfileItemProps {
  profile: IProfile;
}

const ProfileItem = (props: IProfileItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { message, isFollowing: isFollowingMessage } = useAppSelector(
    (state) => state.follower
  );
  const {
    bio,
    created_at,
    firstName,
    followersCount,
    followingCount,
    id,
    lastName,
    profile_image,
    username,
  } = props.profile;

  useEffect(() => {
    if (user) {
      dispatch(isFollowing({ profileId: id, token: user.token }));
    }
  }, [dispatch, id, user, message]);

  const handleDelete = () => {
    if (user?.profile_id === id) {
      dispatch(deleteProfile(user.token));
      dispatch(logout());
      navigate("/");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFollow = () => {
    if (user) {
      dispatch(follow({ profileId: id, token: user.token }));
    } else {
      navigate("/login");
    }
  };

  const handleUnfollow = () => {
    if (user) {
      dispatch(unFollow({ profileId: id, token: user.token }));
    } else {
      navigate("/login");
    }
  };

  const addDefaultSrc = (ev: any) => [
    (ev.target.src =
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"),
  ];

  const date = new Date(created_at);
  return (
    <>
      {isOpen && (
        <Modal
          message="Do you want to delete your profile?"
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}
      <div className={styles.card}>
        <div className={styles.container}>
          <img src={profile_image} alt="profile-img" onError={addDefaultSrc} />

          <h1>
            {firstName} {lastName}
          </h1>
          <h3>@{username}</h3>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.date}>
            <p>
              <span className={styles.bold}>Joined:</span> {date.getFullYear()}{" "}
              {date.getMonth() + 1} {date.getDate()}
            </p>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <Link
                to={
                  id === user?.profile_id
                    ? "/myprofile/followers"
                    : `/profile/${username}/followers`
                }
              >
                <p>
                  <span className={styles.bold}>Followers:</span>
                  <span> {followersCount}</span>
                </p>
              </Link>
              <Link
                to={
                  id === user?.profile_id
                    ? "/myprofile/following"
                    : `/profile/${username}/following`
                }
              >
                <p>
                  <span className={styles.bold}>Following:</span>
                  <span> {followingCount}</span>
                </p>
              </Link>
            </div>
          </div>
          <div className={styles.btns}>
            {user?.profile_id === id ? (
              <>
                <button
                  className={styles.btn}
                  onClick={() => navigate("/myprofile/update")}
                >
                  Update
                </button>
                <button
                  className={styles.btnError}
                  onClick={() => setIsOpen(true)}
                >
                  Delete
                </button>
              </>
            ) : message === "Successfully followed user" ||
              isFollowingMessage === "User is following" ? (
              <button className={styles.btn} onClick={handleUnfollow}>
                Unfollow
              </button>
            ) : (
              <button className={styles.btn} onClick={handleFollow}>
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
