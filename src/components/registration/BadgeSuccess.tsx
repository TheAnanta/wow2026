// src/components/registration/BadgeSuccess.tsx
import React, { useEffect, useRef } from 'react';
import { analyticsService } from '../../services/analytics';

interface BadgeSuccessProps {
  badgeName: string;
  onClose?: () => void;
}

const BadgeBanner = ({ isWOWPlus }: { isWOWPlus: boolean }) => (
  <div className="relative w-full h-40 md:h-56 bg-[#F1F3F4] dark:bg-grey-900! overflow-hidden border-b border-grey-200 dark:border-grey-700 flex items-center px-8 md:px-14 transition-colors">
    <div className="flex-1 z-10">
      <h2 className="text-[1.875rem] md:text-[2.25rem] font-medium text-grey-900 dark:text-white tracking-tight leading-tight">
        {isWOWPlus ? 'Welcome to the Community' : 'Register for WOW'}
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
  const isWOWPlus = badgeName === 'WOW+ Insider - Explorer' || badgeName === 'Arcade Insider - Explorer';
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Track that they actually reached the success screen
    analyticsService.trackCheckoutActivity('success_screen', badgeName, 'viewed');

    // Flag this session for post-purchase journey tracking (next 5 mins)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('wow_recent_purchase', Date.now().toString());
    }
  }, [badgeName]);

  const handleFinish = (action: string, target?: string) => {
    const duration = (Date.now() - startTimeRef.current) / 1000;
    analyticsService.trackTiming('post_payment', action, duration, badgeName);
    if (action === 'done' && onClose) {
      onClose();
    }
  };
  return (
    <div className="flex-col w-full animate-fade-in transition-colors bg-white dark:bg-grey-800!">
      <BadgeBanner isWOWPlus={isWOWPlus} />

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
          This badge was saved to your WOW Developer Profile.
        </p>

        {/* The Badge Container Card - Switched to static official badge image */}
        <div className="w-full max-w-[440px] bg-white dark:bg-grey-800! border-2 border-grey-bg dark:border-grey-700 rounded-3xl p-8 pt-6 flex flex-col items-center justify-center mb-10 overflow-hidden">
          <img
            src={isWOWPlus ? "/images/wow26-arcade-badge-registration.png" : "/images/io24-badge-registration.svg"}
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
            <span className="font-medium text-grey-600 dark:text-grey-400 mb-4">Share your badge</span>
            <div className="flex gap-4">
              {[
                { icon: 'https://www.gstatic.com/devrel-devsite/prod/v4d48f48533ab79e337c1ef540cdee78fc2ebfef5357fb91b7a6b4a7aa8d0c6c8/images/share_facebook.svg', alt: 'facebook' },
                { icon: 'https://www.gstatic.com/devrel-devsite/prod/v4d48f48533ab79e337c1ef540cdee78fc2ebfef5357fb91b7a6b4a7aa8d0c6c8/images/share_twitter.svg', alt: 'twitter' },
                { icon: 'https://www.gstatic.com/devrel-devsite/prod/v4d48f48533ab79e337c1ef540cdee78fc2ebfef5357fb91b7a6b4a7aa8d0c6c8/images/share_linkedin.svg', alt: 'linkedin' },
                { icon: 'link', alt: 'copy link' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => analyticsService.trackCTA(`share_badge_${item.alt}`, 'BadgeSuccess')}
                >
                  {item.icon === 'link' ? (
                    <div className="w-full h-full bg-[#303234] rounded-md flex items-center justify-center">
                      <svg viewBox="0 -960 960 960" width="28" height="28" fill="currentColor" className="text-white">
                        <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                      </svg>
                    </div>
                  ) : (
                    <img src={item.icon} alt={item.alt} className="w-full h-full object-contain brightness-50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[0.9375rem] text-grey-900 dark:text-white">
            or go to your <a href="/profile" className="underline decoration-2 underline-offset-4 cursor-pointer font-bold hover:no-underline px-1" onClick={() => analyticsService.trackNavigation('Developer Profile', 'BadgeSuccess', '/profile')}>developer profile</a>
          </p>

          <button
            onClick={() => {
              analyticsService.trackCTA('Done', 'BadgeSuccess');
              handleFinish('done');
            }}
            className="px-10 mt-4 py-3.5 bg-grey-900 dark:bg-white text-white dark:text-grey-900 rounded-full font-bold text-[1rem] hover:bg-black dark:hover:bg-grey-100! transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
