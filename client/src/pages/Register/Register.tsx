import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./Register.module.scss";
import axios from "axios";
import Back from "../../components/Back/Back";
import Message from "../../components/Message/Message";
import { register, reset } from "../../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";

interface IRegister {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  profile_image: string;
  bio: string;
}

const Register = () => {
  const [formData, setFormData] = useState<IRegister>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    profile_image: "",
    bio: "",
  });
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
    if (auth && auth.isError === true && auth.message) {
      setMessage(auth.message);
    }
    if (auth.user) {
      navigate("/");
    }
  }, [auth, dispatch, navigate]);

  const { username, password, email, firstName, lastName, profile_image, bio } =
    formData;

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

      const { data } = await axios.post(
        "https://sma-sql.herokuapp.com/api/upload",
        formData,
        config
      );

      setFormData((prevState) => ({ ...prevState, profile_image: data.image }));
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    dispatch(register(formData));
  };
  return (
    <>
      {message && <Message message={message} error={true} />}
      <div className={styles.container}>
        <Back />
        <section>
          <h1>
            <FaUser /> Register
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
                placeholder="Enter your username"
                required
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                required
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                required
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name (optional)</label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="Enter your first name"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name (optional)</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Enter your last name"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio (optional)</label>
              <textarea
                id="bio"
                name="bio"
                value={bio}
                placeholder="Enter your bio"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    bio: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="profileImage">
                Choose a profile image (optional)
              </label>
              <input
                type="text"
                id="profileImage"
                name="profile_image"
                value={profile_image}
                placeholder="Enter image url"
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
                Register
              </button>
            </div>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </div>
    </>
  );
};

export default Register;
