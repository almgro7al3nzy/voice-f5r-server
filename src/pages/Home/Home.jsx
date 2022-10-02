import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const signInLinkStyle = {
    color: "#0077FF",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  const navigate = useNavigate();

  function startRegister() {
    navigate("/authenticate");
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={"Welcome to LearnHouse"} icon={"logo"}>
          <p className={styles.text}>
            We’re working hard to get Learnhouse ready for everyone! While we
            wrap up the finishing youches, we’re adding people gradually to make
            sure nothing breaks :)
          </p>

          <div>
            <Button onPress={startRegister} btnName="Let's Go" />
          </div>

          <div className={styles.signinWrapper}>
            <span className={styles.hasInvite}>Have an invite text?</span>
            <Link style={signInLinkStyle} to="/login">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;
