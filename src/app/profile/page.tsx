"use client";

import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  getCountFromServer,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { Fragment, useEffect, useRef, useState } from "react";
import { FaSpinner, FaTimes, FaWhatsapp } from "react-icons/fa";
import {
  FiGlobe,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { MdLock, MdOutlineEmail, MdEdit, MdCheckCircle } from "react-icons/md";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import arcadeJson from "@/data/arcade.json";
import mainData from "@/data/config.json";
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {badges.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setSelectedBadge(item)}
            >
              <div className="relative w-full aspect-square flex items-center justify-center p-2 rounded-xl bg-grey-bg/30 dark:bg-white/5 transition-transform group-hover:scale-105">
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className={`w-full h-full object-contain ${
                    !item.earned ? "grayscale opacity-30" : ""
                  }`}
                />
                {!item.earned && (
                  <MdLock className="absolute inset-0 m-auto text-grey-400 text-3xl" />
                )}
              </div>
              <p className="text-sm font-medium mt-3 text-center line-clamp-1">
                {item.name}
              </p>
              <p className="text-[10px] text-grey-500 font-bold uppercase tracking-widest mt-1">
                {item.date === "Not earned" ? "Locked" : item.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Dialog Replacement using standard Tailwind */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
          <div className="bg-white dark:bg-grey w-full max-w-2xl rounded-2xl border-2 border-grey-900 overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row p-8 gap-8">
              <div className="w-full md:w-1/3 flex justify-center items-start">
                <img
                  src={`/images/${selectedBadge.image}`}
                  alt={selectedBadge.name}
                  className="w-40 h-40 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold tracking-tight mb-2">
                  {selectedBadge.name}
                </h3>
                <p className="font-bold text-google-blue uppercase tracking-widest text-xs mb-4">
                  {selectedBadge.date === "Not earned"
                    ? "Coming Soon"
                    : "Earned on " + selectedBadge.date}
                </p>
                <p className="text-grey-700 dark:text-grey-300 leading-relaxed mb-6">
                  {selectedBadge.description}
                </p>
                {selectedBadge.earned ? (
                  <div className="flex items-center gap-4 border-t border-grey-bg pt-6">
                    <p className="text-sm font-bold text-grey-900 dark:text-white">Share:</p>
                    <div className="flex gap-4">
                      <FiInstagram className="text-xl cursor-pointer hover:text-google-blue transition-colors" />
                      <FiLinkedin className="text-xl cursor-pointer hover:text-google-blue transition-colors" />
                      <FiTwitter className="text-xl cursor-pointer hover:text-google-blue transition-colors" />
                      <FaWhatsapp className="text-xl cursor-pointer hover:text-google-blue transition-colors" />
                    </div>
                  </div>
                ) : (
                  selectedBadge.link && (
                    <a
                      href={selectedBadge.link}
                      className="cta-primary inline-block text-center"
                    >
                      Claim now
                    </a>
                  )
                )}
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
  setUserDetails,
  badgesCount,
  tickets,
}: {
  userDetails: any;
  setUserDetails: any;
  badgesCount: number;
  tickets: any[];
}) {
  const [showEditor, setShowEditor] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const headshotFileInputRef = useRef<HTMLInputElement>(null);

  const availableDomains = [
    { label: "Web Development", value: "Web" },
    { label: "Mobile Development", value: "Mobile" },
    { label: "Cloud Computing", value: "Cloud" },
    { label: "Artificial Intelligence", value: "AI" },
    { label: "Career Development", value: "Career" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
  ];

  const socialProviders = [
    { label: "Instagram", value: "instagram" },
    { label: "GitHub", value: "github" },
    { label: "LinkedIn", value: "linkedin" },
    { label: "Website", value: "website" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleDomainsChange = (domainValue: string, checked: boolean) => {
    const currentDomains = userDetails.domainsInterested || [];
    let newDomains: string[];
    if (checked) {
      newDomains = [...currentDomains, domainValue];
    } else {
      newDomains = currentDomains.filter((d: string) => d !== domainValue);
    }
    setUserDetails({ ...userDetails, domainsInterested: newDomains });
  };

  const addNewSocial = () => {
    const socials = userDetails.socials || [];
    const used = socials.map((s: any) => s.provider);
    const unused = socialProviders.find((p) => !used.includes(p.value));

    if (unused) {
      setUserDetails({
        ...userDetails,
        socials: [...socials, { provider: unused.value, name: "" }],
      });
    }
  };

  const removeSocial = (index: number) => {
    const socials = [...(userDetails.socials || [])];
    socials.splice(index, 1);
    setUserDetails({ ...userDetails, socials });
  };

  const handleSocialChange = (index: number, field: string, value: string) => {
    const socials = [...(userDetails.socials || [])];
    socials[index] = { ...socials[index], [field]: value };
    setUserDetails({ ...userDetails, socials });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setIsSubmitLoading(true);

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const updateDataFlat = {
        username: userDetails.username?.toLowerCase() || "",
        displayName: userDetails.displayName || "",
        city: userDetails.city || "",
        bio: userDetails.bio || "",
        domainsInterested: userDetails.domainsInterested || [],
        socials: (userDetails.socials || []).map((s: any) => ({
          provider: s.provider,
          name: s.name,
        })),
      };

      await updateDoc(userDocRef, updateDataFlat);
      setShowEditor(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && auth.currentUser) {
      setIsUploadingFile(true);
      const fileRef = storageRef(storage, `headshots/${auth.currentUser.uid}/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, "users", auth.currentUser.uid), { photoURL: downloadURL });
        setUserDetails({ ...userDetails, photoURL: downloadURL });
        alert("Avatar updated!");
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploadingFile(false);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative z-10">
        <div className="relative size-44 mb-[-88px]">
          <img
            src={userDetails.photoURL || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-grey shadow-lg"
          />
          <button
            onClick={() => headshotFileInputRef.current?.click()}
            className="absolute bottom-2 right-2 p-2 bg-google-blue text-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <MdEdit size={18} />
          </button>
          <input
            type="file"
            ref={headshotFileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {isUploadingFile && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-white dark:bg-grey border-2 border-grey-900 rounded-[32px] p-8 pt-24 shadow-sm relative">
        {/* I/O 24 Style Cutout Decoration */}
        <div 
          className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-48 h-24 bg-white dark:bg-grey border-x-2 border-b-2 border-grey-900 z-0 rounded-b-[48px]"
          style={{ clipPath: 'inset(0 -10px -10px -10px)' }}
        />

        {!showEditor ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center justify-center gap-2">
              {userDetails.displayName}
              {tickets.length > 0 && <MdCheckCircle className="text-google-blue" title="Registered" />}
            </h2>
            {userDetails.username && (
              <p className="text-google-blue font-medium mb-4">@{userDetails.username}</p>
            )}
            
            {/* Tickets Status */}
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
              <button
                onClick={() => setShowEditor(true)}
                className="cta-primary w-full max-w-none text-sm!"
              >
                Update Profile
              </button>
              <button
                onClick={() => {
                  auth.signOut();
                  window.location.href = "/";
                }}
                className="cta-secondary w-full max-w-none text-sm!"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-grey-500 mb-2 px-2">Username</label>
                <input
                  type="text"
                  value={userDetails.username || ""}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full px-4 py-3 bg-grey-bg/50 dark:bg-white/5 border-2 border-transparent focus:border-grey-900 rounded-xl transition-all outline-none"
                  placeholder="Username"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-grey-500 mb-2 px-2">Display Name</label>
                <input
                  type="text"
                  value={userDetails.displayName || ""}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  className="w-full px-4 py-3 bg-grey-bg/50 dark:bg-white/5 border-2 border-transparent focus:border-grey-900 rounded-xl transition-all outline-none"
                  placeholder="Display Name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-grey-500 mb-2 px-2">City/Town</label>
                <input
                  type="text"
                  value={userDetails.city || ""}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-3 bg-grey-bg/50 dark:bg-white/5 border-2 border-transparent focus:border-grey-900 rounded-xl transition-all outline-none"
                  placeholder="City/Town"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-grey-500 mb-2 px-2">Bio</label>
                <textarea
                  value={userDetails.bio || ""}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full px-4 py-3 bg-grey-bg/50 dark:bg-white/5 border-2 border-transparent focus:border-grey-900 rounded-xl transition-all outline-none h-24 resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitLoading}
                className="cta-primary flex-1 flex justify-center items-center gap-2"
              >
                {isSubmitLoading && <FaSpinner className="animate-spin" />}
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowEditor(false)}
                className="cta-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, profile, tickets, isLoading } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    if (profile) {
      setUserData(profile);
    }
  }, [profile]);

  useEffect(() => {
    const loadBadges = async () => {
      if (!user) return;
      
      const arcadeDataRef = collection(db, "users", user.uid, "arcade");
      const arcadeData = await getDocs(arcadeDataRef);
      const earnedBadges: any = {};
      
      arcadeData.forEach((doc) => {
        const data = doc.data();
        if (data.quizCompleted) {
          earnedBadges[doc.id] = data;
        }
      });

      const processedBadges = arcadeJson.map((item: any) => ({
        ...item.badge,
        earned: !!earnedBadges[item.badge.id],
        date: earnedBadges[item.badge.id] 
          ? new Date(earnedBadges[item.badge.id].timestamp?.toDate()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : "Not earned",
        description: earnedBadges[item.badge.id] ? item.badge.description.earned : item.badge.description.default
      }));

      setBadges(processedBadges);
    };

    if (user && !isLoading) loadBadges();
  }, [user, isLoading]);

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
        <Header onRegisterClick={() => {}} />
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
      <Header onRegisterClick={() => {}} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          {/* Profile Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <h1 className="l-h2 mb-2">Profile</h1>
            <p className="text-sm text-grey-600 dark:text-grey-400 mb-12">
              Manage your developer profile and track your progress through the WOW 2026 journey.
            </p>
            {userData && (
              <ProfileCard
                userDetails={userData}
                setUserDetails={setUserData}
                badgesCount={badges.filter(b => b.earned).length}
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
