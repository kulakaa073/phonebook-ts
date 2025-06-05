import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import clsx from 'clsx';
import styles from './Navigation.module.css';

export const Navigation = memo(() => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.isActive);
  };
  return (
    <div>
      <NavLink to="/" className={getActiveLinkClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={getActiveLinkClass}>
          Contacts
        </NavLink>
      )}
    </div>
  );
});
