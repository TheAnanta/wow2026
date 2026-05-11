'use client';

import React, { useState, useEffect } from 'react';
import { fetchMyReferrals } from '@/services/registrationStubs';

interface Milestone {
  target: number;
  reward: number;
  unlocked: boolean;
}

interface ReferralData {
  referral_code: string;
  referral_link: string;
  total_referrals: number;
  paid_referrals: number;
  max_referrals: number;
  wow_cash_balance: number;
  milestones: Milestone[];
  referrals: {
    id: string;
    name: string;
    profile_url: string;
    is_paid: boolean;
    joined_at: string;
  }[];
}

export function ReferralCard() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);

  useEffect(() => {
    fetchMyReferrals().then((d) => {
      setData(d);
      setIsLoading(false);
    });
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!data) return;
    if (navigator.share) {
      navigator.share({
        title: 'Join WOW 2026!',
        text: `Hey! Register for GDG WOW 2026 using my referral code ${data.referral_code} and get ₹100 WOW Cash instantly! 🎉`,
        url: data.referral_link,
      }).catch(() => {});
    } else {
      handleCopy(data.referral_link);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 rounded-[32px] border-2 border-grey-900 dark:border-white/10 animate-pulse"
        style={{ background: 'var(--m-surface-container-low, #f3f3f3)' }}>
        <div className="h-6 w-48 bg-grey-200 dark:bg-grey-700 rounded-lg mb-4" />
        <div className="h-4 w-72 bg-grey-200 dark:bg-grey-700 rounded-lg mb-8" />
        <div className="h-3 w-full bg-grey-200 dark:bg-grey-700 rounded-full" />
      </div>
    );
  }

  if (!data) return null;

  const progress = (data.total_referrals / data.max_referrals) * 100;
  const paidProgress = (data.paid_referrals / data.max_referrals) * 100;

  return (
    <div className="rounded-[32px] border-2 border-grey-900 dark:border-white/10 overflow-hidden"
      style={{ background: 'var(--m-surface-container-low, #f3f3f3)' }}>

      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--m-tertiary-container, #ffd8e4)', color: 'var(--m-on-tertiary-container, #31111d)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Refer & Earn</h3>
              <p className="text-sm text-grey-600 dark:text-grey-400">Share your code, earn WOW Cash</p>
            </div>
          </div>

          {/* WOW Cash Badge */}
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: 'var(--m-primary-container, #dbe1ff)', color: 'var(--m-on-primary-container, #001849)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
            </svg>
            ₹{data.wow_cash_balance}
          </div>
        </div>
      </div>

      {/* Referral Code */}
      <div className="px-8 pt-5 pb-4">
        <div className="flex items-center gap-2 p-3 rounded-2xl"
          style={{ background: 'var(--m-surface-container-highest, #e6e0e9)' }}>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Your Code</p>
            <p className="text-lg font-mono font-bold tracking-wider truncate">{data.referral_code}</p>
          </div>
          <button
            onClick={() => handleCopy(data.referral_code)}
            className="p-2.5 rounded-xl transition-all active:scale-90"
            style={{ background: copied ? 'var(--m-primary, #3f5aa9)' : 'var(--m-surface-container, #f3edf7)', color: copied ? 'var(--m-on-primary, #fff)' : 'inherit' }}>
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-8 pb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{data.total_referrals} of {data.max_referrals} referrals</span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'var(--m-secondary-container, #e8def8)', color: 'var(--m-on-secondary-container, #1d192b)' }}>
            {data.paid_referrals} paid
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 rounded-full overflow-hidden"
          style={{ background: 'var(--m-surface-container-highest, #e6e0e9)' }}>
          {/* Total referrals (lighter) */}
          <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: 'var(--m-primary-container, #dbe1ff)',
            }} />
          {/* Paid referrals (solid) */}
          <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${paidProgress}%`,
              background: 'var(--m-primary, #3f5aa9)',
            }} />

          {/* Milestone markers */}
          {data.milestones.map((m) => (
            <div key={m.target}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-full"
              style={{
                left: `${(m.target / data.max_referrals) * 100}%`,
                background: m.unlocked ? 'var(--m-on-primary, #fff)' : 'var(--m-outline-variant, #cac4d0)',
              }} />
          ))}
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="px-8 pt-2 pb-4">
        <div className="grid grid-cols-4 gap-2">
          {data.milestones.map((m) => (
            <div key={m.target}
              className="text-center p-2.5 rounded-xl transition-all"
              style={{
                background: m.unlocked
                  ? 'var(--m-primary-container, #dbe1ff)'
                  : 'var(--m-surface-container, #f3edf7)',
                opacity: m.unlocked ? 1 : 0.6,
              }}>
              <div className="text-base mb-0.5">
                {m.unlocked ? '🎉' : '🔒'}
              </div>
              <div className="text-xs font-bold">₹{m.reward.toLocaleString()}</div>
              <div className="text-[10px] opacity-60">{m.target} paid</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Referrals Toggle */}
      {data.referrals.length > 0 && (
        <div className="px-8 pb-2">
          <button
            onClick={() => setShowReferrals(!showReferrals)}
            className="flex items-center justify-between w-full py-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--m-primary, #3f5aa9)' }}>
            <span>{showReferrals ? 'Hide' : 'Show'} recent referrals ({data.referrals.length})</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform ${showReferrals ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showReferrals && (
            <div className="flex flex-col gap-2 mt-1 mb-2 animate-fade-in">
              {data.referrals.slice(0, 10).map((r) => (
                <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-xl"
                  style={{ background: 'var(--m-surface-container, #f3edf7)' }}>
                  <img
                    src={r.profile_url?.replace("=s96-c", "") || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                    alt={r.name}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.name}</p>
                    <p className="text-[10px] opacity-50">
                      Joined {new Date(r.joined_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{
                      background: r.is_paid ? 'var(--m-primary-container, #dbe1ff)' : 'var(--m-surface-container-highest, #e6e0e9)',
                      color: r.is_paid ? 'var(--m-on-primary-container, #001849)' : 'inherit',
                    }}>
                    {r.is_paid ? '✓ Paid' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Share Button */}
      <div className="px-8 pb-8 pt-2">
        <button
          onClick={handleShare}
          className="w-full h-14 rounded-full font-bold flex items-center justify-center gap-2.5 transition-all active:scale-[0.97]"
          style={{ background: 'var(--m-primary, #3f5aa9)', color: 'var(--m-on-primary, #fff)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
          </svg>
          Share Invite Link
        </button>
      </div>
    </div>
  );
}
