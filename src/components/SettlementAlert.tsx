'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const SettlementAlert = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { isLoggedIn, tickets, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && isLoggedIn && tickets) {
            const hasArcade = tickets.some((t: any) => t.tier_id === 'clx_arcade_001');
            const hasSettled = tickets.some((t: any) => 
                t.tier_id === 'clx_earlybird_002' || 
                t.tier_id === 'clx_grouppass_006' || 
                (t.order && t.order.metadata && t.order.metadata.is_settlement === true)
            );
            
            if (hasArcade && !hasSettled) {
                const dismissed = sessionStorage.getItem('wow_settlement_dismissed');
                if (!dismissed) {
                    setIsOpen(true);
                }
            }
        }
    }, [isLoggedIn, tickets, isLoading]);

    const handleClose = () => {
        sessionStorage.setItem('wow_settlement_dismissed', 'true');
        setIsOpen(false);
    };

    const handleConfirm = () => {
        handleClose();
        router.push('/payment');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
            <div
                className="rounded-[28px] w-full max-w-[440px] overflow-hidden"
                style={{
                    background: 'var(--m-surface-container-high)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    fontFamily: "'Manrope', var(--font-manrope), system-ui, sans-serif",
                    animation: 'dialogIn 280ms cubic-bezier(.2,0,0,1) both',
                }}
            >
                {/* Header/Icon */}
                <div className="px-6 pt-6 pb-2 text-center flex flex-col items-center">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                        style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--m-on-surface)' }}>
                        Complete Your Settlement
                    </h2>
                </div>

                {/* Content */}
                <div className="px-6 py-2 text-center">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--m-on-surface-variant)' }}>
                        Your ticket is currently unconfirmed. Please note that the Arcade Pass does not include entry to the main conference or hackathon. Complete your final settlement to secure your seat.
                    </p>
                </div>

                {/* Important Alert banner */}
                <div className="px-6 py-3">
                    <div
                        className="rounded-2xl p-4 flex items-start gap-3"
                        style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="flex-none">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <p className="text-xs font-semibold text-left leading-normal">
                            To get your event pass and hackathon entry, you must complete the settlement before <u className="underline font-bold decoration-2" style={{ textUnderlineOffset: '4px' }}>11:59 PM IST, 30th June 2026</u>.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 pt-3 pb-6 flex items-center justify-end gap-2">
                    <button
                        onClick={handleClose}
                        className="t-label-l px-5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
                        onClick={handleConfirm}
                        className="t-label-l px-6 rounded-full inline-flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
                        style={{
                            height: 40,
                            background: 'var(--m-primary)',
                            color: 'var(--m-on-primary)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(44,95,217,0.25)',
                            border: 'none',
                        }}
                    >
                        Complete Settlement
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
