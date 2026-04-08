// src/components/registration/InterestTags.tsx
import React from 'react';

interface InterestTagsProps {
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
  showAll: boolean;
}

const PRIMARY_INTERESTS = [
  'Android', 'Mobile', 'AI & Machine Learning', 'Web', 'Cloud', 'Open Source', 'Design', 'Location/Maps', 'A11y', 'Ads'
];

const ADDITIONAL_INTERESTS = [
  'AR/VR', 'ChromeOS', 'Firebase', 'Flutter', 'Gaming', 'Google Play', 'Internet of Things (IoT)', 'iOS', 'Payments', 'Search', 'Smart Home Ecosystem', 'Quantum Computing', 'Wear OS', 'Health & Fitness'
];

export const InterestTags: React.FC<InterestTagsProps> = ({ selectedInterests, toggleInterest, showAll }) => {
  const interests = showAll ? [...PRIMARY_INTERESTS, ...ADDITIONAL_INTERESTS] : PRIMARY_INTERESTS;

  return (
    <div className="flex flex-wrap gap-3">
      {interests.map(interest => {
        const selected = selectedInterests.includes(interest);
        return (
          <button
            key={interest}
            type="button"
            onClick={() => toggleInterest(interest)}
            className={`py-1.5 px-4 border text-[0.875rem] font-medium cursor-pointer transition-all duration-200 rounded-lg ${
              selected 
                ? 'bg-grey-900 border-grey-900 text-white' 
                : 'bg-white border-grey-400 text-grey-900 hover:border-grey-900'
            }`}
          >
            {interest}
          </button>
        );
      })}
    </div>
  );
};
