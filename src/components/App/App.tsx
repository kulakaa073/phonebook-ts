import Layout from '../Layout/Layout';

import { selectTheme } from '../../redux/theme/selectors';

import { Route, Routes } from 'react-router';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import type { AppDispatch } from '../../redux/store';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(
  () => import('../../pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(
  () => import('../../pages/ContactsPage/ContactsPage')
);
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage')
);
const UserPage = lazy(() => import('../../pages/UserPage/UserPage'));
//const page = lazy(() => import());

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);
  const theme = useSelector(selectTheme); // e.g., 'light' or 'dark'

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  element={<RegistrationPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  element={<LoginPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/register"
                  element={<ContactsPage />}
                />
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute redirectTo="/login" element={<UserPage />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
