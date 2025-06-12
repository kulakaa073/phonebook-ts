import type { ReactElement } from 'react';
import { AppBar } from '../AppBar/AppBar';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactElement;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <AppBar />
      {children}
    </div>
  );
}
