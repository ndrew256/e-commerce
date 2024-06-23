import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoute = () => {
  const isLoggedIn = Cookies.get("accessToken");

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
