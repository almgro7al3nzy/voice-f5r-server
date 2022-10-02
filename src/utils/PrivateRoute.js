import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect } from "react";

// I cant figure out the types for ...rest so imma just use js for this!
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { pathname } = useLocation();
  const { currentUser, dispatch } = useAuthContext();
  useEffect(() => {
    dispatch({
      type: "REDIRECT-AFTER-LOGIN",
      payload: { redirectTo: pathname },
    });
    if (!currentUser && pathname !== "/") {
      dispatch({ type: "TRY-JOIN-WITHOUT-LOGIN" });
    }
  }, [currentUser, dispatch, pathname]);

  return (
    <Route
      {...rest}
      children={(props) =>
        !!currentUser ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default PrivateRoute;
