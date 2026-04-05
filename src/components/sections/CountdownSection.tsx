// src/components/sections/CountdownSection.tsx
'use client';

import { useEffect, useState } from 'react';

// Target: Google WOW 2026 — May 20, 2026 10:00 AM PDT (UTC-7)
const TARGET_DATE = new Date('2026-06-04T08:00:00+05:30');

const BASE_IMAGE_URL = 'https://io.google/2024/app/images/io24-cd-';

/** Split a number into its individual digits (max 2 digits shown). */
function getDigits(value: number): number[] {
  const clamped = Math.max(0, value);
  if (clamped >= 10) {
    return [Math.floor(clamped / 10) % 10, clamped % 10];
  }
  return [clamped % 10];
}

const CARD_GRADIENTS = [
  'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)',
  'linear-gradient(270deg, rgb(255,203,50) 6.94%, rgb(255,203,50) 27.99%, rgb(52,168,83) 73.59%, rgb(52,168,83) 94.64%)',
  'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)',
  'linear-gradient(270deg, rgb(83,130,235) 1.91%, rgb(83,130,235) 25.69%, rgb(159,108,212) 51.37%, rgb(234,67,53) 79.9%, rgb(234,67,53) 97.02%)',
];

interface CountdownUnit {
  value: number;
  label: string;
  gradient: string;
}

interface CountdownCardProps extends CountdownUnit { }

function CountdownCard({ value, label, gradient }: CountdownCardProps) {
  const digits = getDigits(value);

  return (
    <div className="relative h-[90px] md:h-[184px]">
      {/* Front card */}
      <div className="absolute bg-grey-bg dark:bg-grey w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-y-1 h-full">
          <div className="flex flex-row justify-center gap-2 h-[50%] md:h-[90px]">
            {digits.map((digit, i) => (
              <img
                key={i}
                src={`${BASE_IMAGE_URL}${digit}.svg`}
                aria-hidden="true"
                width="80"
                height="88"
                className="w-auto h-auto hcm-button"
                loading="lazy"
              />
            ))}
          </div>
          <span className="visually-hidden">{value}</span>
          <span className="text-grey dark:text-white font-medium text-[14px] md:text-[18.567px]">
            {label}
          </span>
        </div>
      </div>
      {/* Shadow cards */}
      <div
        style={{ backgroundImage: gradient }}
        className="absolute w-full h-full top-[23px] md:top-[36px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
      />
      <div
        style={{ backgroundImage: gradient }}
        className="absolute w-full h-full top-[11px] md:top-[19px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
      />
    </div>
  );
}

function getTimeRemaining() {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE.getTime() - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function CountdownSection() {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: CountdownUnit[] = [
    { value: time.days, label: 'Days', gradient: CARD_GRADIENTS[0] },
    { value: time.hours, label: 'Hours', gradient: CARD_GRADIENTS[1] },
    { value: time.minutes, label: 'Minutes', gradient: CARD_GRADIENTS[2] },
    { value: time.seconds, label: 'Seconds', gradient: CARD_GRADIENTS[3] },
  ];

  return (
    <div className="h-countdown">
      <div
        aria-label="Countdown to Google WOW 2026"
        aria-live="off"
        className="countdown-sr-announcer grid grid-cols-countdown-cards-2 md:grid-cols-countdown-cards-4 pb-[2.3rem] gap-y-8 gap-6"
      >
        <span className="visually-hidden">
          Time left until Google WOW 2026: {time.days} Days {time.hours} Hours {time.minutes} Minutes {time.seconds} Seconds
        </span>
        {units.map((unit) => (
          <CountdownCard key={unit.label} {...unit} />
        ))}
      </div>
    </div>
  );
}
