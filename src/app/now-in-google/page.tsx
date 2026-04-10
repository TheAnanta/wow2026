// src/app/now-in-google/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { analyticsService } from '@/services/analytics';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export default function NowInGooglePage() {
    const [activeFaq, setActiveFaq] = useState("section-overview");

    const scrollToFaq = (id: string) => {
        analyticsService.trackUI('faq_scroll', id, 'NowInGoogle');
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) {
            document.documentElement.classList.add("dark");
        }

        const observerOptions = {
            root: null,
            rootMargin: "-100px 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveFaq(entry.target.id);
                    analyticsService.trackUI('visible_section', entry.target.id, 'NowInGoogle');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ["section-overview", "section-networking", "section-wallet", "section-utilities", "section-social"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head>
                <title>Now in Google | WOW 2026</title>
                <meta
                    name="description"
                    content="Experience WOW 2026 like never before with the official Now in Google companion app."
                />
            </Head>

            <div className="dark:bg-grey-900 min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <Header onRegisterClick={() => { }} />

                <main id="content" className="dark:bg-grey-900 flex-1">
                    {/* Hero Banner - Exact Arcade/About Pattern */}
                    {/* Simple & Clean Hero */}
                    <section className="bg-grey-bg border-b-2 border-grey-900 pt-10 md:pt-10">
                        <div className="page-wrapper flex flex-col md:flex-row items-center gap-16 pr-0! pb-0!">
                            <div className="flex-1 pb-16">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-grey-900 text-sm font-bold tracking-widest uppercase mb-8">
                                    Official Companion App
                                </span>
                                <h1 className="l-h1 mb-8 tracking-tighter leading-[0.85em]">
                                    Now in <br /><span className="text-google-blue">Google</span>
                                </h1>
                                <p className="text-2xl font-medium text-grey-text mb-12 max-w-lg leading-[1.2em]">
                                    The ultimate experience companion for GDG WOW, designed to boost your event journey by 500x.
                                </p>
                                <button className="cta-primary h-14 px-10 text-xl font-medium">
                                    Coming Soon
                                </button>
                            </div>
                            <div className="flex-1 w-full max-w-lg md:max-w-none">
                                <img
                                    src="/images/landingpage.png"
                                    alt="IO 24 Abstract Graphic"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </section>
                    {/* <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
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
                            <h2 className="tracking-tight! font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 md:mb-12 dark:text-grey-200">
                                Experience 500x more
                            </h2>
                            <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:justify-items-center">
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_products.webp" className="dark:hidden object-contain w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_products-dark.webp" className="hidden dark:block object-contain w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Connect Instantly</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">First-of-its-kind QR technology allows you to connect with fellow attendees and speakers hassle-free.</p>
                                    </div>
                                </div>

                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_learning.webp" className="dark:hidden object-contain w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_learning-dark.webp" className="hidden dark:block object-contain w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Navigate with AR</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">Find your way around GITAM with a 3D Fox navigator, powered by the same tech as Google Maps AR.</p>
                                    </div>
                                </div>

                                <div className="basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img src="/images/cs_program.webp" className="dark:hidden object-cover w-full" width="471" height="258" alt="" />
                                        <img src="/images/cs_program-dark.webp" className="hidden dark:block object-cover w-full" width="471" height="258" alt="" />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Play & Earn</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">Manage your WOW wallet, recharge for the Arcade, and track your rank on the live leaderboard.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Detail Sections - Exact FAQ Layout Pattern */}
                        <div className="faq-container flex flex-row gap-12 mt-[60px]">
                            <div className="faq-pills__container">
                                <h2 className="font-medium mb-1 sm:s-h2 hidden faq-title__mobile text-grey-900 dark:text-white">Topics</h2>
                                <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">
                                    Explore the app
                                </h2>
                                <div className="flex flex-col faq-pills">
                                    <button onClick={() => scrollToFaq("section-overview")} className={`faq-pill ${activeFaq === "section-overview" ? "faq-pill__active" : ""}`}>Overview</button>
                                    <button onClick={() => scrollToFaq("section-networking")} className={`faq-pill ${activeFaq === "section-networking" ? "faq-pill__active" : ""}`}>Networking</button>
                                    <button onClick={() => scrollToFaq("section-wallet")} className={`faq-pill ${activeFaq === "section-wallet" ? "faq-pill__active" : ""}`}>WOW Wallet</button>
                                    <button onClick={() => scrollToFaq("section-utilities")} className={`faq-pill ${activeFaq === "section-utilities" ? "faq-pill__active" : ""}`}>Utilities</button>
                                    <button onClick={() => scrollToFaq("section-social")} className={`last-pill faq-pill ${activeFaq === "section-social" ? "faq-pill__active" : ""}`}>Social & Badges</button>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">

                                {/* Section 1: Overview */}
                                <section id="section-overview" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Overview</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">What is Now in Google?</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>It's our latest initiative app that boosts the WOW experience by 500x. Attendees can interact, form groups, and manage their entire event journey from a single place.</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">Privacy & Security</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry font-normal">
                                                    <p>Join channels like #android and #cloud, have DMs/group chats with speakers and fellow attendees hassle-free without fear of privacy leaks. Your data stays safe within the event ecosystem.</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 2: Networking */}
                                <section id="section-networking" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Networking</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">Attendee Collaboration</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>Form groups, join interest-based channels, and discuss the latest in tech with the brightest minds in the community.</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">Speaker DMs</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>Have direct conversations with speakers and organizers. Ask questions, get feedback on your work, and build meaningful professional relationships.</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 3: Wallet */}
                                <section id="section-wallet" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">WOW Wallet</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">One-Stop Payments</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>The Google WOW Wallet can be refueled and used for everything—from the Arcade to the food court. No need to carry cash or cards during the event.</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">The Arcade Hub</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>The app is the official place to manage your Arcade experience. Be notified of workshops, book your 1-1 mentor sessions, and track your leaderboard status in real-time.</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 4: Utilities */}
                                <section id="section-utilities" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Utilities</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">Stay Management</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>Manage, book, or extend your accommodation at GITAM hostels directly through the app. View your check-in QR code instantly upon arrival.</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12">
                                                <dt className="font-medium sm:s-h5 md:l-h5">3D Fox Navigator</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>Our AR navigation tech helps you find sessions, workshops, and booths without getting lost. Just point your camera and follow the Fox!</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                                {/* Section 5: Social */}
                                <section id="section-social" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                        <div className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200" style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}>
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Social & Badges</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200">
                                                <dt className="font-medium sm:s-h5 md:l-h5">Posts & Stories</dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>Share your event moments with posts and stories. Visiting sponsor booths and answering quiz questions in the app earns you extra points!</p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12 space-y-4">
                                                <dt className="font-medium sm:s-h5 md:l-h5">Badges & Profiles</dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>View your earned digital badges, manage your public profile, and share your technical interests to get personalized blog recommendations.</p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA to match About page flow */}
                    {/* <div className="translate-y-10 bg-grey-bg dark:bg-grey py-20 border-t-2 border-grey dark:border-grey-bg mt-10">
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
        </>
    );
}
