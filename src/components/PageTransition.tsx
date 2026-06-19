'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

export default function PageTransition() {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
      setIsInitial(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!animating) return null;

  return (
    <>
      <style>{`
        @keyframes strip-slide {
          0% {
            transform: translateY(-100%);
          }
          35%, 65% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes strip-reveal {
          0%, 35% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .transition-strip-slide {
          animation: strip-slide 1.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
        .transition-strip-reveal {
          animation: strip-reveal 1.2s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
      `}</style>
      <div className="fixed inset-0 z-[99999] grid grid-cols-4 pointer-events-auto overflow-hidden">
        {COLORS.map((color, index) => (
          <div
            key={color}
            className={isInitial ? "transition-strip-reveal w-full h-full border-r-[1.5px] border-l-[1.5px] border-grey-900 dark:border-white" : "transition-strip-slide w-full h-full border-r-[1.5px] border-l-[1.5px] border-grey-900 dark:border-white"}
            style={{
              backgroundColor: color,
              animationDelay: `${index * 0.08}s`,
              transform: isInitial ? 'translateY(0)' : 'translateY(-100%)'
            }}
          />
        ))}
      </div>
    </>
  );
}
