'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/sections/Header';
import { useRouter } from 'next/navigation';

export default function ArcadePage() {
  const { tickets, isLoading, user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

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
      // Checked immediately
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
          
          {/* Pulsing Live Badge & Closing Time warning */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-semibold text-sm tracking-wide border border-green-500/20">
              <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
              LIVE NOW
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ea4335]/10 text-[#ea4335] font-semibold text-sm tracking-wide border border-[#ea4335]/20">
              ⏰ CLOSES BY 11:59 PM, 27TH JUNE 2026
            </div>
          </div>

          {/* Badge Placeholder */}
          <div className="relative mb-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="absolute inset-0 bg-[#2c5fd9]/20 blur-3xl rounded-full" />
            <img
              src="/images/wow26-arcade-badge-registration.png"
              alt="Arcade Badge"
              className="relative w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl"
            />
          </div>

          <div className="space-y-6 max-w-2xl animate-in slide-in-from-bottom-12 duration-1000 delay-200">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1b1b21] dark:text-[#e5e1e9]">
              The Arcade is Live! 🚀
            </h1>

            <p className="text-lg md:text-xl text-[#46464f] dark:text-[#c6c5d0] leading-relaxed">
              Interactive workshops & games are now open! Install the official mobile app to participate in online workshops, play games, and claim your developer rewards.
            </p>

            {/* Play Store App Download CTA */}
            <div className="flex flex-col items-center gap-4 py-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.manasmalla.nowingoogle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-all rounded-2xl shadow-xl hover:shadow-black/20 hover:scale-[1.02] border border-neutral-700/50"
              >
                {/* Play Store SVG Icon */}
                <svg className="w-8 h-8 shrink-0" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58-33.2-65.6 65.6 65.6 65.6 58-33.2c15-8.6 25-24.3 25-42.4s-10-33.8-25-42.4zM385.4 337.5L104.6 499l220.7-126.5 60.1-60.1z" fill="url(#playstore-gradient)" />
                  <defs>
                    <linearGradient id="playstore-gradient" x1="16.4" y1="-28.6" x2="528.8" y2="483.8" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#00a0ff" />
                      <stop offset="0.007" stopColor="#00a1ff" />
                      <stop offset="0.26" stopColor="#00c1ff" />
                      <stop offset="0.51" stopColor="#00d7ff" />
                      <stop offset="0.76" stopColor="#00e4ff" />
                      <stop offset="1" stopColor="#00e8ff" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 leading-none mb-1">Get it on</p>
                  <p className="text-lg font-bold font-google-sans leading-none">Google Play</p>
                </div>
              </a>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Available for Android devices • Version 1.0</span>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#191c21] border border-[#dadce0] dark:border-[#46464f] shadow-sm">
                <div className="text-2xl mb-3">🎮</div>
                <h3 className="font-bold text-base text-[#1b1b21] dark:text-white mb-2">Developer Games</h3>
                <p className="text-sm text-[#46464f] dark:text-[#c6c5d0] leading-relaxed">Play interactive mobile games, score points, and climb the leaderboard.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#191c21] border border-[#dadce0] dark:border-[#46464f] shadow-sm">
                <div className="text-2xl mb-3">💡</div>
                <h3 className="font-bold text-base text-[#1b1b21] dark:text-white mb-2">Live Workshops</h3>
                <p className="text-sm text-[#46464f] dark:text-[#c6c5d0] leading-relaxed">Attend live, interactive training workshops hosted directly within the app.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#191c21] border border-[#dadce0] dark:border-[#46464f] shadow-sm">
                <div className="text-2xl mb-3">🏆</div>
                <h3 className="font-bold text-base text-[#1b1b21] dark:text-white mb-2">Earn Swag</h3>
                <p className="text-sm text-[#46464f] dark:text-[#c6c5d0] leading-relaxed">Unlock milestones to win exclusive developer swags at the main WOW 2026 event.</p>
              </div>
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
