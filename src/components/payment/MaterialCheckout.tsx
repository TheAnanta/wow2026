// Main checkout component — Direct port of Charan anna's checkout-app.jsx
// Adapted: removed phone frame/bezel, status bar, tweaks panel; added responsive two-column layout for desktop
// All styles, classes, typography, and component structure are 1:1 from the original

import './checkout.css';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { analyticsService } from '../../services/analytics';
import {
  IconMenu, IconBack, IconInfo, IconChevronDown, IconLock, IconShield, IconCheck,
  IconTag, IconPartyPopper
} from './Icons';
import {
  OrderSummaryCard, RankCard, PromotionsCard, payLaterRange, tierForRank
} from './CheckoutCards';

interface MaterialCheckoutProps {
  tiers: any[];
  onPurchase: (tierName: string, badgeName?: string, isSettlement?: boolean, hasTshirt?: boolean) => void;
  isProcessing: boolean;
  profile: any;
  user: any;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discount: number;
  onApplyCoupon: (code: string) => Promise<any>;
  onBack: () => void;
  isWOWPlus: boolean;
  onToggleWOWPlus: () => void;
  initialIsGroupPass?: boolean;
  isSettlement?: boolean;
  settlementPrice?: number;
  remainingPrice?: number;
  hasFullPass?: boolean;
  prebookTshirt?: boolean;
  isOnline?: boolean;
}

const PASS = { price: 1200, list: 2000 };
const SUB_DISCOUNT = 850;

