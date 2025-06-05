import { NavLink } from 'react-router';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      Nothing here, go <NavLink to="/">Home</NavLink>
    </div>
  );
}
