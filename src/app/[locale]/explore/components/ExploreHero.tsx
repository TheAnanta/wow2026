"use client";

import { useTranslations } from "next-intl";
import React from 'react';
export const ExploreHero: React.FC = () => {
  const t = useTranslations();
  const dataLayer = (globalThis as any).dataLayer || {
    push: () => { }
  };
  return <div className="w-full flex flex-col md:flex-row text-md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
    <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10 md:w-[53%] lg:w-[40%]">
      <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40">{t("plan_your_wow")}</h1>
      <p className="font-medium sm:s-h6 md:l-h6 mb-4">{t("save_and_register_for_sessions_and_workshops_so_you_dont_miss_a_thing")}</p>
      <button id="hero-anchor-cta" className="cta-primary" onClick={e => {
        e.preventDefault();
        document.getElementById("my-io-2024")?.scrollIntoView({
          behavior: 'smooth'
        });
        dataLayer.push({
          'event': "cta_see_all_content",
          'eventParams': {
            'cta_position': 'hero'
          }
        }, {
          eventParams: undefined
        });
      }}>{t("see_all_content")}</button>
    </div>
    <div className="flex justify-end items-end w-full md:w-3/5 mb-8 md:mb-0">
      <img className="hidden md:inline-block h-full object-cover object-left dark:hidden " src="/images/io24-explore-hero.webp" role="img" aria-hidden="true" fetchPriority="high" />
      <img className="hidden dark:md:inline-block h-full object-cover object-left " src="/images/io24-explore-hero-dark.webp" role="img" aria-hidden="true" fetchPriority="high" />
      <img className="block md:hidden dark:hidden w-full" src="/images/io24-explore-hero-mobile.webp" role="img" aria-hidden="true" fetchPriority="high" />
      <img className="hidden dark:inline-block dark:md:hidden w-full" src="/images/io24-explore-hero-mobile-dark.webp" role="img" aria-hidden="true" fetchPriority="high" />
    </div>
  </div>;
};