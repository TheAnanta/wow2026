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
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-black bg-white">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 7.6L6.1 10.7L12 4.8" stroke="#202324" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FeatureItem({ label }: FeatureItemProps) {
  return (
    <li className="flex min-h-[28px] items-center gap-[10px]">
      <CheckIcon />
      <span className="text-[12px] font-medium leading-[1.2] text-white xl:text-[13px]">
        {label}
      </span>
    </li>
  );
}

function BadgeTimer({ countdownText, className = "" }: { countdownText: string; className?: string }) {
  return (
    <div className={`w-[260px] h-[260px] xl:w-[320px] xl:h-[320px] ${className}`}>
      <svg className="absolute -top-12 -right-12 w-[340px] xl:w-[420px] drop-shadow-xl saturate-[1.2]" viewBox="-60 -60 544 471" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="wavy-badge-path" d="M285.325 -161.636C283.72 -160.879 281.939 -159.956 278.329 -158.083C276.724 -157.251 275.909 -156.828 275.108 -156.431C256.782 -147.356 236.019 -144.385 215.866 -147.951C214.985 -148.107 214.084 -148.283 212.309 -148.632C208.314 -149.415 206.343 -149.802 204.589 -150.077C163.144 -156.589 122.438 -134.829 104.928 -96.8079C104.187 -95.1985 103.418 -93.3479 101.861 -89.5966C101.169 -87.929 100.818 -87.083 100.46 -86.2649C92.2775 -67.5518 78.2979 -51.9533 60.5734 -41.7591C59.7986 -41.3134 58.9955 -40.8716 57.412 -39.9998C53.8495 -38.0383 52.0918 -37.0705 50.5714 -36.1564C14.6549 -14.5645 -2.48873 28.2262 8.59842 68.6062C9.06778 70.3156 9.67171 72.2273 10.896 76.1024C11.4402 77.825 11.7166 78.6987 11.9697 79.5554C17.76 99.1497 17.1067 120.075 10.1055 139.26C9.79938 140.099 9.46917 140.953 8.81859 142.638C7.35519 146.426 6.633 148.295 6.05798 149.971C-7.52607 189.561 6.91276 233.364 41.4116 257.21C42.8719 258.219 44.5659 259.297 47.9988 261.483C49.525 262.454 50.2995 262.947 51.0451 263.441C68.0975 274.748 81.0753 291.208 88.0737 310.406C88.3797 311.246 88.6774 312.112 89.2643 313.821C90.5846 317.664 91.2364 319.56 91.8757 321.214C106.979 360.28 146.247 384.599 188.015 380.751C189.783 380.588 191.774 380.329 195.81 379.802C197.604 379.568 198.514 379.448 199.403 379.349C219.739 377.079 240.275 381.373 257.998 391.601C258.772 392.049 259.558 392.523 261.108 393.456C264.594 395.556 266.314 396.591 267.869 397.449C304.596 417.711 350.318 411.164 379.809 381.423C381.058 380.164 382.414 378.688 385.164 375.695C386.387 374.365 387.007 373.69 387.623 373.044C401.728 358.258 420.214 348.378 440.369 344.851C441.25 344.697 442.156 344.556 443.944 344.277C447.965 343.65 449.949 343.341 451.691 343.002C492.854 334.977 523.635 300.63 527.052 258.914C527.197 257.148 527.284 255.146 527.461 251.089C527.54 249.285 527.58 248.37 527.636 247.479C528.908 227.096 536.694 207.662 549.851 192.03C550.426 191.346 551.029 190.656 552.218 189.296C554.893 186.236 556.212 184.727 557.327 183.349C583.665 150.794 585.104 104.72 560.848 70.5455C559.821 69.0989 558.6 67.5078 556.122 64.2834C555.02 62.8499 554.461 62.1234 553.929 61.4046C541.774 44.9624 535.217 25.0696 535.219 4.64576C535.219 3.75285 535.235 2.83704 535.269 1.0317C535.345 -3.02928 535.383 -5.03271 535.349 -6.80431C534.541 -48.6558 505.964 -84.9028 465.383 -95.5437C463.665 -95.9942 461.704 -96.43 457.73 -97.3125C455.964 -97.7048 455.068 -97.9037 454.198 -98.1139C434.304 -102.922 416.472 -113.964 403.318 -129.622C402.743 -130.306 402.167 -131.02 401.03 -132.426C398.473 -135.588 397.21 -137.148 396.043 -138.484C368.464 -170.052 323.241 -179.509 285.325 -161.636Z" fill="#F8F8F8" stroke="#1b1b1b" strokeWidth="2.5"/>
        <text className="text-[12px] xl:text-[13px] font-medium fill-[#3D3D3D] tracking-[0.14em]" dy="-12">
          <textPath href="#wavy-badge-path" startOffset="0%">
             • google developer groups on campus • google developer groups on campus • google developer groups on campus • google developer groups on campus • google developer groups on campus • google developer groups on campus
          </textPath>
        </text>
      </svg>

      <div className="absolute top-[16%] left-[18%] right-[10%] flex flex-col items-center justify-center text-center pointer-events-none xl:top-[20%] xl:left-[22%]">
        <span className="mb-2 inline-flex items-center justify-center rounded-full border-[1.5px] border-[#1b1b1b] bg-white px-[12px] py-[6px] text-[10px] font-bold tracking-[0.06em] text-[#2563EB] xl:text-[11px] pointer-events-auto shadow-sm">
          LIMITED OPPORTUNITY
        </span>
        <span
          suppressHydrationWarning
          aria-live="polite"
          aria-atomic="true"
          role="timer"
          className="font-display text-[44px] font-bold leading-tight tracking-[-0.04em] text-[#111111] xl:text-[52px]"
        >
          {countdownText}
        </span>
        <span className="font-display text-[15px] font-medium leading-none tracking-[-0.02em] text-[#333333] xl:text-[17px]">
          days:hours:minutes
        </span>
      </div>
    </div>
  );
}

