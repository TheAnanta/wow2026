"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { analyticsService } from "@/services/analytics";
import { useAuth } from "@/context/AuthContext";

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
  const totalSeconds = Math.floor(remainingMilliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return {
    days: padCountdownValue(days),
    hours: padCountdownValue(hours),
    minutes: padCountdownValue(minutes),
    seconds: padCountdownValue(seconds),
    full: `${padCountdownValue(days)}:${padCountdownValue(hours)}:${padCountdownValue(minutes)}`
  };
}

function useHeroCountdownText() {
  const [countdown, setCountdown] = useState(() => getCountdownText());

  useEffect(() => {
    const tick = () => setCountdown(getCountdownText());
    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return countdown;
}

function CheckIcon() {
  return (
    <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-white bg-white">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 7.6L6.1 10.7L12 4.8" stroke="#202324" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function FeatureItem({ label }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-[10px] py-[3px]">
      <CheckIcon />
      <span className="text-[12px] lg:text-[16px] font-medium leading-[2.3] text-white xl:text-[20px]">
        {label}
      </span>
    </li>
  );
}

function BadgeTimer({ countdown, className = "" }: { countdown: ReturnType<typeof getCountdownText>; className?: string }) {
  return (
    <div className={`hidden md:flex absolute lg:top-[-150px] lg:right-[-80px] -top-[200px] -right-[120px] ${className}`}>
      {/* Wavy Background SVG */}
      <div className=" scale-75 lg:scale-100">

        <svg className="h-[440px] w-[440px] xl:h-[471px] xl:w-[544px] top-[-160px] left-[-200px]" viewBox="0 0 580 582" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M285.325 9.95801C323.242 -7.91483 368.465 1.54166 396.043 33.1097C397.21 34.4461 398.473 36.0057 401.03 39.168C402.167 40.5739 402.743 41.2875 403.318 41.9721C416.472 57.6297 434.305 68.6718 454.199 73.48C455.068 73.6902 455.964 73.8891 457.73 74.2814C461.704 75.1639 463.665 75.5997 465.383 76.0502C505.964 86.691 534.541 122.938 535.349 164.79C535.384 166.561 535.345 168.565 535.269 172.626C535.235 174.431 535.219 175.347 535.219 176.24C535.217 196.664 541.775 216.556 553.929 232.998C554.461 233.717 555.02 234.444 556.122 235.877C558.6 239.102 559.822 240.693 560.848 242.139C585.104 276.314 583.665 322.388 557.327 354.943C556.212 356.321 554.893 357.83 552.218 360.89C551.03 362.25 550.426 362.94 549.851 363.623C536.695 379.256 528.909 398.69 527.636 419.073C527.58 419.964 527.54 420.879 527.462 422.683C527.284 426.74 527.197 428.742 527.052 430.508C523.635 472.224 492.855 506.571 451.691 514.596C449.949 514.935 447.965 515.244 443.944 515.871C442.156 516.15 441.25 516.291 440.369 516.445C420.215 519.972 401.728 529.852 387.623 544.638C387.007 545.284 386.387 545.959 385.164 547.289C382.415 550.282 381.058 551.758 379.809 553.017C350.318 582.757 304.596 589.305 267.869 569.043C266.315 568.185 264.594 567.15 261.108 565.05C259.558 564.116 258.773 563.643 257.998 563.195C240.275 552.967 219.739 548.673 199.403 550.943C198.514 551.042 197.604 551.162 195.81 551.396C191.775 551.923 189.783 552.182 188.015 552.345C146.247 556.193 106.979 531.874 91.8759 492.808C91.2366 491.154 90.5848 489.258 89.2645 485.415C88.6776 483.706 88.38 482.84 88.074 482C81.0756 462.802 68.0977 446.342 51.0454 435.035C50.2998 434.541 49.5252 434.048 47.999 433.076C44.5661 430.891 42.8722 429.813 41.4118 428.804C6.91302 404.958 -7.52583 361.155 6.05822 321.565C6.63324 319.889 7.35543 318.02 8.81883 314.231C9.46942 312.547 9.79962 311.693 10.1057 310.854C17.107 291.669 17.7602 270.744 11.97 251.149C11.7168 250.293 11.4404 249.419 10.8962 247.696C9.67195 243.821 9.06802 241.91 8.59867 240.2C-2.48849 199.82 14.6551 157.029 50.5716 135.437C52.092 134.523 53.8497 133.556 57.4123 131.594C58.9957 130.722 59.7988 130.28 60.5737 129.835C78.2981 119.641 92.2778 104.042 100.46 85.329C100.818 84.5109 101.169 83.6648 101.861 81.9973C103.419 78.246 104.187 76.3954 104.928 74.786C122.439 36.765 163.144 15.0053 204.589 21.5166C206.343 21.7922 208.314 22.1785 212.309 22.9623C214.085 23.3107 214.985 23.4873 215.866 23.6432C236.02 27.2092 256.782 24.2375 275.108 15.1625C275.909 14.7657 276.724 14.3429 278.329 13.5104C281.939 11.638 283.72 10.7146 285.325 9.95801Z" fill="white" stroke="black" stroke-width="2" />
        </svg>

        <div className="absolute bottom-[118px] left-24 !z-10 h-max flex flex-col items-end justify-center text-center pointer-events-none pr-[8%] pt-[4%]">
          <div className="inline-flex items-center rounded-full border-[1.2px] border-black bg-white px-3.5 py-1.5 text-[12.5px] mb-4 font-bold tracking-wider text-blue-600 xl:text-[16px]">
            LIMITED OPPORTUNITY
          </div>

          <span
            suppressHydrationWarning
            aria-live="polite"
            className="font-display text-[64px] font-bold leading-none tracking-tight text-slate-900 xl:text-[84px]"
          >
            {countdown.full}
          </span>
          <span className="font-display text-[20px] font-medium tracking-wide text-slate-800 xl:text-[18px] w-max">
            days:hours:minutes:seconds
          </span>
        </div>
      </div>
    </div>
  );
}



function HeroCard({ onRegisterClick, onSpeakerClick, countdown, buttonText }: {
  onRegisterClick: () => void;
  onSpeakerClick: () => void; countdown: ReturnType<typeof getCountdownText>; buttonText: string
}) {

  return (
    <section aria-label="Hero" className="">
      <div className="relative flex w-full flex-col overflow-hidden  bg-[#2563EB] px-4 py-5 text-white shadow-lg sm:px-5 sm:py-6 md:px-7 md:py-7 lg:min-h-[660px] lg:flex-row lg:items-center lg:justify-between lg:px-[50px] lg:pb-[34px] lg:pt-[32px] lg:shadow-none xl:min-h-[740px] xl:px-[64px] xl:pb-[42px] xl:pt-[40px]">
        <div className="relative z-10 flex flex-col items-start gap-5 lg:max-w-[60%] lg:justify-center lg:pr-8 lg:gap-0">
          <p className="mb-4 text-lg font-medium text-white">Google</p>
          <h1 className="font-display text-[60px] font-bold leading-[0.9] tracking-tight text-white lg:text-[80px] xl:text-[110px]">
            The WOW+<br />Experience
          </h1>
          <p className="mt-6 max-w-sm text-xl font-medium text-white/90 lg:max-w-lg lg:text-2xl tracking-tight">
            Play games, rank up on the leaderboard, earn swags, and get exclusive WOW pass discounts.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
            <button
              type="button"
              onClick={onRegisterClick}
              className="flex h-11 w-full items-center justify-center rounded-full bg-[#202324] px-5 text-sm font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.24)] sm:h-12 sm:w-auto sm:px-6 sm:text-base lg:h-[48px] lg:min-w-[160px] lg:px-[26px] lg:text-[16px] lg:shadow-none xl:h-[56px] xl:min-w-[200px] xl:text-[18px]"
            >
              {buttonText}
            </button>
            <button
              type="button"
              onClick={onSpeakerClick}
              className="flex h-11 w-full items-center justify-center rounded-full border-2 border-white bg-white px-5 text-sm font-medium text-[#202324] shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#f1f3f4] sm:h-12 sm:w-auto sm:px-6 sm:text-base lg:h-[48px] lg:min-w-[190px] lg:px-[26px] lg:text-[16px] lg:shadow-none xl:h-[56px] xl:min-w-[230px] xl:text-[18px]"
            >
              Become a Speaker
            </button>
          </div>

          <div className="mt-6 lg:mt-10 w-full lg:max-w-[610px]">
            <div className="grid w-full grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-2 md:gap-x-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-1 xl:gap-x-12">
              <ul className="flex flex-col gap-1">
                {leftColumnFeatures.map((featureLabel) => (
                  <FeatureItem key={featureLabel} label={featureLabel} />
                ))}
              </ul>
              <ul className="flex flex-col gap-1">
                {rightColumnFeatures.map((featureLabel) => (
                  <FeatureItem key={featureLabel} label={featureLabel} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Image and Timers */}
        <div className="lg:hidden flex w-full flex-col items-center gap-6 mb-36 mt-6">
          <div className="absolute h-[240px] -bottom-[44px] -right-[85px] w-full max-w-[330px] sm:h-[220px] sm:max-w-[420px] md:h-[250px] md:max-w-[480px]">
            <Image
              src="/images/hero-images/tshirt.png"
              alt="Product collage"
              fill
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 520px"
              className="object-contain"
              priority
            />
          </div>
          <div className="md:hidden gap-4 flex flex-col absolute top-[34%] min-[635px]:top-0 rounded-l-xl -right-5 bg-white text-black p-8 border-black border-r-0! border-2 ">
            <div className="flex items-end">
              <p className="font-medium leading-[90%] text-6xl min-w-[2ch] text-end">{countdown.days}</p>
              <p className="font-medium text-3xl ml-1">D</p>
            </div>
            <div className="flex items-end">
              <p className="font-medium leading-[90%] text-6xl min-w-[2ch] text-end">{countdown.hours}</p>
              <p className="font-medium text-3xl ml-1">H</p>
            </div>
            <div className="flex items-end">
              <p className="font-medium leading-[90%] text-6xl min-w-[2ch] text-end">{countdown.minutes}</p>
              <p className="font-medium text-3xl ml-1">M</p>
            </div>
            <div className="flex items-end">
              <p className="font-medium leading-[90%] text-6xl min-w-[2ch] text-end">{countdown.seconds}</p>
              <p className="font-medium text-3xl ml-1">S</p>
            </div>
          </div>
          <BadgeTimer countdown={countdown} className="w-[280px] min-w-0 max-w-full scale-90" />
        </div>

        {/* Desktop Swags Image */}
        <div className="absolute -bottom-16 -right-16 z-10 hidden lg:flex h-[320px] w-[480px] xl:-bottom-24 xl:-right-24 xl:h-[440px] xl:w-[640px] pointer-events-none">
          <Image
            src="/images/hero-images/tshirt.png"
            alt="Product collage"
            fill
            priority
            sizes="(max-width: 1280px) 480px, 640px"
            className="object-contain object-right-bottom"
          />
        </div>

        <BadgeTimer countdown={countdown} className="hidden lg:flex absolute -right-8 -top-10 z-20 pointer-events-none scale-90 xl:scale-100" />
      </div>
    </section>
  );
}

export default function HeroSection({ onRegisterClick }: { onRegisterClick?: () => void }) {
  const router = useRouter();
  const countdown = useHeroCountdownText();
  const { profile, isLoggedIn, isUnregistered, tickets } = useAuth();

  const isRegistered = isLoggedIn && !isUnregistered && !!profile;
  const hasTicket = tickets && tickets.length > 0;

  const buttonText = !isRegistered ? 'Register' : (!hasTicket ? 'Complete registration' : 'Update profile');
  const buttonLink = !isRegistered ? '/register' : (!hasTicket ? '/payment' : '/register');

  const handleRegisterClick = onRegisterClick || (() => {
    analyticsService.trackCTA(buttonText, 'HeroSection', 'click');
    router.push(buttonLink);
  });

  const handleSpeakerClick = () => {
    router.push("/become-a-speaker");
  };

  return (
    <HeroCard onRegisterClick={handleRegisterClick} onSpeakerClick={handleSpeakerClick} countdown={countdown} buttonText={buttonText} />
  );
}

