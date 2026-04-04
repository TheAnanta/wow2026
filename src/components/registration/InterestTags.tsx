// src/components/registration/InterestTags.tsx
import React from 'react';

interface InterestTagsProps {
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
}

const INTERESTS = [
  'Android', 'Mobile', 'AI/Machine Learning', 'Web', 'Cloud', 'Open Source', 'Design', 'Location/Maps'
];

export const InterestTags: React.FC<InterestTagsProps> = ({ selectedInterests, toggleInterest }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {INTERESTS.map(interest => {
        const selected = selectedInterests.includes(interest);
        return (
          <button
            key={interest}
            type="button"
            onClick={() => toggleInterest(interest)}
            className={`py-[0.4rem] px-4 border border-[#000000] rounded-full text-[0.8125rem] font-semibold cursor-pointer transition-colors duration-200 ${
              selected ? 'bg-[#202124] text-white' : 'bg-white text-[#202124]'
            }`}
          >
            {interest}
          </button>
        );
      })}
    </div>
  );
};
