import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const logoStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    margin: "10px",
  };

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  async function logOutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className={`${styles.navbar} container`}>
        <Link style={logoStyle} to="/">
          <img src="/images/logo.png" alt="logo" />
          <span style={logoText}>LearnHouse</span>
        </Link>

        {isAuth && (
          <div className={styles.navright}>
            <h3>{user?.name}</h3>
            <Link to="/">
              <img
                className={styles.avatar}
                src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
                width="40px"
                height="40px"
                alt="avatar"
              />
            </Link>
            <button onClick={logOutUser} className={styles.logOutBtn}>
              <img src="/images/logout.png" alt="logout" />
            </button>
          </div>
        )}
        {/* 
        {isAuth && (
          <button onClick={logOutUser} className={styles.logOutBtn}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        )} */}
      </nav>
    </>
  );
};

export default Navigation;
