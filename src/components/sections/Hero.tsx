// src/components/sections/Hero.tsx
import React from 'react';
import styles from './Hero.module.css';
import { Button } from '../ui/Button';

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Tune in for Google I/O</h1>
      <h2 className={styles.date}>May 14, 2026</h2>
      <p className={styles.subtitle}>Watch the keynotes and see demonstrations to hear our latest announcements.</p>
      
      <Button variant="primary" onClick={onRegisterClick}>Register</Button>

      <div className={styles.logoGraphic}>
        <div className={styles.logoRect}></div>
        <div className={styles.logoSlash}></div>
        <div className={styles.logoCircle}></div>
      </div>

      <div className={styles.countdown}>
        <div className={styles.timeBox}>
          <span className={styles.timeNumber}>54</span>
          <span className={styles.timeLabel}>Days</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.timeNumber}>06</span>
          <span className={styles.timeLabel}>Hours</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.timeNumber}>43</span>
          <span className={styles.timeLabel}>Mins</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.timeNumber}>21</span>
          <span className={styles.timeLabel}>Secs</span>
        </div>
      </div>
    </section>
  );
};
