// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/sections/Header';
import HeroSection from '../components/sections/HeroSection';
import { CountdownSection } from '../components/sections/CountdownSection';
import { CTACards } from '../components/sections/CTACards';
import { KeynotesSection } from '../components/sections/KeynotesSection';
import { StackCardsSection } from '../components/sections/StackCardsSection';
import { Footer } from '../components/sections/Footer';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import WhatToExpectSection from '@/components/sections/WhatToExpectSection';
import EventMetricsSection from '@/components/sections/EventMetricsSection';
import { WhatIsWOW } from '@/components/sections/WhatIsWOW';
import { WhyAttendWOW } from '@/components/sections/WhyAttendWOW';
import { WhoCanAttendWOW } from '@/components/sections/WhoCanAttendWOW';
// import { RegistrationTiers } from '@/components/sections/RegistrationTiers';
import GallerySection from '@/components/sections/GallerySection';
import { HistorySection } from '@/components/sections/HistorySection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { Speakers2026 } from '@/components/sections/Speakers2026';
import { useSearchParams } from 'next/navigation';
import { Toast } from '@/components/ui/Toast';
import { analyticsService } from '@/services/analytics';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Hero } from '../components/sections/Hero';

function Home() {
  const { isUnregistered, isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    if (searchParams.get('message') === 'already_has_ticket') {
      setShowToast(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = decodeURIComponent(hash.replace('#', ''));
        let retries = 0;
        const maxRetries = 20; // Retry for up to 2 seconds to allow full render and hydration

        const scroll = () => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (retries < maxRetries) {
            retries++;
            setTimeout(scroll, 100);
          }
        };

        scroll();
      }
    };

    // Run on initial mount with a small delay
    const timeoutId = setTimeout(handleHashScroll, 300);

    // Watch for hash changes on the window
    window.addEventListener('hashchange', handleHashScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);


  return (
    <div className="w-full min-h-screen text-grey-900 dark:text-grey-bg! overflow-x-hidden">
      <Header onRegisterClick={() => {
        router.push('/register');
      }} />

      <main>
        {/* <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full"
        >
          <SwiperSlide> */}
        {/* <HeroSection onRegisterClick={() => router.push('/register')} /> */}
        {/* </SwiperSlide>
          <SwiperSlide>
            <Hero onRegisterClick={() => router.push('/register')} />
          </SwiperSlide>
        </Swiper> */}

        <Hero onRegisterClick={() => {
          router.push('/register');
        }} />

        <div className="page-wrapper flex flex-col">
          <CountdownSection />
        </div>
        <WhatIsWOW />


        <WhyAttendWOW />
        {/* <WhoCanAttendWOW /> */}
        {/* <RegistrationTiers /> */}
        {/* <StackCardsSection /> */}
        
        <div className="page-wrapper flex flex-col py-10 md:py-16">
          <div className="relative flex flex-col bg-grey-bg dark:bg-grey! border md:border-2 border-grey dark:border-white rounded-[16px] overflow-hidden lg:flex-row min-h-[280px]">
            <div className="relative z-10 flex flex-col items-start p-6 ml:p-10 lg:w-3/5">
              <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                Sponsor WOW 2026
              </span>
              <p className="text-grey dark:text-white mb-4 text-md:mb-6 sm:s-h6 md:l-h6 max-w-[85%]">
                Partner with us to reach 3,000+ developers, showcase your technology, and connect with South India&apos;s sharpest student talent.
              </p>
              <a
                href="/sponsorship-deck"
                className="cta-secondary"
                onClick={() => analyticsService.trackNavigation('Sponsor WOW 2026', 'Homepage Sponsor CTA', '/sponsorship-deck')}
              >
                View Sponsorship Deck
              </a>
            </div>
            <div className="absolute bottom-0 right-0 max-w-[35%] rounded-br-[16px] pointer-events-none hidden lg:block">
              <img src="/images/io__-connect.svg" className="inline-block dark:hidden" role="img" aria-hidden="true" width="220" height="240" alt="" loading="lazy" />
              <img src="/images/io__-connect-dark.svg" className="hidden dark:inline-block" role="img" aria-hidden="true" width="220" height="240" alt="" loading="lazy" />
            </div>
          </div>
        </div>
        {/* <div className="page-wrapper py-0! my-0! flex flex-col">
          
        </div> */}
        <ScheduleSection />
        <Speakers2026 />
        <HistorySection />
        <GallerySection />
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
              return (<a
                key={e.title}
                href={e.link}
                className="flex p-4 md:p-6 border md:border-2 border-grey-600 md:border-transparent rounded-[20px] w-full md:mb-2 md:w-[49%] overflow-hidden group hover:bg-grey-bg md:hover:bg-transparent hover:border-grey! group dark:hover:border-grey-bg!"
                onClick={() => analyticsService.trackNavigation(e.title, 'Home_Partners', e.link)}
              >
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

      <Toast
        message="You're already registered!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default function HomeWrapper() {
  return (
    <React.Suspense fallback={null}>
      <Home />
    </React.Suspense>
  );
}
