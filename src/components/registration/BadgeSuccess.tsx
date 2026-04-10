// src/components/registration/BadgeSuccess.tsx
import React from 'react';

interface BadgeSuccessProps {
  badgeName: string;
  onClose?: () => void;
}

const BadgeBanner = ({ isArcade }: { isArcade: boolean }) => (
  <div className="relative w-full h-40 md:h-56 bg-[#F1F3F4] dark:bg-grey-900 overflow-hidden border-b border-grey-200 dark:border-grey-700 flex items-center px-8 md:px-14 transition-colors">
    <div className="flex-1 z-10">
      <h2 className="text-[1.875rem] md:text-[2.25rem] font-medium text-grey-900 dark:text-white tracking-tight leading-tight">
        {isArcade ? 'Welcome to the Community' : 'Register for WOW'}
      </h2>
    </div>

    {/* Decorative Background - Using pencil road SVGs */}
    <div className="absolute bottom-0 -right-16 h-full w-[90%] md:w-[78%] pointer-events-none select-none">
      <picture className="w-full h-full">
        <source srcSet="/images/io24-pencil-road-centered-dark.svg" media="(prefers-color-scheme: dark)" />
        <img
          src="/images/io24-pencil-road-centered.svg"
          alt=""
          className="w-full h-full object-contain object-bottom-right"
        />
      </picture>
    </div>
  </div>
);

export const BadgeSuccess: React.FC<BadgeSuccessProps> = ({ badgeName, onClose }) => {
  const isArcade = badgeName === 'Arcade Insider - Explorer';

  return (
    <div className="flex flex-col w-full animate-fade-in transition-colors bg-white dark:bg-grey-800">
      <BadgeBanner isArcade={isArcade} />

      {/* Content Body */}
      <div className="flex flex-col items-center text-center p-8 md:p-12">
        <div className="mb-4">
          <h2 className="text-[1.75rem] md:text-[2rem] font-medium text-grey-900 dark:text-white tracking-tight leading-[1.1] mb-1">
            You earned a badge!
          </h2>
          <p className="text-[1.75rem] md:text-[2rem] font-medium text-grey-900 dark:text-white tracking-tight leading-[1.1]">
            {badgeName}
          </p>
        </div>

        <p className="text-[0.9375rem] text-grey-600 dark:text-grey-400 mb-10 max-w-[320px] leading-relaxed">
          This badge was saved to your Google Developer Profile.
        </p>

        {/* The Badge Container Card - Switched to static official badge image */}
        <div className="w-full max-w-[440px] bg-white dark:bg-grey-800 border-2 border-grey-bg dark:border-grey-700 rounded-3xl p-8 pt-6 flex flex-col items-center justify-center mb-10 overflow-hidden">
          <img
            src="/images/io24-badge-registration.svg"
            alt={badgeName}
            className="w-[200px] md:w-[240px] h-max transition-transform duration-700 hover:scale-[1.05]"
          />

          <p className="mt-4 mb-10 text-[1.25rem] md:text-[1.5rem] font-medium text-grey-900 dark:text-white tracking-tight leading-none">
            {badgeName}
          </p>
        </div>

        {/* Share Section */}
        <div className="flex flex-col items-center gap-8 w-full max-w-[400px]">
          <div className="flex flex-col items-center">
            <span className="text-[0.875rem] font-medium text-grey-600 dark:text-grey-400 mb-4 uppercase tracking-widest">Share your badge</span>
            <div className="flex gap-4">
              {[
                { icon: '/images/facebook.svg', alt: 'f' },
                { icon: '/images/twitter.svg', alt: 'x' },
                { icon: '/images/linkedin.svg', alt: 'in' },
                { icon: 'link', alt: '🔗' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-grey-900 dark:bg-white rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {item.icon.includes('/') ? (
                    <img src={item.icon} alt={item.alt} className="w-5 h-5 invert dark:invert-0" />
                  ) : (
                    <span className="text-white dark:text-grey-900 text-xl font-bold">{item.alt}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[0.9375rem] text-grey-900 dark:text-white">
            or go to your <span onClick={onClose} className="underline decoration-2 underline-offset-4 cursor-pointer font-bold hover:no-underline px-1">developer profile</span>
          </p>

          <button
            onClick={onClose}
            className="px-10 mt-4 py-3.5 bg-grey-900 dark:bg-white text-white dark:text-grey-900 rounded-full font-bold text-[1rem] hover:bg-black dark:hover:bg-grey-100 transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
