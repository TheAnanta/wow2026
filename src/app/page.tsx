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
import { RegistrationWizard } from '../components/registration/RegistrationWizard';
import { useAuth } from '../context/AuthContext';
import WhatToExpectSection from '@/components/sections/WhatToExpectSection';
import EventMetricsSection from '@/components/sections/EventMetricsSection';

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
        <Hero onRegisterClick={() => setShowRegistration(true)} />

        <div className="page-wrapper flex flex-col">
          <CountdownSection />
          <WhatToExpectSection />
          <EventMetricsSection />
          <CTACards />
        </div>
        <KeynotesSection />
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
              avatar: 'https://play-lh.googleusercontent.com/WqW965xIPuS_-NzTE109zlmF3KoeAprETIpoU2i1B4L_BrxOwlx0rpFG3gSneYZvh0Q'
            }, {
              title: "the ananta",
              role: "Partner",
              avatar: 'https://theananta.in/logomark.svg'
            }, {
              title: "GITAM Career\nGuidance Center",
              role: "Partner",
              avatar: 'default '
            }, {
              title: "Venture Development Center",
              role: "Partner",
              avatar: 'default'
            }].map((e) => {
              return (<a className="flex p-4 md:p-6 border md:border-2 border-grey-600 md:border-transparent rounded-[20px] w-full md:mb-2 md:w-[49%] overflow-hidden group hover:bg-grey-bg md:hover:bg-transparent hover:border-grey! group dark:hover:border-grey-bg!">
                <div className={`hidden md:flex w-[90px] h-[90px] rounded-[8px] justify-center items-center overflow-hidden ${e.avatar.includes("https") ? "border-2 border-grey-900 bg-black" : ""}`}>
                  <img src={e.avatar.includes("gdsc") ? "https://io.google/2024/app/images/io24-location-gdsc-logo.svg" : (e.avatar.includes("default") || !e.avatar) ? "https://io.google/2024/app/images/io24-location-default-logo.svg" : e.avatar} height="90" width="90" aria-hidden="true" />
                </div>
                <div className="flex gap-y-1 flex-col w-full md:w-3/4 justify-around md:pl-6 ">
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

      <Footer />

      {showRegistration && (
        <RegistrationWizard onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
}
