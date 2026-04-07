"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "@/components/sections/Header";

export default function AboutIO() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState("section-one");

    // Toggle mobile navigation drawer
    const toggleNav = () => setIsNavOpen(!isNavOpen);

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
        const sections = ["section-one", "section-two", "section-three", "section-four", "section-five", "section-six", "section-seven"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head>
                <title>About Google I/O 2024</title>
                <meta
                    name="description"
                    content="Discover everything you need to know about World of Wonders 2026 and get answers to your questions."
                />
            </Head>

            <div className="dark:bg-grey-900 min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <div id="page-title" className="absolute top-[-40px]">
                    About Google I/O 2024
                </div>

                {/* Header */}
                <Header onRegisterClick={() => { }} />

                {/* Main Content */}
                <main id="content" className="dark:bg-grey-900 flex-1">
                    {/* Hero Banner */}
                    <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40">
                                About I/O
                            </h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>Discover Google&apos;s latest product launches and more. Discover everything you need to know about World of Wonders 2025 and get answers to your questions.</p>
                                <p>It&apos;s open to everyone online!</p>
                            </div>
                        </div>
                        <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
                            <img
                                className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/io24-about-hero.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/io24-about-hero-dark.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="block md:hidden dark:hidden max-w-[90%] md:max-w-[auto]"
                                src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/io24-about-hero-mobile.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="hidden dark:inline-block dark:md:hidden max-w-[90%] md:max-w-[auto]"
                                src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/io24-about-hero-mobile-dark.webp"
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
                        {/* Get Engaged Section */}
                        <div className="flex flex-col mt-[8px] md:mt-[4px]">
                            <h2 className="font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 md:mb-12 dark:text-grey-200">
                                Get engaged
                            </h2>
                            <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:justify-items-center">
                                {/* Tune in Card */}
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/cs_products.webp"
                                            className="dark:hidden object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                        <img
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/cs_products-dark.webp"
                                            className="hidden dark:block object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Tune in live or on demand</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">
                                            Learn about the latest product launches and updates through keynotes and technical sessions.
                                        </p>
                                        <div>
                                            <div className="h-external-link">
                                                <p>
                                                    <Link href="/explore" className="text-black underline font-medium inline-block mt-3 dark:text-white">
                                                        Watch and explore
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grow your skills Card */}
                                <div className="mb-9 basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/cs_learning.webp"
                                            className="dark:hidden object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                        <img
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/cs_learning-dark.webp"
                                            className="hidden dark:block object-contain h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Grow your skills</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">
                                            Try new Google products and solutions through self-directed codelabs and guided workshops.
                                        </p>
                                    </div>
                                </div>

                                {/* Join community Card */}
                                <div className="basis-full">
                                    <div className="flex justify-center items-center overflow-hidden">
                                        <img
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/cs_program.webp"
                                            className="dark:hidden object-cover h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                        <img
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/cs_program-dark.webp"
                                            className="hidden dark:block object-cover h-full w-full"
                                            width="471"
                                            height="258"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-grey-900 mt-6 dark:text-white">
                                        <h3 className="font-medium mb-3 sm:s-h5 md:l-h5">Join a community group</h3>
                                        <p className="font-normal sm:s-p2 md:l-p1">
                                            Grow your knowledge of Google technology through meetups, collaboration, and more.
                                        </p>
                                        <div>
                                            <Link href="/community" className="text-black underline font-medium inline-block mt-3 dark:text-white">
                                                Get started
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
                            <h2 className="font-medium mb-1 sm:s-h2 hidden faq-title__mobile text-grey-900 dark:text-white">FAQ</h2>
                            <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">
                                Frequently asked questions
                            </h2>
                            <div className="flex flex-col faq-pills">
                                <button
                                    onClick={() => scrollToFaq("section-one")}
                                    className={`faq-pill ${activeFaq === "section-one" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    General
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-two")}
                                    className={`faq-pill ${activeFaq === "section-two" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Hackathon
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-three")}
                                    className={`faq-pill ${activeFaq === "section-three" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Registration
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-four")}
                                    className={`faq-pill ${activeFaq === "section-four" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Google Developer Profile
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-five")}
                                    className={`faq-pill ${activeFaq === "section-five" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Amenities & Details
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-six")}
                                    className={`faq-pill ${activeFaq === "section-six" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Community
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-seven")}
                                    className={`last-pill faq-pill ${activeFaq === "section-seven" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Terms and conditions
                                </button>
                            </div>
                        </div>

                        {/* FAQ Sections */}
                        <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">
                            {/* SECTION ONE - General Merged */}
                            <section id="section-one" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">General</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">When is Google I/O 2024?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    This year&apos;s event will be broadcast in front of a small live audience and is open to everyone online on May 14, 2024. Tune in to the livestreamed keynotes, then dive into technical content and learning material on demand.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How will Google I/O 2024 work for attendees outside of the US?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    One of the exciting things about a digital experience is the opportunity to reach a global audience. Content will be provided on demand and in different languages to serve everyone. Some translated content such as captioned videos may be available shortly after the event. Check out what your local{" "}
                                                    <a href="https://gdg.community.dev/" target="_blank" rel="noopener noreferrer">developer community</a> is offering as well.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How can I stay informed on the latest from Google I/O?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Register to receive important information via email about the digital event. To stay up-to-date on the latest information on sessions, speakers, and other activities, check the Google I/O 2024 website, visit the{" "}
                                                    <a href="https://developers.googleblog.com/" target="_blank" rel="noopener noreferrer">Google Developers blog</a>, and follow us on{" "}
                                                    <a href="https://twitter.com/googledevs" target="_blank" rel="noopener noreferrer">X</a>,{" "}
                                                    <a href="https://www.linkedin.com/showcase/googledevelopers/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, and{" "}
                                                    <a href="https://www.instagram.com/googlefordevs/" target="_blank" rel="noopener noreferrer">Instagram</a>. Join the social conversation about Google I/O 2024 via the official #GoogleIO hashtag.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Session Schedule</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The schedule can be found <a href="/agenda">here</a> soon.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Community Guidelines</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Our community guidelines can be found <a href="/coc" target="_blank">here</a>. Be nice to each other, and be respectful and constructive.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Date and location</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>World of Wonders (WoW) 2025 Visakhapatnam will take place on the 28-29th June 2025 at GITAM (Deemed to be University), Visakhapatnam.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">The official WOW25 app</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The official WoW 2025 Visakhapatnam app will be your go-to resource to unlocking the best experience at the event. It will be your companion for the event, providing you with all the event-related information. You can access the schedule, speaker details, and more through the app. Be sure to download it once it's available very soon!</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Stay Informed</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>To stay up to date on the latest information on sessions, speakers, and activities, be sure to visit the WoW 2025 Visakapatnam website, and follow us on Instagram Page. You can also follow and join the social conversation about WoW 2025 Visakhapatnam via official hashtags #wowxap25. In addition, we&apos;ll be emailing important information to all registered attendees, along with check-in instructions prior to the conference. Make sure to add gdscwowvizag@gmail.com to your contacts to not let a mail pass your inbox.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Content Formats</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>During the conference, attendees will be able to attend sessions and hands-on workshops, chat with experts and attendees.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Language</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>All presentations at WoW 2025 will be in English.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION TWO - Hackathon WoW */}
                            <section id="section-two" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Hackathon</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Overview</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">The WoW 2025 Visakhapatnam Hackathon is a 24-hour event where participants will work in teams to build innovative solutions using the latest technologies.</p>
                                                <p>The hackathon will take place on the 28th-29th June 2025, starting at 06:00 PM on the 28th and ending at 01:00 PM on the 29th.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Eligibility</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The hackathon is open to all registered attendees of WoW 2025 Visakhapatnam. Participants can register as individuals or in teams of up to 5 members. Teams can be formed on the spot during the event.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Domains</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">The hackathon will focus on the following domains:</p>
                                                <ul className="list-disc ml-6 space-y-1 mb-4">
                                                    <li>Web Development</li>
                                                    <li>Mobile App Development</li>
                                                    <li>AI/ML Solutions</li>
                                                    <li>Cloud Computing</li>
                                                    <li>No-Code Development</li>
                                                </ul>
                                                <p className="mb-2">Teams can choose any of these domains, or any other relevant domain, to work on their projects.</p>
                                                <p className="italic text-grey-600 dark:text-grey-400">Participants are encouraged to think outside the box and come up with innovative solutions that can make a difference in the world and impact the community around us in meaningful ways.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Prizes</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The top three teams will be awarded exciting prizes, including cash prizes, tech gadgets, and exclusive swag. All participants will receive a certificate of participation.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Judging</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">The hackathon projects will be judged by a panel of experts based on the following criteria:</p>
                                                <ul className="list-disc ml-6 space-y-1">
                                                    <li>Innovation and Creativity</li>
                                                    <li>Technical Implementation</li>
                                                    <li>User Experience</li>
                                                    <li>Impact and Scalability</li>
                                                </ul>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">AI Usage</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Participants are encouraged to use AI tools and technologies in their projects. However, the use of AI should be ethical and transparent, with proper attribution to any AI models or datasets used.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Late night stay</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p className="mb-2">Participants are expected to stay overnight at the venue during the hackathon. However, in case of any emergency, participants can leave the venue and return the next day by 08:00 AM sharp.</p>
                                                <p>However, they must inform the organizers about their absence and provide a valid reason. Also, atleast two members of the team must be present at the venue at all times.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION THREE - Registration Merged */}
                            <section id="section-three" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Registration</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What does registration include?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Registration for Google I/O 2024 enables you to stay up to date about the schedule and content along with relevant developer news via email. As a registrant, you can also create a{" "}
                                                    <a href="https://developers.google.com/profile/u/me" target="_blank" rel="noopener noreferrer">developer profile</a> to get the most out of the digital experience by saving and viewing content that&apos;s relevant to you.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What happens if I choose not to register?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    If you&apos;re unregistered you can still view the keynotes and sessions, but you won&apos;t receive communications related to the event. In addition, you won&apos;t be able to save content to view later or get recommendations via your{" "}
                                                    <a href="https://developers.google.com/profile/u/me" target="_blank" rel="noopener noreferrer">developer profile</a>.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">I&apos;m under 18 years old. Can I register for Google I/O?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Attendees must be at least 18 years of age to participate in Google I/O.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Registration terms & conditions</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>Tickets are non-transferable and solo individual purchase only.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION FOUR - Google Developer Profile IO */}
                            <section id="section-four" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(270deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Google Developer Profile</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Why do I need a developer profile for Google I/O?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Creating a <a href="https://developers.google.com/profile/u/me" target="_blank" rel="noopener noreferrer">developer profile</a> allows you to select interests, receive content recommendations, and save content to your personal My I/O.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Is My I/O different from my developer profile?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    Yes. My I/O is powered by your <a href="https://developers.google.com/profile/u/me" target="_blank" rel="noopener noreferrer">developer profile</a> interests, which can be changed anytime in your <a href="https://developers.google.com/profile/u/me/settings#account" target="_blank" rel="noopener noreferrer">settings</a>.
                                                </p>
                                                <p className="mb-2">
                                                    My I/O is a custom panel on the event website that helps you keep track of content you&apos;re interested in.
                                                </p>
                                                <p>
                                                    Content you save to My I/O will also be saved to your <a href="https://developers.google.com/profile/u/me" target="_blank" rel="noopener noreferrer">developer profile</a> dashboard so you can watch it after the event is over.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">I&apos;m unable to sign in with my Google account. Why is that?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    If you&apos;re having trouble signing in to register, it may be that you did not grant developer profile access. This applies regardless of whether or not you have created a profile.
                                                </p>
                                                <p>To grant permission, try signing in again and checking the box.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">I&apos;m unable to create a profile with my Google Workspace account. Why is that?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    The developer profile supports Google Workspace account types. If you&apos;re getting an error, you might need your organization&apos;s administrator to enable access to the Google Developers service. If you&apos;re having this issue, share the following instructions with your organization administrator:
                                                </p>
                                                <p className="mb-2">Enable your developer profile for the whole Google Workspace account:</p>
                                                <p className="mb-2">1) From the Admin console Home page, go to Menu &gt; Apps &gt; Additional Google Services</p>
                                                <p className="mb-2">2) Check Google Developers and set Service State to &quot;ON&quot;</p>
                                                <p className="mb-2">3) Click Save.</p>
                                                <p className="mb-2">
                                                    Note: Groups and Organizational units can also be used to enable or disable the developer profile service. An Admin may have a more custom configuration that enables/disables the service across different user groups, in these situations the Admin can view an individual&apos;s account to debug the issue further. See <a href="https://support.google.com/a/answer/10621196" target="_blank" rel="noopener noreferrer">Turn Google Developers on and off for users</a> for more information.
                                                </p>
                                                <p>It might take up to 24 hours for changes to appear.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION FIVE - Amenities & Details WoW Merged */}
                            <section id="section-five" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Amenities & Details</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Internet Access</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>WIFI: <span className="font-bold">GITAM_5GHz</span><br />Password: <b>Gitam$$123</b></p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Onsite food & beverages</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Breakfast, lunch, and dinner are complimentary for attendees.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Accommodation</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">Accommodation details will be shared with registered attendees closer to the event date. Accommodation will be provided for the night of <b>28th June 2025</b> at <b>GITAM (Deemed to be University), Visakhapatnam</b>. The cost of accommodation is <b>₹200</b>, which will be included in the event registration fee. The checkout time for accommodation is <b>7:00 PM on 29th June 2025</b>.</p>
                                                <p className="mb-2">Accommodation will be provided in the <b>GITAM hostel</b>, and it will be <b>shared accommodation</b>. Attendees are expected to maintain decorum and follow the hostel rules during their stay.</p>
                                                <p>Accommodation can be extended for an additional fee of <b>₹100 per night</b>, subject to availability. If you wish to extend your stay, you can manage your stay through the <b>official WoW 2025 Visakhapatnam app</b>, which will be available for download closer to the event date.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Washroom</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Washrooms can be found on either side (<b>East and West</b>) of the <b>ICT building</b>, located <b>behind the elevator lobbies</b>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Drinking Fountain</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Drinking fountain/bottle filling stations can be found <b>next to all washroom entrances</b>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Event Attire</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>WoW 2025 Visakhapatnam is a developer event, so please be <b>comfortable and casual</b>. There is no enforced dress code.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Smoking</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Smoking is <b>strictly prohibited</b> at the venue.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">No Soliciting</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>No solicitation or selling of items or services is allowed at WoW 2025 Visakhapatnam. Any attendee conducting these activities <b>may be removed</b> from the conference.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION SIX - Community IO */}
                            <section id="section-six" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Community</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Will there be community-led events (I/O Extended)?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Yes. Check the <Link href="/community">Community</Link> page to learn more.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What is the difference between Google I/O, I/O Connect, and I/O Extended?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    Google I/O is Google&apos;s flagship event featuring the latest announcements and updates in technology. Developers can tune in online for the livestreamed keynotes, watch on demand technical sessions, and explore self-paced learning material.
                                                </p>
                                                <p className="mb-2">
                                                    <a href="https://developers.google.com/events" target="_blank" rel="noopener noreferrer">I/O Connect</a> is a hands-on, in-person developer event series by Google, focused on applying the technology and announcements from Google I/O through live sessions, demos, office hours, and more.
                                                </p>
                                                <p>
                                                    <a href="https://gdg.community.dev/ioextended" target="_blank" rel="noopener noreferrer">I/O Extended</a> is a series of community-hosted, global events by Google Developer Groups and each event can vary in its format.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What happens if I violate the Community Guidelines?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Google reserves the right to refuse admittance to, or remove any person from, any Google hosted event (including future Google events) at any time in its sole discretion. This includes, but is not limited to, attendees behaving in a disorderly manner or failing to comply with{" "}
                                                    <a href="https://developers.google.com/community-guidelines" target="_blank" rel="noopener noreferrer">this policy, and the terms and conditions herein.</a> If a participant engages in harassing or uncomfortable behavior, the conference organizers may take any action they deem appropriate, including warning or expelling the offender from the conference with no refund or blocking the offender&apos;s account from participating online.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How do I report a violation of the Community Guidelines?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>
                                                    Please file a report with <a href="mailto:io-saysomething@google.com">io-saysomething@google.com</a>. Our team will review escalations and take the necessary actions.
                                                </p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION SEVEN - Terms and conditions IO */}
                            <section id="section-seven">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Terms and conditions</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Registration Terms</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    By registering you acknowledge that your information will be used in accordance with Google&apos;s{" "}
                                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and{" "}
                                                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
                                                </p>
                                                <p className="mb-2">
                                                    You may not register on behalf of anyone else. Google I/O registration must be used by the original registrant and is non-transferable.
                                                </p>
                                                <p className="mb-2">
                                                    All information entered into the registration form must be correct and accurate to the best of your knowledge. All information must be entered in English. Some of the information entered (such as name and company), will be displayed to other users if you contribute to Q&amp;As or participate in Chat.
                                                </p>
                                                <p className="mb-2">
                                                    Attendees must be at least 18 years of age to attend Google I/O. By registering, you are attesting that you are 18 years of age or older.
                                                </p>
                                                <p className="mb-2">Virtual attendance at Google I/O is not allowed by the following:</p>
                                                <ul className="list-disc pl-5">
                                                    <li>Residents of or individuals ordinarily resident in embargoed countries; or</li>
                                                    <li>Individuals otherwise prohibited by applicable exports controls or local law.</li>
                                                </ul>
                                                <p className="mb-2">By registering and accepting any discounts, gifts, or items of value related to WoW 2025 Visakhapatnam, you certify that you are able to do so in compliance with applicable laws and the internal rules of your organization.</p>
                                                <p className="mb-2">Tickets may not be sold, bartered, or auctioned in any way, and doing so may result in GDGoC Andhra Pradesh rendering the ticket null and void without any responsibility to GDGoC Andhra Pradesh.</p>
                                                <p className="mb-2">Attendees aren&apos;t permitted to bring guests to WoW 2025 Visakhapatnam. If you have someone traveling with you, they&apos;ll need to register themselves and purchase an attendee ticket.</p>

                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Event conduct</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    By registering you agree to follow the <a href="https://developers.google.com/community-guidelines" target="_blank" rel="noopener noreferrer">Community Guidelines and Anti-Harassment Policy.</a>
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Communications</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    Applicants and attendees can delete their registration data at any time by deleting their Google I/O 2024 registration badge from their developer profile. Email <a href="mailto:io-online@google.com">io-online@google.com</a> with any questions.
                                                </p>
                                                <p>
                                                    All registered attendees agree to allow Google to contact them regarding their registration and attendance at the event. By registering, you agree to allow Google to communicate with you via email with information regarding the event.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Photography and Media</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">Photographs and/or video taken at WoW 2025 Visakhapatnam by GDGoC Andhra Pradesh, or others on behalf of GDGoC Andhra Pradesh, may include your image or likeness.</p>
                                                <p>You agree that GDGoC Andhra Pradesh may use such photographs and/or video for any purpose without compensation to you.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Liability and Safety</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p className="mb-2">You agree to be solely responsible for your own safety, belongings, and well-being while participating in WoW 2025 Visakhapatnam.</p>
                                                <p>GDGoC Andhra Pradesh won&apos;t be liable for your participation in WoW 2025 Visakhapatnam.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer id="footer" className="pt-10 pb-16 lg:py-10 px-7 lg:px-16 bg-grey-900 flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6 text-grey-500 text-[16px] font-medium flex-1">
                        <div className="text-2xl font-semibold lg:mr-6 text-grey-500 flex justify-between w-full mb-4 lg:mb-0 lg:w-auto items-center">
                            <a href="https://developers.google.com/" target="_blank" rel="noopener noreferrer" aria-label="Google Developers home page">
                                <img
                                    className="block"
                                    src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/Logo-GoogleForDevelopers.svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    width="180"
                                    height="20"
                                    loading="lazy"
                                    alt="Google for Developers"
                                />
                            </a>
                        </div>
                        <a href="https://io.google/2023/" target="_blank" rel="noreferrer noopener">
                            I/O 2023
                        </a>
                        <Link href="/puzzle" rel="noreferrer noopener">
                            I/O Puzzle
                        </Link>
                        <a href="https://policies.google.com/" target="_blank" rel="noreferrer noopener">
                            Privacy &amp; terms
                        </a>
                        <a href="https://developers.google.com/community-guidelines" target="_blank" rel="noreferrer noopener">
                            Community guidelines
                        </a>
                        <button aria-hidden="true" className="glue-cookie-notification-bar-control hover:underline">Manage cookies</button>
                    </div>

                    <div className="flex lg:justify-self-end lg:justify-end mt-12 lg:mt-0">
                        <a href="https://www.youtube.com/user/GoogleDevelopers" className="p-3" target="_blank" rel="noreferrer noopener" aria-label="Google Developers on YouTube">
                            <img src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/ic_youtube.svg" role="img" aria-hidden="true" height="24" width="24" loading="lazy" alt="YouTube" />
                        </a>
                        <a href="https://www.instagram.com/googlefordevs/" className="p-3" target="_blank" rel="noreferrer noopener" aria-label="Google Developers on Instagram">
                            <img src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/ic_instagram.svg" role="img" aria-hidden="true" height="24" width="24" loading="lazy" alt="Instagram" />
                        </a>
                        <a href="https://www.linkedin.com/showcase/googledevelopers/" className="p-3" target="_blank" rel="noreferrer noopener" aria-label="Google Developers on LinkedIn">
                            <img src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/ic_linkedin.svg" role="img" aria-hidden="true" height="24" width="24" loading="lazy" alt="LinkedIn" />
                        </a>
                        <a href="https://twitter.com/googledevs" className="p-3" target="_blank" rel="noreferrer noopener" aria-label="Google Developers on Twitter">
                            <img src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/ic_twitter.svg" role="img" aria-hidden="true" height="24" width="24" loading="lazy" alt="Twitter" />
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
}