import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaBars } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav className={`${styles.container} ${styles.navigation}`}>
        <div className={styles.logo}>
          <li>
            <Link to="/">Mediafly</Link>
          </li>
        </div>
        <ul
          className={
            isOpen
              ? `${styles.open} ${styles.links}`
              : `${styles.close} ${styles.links}`
          }
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/myprofile/following">Following</Link>
              </li>
              <li>
                <Link to="/myprofile/followers">Followers</Link>
              </li>
              <li>
                <Link to="/myprofile">
                  <FaUser /> Profile
                </Link>
              </li>

              <li>
                <button className={styles.btn} onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>{" "}
            </>
          )}
        </ul>
        <div className={styles.menu}>
          <button type="button" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
