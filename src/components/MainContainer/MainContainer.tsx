import React from 'react';
import type { ReactNode } from 'react';
import styles from './MainContainer.module.css';

interface MainContainerProps {
    children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => (
    <main className={styles.mainContainer}>
        {children}
    </main>
);

export default MainContainer;