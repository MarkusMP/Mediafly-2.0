import React, { useState } from "react";
import styles from "./PostCreate.module.scss";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../features/post/postSlice";

const PostCreate = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    if (auth.user) {
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          "https://sma-sql.herokuapp.com/api/upload",
          formData,
          config
        );

        setImage(data.image);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.user) {
      dispatch(createPost({ text, image, token: auth.user.token }));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.post}>
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="text">Create Post</label>
          <textarea
            id="text"
            name="text"
            value={text}
            placeholder="Write Something..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="postImage">Post Image (Optional)</label>

          <input
            type="text"
            id="postImage"
            name="profile_image"
            value={image}
            placeholder="Enter image url (optional)"
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="file"
            id="postImage"
            aria-label="Upload your profile image"
            onChange={uploadFileHandler}
            accept=".jpg, .jpeg, .png"
          />
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.btn}>
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
