// src/components/dashboard/SessionCard.tsx
'use client';

import React, { useState } from 'react';
import styles from './SessionCard.module.css';
import { toggleBookmark } from '../../services/stubs';

interface SessionCardProps {
  id: string;
  title: string;
  time: string;
  tags: string[];
  bookmarkedInitial?: boolean;
}

export const SessionCard: React.FC<SessionCardProps> = ({ id, title, time, tags, bookmarkedInitial = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarkedInitial);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleBookmark(id);
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={styles.card}>
      <div className={styles.graphicArea}>
        <div className={styles.miniGfx}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <button 
            className={`${styles.bookmark} ${isBookmarked ? styles.active : ''}`}
            onClick={handleBookmark}
            aria-label="Bookmark session"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" />
            </svg>
          </button>
        </div>
        <div className={styles.time}>{time}</div>
        <div className={styles.tags}>
          {tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
