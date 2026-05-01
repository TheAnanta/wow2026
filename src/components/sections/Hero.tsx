"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { analyticsService } from "../../services/analytics";

interface HeroProps {
  onRegisterClick?: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
  const router = useRouter();
  const { profile, isLoggedIn, isUnregistered, tickets } = useAuth();
  const isRegistered = isLoggedIn && !isUnregistered && !!profile;
  const hasTicket = tickets && tickets.length > 0;

  const buttonText = !isRegistered ? "Register Now" : !hasTicket ? "Complete registration" : "Update profile";
  const buttonLink = !isRegistered ? "/register" : !hasTicket ? "/payment" : "/register";

  const handleCTAClick = () => {
    analyticsService.trackCTA(buttonText, "Hero", "click");
    router.push(buttonLink);
  };

  return (
    <section className="w-full flex justify-center py-8 md:py-12">
      <div className="w-full max-w-[1180px] px-4">
        <div className="relative rounded-2xl overflow-hidden bg-[#1e5ef8] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left content column */}
            <div className="md:col-span-7 p-8 md:p-12 text-white">
              <div className="max-w-[560px]">
                <div className="mb-4 opacity-90 text-sm">Google</div>
                <h1 className="font-display text-[44px] md:text-[56px] leading-[1.02] font-medium mb-4">The WOW+ Experience</h1>
                <p className="text-[16px] md:text-[18px] mb-6">Play games, rank up on the leaderboard, earn swags, and get exclusive WOW pass discounts.</p>

                <div className="mb-6">
                  <button onClick={handleCTAClick} className="inline-flex items-center bg-black text-white rounded-full px-5 py-3 font-medium shadow-sm hover:opacity-95">
                    {buttonText}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span>Delicious food and swags</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span>Engaging games</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span>Icebreakers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span># I Am Remarkable</span>
                    </li>
                  </ul>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span>Project Showcase</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span>Funding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span>Pixel 9 Photo Booth</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                      <span>1-1 Mentoring with GDEs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right visual column */}
            <div className="md:col-span-5 relative">
              <div className="absolute top-6 right-6 bg-white text-black rounded-full p-4 shadow-lg w-[160px] h-[120px] flex flex-col items-center justify-center text-center">
                <span className="text-xs uppercase text-slate-500">Limited opportunity</span>
                <strong className="text-xl md:text-2xl">19:15:12</strong>
                <span className="text-[11px] text-slate-500">days:hours:minutes</span>
              </div>

              <div className="h-[220px] md:h-[320px] flex items-end justify-end pr-6 pb-6">
                <img src="/images/io24-planio-cta.svg" alt="hero products" className="max-w-[240px] md:max-w-[360px] object-contain" />
              </div>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/60" />
              <span className="w-2 h-2 rounded-full bg-white/30" />
              <span className="w-2 h-2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}