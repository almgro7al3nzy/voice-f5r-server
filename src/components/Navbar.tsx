import { FC } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const Navbar: FC = () => {
  const { signOut, currentUser } = useAuthContext();
  const history = useHistory();

  return (
    <nav style={{ height: "10vh", zIndex: 1 }}>
      <div className="logo">Engage Project!</div>
      <div className="auth">
        <p>Hi {currentUser?.displayName}</p>
        <button
          onClick={() => {
            signOut().then(() => {
              history.push("/login");
            });
          }}
        >
          Sign Out?
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
