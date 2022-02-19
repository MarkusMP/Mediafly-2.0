import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Back from "../../components/Back/Back";
import styles from "./Login.module.scss";
import Message from "../../components/Message/Message";
import { AppDispatch } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

interface ILogin {
  email: string;
  password: string;
}
const Register = () => {
  const [formData, setFormData] = useState<ILogin>({
    password: "",
    email: "",
  });
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { password, email } = formData;

  useEffect(() => {
    dispatch(reset());

    if (auth && auth.isError === true && auth.message) {
      setMessage(auth.message);
    }
    if (auth.user) {
      setMessage("");
      navigate("/");
    }
  }, [auth]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    dispatch(login({ email, password }));
    setFormData({
      password: "",
      email: "",
    });
  };
  return (
    <>
      {message && <Message message={message} />}
      <div className={styles.container}>
        <Back />
        <section>
          <h1>
            <FaSignInAlt /> Login
          </h1>
        </section>
        <section className={styles.form}>
          <form onSubmit={onSubmit}>
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
              <button type="submit" className={styles.btn}>
                Login
              </button>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </section>
      </div>
    </>
  );
};

export default Register;
