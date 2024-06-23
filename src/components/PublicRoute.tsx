import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const PublicRoute = () => {
  const isLoggedIn = Cookies.get("accessToken");

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};
