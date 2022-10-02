import React, { useEffect, useReducer } from "react";
import firebase from "firebase/app";
import "firebase/auth";

type DispatchType = {
  type: string;
  payload?: any;
};

type AnonUser = {
  displayName: any;
  email: any;
  isAnonymous: boolean;
  photoURL?: null;
};

interface ReturnType extends StateType {
  dispatch: React.Dispatch<DispatchType>;
  signOut: () => Promise<void>;
}

type StateType = {
  isAuthenticating: boolean;
  currentUser: firebase.User | AnonUser | null;
  protectedRouteJoiningError: string;
  redirectTo: string;
};

const authState: StateType = {
  isAuthenticating: true,
  currentUser: null,
  protectedRouteJoiningError: "",
  redirectTo: "",
};

const authReducer = (state: StateType, action: DispatchType): StateType => {
  switch (action.type) {
    case "GET-USER":
      return { ...state, currentUser: action.payload, isAuthenticating: false };
    case "SET-USER":
      return {
        ...state,
        currentUser: action.payload,
        protectedRouteJoiningError: "",
      };
    case "ANON-LOGIN":
      const anonUser = {
        displayName: action.payload.name,
        email: action.payload.email,
        isAnonymous: true,
      };
      localStorage.setItem("anon-user", JSON.stringify(anonUser));
      return { ...state, currentUser: anonUser };
    case "SIGN-OUT":
      localStorage.removeItem("anon-user");
      return { ...state, currentUser: null };
    case "TRY-JOIN-WITHOUT-LOGIN":
      return {
        ...state,
        protectedRouteJoiningError:
          "You Need To Login Before You can Join The Meet!!!",
      };
    case "REDIRECT-AFTER-LOGIN":
      return { ...state, redirectTo: action.payload.redirectTo };
    default:
      return authState;
  }
};

const AuthContext = React.createContext<ReturnType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authState);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        const anonUser = localStorage.getItem("anon-user");
        if (anonUser) user = JSON.parse(anonUser);
      }
      dispatch({ type: "GET-USER", payload: user });
    });
    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      dispatch({ type: "SIGN-OUT" });
    } catch (err) {
      alert("error logining out, contact nishit at\nnishitdua175@gmail.com !!");
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, signOut }}>
      {!state.isAuthenticating && children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return React.useContext(AuthContext)!;
};

export { AuthProvider, useAuthContext };
