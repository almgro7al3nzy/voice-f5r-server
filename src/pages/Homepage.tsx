import "../styles/Homepage.scss";
import firebase from "firebase/app";
import { FC, useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { useHistory } from "react-router-dom";
import {
  githubProvider,
  googleProvider,
  socialMediaProvider,
} from "../utils/auth-firebase";
import { useAuthContext } from "../context/AuthProvider";
import { useDisconnect } from "../utils/useDisconnect";

const Homepage: FC = () => {
  const { dispatch, currentUser, protectedRouteJoiningError, redirectTo } =
    useAuthContext();
  const [error, setError] = useState("");
  const history = useHistory();

  useDisconnect();

  useEffect(() => {
    if (currentUser) history.push("/");
  }, [currentUser, history]);

  const anonLoginHandler = () => {
    history.push("/anonLogin");
  };

  const handleLogin = async (provider: firebase.auth.AuthProvider) => {
    const res = await socialMediaProvider(provider);
    if (typeof res === "string") {
      setError(res);
    } else if (res) {
      dispatch({ type: "SET-USER", payload: res });
      if (redirectTo) {
        history.push(redirectTo);
      } else {
        history.push("/");
      }
    }
  };

  return (
    <main id="home">
      <div className="btn-container">
        <div className="clamp-container">
          <button onClick={() => handleLogin(googleProvider)}>
            <FaGoogle /> Login With Google
          </button>
          <button onClick={() => handleLogin(githubProvider)}>
            <FaGithub /> Login With Github
          </button>
          <button onClick={anonLoginHandler}>
            <GoPerson /> Join As A Guest
          </button>
          {error && (
            <p style={{ textAlign: "center", color: "red" }}>{error}</p>
          )}
          {protectedRouteJoiningError && (
            <p style={{ textAlign: "center", color: "red" }}>
              {protectedRouteJoiningError}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Homepage;
