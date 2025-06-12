import { memo } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { UserMenu } from '../UserMenu/UserMenu';
import { AuthNav } from '../AuthNav/AuthNav';
import styles from './AppBar.module.css';

export const AppBar = memo(() => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={styles.container}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
});
