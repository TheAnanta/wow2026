'use client';
import '../../components/payment/checkout.css';
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  IconSignOut, IconUser, IconCheck, IconBack, IconMenu, IconShield, IconSparkle
} from "@/components/payment/Icons";
import { useRouter } from "next/navigation";

const TopBar = ({ scrolled, onBack }: { scrolled: boolean; onBack: () => void }) => (
  <header
    className={`flex items-center ${scrolled ? 'scrolled-shadow' : ''} transition-shadow sticky top-0 z-[50]`}
    style={{ height: 56, background: 'var(--m-surface)', borderBottom: scrolled ? 'none' : '1px solid var(--m-outline-variant)' }}
  >
    <div className="flex-1 flex items-center gap-2 px-4 max-w-[1200px] mx-auto w-full">
      <button onClick={onBack} className="m-pressable rounded-full flex items-center justify-center -ml-2"
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
          Arcade
        </span>
      </div>
      <button className="m-pressable rounded-full flex items-center justify-center -mr-2"
        style={{ width: 48, height: 48, color: 'var(--m-on-surface)' }} aria-label="Menu">
        <IconMenu size={24} />
      </button>
    </div>
  </header>
);

function BadgeGrid({ badges }: { badges: any[] }) {
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  return (
    <div className="w-full">
      <section className="p-6 rounded-3xl" style={{ background: 'var(--m-surface-container-low)' }}>
        <h2 className="t-title-l mb-8">Badges earned</h2>
        {badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {badges.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setSelectedBadge(item)}
              >
                <div className="relative w-full aspect-square flex items-center justify-center p-4 rounded-2xl transition-all group-hover:scale-105 group-hover:bg-black/5 dark:group-hover:bg-white/5">
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: 'var(--m-primary)' }}></div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
                <p className="t-label-m mt-3 text-center line-clamp-1">
                  {item.name}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <IconCheck size={12} style={{ color: 'var(--m-success)' }} />
                  <span className="t-label-s opacity-60">EARNED</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-3xl" style={{ background: 'var(--m-surface-container-high)' }}>
            <p className="t-body-m opacity-60 mb-6">No badges earned yet.</p>
            <a href="/payment" className="m-cta h-10 px-6 rounded-full inline-flex items-center" style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}>
              Explore Arcade &rarr;
            </a>
          </div>
        )}
      </section>

      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
          <div className="bg-white dark:bg-[#1b1b21] w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--m-outline-variant)' }}>
            <div className="flex flex-col md:flex-row p-8 gap-8">
              <div className="w-full md:w-1/3 flex justify-center items-start">
                <img
                  src={selectedBadge.image}
                  alt={selectedBadge.name}
                  className="w-40 h-40 object-contain drop-shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h3 className="t-headline-s mb-2">{selectedBadge.name}</h3>
                <div className="inline-flex items-center px-3 py-1 rounded-full t-label-s mb-6" style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}>
                  WOW 2026 OFFICIAL BADGE
                </div>
                <p className="t-body-m opacity-80 leading-relaxed mb-6">
                  {selectedBadge.description || "This badge recognizes your commitment to learning and growing within the Google developer ecosystem."}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: 'var(--m-outline-variant)' }}>
                  <p className="t-label-l">Share achievement:</p>
                  <div className="flex gap-4">
                    {['facebook', 'twitter', 'linkedin'].map(p => (
                      <button key={p} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: 'var(--m-outline-variant)' }}>
                        <img src={`https://www.gstatic.com/devrel-devsite/prod/v4d48f48533ab79e337c1ef540cdee78fc2ebfef5357fb91b7a6b4a7aa8d0c6c8/images/share_${p}.svg`} alt="" className="w-5 h-5 brightness-50 dark:brightness-100" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 flex justify-end" style={{ background: 'var(--m-surface-container-low)' }}>
              <button
                onClick={() => setSelectedBadge(null)}
                className="m-cta h-12 px-8 rounded-full t-label-l"
                style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileCard({ userDetails, badgesCount }: { userDetails: any; badgesCount: number }) {
  return (
    <div className="w-full rounded-[32px] p-8 relative overflow-hidden" style={{ background: 'var(--m-surface-container-low)' }}>
      <div className="flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-6">
          <img
            src={userDetails.photoURL?.replace("=s96-c", "") || userDetails.profile_url?.replace("=s96-c", "") || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover border-4"
            style={{ borderColor: 'var(--m-surface)' }}
          />
        </div>

        <h2 className="t-headline-s">{userDetails.displayName || `${userDetails.first_name || ""} ${userDetails.last_name || ""}`.trim()}</h2>
        <p className="t-body-m opacity-70 mt-1">{userDetails.designation} at {userDetails.organization}</p>

        {userDetails.username && (
          <a
            href={`https://wow.vizag.dev/p/${userDetails.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full border t-label-m hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            style={{ borderColor: 'var(--m-outline-variant)' }}
          >
            wow.vizag.dev/p/{userDetails.username}
            <IconSparkle size={16} />
          </a>
        )}

        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 rounded-2xl text-left" style={{ background: 'var(--m-surface-container-high)' }}>
            <div className="t-label-s opacity-60 uppercase mb-1">Badges</div>
            <div className="t-headline-s">{badgesCount}</div>
          </div>
          <div className="p-4 rounded-2xl text-left" style={{ background: 'var(--m-surface-container-high)' }}>
            <div className="t-label-s opacity-60 uppercase mb-1">Rank</div>
            <div className="t-headline-s">#87</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, profile, tickets, isLoading } = useAuth();
  const [badges, setBadges] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (tickets && tickets.length > 0) {
      const derivedBadges: any[] = [];
      const hasArcade = tickets.some((t: any) => (t.tier?.name || t.name || "").toLowerCase().includes("arcade") || (t.tier?.name || t.name || "").toLowerCase().includes("wow"));
      const hasAttendee = tickets.some((t: any) => (t.tier?.name || t.name || "").toLowerCase().includes("early bird") || (t.tier?.name || t.name || "").toLowerCase().includes("regular") || (t.tier?.name || t.name || "").toLowerCase().includes("attendee"));

      if (hasAttendee) derivedBadges.push({ id: "wow-attendee", name: "WOW 2026 - Attendee", image: "/images/io24-badge-registration.svg", description: "Awarded to confirmed attendees of Google for Developers WOW 2026." });
      if (hasArcade) derivedBadges.push({ id: "wow-plus-explorer", name: "WOW+ Insider - Explorer", image: "/images/wow26-arcade-badge-registration.png", description: "Awarded to members of the WOW+ Experience community." });
      setBadges(derivedBadges);
    } else {
      setBadges([]);
    }
  }, [tickets]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--m-primary)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="checkout-root min-h-screen flex flex-col" style={{ background: 'var(--m-surface)' }}>
        <TopBar scrolled={scrolled} onBack={() => router.push('/')} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-3xl" style={{ background: 'var(--m-primary-container)', color: 'var(--m-primary)' }}>
            <IconUser size={48} />
          </div>
          <h1 className="t-headline-m mb-4">Your Arcade profile</h1>
          <p className="t-body-l mb-10 max-w-sm opacity-70">Sign in to view your earned badges and manage your event journey.</p>
          <a href="/register" className="m-cta h-14 px-8 rounded-full flex items-center gap-3" style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}>Sign In / Register</a>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-root min-h-screen flex flex-col" style={{ background: 'var(--m-surface)' }}>
      <TopBar scrolled={scrolled} onBack={() => router.push('/')} />

      <main className="max-w-[1200px] mx-auto w-full px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-[380px] space-y-6 lg:sticky lg:top-24 toast-in">
            <h1 className="t-headline-m">My Profile</h1>
            {profile && (
              <ProfileCard
                userDetails={profile}
                badgesCount={badges.length}
              />
            )}

            <div className="flex flex-col gap-3">
              <a href="/register?update=true" className="m-cta h-12 rounded-full flex items-center justify-center t-label-l border" style={{ borderColor: 'var(--m-outline-variant)' }}>
                Edit Profile
              </a>
              <button
                onClick={() => {
                  import("@/services/firebase").then(({ logout }) => {
                    logout().then(() => { window.location.href = "/"; });
                  });
                }}
                className="m-pressable h-12 rounded-full flex items-center justify-center gap-2 t-label-l opacity-60"
              >
                <IconSignOut size={18} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="toast-in" style={{ animationDelay: '100ms' }}>
              <BadgeGrid badges={badges} />
            </div>

            <section className="p-8 rounded-[32px] toast-in"
              style={{
                background: 'var(--m-surface-container-lowest)',
                animationDelay: '200ms'
              }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--m-secondary-container)', color: 'var(--m-on-surface)' }}>
                  <IconShield size={24} />
                </div>
                <h2 className="t-title-l">Event Tickets</h2>
              </div>

              {tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((t: any, i: number) => (
                    <div key={i} className="p-6 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ background: 'var(--m-surface)', borderColor: 'var(--m-outline-variant)' }}>
                      <div>
                        <h4 className="t-title-m">{t.tier?.name || t.name || "Attendee Pass"}</h4>
                        <p className="t-label-s mt-1 opacity-50">ORDER #{t.gateway_order_id?.slice(-8).toUpperCase()}</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 t-label-m" style={{ color: 'var(--m-success)', borderColor: 'var(--m-success)' }}>
                        <IconCheck size={16} stroke={3} />
                        CONFIRMED
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--m-surface-container-high)' }}>
                  <p className="t-body-m opacity-60 mb-6">No tickets purchased yet.</p>
                  <a href="/payment" className="m-cta h-10 px-6 rounded-full inline-flex items-center" style={{ background: 'var(--m-primary)', color: 'var(--m-on-primary)' }}>
                    Get Tickets &rarr;
                  </a>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
