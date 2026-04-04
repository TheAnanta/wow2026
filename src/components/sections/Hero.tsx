// src/components/sections/Hero.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface HeroProps {
  onRegisterClick: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TARGET_DATE = new Date('2026-05-14T10:00:00-07:00');

const CountdownDigit = ({ digit }: { digit: number }) => (
  <img 
    src={`https://io.google/2024/app/images/io24-cd-${digit}.svg`} 
    alt={String(digit)}
    className="w-[30px] md:w-[60px] h-auto"
  />
);

const CountdownSeparator = () => (
  <img 
    src="https://io.google/2024/app/images/io24-cd-separator.svg" 
    alt=":"
    className="w-[10px] md:w-[20px] h-auto mx-1 md:mx-2"
  />
);

export const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(TARGET_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderDigits = (value: number) => {
    const s = String(value).padStart(2, '0');
    return (
      <div className="flex gap-1 md:gap-2">
        <CountdownDigit digit={parseInt(s[0])} />
        <CountdownDigit digit={parseInt(s[1])} />
      </div>
    );
  };

  return (
    <section className="relative w-full bg-grey-bg overflow-hidden border-b-[1.2px] md:border-b-2 border-grey-900">
      {/* Background Ribbons */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://io.google/2024/app/images/io24-homepage-hero-bg.webp" 
          alt="" 
          className="hidden md:block w-full h-full object-cover opacity-40" 
        />
        <img 
          src="https://io.google/2024/app/images/io24-homepage-hero-bg-mobile.webp" 
          alt="" 
          className="block md:hidden w-full h-full object-cover opacity-40" 
        />
        <img 
          src="https://io.google/2024/app/images/io24-homepage-hero-ribbon-1.webp" 
          alt="" 
          className="absolute top-0 left-0 w-full h-auto object-contain animate-slide-down" 
        />
      </div>

      <div className="relative z-10 max-w-[1640px] mx-auto px-[20px] md:px-[60px] pt-[60px] pb-[40px] md:pt-[100px] md:pb-[80px] flex flex-col items-center text-center">
        {/* Hero Text */}
        <h1 className="l-h2 sm:l-h1 mb-6 md:mb-8 max-w-[900px]">
          Tune in for Google I/O
          <br />
          <span className="text-google-blue">May 14, 2026</span>
        </h1>
        
        <p className="s-p1 md:text-[24px] max-w-[600px] mb-8 md:mb-12 text-grey-900">
          Watch the keynote live and explore on-demand sessions to hear our latest announcements.
        </p>

        <button 
          onClick={onRegisterClick} 
          className="cta-primary mb-12 md:mb-20"
        >
          Register
        </button>

        {/* Official Countdown structure */}
        <div className="flex flex-wrap items-center justify-center gap-y-8 md:gap-y-0">
          <div className="flex flex-col items-center mx-4 md:mx-8">
            <div className="flex items-center">
              {renderDigits(timeLeft.days)}
            </div>
            <span className="mt-2 text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-grey-600">Days</span>
          </div>

          <CountdownSeparator />

          <div className="flex flex-col items-center mx-4 md:mx-8">
            <div className="flex items-center">
              {renderDigits(timeLeft.hours)}
            </div>
            <span className="mt-2 text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-grey-600">Hours</span>
          </div>

          <CountdownSeparator />

          <div className="flex flex-col items-center mx-4 md:mx-8">
            <div className="flex items-center">
              {renderDigits(timeLeft.minutes)}
            </div>
            <span className="mt-2 text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-grey-600">Minutes</span>
          </div>

          <CountdownSeparator />

          <div className="flex flex-col items-center mx-4 md:mx-8">
            <div className="flex items-center">
              {renderDigits(timeLeft.seconds)}
            </div>
            <span className="mt-2 text-[12px] md:text-[14px] font-medium uppercase tracking-wider text-grey-600">Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Internal helper for Auth logic if needed or passed from parent
function handleAction() {
  // Logic usually passed via props, but added here for the button click
  // In real case, parent onRegisterClick would be used
}
