import React from "react";
import styles from "./Button.module.css";

const Button = ({ btnName, onPress }) => {
  return (
    <>
      <button onClick={onPress} className={styles.btn}>
        <span>{btnName}</span>
        <img src="/images/arrow-forward.png" alt="-->" />
      </button>
    </>
  );
};

export default Button;
