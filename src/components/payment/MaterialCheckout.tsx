// Main checkout component — Direct port of Charan anna's checkout-app.jsx
// Adapted: removed phone frame/bezel, status bar, tweaks panel; added responsive two-column layout for desktop
// All styles, classes, typography, and component structure are 1:1 from the original

import './checkout.css';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { analyticsService } from '../../services/analytics';
import {
  IconMenu, IconBack, IconInfo, IconChevronDown, IconLock, IconShield, IconCheck,
  IconTag
} from './Icons';
import {
  OrderSummaryCard, RankCard, PromotionsCard, payLaterRange, tierForRank
} from './CheckoutCards';

interface MaterialCheckoutProps {
  tiers: any[];
  onPurchase: (tierName: string, badgeName?: string) => void;
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
  initialIsGroupPass = false
}) => {
  const [promos, setPromos] = useState<any[]>([]);
  const [isGroupPass, setIsGroupPass] = useState(initialIsGroupPass);
  const [payLaterOpen, setPayLaterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const brand = "WOW";

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

  const qty = isGroupPass ? 5 : 1;
  const currentSubDiscount = (isGroupPass || !isWOWPlus) ? 0 : SUB_DISCOUNT;

  const basePrice = isGroupPass ? 4000 : (PASS.price * qty);
  const subtotal = basePrice - currentSubDiscount;
  const promoTotal = promos.reduce((a, p) => a + p.amount, 0);
  const finalNow = Math.max(0, basePrice - currentSubDiscount - promoTotal);
  const payLater = payLaterRange(87);

  // Track scroll for top-bar shadow
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 4);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

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
                  disabled={isGroupPass}
                  isGroupPass={isGroupPass}
                />
              </div>

              {/* <div style={{ scrollSnapAlign: 'start' }}>
  <RankCard rank={rank} setRank={setRank} interactive={true} brand={brand} disabled={isGroupPass} />
</div> */}
            </div>

            {/* Right Column */}
            <div className="flex-1 md:max-w-[420px] flex flex-col gap-6">
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
                  onPurchase={() => onPurchase(isGroupPass ? 'clx_grouppass_006' : (isWOWPlus ? 'clx_arcade_001' : 'clx_earlybird_002'), isWOWPlus ? 'Arcade Insider - Explorer' : 'WOW 2026 - Attendee')}
                  payLaterOpen={payLaterOpen}
                  setPayLaterOpen={setPayLaterOpen}
                  payLater={payLater}
                  isGroupPass={isGroupPass}
                  isWOWPlus={isWOWPlus}
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
          onPurchase={() => onPurchase(isGroupPass ? 'clx_grouppass_006' : (isWOWPlus ? 'clx_arcade_001' : 'clx_earlybird_002'), isWOWPlus ? 'Arcade Insider - Explorer' : 'WOW 2026 - Attendee')}
          payLaterOpen={payLaterOpen}
          setPayLaterOpen={setPayLaterOpen}
          payLater={payLater}
          isGroupPass={isGroupPass}
          isWOWPlus={isWOWPlus}
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
    </div>
  );
};

// --- StickyBarContent — shared between mobile fixed bar and desktop section ---
// Uses the exact same markup from Charan anna's original sticky bottom bar
function StickyBarContent({ finalNow, isProcessing, onPurchase, payLaterOpen, setPayLaterOpen, payLater, rank, isGroupPass, isWOWPlus }: any) {
  return (
    <>
      {/* Additional Coupons link — refined to match M3 design system */}
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

      {!isGroupPass && isWOWPlus && (
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
            {isGroupPass ? 'YOU PAY IN TOTAL' : 'YOU PAY NOW'}
          </div>
          <div className="t-headline-m tabular-nums" style={{ color: 'var(--m-on-surface)' }}>
            ₹{finalNow.toLocaleString('en-IN')}
          </div>
        </div>
        <button
          onClick={onPurchase}
          disabled={isProcessing}
          className="m-cta inline-flex items-center justify-center gap-2 rounded-full t-label-l"
          style={{
            height: 56,
            paddingLeft: 28, paddingRight: 28,
            background: 'var(--m-primary)',
            color: 'var(--m-on-primary)',
            fontSize: 16,
            minWidth: 140,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(44,95,217,0.25)',
          }}
        >
          {isProcessing ? <Spinner /> : <IconLock size={18} />}
          <span>{isProcessing ? 'Processing…' : (isGroupPass ? 'Pay total' : 'Pay now')}</span>
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
