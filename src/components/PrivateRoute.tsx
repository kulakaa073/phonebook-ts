import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

import { type ReactElement } from 'react';

interface PrivateRouteProps {
  element: ReactElement;
  redirectTo?: string;
}

export const PrivateRoute = ({
  element,
  redirectTo = '/',
}: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? element : <Navigate to={redirectTo} />;
};
