// src/components/speakers/SpeakerCard.tsx
import React from 'react';
import styles from './SpeakerCard.module.css';

interface SpeakerCardProps {
  name: string;
  title: string;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ name, title }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}></div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};
