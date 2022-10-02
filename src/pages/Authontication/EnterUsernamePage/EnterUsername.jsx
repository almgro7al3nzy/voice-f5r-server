import React from "react";
import styles from "./EnterUsername.module.css";

const EnterUsername = ({onNext}) => {
  return (
    <>
      <div>Enter your username</div>
      <button onClick={onNext}>next</button>
    </>
  );
};

export default EnterUsername;
