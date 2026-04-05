// src/components/sections/CountdownSection.tsx

interface CountdownCardProps {
  gradient: string;
  images: string[];
  label: string;
}

function CountdownCard({ gradient, images, label }: CountdownCardProps) {
  return (
    <div className="relative h-[90px] md:h-[184px]">
      {/* Front card */}
      <div className="absolute bg-grey-bg dark:bg-grey w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-y-1 text-md:gap-y-4 h-full">
          <div className="flex flex-row justify-center gap-2 h-[50%] md:h-[90px]">
            {images.map((src, i) => (
              <img key={i} src={src} aria-hidden="true" width="80" height="88" className="w-auto h-auto hcm-button" loading="lazy" />
            ))}
          </div>
          <span className="text-grey dark:text-white font-medium text-[14px] text-md:text-[18.567px]">{label}</span>
        </div>
      </div>
      {/* Shadow cards */}
      <div style={{ backgroundImage: gradient }} className="absolute w-full h-full top-[23px] md:top-[36px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover" />
      <div style={{ backgroundImage: gradient }} className="absolute w-full h-full top-[11px] md:top-[19px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover" />
    </div>
  );
}

const COUNTDOWN_CARDS: CountdownCardProps[] = [
  {
    gradient: 'linear-gradient(90deg, rgb(66, 133, 244) -36.98%, rgb(66, 133, 244) 22.31%, rgb(52, 168, 83) 78.95%, rgb(52, 168, 83) 132.93%)',
    images: [
      'https://io.google/2024/app/images/io24-cd-1.svg',
      'https://io.google/2024/app/images/io24-cd-6.svg',
    ],
    label: 'Days',
  },
  {
    gradient: 'linear-gradient(270deg, rgb(255, 203, 50) 6.94%, rgb(255, 203, 50) 27.99%, rgb(52, 168, 83) 73.59%, rgb(52, 168, 83) 94.64%)',
    images: ['https://io.google/2024/app/images/io24-cd-4.svg'],
    label: 'Hours',
  },
  {
    gradient: 'linear-gradient(90deg, rgb(255, 203, 50) -0.15%, rgb(255, 203, 50) 17.85%, rgb(244, 104, 49) 52.85%, rgb(234, 67, 53) 78.85%, rgb(234, 67, 53) 99.85%)',
    images: [
      'https://io.google/2024/app/images/io24-cd-5.svg',
      'https://io.google/2024/app/images/io24-cd-8.svg',
    ],
    label: 'Minutes',
  },
  {
    gradient: 'linear-gradient(270deg, rgb(83, 130, 235) 1.91%, rgb(83, 130, 235) 25.69%, rgb(159, 108, 212) 51.37%, rgb(234, 67, 53) 79.9%, rgb(234, 67, 53) 97.02%)',
    images: [
      'https://io.google/2024/app/images/io24-cd-5.svg',
      'https://io.google/2024/app/images/io24-cd-1.svg',
    ],
    label: 'Seconds',
  },
];

export function CountdownSection() {
  return (
    <div className="h-countdown">
      <div
        aria-label="Countdown to I/O 2024"
        className="countdown-sr-announcer grid grid-cols-countdown-cards-2 md:grid-cols-countdown-cards-4 pb-[2.3rem] gap-y-8 gap-6"
      >
        <span className="visually-hidden">Time left until I/O 2024 16 Days 4 Hours 58 Minutes 51 Seconds</span>
        {COUNTDOWN_CARDS.map((card) => (
          <CountdownCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}
