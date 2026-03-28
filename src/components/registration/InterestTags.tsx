// src/components/registration/InterestTags.tsx
import React from 'react';
import styles from './Registration.module.css';

interface InterestTagsProps {
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
}

const INTERESTS = [
  'Accessibility', 'Android', 'AI/Machine Learning', 'AR/VR', 'Chrome OS', 'Cloud', 
  'Design', 'Firebase', 'Mobile', 'Open Source', 'Security', 'Web', 'Workshop'
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
