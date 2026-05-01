'use client';
import { Header } from "@/components/sections/Header";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { BadgeSuccess } from "@/components/registration/BadgeSuccess";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchTicketTiers, initiateCheckout, verifyPayment } from "@/services/registrationStubs";
import { analyticsService } from "@/services/analytics";

function PaymentPage() {
    const startTimeRef = useRef(Date.now());
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const isTermsAgreed = searchParams.get('terms') == 'true' && searchParams.get('ack') == 'true';
    const [terms, setTerms] = useState(false);
    const [wowPlusAck, setWowPlusAck] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
    const router = useRouter();

    const { user, profile, tickets, isUnregistered, isLoading } = useAuth();
    const [tiers, setTiers] = useState<any[]>([]);
    const [wasBadgeShown, setWasBadgeShown] = useState(false);

    useEffect(() => {
        if (earnedBadge) setWasBadgeShown(true);
    }, [earnedBadge]);

    useEffect(() => {
        if (isLoading) return;

        // Redirect if unregistered
        if (user && isUnregistered) {
            router.push('/register');
            return;
        }

        if (!user) {
            router.push('/register');
            return;
        }

        // // Redirect if user already has a ticket, BUT NOT if they just earned one here
        if (!earnedBadge && !wasBadgeShown && profile && tickets && tickets.length > 0) {
            router.push('/?message=already_has_ticket');
        }

        const loadTiers = async () => {
            const data = await fetchTicketTiers();
            setTiers(data);
        };
        loadTiers();
    }, [profile, tickets, router, earnedBadge, isUnregistered, user, isLoading, wasBadgeShown]);

    const handlePurchase = async (tierSearch: string, badgeName?: string) => {
        setIsProcessing(true);
        try {
            // Find the tier by name (case-insensitive)
            const tier = tiers.find(t => t.name.toLowerCase().includes(tierSearch.toLowerCase()));
            if (!tier) throw new Error('Ticket tier not found');

            const duration = (Date.now() - startTimeRef.current) / 1000;
            analyticsService.trackCheckoutActivity('select_tier', tierSearch, 'initiated', duration);
            analyticsService.trackCTA(`initiate_checkout_${tierSearch}`, 'PaymentPage');
            const checkoutData = await initiateCheckout(tier.id);

            const options = {
                key: checkoutData.key_id,
                amount: checkoutData.amount,
                currency: checkoutData.currency,
                name: "GDG WOW 2026",
                description: `Purchase for ${tier.name}`,
                order_id: checkoutData.gateway_order_id,
                handler: async (response: any) => {
                    setIsProcessing(true);
                    try {
                        const verificationResult = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        const verifyDuration = (Date.now() - startTimeRef.current) / 1000;
                        analyticsService.trackCheckoutActivity('payment_verify', tierSearch, 'completed', verifyDuration);
                        analyticsService.trackForm('payment_verify', tierSearch, 'complete', { tier: tierSearch });
                        setEarnedBadge(badgeName || tier.name);
                        // Trigger context refresh
                        window.dispatchEvent(new CustomEvent('registrationSuccess'));
                    } catch (err: any) {
                        console.error('Verification failed:', err);
                        const verifyDuration = (Date.now() - startTimeRef.current) / 1000;
                        analyticsService.trackCheckoutActivity('payment_verify', tierSearch, 'failed', verifyDuration, { error: err.message });
                        analyticsService.trackForm('payment_verify', 'error_msg', 'error', { error: err.message });
                        alert(err.message || 'Payment verification failed. Please contact support.');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: profile?.displayName || user?.displayName || "",
                    email: user?.email || "",
                    contact: profile?.phone || "",
                },
                theme: {
                    color: "#4285F4",
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                        const abandonDuration = (Date.now() - startTimeRef.current) / 1000;
                        analyticsService.trackCheckoutActivity('razorpay_modal', tierSearch, 'abandoned', abandonDuration);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            console.error('Checkout initialization failed:', err);
            alert(err.message || 'Failed to initialize checkout. Please try again.');
            setIsProcessing(false);
        }
    };

    const wowPlusRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isBenefitsVisible, setIsBenefitsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 768) {
                if (sentinelRef.current) {
                    const rect = sentinelRef.current.getBoundingClientRect();
                    // Expand/Collapse based on sentinel position
                    // We also ensure it's expanded at the very top
                    if (window.scrollY < 50) {
                        setIsBenefitsVisible(true);
                    } else {
                        setIsBenefitsVisible(rect.top > 200);
                    }
                }
            } else {
                setIsBenefitsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (earnedBadge) {
        return (
            <div className="w-full min-h-screen bg-[#f8f9fa] dark:bg-grey-900! text-grey-900 dark:text-white flex flex-col transition-colors duration-300">
                <Header onRegisterClick={() => { }} />
                <main className="flex-1 flex flex-col items-center py-0 md:py-16 px-0 md:px-6">
                    <div className="w-full md:max-w-[800px] bg-white dark:bg-grey-900! md:rounded-2xl border-b md:border border-grey-200 dark:border-grey-700 md:shadow-sm overflow-hidden animate-slide-up">
                        <BadgeSuccess
                            badgeName={earnedBadge}
                            onClose={() => {
                                setEarnedBadge(null);
                                router.push('/explore');
                            }}
                        />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white dark:bg-grey-900! text-grey-900 dark:text-white">
            <Header onRegisterClick={() => { }} />
            <div className="flex flex-col md:flex-row page-wrapper">
                <div ref={wowPlusRef} className={`flex-3 p-3 md:mr-4 h-max rounded-[8px] z-20 bg-white/95 dark:bg-grey-900! backdrop-blur-md self-start group transition-all duration-300 border-b md:border-b-0 border-grey-bg ${isBenefitsVisible ? 'relative md:sticky md:top-0' : 'sticky top-0 w-screen -translate-x-5! p-8'}`}>
                    {/* Official Material 3 Shape Badge */}
                    {tiers.find(t => t.name.toLowerCase().includes('arcade') || t.name.toLowerCase().includes('wow')) && (
                        <div className={`absolute -top-4 md:top-0 -right-4 md:right-2 w-32 h-32 rotate-12 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-rotate-in ${isBenefitsVisible ? 'opacity-100' : 'opacity-0 scale-[60%] pointer-events-none'}`}>
                            <svg className="w-full h-full drop-shadow-xl dark:hidden" viewBox="0 0 90 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.3094 2.09276C42.8648 1.79247 43.1425 1.64232 43.3934 1.51871C49.305 -1.39355 56.4392 -0.0297511 60.8598 4.85766C61.0474 5.0651 61.2501 5.30709 61.6556 5.79105C61.8365 6.00709 61.927 6.1151 62.0172 6.21869C64.0832 8.59361 66.8571 10.2459 69.9318 10.9331C70.0659 10.9631 70.2041 10.9913 70.4805 11.0477C71.0996 11.174 71.4092 11.2372 71.6811 11.3035C78.0888 12.866 82.6793 18.4862 82.9199 25.063C82.9301 25.3422 82.9296 25.6574 82.9286 26.288C82.9282 26.5694 82.928 26.7102 82.9304 26.8473C82.9844 29.9905 84.0464 33.0346 85.9608 35.5329C86.0443 35.6418 86.1321 35.7521 86.3076 35.9725C86.7009 36.4664 86.8975 36.7133 87.0632 36.9385C90.9687 42.2447 90.8676 49.4914 86.8155 54.6804C86.6435 54.9006 86.4401 55.1416 86.0332 55.6237C85.8516 55.8389 85.7607 55.9465 85.6742 56.053C83.6909 58.4938 82.5443 61.5053 82.4025 64.6456C82.3963 64.7826 82.3926 64.9233 82.3852 65.2047C82.3685 65.835 82.3602 66.1501 82.3422 66.4288C81.9181 72.9959 77.1726 78.4784 70.7239 79.8514C70.4502 79.9097 70.139 79.9637 69.5166 80.0717C69.2387 80.12 69.0998 80.1441 68.9649 80.1701C65.8723 80.7664 63.0534 82.3362 60.9219 84.6493C60.829 84.7502 60.7355 84.8555 60.5486 85.0661C60.1298 85.5379 59.9204 85.7738 59.7271 85.9756C55.1718 90.7307 48.0024 91.8837 42.1746 88.7984C41.9272 88.6674 41.6538 88.5091 41.1071 88.1926C40.8631 88.0513 40.741 87.9806 40.6209 87.914C37.866 86.3868 34.6939 85.7804 31.57 86.1838C31.4337 86.2014 31.2943 86.2221 31.0153 86.2634C30.3904 86.356 30.0779 86.4022 29.7997 86.4327C23.2447 87.1509 17.0061 83.4348 14.526 77.3348C14.4207 77.0759 14.3131 76.7794 14.0979 76.1864C14.0018 75.9217 13.9538 75.7893 13.9046 75.6613C12.7765 72.7251 10.7355 70.2262 8.08085 68.5313C7.96506 68.4573 7.84483 68.3837 7.60436 68.2364C7.06568 67.9064 6.79634 67.7414 6.56343 67.5863C1.07589 63.9315 -1.31281 57.0852 0.71526 50.8247C0.801338 50.559 0.909837 50.263 1.12684 49.671C1.22371 49.4067 1.27214 49.2746 1.31692 49.145C2.34348 46.1738 2.38847 42.9517 1.4453 39.9514C1.40416 39.8206 1.35943 39.6871 1.26998 39.42C1.0696 38.8219 0.96941 38.5228 0.890786 38.2547C-0.961631 31.937 1.61725 25.164 7.20457 21.6724C7.44172 21.5242 7.71556 21.3672 8.26324 21.0532C8.50772 20.9131 8.62996 20.843 8.74777 20.7725C11.4486 19.1565 13.5586 16.7188 14.7682 13.8171C14.821 13.6905 14.8727 13.5597 14.9761 13.2979C15.2078 12.7115 15.3236 12.4183 15.4361 12.1626C18.0855 6.13816 24.4253 2.60752 30.9575 3.51861C31.2348 3.55728 31.5458 3.61275 32.1679 3.72369C32.4456 3.77322 32.5845 3.79798 32.7202 3.81959C35.8315 4.31492 39.0193 3.80228 41.8156 2.35689C41.9376 2.29384 42.0615 2.22682 42.3094 2.09276Z" fill="#202124" />
                            </svg>
                            <svg className="w-full h-full drop-shadow-xl hidden dark:flex opacity-20" viewBox="0 0 90 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.3094 2.09276C42.8648 1.79247 43.1425 1.64232 43.3934 1.51871C49.305 -1.39355 56.4392 -0.0297511 60.8598 4.85766C61.0474 5.0651 61.2501 5.30709 61.6556 5.79105C61.8365 6.00709 61.927 6.1151 62.0172 6.21869C64.0832 8.59361 66.8571 10.2459 69.9318 10.9331C70.0659 10.9631 70.2041 10.9913 70.4805 11.0477C71.0996 11.174 71.4092 11.2372 71.6811 11.3035C78.0888 12.866 82.6793 18.4862 82.9199 25.063C82.9301 25.3422 82.9296 25.6574 82.9286 26.288C82.9282 26.5694 82.928 26.7102 82.9304 26.8473C82.9844 29.9905 84.0464 33.0346 85.9608 35.5329C86.0443 35.6418 86.1321 35.7521 86.3076 35.9725C86.7009 36.4664 86.8975 36.7133 87.0632 36.9385C90.9687 42.2447 90.8676 49.4914 86.8155 54.6804C86.6435 54.9006 86.4401 55.1416 86.0332 55.6237C85.8516 55.8389 85.7607 55.9465 85.6742 56.053C83.6909 58.4938 82.5443 61.5053 82.4025 64.6456C82.3963 64.7826 82.3926 64.9233 82.3852 65.2047C82.3685 65.835 82.3602 66.1501 82.3422 66.4288C81.9181 72.9959 77.1726 78.4784 70.7239 79.8514C70.4502 79.9097 70.139 79.9637 69.5166 80.0717C69.2387 80.12 69.0998 80.1441 68.9649 80.1701C65.8723 80.7664 63.0534 82.3362 60.9219 84.6493C60.829 84.7502 60.7355 84.8555 60.5486 85.0661C60.1298 85.5379 59.9204 85.7738 59.7271 85.9756C55.1718 90.7307 48.0024 91.8837 42.1746 88.7984C41.9272 88.6674 41.6538 88.5091 41.1071 88.1926C40.8631 88.0513 40.741 87.9806 40.6209 87.914C37.866 86.3868 34.6939 85.7804 31.57 86.1838C31.4337 86.2014 31.2943 86.2221 31.0153 86.2634C30.3904 86.356 30.0779 86.4022 29.7997 86.4327C23.2447 87.1509 17.0061 83.4348 14.526 77.3348C14.4207 77.0759 14.3131 76.7794 14.0979 76.1864C14.0018 75.9217 13.9538 75.7893 13.9046 75.6613C12.7765 72.7251 10.7355 70.2262 8.08085 68.5313C7.96506 68.4573 7.84483 68.3837 7.60436 68.2364C7.06568 67.9064 6.79634 67.7414 6.56343 67.5863C1.07589 63.9315 -1.31281 57.0852 0.71526 50.8247C0.801338 50.559 0.909837 50.263 1.12684 49.671C1.22371 49.4067 1.27214 49.2746 1.31692 49.145C2.34348 46.1738 2.38847 42.9517 1.4453 39.9514C1.40416 39.8206 1.35943 39.6871 1.26998 39.42C1.0696 38.8219 0.96941 38.5228 0.890786 38.2547C-0.961631 31.937 1.61725 25.164 7.20457 21.6724C7.44172 21.5242 7.71556 21.3672 8.26324 21.0532C8.50772 20.9131 8.62996 20.843 8.74777 20.7725C11.4486 19.1565 13.5586 16.7188 14.7682 13.8171C14.821 13.6905 14.8727 13.5597 14.9761 13.2979C15.2078 12.7115 15.3236 12.4183 15.4361 12.1626C18.0855 6.13816 24.4253 2.60752 30.9575 3.51861C31.2348 3.55728 31.5458 3.61275 32.1679 3.72369C32.4456 3.77322 32.5845 3.79798 32.7202 3.81959C35.8315 4.31492 39.0193 3.80228 41.8156 2.35689C41.9376 2.29384 42.0615 2.22682 42.3094 2.09276Z" fill="#FFFFFF" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-white text-[2.2rem] font-bold leading-none tracking-tighter">
                                    {tiers.find(t => t.name.toLowerCase().includes('arcade') || t.name.toLowerCase().includes('wow'))?.tickets_left || 0}
                                </span>
                                <span className="text-white/80 text-[0.8rem] font-bold uppercase tracking-widest mt-0.5">
                                    Left
                                </span>
                            </div>
                        </div>
                    )}

                    <h1 className={`font-medium tracking-tight transition-all duration-300 ${isBenefitsVisible ? 'text-6xl mb-0 mt-8 md:mt-[unset]' : 'text-4xl mb-0 mt-8'}`}>The WOW+ Experience</h1>
                    <h3 className={`tracking-tighter transition-all duration-300 overflow-hidden ${isBenefitsVisible ? 'text-4xl mb-4 max-h-[100px] opacity-100' : 'text-xl mb-0 max-h-0 opacity-0'}`}>The Community&apos;s Pass</h3>

                    <p className={`max-w-[54ch] mt-2 overflow-hidden transition-all duration-500 ${isBenefitsVisible ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[300px] md:opacity-100'}`}>
                        Get access to the official community arcade where you will network, learn, connect and grow together by playing games, joining virtual sessions, attending meetups, and so much more.<br /><br />This will help you compete on different technical challenges, make new friends, upskill yourself in different technical stacks and prepare you up for the Google for Developers WOW 2026.
                    </p>
                    <div className={`overflow-hidden transition-all duration-500 ${isBenefitsVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'}`}>
                        <h4 className="text-xl font-medium tracking-tight my-4">What will you get?</h4>
                        <div className="flex flex-wrap gap-2 gap-y-3 md:mb-0 mb-8">
                            {
                                ["Upto 100% discount on WOW ticket*", "Swags", "Networking", "Exclusive tech channels", "Access to Now in Google app", "Pre-WOW technical workshops", "Access to the recorded content of WOW", "Fresh games every other day"].map((benefit) => {
                                    return <p key={benefit} className={`py-2 px-5 border-2 rounded-full tracking-[-0.015em] font-medium ${benefit == 'Fresh games every other day' || benefit == 'Upto 100% discount on WOW ticket*' ? 'text-white! border-grey-900' : ''}`} style={benefit == 'Fresh games every other day' || benefit == 'Upto 100% discount on WOW ticket*' ? {
                                        background: 'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)'
                                    } : {}}>{benefit}</p>
                                })
                            }
                        </div>
                    </div>
                    <div className={`flex items-end w-full transition-all duration-300 ${isBenefitsVisible ? 'pb-8 md:pb-[unset] mt-4 opacity-100' : 'pb-2 mt-2 gap-x-4'}`}>
                        <div className="flex flex-col md:block">
                            <p className={`leading-[1.2] line-through tracking-tighter opacity-30 transition-all text-2xl`}>₹800</p>
                            <p className={`font-bold tracking-tighter transition-all text-3xl`}>₹350 <span className={`font-medium opacity-60 ${isBenefitsVisible ? 'text-xl' : 'text-xs'}`}>(excl. of taxes)</span></p>
                        </div>
                        <div className={`flex ml-auto items-center transition-all ${isBenefitsVisible ? 'flex-col md:flex-row items-end' : 'flex-col gap-2'}`}>
                            {isBenefitsVisible && <a href="/wow-plus" className={`mt-auto cta-secondary flex items-center rounded-full font-medium transition-all ${isBenefitsVisible ? 'md:mr-4 h-12 md:h-14 text-[14px]! md:text-[20px]!' : 'h-10 px-4 flex items-center justify-center text-[12px]! mx-0!'}`}>Know more</a>}
                            <button
                                onClick={() => router.push('/payment?type=wow-plus')}
                                disabled={isProcessing}
                                className={`nav-cta-btn bg-grey-900! dark:bg-white! dark:text-grey-900! rounded-full text-white font-medium flex items-center justify-center transition-all ${isBenefitsVisible ? 'mt-2 md:mt-16! px-[20px] py-[12px]! h-12 md:h-14 text-[14px] md:text-[20px]! min-w-[140px]' : 'h-10 px-6 text-[12px]! min-w-[100px] mt-0!'}`}
                            >
                                {isProcessing ? '...' : 'Buy now'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sentinel to detect when arcade has been scrolled past on mobile */}
                <div ref={sentinelRef} className="h-[50px] w-full md:hidden" />

                <div className="pt-4 md:pt-[unset] shrink-0 flex-2 flex flex-col gap-4 md:pl-12 md:border-l-2 md:border-grey-bg">
                    <div className="relative h-[260px] md:h-[240px] mb-9">
                        {/* Front card */}
                        <div className="absolute bg-white dark:bg-grey! w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                            <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                                <div className="flex flex-row justify-center gap-2 w-full px-6">
                                    <div>
                                        <p className="uppercase font-black tracking-tight text-xs mb-2 border-2 w-max p-1 px-3 -translate-x-2 mb-4 rounded-full border-grey-bg">
                                            Limited only
                                            {tiers.find(t => t.name.toLowerCase().includes('early'))?.tickets_left < 60 && " - Running out"}
                                        </p>
                                        <h3 className="font-bold text-3xl tracking-tight">Early bird pass</h3>
                                        <p className="text-sm max-w-[20ch] line-clamp-4 md:max-w-[28ch] mt-2">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                                    </div>
                                    <div className="flex flex-col items-end text-end ml-auto">
                                        <p className="text-xl line-through tracking-tight opacity-30">₹1500</p>
                                        <p className="text-3xl font-bold tracking-tight">₹1200</p>
                                        <button
                                            onClick={() => handlePurchase('Early Bird', 'WOW 2026 - Attendee')}
                                            disabled={isProcessing}
                                            className={`mt-auto nav-cta-btn bg-grey-900! dark:bg-white! dark:text-grey-900! px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px] flex items-center justify-center min-w-[120px] ${isProcessing ? 'opacity-70' : ''}`}
                                        >
                                            {isProcessing ? '...' : 'Buy now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Shadow cards */}
                        <div
                            style={{ backgroundImage: 'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)' }}
                            className="absolute w-full h-full top-[23px] md:top-[36px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                        />
                        <div
                            style={{ backgroundImage: 'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)' }}
                            className="absolute w-full h-full top-[11px] md:top-[19px] rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg bg-cover"
                        />
                    </div>

                    <div className="border-2 border-grey-bg p-6 flex rounded-[12px] aspect-[2]">
                        <div>
                            <h3 className="font-bold text-3xl mt-2 tracking-tight">Regular pass</h3>
                            <p className="text-sm max-w-[20ch] md:max-w-[32ch] mt-2 line-clamp-4">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                        </div>
                        <div className="flex flex-col items-end text-end ml-auto">
                            <p className="text-xl line-through opacity-30">₹2500</p>
                            <p className="text-3xl font-bold">₹2000</p>
                            <button
                                onClick={() => handlePurchase('Regular', 'WOW 2026 - Attendee')}
                                disabled={isProcessing}
                                className={`mt-auto nav-cta-btn bg-grey-900!  dark:bg-white! dark:text-grey-900! px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px] flex items-center justify-center min-w-[120px] ${isProcessing ? 'opacity-70' : ''}`}
                            >
                                {isProcessing ? '...' : 'Buy now'}
                            </button>
                        </div>
                    </div>
                    <div className="border-2 border-grey-bg p-6 flex rounded-[12px] aspect-[2]" aria-disabled={true}>
                        <div>
                            <h3 className="font-bold text-3xl mt-2 tracking-tight">Late bird pass</h3>
                            <p className="text-sm max-w-[20ch] line-clamp-4 md:max-w-[32ch] mt-2">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                        </div>
                        <div className="flex flex-col items-end text-end ml-auto">
                            <p className="text-xl line-through opacity-30 tracking-tight">₹5000</p>
                            <p className="text-3xl font-bold tracking-tight">₹3500</p>
                            <a className="mt-auto cursor-not-allowed! bg-grey-text/30! text-grey-900/60! dark:text-grey-text! nav-cta-btn px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px]">Buy now</a>
                        </div>
                    </div>
                    <div className="border-2 border-grey-bg p-6 flex rounded-[12px] aspect-[2]" aria-disabled={true}>
                        <div>
                            <p className="uppercase font-black tracking-tight text-xs mb-2 border-2 w-max p-1 px-3 -translate-x-2 mb-4 rounded-full border-grey-bg">Accomodation Included</p>
                            <h3 className="font-bold text-3xl mt-2 tracking-tight">All in One pass</h3>
                            <p className="text-sm max-w-[20ch] line-clamp-4 md:max-w-[32ch] mt-2">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                        </div>
                        <div className="flex flex-col items-end text-end ml-auto">
                            <p className="text-xl line-through opacity-30 tracking-tight">₹7500</p>
                            <p className="text-3xl font-bold tracking-tight">₹4500</p>
                            <a className="mt-auto cursor-not-allowed! bg-grey-text/30! text-grey-900/60! dark:text-grey-text! nav-cta-btn px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px]">Buy now</a>
                        </div>
                    </div>
                </div>
            </div>
            {
                (type == 'arcade' || type == 'wow-plus') && !isTermsAgreed && <div className="z-50 bg-black/40 absolute top-0 h-full w-full flex flex-col items-center justify-center"><div className="flex flex-col items-center text-center h-max bg-white dark:bg-grey-900 rounded-[12px] overflow-hidden">
                    <div className="h-[240px] bg-grey-bg dark:bg-grey-900 w-full border-b-2 border-grey-900 justify-center flex items-center flex-col">
                        <img src={"/images/IO24_BlogHeaders_2x1-12.2e16d0ba.fill-800x400.png"} className="w-full h-full object-cover" />
                        <h2 className="text-2xl font-bold mb-4 whitespace-pre-line absolute m-auto mt-8 py-3 rounded-3xl px-12 bg-grey-bg dark:bg-grey-900 text-grey-900">Terms & Conditions</h2>
                    </div>
                    <div className="max-w-[484px] p-8">
                        {
                            [
                                { label: 'I agree to <a target="_blank" rel="noopener noreferrer" href="/terms">WOW+ Terms and Conditions</a> including <a target="_blank" rel="noopener noreferrer" href="/code-of-conduct">Google Community Guidelines</a> and acknowledge that my info will be used in accordance with <a target="_blank" rel="noopener noreferrer" href="/privacy">Privacy Policy</a>', id: 'io2024', value: terms, onChange: (e: any) => setTerms(e.target.checked) },
                                { label: 'I acknowledge that puchasing a WOW+ pass does not guarantee entry to the event.', id: 'io2025', value: wowPlusAck, onChange: (e: any) => setWowPlusAck(e.target.checked) }
                            ].map((item) => (
                                <div key={item.id} role="listitem">
                                    <div className="filter-box__item">
                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            name={item.id}
                                            className="checkbox"
                                            checked={item.value}
                                            onChange={(e) => { item.onChange(e) }}
                                            data-analytics-defer="false"
                                            data-label={item.label}
                                            data-id={item.id}
                                            aria-label={item.label}
                                        />
                                        <label
                                            className="filter-box__option-text text-left faq-entry"
                                            htmlFor={item.id}
                                            aria-hidden="true"
                                        >
                                            <div className="">
                                                <span dangerouslySetInnerHTML={{ __html: item.label }} />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            ))}

                        <button
                            type="button"
                            disabled={!terms || !wowPlusAck || isProcessing}
                            onClick={() => {
                                if (terms && wowPlusAck) {
                                    analyticsService.trackForm('wow_plus_terms', 'terms_and_conditions', 'complete');
                                    handlePurchase('Arcade', 'WOW+ Insider - Explorer');
                                }
                            }}
                            className={`py-3 px-10 bg-[#000000] dark:bg-white! text-white dark:text-grey-900! border-none rounded-full font-bold cursor-pointer transition-opacity duration-200 w-fit ${terms && wowPlusAck && !isProcessing ? ' hover:opacity-80' : 'opacity-50 cursor-not-allowed!'}`}
                        >
                            {isProcessing ? 'Processing...' : 'Buy Now'}
                        </button>
                    </div>
                </div></div>
            }

            {isProcessing && (
                <div className="fixed inset-0 z-100 bg-white/80 dark:bg-grey-900/80! backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                    <div className="flex flex-col items-center text-center p-8">
                        <div className="w-16 h-16 border-4 border-google-blue border-t-transparent rounded-full animate-spin mb-6"></div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Verifying Payment</h2>
                        <p className="text-grey-600 dark:text-grey-400 max-w-[320px]">
                            Hang tight! We're confirming your transaction with the bank. Please don't refresh the page.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function SuspensefulPaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPage />
        </Suspense>
    )
}