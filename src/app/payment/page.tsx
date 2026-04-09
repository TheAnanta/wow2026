'use client';
import { Header } from "@/components/sections/Header";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { BadgeSuccess } from "@/components/registration/BadgeSuccess";
import { useRouter } from "next/navigation";

function PaymentPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const isTermsAgreed = searchParams.get('terms') == 'true' && searchParams.get('ack') == 'true';
    const [terms, setTerms] = useState(false);
    const [arcadeAck, setArcadeAck] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
    const router = useRouter();

    const handlePurchase = (badgeType: string) => {
        setIsProcessing(true);
        // Simulate payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setEarnedBadge(badgeType);
        }, 1500);
    };

    if (earnedBadge) {
        return (
            <div className="w-full min-h-screen bg-[#f8f9fa] dark:bg-grey-900 text-grey-900 dark:text-white flex flex-col transition-colors duration-300">
                <Header onRegisterClick={() => { }} />
                <main className="flex-1 flex flex-col items-center py-0 md:py-16 px-0 md:px-6">
                    <div className="w-full md:max-w-[800px] bg-white dark:bg-grey-800 md:rounded-2xl border-b md:border border-grey-200 dark:border-grey-700 md:shadow-sm overflow-hidden animate-slide-up">
                        <BadgeSuccess
                            badgeName={earnedBadge}
                            onClose={() => {
                                setEarnedBadge(null);
                                router.push('/explore');
                            }}
                        />
                    </div>
                </main>
                <style jsx global>{`
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-slide-up {
                        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white text-grey-900">
            <Header onRegisterClick={() => { }} />
            <div className="flex page-wrapper">
                <div className="flex-3 p-3 mr-4 h-max rounded-[8px]  sticky top-0 self-start">
                    <h1 className="text-6xl font-medium tracking-tight">Arcade</h1>
                    <h3 className="text-4xl tracking-tighter mb-4">The Community's Pass</h3>
                    <p className="max-w-[54ch] mt-2">Get access to the official community arcade where you will network, learn, connect and grow together by playing games, joining virtual sessions, attending meetups, and so much more.<br /><br />This will help you compete on different technical challenges, make new friends, upskill yourself in different technical stacks and prepare you up for the Google for Developers WOW 2026.</p>
                    <h4 className="text-xl font-medium tracking-tight my-4">What will you get?</h4>
                    <div className="flex flex-wrap gap-2 gap-y-3">
                        {
                            ["Upto 100% discount on WOW ticket*", "Swags", "Access to Now in Google app", "Pre-WOW technical workshops", "Access to the recorded content of WOW", "Networking", "Exclusive tech channels", "Fresh games every other day"].map((benefit) => {
                                return <p key={benefit} className={`py-2 px-5 border-2 rounded-full tracking-[-0.015em] font-medium ${benefit == 'Fresh games every other day' || benefit == 'Upto 100% discount on WOW ticket*' ? 'text-white! border-grey-900' : ''}`} style={benefit == 'Fresh games every other day' || benefit == 'Upto 100% discount on WOW ticket*' ? {
                                    background: 'linear-gradient(90deg, rgb(66,133,244) -36.98%, rgb(66,133,244) 22.31%, rgb(52,168,83) 78.95%, rgb(52,168,83) 132.93%)'
                                } : {}}>{benefit}</p>
                            })
                        }
                    </div>
                    <div className="flex items-end">
                        <div>
                            <p className="text-2xl leading-[24px] line-through tracking-tighter opacity-30">₹800</p>
                            <p className="text-3xl font-bold tracking-tighter">₹350 <span className="text-xl font-medium opacity-60">(excl. of taxes)</span></p>
                        </div>
                        <a href="/arcade" className="ml-auto mt-auto mr-4 cta-secondary h-12 md:h-14 rounded-full font-medium text-[14px]! md:text-[20px]!">Know more</a>
                        <button 
                            onClick={() => handlePurchase('Arcade Insider - Explorer')}
                            disabled={isProcessing}
                            className={`mt-auto nav-cta-btn bg-grey-900! mt-16! px-[20px] py-[12px]! h-12  md:h-14 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px]! flex items-center justify-center min-w-[140px] ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {isProcessing && type === 'arcade' ? 'Processing...' : 'Buy now'}
                        </button>
                    </div>
                </div>
                <div className="shrink-0 flex-2 flex flex-col gap-4 pl-12 border-l-2 border-grey-bg">
                    <div className="relative h-[90px] md:h-[240px] mb-9">
                        {/* Front card */}
                        <div className="absolute bg-white dark:bg-grey w-full h-full rounded-xl border-[1.5px] md:border-2 border-solid border-grey dark:border-grey-bg z-10 overflow-hidden">
                            <div className="flex flex-col items-center justify-center gap-y-1 h-full">
                                <div className="flex flex-row justify-center gap-2 w-full px-6">
                                    <div>
                                        <p className="uppercase font-black tracking-tight text-xs mb-2 border-2 w-max p-1 px-3 -translate-x-2 mb-4 rounded-full border-grey-bg">Limited only - Running out</p>
                                        <h3 className="font-bold text-3xl tracking-tight">Early bird pass</h3>
                                        <p className="text-sm max-w-[28ch] mt-2">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                                    </div>
                                    <div className="flex flex-col items-end text-end ml-auto">
                                        <p className="text-xl line-through tracking-tight opacity-30">₹1500</p>
                                        <p className="text-3xl font-bold tracking-tight">₹1200</p>
                                        <button 
                                            onClick={() => handlePurchase('WOW 2026 - Attendee')}
                                            disabled={isProcessing}
                                            className={`mt-auto nav-cta-btn bg-grey-900! mt-16! px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px] flex items-center justify-center min-w-[120px] ${isProcessing ? 'opacity-70' : ''}`}
                                        >
                                            {isProcessing && type === 'early' ? '...' : 'Buy now'}
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
                            <p className="text-sm max-w-[32ch] mt-2">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                        </div>
                        <div className="flex flex-col items-end text-end ml-auto">
                            <p className="text-xl line-through opacity-30">₹2500</p>
                            <p className="text-3xl font-bold">₹2000</p>
                            <button 
                                onClick={() => handlePurchase('WOW 2026 - Attendee')}
                                className="mt-auto nav-cta-btn bg-grey-900! px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px]"
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                    <div className="border-2 border-grey-bg p-6 flex rounded-[12px] aspect-[2]" aria-disabled={true}>
                        <div>
                            <h3 className="font-bold text-3xl mt-2 tracking-tight">Late bird pass</h3>
                            <p className="text-sm max-w-[32ch] mt-2">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                        </div>
                        <div className="flex flex-col items-end text-end ml-auto">
                            <p className="text-xl line-through opacity-30 tracking-tight">₹5000</p>
                            <p className="text-3xl font-bold tracking-tight">₹3500</p>
                            <a className="mt-auto cursor-not-allowed! bg-grey-text/30! text-grey-900/60! nav-cta-btn px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px]">Buy now</a>
                        </div>
                    </div>
                    <div className="border-2 border-grey-bg p-6 flex rounded-[12px] aspect-[2]" aria-disabled={true}>
                        <div>
                            <p className="uppercase font-black tracking-tight text-xs mb-2 border-2 w-max p-1 px-3 -translate-x-2 mb-4 rounded-full border-grey-bg">Accomodation Included</p>
                            <h3 className="font-bold text-3xl mt-2 tracking-tight">All in One pass</h3>
                            <p className="text-sm max-w-[32ch] mt-2">Get access to all the talks, workshops, and activities at the event. Get access to all the talks, workshops, and activities at the event.</p>
                        </div>
                        <div className="flex flex-col items-end text-end ml-auto">
                            <p className="text-xl line-through opacity-30 tracking-tight">₹7500</p>
                            <p className="text-3xl font-bold tracking-tight">₹4500</p>
                            <a className="mt-auto cursor-not-allowed! bg-grey-text/30! text-grey-900/60! nav-cta-btn px-[20px] py-[12px]! h-12 rounded-full bg-google-blue text-white font-medium text-[14px] md:text-[20px]">Buy now</a>
                        </div>
                    </div>
                </div>
            </div>
            {
                type == 'arcade' && !isTermsAgreed && <div className="z-50 bg-black/40 absolute top-0 h-full w-full flex flex-col items-center justify-center"><div className="flex flex-col items-center text-center h-max bg-white rounded-[12px] overflow-hidden">
                    <div className="h-[240px] bg-grey-bg w-full border-b-2 border-grey-900 justify-center flex items-center flex-col">
                        <img src={"/images/IO24_BlogHeaders_2x1-12.2e16d0ba.fill-800x400.png"} className="w-full h-full object-cover" />
                        <h2 className="text-2xl font-bold mb-4 whitespace-pre-line absolute m-auto mt-8 py-3 rounded-3xl px-12 bg-grey-bg">Terms & Conditions</h2>
                    </div>
                    <div className="max-w-[484px] p-8">
                        {
                            [
                                { label: 'I agree to <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms">WOW Arcade Terms and Conditions</a> including <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/community-guidelines">Google Community Guidelines</a> and acknowledge that my info will be used in accordance with <a target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy">Google\'s Privacy Policy</a>', id: 'io2024', value: terms, onChange: (e: any) => setTerms(e.target.checked) },
                                { label: 'I acknowledge that puchasing an arcade ticket does not guarantee entry to the event.', id: 'io2025', value: arcadeAck, onChange: (e: any) => setArcadeAck(e.target.checked) }
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
                            onClick={() => {
                                if (terms && arcadeAck) {
                                    handlePurchase('Arcade Insider - Explorer');
                                }
                            }}
                            className={`py-3 px-10 bg-[#000000] text-white border-none rounded-full font-bold cursor-pointer transition-opacity duration-200 w-fit ${terms && arcadeAck ? ' hover:opacity-80' : 'opacity-50 cursor-not-allowed!'}`}
                        >
                            {isProcessing ? 'Processing...' : 'Buy Now'}
                        </button>
                    </div>
                </div></div>
            }
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