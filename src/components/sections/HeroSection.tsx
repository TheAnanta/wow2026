"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FeatureItemProps = {
  label: string;
};

const leftColumnFeatures = [
  "Delicious food and swags",
  "Engaging games",
  "Icebreakers",
  "# I Am Remarkable",
];

const rightColumnFeatures = [
  "Project Showcase",
  "Funding",
  "Pixel 9 Photo Booth",
  "1-1 Mentoring with GDEs",
];

const HERO_COUNTDOWN_TARGET = new Date("2026-05-07T11:59:00+05:30");

function padCountdownValue(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function getCountdownText() {
  const remainingMilliseconds = Math.max(0, HERO_COUNTDOWN_TARGET.getTime() - Date.now());
  const totalMinutes = Math.floor(remainingMilliseconds / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  return `${padCountdownValue(days)}:${padCountdownValue(hours)}:${padCountdownValue(minutes)}`;
}

function useHeroCountdownText() {
  const [countdownText, setCountdownText] = useState(() => getCountdownText());

  useEffect(() => {
    const tick = () => setCountdownText(getCountdownText());
    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return countdownText;
}

function CheckIcon() {
  return (
    <span className="flex h-[clamp(28px,2.8vw,36.96px)] w-[clamp(28px,2.8vw,36.96px)] shrink-0 items-center justify-center rounded-[8.64px] border-[0.6px] border-black bg-white">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 7.6L6.1 10.7L12 4.8" stroke="#202324" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FeatureItem({ label }: FeatureItemProps) {
  return (
    <li className="flex min-h-[clamp(40px,4.2vw,57.6px)] items-center gap-[clamp(10px,1.2vw,17px)]">
      <CheckIcon />
      <span className="text-[clamp(1rem,1.84vw,24.96px)] font-medium leading-[1.2] tracking-[-0.04em] text-white">
        {label}
      </span>
    </li>
  );
}

function BadgeTimer({ countdownText }: { countdownText: string }) {
  return (
    <div className="relative w-[390px] aspect-[484/411] md:w-[484px] drop-shadow-[0_18px_26px_rgba(0,0,0,0.18)]">
      <Image
        src="/images/hero-images/top-right-corner-badge.svg"
        alt=""
        aria-hidden="true"
        width={484}
        height={411}
        className="h-full w-full max-w-full object-contain"
      />

      <svg viewBox="0 0 484 411" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path
            id="badgeRingPath"
            d="M285.325 -161.636C323.241 -179.509 368.464 -170.052 396.043 -138.484C397.21 -137.148 398.473 -135.588 401.03 -132.426C402.167 -131.02 402.743 -130.306 403.318 -129.622C416.472 -113.964 434.304 -102.922 454.198 -98.1139C455.068 -97.9037 455.964 -97.7048 457.73 -97.3125C461.704 -96.43 463.665 -95.9942 465.383 -95.5437C505.964 -84.9028 534.541 -48.6558 535.349 -6.80431C535.383 -5.03271 535.345 -3.02928 535.269 1.0317C535.235 2.83704 535.219 3.75285 535.219 4.64576C535.217 25.0696 541.774 44.9624 553.929 61.4046C554.461 62.1234 555.02 62.8499 556.122 64.2834C558.6 67.5078 559.821 69.0989 560.848 70.5455C585.104 104.72 583.665 150.794 557.327 183.349C556.212 184.727 554.893 186.236 552.218 189.296C551.029 190.656 550.426 191.346 549.851 192.03C536.694 207.662 528.908 227.096 527.636 247.479C527.58 248.37 527.54 249.285 527.461 251.089C527.284 255.146 527.197 257.148 527.052 258.914C523.635 300.63 492.854 334.977 451.691 343.002C449.949 343.341 447.965 343.65 443.944 344.277C442.156 344.556 441.25 344.697 440.369 344.851C420.214 348.378 401.728 358.258 387.623 373.044C387.007 373.69 386.387 374.365 385.164 375.695C382.414 378.688 381.058 380.164 379.809 381.423C350.318 411.164 304.596 417.711 267.869 397.449C266.314 396.591 264.594 395.556 261.108 393.456C259.558 392.523 258.772 392.049 257.998 391.601C240.275 381.373 219.739 377.079 199.403 379.349C198.514 379.448 197.604 379.568 195.81 379.802C191.774 380.329 189.783 380.588 188.015 380.751C146.247 384.599 106.979 360.28 91.8757 321.214C91.2364 319.56 90.5846 317.664 89.2643 313.821C88.6774 312.112 88.3797 311.246 88.0737 310.406C81.0753 291.208 68.0975 274.748 51.0451 263.441C50.2995 262.947 49.525 262.454 47.9988 261.483C44.5659 259.297 42.8719 258.219 41.4116 257.21C6.91276 233.364 -7.52607 189.561 6.05798 149.971C6.633 148.295 7.35519 146.426 8.81859 142.638C9.46917 140.953 9.79938 140.099 10.1055 139.26C17.1067 120.075 17.76 99.1497 11.9697 79.5554C11.7166 78.6987 11.4402 77.825 10.896 76.1024C9.67171 72.2273 9.06778 70.3156 8.59842 68.6062C-2.48873 28.2262 14.6549 -14.5645 50.5714 -36.1564C52.0918 -37.0705 53.8495 -38.0383 57.412 -39.9998C58.9955 -40.8716 59.7986 -41.3134 60.5734 -41.7591C78.2979 -51.9533 92.2775 -67.5518 100.46 -86.2649C100.818 -87.083 101.169 -87.929 101.861 -89.5966C103.418 -93.3479 104.187 -95.1985 104.928 -96.8079C122.438 -134.829 163.144 -156.589 204.589 -150.077C206.343 -149.802 208.314 -149.415 212.309 -148.632C214.084 -148.283 214.985 -148.107 215.866 -147.951C236.019 -144.385 256.782 -147.356 275.108 -156.431C275.909 -156.828 276.724 -157.251 278.329 -158.083C281.939 -159.956 283.72 -160.879 285.325 -161.636Z"
          />
        </defs>
        <text fill="#9da0a6" fontSize="10" fontFamily="Inter, Arial, sans-serif" letterSpacing="0.6">
          <textPath href="#badgeRingPath" startOffset="3%">
            google developer groups on campus • google developer groups on campus •
          </textPath>
        </text>
      </svg>

      <span className="absolute right-[30px] top-[40px] inline-flex items-center justify-center rounded-full border-2 border-[#1b1b1b] bg-white px-4 py-2 text-[11px] font-medium tracking-[0.08em] text-[#1e5ef8]">
        LIMITED OPPORTUNITY
      </span>
      <span
        suppressHydrationWarning
        aria-live="polite"
        aria-atomic="true"
        role="timer"
        className="absolute left-1/2 top-[118px] -translate-x-1/2 text-center font-semibold tracking-[-0.06em] text-[clamp(3.5rem,6.6vw,5.625rem)] leading-none text-black"
      >
        {countdownText}
      </span>
      <span className="absolute left-1/2 top-[184px] -translate-x-1/2 text-center text-[clamp(0.875rem,2.3vw,1.25rem)] text-slate-500">
        days:hours:minutes
      </span>
    </div>
  );
}

function CompactBadgeCard({ countdownText }: { countdownText: string }) {
  return (
    <div className="w-full max-w-[320px] rounded-xl border border-black bg-white px-5 py-4 text-black shadow-[0_18px_26px_rgba(0,0,0,0.16)]">
      <div className="inline-flex rounded-full border-2 border-black px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#2563EB]">
        LIMITED OPPORTUNITY
      </div>
      <div className="mt-4 text-[clamp(2.5rem,8vw,4rem)] font-bold tracking-[-0.06em] leading-none text-black" suppressHydrationWarning>
        {countdownText}
      </div>
      <div className="mt-2 text-[clamp(0.875rem,2.3vw,1.25rem)] text-slate-500">
        days:hours:minutes
      </div>
    </div>
  );
}

function DesktopHeroCard({ onRegisterClick, countdownText }: { onRegisterClick: () => void; countdownText: string }) {
  return (
    <section aria-label="Hero" className="hidden w-full justify-center px-1 lg:flex mt-5">
      <div className="relative h-[960px] w-full max-w-[1357px] box-border overflow-hidden rounded-[12px] border-2 border-black bg-[#2563EB]">
        <div className="absolute left-[50px] top-[127px] w-[610px] max-w-full">
          <h1 className="font-display text-[clamp(64px,8.55vw,116px)] font-bold leading-[clamp(58px,7.7vw,104px)] tracking-[-0.04em] text-white">
            The WOW+
            <br />
            Experience
          </h1>
        </div>

        <p className="absolute left-[50px] top-[352.5px] h-[162px] w-[883px] max-w-full font-display text-[clamp(28px,3.25vw,44px)] font-medium leading-[clamp(34px,4vw,54px)] tracking-[-0.02em] text-white">
          Play games, rank up on the leaderboard, earn swags, and get exclusive WOW pass discounts.
        </p>

        <button
          type="button"
          onClick={onRegisterClick}
          className="absolute left-[50px] top-[542px] flex h-[81px] w-[248px] min-w-[150px] items-center justify-center rounded-full bg-[#202324] px-[30px] py-[18px] text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium leading-[45px] text-white shadow-[0_2px_8px_rgba(0,0,0,0.24)]"
        >
          Register Now
        </button>

        <div className="absolute left-[55.06px] top-[672.3px] h-[232px] w-[779.28px] max-w-full">
          <div className="grid h-full grid-cols-[354.96px_354.96px] gap-x-[15.36px]">
            <ul>
              {leftColumnFeatures.map((featureLabel) => (
                <FeatureItem key={featureLabel} label={featureLabel} />
              ))}
            </ul>
            <ul>
              {rightColumnFeatures.map((featureLabel) => (
                <FeatureItem key={featureLabel} label={featureLabel} />
              ))}
            </ul>
          </div>
        </div>

        <div className="pointer-events-none absolute left-[754.24px] top-[-292.26px] h-[684px] w-[684px] rotate-[11.81deg] max-w-full">
          <Image
            src="/images/hero-images/top-right-corner-badge.svg"
            alt=""
            aria-hidden="true"
            width={684}
            height={684}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="pointer-events-none absolute left-[63.72%] top-[-18.72%] h-[172px] w-[500px] rotate-[11.81deg] overflow-hidden text-[18px] font-medium leading-[23px] tracking-[-0.02em] text-black/50">
          <div className="whitespace-nowrap">
            google developer groups on campus • google developer groups on campus • google developer groups on campus •
          </div>
        </div>

        <div className="absolute left-[1073px] top-[46.5px] flex h-[52px] w-[243px] items-center justify-center rounded-full border-2 border-black bg-white">
          <span className="font-display text-[18px] font-bold uppercase leading-[23px] tracking-[-0.02em] text-[#2563EB]">
            LIMITED OPPORTUNITY
          </span>
        </div>

        <div className="absolute left-[954px] top-[62.5px] flex h-[208px] w-[387px] items-center justify-center border-[2.2px] border-white text-center font-display text-[clamp(3.5rem,6.6vw,5.625rem)] font-bold leading-[208px] tracking-[-0.02em] text-[#202324]">
          {countdownText}
        </div>

        <div className="absolute left-[997px] top-[197.44px] h-[74px] w-[337px] text-center font-display text-[clamp(0.875rem,2.3vw,2rem)] font-medium leading-[74px] tracking-[-0.02em] text-[#202324]">
          days:hours:minutes
        </div>

        <div className="absolute left-[834px] top-[591.5px] h-[442px] w-[606px] max-w-full">
          <Image
            src="/images/hero-images/tshirt.png"
            alt="Product collage"
            fill
            priority
            sizes="606px"
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-[18px] left-1/2 flex -translate-x-1/2 items-center gap-[10px]">
          <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
          <span className="h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <span className="h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <span className="h-2 w-2 rounded-full bg-[#9CA3AF]" />
        </div>
      </div>
    </section>
  );
}

function ResponsiveHeroCard({ onRegisterClick, countdownText }: { onRegisterClick: () => void; countdownText: string }) {
  return (
    <section aria-label="Hero" className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:hidden lg:px-10 lg:py-10">
      <div className="relative mx-auto w-full max-w-[1357px] box-border overflow-hidden rounded-[12px] border-2 border-black bg-[#2563EB] px-5 py-6 text-white sm:px-6 sm:py-8 md:px-6 md:py-6">
        <div className="flex flex-col items-start gap-6 md:gap-8">
          <div className="max-w-full">
            <div className="mb-3 text-[18px] font-medium">Google</div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-[clamp(3rem,5.5vw,4.5rem)] md:text-[clamp(3rem,5vw,5rem)]">
              The WOW+
              <br />
              Experience
            </h1>
            <p className="mt-4 max-w-[883px] font-display text-[clamp(1.25rem,2.8vw,2.75rem)] font-medium leading-[clamp(1.75rem,3.5vw,3.375rem)] tracking-[-0.02em] text-white/90">
              Play games, rank up on the leaderboard, earn swags, and get exclusive WOW pass discounts.
            </p>
            <button
              type="button"
              onClick={onRegisterClick}
              className="mt-6 flex h-[64px] w-full items-center justify-center rounded-full bg-[#202324] px-6 text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium leading-[45px] text-white shadow-[0_2px_8px_rgba(0,0,0,0.24)] sm:w-auto sm:px-8"
            >
              Register Now
            </button>
          </div>

          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 sm:gap-y-2 md:max-w-[779.28px]">
            <ul>
              {leftColumnFeatures.map((featureLabel) => (
                <FeatureItem key={featureLabel} label={featureLabel} />
              ))}
            </ul>
            <ul>
              {rightColumnFeatures.map((featureLabel) => (
                <FeatureItem key={featureLabel} label={featureLabel} />
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col gap-4 sm:gap-6">
            <div className="flex flex-wrap justify-center gap-4 md:hidden">
              <CompactBadgeCard countdownText={countdownText} />
              <div className="flex w-full max-w-[360px] justify-center overflow-hidden">
                <div className="w-[260px] max-w-full sm:w-[300px]">
                  <Image
                    src="/images/hero-images/tshirt.png"
                    alt="Product collage"
                    width={1280}
                    height={1024}
                    sizes="(max-width: 640px) 280px, 320px"
                    className="h-auto w-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="hidden flex-col items-end gap-6 md:flex lg:hidden scale-90 origin-right">
              <div className="ml-auto w-full max-w-[484px]">
                <BadgeTimer countdownText={countdownText} />
              </div>
              <div className="ml-auto flex w-full max-w-[606px] justify-end overflow-hidden">
                <div className="relative h-[300px] w-[420px] max-w-full">
                  <Image
                    src="/images/hero-images/tshirt.png"
                    alt="Product collage"
                    fill
                    sizes="440px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const countdownText = useHeroCountdownText();

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <>
      <DesktopHeroCard onRegisterClick={handleRegisterClick} countdownText={countdownText} />
      <ResponsiveHeroCard onRegisterClick={handleRegisterClick} countdownText={countdownText} />
    </>
  );
}
