// Cards used inside the checkout. Each is a Material 3 "filled-tonal" container
// with 16px internal padding and 12dp / 16dp rounded corners.
// Direct port from Charan anna's checkout-cards.jsx

import React, { useState } from 'react';
import { IconTrophy, IconSparkle, IconTag, IconCheck, IconChevronDown, IconTrash, IconInfo } from './Icons';

// ---------- Tiers ----------
export const TIERS = [
  { id: 'platinum', label: 'Platinum', range: [0, 20], short: '0–20', color: '#E5E4E2' },
  { id: 'diamond', label: 'Diamond', range: [21, 120], short: '21–120', color: '#5C7CFF' },
  { id: 'gold', label: 'Gold', range: [121, 320], short: '121–320', color: '#F2A93B' },
  { id: 'silver', label: 'Silver', range: [321, 670], short: '321–670', color: '#B6B6C2' },
  { id: 'bronze', label: 'Bronze', range: [671, 1515], short: '671–1515', color: '#B07A3F' },
  { id: 'basic', label: 'Basic', range: [1516, 3000], short: '1516–3000', color: '#8F8F9B' },
];

export function tierForRank(rank: number) {
  return TIERS.find((t) => rank >= t.range[0] && rank <= t.range[1]) || TIERS[TIERS.length - 1];
}

export function payLaterRange(rank: number) {
  const tier = tierForRank(rank);
  switch (tier.id) {
    case 'platinum': return { min: 0, max: 0, label: '₹0 — you owe nothing later' };
    case 'diamond': return { min: 50, max: 50, label: '₹50 later based on tier' };
    case 'gold': return { min: 200, max: 200, label: '₹200 later based on tier' };
    case 'silver': return { min: 300, max: 300, label: '₹300 later based on tier' };
    case 'bronze': return { min: 450, max: 450, label: '₹450 later based on tier' };
    case 'basic': return { min: 600, max: 600, label: '₹600 later based on tier' };
    default: return { min: 0, max: 0, label: '₹0' };
  }
}

