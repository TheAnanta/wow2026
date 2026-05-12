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
            price: "₹5,00,000",
            recommended: false,
            benefits: [
                "15 min stage time",
                "20x sponsor mentions",
                "Booth setup space",
                "Logo on all assets",
                "Reel ads & swag logo",
                "Full participation data",
            ],
        },
        {
            name: "Platinum",
            price: "₹2,00,000",
            recommended: true,
            benefits: [
                "10 min stage time",
                "10x sponsor mentions",
                "Booth setup space",
                "Logo on IDs & certificates",
                "Participation data",
            ],
        },
        {
            name: "Gold",
            price: "₹1,00,000",
            recommended: false,
            benefits: [
                "5 min stage time",
                "3x sponsor mentions",
                "Booth setup space",
                "Participation data",
            ],
        },
        {
            name: "Silver",
            price: "₹50,000",
            recommended: false,
            benefits: [
                "Social mentions",
                "Goodies in attendee kit",
                "Participation data",
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
                                Partner with WoW
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

                    {/* Content */}
                    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 pt-8 md:pt-14 text-grey-900 dark:text-white flex flex-col">

                        {/* Why Partner Section */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="font-medium text-left text-grey-900 mb-6 sm:s-h4 md:l-h2 dark:text-grey-bg!">
                                Why Partner with WoW 2026?
                            </h2>
                            <p className="font-normal sm:s-p2 md:l-p1 max-w-3xl mb-10 text-grey-600 dark:text-grey-400">
                                Wonder of Wonders is the flagship student-run tech festival by 36+ Google Developer Groups on Campus chapters across Andhra Pradesh. With 3,000+ in-person attendees expected at GITAM University, Visakhapatnam on July 4–5, this is your gateway to the next generation of tech talent.
                            </p>

                            {/* Key Benefits Grid */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl border-2 border-grey dark:border-grey-bg">
                                    <div className="w-12 h-12 rounded-full bg-[#E8F0FE] dark:bg-[#1a3a6b] flex items-center justify-center mb-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#4285F4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-medium mb-2 sm:s-h5 md:l-h5">Direct Engagement</h3>
                                    <p className="font-normal sm:s-p2 md:l-p2 text-grey-600 dark:text-grey-400">
                                        Dedicated booth space and stage time to address 3,000+ attendees directly.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl border-2 border-grey dark:border-grey-bg">
                                    <div className="w-12 h-12 rounded-full bg-[#E6F4EA] dark:bg-[#1a4d2e] flex items-center justify-center mb-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" fill="#34A853" />
                                        </svg>
                                    </div>
                                    <h3 className="font-medium mb-2 sm:s-h5 md:l-h5">Recruitment Access</h3>
                                    <p className="font-normal sm:s-p2 md:l-p2 text-grey-600 dark:text-grey-400">
                                        Direct access to student participation data and exclusive feedback from top talent.
                                    </p>
                                </div>
                                <div className="p-6 rounded-2xl border-2 border-grey dark:border-grey-bg">
                                    <div className="w-12 h-12 rounded-full bg-[#FEF7E0] dark:bg-[#4d3a1a] flex items-center justify-center mb-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#FBBC04" />
                                        </svg>
                                    </div>
                                    <h3 className="font-medium mb-2 sm:s-h5 md:l-h5">Brand Integration</h3>
                                    <p className="font-normal sm:s-p2 md:l-p2 text-grey-600 dark:text-grey-400">
                                        Logo placement on event banners, ID cards, certificates, and attendee kits.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Sponsorship Tiers */}
                        <section className="mb-12 md:mb-16">
                            <h2 className="font-medium text-left text-grey-900 mb-3 sm:s-h4 md:l-h2 dark:text-grey-bg!">
                                Partnership Tiers
                            </h2>
                            <p className="font-normal sm:s-p2 md:l-p1 text-grey-600 dark:text-grey-400 mb-10 max-w-2xl">
                                Choose the tier that aligns with your goals. Every tier unlocks meaningful visibility and direct access to India&apos;s sharpest student developers.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                                                href="mailto:gdgoncampusgitam@gmail.com?subject=WoW 2026 Partnership Inquiry"
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

                        {/* CTA Section */}
                        <section className="mb-16 md:mb-24">
                            <div className="rounded-2xl border-2 border-grey-900 dark:border-grey-bg overflow-hidden">
                                <div
                                    className="p-8 md:p-12"
                                    style={{ background: "linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC04 100%)" }}
                                >
                                    <h2 className="font-medium text-grey-900 mb-3 sm:s-h3 md:l-h2">
                                        Ready to make an impact?
                                    </h2>
                                    <p className="text-grey-900 font-normal sm:s-p2 md:l-p1 mb-6 max-w-xl opacity-80">
                                        Let&apos;s discuss how a partnership with WoW 2026 aligns with your company&apos;s goals. We&apos;d love to schedule a brief 10-minute call.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a
                                            href="mailto:gdgoncampusgitam@gmail.com?subject=WoW 2026 Partnership Inquiry"
                                            className="inline-flex items-center justify-center gap-2 bg-grey-900 text-white font-semibold px-8 py-3 rounded-full text-sm hover:bg-black transition-colors"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                            </svg>
                                            Email Us
                                        </a>
                                        <a
                                            href="/images/wow-2026-sponsorship-deck.pdf"
                                            download
                                            className="inline-flex items-center justify-center gap-2 bg-white/90 text-grey-900 font-semibold px-8 py-3 rounded-full text-sm hover:bg-white transition-colors"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                            </svg>
                                            Download Deck
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </>
    );
}
