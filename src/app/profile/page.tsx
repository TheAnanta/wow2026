"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import {
  FiGlobe,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { Header } from "@/components/sections/Header";
import { GroupInviteModal } from "@/components/payment/GroupInviteModal";
import React from "react";

const getSocialIconComponent = (providerValue?: string) => {
  switch (providerValue) {
    case "instagram":
      return <FiInstagram />;
    case "github":
      return <FiGithub />;
    case "linkedin":
      return <FiLinkedin />;
    case "website":
      return <FiGlobe />;
    default:
      return <FiGlobe />;
  }
};

function BadgeGrid({ badges }: { badges: any[] }) {
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  return (
    <div className="w-full">
      <div className="p-6 bg-white dark:bg-grey! rounded-2xl border-2 border-grey-bg dark:border-grey-bg/20">
        <h2 className="text-2xl font-medium mb-8 tracking-tight">Badges earned</h2>
        {badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {badges.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setSelectedBadge(item)}
              >
                <div className="relative w-full aspect-square flex items-center justify-center p-2 rounded-xl transition-transform group-hover:scale-105">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-medium mt-3 text-center line-clamp-1 tracking-tight">
                  {item.name}
                </p>
                <p className="text-[10px] text-google-blue font-bold uppercase tracking-widest mt-1">
                  Earned
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-grey-bg dark:border-white/10 rounded-2xl">
            <p className="text-grey-500 mb-4">No badges earned yet.</p>
            <a href="/payment" className="text-google-blue font-bold hover:underline">Get your first badge &rarr;</a>
          </div>
        )}
      </div>

      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
          <div className="bg-white dark:bg-grey! w-full max-w-2xl rounded-2xl border-2 border-grey-900 overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row p-8 gap-8">
              <div className="w-full md:w-1/3 flex justify-center items-start">
                <img
                  src={selectedBadge.image}
                  alt={selectedBadge.name}
                  className="w-40 h-40 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold tracking-tight mb-2">
                  {selectedBadge.name}
                </h3>
                <p className="font-bold text-google-blue uppercase tracking-widest text-xs mb-4">
                  Earned on WOW 2026 Journey
                </p>
                <p className="text-grey-700 dark:text-grey-300 leading-relaxed mb-6">
                  {selectedBadge.description || "This badge was awarded for participating in the Google for Developers WOW 2026 journey. Track your progress and earn more badges by attending sessions and workshops."}
                </p>
                <div className="flex items-center gap-4 border-t border-grey-bg pt-6">
                  <p className="text-sm font-bold text-grey-900 dark:text-white">Share:</p>
                  <div className="flex gap-4">
                    <FiInstagram className="text-xl cursor-pointer hover:text-google-blue transition-colors" />
                    <FiLinkedin className="text-xl cursor-pointer hover:text-google-blue transition-colors" />
                    <FiTwitter className="text-xl cursor-pointer hover:text-google-blue transition-colors" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-grey-bg dark:bg-grey-900/50! p-4 flex justify-end">
              <button
                onClick={() => setSelectedBadge(null)}
                className="cta-secondary text-sm! py-2! px-6!"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileCard({
  userDetails,
  badgesCount,
  tickets,
}: {
  userDetails: any;
  badgesCount: number;
  tickets: any[];
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative z-10">
        <div className="relative size-44 mb-[-88px]">
          <img
            src={
              userDetails.photoURL?.replace("=s96-c", "") || userDetails.profile_url?.replace("=s96-c", "") || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full rounded-full object-cover border-2 border-black dark:border-grey"
          />
        </div>
      </div>

      <div className="w-full bg-white dark:bg-grey! border-2 border-grey-900 rounded-[32px] p-8 pt-24 shadow-sm relative">
        <div
          className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-48 h-24 bg-white dark:bg-grey! border-x-2 border-b-2 border-grey-900 z-0 rounded-b-full"
          style={{ clipPath: 'inset(0 -10px -10px -10px)' }}
        />

        <div className="text-center mt-4">
          <h2 className="text-3xl font-bold tracking-tighter flex items-center justify-center gap-2">
            {userDetails.displayName || `${userDetails.first_name || ""} ${userDetails.last_name || ""}`.trim() || "Developer"}
          </h2>
          {userDetails.organization &&
            userDetails.designation && (
              <p className="text-gray-700 dark:text-gray-400 text-base">
                {userDetails.designation},{" "}
                {userDetails.organization}
              </p>
            )}
          {userDetails.communityTitle && (
            <p className="text-gray-700 dark:text-gray-400 text-base">
              {userDetails.communityTitle}
            </p>
          )}
          {userDetails.username && (
            <a
              href={`https://wow.vizag.dev/p/${userDetails.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-max mx-auto flex items-center gap-1 mt-3 border-2 border-grey-900 text-grey-900 font-medium px-6 py-2 rounded-full text-sm no-underline hover:bg-gray-50"
            >
              wow.vizag.dev/p/{userDetails.username}{" "}
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px" fill="#1a73e8"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" /></svg>
            </a>
          )}

          <div className="text-left space-y-4 mb-8 mt-8">
            {userDetails.speaker && (
              <>
                <p className="font-semibold mt-2 mb-1">Talk Title</p>{" "}
                <p>{userDetails.speaker.talk || "N/a"}</p>
              </>
            )}
            {userDetails.city && userDetails.city !== "" && (
              <>
                <p className="font-semibold mt-2 mb-1">City/Town</p>{" "}
                <p>{userDetails.city}</p>
              </>
            )}
            {userDetails.bio && userDetails.bio !== "" && (
              <>
                <p className="font-semibold mt-2 mb-1">Bio</p>{" "}
                <p>{userDetails.bio}</p>
              </>
            )}
            {userDetails.interests &&
              userDetails.interests.length > 0 && (
                <>
                  <p className="font-semibold mt-2 mb-2">
                    Domains Interested
                  </p>{" "}
                  <div className="flex flex-wrap">
                    {userDetails.interests.map(
                      (domain: any, index: any) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-[#000000]/9 px-3 min-h-8 text-sm m-1 tracking-tight font-medium"
                        >
                          {" "}
                          {domain}
                        </span>
                      )
                    )}
                  </div>
                </>
              )}
            {/* Stats */}
            <p className="font-semibold mt-2 mb-1">Stats</p>{" "}
            <p className="flex items-center gap-1 tracking-tight font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#202023"><path d="M371.01-324 480-390.22 589-324l-29-124 97-84-127-11-50-117-50 117-127 11 96.89 83.95L371.01-324ZM480-62.91 358.8-183.87H183.87V-358.8L62.91-480l120.96-121.2v-174.93H358.8L480-897.33l121.2 121.2h174.93v174.93L897.33-480l-121.2 121.2v174.93H601.2L480-62.91Zm0-117.31 86.65-86.65h126.48v-126.48L779.78-480l-86.65-86.65v-126.48H566.65L480-779.78l-86.65 86.65H266.87v126.48L180.22-480l86.65 86.65v126.48h126.48L480-180.22ZM480-480Z" /></svg>
              {badgesCount} • Badges earned
            </p>{" "}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <a
              href="/register"
              className="cta-primary w-full max-w-none text-sm! text-center"
            >
              Update Profile
            </a>
            <button
              onClick={() => {
                import("@/services/firebase").then(({ logout }) => {
                  logout().then(() => {
                    window.location.href = "/";
                  });
                });
              }}
              className="cta-secondary w-full max-w-none text-sm! flex items-center justify-center gap-2"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, profile, tickets, isLoading } = useAuth();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [badges, setBadges] = useState<any[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [groupOrderId, setGroupOrderId] = useState<string | null>(null);
  const [generatedCodes, setGeneratedCodes] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const isMockGroup = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
    searchParams?.get('mockGroup') === 'true';

  React.useEffect(() => {
    if (isMockGroup && typeof window !== 'undefined') {
      const saved = localStorage.getItem('wow_mock_group_invites');
      if (saved) {
        setGeneratedCodes(JSON.parse(saved));
      }
    }
  }, [isMockGroup]);

  useEffect(() => {
    if (tickets && tickets.length > 0) {
      const derivedBadges: any[] = [];

      const hasArcade = tickets.some((t: any) =>
        (t.tier?.name || t.name || "").toLowerCase().includes("arcade") || (t.tier?.name || t.name || "").toLowerCase().includes("wow")
      );

      const hasAttendee = tickets.some((t: any) =>
        (t.tier?.name || t.name || "").toLowerCase().includes("early bird") ||
        (t.tier?.name || t.name || "").toLowerCase().includes("regular") ||
        (t.tier?.name || t.name || "").toLowerCase().includes("attendee")
      );

      if (hasAttendee) {
        derivedBadges.push({
          id: "wow-attendee",
          name: "WOW 2026 - Attendee",
          image: "/images/io24-badge-registration.svg",
          description: "Awarded to confirmed attendees of Google for Developers WOW 2026. This badge confirms your registration and grants you access to the main event."
        });
      }

      if (hasArcade) {
        derivedBadges.push({
          id: "wow-plus-explorer",
          name: "WOW+ Insider - Explorer",
          image: "/images/wow26-arcade-badge-registration.png",
          description: "Awarded to members of the WOW+ Experience community. This badge recognizes your commitment to learning and growing within the Google developer ecosystem."
        });
      }

      setBadges(derivedBadges);
    }
  }, [tickets]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-google-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header onRegisterClick={() => { }} />
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <h1 className="l-h2 mb-4">Profile</h1>
          <p className="s-p1 text-grey-700 mb-8">Please sign in to view your profile and badges.</p>
          <a href="/register" className="cta-primary inline-block">Sign In / Register</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-grey-900! transition-colors">
      <Header onRegisterClick={() => { }} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          {/* Profile Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h1 className="l-h2 mb-2">Profile</h1>
            <p className="text-sm text-grey-600 dark:text-grey-400 mb-12 max-w-[36ch]">
              Manage your developer profile and track your progress through the WOW 2026 journey.
            </p>
            {profile && (
              <ProfileCard
                userDetails={profile}
                badgesCount={badges.length}
                tickets={tickets}
              />
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            <BadgeGrid badges={badges} />

            {/* Tickets Section */}
            <div className="p-8 bg-grey-bg dark:bg-white/5 rounded-[32px] border-2 border-grey-900 dark:border-white/10">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Your Tickets</h2>
              {tickets.length > 0 ? (
                <div className="grid gap-4">
                  {tickets.map((t: any, i: number) => (
                    <div key={i} className="bg-white dark:bg-grey! p-6 rounded-2xl border-2 border-grey-900 flex justify-between items-center group">
                      <div>
                        <h4 className="font-bold text-lg tracking-tight">{t.tier?.name || t.name || "Attendee Pass"}</h4>
                        <p className="text-xs text-grey-500 uppercase font-black tracking-widest mt-1">Order #{t.gateway_order_id?.slice(-8) || "N/A"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold bg-google-green px-4 py-2 rounded-full border-2 border-grey-900">CONFIRMED</span>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-grey-bg dark:border-white/10 rounded-2xl">
                  <p className="text-grey-500 mb-4">No tickets purchased yet.</p>
                  <a href="/payment" className="text-google-blue font-bold hover:underline">Browse Tickets &rarr;</a>
                </div>
              )}
            </div>

            {/* Squad Management Section */}
            {(isMockGroup || tickets.some((t: any) => t.order?.coupon_code === 'BETTERTOGETHER')) && (
              <div className="p-8 rounded-[32px] border-2 border-grey-900 overflow-hidden relative group"
                style={{ background: 'var(--m-surface-container-low)' }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-none"
                      style={{ background: 'var(--m-primary-container)', color: 'var(--m-on-primary-container)' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">Manage your Squad</h3>
                      <p className="text-grey-600 dark:text-grey-400">You have 4 group passes to distribute</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const groupTicket = tickets.find((t: any) => t.order?.coupon_code === 'BETTERTOGETHER');
                      setGroupOrderId(groupTicket?.order_id || 'order_MOCK_123');
                      setShowInviteModal(true);
                    }}
                    className="cta-primary w-full md:w-auto px-8"
                  >
                    Manage Invites
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showInviteModal && groupOrderId && (
        <GroupInviteModal
          orderId={groupOrderId}
          isMock={isMockGroup}
          onFinish={() => setShowInviteModal(false)}
        />
      )}

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
