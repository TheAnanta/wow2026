// src/components/sections/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footerBento}>
        <div className={styles.footerLogo}>
          Google <span>for Developers</span>
        </div>
        <div className={styles.links}>
          <a href="#">I/O 2026</a>
          <a href="#">Privacy & terms</a>
          <a href="#">Community guidelines</a>
          <a href="#">FAQ</a>
          <a href="#">English</a>
        </div>
        <div className={styles.socials}>
          <div className={styles.socialIcon}></div>
          <div className={styles.socialIcon}></div>
          <div className={styles.socialIcon}></div>
          <div className={styles.socialIcon}></div>
        </div>
      </footer>
    </div>
  );
};