// ---------- Order summary ----------
interface OrderSummaryCardProps {
  pass: { price: number; list: number };
  sub: number;
  subtotal: number;
  brand: string;
  qty: number;
  userName?: string;
  userEmail?: string;
  isWOWPlus?: boolean;
  onToggleWOWPlus?: () => void;
  disabled?: boolean;
  isGroupPass?: boolean;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  pass, sub, subtotal, brand, qty, userName, userEmail, isWOWPlus, onToggleWOWPlus, disabled, isGroupPass
}) => (
  <section
    className="rounded-2xl p-4"
    style={{ background: 'var(--m-surface-container-low)' }}
  >
    <header className="flex items-center justify-between mb-3">
      <h2 className="t-title-l" style={{ color: 'var(--m-on-surface)' }}>Order summary</h2>
      <span className="t-label-m" style={{ color: 'var(--m-on-surface-variant)' }}>{qty} items</span>
    </header>

    {/* Pass line item */}
    <div className="flex items-start gap-3 py-2">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-none"
        style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}>
        <IconTrophy size={22} stroke={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="t-body-l font-semibold truncate" style={{ color: 'var(--m-on-surface)' }}>
          {isWOWPlus ? `${brand} group pass with ${brand}+` : `${brand} group pass`}
        </div>
        <div className="t-body-s" style={{ color: 'var(--m-on-surface-variant)' }}>
          {userName || 'User'} · {userEmail || 'email@example.com'}
        </div>
        <div className="t-body-s mt-0.5" style={{ color: 'var(--m-on-surface-variant)' }}>
          Qty {qty} · General admission
          {qty > 1 && (
            <div className="mt-1 flex items-center gap-1.5 py-1 px-2 rounded-lg"
              style={{ background: 'var(--m-surface-container-high)', width: 'fit-content' }}>
              <IconInfo size={14} />
              <span className="text-[11px] font-medium leading-tight">Details for {qty - 1} extra members will be collected post-payment</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-right flex-none">
        <div className="t-title-m" style={{ color: 'var(--m-on-surface)' }}>
          {isGroupPass ? `₹4,000` : (isWOWPlus ? `upto ₹${(950 * qty).toLocaleString('en-IN')}` : `₹${(pass.price * qty).toLocaleString('en-IN')}`)}
        </div>
        {!isGroupPass && <div className="t-body-s line-through" style={{ color: 'var(--m-on-surface-variant)' }}>₹{(pass.list * qty).toLocaleString('en-IN')}</div>}
      </div>
    </div>


    <hr className="my-4 border-0 h-px" style={{ background: 'var(--m-outline-variant)' }} />

    <div className="mt-4 pt-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="t-body-l" style={{ color: 'var(--m-on-surface-variant)' }}>Subtotal</span>
        <span className="t-title-l" style={{ color: 'var(--m-on-surface)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
      </div>

      {isWOWPlus && (
        <>
          <div className="flex items-center justify-between">
            <span className="t-body-m flex items-center gap-1.5" style={{ color: 'var(--m-on-surface-variant)' }}>
              Pay later (18th June, based on points)
              <div className="group relative flex items-center">
                <IconInfo size={14} className="cursor-help opacity-70 hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1b1b21] text-white text-[11px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                  Score points on arcade and workshops
                </div>
              </div>
            </span>
            <span className="t-body-l tabular-nums" style={{ color: 'var(--m-on-surface-variant)' }}>upto ₹{(600 * qty).toLocaleString('en-IN')}</span>
          </div>

          <hr className="my-1 border-0 h-px" style={{ background: 'var(--m-outline-variant)' }} />

          <div className="flex items-center justify-between">
            <span className="t-title-m" style={{ color: 'var(--m-on-surface)' }}>Total</span>
            <span className="t-title-l tabular-nums" style={{ color: 'var(--m-primary)' }}>upto ₹{(950 * qty).toLocaleString('en-IN')}</span>
          </div>
        </>
      )}
    </div>

  </section>
);

// ---------- Rank Card ----------
interface RankCardProps {
  rank: number;
  setRank: (rank: number) => void;
  interactive: boolean;
  brand: string;
  disabled?: boolean;
}

export const RankCard: React.FC<RankCardProps> = ({ rank, setRank, interactive, brand, disabled }) => {
  const tier = tierForRank(rank);
  const max = 3000;
  const progress = (rank / max) * 100;

  if (disabled) {
    return (
      <section
        className="rounded-2xl p-4 opacity-70"
        style={{ background: 'var(--m-surface-container-low)' }}
      >
        <header className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-none"
            style={{ background: 'var(--m-surface-container-high)', color: 'var(--m-on-surface-variant)' }}>
            <IconInfo size={22} />
          </div>
          <div>
            <h2 className="t-title-l" style={{ color: 'var(--m-on-surface)' }}>Rank discount unavailable</h2>
            <p className="t-body-s mt-0.5" style={{ color: 'var(--m-on-surface-variant)' }}>
              This campaign is not available when Better Together is selected.
            </p>
          </div>
        </header>
      </section>
    );
  }

  return (
    <section
      className="rounded-2xl p-4"
      style={{ background: 'var(--m-surface-container-low)' }}
    >
      <header className="flex items-start justify-between mb-1">
        <div>
          <h2 className="t-title-l" style={{ color: 'var(--m-on-surface)' }}>Your rank discount</h2>
          <p className="t-body-m mt-1" style={{ color: 'var(--m-on-surface-variant)' }}>
            Higher rank = more pay-later flexibility. You climb by completing courses and arcade challenges.
          </p>
        </div>
      </header>

      {/* Current tier badge */}
      <div className="mt-4 mb-3 flex items-center gap-3">
        <div
          className="px-3 py-2 rounded-full inline-flex items-center gap-2"
          style={{
            background: `var(--m-tier-${tier.id}-container, var(--m-tier-gold-container))`,
            color: `var(--m-on-tier-${tier.id}-container, var(--m-on-tier-gold-container))`
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: `var(--m-tier-${tier.id}, var(--m-tier-gold))` }} />
          <span className="t-label-l">If you're #{rank} · {tier.label} tier (Pay ₹{payLaterRange(rank).min} later)</span>
        </div>
      </div>

      {/* Slider */}
      <div className="mt-2">
        <div className="relative h-9">
          {/* Track */}
          <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full"
            style={{ background: 'var(--m-surface-container-highest)' }}
          />
          {/* Filled track */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full transition-all duration-200"
            style={{ width: `${progress}%`, background: 'var(--m-primary)' }}
          />
          {/* Tier markers */}
          {TIERS.map((t) => {
            const m = (t.range[0] / max) * 100;
            if (t.range[0] === 0) return null;
            return (
              <div
                key={t.id}
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-sm"
                style={{ left: `${m}%`, background: 'var(--m-surface-container-low)' }}
              />
            );
          })}
          {/* Range input on top — invisible but functional */}
          {interactive && (
            <input
              type="range"
              className="m-range absolute inset-0 w-full"
              min={0}
              max={max}
              value={rank}
              onChange={(e) => setRank(parseInt(e.target.value, 10))}
              aria-label="Your leaderboard rank"
            />
          )}
          {/* Visible thumb (cosmetic) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1 h-9 rounded-sm pointer-events-none"
            style={{ left: `calc(${progress}% - 2px)`, background: 'var(--m-primary)' }}
          />
        </div>
      </div>

      {/* Tier chips */}
      <div className="mt-4 grid grid-cols-6 gap-1.5">
        {TIERS.map((t) => {
          const active = t.id === tier.id;
          return (
            <div
              key={t.id}
              className={`rounded-lg px-1.5 py-2 text-center transition-colors ${active ? 'tier-card-active' : ''}`}
              style={!active ? { background: 'transparent', color: 'var(--m-on-surface-variant)' } : {}}
            >
              <div className="t-label-s" style={{ color: active ? 'var(--m-on-tier-gold-container)' : 'var(--m-on-surface)' }}>
                {t.label}
              </div>
              <div className="t-body-s mt-0.5 font-mono" style={{ fontSize: 10 }}>
                {t.short}
              </div>
            </div>
          );
        })}
      </div>

      {interactive && (
        <p className="mt-3 t-body-s" style={{ color: 'var(--m-on-surface-variant)' }}>
          <span className="font-mono">↔</span> Drag the slider to preview pay-later at other ranks.
        </p>
      )}
    </section>
  );
};

interface PromotionsCardProps {
  promos: any[];
  onRemove: (code: string) => void;
  onApply: (code: string) => any;
  brand: string;
  isGroupPass?: boolean;
  setIsGroupPass?: (val: boolean) => void;
}

export const PromotionsCard: React.FC<PromotionsCardProps> = ({ promos, onRemove, onApply, brand, isGroupPass, setIsGroupPass }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  async function handleApply() {
    if (!code.trim()) return;
    setError('');
    const result = await onApply(code.trim().toUpperCase());
    if (result.ok) {
      setCode('');
      setError('');
    } else {
      setError(result.error);
    }
  }

  return (
    <section
      id="promotions-section"
      className="rounded-2xl p-4"
      style={{ background: 'var(--m-surface-container-low)' }}
    >
      <header className="flex items-center justify-between mb-3">
        <h2 className="t-title-l" style={{ color: 'var(--m-on-surface)' }}>Promotions</h2>
        <button className="t-label-l m-pressable px-2 -mr-2 py-1 rounded-md"
          style={{ color: 'var(--m-primary)' }}>
          See all
        </button>
      </header>

      {/* Coupon input */}
      <div
        className="flex items-center gap-3 rounded-xl px-3 transition-colors"
        style={{
          height: 56,
          background: 'var(--m-surface-container-high)',
          outline: focused ? '2px solid var(--m-primary)' : '2px solid transparent',
        }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-none"
          style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}>
          <IconTag size={20} stroke={2} />
        </div>
        <input
          className="flex-1 bg-transparent outline-none t-body-l"
          style={{ color: 'var(--m-on-surface)' }}
          placeholder="Have a coupon code?"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(''); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <button
          onClick={handleApply}
          disabled={!code.trim() || promos.some(p => p.code === code.trim().toUpperCase())}
          className="m-pressable t-label-l px-4 rounded-full flex-none disabled:opacity-40 flex items-center gap-1.5"
          style={{ height: 40, background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}
        >
          {promos.some(p => p.code === code.trim().toUpperCase()) ? (
            <><IconCheck size={16} stroke={3} /> Applied</>
          ) : (
            'Apply'
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 t-body-s" style={{ color: 'var(--m-error)' }}>{error}</p>
      )}



      {/* Applied promos list */}
      <div className="mt-3 flex flex-col gap-2">
        {promos.map((p) => (
          <AppliedPromoRow key={p.code} promo={p} onRemove={() => { onRemove(p.code); setCode(''); }} />
        ))}
        {promos.length === 0 && (
          <div className="rounded-xl px-3 py-3 t-body-m"
            style={{ background: 'var(--m-surface-container)', color: 'var(--m-on-surface-variant)' }}>
            No promotions applied. Try <span className="font-mono">{brand.toUpperCase()}10</span> for an extra 10% off.
          </div>
        )}
      </div>
    </section>
  );
};

const AppliedPromoRow: React.FC<{ promo: any; onRemove: () => void }> = ({ promo, onRemove }) => {
  const [open, setOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden transition-opacity"
      style={{
        background: 'var(--m-success-container)',
        color: 'var(--m-on-success-container)',
        opacity: removing ? 0.4 : 1,
      }}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-none pulse-once"
          style={{ background: 'var(--m-success)', color: '#fff' }}>
          <IconCheck size={22} stroke={2.4} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="t-title-m">{promo.code}</span>
            <span
              className="t-label-s px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.08)' }}
            >
              APPLIED
            </span>
          </div>
          <div className="t-body-s mt-0.5">
            −₹{promo.amount.toLocaleString('en-IN')} off · {promo.label}
          </div>
        </div>
        <button
          aria-label="Promo details"
          onClick={() => setOpen((v) => !v)}
          className="m-pressable rounded-full flex-none flex items-center justify-center"
          style={{ width: 48, height: 48 }}
        >
          <IconChevronDown size={22} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className={`disc-enter ${open ? 'open' : ''}`}>
        <div>
          <div className="px-3 pb-3">
            <div className="t-body-m mb-3" style={{ color: 'var(--m-on-success-container)' }}>
              {promo.detail}
            </div>
            <button
              onClick={() => { setRemoving(true); setTimeout(onRemove, 220); }}
              className="m-pressable inline-flex items-center gap-2 rounded-full px-4 py-2 t-label-l"
              style={{
                minHeight: 40,
                background: 'rgba(0,0,0,0.06)',
                color: 'var(--m-on-success-container)',
              }}
            >
              <IconTrash size={18} /> Remove promo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
