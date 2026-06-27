"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "@/components/sections/Header";

export default function SponsorshipDeck() {

    useEffect(() => {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const tiers = [
        {
            name: "Diamond",
            price: "₹1,00,000",
            recommended: false,
            benefits: [
                "15 min stage time",
                "20x Prime sponsor mentions",
                "Booth setup space",
                "Logo on ID cards, banners, certificates & thank you mail",
                "Advertisement through reels & logo on swags",
                "Logo on Event banner",
                "Social media mention before & after event",
                "Inclusion of promo material & goodies in kit",
                "Access to Student Participation Data",
                "Exclusive student feedback",
            ],
        },
        {
            name: "Platinum",
            price: "₹60,000",
            recommended: true,
            benefits: [
                "10 min stage time",
                "10x Prime sponsor mentions",
                "Booth setup space",
                "Logo on ID cards, banners, certificates & thank you mail",
                "Advertisement through reels & logo on swags",
                "Logo on Event banner",
                "Social media mention before & after event",
                "Inclusion of promo material & goodies in kit",
                "Access to Student Participation Data",
                "Exclusive student feedback",
            ],
        },
        {
            name: "Gold",
            price: "₹30,000",
            recommended: false,
            benefits: [
                "5 min stage time",
                "5x Prime sponsor mentions",
                "Booth setup space",
                "Logo on Event banner",
                "Social media mention before & after event",
                "Inclusion of promo material & goodies in kit",
                "Access to Student Participation Data",
            ],
        },
    ];

    return (
        <>
            <Head>
                <title>Sponsorship Deck — WoW 2026 Visakhapatnam</title>
                <meta
                    name="description"
                    content="Partner with Wonder of Wonders 2026 — South India's largest student-run tech festival. Reach 3,000+ developers at GITAM University, Visakhapatnam."
                />
            </Head>

            <div className="dark:bg-grey-900! min-h-screen flex flex-col font-sans text-[#202124] dark:text-white bg-white">
                <div id="page-title" className="absolute top-[-40px]">
                    Sponsorship Deck — WoW 2026
                </div>

                {/* Header */}
                <Header onRegisterClick={() => { }} />

                {/* Main Content */}
                <main id="content" className="dark:bg-grey-900! flex-1">
                    {/* Hero Banner */}
                    <div className="w-full flex flex-col md:flex-row text-md:h-[407px] md:h-[407px] overflow-hidden bg-grey-bg dark:bg-grey! border-b-[1px] md:border-b-2 border-grey dark:border-grey-bg">
                        <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-2/5 md:p-10 md:pr-0 dark:text-white z-10">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40 md:-mr-40">
                                Partner with WOW
                            </h1>
                            <div className="font-medium sm:s-h6 md:l-h6 mb-4">
                                <p>Shape the future of tech — connect your brand with 3,000+ developers at South India&apos;s largest student-run tech festival.</p>
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

                        {/* Why Partner Section */}
                        <div className="flex flex-col mt-[8px] md:mt-[4px] mb-12 md:mb-16">
                            <h2 className="font-medium text-left text-grey-900 mb-4 sm:s-h4 md:l-h2 md:mb-8 dark:text-grey-bg!">
                                Why Partner With Us?
                            </h2>
                            <p className="font-normal sm:s-p2 md:l-p1 max-w-3xl mb-10 text-grey-600 dark:text-grey-400">
                                Wonder of Wonders is the flagship student-run tech festival by 36+ Google Developer Groups on Campus chapters across Andhra Pradesh. With 3,000+ in-person attendees expected at GITAM University, Visakhapatnam on July 4–5, this is your gateway to the next generation of tech talent.
                            </p>

                            {/* Key Benefits Grid */}
                            <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:justify-items-center">
                                {/* Direct Engagement Card */}
                                <div className="mb-6 basis-full w-full">
                                    <div className="relative flex flex-col justify-start items-start p-6 ml:p-10 rounded-[16px] bg-grey-bg dark:bg-grey! border md:border-2 border-grey dark:border-white h-full transition-transform hover:-translate-y-1 overflow-hidden min-h-[300px] md:min-h-[320px]">
                                        <div className="relative z-10 max-w-[65%] flex flex-col items-start">
                                            <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                                                Direct Engagement
                                            </span>
                                            <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-h6 md:l-h6">
                                                Dedicated booth space and stage time to address 3,000+ attendees directly.
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 right-0 max-w-[40%] rounded-br-[16px] pointer-events-none">
                                            <img src="/images/io24-planio-cta.svg" className="inline-block dark:hidden" role="img" aria-hidden="true" width="180" height="150" alt="" loading="lazy" />
                                            <img src="/images/io24-planio-cta-dark.svg" className="hidden dark:inline-block" role="img" aria-hidden="true" width="180" height="150" alt="" loading="lazy" />
                                        </div>
                                    </div>
                                </div>

                                {/* Recruitment Access Card */}
                                <div className="mb-6 basis-full w-full">
                                    <div className="relative flex flex-col justify-start items-start p-6 ml:p-10 rounded-[16px] bg-grey-bg dark:bg-grey! border md:border-2 border-grey dark:border-white h-full transition-transform hover:-translate-y-1 overflow-hidden min-h-[300px] md:min-h-[320px]">
                                        <div className="relative z-10 max-w-[65%] flex flex-col items-start">
                                            <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                                                Recruitment Access
                                            </span>
                                            <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-h6 md:l-h6">
                                                Direct access to student participation data and exclusive feedback from top talent.
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 right-0 max-w-[45%] rounded-br-[16px] pointer-events-none">
                                            <img src="/images/io24-join-community-cta-v2.svg" className="inline-block dark:hidden" role="img" aria-hidden="true" width="180" height="150" alt="" loading="lazy" />
                                            <img src="/images/io24-join-community-cta-dark.svg" className="hidden dark:inline-block" role="img" aria-hidden="true" width="180" height="150" alt="" loading="lazy" />
                                        </div>
                                    </div>
                                </div>

                                {/* Brand Integration Card */}
                                <div className="mb-6 basis-full w-full">
                                    <div className="relative flex flex-col justify-start items-start p-6 ml:p-10 rounded-[16px] bg-grey-bg dark:bg-grey! border md:border-2 border-grey dark:border-white h-full transition-transform hover:-translate-y-1 overflow-hidden min-h-[300px] md:min-h-[320px]">
                                        <div className="relative z-10 max-w-[65%] flex flex-col items-start">
                                            <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                                                Brand Integration
                                            </span>
                                            <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-h6 md:l-h6">
                                                Logo placement on event banners, ID cards, certificates, and attendee kits.
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 right-0 max-w-[40%] rounded-br-[16px] pointer-events-none">
                                            <img src="/images/io24-learning-cta.webp" className="inline-block dark:hidden" role="img" aria-hidden="true" width="180" height="150" alt="" loading="lazy" />
                                            <img src="/images/io24-learning-cta-dark.webp" className="hidden dark:inline-block" role="img" aria-hidden="true" width="180" height="150" alt="" loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sponsorship Tiers */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="font-medium text-left text-grey-900 mb-3 sm:s-h4 md:l-h2 dark:text-grey-bg!">
                                Partnership Tiers
                            </h2>
                            <p className="font-normal sm:s-p2 md:l-p1 text-grey-600 dark:text-grey-400 mb-10 max-w-2xl">
                                Choose the tier that aligns with your goals. Every tier unlocks meaningful visibility and direct access to India&apos;s sharpest student developers.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {tiers.map((tier) => (
                                    <div
                                        key={tier.name}
                                        className={`relative rounded-2xl bg-white dark:bg-grey-900 overflow-visible transition-all duration-200 ${tier.recommended
                                            ? "ring-0"
                                            : "border border-[#dadce0] dark:border-grey-bg hover:shadow-lg"
                                            }`}
                                        style={
                                            tier.recommended
                                                ? {
                                                    boxShadow:
                                                        "0 3px 0 0 #EA4335, -3px 0 0 0 #34A853, 0 0 0 3px #4285F4, 0 8px 24px rgba(0,0,0,0.12)",
                                                    border: "1px solid #dadce0",
                                                    borderRadius: "16px",
                                                }
                                                : undefined
                                        }
                                    >
                                        {/* Recommended Label */}
                                        {tier.recommended && (
                                            <div className="px-4 pt-4 pb-1 text-center">
                                                <span className="text-[11px] font-bold text-grey-900 dark:text-white uppercase tracking-wider">
                                                    Recommended
                                                </span>
                                            </div>
                                        )}

                                        {/* Card Content */}
                                        <div className={`text-center ${tier.recommended ? "px-5 pt-1 pb-5" : "px-5 pt-8 pb-5"}`}>
                                            <p className="text-[15px] font-semibold text-grey-900 dark:text-white mb-1">{tier.name}</p>
                                            <p className={`font-bold text-grey-900 dark:text-white mb-5 ${tier.recommended ? "text-[28px]" : "text-[24px]"}`}>
                                                {tier.price}
                                            </p>
                                            <Link
                                                href="mailto:gdgocwow@gmail.com?subject=WoW 2026 Partnership Inquiry"
                                                className={`inline-block rounded-full text-sm font-semibold px-7 py-2.5 transition-all duration-200 ${tier.recommended
                                                    ? "bg-[#2c5fd9] text-white hover:bg-[#1a4cb8]"
                                                    : "border border-[#dadce0] dark:border-grey-bg text-[#2c5fd9] dark:text-[#8ab4f8] hover:bg-[#f8f9fa] dark:hover:bg-grey"
                                                    }`}
                                            >
                                                Get started
                                            </Link>
                                        </div>

                                        {/* Divider */}
                                        <div className="mx-5">
                                            <hr className="border-0 border-t border-[#e0e0e0] dark:border-grey-bg" />
                                        </div>

                                        {/* Benefits */}
                                        <div className="px-5 py-5 text-[13px] text-grey-600 dark:text-grey-400 leading-[2]">
                                            {tier.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-start gap-2.5">
                                                    <span className={`font-bold flex-shrink-0 ${tier.recommended ? "text-[#2c5fd9]" : tier.name === "Silver" ? "text-grey-400" : "text-[#2c5fd9]"}`}>
                                                        ✓
                                                    </span>
                                                    <span>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* PDF Viewer */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="font-medium text-left text-grey-900 mb-3 sm:s-h4 md:l-h2 dark:text-grey-bg!">
                                The Full Deck
                            </h2>
                            <p className="font-normal sm:s-p2 md:l-p1 text-grey-600 dark:text-grey-400 mb-8 max-w-2xl">
                                Dive deeper into the numbers, audience demographics, and sponsorship deliverables.
                            </p>
                            <div className="w-full rounded-2xl overflow-hidden border-2 border-grey dark:border-grey-bg bg-grey-bg dark:bg-grey">
                                <iframe
                                    src="/images/wow-2026-sponsorship-deck.pdf"
                                    className="w-full"
                                    style={{ height: "80vh", minHeight: "600px" }}
                                    title="WoW 2026 Sponsorship Deck"
                                />
                            </div>
                            <div className="mt-4 flex items-center gap-4">
                                <a
                                    href="/images/wow-2026-sponsorship-deck.pdf"
                                    download
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#2c5fd9] dark:text-[#8ab4f8] hover:underline"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                    </svg>
                                    Download PDF
                                </a>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <div className="faq-container flex flex-col md:flex-row gap-12 mt-[60px] mb-16 md:mb-24">
                            {/* Left: Sticky Pills Nav / Title */}
                            <div className="faq-pills__container">
                                <h2 className="font-medium mb-1 sm:s-h2 hidden faq-title__mobile text-grey-900 dark:text-white">FAQ</h2>
                                <h2 className="font-medium mb-8 sm:l-h2 block faq-title__desktop text-grey-900 dark:text-white">
                                    Frequently asked questions
                                </h2>
                                <p className="font-normal sm:s-p2 md:l-p1 text-grey-600 dark:text-grey-400 mt-2">
                                    Have more questions about sponsoring WoW 2026? Reach out to us at <a href="mailto:gdgocwow@gmail.com" className="text-[#2c5fd9] dark:text-[#8ab4f8] underline">gdgocwow@gmail.com</a>
                                </p>
                            </div>

                            {/* Right: Content sections */}
                            <div className="flex-1 flex flex-col w-full max-w-xl mx-auto faq-sections">
                                <section id="faq-sponsorship" className="pb-10">
                                    <div className="border-2 rounded-2xl border-grey-900 dark:border-grey-bg overflow-hidden">
                                        <div
                                            className="section-header flex justify-between items-center border-b-2 p-[30px] md:py-[23px] md:pl-12 border-grey-900 dark:border-grey-bg"
                                            style={{ background: "linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)" }}
                                        >
                                            <h2 className="font-medium text-grey-900 sm:s-h4 md:l-h4">Sponsorship</h2>
                                        </div>
                                        <dl className="px-[30px] pb-[50px] pt-5 md:px-12 md:pb-10 md:pt-[42px]">
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                                <dt>
                                                    <span className="font-medium sm:s-h5 md:l-h5">Can we customize our sponsorship tier?</span>
                                                </dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>
                                                        Absolutely! While we have standard tiers, we understand that every company has unique goals. Reach out to us and we can tailor a custom package that perfectly aligns with your objectives.
                                                    </p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12 border-b-2 mb-[18px] pb-[14px] border-grey-900 dark:border-grey-bg text-grey-900 dark:text-white">
                                                <dt>
                                                    <span className="font-medium sm:s-h5 md:l-h5">What kind of data will we receive from the attendees?</span>
                                                </dt>
                                                <dd className="mt-4 mb-[18px] md:mt-5 faq-entry">
                                                    <p>
                                                        Depending on your tier, you&apos;ll receive opted-in attendee data which includes academic backgrounds, graduation years, technical skills, and contact information for recruitment purposes.
                                                    </p>
                                                </dd>
                                            </div>
                                            <div className="pt-[14px] pr-12 mb-[18px] pb-[14px] text-grey-900 dark:text-white">
                                                <dt>
                                                    <span className="font-medium sm:s-h5 md:l-h5">How many attendees are expected?</span>
                                                </dt>
                                                <dd className="mt-4 md:mt-5 faq-entry">
                                                    <p>
                                                        We are expecting over 3,000 in-person attendees over the course of the 2-day event at GITAM University.
                                                    </p>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <section className="mb-16 md:mb-24">
                            <div className="relative flex flex-col bg-grey-bg dark:bg-grey! border md:border-2 border-grey dark:border-white rounded-[16px] overflow-hidden lg:flex-row min-h-[280px]">
                                <div className="relative z-10 flex flex-col items-start p-6 ml:p-10 lg:w-3/5">
                                    <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                                        Ready to make an impact?
                                    </span>
                                    <p className="text-grey dark:text-white mb-4 text-md:mb-6 sm:s-h6 md:l-h6 max-w-[85%]">
                                        Let&apos;s discuss how a partnership with WoW 2026 aligns with your company&apos;s goals. We&apos;d love to schedule a brief 10-minute call.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                        <a
                                            href="mailto:gdgocwow@gmail.com?subject=WoW 2026 Partnership Inquiry"
                                            className="cta-secondary inline-flex items-center gap-2"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                            </svg>
                                            Email Us
                                        </a>
                                        <a
                                            href="/images/wow-2026-sponsorship-deck.pdf"
                                            download
                                            className="cta-secondary inline-flex items-center gap-2"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                            </svg>
                                            Download Deck
                                        </a>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 max-w-[35%] rounded-br-[16px] pointer-events-none hidden lg:block">
                                    <img src="/images/io__-connect.svg" className="inline-block dark:hidden" role="img" aria-hidden="true" width="246" height="299" alt="" loading="lazy" />
                                    <img src="/images/io__-connect-dark.svg" className="hidden dark:inline-block" role="img" aria-hidden="true" width="246" height="299" alt="" loading="lazy" />
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </>
    );
}
