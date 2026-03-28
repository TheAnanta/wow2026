// src/components/speakers/FilterSidebar.tsx
import React from 'react';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  topics: string[];
  selectedTopics: string[];
  onToggleTopic: (topic: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ topics, selectedTopics, onToggleTopic }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Topics</div>
      <div className={styles.list}>
        {topics.map(topic => {
          const isChecked = selectedTopics.includes(topic);
          return (
            <label key={topic} className={styles.item}>
              <div 
                className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}
                onClick={() => onToggleTopic(topic)}
              >
                {isChecked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              <span className={styles.label}>{topic}</span>
            </label>
          );
        })}
      </div>
    </aside>
  );
};