const navLinks = [
  { label: 'WOW+ Add-on', href: '/wow-plus' },
  { label: 'Explore', href: '/explore' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Team', href: '/team' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
];

export const MaterialCheckout: React.FC<MaterialCheckoutProps> = ({
  tiers,
  onPurchase,
  isProcessing,
  profile,
  user,
  couponCode,
  setCouponCode,
  discount,
  onApplyCoupon,
  onBack,
  isWOWPlus,
  onToggleWOWPlus,
  initialIsGroupPass = false,
  isSettlement = false,
  settlementPrice = 0,
  remainingPrice = 0,
  hasFullPass = false,
  prebookTshirt = false,
  isOnline = false
}) => {
  const [promos, setPromos] = useState<any[]>([]);
  const [hasTshirt, setHasTshirt] = useState(prebookTshirt);
  const [isGroupPass, setIsGroupPass] = useState(isSettlement || isOnline ? false : initialIsGroupPass);
  const [payLaterOpen, setPayLaterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (prebookTshirt) {
      setHasTshirt(true);
    }
  }, [prebookTshirt]);

  useEffect(() => {
    setIsGroupPass(isSettlement || isOnline ? false : initialIsGroupPass);
  }, [initialIsGroupPass, isSettlement, isOnline]);
  const [toast, setToast] = useState<string | null>(null);
  const [isTshirtDialogOpen, setIsTshirtDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const brand = "WOW";

  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  useEffect(() => {
    setIsSettlementOpen(Date.now() >= new Date("2026-06-28T00:01:00+05:30").getTime());
  }, []);

  // Track scroll for top-bar shadow
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 4);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  if (isSettlement && !isSettlementOpen) {
    return (
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--m-surface-container-lowest)', color: 'var(--m-on-surface)' }}>
        <header
          className="flex items-center transition-shadow sticky top-0 z-10 border-b"
          style={{ height: 56, background: 'var(--m-surface)', borderColor: 'var(--m-outline-variant)' }}
        >
          <div className="flex-1 flex items-center gap-2 px-4 max-w-[1200px] mx-auto w-full">
            <button onClick={onBack} className="m-pressable rounded-full flex items-center justify-center -ml-2"
              style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Back">
              <IconBack size={24} />
            </button>
            <div className="flex-grow flex items-baseline">
              <span className="t-title-l tracking-tight" style={{ color: 'var(--m-on-surface)' }}>
                {"gdgoc".toLowerCase()}
              </span>
              <span className="t-title-l font-extrabold mr-3" style={{ color: 'var(--m-primary)' }}>
                wow
              </span>
            </div>
          </div>
        </header>

        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-[600px] mx-auto">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <IconLock size={32} />
          </div>
          <h1 className="t-headline-m font-bold tracking-tight mb-3">Settlement opens soon</h1>
          <p className="t-body-l opacity-80 leading-relaxed">
            Final settlement will open at 12:01 AM, 28th June 2026 once the leaderboard is finalized and the promotion-demotion reset runs. Please check back then.
          </p>
          <button
            onClick={onBack}
            className="mt-8 px-8 py-3 rounded-full font-bold transition-all bg-[var(--m-primary)] text-[var(--m-on-primary)] hover:brightness-110 shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  const handleApplyPromo = async (code: string) => {
    const upperCode = code.toUpperCase();
    if (promos.find((p) => p.code === upperCode)) {
      return { ok: false, error: 'That code is already applied.' };
    }
    try {
      const result = await onApplyCoupon(upperCode);
      if (result.success) {
        const newPromo = {
          code: upperCode,
          amount: result.discount,
          label: 'Special Discount',
          detail: 'Coupon code applied successfully.'
        };

        let wasAdded = false;
        setPromos((p) => {
          if (p.find((existing) => existing.code === upperCode)) {
            return p;
          }
          wasAdded = true;
          return [...p, newPromo];
        });

        if (wasAdded) {
          showToast(`Applied ${upperCode} · −₹${result.discount}`);
        }
        return { ok: true };
      } else {
        return { ok: false, error: result.error || 'Invalid coupon' };
      }
    } catch (err: any) {
      return { ok: false, error: err.message };
    }
  };

  function removePromo(code: string) {
    setPromos((p) => p.filter((x) => x.code !== code));
    showToast(`Removed ${code}`);
    if (code.toUpperCase() === couponCode.toUpperCase()) {
      setCouponCode('');
    }
  }

  const qty = (isSettlement || isOnline) ? 1 : (isGroupPass ? 5 : 1);
  const currentSubDiscount = (isSettlement || isGroupPass || !isWOWPlus || isOnline) ? 0 : SUB_DISCOUNT;

  const basePrice = hasFullPass && prebookTshirt
    ? 0
    : (isSettlement ? remainingPrice : (isOnline ? 350 : (isGroupPass ? 4000 : (PASS.price * qty))));
  const subtotal = isSettlement ? remainingPrice : (basePrice - currentSubDiscount);
  const promoTotal = promos.reduce((a, p) => a + p.amount, 0);
  const finalNow = isSettlement
    ? (settlementPrice + (hasTshirt ? 250 : 0))
    : (Math.max(0, basePrice - currentSubDiscount - promoTotal) + (hasTshirt ? 300 : 0));
  const payLater = payLaterRange(87);

  return (
    <div className="checkout-root min-h-screen flex flex-col" style={{ background: 'var(--m-surface)' }}>
      {/* Top app bar — exact from original */}
      <header
        className={`flex items-center ${scrolled ? 'scrolled-shadow' : ''} transition-shadow sticky top-0 z-10 border-b`}
        style={{ height: 56, background: 'var(--m-surface)', borderColor: 'var(--m-outline-variant)' }}
      >
        <div className="flex-1 flex items-center gap-2 px-4 max-w-[1200px] mx-auto w-full">
          <button onClick={onBack} className="m-pressable rounded-full flex items-center justify-center -ml-2"
            style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Back">
            <IconBack size={24} />
          </button>

          <div className="flex-grow flex items-baseline">
            <span className="t-title-l tracking-tight" style={{ color: 'var(--m-on-surface)' }}>
              {"gdgoc".toLowerCase()}
            </span>
            <span className="t-title-l font-extrabold mr-3" style={{ color: 'var(--m-primary)' }}>
              wow
            </span>
            <span className="t-label-m ml-2 hidden sm:inline" style={{ color: 'var(--m-on-surface-variant)' }}>
              Checkout
            </span>
          </div>

          {/* Desktop Navigation Links — Moved to right */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => analyticsService.trackNavigation(link.label, 'Checkout Header', link.href)}
                className="t-label-l font-medium hover:text-[var(--m-primary)] transition-colors"
                style={{ color: 'var(--m-on-surface-variant)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden m-pressable rounded-full flex items-center justify-center -mr-2"
            style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }}
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <IconMenu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-[280px] z-[101] bg-[var(--m-surface)] shadow-2xl transition-transform duration-300 transform md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="t-title-l font-bold">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="t-title-m py-2 px-4 rounded-xl hover:bg-[var(--m-surface-container-low)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollSnapType: 'y proximity' }}>
        <div className="px-4 pt-3 pb-2 max-w-[1200px] mx-auto">
          <h1 className="t-headline-s" style={{ color: 'var(--m-on-surface)' }}>Review & pay</h1>
          <p className="t-body-m mt-1" style={{ color: 'var(--m-on-surface-variant)' }}>
            One pass, locked in. Climb the leaderboard to lower what you owe later.
          </p>
        </div>

        {isSettlement && !isSettlementOpen && (
          <div className="mx-4 mt-3 p-4 rounded-2xl flex items-start gap-3 border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200 max-w-[1200px] md:mx-auto">
            <IconInfo size={22} className="flex-none text-amber-600 mt-0.5" />
            <div>
              <div className="t-title-s font-semibold">Settlement opens soon</div>
              <div className="t-body-s mt-1 opacity-90">
                Final settlement will open at 12:01 AM, 28th June 2026 once the leaderboard is finalized and the promotion-demotion reset runs. Please check back then.
              </div>
            </div>
          </div>
        )}

        {/* Two-column grid on desktop, single column on mobile */}
        <div className="px-4 pb-52 md:pb-8 max-w-[1200px] mx-auto" style={{ paddingTop: 8 }}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6">
              <div style={{ scrollSnapAlign: 'start' }}>
                <OrderSummaryCard
                  pass={PASS}
                  sub={currentSubDiscount}
                  subtotal={subtotal}
                  brand={brand}
                  qty={qty}
                  userName={profile?.displayName}
                  userEmail={user?.email}
                  isWOWPlus={isWOWPlus}
                  onToggleWOWPlus={onToggleWOWPlus}
                  disabled={isGroupPass || isSettlement}
                  isGroupPass={isGroupPass}
                  isSettlement={isSettlement}
                  settlementPrice={settlementPrice}
                  remainingPrice={remainingPrice}
                  league={profile?.league}
                  hasTshirt={hasTshirt}
                  isOnline={isOnline}
                />
              </div>

              {(isSettlement || prebookTshirt) && (
                <div
                  className="rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer select-none text-left"
                  style={{
                    background: 'var(--m-surface-container-low)'
                  }}
                  onClick={() => setHasTshirt(!hasTshirt)}
                >
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--m-primary-container)] text-[var(--m-on-primary-container)] inline-flex items-center gap-1"
                    >
                      <IconTag size={10} stroke={2.5} />
                      Prebook discount
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 dark:text-amber-400"
                    >
                      Exclusive 20 Year Anniversary - Limited
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="flex items-start gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={hasTshirt}
                        onChange={(e) => setHasTshirt(e.target.checked)}
                        className="mt-1 h-5 w-5 cursor-pointer rounded accent-[var(--m-primary)]"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="t-title-m font-semibold flex items-center gap-2" style={{ color: 'var(--m-on-surface)' }}>
                          <IconPartyPopper size={20} className="text-[var(--m-primary)] dark:text-amber-500 flex-shrink-0" />
                          <span>Google Developers 20th Anniversary T-Shirt</span>
                        </div>
                        <div className="t-body-m mt-1.5" style={{ color: 'var(--m-on-surface-variant)', lineHeight: '1.4' }}>
                          Celebrate 20 years of Google Developers! Grab this exclusive, limited-edition anniversary T-shirt as a special pre-book reward.
                        </div>
                        {isSettlement ? (
                          <div className="mt-2.5 text-[11px] py-2 px-3 rounded-xl bg-[var(--m-primary)] dark:bg-blue-400/20 text-[var(--m-on-primary,white)] dark:text-blue-200 leading-normal flex items-start gap-2">
                            <span className="text-amber-300 dark:text-blue-300">✨</span>
                            <span>
                              <strong>Arcade Special:</strong> Google was impressed with your arcade performance! Your pre-booking discount has been applied.
                            </span>
                          </div>
                        ) : (
                          <div className="mt-2.5 text-[11px] py-2 px-3 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 leading-normal flex items-start gap-2">
                            <span className="text-amber-500 dark:text-amber-300">✨</span>
                            <span>
                              <strong>Special Pre-book Offer:</strong> Exclusive anniversary discount applied.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 flex-shrink-0">
                      <div
                        className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-1 cursor-zoom-in hover:scale-105 active:scale-95 transition-transform duration-200"
                        title="Click to zoom image"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTshirtDialogOpen(true);
                        }}
                      >
                        <img
                          src="/images/tshirt-wow-26.png"
                          alt="WOW 2026 T-Shirt"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-xs line-through opacity-60" style={{ color: 'var(--m-on-surface-variant)' }}>
                          ₹600
                        </div>
                        <div className="t-title-m font-bold" style={{ color: 'var(--m-primary)' }}>
                          +{isSettlement ? '₹250' : '₹300'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <div style={{ scrollSnapAlign: 'start' }}>
  <RankCard rank={rank} setRank={setRank} interactive={true} brand={brand} disabled={isGroupPass} />
</div> */}
            </div>

            {/* Right Column */}
            <div className="flex-1 md:max-w-[420px] flex flex-col gap-6">
              {!isSettlement && (
                <div style={{ scrollSnapAlign: 'start' }}>
                  <PromotionsCard
                    promos={promos}
                    onRemove={removePromo}
                    onApply={handleApplyPromo}
                    brand={brand}
                    isGroupPass={isGroupPass}
                    setIsGroupPass={setIsGroupPass}
                  />
                </div>
              )}

              {/* Trust footer — exact from original */}
              <div className="rounded-2xl p-4 flex items-start gap-3"
                style={{ background: 'var(--m-surface-container-low)' }}>
                <div className="w-10 h-10 rounded-full flex-none flex items-center justify-center"
                  style={{ background: 'var(--m-secondary-container)', color: 'var(--m-on-surface)' }}>
                  <IconShield size={22} />
                </div>
                <div className="flex-1">
                  <div className="t-title-s" style={{ color: 'var(--m-on-surface)' }}>
                    Secure checkout · Non-refundable
                  </div>
                  <div className="t-body-s mt-1" style={{ color: 'var(--m-on-surface-variant)' }}>
                    Payments processed by Razorpay. We never store card details.
                  </div>
                </div>
              </div>

              {/* Desktop: Payment bar sits below trust card — same exact design */}
              <div className="hidden md:block rounded-2xl overflow-hidden md:py-4"
                style={{ background: 'var(--m-surface-container-lowest)' }}>
                <StickyBarContent
                  finalNow={finalNow}
                  isProcessing={isProcessing}
                  onPurchase={() => onPurchase(
                    isSettlement ? 'clx_earlybird_002' : (isOnline ? 'clx_online_007' : (isGroupPass ? 'clx_grouppass_006' : (isWOWPlus ? 'clx_arcade_001' : 'clx_earlybird_002'))),
                    isOnline ? 'WOW 2026 - Online Attendee' : (isWOWPlus ? 'Arcade Insider - Explorer' : 'WOW 2026 - Attendee'),
                    isSettlement,
                    hasTshirt
                  )}
                  payLaterOpen={payLaterOpen}
                  setPayLaterOpen={setPayLaterOpen}
                  payLater={payLater}
                  isGroupPass={isGroupPass}
                  isWOWPlus={isWOWPlus}
                  isSettlement={isSettlement}
                  settlementPrice={settlementPrice}
                  isSettlementOpen={isSettlementOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Fixed sticky bottom bar — exact from original */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 sticky-bar-shadow"
        style={{ background: 'var(--m-surface-container-lowest)', paddingBottom: 24 }}>
        <StickyBarContent
          finalNow={finalNow}
          isProcessing={isProcessing}
          onPurchase={() => onPurchase(
            isSettlement ? 'clx_earlybird_002' : (isOnline ? 'clx_online_007' : (isGroupPass ? 'clx_grouppass_006' : (isWOWPlus ? 'clx_arcade_001' : 'clx_earlybird_002'))),
            isOnline ? 'WOW 2026 - Online Attendee' : (isWOWPlus ? 'Arcade Insider - Explorer' : 'WOW 2026 - Attendee'),
            isSettlement,
            hasTshirt
          )}
          payLaterOpen={payLaterOpen}
          setPayLaterOpen={setPayLaterOpen}
          payLater={payLater}
          isGroupPass={isGroupPass}
          isWOWPlus={isWOWPlus}
          isSettlement={isSettlement}
          settlementPrice={settlementPrice}
          isSettlementOpen={isSettlementOpen}
        />
      </div>

      {/* Toast — exact from original */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 toast-in"
          style={{ bottom: 130, zIndex: 30 }}>
          <div className="rounded-full px-4 py-2.5 t-body-m flex items-center gap-2"
            style={{ background: '#1b1b21', color: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <IconCheck size={16} stroke={2.4} />
            {toast}
          </div>
        </div>
      )}

      {/* T-Shirt Zoom Dialog */}
      {isTshirtDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsTshirtDialogOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white dark:bg-zinc-900 rounded-3xl p-6 flex flex-col items-center shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--m-outline-variant)'
            }}
          >
            <button
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setIsTshirtDialogOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-5">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 dark:text-amber-400">
                Exclusive Pre-Book Reward
              </span>
              <h3 className="t-title-l font-bold mt-2 mb-8" style={{ color: 'var(--m-on-surface)' }}>
                Google Developers 20th Anniversary T-Shirt
              </h3>
            </div>

            <div className="w-full aspect-square max-h-[50vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
              <img
                src="/images/tshirt-wow-26.png"
                alt="Google Developers 20th Anniversary T-Shirt"
                className="max-w-full max-h-full object-contain select-none"
              />
            </div>

            <p className="t-body-m text-center mt-5" style={{ color: 'var(--m-on-surface-variant)', lineHeight: '1.5' }}>
              Celebrate 20 years of Google Developers! Grab this exclusive, limited-edition anniversary T-shirt as a special pre-book reward.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- StickyBarContent — shared between mobile fixed bar and desktop section ---
// Uses the exact same markup from Charan anna's original sticky bottom bar
function StickyBarContent({ finalNow, isProcessing, onPurchase, payLaterOpen, setPayLaterOpen, payLater, rank, isGroupPass, isWOWPlus, isSettlement, settlementPrice, isSettlementOpen }: any) {
  return (
    <>
      {/* Additional Coupons link — refined to match M3 design system */}
      {!isSettlement && (
        <div className="px-4 pt-3 md:hidden">
          <button
            onClick={() => document.getElementById('promotions-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="m-pressable flex items-center gap-2 t-label-l py-2 px-3 rounded-xl transition-all"
            style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}
          >
            <IconTag size={18} stroke={2.5} />
            <span className="flex-1 text-left text-[13px]">Great news! Additional coupons available</span>
            <span className="opacity-60 text-[18px]">→</span>
          </button>
        </div>
      )}

      {!isGroupPass && isWOWPlus && !isSettlement && (
        <PayLaterDisclosure
          open={payLaterOpen}
          setOpen={setPayLaterOpen}
          payLater={payLater}
          rank={rank}
          isWOWPlus={isWOWPlus}
        />
      )}

      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="t-label-m" style={{ color: 'var(--m-on-surface-variant)' }}>
            {isSettlement ? 'YOU PAY FOR SETTLEMENT' : (isGroupPass ? 'YOU PAY IN TOTAL' : 'YOU PAY NOW')}
          </div>
          <div className="t-headline-m tabular-nums" style={{ color: 'var(--m-on-surface)' }}>
            ₹{finalNow.toLocaleString('en-IN')}
          </div>
        </div>
        <button
          onClick={onPurchase}
          disabled={isProcessing || (isSettlement && !isSettlementOpen)}
          className="m-cta inline-flex items-center justify-center gap-2 rounded-full t-label-l"
          style={{
            height: 56,
            paddingLeft: 28, paddingRight: 28,
            background: (isSettlement && !isSettlementOpen) ? 'var(--m-outline-variant)' : 'var(--m-primary)',
            color: (isSettlement && !isSettlementOpen) ? 'var(--m-on-surface-variant)' : 'var(--m-on-primary)',
            fontSize: 16,
            minWidth: 140,
            boxShadow: (isSettlement && !isSettlementOpen) ? 'none' : '0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(44,95,217,0.25)',
          }}
        >
          {isProcessing ? <Spinner /> : <IconLock size={18} />}
          <span>{isProcessing ? 'Processing…' : ((isSettlement && !isSettlementOpen) ? 'Locked' : (isSettlement ? 'Settle payment' : (isGroupPass ? 'Pay total' : 'Pay now')))}</span>
        </button>
      </div>
    </>
  );
}

// --- PayLaterDisclosure — exact from original ---
function PayLaterDisclosure({ open, setOpen, payLater, rank, isWOWPlus }: any) {
  const tier = tierForRank(rank);
  return (
    <div style={{ background: 'var(--m-surface-container-lowest)' }}>
      <button
        onClick={() => setOpen((v: boolean) => !v)}
        className="w-full flex items-center gap-2 px-4 py-2.5 t-body-m m-pressable"
        style={{ minHeight: 44, color: 'var(--m-on-surface-variant)' }}
        aria-expanded={open}
      >
        <span className="inline-flex items-center justify-center rounded-full"
          style={{ width: 22, height: 22, background: 'var(--m-surface-container-high)', color: 'var(--m-on-surface)' }}>
          <span className="t-label-s">+</span>
        </span>
        <span className="flex-1 text-left">
          {!isWOWPlus
            ? <>No pay-later — Standard pass is fully settled.</>
            : <>you will need to pay 0-600 based on rank (decided on June 18)</>}
        </span>
        <IconInfo size={18} />
        <IconChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`disc-enter ${open ? 'open' : ''}`}>
        <div>
          <div className="px-4 pb-3 t-body-m" style={{ color: 'var(--m-on-surface-variant)' }}>
            {!isWOWPlus ? (
              <p>
                Since you've opted for the <b>Standard WOW Pass</b>, you pay the full amount upfront and
                owe nothing after the conference. The pay-later system only applies to the discounted WOW+ passes.
              </p>
            ) : (
              <p>
                You only pay the <b>now</b> amount upfront. The <b>pay-later</b> amount (up to ₹450) is settled after the conference,
                based on your final leaderboard rank which will be decided on June 18.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Spinner — exact from original ---
function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none" />
      <path d="M12 3 a9 9 0 0 1 9 9" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
