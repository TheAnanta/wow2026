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
      <div className="p-6 bg-white dark:bg-grey rounded-2xl border-2 border-grey-bg dark:border-grey-bg/20">
        <h2 className="text-2xl font-medium mb-8">Badges earned</h2>
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
                <p className="text-sm font-medium mt-3 text-center line-clamp-1">
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
          <div className="bg-white dark:bg-grey w-full max-w-2xl rounded-2xl border-2 border-grey-900 overflow-hidden shadow-2xl">
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
            <div className="bg-grey-bg dark:bg-grey-900/50 p-4 flex justify-end">
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
            src={userDetails.photoURL || userDetails.profile_url || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-grey shadow-lg"
          />
        </div>
      </div>

      <div className="w-full bg-white dark:bg-grey border-2 border-grey-900 rounded-[32px] p-8 pt-24 shadow-sm relative">
        <div
          className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-48 h-24 bg-white dark:bg-grey border-x-2 border-b-2 border-grey-900 z-0 rounded-b-[48px]"
          style={{ clipPath: 'inset(0 -10px -10px -10px)' }}
        />

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center justify-center gap-2">
            {userDetails.displayName || `${userDetails.first_name || ""} ${userDetails.last_name || ""}`.trim() || "Developer"}
            {tickets.length > 0 && <MdCheckCircle className="text-google-blue" title="Registered" />}
          </h2>
          {userDetails.username && (
            <p className="text-google-blue font-medium mb-4">@{userDetails.username}</p>
          )}

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {tickets.length > 0 ? (
              tickets.map((t: any, i: number) => (
                <span key={i} className="px-4 py-1.5 bg-google-green/10 text-google-green border border-google-green/20 rounded-full text-xs font-bold uppercase tracking-wider">
                  {t.tier?.name || t.name || "Attendee Pass"}
                </span>
              ))
            ) : (
              <span className="px-4 py-1.5 bg-grey-bg text-grey-600 rounded-full text-xs font-bold uppercase tracking-wider">
                No Tickets Yet
              </span>
            )}
          </div>

          <div className="text-left space-y-4 mb-8">
            {userDetails.bio && (
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-grey-500 mb-1">Bio</p>
                <p className="text-sm text-grey-700 dark:text-grey-300">{userDetails.bio}</p>
              </div>
            )}
            {userDetails.city && (
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-grey-500 mb-1">Location</p>
                <p className="text-sm font-medium">{userDetails.city}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-grey-500 mb-1">Stats</p>
              <p className="text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-google-yellow"></span>
                {badgesCount} Badges earned
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="/register"
              className="cta-primary w-full max-w-none text-sm! text-center"
            >
              Update Profile
            </a>
            <button
              onClick={() => {
                import("@/services/firebase").then(({ auth }) => {
                  auth.signOut().then(() => {
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
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    if (tickets && tickets.length > 0) {
      const derivedBadges: any[] = [];

      const hasArcade = tickets.some((t: any) =>
        (t.tier?.name || t.name || "").toLowerCase().includes("arcade")
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
          id: "arcade-explorer",
          name: "Arcade Insider - Explorer",
          image: "/images/wow26-arcade-badge-registration.png",
          description: "Awarded to members of the WOW Arcade community. This badge recognizes your commitment to learning and growing within the Google developer ecosystem."
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
    <div className="min-h-screen bg-white dark:bg-grey-900 transition-colors">
      <Header onRegisterClick={() => { }} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          {/* Profile Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h1 className="l-h2 mb-2">Profile</h1>
            <p className="text-sm text-grey-600 dark:text-grey-400 mb-12">
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
            <div className="p-8 bg-grey-bg/30 dark:bg-white/5 rounded-[32px] border-2 border-grey-bg dark:border-white/10">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Your Tickets</h2>
              {tickets.length > 0 ? (
                <div className="grid gap-4">
                  {tickets.map((t: any, i: number) => (
                    <div key={i} className="bg-white dark:bg-grey p-6 rounded-2xl border-2 border-grey-900 flex justify-between items-center group">
                      <div>
                        <h4 className="font-bold text-lg">{t.tier?.name || t.name || "Attendee Pass"}</h4>
                        <p className="text-xs text-grey-500 uppercase font-black tracking-widest mt-1">Order #{t.gateway_order_id?.slice(-8) || "N/A"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-google-green bg-google-green/10 px-3 py-1 rounded-full border border-google-green/20">CONFIRMED</span>
                        <MdCheckCircle className="text-google-green text-2xl" />
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
          </div>
        </div>
      </main>

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
