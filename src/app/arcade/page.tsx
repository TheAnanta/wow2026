'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/sections/Header';
import { useRouter } from 'next/navigation';

export default function ArcadePage() {
  const { tickets, isLoading, user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState({ hours: 54, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const TARGET_DATE = new Date('2026-05-27T18:00:00+05:30').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const totalSeconds = Math.floor(difference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const hasFullPass = tickets?.some((t: any) =>
    (t.tier?.name || t.name || "").toLowerCase().includes("early bird") ||
    (t.tier?.name || t.name || "").toLowerCase().includes("regular") ||
    (t.tier?.name || t.name || "").toLowerCase().includes("attendee") ||
    (t.tier?.name || t.name || "").toLowerCase().includes("group") ||
    (t.tier?.name || t.name || "").toLowerCase().includes("ground")
  );

  const hasArcadePass = tickets?.some((t: any) =>
    (t.tier?.name || t.name || "").toLowerCase().includes("arcade") ||
    (t.tier?.name || t.name || "").toLowerCase().includes("wow")
  ) || hasFullPass;

  useEffect(() => {
    if (!isLoading && !hasArcadePass && !showSplash) {
      // Only redirect after splash if they don't have it
      // But better to check immediately
    }
  }, [isLoading, hasArcadePass, showSplash]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf8ff] dark:bg-[#131318]">
        <div className="w-12 h-12 border-4 border-[#2c5fd9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !hasArcadePass) {
    return (
      <div className="min-h-screen bg-[#fbf8ff] dark:bg-[#131318]">
        <Header onRegisterClick={() => { }} />
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <div className="w-24 h-24 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 dark:text-white">Arcade Access Denied</h1>
          <p className="text-lg text-grey-600 dark:text-grey-400 mb-8">This area is reserved for WOW+ Arcade pass holders.</p>
          <button
            onClick={() => router.push('/wow-plus')}
            className="px-8 py-3 bg-[#2c5fd9] text-white rounded-full font-bold hover:shadow-lg transition-all"
          >
            Get WOW+ Pass
          </button>
        </div>
      </div>
    );
  }

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden font-google-sans">
        <div className="relative flex flex-col items-center scale-75 md:scale-100">

          {/* Now In Text (Fades in after juggle) */}
          <div className="absolute -top-16 opacity-0 animate-[fade-in_0.5s_ease-out_2s_forwards]">
            <span className="text-white/60 text-2xl font-medium tracking-tight">Now in</span>
          </div>

          {/* The Juggling Dots */}
          <div className="relative size-20 flex items-center justify-center">
            {/* Blue Dot */}
            <div className="absolute size-5 bg-[#4285F4] rounded-full animate-[juggle-1_2s_cubic-bezier(0.45,0,0.55,1)_infinite]" />
            {/* Red Dot */}
            <div className="absolute size-5 bg-[#EA4335] rounded-full animate-[juggle-2_2s_cubic-bezier(0.45,0,0.55,1)_infinite]" />
            {/* Yellow Dot */}
            <div className="absolute size-5 bg-[#FBBC05] rounded-full animate-[juggle-3_2s_cubic-bezier(0.45,0,0.55,1)_infinite]" />
            {/* Green Dot */}
            <div className="absolute size-5 bg-[#34A853] rounded-full animate-[juggle-4_2s_cubic-bezier(0.45,0,0.55,1)_infinite]" />
          </div>

          {/* Google Text (Fades in after dots converge) */}
          <div className="mt-8 opacity-0 animate-[fade-in_0.8s_ease-out_2.2s_forwards]">
            <h1 className="text-5xl md:text-6xl font-medium text-white tracking-tight">
              Google
            </h1>
          </div>
        </div>

        <style jsx>{`
          @keyframes juggle-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(30px, -30px) scale(0.8); }
            50% { transform: translate(0, -60px) scale(0.6); }
            75% { transform: translate(-30px, -30px) scale(0.8); }
          }
          @keyframes juggle-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-30px, 30px) scale(0.8); }
            50% { transform: translate(0, 60px) scale(0.6); }
            75% { transform: translate(30px, 30px) scale(0.8); }
          }
          @keyframes juggle-3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(30px, 30px) scale(0.8); }
            50% { transform: translate(60px, 0) scale(0.6); }
            75% { transform: translate(30px, -30px) scale(0.8); }
          }
          @keyframes juggle-4 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-30px, -30px) scale(0.8); }
            50% { transform: translate(-60px, 0) scale(0.6); }
            75% { transform: translate(-30px, 30px) scale(0.8); }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf8ff] dark:bg-[#131318] transition-colors">
      <Header onRegisterClick={() => { }} />

      <main className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge Placeholder */}
          <div className="relative mb-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="absolute inset-0 bg-[#2c5fd9]/20 blur-3xl rounded-full" />
            <img
              src="/images/wow26-arcade-badge-registration.png"
              alt="Arcade Badge"
              className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
            />
          </div>

          <div className="space-y-6 max-w-2xl animate-in slide-in-from-bottom-12 duration-1000 delay-200">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1b1b21] dark:text-[#e5e1e9]">
              The Arcade is Coming.
            </h1>

            {isMounted ? (
              <div className="flex gap-3 md:gap-4 justify-center items-center my-6">
                {/* Hours */}
                <div className="flex flex-col items-center p-3 md:p-4 min-w-[75px] md:min-w-[90px] bg-[#dde6ff] dark:bg-[#1a3f8f]/40 backdrop-blur-md rounded-2xl border border-[#c6c5d0]/30 dark:border-white/10 shadow-lg">
                  <span className="text-2xl md:text-4xl font-extrabold text-[#00164d] dark:text-white font-mono tracking-wider">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#00164d]/60 dark:text-[#dde6ff]/60 mt-1">
                    Hours
                  </span>
                </div>

                <span className="text-2xl md:text-4xl font-extrabold text-[#2c5fd9] dark:text-[#a0c2ff] animate-pulse">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center p-3 md:p-4 min-w-[75px] md:min-w-[90px] bg-[#dde6ff] dark:bg-[#1a3f8f]/40 backdrop-blur-md rounded-2xl border border-[#c6c5d0]/30 dark:border-white/10 shadow-lg">
                  <span className="text-2xl md:text-4xl font-extrabold text-[#00164d] dark:text-white font-mono tracking-wider">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#00164d]/60 dark:text-[#dde6ff]/60 mt-1">
                    Mins
                  </span>
                </div>

                <span className="text-2xl md:text-4xl font-extrabold text-[#2c5fd9] dark:text-[#a0c2ff] animate-pulse">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center p-3 md:p-4 min-w-[75px] md:min-w-[90px] bg-[#dde6ff] dark:bg-[#1a3f8f]/40 backdrop-blur-md rounded-2xl border border-[#c6c5d0]/30 dark:border-white/10 shadow-lg">
                  <span className="text-2xl md:text-4xl font-extrabold text-[#2c5fd9] dark:text-[#a0c2ff] font-mono tracking-wider">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#00164d]/60 dark:text-[#dde6ff]/60 mt-1">
                    Secs
                  </span>
                </div>
              </div>
            ) : (
              <div className="inline-block px-6 py-2 bg-[#dde6ff] dark:bg-[#1a3f8f] text-[#00164d] dark:text-[#dde6ff] rounded-full text-lg font-bold">
                Starting May 30
              </div>
            )}

            <p className="text-lg md:text-xl text-[#46464f] dark:text-[#c6c5d0] leading-relaxed">
              Prepare yourself for an immersive journey through the Google developer ecosystem. Your WOW+ Arcade pass unlocks exclusive challenges, badges, and rewards.
            </p>

            <div className="p-6 rounded-3xl bg-[#f5f2fa] dark:bg-[#1b1b21] border border-[#c6c5d0] dark:border-[#46464f] transition-all">
              <p className="text-sm font-medium text-[#1b1b21] dark:text-[#e5e1e9]">
                <span className="inline-block mr-2">⚠️</span>
                Inconvenience regretted. We're putting the final polish on the arcade experience.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Tonal Background Accents */}
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2c5fd9]/5 blur-[120px] -z-10 rounded-full" />
      <div className="fixed top-0 left-0 w-[300px] h-[300px] bg-[#ea4335]/5 blur-[100px] -z-10 rounded-full" />
    </div>
  );
}
