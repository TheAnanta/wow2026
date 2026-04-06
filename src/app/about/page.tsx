"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

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
        const sections = ["section-one", "section-two", "section-three", "section-four", "section-five"];
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
                    content="Discover everything you need to know about Google I/O and get answers to your questions."
                />
            </Head>

            <div className="dark:bg-grey-900 min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <div id="page-title" className="absolute top-[-40px]">
                    About Google I/O 2024
                </div>

                {/* Header */}
                <header
                    id="main-header"
                    data-show-map="true"
                    className="bg-grey-bg dark:bg-grey border-black border-b-2 dark:border-white w-full z-30"
                >
                    <nav
                        id="top-nav"
                        className="mx-auto h-[64px] border-black dark:border-grey-300 relative header-nav py-4 md:pr-8 text-md:ml-3 flex items-center"
                        aria-label="Top"
                    >
                        {/* Mobile Nav Button */}
                        <div className="block text-md:hidden">
                            <div className="flex">
                                <button
                                    id="hamburger"
                                    className="mobileHamburger"
                                    tabIndex={0}
                                    aria-label="Toggle Navigation Bar"
                                    aria-expanded={isNavOpen}
                                    onClick={toggleNav}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" fill="white" fillOpacity={0.01}></rect>
                                        <path
                                            id="hamburger-path"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                                            fill="#202124"
                                            className="fill-grey-900 dark:fill-grey-200"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Drawer */}
                            <div
                                id="drawer-nav"
                                aria-modal="true"
                                aria-hidden={!isNavOpen}
                                className={`drawer-nav ${isNavOpen ? "show" : ""}`}
                            >
                                <div id="drawer-nav-a" className="flex justify-between bg-grey dark:bg-white h-[64px] border-black dark:border-white relative header-nav py-4 md:pr-8 items-center google-home-logo">
                                    <Link href="/" aria-label="Google I/O home page" className="focus-trapped ml-5">
                                        <img
                                            id="normal-logo"
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/Logo-dark.svg"
                                            className="block dark:hidden"
                                            width="154"
                                            height="64"
                                            role="presentation"
                                            aria-hidden="true"
                                            alt=""
                                        />
                                        <img
                                            id="dark-logo"
                                            src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/Logo.svg"
                                            className="hidden dark:block"
                                            width="154"
                                            height="64"
                                            role="presentation"
                                            aria-hidden="true"
                                            alt=""
                                        />
                                    </Link>
                                    <button id="close-drawer-btn" type="button" className="ml-auto z-50 p-3 focus-trapped" aria-label="Exit" onClick={toggleNav}>
                                        <svg className="fill-current text-white w-6 h-6 dark:text-grey-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                        </svg>
                                    </button>
                                </div>

                                {/* Mobile Drawer Links */}
                                <div className="flex justify-between items-center pr-2">
                                    <div className="flex justify-between items-center ml-5 mt-4 pr-2">
                                        <div className="nav-links inline sm:s-cta2 lg:s-button-default">
                                            <Link href="/explore" className="focus-trapped">Explore</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center ml-5 mt-7 pr-2">
                                    <div className="nav-links inline sm:s-cta2 lg:s-button-default">
                                        <Link href="/community" className="focus-trapped">Community</Link>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center ml-5 mt-7 pr-2">
                                    <div className="nav-links inline sm:s-cta2 lg:s-button-default active-underline">
                                        <Link href="/about" className="focus-trapped">About</Link>
                                    </div>
                                </div>
                            </div>
                            <div id="nav-mask" className={`drawer-mask ${isNavOpen ? "" : "hidden"}`} onClick={toggleNav}></div>
                        </div>

                        {/* Desktop Nav Logos */}
                        <div className="flex google-home-logo">
                            <Link id="site-logo" href="/" className="mr-[1rem] text-md:ml-3" aria-label="Google I/O home page">
                                <img
                                    id="medium-main-logo"
                                    className="block dark:hidden"
                                    src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/Logo.svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    width="128"
                                    height="28"
                                    alt="I/O Logo"
                                />
                                <img
                                    id="medium-dark-logo"
                                    className="hidden dark:block"
                                    src="https://web.archive.org/web/20240426014218im_/https://io.google/2024/app/images/Logo-light.svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    width="128"
                                    height="28"
                                    alt="I/O Logo Light"
                                />
                            </Link>
                        </div>

                        {/* Desktop Nav Links */}
                        <div id="desktop-nav-links" className="hidden text-md:flex md:flex items-center justify-start flex-nowrap ml-[30px]">
                            <div className="nav-links inline md:s-button-default">
                                <Link href="/explore">Explore</Link>
                            </div>
                            <div className="nav-links inline md:s-button-default">
                                <Link href="/community">Community</Link>
                            </div>
                            <div className="nav-links inline md:s-button-default active-underline">
                                <Link href="/about" className="active">About</Link>
                            </div>
                        </div>

                        {/* Header Actions */}
                        <div id="header-actions" className="flex ml-auto">
                            <div className="hidden text-md:flex md:flex items-center">
                                <div className="h-choose-language">
                                    <select
                                        name="language-select"
                                        aria-label="Drop down to select language"
                                        className="font-medium language-select focus-trapped bg-white md:bg-grey-bg dark:bg-grey text-grey-900 dark:text-white w-full border-none pl-0 ml:w-32 ml:pl-4 sm:s-cta2 md:s-cta1"
                                        defaultValue="en"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="pt">Português</option>
                                        <option value="fr">Français</option>
                                        <option value="id">Indonesia</option>
                                        <option value="ko">한국어</option>
                                        <option value="zh">中文</option>
                                        <option value="ja">日本語</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="hidden md:flex">
                                    <div className="h-header-actions flex justify-between">
                                        <div className="flex flex-row">
                                            <div className="flex ml-3 mr-5">
                                                <button className="font-medium sm:s-cta1 dark:text-white" aria-label="Sign in to Google I/O developer profile">
                                                    Sign in
                                                </button>
                                            </div>
                                            <div className="flex ml-5 mr-3">
                                                <button className="nav-cta-btn" aria-label="Register for Google I/O">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:hidden">
                                    <div id="h-header-actions-mobile" className="flex self-center md:hidden text-grey-900 dark:text-grey-200">
                                        <button className="font-medium mr-5 sm:s-cta1 dark:text-white" aria-label="Sign in to Google I/O developer profile">
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main id="content" className="dark:bg-grey-900 flex-1">
                    {/* Hero Banner */}
                    <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40">
                                About I/O
                            </h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>Discover Google&apos;s latest product launches and more.</p>
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
                                    Registration
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-three")}
                                    className={`faq-pill ${activeFaq === "section-three" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Google Developer Profile
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-four")}
                                    className={`faq-pill ${activeFaq === "section-four" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Community
                                </button>
                                <button
                                    onClick={() => scrollToFaq("section-five")}
                                    className={`last-pill faq-pill ${activeFaq === "section-five" ? "faq-pill__active" : ""}`}
                                    style={{ borderRadius: "8px", minWidth: "fit-content" }}
                                >
                                    Terms and conditions
                                </button>
                            </div>
                        </div>

                        {/* FAQ Sections */}
                        <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">
                            {/* SECTION ONE */}
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
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">How can I stay informed on the latest from Google I/O?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>
                                                    Register to receive important information via email about the digital event. To stay up-to-date on the latest information on sessions, speakers, and other activities, check the Google I/O 2024 website, visit the{" "}
                                                    <a href="https://developers.googleblog.com/" target="_blank" rel="noopener noreferrer">Google Developers blog</a>, and follow us on{" "}
                                                    <a href="https://twitter.com/googledevs" target="_blank" rel="noopener noreferrer">X</a>,{" "}
                                                    <a href="https://www.linkedin.com/showcase/googledevelopers/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, and{" "}
                                                    <a href="https://www.instagram.com/googlefordevs/" target="_blank" rel="noopener noreferrer">Instagram</a>. Join the social conversation about Google I/O 2024 via the official #GoogleIO hashtag.
                                                </p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION TWO */}
                            <section id="section-two" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)" }}
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
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">I&apos;m under 18 years old. Can I register for Google I/O?</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p>Attendees must be at least 18 years of age to participate in Google I/O.</p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </section>

                            {/* SECTION THREE */}
                            <section id="section-three" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(90deg, #FFCB32 -0.15%, #FFCB32 17.85%, #F46831 52.85%, #EA4335 78.85%, #EA4335 99.85%)" }}
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

                            {/* SECTION FOUR */}
                            <section id="section-four" className="pb-10">
                                <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-200 overflow-hidden">
                                    <div
                                        className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-200"
                                        style={{ background: "linear-gradient(270deg, #5382EB 1.91%, #5382EB 25.69%, #9F6CD4 51.37%, #EA4335 79.9%, #EA4335 97.02%)" }}
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

                            {/* SECTION FIVE */}
                            <section id="section-five">
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
                                        <div className="pt-[14px] pr-12 border-grey-900 dark:border-grey-200 text-grey-900 dark:text-white">
                                            <dt>
                                                <div className="flex justify-between items-start w-full text-left">
                                                    <span className="font-medium sm:s-h5 md:l-h5">Communications</span>
                                                </div>
                                            </dt>
                                            <dd className="mt-4 md:mt-5 faq-entry">
                                                <p className="mb-2">
                                                    Applicants and attendees can delete their registration data at any time by deleting their Google I/O 2024 registration badge from their developer profile. Email <a href="mailto:io-online@google.com">io-online@google.com</a> with any questions.
                                                </p>
                                                <p>
                                                    All registered attendees agree to allow Google to contact them regarding their registration and attendance at the event. By registering, you agree to allow Google to communicate with you via email with information regarding the event.
                                                </p>
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