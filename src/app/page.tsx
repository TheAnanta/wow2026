// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { BentoCard } from '../components/sections/BentoCard';
import { Footer } from '../components/sections/Footer';
import { RegistrationWizard } from '../components/registration/RegistrationWizard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [showRegistration, setShowRegistration] = useState(false);
  const { isUnregistered, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn && isUnregistered) {
      setShowRegistration(true);
    }
  }, [isLoggedIn, isUnregistered]);

  return (
    <div className="w-full min-h-screen bg-white text-grey-900 overflow-x-hidden">
      <Header onRegisterClick={() => setShowRegistration(true)} />

      <main>
        {/* Hero Section */}
        <Hero onRegisterClick={() => setShowRegistration(true)} />

        {/* Bento Grid Section */}
        <section className="max-w-[1640px] mx-auto px-[20px] md:px-[60px] py-[40px] md:py-[60px]">
          <div className="flex flex-col md:flex-row gap-[32px] justify-between">
            <BentoCard
              id="plan-io-cta-card"
              title="Plan your I/O"
              description="Visit My I/O for saved content and recommendations based on your interests."
              buttonText="Get started"
              imageSrc="https://io.google/2024/app/images/io24-planio-cta.svg"
              className="md:w-2/3 min-h-[407px]"
            />
            <BentoCard
              id="community-cta-card"
              title="Join a community group"
              description="Meet developers, discover local groups, and build your global network."
              buttonText="Get started"
              imageSrc="https://io.google/2024/app/images/io24-join-community-cta-v2.svg"
              className="md:w-[38%] min-h-[407px]"
            />
          </div>
        </section>

        {/* Keynotes Section — Dark background */}
        <section className="bg-text text-white py-[60px] md:py-[100px]">
          <div className="max-w-[1640px] mx-auto px-[20px] md:px-[60px]">
            <div className="flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-start">
              <div className="md:w-1/3">
                <h2 className="sm:l-h3 md:text-[48px] leading-[56px] font-medium max-w-[300px]">
                  Join the keynotes online
                </h2>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px]">
                {/* Google Keynote */}
                <div className="flex flex-col rounded-[20px] border border-grey-600 overflow-hidden bg-text group cursor-pointer transition-colors hover:border-white">
                  <div className="relative aspect-video bg-blue-link overflow-hidden">
                    <img
                      src="https://io.google/2024/app/images/io24-keynote-thumb.webp"
                      alt="Google Keynote"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[64px] h-[64px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-[12px] uppercase tracking-wider text-grey-400 mb-2">10:00AM PT / MAY 14</p>
                    <h3 className="text-[20px] md:text-[24px] font-medium mb-4">Google keynote</h3>
                    <div className="flex gap-4">
                      <button className="text-[14px] font-medium underline flex items-center gap-2 hover:text-google-blue transition-colors">
                        Add to calendar
                      </button>
                      <button className="text-[14px] font-medium underline flex items-center gap-2 hover:text-google-blue transition-colors">
                        Save to My I/O
                      </button>
                    </div>
                  </div>
                </div>

                {/* Developer Keynote */}
                <div className="flex flex-col rounded-[20px] border border-grey-600 overflow-hidden bg-text group cursor-pointer transition-colors hover:border-white">
                  <div className="relative aspect-video bg-google-red overflow-hidden">
                    <img
                      src="https://io.google/2024/app/images/io24-dev-keynote-thumb.webp"
                      alt="Developer Keynote"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[64px] h-[64px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-[12px] uppercase tracking-wider text-grey-400 mb-2">1:30PM PT / MAY 14</p>
                    <h3 className="text-[20px] md:text-[24px] font-medium mb-4">Developer keynote</h3>
                    <div className="flex gap-4">
                      <button className="text-[14px] font-medium underline flex items-center gap-2 hover:text-google-blue transition-colors">
                        Add to calendar
                      </button>
                      <button className="text-[14px] font-medium underline flex items-center gap-2 hover:text-google-blue transition-colors">
                        Save to My I/O
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What are you building for? Section */}
        <section className="bg-white py-[60px] md:py-[100px]">
          <div className="max-w-[1640px] mx-auto px-[20px] md:px-[60px]">
            <h2 className="s-h3 md:text-[48px] leading-[48px] mb-[40px] md:mb-[60px]">
              What are you building for?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
              {[
                { label: 'Mobile', img: 'https://io.google/2024/app/images/io24-stacks-m.webp', color: 'bg-google-blue' },
                { label: 'Web', img: 'https://io.google/2024/app/images/io24-stacks-w.webp', color: 'bg-google-yellow' },
                { label: 'ML/AI', img: 'https://io.google/2024/app/images/io24-stacks-a.webp', color: 'bg-google-red' },
                { label: 'Cloud', img: 'https://io.google/2024/app/images/io24-stacks-c.webp', color: 'bg-google-green' },
              ].map((cat) => (
                <div
                  key={cat.label}
                  className="relative group cursor-pointer"
                >
                  <div className={`absolute inset-0 top-[8px] rounded-[20px] ${cat.color} opacity-20 transition-opacity group-hover:opacity-30`} />
                  <div className="relative bg-white border-2 border-grey-900 rounded-[20px] p-8 min-h-[300px] flex flex-col justify-between transition-transform group-hover:-translate-y-1">
                    <img src={cat.img} alt={cat.label} className="w-[80px] h-[80px]" />
                    <div>
                      <h3 className="text-[24px] font-medium mb-2">{cat.label}</h3>
                      <p className="text-grey-600 text-[16px] leading-[24px]">
                        Explore latest announcements and tools for {cat.label.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
