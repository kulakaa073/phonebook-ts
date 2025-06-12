import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { selectTheme } from '../../redux/theme/selectors';
import { toggleTheme } from '../../redux/theme/slice';
import styles from './UserPage.module.css';
import toast, { Toaster, type ToastOptions } from 'react-hot-toast';
import type { AppDispatch } from '../../redux/store';

export default function UserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => toasts.success())
      .catch(() => toasts.fail());
  };

  const handleThemeSwitch = () => {
    console.log('handlethemeswitch');
    dispatch(toggleTheme());
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

  return (
    <div className={styles.container}>
      <h2>User information</h2>
      <ul className={styles.infoList}>
        <li className={styles.infoField}>
          <p>Name: {userData.name}</p>
        </li>
        <li>
          <p>Email: {userData.email}</p>
        </li>
        <li>
          <p>Current theme: {theme}</p>
          <button onClick={handleThemeSwitch} className={styles.button}>
            Switch to {theme === 'light' ? 'dark' : 'light'}
          </button>
        </li>
      </ul>

      <button onClick={handleLogOut} className={styles.button}>
        Log Out
      </button>
      <Toaster />
    </div>
  );
}
