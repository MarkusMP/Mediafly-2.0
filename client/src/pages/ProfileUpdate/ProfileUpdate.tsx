import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./ProfileUpdate.module.scss";
import axios from "axios";
import Back from "../../components/Back/Back";
import Message from "../../components/Message/Message";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../features/profile/profileSlice";

interface IUpdate {
  username: string;
  firstName: string;
  lastName: string;
  profile_image: string;
  bio: string;
}

const ProfileUpdate = () => {
  const [formData, setFormData] = useState<IUpdate>({
    username: "",
    firstName: "",
    lastName: "",
    profile_image: "",
    bio: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, isError, message, isLoading, isSuccess } = useAppSelector(
    (state) => state.profile
  );
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        profile_image: profile.profile_image,
        bio: profile.bio,
      });
    }
    if (isSuccess && !isError && !message && !isLoading) {
      navigate("/myprofile");
    }
  }, [profile, dispatch, isError, message, isLoading, isSuccess, navigate]);

  const { username, firstName, lastName, profile_image, bio } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setFormData((prevState) => ({ ...prevState, profile_image: data.image }));
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.user) {
      const newUsername = username === profile?.username ? "" : username;

      dispatch(
        updateProfile({
          username: newUsername,
          firstName,
          lastName,
          profile_image,
          bio,
          token: auth.user.token,
        })
      );
    }
  };
  return (
    <>
      {message && isError && <Message message={message} error={true} />}
      <div className={styles.container}>
        <Back />
        <section>
          <h1>
            <FaUser /> Update Profile
          </h1>
        </section>
        <section className={styles.form}>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>

              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Enter your updated username"
                required
                onChange={onChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="Enter your updated first name"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Enter your updated last name"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio </label>
              <textarea
                id="bio"
                name="bio"
                value={bio}
                placeholder="Enter your updated bio"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    bio: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="profileImage">Choose a profile image</label>
              <input
                type="text"
                id="profileImage"
                name="profile_image"
                value={profile_image}
                placeholder="Enter your updated image url"
                onChange={onChange}
              />
              <input
                type="file"
                id="image-file"
                aria-label="Upload your profile image"
                onChange={uploadFileHandler}
                accept=".jpg, .jpeg, .png"
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default ProfileUpdate;
