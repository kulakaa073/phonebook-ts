import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router';
import { logout } from '../../redux/auth/operations';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './UserMenu.module.css';
import clsx from 'clsx';
import toast, { Toaster, type ToastOptions } from 'react-hot-toast';
import type { AppDispatch } from '../../redux/store';

export const UserMenu = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const menuRef = useRef<HTMLDivElement>(null);

  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.link, isActive && styles.isActive);

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => toasts.success())
      .catch(() => toasts.fail());
    setIsMenuOpen(false);
  };

  const toastOptions: ToastOptions = {
    duration: 4000,
    position: 'top-right',
  };

  const toasts = {
    success: () =>
      toast.success('Logged out successfully! Gooby...', toastOptions),
    fail: () =>
      toast.error(
        "Sorry, we're encountered an error! Try again later!",
        toastOptions
      ),
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const getMenuToggleClass = clsx(styles.link, isMenuOpen && styles.isActive);

  // Attach eventListener if menu is open to close it on click
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    // Check if menu is opened first
    if (isMenuOpen) {
      console.log('attaching event listener');
      document.addEventListener('mousedown', handleClick);
    }
    // remove event listener on refresh, remove always just in case junk
    return () => {
      console.log('removing event listener');
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef}>
      <p onClick={toggleMenu} className={getMenuToggleClass}>
        Menu
      </p>
      {isMenuOpen && (
        <div className={styles.menuDropdown}>
          <NavLink
            to="/user"
            onClick={toggleMenu}
            className={getActiveLinkClass}
          >
            User Page
          </NavLink>
          <button onClick={handleLogOut} className={styles.logoutButton}>
            Log Out
          </button>
          <Toaster />
        </div>
      )}
    </div>
  );
});
