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

            <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <div id="page-title" className="absolute top-[-40px]">
                    About Google I/O 2024
                </div>

                {/* Header */}
                <Header onRegisterClick={() => { }} />

                {/* Main Content */}
                <main id="content" className="dark:bg-grey-900! flex-1">
                    {/* Hero Banner */}
                    <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40">
                                About WOW
                            </h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>Discover everything you need to know about Wonder of Wonders 2026 and get answers to your questions.</p>

                            </div>
                        </div>
                        <div className="flex justify-end items-end w-full md:w-3/5 !justify-start xl:!justify-end xl:pr-5">
                            <img
                                className="hidden md:inline-block h-full object-cover object-left dark:hidden md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="/images/io__-about-hero.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="hidden dark:md:inline-block h-full object-cover object-left md:max-h-[200px] text-md:max-h-[350px] -mb-[2px]"
                                src="/images/io24-about-hero-dark.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="block md:hidden dark:hidden max-w-[90%] md:max-w-[auto]"
                                src="/images/io24-about-hero-mobile.webp"
                                role="img"
                                aria-hidden="true"
                                fetchPriority="high"
                                width="800"
                                height="350"
                                alt=""
                            />
                            <img
                                className="hidden dark:inline-block dark:md:hidden max-w-[90%] md:max-w-[auto]"
                                src="/images/io__-about-hero-mobile-dark.webp"
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
                            <h2 className="font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 md:mb-12 dark:text-grey-bg!">
                                Get engaged
                            </h2>
                            <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:justify-items-center">
                                {/* Tune in Card */}
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
                                    onClick={() => scrollToFaq("section-five")}
                                    className={`faq-pill ${activeFaq === "section-five" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Amenities & Details
                                </button>
                            </div>
                        </div>

                        {/* FAQ Sections */}
                        <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">
                            {/* SECTION ONE - General Merged */}
                            <section id="section-one" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg"
                                        style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">General</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What is WOW 2026?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    GDGWOW (Wonder of Wonders) is a premier developer conference and 14-hour hackathon hosted by 33 GDG on Campus chapters across Andhra Pradesh.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">When is GDGWOW 2026?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    GDGWOW is taking place in Vizag at GITAM University from 4th, July  to 5th, July this year.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How will GDGWOW 2026 work for attendees unable to attend in person?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    One of the exciting things about this event is the opportunity to reach a wider audience. Conference recordings will be provided on demand to serve every WOW+ pass holder.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How can I stay informed on the latest from GDGWOW 2026?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Create an account now to receive important information via email about the event. To stay up-to-date on the latest information on sessions, speakers, and other activities, check the GDGWOW 2026 website and follow our instagram page{" "}
                                                    <a href="https://www.instagram.com/gdgoncampusgitam/" target="_blank" rel="noopener noreferrer">@gdgoncampusgitam</a>,{" "}. Join the social conversation about GDGWOW 2026 via the official #GDGWOW2026 hashtag.
                                                </p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Where can we know more about the schedule?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The schedule can be found <a href="/agenda">here</a>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Community Guidelines</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Our community guidelines can be found <a href="/coc" target="_blank">here</a>. Be nice to each other, and be respectful and constructive.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">The official GDGWOW 26 app</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The official GDGWOW 26 app will be your go-to resource to unlocking the best experience at the event. It will be your companion for the event, providing you with all the event-related information. You can access the schedule, speaker details, and more through the app. Be sure to download it once it's available very soon!</p>
                                            </dd>
                                        </div>

                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Medium of communication</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>All the conferences, sessions and workshops will be conducted in English.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION TWO - Hackathon WoW */}
                            <section id="section-two" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg"
                                        style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Hackathon</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Overview</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">The GDGWOW 2026 Visakhapatnam Hackathon is a 14-hour event where participants will work in teams to build innovative solutions using the latest technologies.</p>
                                                <p>The hackathon will take place on the 4th-5th July 2026, starting at 04:00 PM on the 4th and ending at 06:00 AM on the 5th.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Eligibility</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The hackathon is open to all registered attendees of GDGWOW 2026 Visakhapatnam. Participants can register as teams ranging from 3 to 5 members. Teams can be formed on the spot during the event. The team registration panel can be found <a href="#">here</a>. You can explore the community page of the GDGWOW 26 app to find teamates.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
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
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Prizes</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>The top three teams will be awarded exciting cash prizes and exclusive swags. All participants will receive a certificate of participation.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
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
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">AI Usage</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Participants are encouraged to use AI tools and technologies in their projects. However, the use of AI should be ethical and transparent, with proper attribution to any AI models or datasets used.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
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
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg"
                                        style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Registration</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">What does registration include?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>
                                                    Registration for GDGWOW 26 enables you to stay up to date about the schedule and content along with relevant developer news via email.
                                                </p>
                                            </dd>
                                        </div>

                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
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


                            {/* SECTION FIVE - Amenities & Details WoW Merged */}
                            <section id="section-five" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg"
                                        style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                    >
                                        <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Amenities & Details</h2>
                                    </div>
                                    <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Internet Access</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>High-speed Wi-Fi will be provided by GITAM University throughout the event.<br /><br />WIFI: <span className="font-bold">GITAM_5GHz</span><br />Password: <b>Gitam$$123</b></p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Onsite food & beverages</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Breakfast, lunch, and dinner are complimentary for attendees.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Accommodation</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p className="mb-2">Accommodation details will be shared with registered attendees closer to the event date.<br /><br />Accommodation will be provided for the night of <b>3rd July 2026</b> at <b>GITAM (Deemed to be University), Visakhapatnam</b>. The cost of accommodation is <b>₹300</b>, which is not included in the event registration fee. The checkout time for accommodation is <b>11:59 AM on 4th July 2026</b>.</p>
                                                <p className="mb-2">Accommodation will be provided in the <b>GITAM hostel</b>, and it will be <b>shared accommodation</b>. Attendees are expected to maintain decorum and follow the hostel rules during their stay.</p>
                                                <p>Accommodation can be extended for an additional fee of <b>₹200 per night</b>, subject to availability. The stay can be extended until <b>11:59 AM</b> 6th July 2026.</p><br />
                                                <p>If you wish to extend your stay, you can manage your stay through the <b>official GDGDWOW 2026 Visakhapatnam app</b>, which will be available for download soon.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Washroom</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Washrooms can be found on either side (<b>East and West</b>) of the <b>ICT building</b>, located <b>behind the elevator lobbies</b>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Drinking Fountain</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Drinking fountain/bottle filling stations can be found <b>next to all washroom entrances</b>.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Event Attire</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>GDGWOW Visakhapatnam is a developer event, so please be <b>comfortable and casual</b>. There is no enforced dress code.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Smoking</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                <p>Smoking is <b>strictly prohibited</b> at the venue.</p>
                                            </dd>
                                        </div>
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">No Soliciting</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>No solicitation or selling of items or services is allowed at GDGWOW 2026 Visakhapatnam. Any attendee conducting these activities <b>may be removed</b> from the conference.</p>
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