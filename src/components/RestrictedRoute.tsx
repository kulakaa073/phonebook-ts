import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

import type { RouteWrapperProps } from '../types';

export const RestrictedRoute = ({
  element,
  redirectTo = '/',
}: RouteWrapperProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
};
