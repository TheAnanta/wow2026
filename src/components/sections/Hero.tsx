'use client';
import { useRouter } from 'next/navigation';

interface HeroProps {
  onRegisterClick?: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center bg-grey-bg dark:bg-grey">
      <div className="mb-6 mt-6 md:mb-10 md:mt-12">
        <div className="h-homepage-main-cta" data-bgimage="">
          <div className="flex flex-col items-center text-center p-6 max-w-[800px]">
            <h1 className="font-medium text-grey dark:text-white max-w-[360px] md:max-w-[500px] mb-4 sm:s-h3 md:l-h4">
              <span>
                <p>Tune in for<br />GDG on Campus WOW</p>
                <p>July 4, 2026</p>
              </span>
            </h1>
            <div className="hidden">
              <img width="660" height="63" src="https://io.google/2024/app/images/homepage-main-cta-loading.svg" aria-hidden="true" />
            </div>
            <div className="flex flex-col items-center" />
            <h2 className="font-medium text-grey dark:text-white mb-4 sm:s-h6 md:l-h6">
              <span>Participate in hands-on workshops, tech talks, and hackathon. Take home some cool swags and cash prizes.</span>
            </h2>
            <button type="button" className="cta-primary block" onClick={() => router.push('/register')}>
              <span>Register</span>
            </button>
          </div>
          <div className="hidden flex-col items-center">
            <h2 className="font-medium text-grey dark:text-white mb-4 sm:s-h6 md:l-h6">
              <span>Get content recommendations by updating your Google Developer Profile.</span>
            </h2>
            <a href="https://developers.google.com/profile/u/me/settings" target="_blank" className="cta-primary" rel="noreferrer noopener">
              <span>Update profile</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top hero images */}
      <div className="top-image-container flex flex-col items-center w-full -mb-6 md:-mb-10">
        <img fetchPriority="high" className="object-contain h-auto w-auto inline-block md:hidden dark:hidden max-w-[317px]" src="https://io.google/2024/app/images/io24-homepage-hero-bg-mobile.webp" role="img" aria-hidden="true" width="304" height="166" alt="" />
        <img fetchPriority="high" className="object-contain h-auto w-auto hidden dark:inline-block dark:md:hidden max-w-[317px]" src="https://io.google/2024/app/images/io24-homepage-hero-bg-mobile-dark.webp" role="img" aria-hidden="true" width="303" height="166" alt="" />
        <img fetchPriority="high" className="hidden md:inline-block object-contain h-auto w-auto dark:hidden max-w-[690px]" src="https://io.google/2024/app/images/io24-homepage-hero-bg.webp" role="img" aria-hidden="true" width="666" height="356" alt="" />
        <img fetchPriority="high" className="hidden dark:md:inline-block object-contain h-auto w-auto max-w-[690px]" src="https://io.google/2024/app/images/io24-homepage-hero-bg-dark.webp" role="img" aria-hidden="true" width="666" height="356" alt="" />
      </div>

      {/* Bottom hero images */}
      <div className="bottom-image-container w-full border-b-2 md:border-b-0 border-solid border-grey dark:border-grey-bg">
        <img fetchPriority="high" className="object-cover object-top h-auto max-h-[210px] w-full inline-block md:hidden dark:hidden" src="https://io.google/2024/app/images/io24-homepage-hero-bg-bottom-mobile.webp" role="img" aria-hidden="true" width="360" height="168" alt="" />
        <img fetchPriority="high" className="object-cover object-top h-auto max-h-[210px] w-full hidden dark:inline-block dark:md:hidden" src="https://io.google/2024/app/images/io24-homepage-hero-bg-bottom-mobile-dark.webp" role="img" aria-hidden="true" width="360" height="168" alt="" />
        <img fetchPriority="high" className="hidden md:inline-block object-cover h-auto w-full dark:hidden" src="https://io.google/2024/app/images/io24-homepage-hero-bg-bottom.svg" role="img" aria-hidden="true" width="1440" height="207" alt="" />
        <img fetchPriority="high" className="hidden dark:md:inline-block object-cover h-auto w-full" src="https://io.google/2024/app/images/io24-homepage-hero-bg-bottom-dark.svg" role="img" aria-hidden="true" width="1430" height="207" alt="" />
      </div>
    </div>
  );
}