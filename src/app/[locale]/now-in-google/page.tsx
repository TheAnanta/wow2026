// src/app/now-in-google/page.tsx
'use client';

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { analyticsService } from '@/services/analytics';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
export default function NowInGooglePage() {
  const t = useTranslations();
  const [activeFaq, setActiveFaq] = useState("section-overview");
  const scrollToFaq = (id: string) => {
    analyticsService.trackUI('faq_scroll', id, 'NowInGoogle');
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveFaq(entry.target.id);
          analyticsService.trackUI('visible_section', entry.target.id, 'NowInGoogle');
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["section-overview", "section-networking", "section-wallet", "section-utilities", "section-social"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return <>
            <Head>
                <title>{t("now_in_google_wow_2026")}</title>
                <meta name="description" content="Experience WOW 2026 like never before with the official Now in Google companion app." />
            </Head>

            <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <Header onRegisterClick={() => {}} />

                <main id="content" className="dark:bg-grey-900! flex-1">
                    {/* Hero Banner - Exact Arcade/About Pattern */}
                    {/* Simple & Clean Hero */}
                    <section className="bg-grey-bg border-b-2 border-grey-900 pt-10 md:pt-10">
                        <div className="page-wrapper flex flex-col md:flex-row items-center gap-16 pr-0! pb-0!">
                            <div className="flex-1 pb-16">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-grey-900 text-sm font-bold tracking-widest uppercase mb-8">{t("official_companion_app")}</span>
                                <h1 className="l-h1 mb-8 tracking-tighter leading-[0.85em]">{t("now_in")}<br /><span className="text-google-blue">{t("google")}</span>
                                </h1>
                                <p className="text-2xl font-medium text-grey-text mb-12 max-w-lg leading-[1.2em]">{t("the_ultimate_experience_companion_for_gdg_wow_designed_to_boost_your_event_journey_by_500x")}</p>
                                <button className="cta-primary h-14 px-10 text-xl font-medium">{t("coming_soon")}</button>
                            </div>
                            <div className="flex-1 w-full max-w-lg md:max-w-none">
                                <img src="/images/landingpage.png" alt="IO 24 Abstract Graphic" className="w-full h-auto" />
                            </div>
                        </div>
                    </section>
                    {/* <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40 tracking-tight!">
                                Now in Google
                            </h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>The official event companion that boosts the WOW experience by 500x. Network, explore, and play.</p>
                            </div>
                        </div>
                        <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
                            <img
                                className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="/images/io24-explore-hero.webp"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="/images/io24-explore-hero-dark.webp"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="block md:hidden dark:hidden max-w-[90%] md:max-w-[auto]"
                                src="/images/io24-explore-hero-mobile.webp"
                                width="800"
                                height="350"
                                alt=""
                            />
                        </div>
                     </div> */}

                    <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white flex flex-col">

                        {/* Intro Section - Exact 3-column Grid Pattern */}
                        <div className="flex flex-col mt-[8px] md:mt-[4px]">
                            <h2 className="tracking-tight! font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 md:mb-12 dark:text-grey-200">{t("experience_500x_more")}</h2>
                            <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:justify-items-center">
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_products.webp" className="dark:hidden object-contain w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_products-dark.webp" className="hidden dark:block object-contain w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("connect_instantly")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("firstofitskind_qr_technology_allows_you_to_connect_with_fellow_attendees_and_speakers_hasslefree")}</p>
                                    </div>
                                </div>

                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_learning.webp" className="dark:hidden object-contain w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_learning-dark.webp" className="hidden dark:block object-contain w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("navigate_with_ar")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("find_your_way_around_gitam_with_a_3d_fox_navigator_powered_by_the_same_tech_as_google_maps_ar")}</p>
                                    </div>
                                </div>

                                <div className="basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_program.webp" className="dark:hidden object-cover w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_program-dark.webp" className="hidden dark:block object-cover w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("play_earn")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("manage_your_wow_wallet_recharge_for_the_arcade_and_track_your_rank_on_the_live_leaderboard")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Detail Sections - Exact FAQ Layout Pattern */}
                        <div className="faq-container flex flex-row gap-12 mt-[60px]">
                            <div className="faq-pills__container">
                                <h2 className="font-medium mb-1 sm:s-h2 hidden faq-title__mobile text-grey-900 dark:text-white">{t("topics")}</h2>
                                <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">{t("explore_the_app")}</h2>
                                <div className="flex flex-col faq-pills">
                                    <button onClick={() => scrollToFaq("section-overview")} className={`faq-pill ${activeFaq === "section-overview" ? "faq-pill__active" : ""}`}>{t("overview")}</button>
                                    <button onClick={() => scrollToFaq("section-networking")} className={`faq-pill ${activeFaq === "section-networking" ? "faq-pill__active" : ""}`}>{t("networking")}</button>
                                    <button onClick={() => scrollToFaq("section-wallet")} className={`faq-pill ${activeFaq === "section-wallet" ? "faq-pill__active" : ""}`}>{t("wow_wallet")}</button>
                                    <button onClick={() => scrollToFaq("section-utilities")} className={`faq-pill ${activeFaq === "section-utilities" ? "faq-pill__active" : ""}`}>{t("utilities")}</button>
                                    <button onClick={() => scrollToFaq("section-social")} className={`last-pill faq-pill ${activeFaq === "section-social" ? "faq-pill__active" : ""}`}>{t("social_badges")}</button>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">

                                {/* Section 1: Overview */}
                                <section id="section-overview" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                    background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                  }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("overview")}</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("what_is_now_in_google")}</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>{t("its_our_latest_initiative_app_that_boosts_the_wow_experience_by_500x_attendees_can_interact_form_groups_and_manage_their_entire_event_journey_from_a_single_place")}</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("privacy_security")}</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry font-normal">
                                                    <p>{t("join_channels_like_android_and_cloud_have_dmsgroup_chats_with_speakers_and_fellow_attendees_hasslefree_without_fear_of_privacy_leaks_your_data_stays_safe_within_the_event_ecosystem")}</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 2: Networking */}
                                <section id="section-networking" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                    background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                  }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("networking")}</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("attendee_collaboration")}</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>{t("form_groups_join_interestbased_channels_and_discuss_the_latest_in_tech_with_the_brightest_minds_in_the_community")}</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("speaker_dms")}</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>{t("have_direct_conversations_with_speakers_and_organizers_ask_questions_get_feedback_on_your_work_and_build_meaningful_professional_relationships")}</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 3: Wallet */}
                                <section id="section-wallet" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                    background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)"
                  }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("wow_wallet")}</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("onestop_payments")}</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>{t("the_google_wow_wallet_can_be_refueled_and_used_for_everythingfrom_the_arcade_to_the_food_court_no_need_to_carry_cash_or_cards_during_the_event")}</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("the_arcade_hub")}</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>{t("the_app_is_the_official_place_to_manage_your_arcade_experience_be_notified_of_workshops_book_your_11_mentor_sessions_and_track_your_leaderboard_status_in_realtime")}</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 4: Utilities */}
                                <section id="section-utilities" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                    background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                  }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("utilities")}</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("stay_management")}</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>{t("manage_book_or_extend_your_accommodation_at_gitam_hostels_directly_through_the_app_view_your_checkin_qr_code_instantly_upon_arrival")}</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("3d_fox_navigator")}</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>{t("our_ar_navigation_tech_helps_you_find_sessions_workshops_and_booths_without_getting_lost_just_point_your_camera_and_follow_the_fox")}</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 5: Social */}
                                <section id="section-social" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{
                    background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                  }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("social_badges")}</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("posts_stories")}</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>{t("share_your_event_moments_with_posts_and_stories_visiting_sponsor_booths_and_answering_quiz_questions_in_the_app_earns_you_extra_points")}</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12 space-y-4">
                                                <dt className="font-medium sm:s-h5 md:l-h5">{t("badges_profiles")}</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>{t("view_your_earned_digital_badges_manage_your_public_profile_and_share_your_technical_interests_to_get_personalized_blog_recommendations")}</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA to match About page flow */}
                    {/* <div className="translate-y-10 bg-grey-bg dark:bg-grey! py-20 border-t-2 border-grey dark:border-grey-bg mt-10">
                        <div className="page-wrapper flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                            <div className="flex-1">
                                <h2 className="l-h2 mb-4">Start your journey.</h2>
                                <p className="l-p1 text-[22px] text-grey-600 dark:text-grey-400">Download the Now in Google app today and get ready for WOW 2026.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-[60px] cursor-pointer hover:scale-105 transition-transform" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-[60px] cursor-pointer hover:scale-105 transition-transform" />
                            </div>
                        </div>
                     </div> */}
                </main>

            </div>
        </>;
}