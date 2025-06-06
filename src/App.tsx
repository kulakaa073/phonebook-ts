import Layout from './components/Layout/Layout.jsx';

import { selectTheme } from './redux/theme/selectors.js';

import { Route, Routes } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute.js';
import { RestrictedRoute } from './components/RestrictedRoute.jsx';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const RegistrationPage = lazy(
  () => import('./pages/RegistrationPage/RegistrationPage.jsx')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.js'));
const ContactsPage = lazy(
  () => import('./pages/ContactsPage/ContactsPage.jsx')
);
const NotFoundPage = lazy(
  () => import('./pages/NotFoundPage/NotFoundPage.jsx')
);
const UserPage = lazy(() => import('./pages/UserPage/UserPage.jsx'));
//const page = lazy(() => import());

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const theme: string = useSelector(selectTheme); // e.g., 'light' or 'dark'

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
