'use client';

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from 'react';
interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}
export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose
}) => {
  const t = useTranslations();
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  if (!isVisible && !isAnimating) return null;
  return <div className={`fixed bottom-12 right-8 z-[9999] transition-all duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 px-4'}`}>
    <div className="block w-[80vw] h-auto md:w-[484px] md:h-[97px] rounded-[15px] shadow-lg overflow-hidden bg-white">
      <div className="h-full rounded-[15px] relative border-4 border-white">
        <div className="h-full w-full z-10 flex flex-col">
          <div className="px-[4px] pt-[4px] w-full h-full">
            <div className="flex flex-col justify-center w-full h-full bg-white rounded-[15px] px-6 py-5">
              <button onClick={onClose} className="absolute p-2 top-1 md:top-[12px] right-1 md:right-[12px] hover:bg-grey-bg rounded-full transition-colors" aria-label={t("close_toast")}>
                <img src="/images/io26-close-toast.svg" alt="" />
              </button>
              <h2 className="headers-toast text-[1.5rem] md:text-[1.75rem] font-medium text-grey-900 tracking-tight leading-tight">
                {message}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
        .headers-toast {
          font-family: var(--font-display), sans-serif;
        }
      `}</style>
  </div>;
};