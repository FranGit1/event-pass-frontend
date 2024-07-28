import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import { useNavigation } from "../hooks/use-navigation";
import { routes } from "../navigation/admin/routing";

const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const { navigate } = useNavigation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!auth?.token && !token) {
      localStorage.setItem("intendedDestination", location.pathname);
      navigate(routes.auth.login);
    }
  }, [auth, token, location.pathname]);

  // return auth?.token || token ? <Outlet /> : <Navigate to={`${slug}/${routes.auth.login}`} replace />;
  return <Outlet />;
};

export default RequiredAuth;
