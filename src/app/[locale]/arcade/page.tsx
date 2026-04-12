"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { analyticsService } from "@/services/analytics";
const TIERS = [{
  name: "Bronze",
  rank: "300 - 1495",
  price: "₹800",
  ticketPrice: "₹450",
  passPrice: "₹350",
  image: "/images/bronze-7ad033b3ac027995939993b7648507f536d7b089.png",
  color: "#CD7F32",
  benefits: ["Workshops", "Games", "WOW Ticket", "WOW Swag"]
}, {
  name: "Silver",
  rank: "150 - 300",
  price: "₹650",
  ticketPrice: "₹300",
  passPrice: "₹350",
  image: "/images/silver_sm-64ca96b9e4cf1fc255fbe8e81fba4577965e8311.png",
  color: "#C0C0C0",
  benefits: ["Workshops", "Games", "WOW Ticket", "WOW Swag", "Silver Badge"]
}, {
  name: "Gold",
  rank: "50 - 150",
  price: "₹550",
  ticketPrice: "₹200",
  passPrice: "₹350",
  image: "/images/gold_sm-a4a1073053c6007a0017602901287f7f6f292b35.png",
  color: "#FFD700",
  benefits: ["Workshops", "Games", "WOW Ticket", "WOW Swag", "Gold Badge", "Priority Entry"]
}, {
  name: "Diamond",
  rank: "10 - 50",
  price: "₹400",
  ticketPrice: "₹50",
  passPrice: "₹350",
  image: "/images/diamond_sm-6bb229d2803807410116694fb0aed7f6f43aa63a.png",
  color: "#B9F2FF",
  benefits: ["Workshops", "Games", "WOW Ticket", "WOW Swag", "Diamond Badge", "Priority Entry", "Exclusive Workshop Access"]
}, {
  name: "Platinum",
  rank: "0 - 10",
  price: "FREE",
  ticketPrice: "₹0",
  passPrice: "Refunded",
  image: "/images/platinum_sm-a4a1073053c6007a0017602901287f7f6f292b35.png",
  color: "#E5E4E2",
  featured: true,
  benefits: ["Workshops", "Games", "WOW Ticket", "WOW Swag", "Platinum Badge", "Priority Entry", "Exclusive Workshop Access", "Guest of Honour"]
}];
export default function ArcadePage() {
  const t = useTranslations();
  const [activeFaq, setActiveFaq] = useState("section-overview");
  const scrollToFaq = (id: string) => {
    analyticsService.trackUI('faq_scroll', id, 'ArcadePage');
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
          analyticsService.trackUI('visible_section', entry.target.id, 'ArcadePage');
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["section-overview", "section-tiers", "section-games", "section-swag"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return <>
            <Head>
                <title>{t("arcade_wow_2026")}</title>
                <meta name="description" content="Discover the WOW 2026 Arcade. Learn about the tiers, swags, tickets, and see how you can win." />
            </Head>

            <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <div id="page-title" className="absolute top-[-40px]">{t("arcade_wow_2026")}</div>

                <Header onRegisterClick={() => {}} />

                <main id="content" className="dark:bg-grey-900! flex-1">
                    {/* Hero Banner */}
                    <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg!">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40 tracking-tight!">{t("wow_arcade")}</h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>{t("discover_everything_you_need_to_know_about_the_wow_2026_arcade_play_games_rank_up_on_the_leaderboard_earn_swags_and_get_exclusive_event_discounts")}</p>
                            </div>
                        </div>
                        <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
                            <img className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io24-explore-hero.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                            <img className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]" src="/images/io24-explore-hero-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                            <img className="block md:hidden dark:hidden max-w-[90%] md:max-w-[auto]" src="/images/io24-explore-hero-mobile.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                            <img className="hidden dark:inline-block dark:md:hidden max-w-[90%] md:max-w-[auto]" src="/images/io24-explore-hero-mobile-dark.webp" role="img" aria-hidden="true" fetchPriority="high" width="800" height="350" alt="" />
                        </div>
                    </div>

                    <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white! flex flex-col">

                        {/* Intro Section */}
                        <div className="flex flex-col mt-[8px] md:mt-[4px]">
                            <h2 className="tracking-tight! font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 md:mb-12 dark:text-gray-200!">{t("level_up_completely")}</h2>
                            <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:justify-items-center">
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_products.webp" className="dark:hidden object-contain h-full w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_products-dark.webp" className="hidden dark:block object-contain h-full w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("play_new_games")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("test_your_skills_with_exciting_minigames_published_every_other_day_gain_points_and_rise_in_the_leaderboard")}</p>
                                    </div>
                                </div>

                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_learning.webp" className="dark:hidden object-contain h-full w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_learning-dark.webp" className="hidden dark:block object-contain h-full w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("attend_the_workshops")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("learn_practice_and_build_workshops_will_happen_every_saturday_and_sunday_from_1st_may_to_17th_june")}</p>
                                    </div>
                                </div>

                                <div className="basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_program.webp" className="dark:hidden object-cover h-full w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_program-dark.webp" className="hidden dark:block object-cover h-full w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">{t("discover_our_app")}</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">{t("the_official_app_will_be_your_companion_for_playing_these_games_and_unlocking_the_best_wow_arcade_experience")}</p>
                                        <div>
                                            <Link href="/now-in-google" className="text-black underline font-medium inline-block mt-3 dark:text-white" onClick={() => analyticsService.trackCTA('App Detail', 'ArcadePage_Intro')}>{t("more_about_the_app")}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tier Comparison Section - Google One Style */}
                        <div className="flex flex-col mb-16 overflow-x-auto pb-4">
                            <div className="flex flex-col mb-8 mt-12">
                                <h2 className="font-medium text-left text-grey-900 dark:text-grey-bg! sm:s-h4 md:l-h2 dark:text-grey-200 tracking-tight! mb-4">{t("the_more_you_play")}<br />{t("the_more_you_save")}</h2>
                                <p className="text-grey-600 dark:text-grey-400 max-w-2xl">{t("compare_your_target_arcade_rank_with_standard_ticket_prices")}<br />{t("getting_an_arcade_pass_350_is_your_first_step_to_a_better_wow_experience")}</p>
                            </div>

                            <div className="flex flex-col gap-8">
                                {/* Featured Platinum Tier */}
                                {TIERS.filter(t => t.name === "Platinum").map(tier => <div key={tier.name} className="relative h-auto min-h-[320px] mb-4">
                                        {/* Front card */}
                                        <div className="relative bg-white dark:bg-grey! w-full h-full rounded-2xl border-2 border-grey dark:border-white z-10 overflow-hidden flex flex-col md:flex-row">
                                            <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center md:w-1/3 bg-grey-bg dark:bg-grey-900! border-b-2 md:border-b-0 md:border-r-2 border-grey dark:border-white">
                                                <div className="w-44 h-44 mb-6 relative flex items-center justify-center">
                                                    <img src={tier.image} alt={tier.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[64px] font-bold leading-none tracking-tighter! dark:text-white">
                                                        {tier.price}
                                                    </span>
                                                    <span className="text-xs text-grey-500 dark:text-grey-400 uppercase font-black tracking-[0.2em] mt-2">{t("total_effort")}</span>
                                                </div>
                                            </div>

                                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                                    <div className="flex-1">
                                                        <p className="uppercase font-black tracking-tight text-[10px] mb-4 border-2 w-max p-1 px-4 rounded-full">{t("top_tier_achievement")}</p>
                                                        <h3 className="font-bold text-4xl md:text-5xl tracking-tight mb-4">{tier.name}{t("pass")}</h3>
                                                        <p className="text-grey-600 dark:text-grey-400 text-sm max-w-[45ch] leading-relaxed">{t("youve_reached_the_ultimate_rank_as_a_guest_of_honour_you_enjoy_full_event_access_and_premium_rewards_at_no_cost")}</p>

                                                        <div className="mt-8 grid grid-cols-2 gap-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-bold text-grey-500 uppercase tracking-widest">{t("wow_ticket")}</span>
                                                                <span className="text-2xl font-bold text-google-green">{t("free")}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-bold text-grey-500 uppercase tracking-widest">{t("arcade_pass")}</span>
                                                                <span className="text-2xl font-bold text-google-green">{t("refunded")}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="lg:w-1/3">
                                                        <h4 className="font-bold text-grey-900 dark:text-white mb-4 uppercase tracking-wider text-xs">{t("exlcusive_perks")}</h4>
                                                        <div className="space-y-2">
                                                            {tier.benefits.slice(0, 5).map(benefit => <div key={benefit} className="flex items-center gap-2 text-xs font-medium text-grey-700 dark:text-grey-300">
                                                                    <svg className="w-4 h-4 text-google-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                                    <span>{benefit}</span>
                                                                </div>)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-8 flex items-center justify-between border-t-2 border-grey-bg dark:border-grey pt-6">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-sm font-bold text-grey-500 uppercase">{t("rank_needed")}</span>
                                                        <span className="text-xl font-black text-grey-900 dark:text-white">{t("0_10")}</span>
                                                    </div>
                                                    <Link href="/payment?type=arcade" className="nav-cta-btn bg-grey-900! dark:bg-grey-bg! dark:text-grey-900! px-8 py-3 rounded-full text-white font-bold text-sm hover:scale-105 transition-transform" onClick={() => analyticsService.trackCTA('Claim Platinum', 'ArcadePage')}>{t("claim_now")}</Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Shadow cards */}
                                        <div style={{
                  background: 'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)'
                }} className="absolute w-full h-full top-[18px] md:top-[28px] rounded-2xl border-2 border-grey dark:border-white" />
                                        <div style={{
                  background: 'linear-gradient(90deg, rgb(255,203,50) -0.15%, rgb(255,203,50) 17.85%, rgb(244,104,49) 52.85%, rgb(234,67,53) 78.85%, rgb(234,67,53) 99.85%)'
                }} className="absolute w-full h-full top-[9px] md:top-[14px] rounded-2xl border-2 border-grey dark:border-white" />
                                    </div>)}

                                {/* Other Tiers Seamless Strip */}
                                <div className="border-2 border-grey-bg dark:border-white rounded-2xl overflow-hidden bg-white dark:bg-grey-900!">
                                    <div className="flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-grey-bg dark:divide-white">
                                        {TIERS.filter(t => t.name !== "Platinum").reverse().map(tier => <div key={tier.name} className="flex-1 flex flex-col group hover:bg-grey-bg/40 dark:hover:bg-white/5 transition-colors duration-300">
                                                {/* Badge Header Area */}
                                                <div className="p-10 pb-6 flex flex-col items-center text-center">
                                                    <div className="w-36 h-36 md:w-40 md:h-40 mb-8 relative flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                                                        <img src={tier.image} alt={tier.name} className="w-full h-full object-contain drop-shadow-2xl" />
                                                    </div>
                                                    <h3 className="text-3xl font-black tracking-tight! uppercase">{tier.name}</h3>
                                                    <div className="flex items-center gap-2 mt-2 mb-8">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-google-blue"></span>
                                                        <span className="text-[10px] font-black text-grey-500 uppercase tracking-[0.2em]">{t("rank")}{tier.rank}</span>
                                                    </div>

                                                    <div className="mt-4 mb-6 flex flex-col items-center">
                                                        <span className="text-sm font-bold text-grey-400 line-through tracking-tighter!">{t("2000")}</span>
                                                        <span className="text-4xl md:text-5xl font-black tracking-tighter! text-grey-900 dark:text-white">{tier.price}</span>
                                                        <div className="mt-2 text-[10px] font-black text-grey-900 dark:text-white uppercase tracking-widest bg-grey-900/5 px-3 py-1 rounded-sm">
                                                            -{Math.round((1 - (parseInt(tier.price.replace('₹', '')) || 0) / 2000) * 100)}{t("_member_rate")}</div>
                                                    </div>

                                                    <div className="w-full space-y-4 pt-6 border-t border-grey/20 dark:border-white/10 text-left">
                                                        <div className="flex items-start gap-2 text-[10px] font-bold text-grey-600 dark:text-grey-400">
                                                            <span className="w-1 h-1 rounded-full bg-google-blue mt-1.5 shrink-0"></span>
                                                            <span>{t("arcade_pass")}{tier.passPrice}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2 text-[10px] font-bold text-grey-600 dark:text-grey-400">
                                                            <span className="w-1 h-1 rounded-full bg-google-green mt-1.5 shrink-0"></span>
                                                            <span>{t("wow_ticket_included")}{tier.ticketPrice}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-auto pt-10 w-full group/save">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <span className="text-[10px] font-black text-grey-400 uppercase tracking-[0.2em]">{t("net_savings")}</span>
                                                            <span className="text-xl font-black text-grey-900 dark:text-white tracking-tighter! group-hover:text-google-green transition-colors">₹{2000 - (parseInt(tier.price.replace('₹', '')) || 0)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                    </div>
                                </div>
                            </div>

                            {/* Standard Pricing Reference - Condensed */}
                            <div className="mt-16 max-w-4xl mx-auto w-full">
                                <div className="bg-grey-bg dark:bg-white/5! border-2 border-dashed border-grey/30 dark:border-white/20 rounded-2xl p-8 md:p-10">
                                    <div className="flex flex-col md:flex-row items-center gap-10">
                                        <div className="flex-1 text-center md:text-left">
                                            <h4 className="text-grey-500 uppercase font-black tracking-widest text-[10px] mb-2">{t("baseline_comparison")}</h4>
                                            <h3 className="text-2xl font-bold tracking-tight mb-3">{t("standard_tickets_no_arcade")}</h3>
                                            <p className="text-xs text-grey-600 dark:text-grey-400 leading-relaxed max-w-[40ch]">{t("if_you_choose_not_to_participate_in_the_arcade_standard_tickets_are_available_at_full_price_without_swags_or_exclusive_workshop_access")}</p>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-6 md:gap-12 shrink-0">
                                            <div className="flex flex-col items-center md:items-start">
                                                <span className="text-[10px] font-bold text-grey-400 uppercase tracking-widest mb-1">{t("early_bird")}</span>
                                                <span className="text-3xl font-bold text-grey-900 dark:text-white">{t("1200")}</span>
                                            </div>
                                            <div className="flex flex-col items-center md:items-start">
                                                <span className="text-[10px] font-bold text-grey-400 uppercase tracking-widest mb-1">{t("regular_sales")}</span>
                                                <span className="text-3xl font-bold text-grey-900 dark:text-white">{t("2000")}</span>
                                            </div>
                                        </div>

                                        <div className="shrink-0 flex flex-row-reverse gap-2">
                                            <div className="-scale-x-100">
                                                <svg className="dark:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#202124"></path>
                                                </svg>
                                                <svg className="hidden dark:inline-block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#fff"></path>
                                                </svg>
                                            </div>
                                            <Link href="/payment" className="text-xs font-bold border-b-2 py-1 hover:opacity-70 transition-opacity" onClick={() => analyticsService.trackCTA('Purchase Ticket', 'ArcadePage_PricingRef')}>{t("purchase_ticket")}</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-[10px] text-grey-500 dark:text-grey-400 font-medium">{t("savings_are_calculated_relative_to_the_standard_regular_ticket_price_of_2000")}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="faq-container flex flex-row gap-12 mt-[60px]">
                        <div className="faq-pills__container">
                            <h2 className="font-medium mb-1 sm:s-h2 hidden faq-title__mobile text-grey-900 dark:text-white">{t("topics")}</h2>
                            <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">{t("all_you_need_to_know")}</h2>
                            <div className="flex flex-col faq-pills">
                                <button onClick={() => scrollToFaq("section-overview")} className={`faq-pill ${activeFaq === "section-overview" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("overview")}</button>
                                <button onClick={() => scrollToFaq("section-tiers")} className={`faq-pill ${activeFaq === "section-tiers" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("tiers_progression")}</button>
                                <button onClick={() => scrollToFaq("section-games")} className={`faq-pill ${activeFaq === "section-games" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("games_schedule")}</button>
                                <button onClick={() => scrollToFaq("section-swag")} className={`last-pill faq-pill ${activeFaq === "section-swag" ? "faq-pill__active" : ""}`} style={{
                borderRadius: "8px",
                minWidth: "fit-content"
              }}>{t("swags_discounts")}</button>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">

                            <section id="section-overview" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg! overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg!" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("overview")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("what_is_the_wow_arcade")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("the_wow_arcade_is_a_competitive_and_gamified_learning_environment_designed_to_bring_the_developers_from_all_over_india_together_it_involves_playing_games_attending_workshops_and_earning_points_that_translate_to_swags_and_special_discounts_for_the_world_of_wonders_2026_conference")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("how_does_the_arcade_work")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("players_earn_points_by_completing_games_and_attending_workshops_your_performance_dictates_your_position_on_the_live_leaderboard_depending_on_your_placement_you_will_fall_into_different_badge_tiers_which_grant_you_specific_advantages_and_benefits_such_as_exclusive_swags")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("advantages_of_purchasing_an_arcade_pass")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>{t("getting_an_arcade_pass_gives_you_full_access_to_all_exclusive_workshops_continuous_game_drops_and_puts_you_in_the_running_for_premium_swags_and_massive_cost_discounts_on_your_final_wow_2026_ticket")}</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION TWO - Tiers & Progression */}
                            <section id="section-tiers" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg! overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg!" style={{
                  background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("tiers_progression")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("what_are_the_different_tiers_in_the_arcade")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">{t("your_tier_is_determined_by_your_active_rank_on_the_overall_event_leaderboard")}</p>
                                                <ul className="list-disc ml-6 space-y-1 mb-4">
                                                    <li><b>{t("platinum")}</b>{t("top_0_to_10")}</li>
                                                    <li><b>{t("diamond")}</b>{t("rank_10_to_50")}</li>
                                                    <li><b>{t("gold")}</b>{t("rank_50_to_150")}</li>
                                                    <li><b>{t("silver")}</b>{t("rank_150_to_300")}</li>
                                                    <li><b>{t("bronze")}</b>{t("rank_300_to_1495")}</li>
                                                </ul>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("how_does_the_leaderboard_change_promotiondemotion")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>{t("the_leaderboard_uses_a_dynamic_promotion_and_demotion_system_following_the_same_robust_approach_as")}<b>{t("google_cloud_skills_boost")}</b>{t("_earn_points_by_being_an_active_participant_to_get_promoted_to_higher_tiers_inactivity_or_being_outperformed_by_other_participants_may_result_in_demotion_as_standings_are_constantly_updated")}</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION THREE - Games & Schedule */}
                            <section id="section-games" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg! overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg!" style={{
                  background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("games_schedule")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("arcade_games_routine")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("new_games_will_be_published")}<b>{t("every_other_day")}</b>{t("_make_sure_you_check_back_to_participate_in_time_earn_points_and_climb_the_leaderboard")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("workshops_schedule")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>{t("we_host_dedicated_workshops_to_fuel_your_development_skills_workshops_will_happen")}<b>{t("every_saturday_and_sunday")}</b>{t("from")}<b>{t("1st_may_to_17th_june")}</b>.
                                                </p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION FOUR - Swags & Discounts */}
                            <section id="section-swag" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg! overflow-hidden">
                                    <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg!" style={{
                  background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)"
                }}>
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">{t("swags_discounts")}</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("swags_benefits")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>{t("at_wow_effort_is_always_rewarded_the_points_and_tiers_you_achieve_arent_just_for_show_different_tiers_provide_exclusive_premium_swags_as_a_token_of_your_achievement_in_the_wow_arcade_the_higher_the_tier_the_better_the_rewards")}</p><br />
                                                <p>{t("even_if_you_dont_reach_the_bronze_tier_all_active_arcade_participants_will_receive")}<b>{t("exclusive_wow_swags")}</b>{t("as_a_token_of_appreciation_for_being_part_of_the_journey")}</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg! text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">{t("wow_2026_ticket_discounts")}</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p className="mb-2">{t("original_wow_ticket_is_priced_at_1200_in_early_bird_and_2000_in_regular_sales")}</p>
                                                <p className="mb-2">
                                                    <b>{t("arcade_winners_top_535_rank")}</b>{t("get_massive_discounts_based_on_their_highest_achieved_tier")}</p>
                                                <ul className="list-disc ml-6 space-y-2">
                                                    <li><b>{t("platinum_tier")}</b> <span className="text-google-green font-bold">{t("free")}</span>{t("your_350_pass_fee_will_be_refunded")}</li>
                                                    <li><b>{t("diamond_tier")}</b> <b>{t("400")}</b>{t("total_350_already_paid_in_arcade_50_for_wow_ticket")}</li>
                                                    <li><b>{t("gold_tier")}</b> <b>{t("550")}</b>{t("total_350_already_paid_in_arcade_200_for_wow_ticket")}</li>
                                                    <li><b>{t("silver_tier")}</b> <b>{t("650")}</b>{t("total_350_already_paid_in_arcade_300_for_wow_ticket")}</li>
                                                    <li><b>{t("bronze_tier")}</b> <b>{t("800")}</b>{t("total_350_already_paid_in_arcade_450_for_wow_ticket")}</li>
                                                </ul>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                        </div>
                    </div>
                </main>
            </div>
        </>;
}