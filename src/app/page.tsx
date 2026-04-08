// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { CountdownSection } from '../components/sections/CountdownSection';
import { CTACards } from '../components/sections/CTACards';
import { KeynotesSection } from '../components/sections/KeynotesSection';
import { StackCardsSection } from '../components/sections/StackCardsSection';
import { Footer } from '../components/sections/Footer';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import WhatToExpectSection from '@/components/sections/WhatToExpectSection';
import EventMetricsSection from '@/components/sections/EventMetricsSection';

export default function Home() {
  const { isUnregistered, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && isUnregistered) {
      router.push('/register');
    }
  }, [isLoggedIn, isUnregistered, router]);

  return (
    <div className="w-full min-h-screen bg-white text-grey-900 overflow-x-hidden">
      <Header onRegisterClick={() => router.push('/register')} />

      <main>
        <Hero onRegisterClick={() => router.push('/register')} />

        <div className="page-wrapper flex flex-col">
          <CountdownSection />
          <WhatToExpectSection />
          <EventMetricsSection />
          <CTACards />
        </div>
        {/* <KeynotesSection /> */}
        <StackCardsSection />
        <div className='page-wrapper flex flex-col'>
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
            <span className="font-medium text-left sm:s-h3 md:l-h3">
              WOW is made possible by
            </span>
          </div>
          <div className="flex flex-wrap">

            {[{
              title: "GITAM University",
              role: "Partner",
              link: 'https://gitam.edu',
              avatar: 'https://play-lh.googleusercontent.com/WqW965xIPuS_-NzTE109zlmF3KoeAprETIpoU2i1B4L_BrxOwlx0rpFG3gSneYZvh0Q'
            }, {
              title: "the ananta",
              role: "Partner",
              link: 'https://theananta.in',
              avatar: '/images/logomark.svg'
            }, {
              title: "GITAM Career\nGuidance Center",
              role: "Partner",
              link: 'https://www.gitam.edu/career-guidance-centre',
              avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjXuhD15KOoYM7aU-_pY5E_QvxIFzwMm04Q&s'
            }, {
              title: "Venture Development Center",
              role: "Partner",
              link: 'https://vdc.gitam.edu',
              avatar: 'default'
            }].map((e) => {
              return (<a href={e.link} className="flex p-4 md:p-6 border md:border-2 border-grey-600 md:border-transparent rounded-[20px] w-full md:mb-2 md:w-[49%] overflow-hidden group hover:bg-grey-bg md:hover:bg-transparent hover:border-grey! group dark:hover:border-grey-bg!">
                <div className={`flex w-[90px] h-[90px] rounded-[8px] justify-center items-center overflow-hidden ${e.avatar.includes("https") ? "border-2 border-grey-900 bg-black" : ""}`}>
                  <img src={e.avatar.includes("gdsc") ? "/images/io24-location-gdsc-logo.svg" : (e.avatar.includes("default") || !e.avatar) ? "/images/io24-location-default-logo.svg" : e.avatar} height="90" width="90" aria-hidden="true" />
                </div>
                <div className="flex gap-y-1 flex-col w-full md:w-3/4 justify-around pl-6 ">
                  <span className="whitespace-pre-wrap font-medium sm:s-p1 md:l-h6 dark:text-white dark:group-hover:text-grey dark:md:group-hover:text-white">
                    {e.title}
                  </span>
                  <span className="mb-auto mt-1 font-medium sm:s-p1 dark:text-white dark:group-hover:text-grey dark:md:group-hover:text-white">
                    {e.role}
                  </span>
                  {/* <span role="link" tabIndex={0} className="cta-link-btn w-max cursor-pointer hcm-link dark:group-hover:text-grey dark:md:group-hover:text-white ml-[-18px] md:ml-[-20px]" aria-label="[n] [global_opennewwindow_aria]">
                    View more
                  </span> */}
                </div>
              </a>);
            })}
          </div>
        </div>
      </main>

    </div>
  );
}
