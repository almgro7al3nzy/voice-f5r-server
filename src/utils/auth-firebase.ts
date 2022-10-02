import firebase from "firebase/app";
import "firebase/auth";

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

export const socialMediaProvider = async (
  provider: firebase.auth.AuthProvider
): Promise<firebase.User | null | string> => {
  try {
    const res = await firebase.auth().signInWithPopup(provider);
    return res.user;
  } catch (err) {
    return err.message;
  }
};
