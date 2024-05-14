import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth/useAuth';
import { routes } from '../navigation/buyer/routing';
import { useNavigation } from '../hooks/use-navigation';

const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const { navigateWithSlug } = useNavigation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!auth?.token && !token) {
      localStorage.setItem('intendedDestination', location.pathname);
      navigateWithSlug(routes.auth.login);
    }
  }, [auth, token, location.pathname]);

  // return auth?.token || token ? <Outlet /> : <Navigate to={`${slug}/${routes.auth.login}`} replace />;
  return <Outlet />;
};

export default RequiredAuth;
