// src/components/registration/InterestTags.tsx
import React from 'react';
import styles from './Registration.module.css';

interface InterestTagsProps {
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
}

const INTERESTS = [
  'Android', 'Mobile', 'AI/Machine Learning', 'Web', 'Cloud', 'Open Source', 'Design', 'Location/Maps'
];

export const InterestTags: React.FC<InterestTagsProps> = ({ selectedInterests, toggleInterest }) => {
  return (
    <div className={styles.interestGrid}>
      {INTERESTS.map(interest => (
        <button
          key={interest}
          type="button"
          onClick={() => toggleInterest(interest)}
          className={`${styles.interestTag} ${selectedInterests.includes(interest) ? styles.interestTagSelected : ''}`}
        >
          {interest}
        </button>
      ))}
    </div>
  );
};
