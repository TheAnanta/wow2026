'use client';

import React, { use, useEffect, useState } from 'react';
import { fetchSessions, Session } from "@/services/stubs";
import { analyticsService } from "@/services/analytics";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import Image from 'next/image';
import { Speaker, getSpeakers } from '../../../services/speakerStubs';

export default function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [session, setSession] = useState<Session | null>(null);
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);

    const handleSaveToMyIO = (id: string) => {
        analyticsService.trackCTA('Save to My I/O', 'SessionDetail', 'bookmark');
        console.log('Saving session to My I/O:', id);
    };

    useEffect(() => {
        async function getData() {
            const sessions = await fetchSessions({});
            const found = sessions.find((s) => s.id === resolvedParams.id);
            setSession(found || null);

            if (found && found.speakerIds && found.speakerIds.length > 0) {
                const allSpeakers = await getSpeakers();
                const matchedSpeakers = allSpeakers.filter(s => found.speakerIds?.includes(s.id));
                setSpeakers(matchedSpeakers);
            } else {
                setSpeakers([]);
            }

            setLoading(false);
        }
        getData();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-white dark:bg-grey-900! flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grey-900 dark:border-white"></div>
            </div>
        );
    }

    if (!session) {
        notFound();
    }

    return (
        <div className="w-full min-h-screen bg-white dark:bg-grey-900! overflow-x-hidden text-grey-900 dark:text-white">
            <Header onRegisterClick={() => { }} />

            <main id="content" className="dark:bg-grey-900! flex-1">

                {/* Hero Section Container (Matched to Keynote Header Style) */}
                <div className="xl:max-w-[1640px] xl:mx-auto xl:px-10 xl:pt-10">
                    <div className="relative flex flex-col border-b-[1.2px] xl:border-2 xl:rounded-2xl overflow-hidden bg-grey-bg dark:bg-grey! border-grey-900 dark:border-white xl:min-h-[407px] md:flex-row">

                        <div className="flex flex-col p-6 ml:p-10 md:w-1/2">
                            <h1 className="font-medium text-grey dark:text-white sm:s-h3 md:l-h3">
                                {session.title}
                            </h1>
                            <div className="mt-2 md:mt-4 text-grey dark:text-white sm:s-h6 md:l-h6 h-[66px]">
                                {session.time || "Video available after live event"}
                            </div>
                        </div>

                        <div className="flex justify-center md:w-1/2 md:justify-end">
                            {/* Image mapping - uses keynote style images as requested */}
                            <img
                                className="object-cover object-left block md:hidden dark:hidden w-full h-auto"
                                src="https://io.google/2024/app/images/sessiondetail-keynote-mobile.svg"
                                alt=""
                                aria-hidden="true"
                            />
                            <img
                                className="object-cover object-left hidden dark:block dark:md:hidden w-full h-auto"
                                src="https://io.google/2024/app/images/sessiondetail-keynote-mobile-dark.svg"
                                alt=""
                                aria-hidden="true"
                            />
                            <img
                                className="object-cover object-left hidden md:block dark:hidden"
                                src="https://io.google/2024/app/images/sessiondetail-keynote.svg"
                                alt=""
                                aria-hidden="true"
                            />
                            <img
                                className="object-cover object-left hidden dark:md:block"
                                src="https://io.google/2024/app/images/sessiondetail-keynote-dark.svg"
                                alt=""
                                aria-hidden="true"
                            />
                        </div>

                        <div className="absolute bottom-4 left-6 ml:left-10 ml:bottom-10">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-md:hidden mr-[24px]">
                                {session.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-white dark:bg-grey-900! dark:text-white rounded-[4px] border-grey-900 dark:border-grey-bg border-[1.5px] py-1 px-4 font-medium">
                                        <div>
                                            <span>{tag}</span>
                                        </div>
                                    </span>
                                ))}
                            </div>
                            <div className="hidden space-x-6 text-md:flex">
                                {session.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-white dark:bg-grey-900! dark:text-white rounded-[4px] border-grey-900 dark:border-grey-bg border-[1.5px] py-1 px-4 font-medium">
                                        <div>
                                            <span>{tag}</span>
                                        </div>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Session Detail Content */}
                <div id="session-detail-page" className="page-wrapper">
                    <div className="flex flex-col text-md:flex-row w-full gap-[32px]">
                        {/* Left Column: Overview */}
                        <div className="w-full text-md:w-1/3">
                            <h2 className="font-medium sm:l-h5 md:l-h4">Overview</h2>
                            <p className="font-normal sm:l-p1 md:s-p1 mt-4 text-md:mt-6 text-grey-900 dark:text-white">
                                {session.description}
                            </p>
                            <div className="flex mt-[14.5px] md:mt-[29px]">
                                <button
                                    type="button"
                                    className="flex items-center"
                                    aria-label="Bookmark this session"
                                    onClick={() => handleSaveToMyIO(session.id)}
                                >
                                    <span className="truncate text-grey-900 dark:text-white text-[16px] leading-6 md:text-[20px] md:leading-7 mr-[10px] mt-[2px]">
                                        Save to My I/O
                                    </span>
                                    <span className="flex justify-center items-center w-6 h-6">
                                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-grey-900 dark:text-white"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Speakers */}
                        {speakers.length > 0 && (
                            <div className="w-full text-md:w-2/3">
                                <h2 className="font-medium sm:l-h5 md:l-h4">Speakers</h2>
                                <div className="flex flex-wrap gap-2 md:gap-x-[68px] mt-4 md:mt-1">
                                    {speakers.map((speaker: Speaker, idx: number) => (
                                        <a
                                            href={`/speakers/${speaker.id}`}
                                            key={idx}
                                            onClick={() => analyticsService.trackNavigation(speaker.name, 'SessionDetail_Speakers')}
                                            className="speaker-item flex md:flex-col items-start md:items-center w-full md:w-52 p-4 md:p-2 rounded-2xl border-2 border-grey-600 dark:border-grey-200 md:border-transparent m-auto h-full md:min-h-[270px] xs:p-4 sm:p-5 hover:border-grey-900 focus:border-grey-900 dark:hover:border-grey-200 dark:focus:border-grey-200 mx-0 md:max-w-[168px]"
                                        >
                                            <img
                                                height="136"
                                                width="136"
                                                className="rounded-full border-[2.25px] border-grey-900 dark:border-white mb-1 max-w-[100px] md:max-w-none"
                                                src={`/images/speakers/${speaker.avatar}`}
                                                alt={speaker.name}
                                                loading="lazy"
                                            />
                                            <div className="md:mt-1 ml-[12px] md:ml-0 text-grey-900 dark:text-grey-200">
                                                <p className="sm:l-cta2 font-medium text-left md:text-center">{speaker.name}</p>
                                                <p className="sm:l-tags font-normal text-left md:text-center mt-2 md:mt-1">{speaker.title}</p>
                                                {speaker.pronouns && (
                                                    <p className="sm:l-eyeline font-bold text-left md:text-center uppercase">{speaker.pronouns}</p>
                                                )}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="flex flex-col">
                        <div className="flex flex-col align-center items-stretch justify-center mt-4 md:mt-10 gap-y-4 md:gap-x-8 md:flex-row ml:min-h-[400px]">
                            {/* Join Community Card */}
                            <div className="flex w-full md:w-2/3">
                                <div className="h-full flex flex-col lg:flex-row bg-grey-bg dark:bg-grey! border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white justify-end flex-1">
                                    <div className="flex flex-col items-start p-6 pb-0 ml:p-10 -mb-4 lg:mb-0 lg:w-1/2">
                                        <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4 lg:-mr-40">
                                            Join a community group
                                        </span>
                                        <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta1 md:l-cta1 lg:-mr-40">
                                            Meet developers, discover local groups, and build your global network.
                                        </p>
                                        <a
                                            href="/community"
                                            className="cta-secondary"
                                            aria-label="Get started with joining an I/O community group, opens Community page"
                                            onClick={() => analyticsService.trackCTA('Get started', 'SessionDetail_PromoCommunity')}
                                        >
                                            Get started
                                        </a>
                                    </div>
                                    <div className="flex justify-end lg:items-end rounded-br-[16px] lg:w-1/2">
                                        <img
                                            src="https://io.google/2024/app/images/io24-join-community-cta-mobile.svg"
                                            className="block md:hidden dark:hidden mr-[-2px]"
                                            alt=""
                                            loading="lazy"
                                            width="283"
                                            height="172"
                                        />
                                        <img
                                            src="https://io.google/2024/app/images/io24-join-community-cta-mobile-dark.svg"
                                            className="hidden dark:block dark:md:hidden mr-[-2px]"
                                            alt=""
                                            loading="lazy"
                                            width="283"
                                            height="172"
                                        />
                                        <img
                                            src="https://io.google/2024/app/images/io24-join-community-cta.svg"
                                            className="hidden md:block object-cover lg:object-contain object-left lg:object-right dark:hidden mr-[-2px]"
                                            alt=""
                                            loading="lazy"
                                            width="437"
                                            height="270"
                                        />
                                        <img
                                            src="https://io.google/2024/app/images/io24-join-community-cta-dark.svg"
                                            className="hidden dark:md:block object-cover lg:object-contain object-left lg:object-right mr-[-2px]"
                                            alt=""
                                            loading="lazy"
                                            width="437"
                                            height="270"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Plan your I/O Card */}
                            <div className="flex w-full md:w-[38%] md:max-w-[484px]">
                                <div className="h-full flex flex-col bg-grey-bg dark:bg-grey! border md:border-2 border-grey rounded-[16px] overflow-hidden dark:border-white justify-between lg:justify-center lg:items-end flex-1">
                                    <div className="flex flex-col items-start p-6 pb-0 ml:p-10 ml:pb-0">
                                        <span className="text-grey dark:text-white mb-3 text-md:mb-4 sm:l-h5 md:l-h4">
                                            Plan your I/O
                                        </span>
                                        <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-h6 md:l-h6">
                                            Visit My I/O for saved content and recommendations based on your personal interests.
                                        </p>
                                        <a
                                            href="/explore#my-io"
                                            className="cta-secondary"
                                            aria-label="Get started with planning your I/O, opens explore page"
                                            onClick={() => analyticsService.trackCTA('Get started', 'SessionDetail_PromoPlan')}
                                        >
                                            Get started
                                        </a>
                                    </div>
                                    <div className="flex justify-end lg:mt-[-63px]">
                                        <img
                                            src="https://io.google/2024/app/images/io24-planio-cta-mobile.webp"
                                            className="inline-block dark:hidden mb-4 mr-4"
                                            alt=""
                                            loading="lazy"
                                            width="219"
                                            height="168"
                                        />
                                        <img
                                            src="https://io.google/2024/app/images/io24-planio-cta-mobile-dark.webp"
                                            className="hidden dark:inline-block mr-4 w-[228px] mb-[20px] mt-[-9px]"
                                            alt=""
                                            loading="lazy"
                                            width="219"
                                            height="168"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
