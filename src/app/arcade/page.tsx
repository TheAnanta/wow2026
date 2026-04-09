"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "@/components/sections/Header";

export default function ArcadePage() {
    const [activeFaq, setActiveFaq] = useState("section-overview");

    // Simple scroll spy / tab effect for FAQ pills
    const scrollToFaq = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    // Setup theme and IntersectionObserver for scroll spy
    useEffect(() => {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) {
            document.documentElement.classList.add("dark");
        }

        // Observer for FAQ sections
        const observerOptions = {
            root: null,
            rootMargin: "-100px 0px -70% 0px", // Adjust to trigger when section top is near page top
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveFaq(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ["section-overview", "section-tiers", "section-games", "section-swag"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head>
                <title>Arcade | WOW 2026</title>
                <meta
                    name="description"
                    content="Discover the WOW 2026 Arcade. Learn about the tiers, swags, tickets, and see how you can win."
                />
            </Head>

            <div className="dark:bg-grey-900 min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <div id="page-title" className="absolute top-[-40px]">
                    Arcade - WOW 2026
                </div>

                {/* Header */}
                <Header onRegisterClick={() => { }} />

                {/* Main Content */}
                <main id="content" className="dark:bg-grey-900 flex-1">
                    {/* Hero Banner */}
                    <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40">
                                WOW Arcade
                            </h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>Discover everything you need to know about the WOW 2026 Arcade! Play games, rank up on the leaderboard, earn swags, and get exclusive event discounts.</p>
                            </div>
                        </div>
                        <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
                            <img
                                className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="/images/io24-explore-hero.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="/images/io24-explore-hero-dark.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="block md:hidden dark:hidden max-w-[90%] md:max-w-[auto]"
                                src="/images/io24-explore-hero-mobile.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="hidden dark:inline-block dark:md:hidden max-w-[90%] md:max-w-[auto]"
                                src="/images/io24-explore-hero-mobile-dark.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="w-full max-w-[1640px] mx-auto px-5 md:px-10 pt-4 md:pt-10 text-grey-900 dark:text-white flex flex-col">

                        {/* Get Engaged Section (Reused as generic info) */}
                        <div className="flex flex-col mt-[8px] md:mt-[4px]">
                            <h2 className="font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 md:mb-12 dark:text-grey-200">
                                Level up completely
                            </h2>
                            <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:justify-items-center">
                                {/* Play Games Card */}
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img
                                            src="/images/cs_products.webp"
                                            className="dark:hidden object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                        <img
                                            src="/images/cs_products-dark.webp"
                                            className="hidden dark:block object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Play New Games</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">
                                            Test your skills with exciting mini-games published every other day. Gain points and rise in the leaderboard.
                                        </p>
                                    </div>
                                </div>

                                {/* Workshops Card */}
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img
                                            src="/images/cs_learning.webp"
                                            className="dark:hidden object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                        <img
                                            src="/images/cs_learning-dark.webp"
                                            className="hidden dark:block object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Attend the Workshops</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">
                                            Learn, practice, and build. Workshops will happen every Saturday and Sunday from 1st May to 17th June.
                                        </p>
                                    </div>
                                </div>

                                {/* Learn App Card */}
                                <div className="basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img
                                            src="/images/cs_program.webp"
                                            className="dark:hidden object-cover h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                        <img
                                            src="/images/cs_program-dark.webp"
                                            className="hidden dark:block object-cover h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Discover our App</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">
                                            The official app will be your companion for playing these games and unlocking the best WOW Arcade experience.
                                        </p>
                                        <div>
                                            <Link href="/now-in-google" className="text-black underline font-medium inline-block mt-3 dark:text-white">
                                                More about the app
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Layout */}
                    <div className="faq-container flex flex-row gap-12 mt-[60px]">
                        {/* FAQ Navigation Pills */}
                        <div className="faq-pills__container">
                            <h2 className="font-medium mb-1 sm:s-h2 hidden faq-title__mobile text-grey-900 dark:text-white">Topics</h2>
                            <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">
                                All you need to know
                            </h2>
                            <div className="flex flex-col faq-pills">
                                <button
                                    onClick={() => scrollToFaq("section-overview")}
                                    className={`faq-pill ${activeFaq === "section-overview" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-tiers")}
                                    className={`faq-pill ${activeFaq === "section-tiers" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Tiers & Progression
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-games")}
                                    className={`faq-pill ${activeFaq === "section-games" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Games & Schedule
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-swag")}
                                    className={`last-pill faq-pill ${activeFaq === "section-swag" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Swags & Discounts
                                </button>
                            </div>
                        </div>

                        {/* FAQ Sections */}
                        <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">

                            {/* SECTION ONE - Overview */}
                            <section id="section-overview" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Overview</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What is the WOW Arcade?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    The WOW Arcade is a competitive and gamified learning environment designed to bring the developers from all over India together. It involves playing games, attending workshops, and earning points that translate to swags and special discounts for the World of Wonders 2026 conference.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How does the Arcade work?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Players earn points by completing games and attending workshops. Your performance dictates your position on the live Leaderboard. Depending on your placement, you will fall into different badge tiers which grant you specific advantages and benefits such as exclusive swags.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Advantages of purchasing an Arcade Pass</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>
                                                    Getting an Arcade pass gives you full access to all exclusive workshops, continuous game drops, and puts you in the running for premium swags and massive cost discounts on your final WOW 2026 ticket.
                                                </p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION TWO - Tiers & Progression */}
                            <section id="section-tiers" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Tiers & Progression</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What are the different Tiers in the Arcade?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">Your tier is determined by your active rank on the overall event leaderboard:</p>
                                                <ul className="list-disc ml-6 space-y-1 mb-4">
                                                    <li><b>Platinum:</b> Top 0 to 10</li>
                                                    <li><b>Diamond:</b> Rank 10 to 50</li>
                                                    <li><b>Gold:</b> Rank 50 to 150</li>
                                                    <li><b>Silver:</b> Rank 150 to 300</li>
                                                    <li><b>Bronze:</b> Rank 300 to 1495</li>
                                                </ul>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How does the leaderboard change? (Promotion/Demotion)</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>
                                                    The leaderboard uses a dynamic promotion and demotion system, following the same robust approach as <b>Google Cloud Skills Boost</b>. Earn points by being an active participant to get promoted to higher tiers. Inactivity or being outperformed by other participants may result in demotion as standings are constantly updated.
                                                </p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION THREE - Games & Schedule */}
                            <section id="section-games" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Games & Schedule</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Arcade Games Routine</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    New games will be published <b>every other day</b>. Make sure you check back to participate in time, earn points, and climb the leaderboard!
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Workshops Schedule</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>
                                                    We host dedicated workshops to fuel your development skills. Workshops will happen <b>every Saturday and Sunday</b> from <b>1st May to 17th June</b>.
                                                </p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION FOUR - Swags & Discounts */}
                            <section id="section-swag" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Swags & Discounts</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Swags & Benefits</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    The points and tiers you achieve aren't just for show! Different tiers provide exclusive premium swags as a token of your achievement in the WOW Arcade. The higher the tier, the better the rewards.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">WOW 2026 Ticket Discounts</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    Original WOW ticket is priced at ₹1200 in early bird, and ₹2000 in regular sales.
                                                </p>
                                                <p className="mb-2">
                                                    <b>Arcade winners (top &lt;535 rank)</b> get massive discounts based on their highest achieved tier:
                                                </p>
                                                <ul className="list-disc ml-6 space-y-2">
                                                    <li><b>Platinum Tier:</b> <span className="text-green-500 font-bold">Free</span> (Your ₹350 pass fee will be refunded)</li>
                                                    <li><b>Diamond Tier:</b> <b>₹400</b> total (₹350 already paid in arcade + ₹50 for WOW ticket)</li>
                                                    <li><b>Gold Tier:</b> <b>₹550</b> total (₹350 already paid in arcade + ₹200 for WOW ticket)</li>
                                                    <li><b>Silver Tier:</b> <b>₹650</b> total (₹350 already paid in arcade + ₹300 for WOW ticket)</li>
                                                    <li><b>Bronze Tier:</b> <b>₹800</b> total (₹350 already paid in arcade + ₹450 for WOW ticket)</li>
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
        </>
    );
}
