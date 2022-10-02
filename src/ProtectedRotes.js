import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  let isAuth = false;
  return <>{isAuth ? <Navigate to="/rooms" /> : <Outlet />}</>;
};




const SemiProtectedRoute = () => {
  
}


export default {GuestRoute,SemiProtectedRoute};