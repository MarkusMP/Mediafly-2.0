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

type ProfileParams = {
  username: string;
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { profile, isError, isLoading, message } = useAppSelector(
    (state) => state.profile
  );
  const { username } = useParams<ProfileParams>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (!username && user) {
      dispatch(profileById(user.profile_id));
    }
    if (username) {
      dispatch(profileByusername(username));
    }
  }, [user, dispatch, username, navigate]);
  return (
    <>
      {message && isError && <Message message={message} error={true} />}
      <div>
        <div className={styles.container}>
          <Back />
        </div>
        {isLoading && <div>Loading...</div>}
        {profile && <ProfileItem profile={profile} />}
      </div>
    </>
  );
};

export default Profile;
