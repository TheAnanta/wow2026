// Main checkout component — Direct port of Charan anna's checkout-app.jsx
// Adapted: removed phone frame/bezel, status bar, tweaks panel; added responsive two-column layout for desktop
// All styles, classes, typography, and component structure are 1:1 from the original

import './checkout.css';
import React, { useState, useEffect, useRef } from 'react';
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
}

const PASS = { price: 1200, list: 2000 };
const SUB_DISCOUNT = 850;

export const MaterialCheckout: React.FC<MaterialCheckoutProps> = ({
  tiers,
  onPurchase,
  isProcessing,
  profile,
  user,
  couponCode,
  setCouponCode,
  discount,
  onApplyCoupon
}) => {
  const [rank, setRank] = useState(87);
  const [promos, setPromos] = useState<any[]>([]);
  const [payLaterOpen, setPayLaterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const brand = "WOW";

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  const handleApplyPromo = async (code: string) => {
    if (promos.find((p) => p.code === code)) {
      return { ok: false, error: 'That code is already applied.' };
    }
    try {
      const result = await onApplyCoupon(code);
      if (result.success) {
        const newPromo = {
          code: code.toUpperCase(),
          amount: result.discount,
          label: 'Special Discount',
          detail: 'Coupon code applied successfully.'
        };
        setPromos((p) => [...p, newPromo]);
        showToast(`Applied ${code.toUpperCase()} · −₹${result.discount}`);
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

  const isBetterTogether = promos.some(p => p.code === 'BETTERTOGETHER');
  const qty = isBetterTogether ? 5 : 1;
  const currentSubDiscount = isBetterTogether ? 0 : SUB_DISCOUNT;
  
  const subtotal = (PASS.price * qty) - currentSubDiscount;
  const promoTotal = promos.reduce((a, p) => a + p.amount, 0);
  const finalNow = Math.max(0, (PASS.price * qty) - currentSubDiscount - promoTotal);
  const payLater = payLaterRange(rank);

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
          <button className="m-pressable rounded-full flex items-center justify-center -ml-2"
            style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Back">
            <IconBack size={24} />
          </button>
          <div className="flex-1 flex items-baseline">
            <span className="t-title-l tracking-tight" style={{ color: 'var(--m-on-surface)' }}>
              {"gdgoc".toLowerCase()}
            </span>
            <span className="t-title-l font-extrabold mr-3" style={{ color: 'var(--m-primary)' }}>
              wow
            </span>
            <span className="t-label-m ml-2" style={{ color: 'var(--m-on-surface-variant)' }}>
              Checkout
            </span>
          </div>
          <button className="m-pressable rounded-full flex items-center justify-center -mr-2"
            style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Menu">
            <IconMenu size={24} />
          </button>
        </div>
      </header>

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
                <OrderSummaryCard pass={PASS} sub={currentSubDiscount} subtotal={subtotal} brand={brand}
                  qty={qty}
                  userName={profile?.displayName} userEmail={user?.email} />
              </div>

              <div style={{ scrollSnapAlign: 'start' }}>
                <RankCard rank={rank} setRank={setRank} interactive={true} brand={brand} disabled={isBetterTogether} />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 md:max-w-[420px] flex flex-col gap-6">
              <div style={{ scrollSnapAlign: 'start' }}>
                <PromotionsCard
                  promos={promos}
                  onRemove={removePromo}
                  onApply={handleApplyPromo}
                  brand={brand}
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
                    Secure checkout · refundable up to 7 days
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
                  onPurchase={() => onPurchase('Early Bird', 'WOW 2026 - Attendee')}
                  payLaterOpen={payLaterOpen}
                  setPayLaterOpen={setPayLaterOpen}
                  payLater={payLater}
                  rank={rank}
                  isBetterTogether={isBetterTogether}
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
          onPurchase={() => onPurchase('Early Bird', 'WOW 2026 - Attendee')}
          payLaterOpen={payLaterOpen}
          setPayLaterOpen={setPayLaterOpen}
          payLater={payLater}
          rank={rank}
          isBetterTogether={isBetterTogether}
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
function StickyBarContent({ finalNow, isProcessing, onPurchase, payLaterOpen, setPayLaterOpen, payLater, rank, isBetterTogether }: any) {
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

      {!isBetterTogether && (
        <PayLaterDisclosure
          open={payLaterOpen}
          setOpen={setPayLaterOpen}
          payLater={payLater}
          rank={rank}
        />
      )}

      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="t-label-m" style={{ color: 'var(--m-on-surface-variant)' }}>
            {isBetterTogether ? 'YOU PAY IN TOTAL' : 'YOU PAY NOW'}
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
            color: '#fff',
            fontSize: 16,
            minWidth: 140,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(44,95,217,0.25)',
          }}
        >
          {isProcessing ? <Spinner /> : <IconLock size={18} />}
          <span>{isProcessing ? 'Processing…' : (isBetterTogether ? 'Pay total' : 'Pay now')}</span>
        </button>
      </div>
    </>
  );
}

// --- PayLaterDisclosure — exact from original ---
function PayLaterDisclosure({ open, setOpen, payLater, rank }: any) {
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
          {payLater.max === 0
            ? <>No pay-later — at <b style={{ color: 'var(--m-on-surface)' }}>{tier.label}</b> you owe nothing later.</>
            : <><b style={{ color: 'var(--m-on-surface)' }}>{payLater.label}</b> · pay later, based on rank</>}
        </span>
        <IconInfo size={18} />
        <IconChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`disc-enter ${open ? 'open' : ''}`}>
        <div>
          <div className="px-4 pb-3 t-body-m" style={{ color: 'var(--m-on-surface-variant)' }}>
            <p>
              You only pay the <b>now</b> amount upfront. The <b>pay-later</b> amount is settled after the conference,
              based on your final leaderboard rank — climb up tiers to reduce or eliminate it.
            </p>
            <ul className="mt-2 space-y-1 t-body-s">
              <li>· <b>Diamond / Platinum:</b> ₹0 due later</li>
              <li>· <b>Gold:</b> up to ₹200 due later</li>
              <li>· <b>Silver:</b> ₹100–₹400 due later</li>
              <li>· <b>Bronze:</b> ₹200–₹600 due later</li>
            </ul>
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
