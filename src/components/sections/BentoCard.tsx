// src/components/sections/BentoCard.tsx
import React from 'react';
import { analyticsService } from '../../services/analytics';

interface BentoCardProps {
  id?: string;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  id,
  title,
  description,
  buttonText,
  onButtonClick,
  className,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div
      id={id}
      className={`relative flex flex-col md:flex-row justify-between overflow-hidden rounded-[20px] border-2 border-grey-900 bg-grey-bg p-[30px] md:p-[40px] transition-all duration-200 group ${className || ''}`}
    >
      <div className="z-10 flex flex-col items-start">
        <h3 className="s-h3 md:text-[44px] mb-4 text-grey-900 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="l-p1 md:text-[20px] mb-8 text-grey-600 max-w-[90%] font-normal">
            {description}
          </p>
        )}
        {buttonText && (
          <button
            onClick={() => {
              analyticsService.trackCTA(buttonText, `BentoCard_${title.replace(/\s+/g, '_')}`);
              if (onButtonClick) onButtonClick();
            }}
            className="cta-secondary no-dark-mode"
          >
            {buttonText}
          </button>
        )}
      </div>

      {imageSrc && (
        <div className="relative mt-8 md:mt-0 md:absolute md:bottom-0 md:right-0 w-full md:w-1/2 h-[200px] md:h-full flex items-end justify-end overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt || ''}
            className="w-full h-auto object-contain object-bottom-right transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
    </div>
  );
};
