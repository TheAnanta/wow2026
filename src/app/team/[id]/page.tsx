'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { TeamMember, getTeam } from '@/services/teamStubs';
import { getSpeakers } from '@/services/speakerStubs';
import { Session, fetchSessions } from '@/services/stubs';
import Link from 'next/link';

const GRADIENTS = [
    'linear-gradient(90deg, #4285F4 -36.98%, #4285F4 22.31%, #34A853 78.95%, #34A853 132.93%)',
    'linear-gradient(270deg, #FFCB32 6.94%, #FFCB32 27.99%, #34A853 73.59%, #34A853 94.64%)',
    'linear-gradient(90deg, #EA4335 -36.98%, #EA4335 22.31%, #4285F4 78.95%, #4285F4 132.93%)',
    'linear-gradient(270deg, #34A853 6.94%, #34A853 27.99%, #FFCB32 73.59%, #FFCB32 94.64%)',
];

export default function TeamMemberDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [member, setMember] = useState<TeamMember | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const id = params.id as string;
                const allTeam = await getTeam();
                const foundMember = allTeam.find(m => m.id === id);

                if (foundMember) {
                    setMember(foundMember);

                    // Check if this team member is also a speaker to show sessions
                    const allSpeakers = await getSpeakers();
                    const correspondingSpeaker = allSpeakers.find(s => s.name === foundMember.name);

                    if (correspondingSpeaker) {
                        const allSessions = await fetchSessions({});
                        const speakerSessions = allSessions.filter(s => s.speakerIds?.includes(correspondingSpeaker.id));
                        setSessions(speakerSessions);
                    }
                }
            } catch (error) {
                console.error('Error fetching team member details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-google-blue"></div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-medium mb-4">Team member not found</h1>
                <Link href="/team" className="cta-primary">Back to team</Link>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-screen">
            <Header onRegisterClick={() => router.push('/register')} />

            <main id="content" className="dark:bg-grey-900! flex-1">
                {/* Team Member Hero Section */}
                <div className="w-full flex flex-col md:flex-row text-md:h-[407px] bg-grey-bg dark:bg-grey! border-b md:border-b-2 border-grey dark:border-grey-bg">
                    <div className="flex flex-col md:text-left md:justify-center px-4 py-5 w-full md:w-3/5 md:p-10 md:pr-0 dark:text-white z-10">
                        <div className="flex flex-col flex-1 justify-center">
                            <h1 className="font-medium mb-4 sm:s-h2 md:l-h1 text-md:-mr-40">{member.name}</h1>
                            <span className="sm:s-h6 md:l-h6">
                                {member.pronouns} | {member.role}
                            </span>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="bg-grey-bg dark:bg-white text-grey border-2 border-grey dark:border-grey-bg rounded py-1 px-4 text-sm font-medium uppercase tracking-wider">
                                    {member.category}
                                </span>
                                <span className="bg-grey-bg dark:bg-white text-grey border-2 border-grey dark:border-grey-bg rounded py-1 px-4 text-sm font-medium uppercase tracking-wider">
                                    {member.responsibility}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row mt-6 md:mt-8">
                            <svg className="dark:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#202124"></path>
                            </svg>
                            <svg className="hidden dark:inline-block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#fff"></path>
                            </svg>
                            <Link className="ml-2 font-medium hover-link" href="/team">See all members</Link>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end items-center w-full md:w-2/5 px-4 py-5 md:p-10">
                        <img
                            className="rounded-full w-48 max-w-md md:w-72 md:h-72 border-2 border-black object-cover"
                            src={member.avatar || '/images/speakers/placeholder.webp'}
                            role="img"
                            aria-hidden="true"
                            loading="lazy"
                            alt={member.name}
                        />
                    </div>
                </div>

                <div className="page-wrapper px-4 md:px-10">
                    <section className="mt-8 dark:text-grey-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-medium mb-1">About {member.name.split(' ')[0]}</h2>
                                <p className="text-grey-600 dark:text-grey-400">{member.university}</p>
                            </div>
                            {sessions.length > 0 && (
                                <Link
                                    className="font-medium text-grey underline underline-offset-2 text-[14px] text-md:text-[20px] dark:text-white"
                                    href="/explore"
                                >
                                    See all sessions
                                </Link>
                            )}
                        </div>
                    </section>

                    {/* Sessions Grid (only if applicable) */}
                    {sessions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-14">
                            {sessions.map((session, index) => (
                                <div key={session.id} className="group hover:border-[1.5px] border-grey dark:border-grey-bg rounded-xl flex flex-1">
                                    <Link className="flex flex-col relative h-auto w-full" href={`/explore/${session.id}`}>
                                        <div className="relative bg-white dark:bg-grey-900! w-full h-full rounded-xl group-hover:rounded-[10px] border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden flex-1">
                                            <div className="flex flex-col gap-y-1 text-md:gap-y-4 h-full p-8 md:p-10 z-2">
                                                <div className="flex flex-row gap-2 text-2xl lg:text-5xl">
                                                    {session.title}
                                                </div>
                                                <span className="text-grey dark:text-white font-medium text-[14px] text-md:text-[18.567px] line-clamp-3">
                                                    {session.description}
                                                </span>
                                                <div className="grow"></div>
                                                <div className="card__keywords flex flex-wrap gap-3 justify-start mt-6">
                                                    <p className="sr-only">Session tags</p>
                                                    {session.tags.map(tag => (
                                                        <span key={tag} className="bg-grey-bg dark:bg-white text-grey border-2 border-grey dark:border-grey-bg rounded py-1.5 px-4 text-sm">
                                                            <div>
                                                                <span>{tag}</span>
                                                            </div>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="relative mt-[-22px] md:mt-[-24px] rounded-xl group-hover:rounded-[10px] border md:border-2 border-solid border-grey dark:border-grey-bg bg-cover h-[44px] md:h-[48px] z-1"
                                            style={{ backgroundImage: GRADIENTS[index % GRADIENTS.length] }}
                                        ></div>
                                        <div
                                            className="mt-[-22px] md:mt-[-24px] rounded-xl border md:border-2 border-solid border-grey dark:border-grey-bg bg-cover h-[44px] md:h-[48px]"
                                            style={{ backgroundImage: GRADIENTS[index % GRADIENTS.length] }}
                                        ></div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mb-14 p-10 bg-grey-bg dark:bg-grey! rounded-2xl border-2 border-dashed border-grey-400 dark:border-grey-700 text-center">
                            <p className="text-xl text-grey-600 dark:text-grey-400">
                                This team member is busy organizing the best event ever! Stay tuned for more updates.
                            </p>
                        </div>
                    )}

                    {/* Bottom Promos matching the HTML structure */}
                    <div className="flex flex-col">
                        <div className="flex flex-col align-center items-stretch justify-center mt-1 md:mt-10 gap-y-4 md:gap-x-8 md:flex-row ml:min-h-[400px]">
                            <div className="flex w-full md:w-1/2">
                                <div className="flex-1 flex flex-col overflow-hidden bg-grey-bg dark:bg-grey! border md:border-2 border-grey rounded-[16px] dark:border-white text-md:flex-row">
                                    <div className="promo-card__body flex-1 flex flex-col items-start p-6 ml:p-10 ml:pr-0">
                                        <div className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4">
                                            Join us at WOW
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between items-start">
                                            <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta2 md:l-cta1">
                                                Explore, network, and get hands-on with the latest products.
                                            </p>
                                            <a href="/explore" rel="noreferrer" target="_blank" className="cta-secondary">Find an session</a>
                                        </div>
                                    </div>
                                    <div className="promo-card__img flex justify-end w-full ml:w-1/2 items-end pt-0 ml:pt-[44.18px] mr-[-2px] mb-[-2px]">
                                        <img src="/images/io__-connect.svg" width="246" height="299" className="hidden md:block dark:hidden" role="img" aria-hidden="true" />
                                        <img src="/images/io__-connect-dark.svg" width="246" height="299" className="hidden md:dark:block max-h-[298px]" role="img" aria-hidden="true" />
                                        <img src="/images/io__-connect-mobile.svg" width="145" height="187" className="md:hidden dark:hidden" role="img" aria-hidden="true" />
                                        <img src="/images/io__-connect-dark-mobile.svg" width="145" height="187" className="hidden dark:block md:dark:hidden" role="img" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full md:w-1/2">
                                <div className="flex-1 flex flex-col overflow-hidden border md:border-2 border-grey rounded-[16px] dark:border-white text-md:flex-row bg-grey-bg dark:bg-grey!">
                                    <div className="promo-card__body flex-1 flex flex-col items-start p-6 ml:p-10 ml:pr-0">
                                        <div className="text-grey dark:text-white mb-3 text-md:mb-4 sm:s-h4 md:l-h4">
                                            Attend GDGoC
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between items-start">
                                            <p className="text-grey dark:text-white mb-3 text-md:mb-6 sm:s-cta2 md:l-cta1">
                                                Join a community-led event to learn and connect with developers in your area.
                                            </p>
                                            <a href="https://gdg.community.dev/ioextended/" rel="noreferrer" target="_blank" className="cta-secondary">Search in your area</a>
                                        </div>
                                    </div>
                                    <div className="promo-card__img flex justify-end pr-4 ml:pr-8 w-full ml:w-1/2 items-end">
                                        <img src="/images/io__-extended.svg" width="204" height="298" className="hidden md:block max-h-[298px] mb-[-2px]" role="img" aria-hidden="true" />
                                        <img src="/images/io__-extended-mobile.svg" width="145" height="223" className="md:hidden" role="img" aria-hidden="true" />
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
