'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const WOWPlusAlert = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const hasSeen = localStorage.getItem('wow_plus_alert_seen_v4');
        if (!hasSeen) {
            const timer = setTimeout(() => setIsOpen(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('wow_plus_alert_seen_v4', 'true');
        setIsOpen(false);
    };

    const handleGetPass = () => {
        handleClose();
        router.push('/register');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
            {/* M3 Dialog Container */}
            <div
                className="rounded-[28px] w-full max-w-[440px] overflow-hidden"
                style={{
                    background: 'var(--m-surface-container-high)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    fontFamily: "'Manrope', var(--font-manrope), system-ui, sans-serif",
                    animation: 'dialogIn 280ms cubic-bezier(.2,0,0,1) both',
                }}
            >
                {/* Header */}
                <div className="px-6 pt-6 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-none"
                            style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3l1.912 5.885h6.19l-5.007 3.638 1.912 5.885-5.007-3.638-5.007 3.638 1.912-5.885-5.007-3.638h6.19L12 3z"/>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="t-title-l" style={{ color: 'var(--m-on-surface)' }}>
                                Add WOW+ to your pass
                            </h2>
                        </div>
                        <span
                            className="t-label-s px-2.5 py-1 rounded-full"
                            style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}
                        >
                            LIMITED
                        </span>
                    </div>

                    <p className="t-body-m mt-3" style={{ color: 'var(--m-on-surface-variant)' }}>
                        Register before <b style={{ color: 'var(--m-on-surface)' }}>May 14th</b> to
                        add WOW+ to your WOW pass — a limited-time add-on that unlocks arcade challenges for bigger discounts.
                    </p>
                </div>

                {/* Benefits section — styled like OrderSummaryCard line items */}
                <div className="px-6 py-3">
                    <div
                        className="rounded-2xl p-4"
                        style={{ background: 'var(--m-surface-container-low)' }}
                    >
                        <div className="t-label-m mb-3" style={{ color: 'var(--m-on-surface-variant)', letterSpacing: '0.5px' }}>
                            WHAT YOU GET
                        </div>

                        {/* Benefit 1 */}
                        <div className="flex items-start gap-3 py-2">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                                style={{ background: 'var(--m-success-container)', color: 'var(--m-on-success-container)' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                                    <path d="M20 6L9 17l-5-5"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="t-body-l font-semibold" style={{ color: 'var(--m-on-surface)' }}>
                                    Up to 100% off your WOW pass
                                </div>
                                <div className="t-body-s mt-0.5" style={{ color: 'var(--m-on-surface-variant)' }}>
                                    Climb the leaderboard to reduce or eliminate your pass fee
                                </div>
                            </div>
                        </div>

                        <hr className="my-1 border-0 h-px" style={{ background: 'var(--m-outline-variant)' }} />

                        {/* Benefit 2 */}
                        <div className="flex items-start gap-3 py-2">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                                style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                    <path d="M12 14v6"/>
                                    <path d="M6 11v4c0 2 6 4 6 4s6-2 6-4v-4"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="t-body-l font-semibold" style={{ color: 'var(--m-on-surface)' }}>
                                    140+ hrs of certified courses
                                </div>
                                <div className="t-body-s mt-0.5" style={{ color: 'var(--m-on-surface-variant)' }}>
                                    Google-certified developer courses included
                                </div>
                            </div>
                        </div>

                        <hr className="my-1 border-0 h-px" style={{ background: 'var(--m-outline-variant)' }} />

                        {/* Benefit 3 */}
                        <div className="flex items-start gap-3 py-2">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                                style={{ background: 'var(--m-secondary-container)', color: 'var(--m-on-surface)' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="8" width="18" height="13" rx="2"/>
                                    <path d="M12 8V3"/>
                                    <path d="M12 3c-1.5 0-4 1.5-4 4h4"/>
                                    <path d="M12 3c1.5 0 4 1.5 4 4h-4"/>
                                    <line x1="12" y1="8" x2="12" y2="21"/>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="t-body-l font-semibold" style={{ color: 'var(--m-on-surface)' }}>
                                    Exclusive swags & prizes
                                </div>
                                <div className="t-body-s mt-0.5" style={{ color: 'var(--m-on-surface-variant)' }}>
                                    Leaderboard winners take home special merch
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bold clarification note */}
                <div className="px-6 pb-1">
                    <div
                        className="rounded-xl px-4 py-3 flex items-center gap-3"
                        style={{ background: 'var(--m-surface-container-highest)' }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--m-primary)', flexShrink: 0 }}>
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="16" x2="12" y2="12"/>
                            <line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        <span className="t-body-m" style={{ color: 'var(--m-on-surface)' }}>
                            <b>WOW+ is not a separate pass.</b> It&apos;s an add-on to your WOW pass.
                        </span>
                    </div>
                </div>

                {/* Expandable detail — same disclosure pattern as checkout */}
                <div style={{ background: 'var(--m-surface-container-high)' }}>
                    <button
                        onClick={() => setDetailOpen(v => !v)}
                        className="w-full flex items-center gap-2 px-6 py-2.5 t-body-m m-pressable"
                        style={{ minHeight: 44, color: 'var(--m-on-surface-variant)' }}
                    >
                        <span
                            className="inline-flex items-center justify-center rounded-full"
                            style={{ width: 22, height: 22, background: 'var(--m-surface-container-highest)', color: 'var(--m-on-surface)' }}
                        >
                            <span className="t-label-s">?</span>
                        </span>
                        <span className="flex-1 text-left">
                            How does the Arcade work?
                        </span>
                        <svg
                            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            className={`transition-transform duration-200 ${detailOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </button>

                    <div className={`disc-enter ${detailOpen ? 'open' : ''}`}>
                        <div>
                            <div className="px-6 pb-3 t-body-m" style={{ color: 'var(--m-on-surface-variant)' }}>
                                <p>
                                    WOW+ is a <b style={{ color: 'var(--m-on-surface)' }}>limited-time add-on</b> to your WOW pass.
                                    There's only one pass — the WOW pass. WOW+ adds arcade challenges that let you earn discounts on it.
                                    The higher your leaderboard rank, the bigger your discount.
                                </p>
                                <ul className="mt-2 space-y-1 t-body-s">
                                    <li>· <b>Diamond / Platinum:</b> up to 100% off your WOW pass</li>
                                    <li>· <b>Gold:</b> major discount on your WOW pass</li>
                                    <li>· <b>Silver / Bronze:</b> partial discounts + course access</li>
                                </ul>
                                <p className="mt-2 t-body-s">
                                    WOW+ enrolment ends <b style={{ color: 'var(--m-on-surface)' }}>May 25th</b>. After that, standard pricing applies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action buttons — M3 dialog pattern */}
                <div className="px-6 pt-3 pb-6 flex items-center justify-end gap-2">
                    <button
                        onClick={handleClose}
                        className="m-pressable t-label-l px-5 rounded-full"
                        style={{
                            height: 40,
                            color: 'var(--m-primary)',
                            background: 'transparent',
                            border: 'none',
                        }}
                    >
                        Maybe later
                    </button>
                    <button
                        onClick={handleGetPass}
                        className="m-pressable m-cta t-label-l px-6 rounded-full inline-flex items-center gap-2"
                        style={{
                            height: 40,
                            background: 'var(--m-primary)',
                            color: 'var(--m-on-primary)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(44,95,217,0.25)',
                            border: 'none',
                        }}
                    >
                        Register for WOW
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes dialogIn {
                    from { opacity: 0; transform: scale(0.94) translateY(8px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0);   }
                }
            `}</style>
        </div>
    );
};
