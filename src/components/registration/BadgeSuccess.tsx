// src/components/registration/BadgeSuccess.tsx
import React from 'react';
import styles from './Badge.module.css';

export const BadgeSuccess: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>You earned a badge!</h2>
      <p className={styles.subtitle}>I/O 2026 - Registered</p>
      
      <p className={styles.infoText}>
        This badge was saved to your Google Developer Profile.
      </p>

      {/* 3D Isometric Badge */}
      <div className={styles.badgeWrapper}>
        <div className={styles.badgeDisc}>
          {/* Bottom thickness */}
          <div className={styles.badgeSide}></div>
          
          {/* Main face */}
          <div className={styles.badgeFace}>
            <div className={styles.wireframeLines}></div>
            <p className={styles.ioText}>I/O</p>
            <p className={styles.yearText}>2026</p>
          </div>
        </div>
      </div>

      <p className={styles.registeredLabel}>I/O 2026 - Registered</p>

      <div className={styles.shareLabel}>Share your badge</div>
      <div className={styles.socialGrid}>
        <div className={styles.socialBtn}>f</div>
        <div className={styles.socialBtn}>t</div>
        <div className={styles.socialBtn}>in</div>
        <div className={styles.socialBtn}>🔗</div>
      </div>

      <div className={styles.footerLink}>
        or go to your <a href="#">developer profile</a>
      </div>
    </div>
  );
};
