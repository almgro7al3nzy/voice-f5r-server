import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import Activate from "./pages/Activate/Activate";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./Hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";

function App() {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Just a minute it's loading..." />
  ) : (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/" element={<Home />} exact />
            <Route path="/authenticate" element={<Authenticate />} />
          </Route>

          <Route element={<SemiProtectedRoute />}>
            <Route path="/activate" element={<Activate />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:id" element={<Room />} exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


const GuestRoute = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return <>{isAuth ? <Navigate to="/activate" /> : <Outlet />}</>;
};

const SemiProtectedRoute = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {!isAuth ? (
        <Navigate to="/" />
      ) : isAuth && !user.activated ? (
        <Outlet />
      ) : (
        <Navigate to="/rooms" />
      )}
    </>
  );
};

const ProtectedRoute = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {!isAuth ? (
        <Navigate to="/" />
      ) : isAuth && !user.activated ? (
        <Navigate to="/activate" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default App;
