'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { analyticsService } from '../../services/analytics';

interface HeroProps {
  onRegisterClick?: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
  const router = useRouter();
  const { profile, isLoggedIn, isUnregistered, tickets } = useAuth();
  const isRegistered = isLoggedIn && !isUnregistered && !!profile;
  const hasTicket = tickets && tickets.length > 0;

  const buttonText = !isRegistered ? 'Register' : (!hasTicket ? 'Complete registration' : "You're in.");
  const buttonLink = !isRegistered ? '/register' : (!hasTicket ? '/payment' : '/profile');

  const handleCTAClick = () => {
    analyticsService.trackCTA(buttonText, 'Hero', 'click');
    if (!isRegistered) {
      const element = document.getElementById('registration-tiers');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    router.push(buttonLink);
  };

  return (
    <div className="flex flex-col items-center bg-grey-bg dark:bg-grey! border-b-2 overflow-hidden">
      <div className="mb-6 mt-6 md:mb-10 md:mt-12">
        <div className="h-homepage-main-cta" data-bgimage="">
          <div className="flex flex-col items-center text-center p-6 w-full">
            <img
              src="/images/Logo-GoogleForDevelopers.svg"
              alt="Google for Developers"
              className="h-6 mb-2 dark:invert brightness-30 max-w-[800px]"
            />
            <h1 className="font-medium text-grey dark:text-white text-[36px] md:text-7xl lg:l-h1 tracking-tighter whitespace-nowrap">
              Wonder of Wonders 2026
            </h1>
            <h2 style={{
              fontWeight: "400"
            }} className="text-grey dark:text-white mb-2 text-[16px] lg:text-[24px] tracking-tighter">
              The largest student developer festival in South India.<br />
              <span style={{ fontWeight: '600' }}>July 4–5 · GITAM University, Visakhapatnam</span>
            </h2>

            <div className="max-w-[450px] md:max-w-[600px] flex flex-col items-center">
              <div className="hidden">
                <img width="660" height="63" src="/images/homepage-main-cta-loading.svg" aria-hidden="true" />
              </div>

            </div>
            <button
              type="button"
              className={hasTicket ? "mt-4 flex items-center gap-3 px-10 py-3 bg-[#1a3f8f] dark:bg-[#dde6ff] text-[#dde6ff] dark:text-[#00164d] rounded-full font-bold transition-all hover:shadow-md hover:scale-[1.02] active:scale-95" : "mt-4 cta-primary block"}
              onClick={handleCTAClick}
            >
              {hasTicket && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#dde6ff] dark:text-[#004a77]">
                  <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.52l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
                </svg>
              )}
              <span>{buttonText}</span>
            </button>
          </div>
          <div className="hidden flex-col items-center">
            <h2 className="font-medium text-grey dark:text-white mb-4 sm:s-h6 md:l-h6">
              <span>Get content recommendations by updating your Google Developer Profile.</span>
            </h2>
            <a href="/profile" className="cta-primary">
              <span>Update profile</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top hero images */}
      <div className="top-image-container flex flex-col items-center w-full -mb-6 md:-mb-10">
        <img fetchPriority="high" className="object-contain h-auto w-auto inline-block md:hidden dark:hidden max-w-[317px]" src="/images/io24-homepage-hero-bg-mobile.webp" role="img" aria-hidden="true" width="304" height="166" alt="" />
        <img fetchPriority="high" className="object-contain h-auto w-auto hidden dark:inline-block dark:md:hidden max-w-[317px]" src="/images/io24-homepage-hero-bg-mobile-dark.webp" role="img" aria-hidden="true" width="303" height="166" alt="" />
        <img fetchPriority="high" className="hidden md:inline-block object-contain h-auto w-auto dark:hidden max-w-[690px]" src="/images/io24-homepage-hero-bg.webp" role="img" aria-hidden="true" width="666" height="356" alt="" />
        <img fetchPriority="high" className="hidden dark:md:inline-block object-contain h-auto w-auto max-w-[690px]" src="/images/io24-homepage-hero-bg-dark.webp" role="img" aria-hidden="true" width="666" height="356" alt="" />
      </div>

      {/* Bottom hero images */}
      <div className="bottom-image-container w-full border-solid border-grey dark:border-grey-bg translate-y-2">
        <img fetchPriority="high" className="object-cover object-top h-auto max-h-[210px] w-full inline-block md:hidden dark:hidden" src="/images/io24-homepage-hero-bg-bottom-mobile.webp" role="img" aria-hidden="true" width="360" height="168" alt="" />
        <img fetchPriority="high" className="object-cover object-top h-auto max-h-[210px] w-full hidden dark:inline-block dark:md:hidden" src="/images/io24-homepage-hero-bg-bottom-mobile-dark.webp" role="img" aria-hidden="true" width="360" height="168" alt="" />
        <img fetchPriority="high" className="hidden md:inline-block object-cover h-auto w-full dark:hidden" src="/images/io24-homepage-hero-bg-bottom.svg" role="img" aria-hidden="true" width="1440" height="207" alt="" />
        <img fetchPriority="high" className="hidden dark:md:inline-block object-cover h-auto w-full" src="/images/io24-homepage-hero-bg-bottom-dark.svg" role="img" aria-hidden="true" width="1430" height="207" alt="" />
      </div>
    </div>
  );
}