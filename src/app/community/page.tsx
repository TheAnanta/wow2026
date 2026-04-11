'use client';

import React, { useState } from 'react';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { handleSearchCommunities } from '../../services/stubs';
import { analyticsService } from '../../services/analytics';
import { useRouter } from 'next/navigation';

export default function CommunityPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string, name: string, type: string }[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    analyticsService.trackUI('search_community', query, 'CommunityPage');
    if (query.trim().length > 0) {
      setIsSearching(true);
      const results = await handleSearchCommunities(query);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults(null);
    }
  };

  const communityGroups = [
    {
      name: 'Gandhi Institute of Technology and Management (GITAM)',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-gandhi-institute-of-technology-and-management-visakhapatnam-india/',
      img: '/images/io__-students-clubs.webp',
      imgDark: '/images/io__-students-clubs-dark.webp',
      imgMobile: '/images/io__-students-clubs-mobile.svg',
      imgMobileDark: '/images/io__-students-clubs-mobile-dark.svg'
    },
    {
      name: 'Aditya Institute of Technology & Management',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-aditya-institute-of-technology-management-tekkali-india/',
      img: '/images/io__-accelerator.webp',
      imgDark: '/images/io24-accelerator-dark.webp',
      imgMobile: '/images/io24-accelerator-mobile.svg',
      imgMobileDark: '/images/io24-accelerator-mobile-dark.svg'
    },
    {
      name: 'Aditya University',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-aditya-university-kakinada-india/',
      img: '/images/io24-experts.webp',
      imgDark: '/images/io24-experts-dark.webp',
      imgMobile: '/images/io24-experts-mobile.svg',
      imgMobileDark: '/images/io24-experts-mobile-dark.svg'
    },
    {
      name: 'Andhra University College of Engineering',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-andhra-university-college-of-engineering-visakhapatnam-india/',
      img: '/images/io24-techmakers.webp',
      imgDark: '/images/io24-techmakers-dark.webp',
      imgMobile: '/images/io24-techmakers-mobile.svg',
      imgMobileDark: '/images/io24-techmakers-mobile-dark.svg'
    },
    {
      name: 'Annamacharya Institute of Technology and Sciences',
      linkText: 'Join the club',
      href: 'https://developers.google.com/community/gdg',
      img: '/images/io24-groups.webp',
      imgDark: '/images/io24-groups-dark.webp',
      imgMobile: '/images/io24-groups-mobile.svg',
      imgMobileDark: '/images/io24-groups-mobile-dark.svg'
    },
    {
      name: 'Gayatri Vidya Parishad College of Engineering',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-gayatri-vidya-parishad-college-of-engineering-visakhapatnam-india/',
      img: '/images/io24-equity.webp',
      imgDark: '/images/io24-equity-dark.webp',
      imgMobile: '/images/io24-equity-mobile.svg',
      imgMobileDark: '/images/io24-equity-mobile-dark.svg'
    },
    {
      name: 'Gayatri Vidya Parishad College of Engineering for Women',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-gayatri-vidya-parishad-college-of-engineering-for-women-visakhapatnam-india/',
      img: '/images/io__-accelerator.webp',
      imgDark: '/images/io24-accelerator-dark.webp',
      imgMobile: '/images/io24-accelerator-mobile.svg',
      imgMobileDark: '/images/io24-accelerator-mobile-dark.svg'
    },
    {
      name: 'Geethanjali Institute of Science & Technology',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-geethanjali-institute-of-science-technology-nellore-india/',
      img: '/images/io24-experts.webp',
      imgDark: '/images/io24-experts-dark.webp',
      imgMobile: '/images/io24-experts-mobile.svg',
      imgMobileDark: '/images/io24-experts-mobile-dark.svg'
    },
    {
      name: 'GMR Institute of Technology',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-gmr-institute-of-technology-razam-india/',
      img: '/images/io24-techmakers.webp',
      imgDark: '/images/io24-techmakers-dark.webp',
      imgMobile: '/images/io24-techmakers-mobile.svg',
      imgMobileDark: '/images/io24-techmakers-mobile-dark.svg'
    },
    {
      name: 'Indian Institute of Information Technology Design & Manufacturing',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-indian-institute-of-information-technology-design-manufacturing-kurnool-india/',
      img: '/images/io24-groups.webp',
      imgDark: '/images/io24-groups-dark.webp',
      imgMobile: '/images/io24-groups-mobile.svg',
      imgMobileDark: '/images/io24-groups-mobile-dark.svg'
    },
    {
      name: 'Indian Institute of Information Technology',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-indian-institute-of-information-technology-kalyani-india/',
      img: '/images/io__-accelerator.webp',
      imgDark: '/images/io24-accelerator-dark.webp',
      imgMobile: '/images/io24-accelerator-mobile.svg',
      imgMobileDark: '/images/io24-accelerator-mobile-dark.svg'
    },
    {
      name: 'Indian Institute of Technology',
      linkText: 'Join the club',
      href: 'https://www.techequitycollective.com/',
      img: '/images/io24-equity.webp',
      imgDark: '/images/io24-equity-dark.webp',
      imgMobile: '/images/io24-equity-mobile.svg',
      imgMobileDark: '/images/io24-equity-mobile-dark.svg'
    },
    {
      name: 'K L Deemed to be University',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-k-l-deemed-to-be-university-vijayawada-india/',
      img: '/images/io__-students-clubs.webp',
      imgDark: '/images/io__-students-clubs-dark.webp',
      imgMobile: '/images/io__-students-clubs-mobile.svg',
      imgMobileDark: '/images/io__-students-clubs-mobile-dark.svg'
    },
    {
      name: 'KKR & KSR Institute of Technology & Sciences',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-kkr-ksr-institute-of-technology-sciences-guntur-india/',
      img: '/images/io24-experts.webp',
      imgDark: '/images/io24-experts-dark.webp',
      imgMobile: '/images/io24-experts-mobile.svg',
      imgMobileDark: '/images/io24-experts-mobile-dark.svg'
    },
    {
      name: 'Maharaj Vijayaram Gajapathi Raj College of Engineering',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-maharaj-vijayaram-gajapathi-raj-college-of-engineering-vizianagaram-india/',
      img: '/images/io24-techmakers.webp',
      imgDark: '/images/io24-techmakers-dark.webp',
      imgMobile: '/images/io24-techmakers-mobile.svg',
      imgMobileDark: '/images/io24-techmakers-mobile-dark.svg'
    },
    {
      name: 'Mohan Babu University',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-mohan-babu-university-tirupati-india/',
      img: '/images/io24-groups.webp',
      imgDark: '/images/io24-groups-dark.webp',
      imgMobile: '/images/io24-groups-mobile.svg',
      imgMobileDark: '/images/io24-groups-mobile-dark.svg'
    },
    {
      name: 'Narayana Engineering College',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-narayana-engineering-college-nellore-india/',
      img: '/images/io__-accelerator.webp',
      imgDark: '/images/io24-accelerator-dark.webp',
      imgMobile: '/images/io24-accelerator-mobile.svg',
      imgMobileDark: '/images/io24-accelerator-mobile-dark.svg'
    },
    {
      name: 'Pragati Engineering College',
      linkText: 'Join the club',
      href: 'https://www.techequitycollective.com/',
      img: '/images/io24-equity.webp',
      imgDark: '/images/io24-equity-dark.webp',
      imgMobile: '/images/io24-equity-mobile.svg',
      imgMobileDark: '/images/io24-equity-mobile-dark.svg'
    },
    {
      name: 'Prasad V. Potluri Siddhartha Institute Of Technology',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-pragati-engineering-college-kakinada-india/',
      img: '/images/io__-students-clubs.webp',
      imgDark: '/images/io__-students-clubs-dark.webp',
      imgMobile: '/images/io__-students-clubs-mobile.svg',
      imgMobileDark: '/images/io__-students-clubs-mobile-dark.svg'
    },
    {
      name: 'R.V.R. & J.C. College of Engineering',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-rvr-jccollege-of-engineering-guntur-india/',
      img: '/images/io24-experts.webp',
      imgDark: '/images/io24-experts-dark.webp',
      imgMobile: '/images/io24-experts-mobile.svg',
      imgMobileDark: '/images/io24-experts-mobile-dark.svg'
    },
    {
      name: 'Raghu Engineering College',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-raghu-engineering-college-visakhapatnam-india/',
      img: '/images/io24-techmakers.webp',
      imgDark: '/images/io24-techmakers-dark.webp',
      imgMobile: '/images/io24-techmakers-mobile.svg',
      imgMobileDark: '/images/io24-techmakers-mobile-dark.svg'
    },
    {
      name: 'Seshadri Rao Gudlavalleru Engineering College',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-seshadri-rao-gudlavalleru-engineering-college-vijayawada-india/',
      img: '/images/io24-groups.webp',
      imgDark: '/images/io24-groups-dark.webp',
      imgMobile: '/images/io24-groups-mobile.svg',
      imgMobileDark: '/images/io24-groups-mobile-dark.svg'
    },
    {
      name: 'SRM University AP',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-srm-university-ap-amaravati-india/',
      img: '/images/io__-accelerator.webp',
      imgDark: '/images/io24-accelerator-dark.webp',
      imgMobile: '/images/io24-accelerator-mobile.svg',
      imgMobileDark: '/images/io24-accelerator-mobile-dark.svg'
    },
    {
      name: 'Sri Venkateswara College of Engineering',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-sri-venkateswara-college-of-engineering-tirupati-india/',
      img: '/images/io24-equity.webp',
      imgDark: '/images/io24-equity-dark.webp',
      imgMobile: '/images/io24-equity-mobile.svg',
      imgMobileDark: '/images/io24-equity-mobile-dark.svg'
    },
    {
      name: 'Sri Sai Institute of Technology & Science',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-sri-sai-institute-of-technology-science-rayachoty-india/',
      img: '/images/io__-students-clubs.webp',
      imgDark: '/images/io__-students-clubs-dark.webp',
      imgMobile: '/images/io__-students-clubs-mobile.svg',
      imgMobileDark: '/images/io__-students-clubs-mobile-dark.svg'
    },
    {
      name: 'Sri Vasavi Engineering College',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-sri-vasavi-engineering-college-tadepalligudem-india/',
      img: '/images/io24-experts.webp',
      imgDark: '/images/io24-experts-dark.webp',
      imgMobile: '/images/io24-experts-mobile.svg',
      imgMobileDark: '/images/io24-experts-mobile-dark.svg'
    },
    {
      name: 'SVR Engineering College',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-svr-engineering-college-nandyala-india/',
      img: '/images/io24-techmakers.webp',
      imgDark: '/images/io24-techmakers-dark.webp',
      imgMobile: '/images/io24-techmakers-mobile.svg',
      imgMobileDark: '/images/io24-techmakers-mobile-dark.svg'
    },
    {
      name: 'Velagapudi Ramakrishna Siddhartha Engineering College',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-velagapudi-ramakrishna-siddhartha-engineering-college-vijayawada-india/',
      img: '/images/io24-groups.webp',
      imgDark: '/images/io24-groups-dark.webp',
      imgMobile: '/images/io24-groups-mobile.svg',
      imgMobileDark: '/images/io24-groups-mobile-dark.svg'
    },
    {
      name: 'Vellore Institute of Technology (VIT-AP)',
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-vellore-institute-of-technology-vellore-india/',
      img: '/images/io__-accelerator.webp',
      imgDark: '/images/io24-accelerator-dark.webp',
      imgMobile: '/images/io24-accelerator-mobile.svg',
      imgMobileDark: '/images/io24-accelerator-mobile-dark.svg'
    },
    {
      name: "Vignan's Institute of Engineering for Women",
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-vignans-institute-of-engineering-for-women-visakhapatnam-india/',
      img: '/images/io24-equity.webp',
      imgDark: '/images/io24-equity-dark.webp',
      imgMobile: '/images/io24-equity-mobile.svg',
      imgMobileDark: '/images/io24-equity-mobile-dark.svg'
    },
    {
      name: "Vignan's Institute of Information Technology",
      linkText: 'Join the club',
      href: 'https://gdg.community.dev/gdg-on-campus-vignans-institute-of-information-technology-visakhapatnam-india/',
      img: '/images/io__-students-clubs.webp',
      imgDark: '/images/io__-students-clubs-dark.webp',
      imgMobile: '/images/io__-students-clubs-mobile.svg',
      imgMobileDark: '/images/io__-students-clubs-mobile-dark.svg'
    },
    {
      name: 'Vishnu Institute of Technology',
      linkText: 'Join the club',
      href: 'https://developers.google.com/community/experts',
      img: '/images/io24-experts.webp',
      imgDark: '/images/io24-experts-dark.webp',
      imgMobile: '/images/io24-experts-mobile.svg',
      imgMobileDark: '/images/io24-experts-mobile-dark.svg'
    },
    {
      name: 'RGMCET',
      linkText: 'Join the club',
      href: 'https://www.womentechmakers.com/members',
      img: '/images/io24-techmakers.webp',
      imgDark: '/images/io24-techmakers-dark.webp',
      imgMobile: '/images/io24-techmakers-mobile.svg',
      imgMobileDark: '/images/io24-techmakers-mobile-dark.svg'
    }
  ];

  return (
    <div className="w-full">
      <Header onRegisterClick={() => router.push('/register')} />

      <main id="content" className="dark:bg-grey-900! flex-1">
        {/* Section 1: Hero */}
        <div className="w-full flex flex-col md:flex-row text-md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
          <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10 ">
            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40">
              Community
            </h1>
            <p className="font-medium sm:s-h6 md:l-h6 mb-4">
              Meet developers, discover local groups, and build your global network.
            </p>
            <div>
              <div className="h-cta-button">
                <button
                  type="button"
                  className="cta-primary block"
                  onClick={() => router.push('/register')}
                >
                  <span>Register for GDG WOW</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end w-full md:w-3/5 ">
            <img
              className="hidden md:inline-block h-full object-cover object-left dark:hidden "
              src="/images/io24-community-hero.svg"
              role="img"
              aria-hidden="true"
              height={407}
            />
            <img
              className="hidden dark:md:inline-block h-full object-cover object-left "
              src="/images/io24-community-hero-dark.svg"
              role="img"
              aria-hidden="true"
              height={407}
            />
            <img
              className="block md:hidden dark:hidden "
              src="/images/io24-community-hero-mobile.svg"
              role="img"
              aria-hidden="true"
            />
            <img
              className="hidden dark:inline-block dark:md:hidden "
              src="/images/io24-community-hero-mobile-dark.svg"
              role="img"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="page-wrapper flex flex-col">
          {/* Section 2: Promo Cards */}
          <div className="flex flex-col align-center items-stretch justify-center gap-[32px] md:flex-row mb-12 md:mb-[40px]">
            {/* Card 1: I/O Connect */}
            <div className="flex w-full md:w-1/2">
              <div className="flex-1 flex flex-col overflow-hidden bg-grey-bg dark:bg-grey! border-[1px] md:border-2 border-grey rounded-[16px] dark:border-white text-md:flex-row">
                <div className="promo-card__body flex-1 flex flex-col items-start p-6 ml:p-10 ml:pr-0">
                  <div className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4">
                    Join us at WOW
                  </div>
                  <div className="flex-1 flex flex-col justify-between items-start">
                    <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta1 md:l-cta1">
                      Explore, network, and get hands-on with the latest products.
                    </p>
                    <a className="cta-secondary" href="/explore" target="_blank" rel="noreferrer">
                      Find an session
                    </a>
                  </div>
                </div>
                <div className="promo-card__img flex justify-end w-full ml:w-1/2 items-end pt-0 ml:pt-[44.18px] mr-[-2px] mb-[-2px]">
                  <img src="/images/io__-connect-mobile.svg" width={145} height={187} className="ml:hidden dark:hidden max-h-[298px]" role="img" aria-hidden="true" />
                  <img src="/images/io__-connect-dark-mobile.svg" width={145} height={187} className="hidden dark:inline-block dark:ml:hidden max-h-[298px]" role="img" aria-hidden="true" />
                  <img src="/images/io__-connect.svg" width={246} height={299} className="hidden ml:block dark:hidden" role="img" aria-hidden="true" />
                  <img src="/images/io__-connect-dark.svg" width={246} height={299} className="hidden dark:ml:block max-h-[298px]" role="img" aria-hidden="true" />
                </div>
              </div>
            </div>
            {/* Card 2: I/O Extended */}
            <div className="flex w-full md:w-1/2">
              <div className="flex-1 flex flex-col overflow-hidden border-[1px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white text-md:flex-row bg-grey-bg dark:bg-grey!">
                <div className="promo-card__body flex-1 flex flex-col items-start p-6 ml:p-10 ml:pr-0">
                  <div className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4">
                    Attend GDGoC
                  </div>
                  <div className="flex-1 flex flex-col justify-between items-start">
                    <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta1 md:l-cta1">
                      Join a community-led event to learn and connect with developers in your area.
                    </p>
                    <a className="cta-secondary" href="https://gdg.community.dev/" target="_blank" rel="noreferrer">
                      Search in your area
                    </a>
                  </div>
                </div>
                <div className="promo-card__img flex justify-end pr-[1rem] ml:pr-[2rem] w-full ml:w-1/2 items-end">
                  <img src="/images/io__-extended.svg" width={204} height={298} className="hidden ml:block max-h-[298px] mb-[-2px]" role="img" aria-hidden="true" />
                  <img src="/images/io__-extended-mobile.svg" width={145} height={223} className="block ml:hidden md:max-h-[167px]" role="img" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Community Search */}
          <div className="flex flex-col text-black text-center md:text-left dark:text-grey-bg">
            <span className="font-medium mb-4 text-md:mb-6 sm:s-h4 md:l-h2">
              Join a community group
            </span>
            <p className="font-medium text-grey mb-2 text-md:mb-6 sm:s-p2 md:l-cta1 dark:text-grey-200">
              Engage with developers and technology experts to collaborate and build your network.
            </p>
          </div>

          {/* Search Box */}
          <div className="h-community-searchbox">
            <div className="flex flex-col md:flex-row gap-7">
              <div className="md:flex-1 w-full">
                <div className="flex relative w-full md:max-w-[1234px]">
                  <div className="flex items-center border-l-2 border-r-2 border-t-2 border-black dark:text-grey rounded-[100px] w-full h-[46px] md:h-14 bg-grey-bg dark:bg-white border-b-2">
                    <div className="flex ml-4 w-8 items-center justify-center">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="community-search-icon ">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.0149 13.5249L20.7449 19.2549L19.2549 20.7449L13.5249 15.0149C12.4549 15.7849 11.1649 16.2549 9.75488 16.2549C6.16488 16.2549 3.25488 13.3449 3.25488 9.75488C3.25488 6.16488 6.16488 3.25488 9.75488 3.25488C13.3449 3.25488 16.2549 6.16488 16.2549 9.75488C16.2549 11.1649 15.7849 12.4549 15.0149 13.5249ZM9.75488 5.25488C7.26488 5.25488 5.25488 7.26488 5.25488 9.75488C5.25488 12.2449 7.26488 14.2549 9.75488 14.2549C12.2449 14.2549 14.2549 12.2449 14.2549 9.75488C14.2549 7.26488 12.2449 5.25488 9.75488 5.25488Z" className="fill-grey-900"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      aria-label="Enter your city/town"
                      placeholder="Enter your city/town"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="focus:outline-none focus:ring-0 border-0 bg-transparent p-0 text-lg font-medium w-full placeholder:text-ellipsis placeholder-shown:text-ellipsis placeholder-grey"
                    />
                  </div>
                </div>
              </div>
              <div className="md:mt-[14px]">
                <p>
                  <a className="cta-link-btn inline-block mt-[20px] see-all-button" href="https://developers.google.com/community" target="_blank" rel="noreferrer">
                    See all communities
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 px-4">
              {searchResults.map(result => (
                <div key={result.id} className="flex items-center p-4 border border-[#000000] dark:border-white rounded-lg bg-white dark:bg-grey! py-6">
                  <div className="w-12 h-12 border border-[#000000] dark:border-white rounded-[4px] mr-5 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #34A853, #4285F4)' }} />
                  <div className="flex flex-col">
                    <div className="font-medium mb-1 text-lg dark:text-white uppercase leading-none">{result.name}</div>
                    <div className="text-sm underline cursor-pointer dark:text-white font-medium" onClick={() => { console.log('Joined chapter', result.id); analyticsService.trackCTA(`join_chapter_${result.id}`, 'CommunityPage'); }}>Join chapter</div>
                  </div>
                </div>
              ))}
            </div>
          ) : isSearching ? (
            <div className="mb-16 text-center py-10 dark:text-white">Searching...</div>
          ) : null}

          {/* Community Group Cards */}
          <div className="grid grid-cols-1 md:grid-cols-commu-cards-2 ml:grid-cols-commu-cards-3 justify-between gap-y-4 md:gap-8 w-full mt-12 md:mt-[20px]">
            {communityGroups.map((group, index) => (
              <a
                key={index}
                href={group.href}
                rel="noopener"
                target="_blank"
                onClick={() => analyticsService.trackCTA(`chapter_card_${group.name}`, 'CommunityPage')}
                className="flex flex-row md:flex-col bg-grey dark:bg-grey-bg! overflow-hidden p-4 md:p-0 rounded-[20px] md:rounded-[42px] w-full md:max-w-[432px] min-h-[126px] md:min-h-[350px] text-md:min-h-[409px] border-[1.5px] border-grey dark:border-grey-bg md:focus:border-[3px] md:hover:border-[3px] dark:md:hover:border-grey-bg dark:md:focus:border-grey-bg"
              >
                <img className="hidden md:inline-block dark:hidden" src={group.img} role="img" aria-hidden="true" width="432" height="242" />
                <img className="hidden dark:md:inline-block" src={group.imgDark} role="img" aria-hidden="true" width="432" height="242" />
                <img className="block md:hidden dark:hidden" src={group.imgMobile} role="img" aria-hidden="true" width="94" height="94" />
                <img className="hidden dark:inline-block dark:md:hidden" src={group.imgMobileDark} role="img" aria-hidden="true" width="94" height="94" />

                <div className="flex-1 flex flex-col justify-around md:justify-center pl-4 md:p-6 text-md:p-8 md:text-center">
                  <span className="font-medium sm:s-h5 md:l-h5 text-grey-bg dark:text-grey">
                    {group.name}
                  </span>
                  <span className="font-medium text-white underline underline-offset-2 text-[14px] text-md:text-[20px] dark:text-grey md:mt-auto">
                    {group.linkText}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Promos */}
          <div className="flex flex-col align-center items-stretch justify-center mt-4 md:mt-10 gap-y-4 md:gap-x-8 md:flex-row">
            <div className="w-full">
              <div className="flex flex-col align-center ml:flex-row h-full bg-grey-bg dark:bg-grey! border-[1px] md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white">
                <div className="flex flex-col items-start p-6 pb-0 ml:w-1/2 ml:p-10 ml:pr-0">
                  <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4 ml:-mr-24">
                    Plan your WOW
                  </span>
                  <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta1 md:l-cta1 ml:-mr-24">
                    Visit My WOW for saved content and recommendations based on your personal interests.
                  </p>
                  <a href="/explore#my-wow" className="cta-secondary">
                    Get started
                  </a>
                </div>
                <div className="flex justify-end pr-[1rem] pb-[1rem] ml:pr-0 ml:pb-0 w-full ml:w-1/2 items-end">
                  <img src="/images/io__-planyourio-mobile.svg" width={231} height={176} className="ml:hidden dark:hidden" role="img" aria-hidden="true" />
                  <img src="/images/io__-planyourio-dark-mobile.svg" width={231} height={176} className="hidden dark:inline-block dark:ml:hidden" role="img" aria-hidden="true" />
                  <img src="/images/io__-planyourio.svg" width={412} height={318} className="hidden ml:inline-block dark:hidden" role="img" aria-hidden="true" />
                  <img src="/images/io__-planyourio-dark.svg" width={412} height={318} className="hidden dark:ml:inline-block" role="img" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