function DesktopHeroCard({ onRegisterClick, countdownText }: { onRegisterClick: () => void; countdownText: string }) {
  return (
    <section aria-label="Hero" className="page-wrapper mt-4 hidden lg:flex">
      <div className="relative flex min-h-[660px] w-full items-center justify-between overflow-hidden rounded-[8px] border-[1.5px] border-black bg-[#2563EB] px-[34px] pb-[34px] pt-[32px] xl:min-h-[740px] xl:px-[48px] xl:pb-[42px] xl:pt-[40px]">
        <div className="relative z-10 flex max-w-[54%] flex-col justify-center pr-8 xl:max-w-[53%]">
          <div className="mb-3 font-display text-[16px] font-medium leading-none text-white xl:text-[18px]">
            Google
          </div>
          <h1 className="font-display text-[clamp(4rem,6.1vw,6.7rem)] font-bold leading-[0.9] tracking-[-0.05em] text-white">
            The WOW+
            <br />
            Experience
          </h1>
          <p className="mt-4 max-w-[610px] font-display text-[clamp(1.4rem,2vw,2rem)] font-medium leading-[1.14] tracking-[-0.02em] text-white">
            Play games, rank up on the leaderboard, earn swags, and get exclusive WOW pass discounts.
          </p>

          <button
            type="button"
            onClick={onRegisterClick}
            className="mt-6 flex h-[46px] w-max min-w-[136px] items-center justify-center rounded-full bg-[#202324] px-[22px] text-[14px] font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.24)] xl:h-[52px] xl:min-w-[150px] xl:px-[24px] xl:text-[16px]"
          >
            Register Now
          </button>

          <div className="mt-7 w-full max-w-[610px] xl:mt-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 xl:gap-x-10">
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
        </div>

        {/* Swags Image - Right Bottom Placement */}
        <div className="absolute -bottom-0 -right-2 z-10 hidden lg:flex h-[300px] w-[460px] xl:-bottom-1 xl:-right-3 xl:h-[380px] xl:w-[580px] pointer-events-none">
          <Image
            src="/images/hero-images/tshirt.png"
            alt="Product collage"
            fill
            priority
            sizes="(max-width: 1280px) 460px, 580px"
            className="object-contain object-right-bottom scale-[1.05] translate-y-[2%] translate-x-[2%]"
          />
        </div>

        <BadgeTimer countdownText={countdownText} className="absolute right-0 top-0 z-20 pointer-events-none" />

        <div className="absolute bottom-[10px] left-1/2 flex -translate-x-1/2 items-center gap-[7px] xl:bottom-[12px]">
          <span className="h-[6px] w-[6px] rounded-full border border-black bg-white" />
          <span className="h-[6px] w-[6px] rounded-full border border-black bg-white" />
          <span className="h-[6px] w-[6px] rounded-full border border-black bg-white" />
          <span className="h-[6px] w-[24px] rounded-full border border-black bg-[#2563EB]" />
        </div>
      </div>
    </section>
  );
}

function ResponsiveHeroCard({ onRegisterClick, countdownText }: { onRegisterClick: () => void; countdownText: string }) {
  return (
    <section aria-label="Hero" className="page-wrapper py-4 lg:hidden">
      <div className="relative w-full overflow-hidden rounded-[8px] border-[1.5px] border-black bg-[#2563EB] px-4 py-5 text-white sm:px-5 sm:py-6 md:px-7 md:py-7">
        <div className="relative z-10 flex flex-col items-start gap-5">
          <div className="w-full max-w-full">
            <div className="mb-2 text-[14px] font-medium sm:text-[16px] md:text-[18px]">Google</div>
            <h1 className="font-display text-[clamp(2.65rem,8.4vw,4.7rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white sm:text-[clamp(3.15rem,8vw,4.85rem)]">
              The WOW+
              <br />
              Experience
            </h1>
            <p className="mt-3 max-w-[520px] font-display text-[clamp(1.05rem,3.3vw,1.8rem)] font-medium leading-[1.14] tracking-[-0.02em] text-white">
              Play games, rank up on the leaderboard, earn swags, and get exclusive WOW pass discounts.
            </p>

            <button
              type="button"
              onClick={onRegisterClick}
              className="mt-5 flex h-11 w-auto items-center justify-center rounded-full bg-[#202324] px-5 text-sm font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.24)] sm:h-12 sm:px-6 sm:text-base"
            >
              Register Now
            </button>

            <div className="mt-5 grid w-full grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-2 md:gap-x-5">
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

          <div className="flex w-full flex-col items-center gap-4">
            <div className="relative h-[180px] w-full max-w-[330px] sm:h-[220px] sm:max-w-[420px] md:h-[250px] md:max-w-[480px]">
              <Image
                src="/images/hero-images/tshirt.png"
                alt="Product collage"
                fill
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 520px"
                className="object-contain"
                priority
              />
            </div>

            <BadgeTimer countdownText={countdownText} className="w-[280px] min-w-0 max-w-full" />
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
