import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

import type { RouteWrapperProps } from '../types';

export const PrivateRoute = ({
  element,
  redirectTo = '/',
}: RouteWrapperProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? element : <Navigate to={redirectTo} />;
};
