import { memo } from 'react';
import { NavLink } from 'react-router';
import clsx from 'clsx';
import styles from './AuthNav.module.css';

export const AuthNav = memo(() => {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(styles.link, isActive && styles.isActive);
  };
  return (
    <div className={styles.container}>
      <NavLink to="/register" className={getActiveLinkClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={getActiveLinkClass}>
        Log In
      </NavLink>
    </div>
  );
});
