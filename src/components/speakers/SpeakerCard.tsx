// src/components/speakers/SpeakerCard.tsx
import React from 'react';

interface SpeakerCardProps {
  name: string;
  title: string;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ name, title }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 max-md:flex-row max-md:items-center max-md:text-left max-md:border max-md:border-[#000000] max-md:rounded-xl max-md:p-6 max-md:mb-4">
      <div
        className="w-[120px] h-[120px] rounded-full mb-6 border border-[#000000] overflow-hidden relative flex-shrink-0 max-md:w-16 max-md:h-16 max-md:mb-0 max-md:mr-6"
        style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)' }}
      />
      <div>
        <div className="text-lg font-semibold mb-2 text-[#202124] leading-[1.3]">{name}</div>
        <div className="text-sm text-[#5f6368] leading-[1.4]">{title}</div>
      </div>
    </div>
  );
};
