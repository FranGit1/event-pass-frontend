import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useCallback } from 'react';

export const useNavigation = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);
  const location = useLocation();

  const canGoBack = location.key !== 'default';

  const goBackOrReplace = useCallback(
    (url: string) => {
      if (location.key !== 'default') {
        navigate(-1);
      } else {
        navigate(url, { replace: true });
      }
    },
    [navigate, location]
  );
  const replace = useCallback(
    (url: string) => {
      navigate(url, { replace: true });
    },
    [navigate]
  );

  const navigateWithSlug = (path: string, replace?: boolean) => {
    navigate(`/${slug}/${path}`, { replace: replace ? true : false });
  };

  const navigateBuyerHome = () => {
    navigate(`/${slug}`);
  };

  return { navigate, goBack, goBackOrReplace, canGoBack, replace, location, navigateWithSlug, navigateBuyerHome };
};
