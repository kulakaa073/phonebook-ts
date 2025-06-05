import { AppBar } from '../AppBar/AppBar';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <AppBar />
      {children}
    </div>
  );
}
