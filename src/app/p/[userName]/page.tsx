/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { FaSpinner, FaTimes, FaWhatsapp } from "react-icons/fa";
import {
  FiGlobe,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import moment from "moment";
import arcadeJson from "@/data/arcade.json";

import { MdLock, MdOutlineEmail } from "react-icons/md"; // Material Design Icons

import { useParams } from "next/navigation";
import mainData from "@/data/config.json";

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
      return <FiGlobe />; // Default icon
  }
};

function BadgeGrid({ user, badges }: { user: any; badges: any[] }) {
  // State to manage which badge's dialog is open (index in the badges array)
  const [openBadgeIndex, setOpenBadgeIndex] = useState(null);

  const closeDialog = () => setOpenBadgeIndex(null);
  const openDialog = (index: any) => setOpenBadgeIndex(index);

  // Get the data for the currently selected badge
  const selectedBadge = openBadgeIndex !== null ? badges[openBadgeIndex] : null;

  return (
    // <v-col md="8" sm="12"> translated to a div with responsive width
    // Added mx-auto for centering if it's not already in a centered container
    <div className="w-full mx-auto">
      {/* <v-card class="pa-3"> translated */}
      <div className="p-4 bg-white rounded-lg shadow-md border-gray-200 border">
        {" "}
        {/* pa-3 -> p-4, added shadow/rounded */}
        {/* <h2 v-if="!user" ...> translated */}
        {!user && (
          <h2 className="mb-8 mx-4 text-2xl font-semibold">
            Login to view profile!
          </h2>
        )}
        {/* <v-row> translated */}
        <div className="flex flex-wrap">
          {" "}
          {/* flex container, negative margin to counter col padding */}
          {/* <v-col v-for="..."> translated */}
          {badges.map((item, index) => (
            // cols="6" sm="6" md="3" translated to responsive width classes
            // px-4 adds horizontal padding, mb-8 adds bottom margin for vertical spacing
            <div key={index} className="w-full sm:w-1/2 md:w-1/4 mb-8">
              {/* v-dialog activator content */}
              {/* The clickable badge item */}
              <div
                className="flex flex-col items-center justify-center p-4 cursor-pointer h-full" // p-4 similar to v-container padding
                onClick={() => openDialog(index)}
              >
                <div className="relative w-[70%] flex my-auto max-h-32">
                  {" "}
                  {/* 70% width div */}
                  <img
                    src={`/images/arcade/badges/${item.image}`} // Adjust path if needed, assuming public dir
                    alt={item.name}
                    className={`w-full block ${
                      !item.earned ? "grayscale opacity-30" : ""
                    }`} // Conditional styles
                  />
                  {!item.earned && (
                    // Lock icon positioned absolutely
                    <MdLock className="absolute inset-0 mx-auto my-auto flex items-center justify-center text-gray-600 text-4xl" /> // Center using flex on absolute div, text size
                  )}
                </div>
                <p className="text-base font-semibold mt-2 text-center">
                  {item.name}
                </p>{" "}
                {/* Font size/weight, spacing */}
                {item.date !== "Not earned" && (
                  <p className="text-sm text-gray-600 font-medium text-center opacity-60">
                    {item.date}
                  </p>
                )}
                {item.date === "Not earned" && (
                  <button className="cursor-pointer text-sm border border-black py-1 px-3 rounded-full mt-1 flex items-center">
                    {" "}
                    {/* Button styles */}
                    Learn More{" "}
                    <span className="material-symbols-outlined ml-1 !text-sm">
                      arrow_forward
                    </span>{" "}
                    {/* Arrow icon */}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dialog Component (using Headless UI) */}
      {/* Rendered outside the loop, but its content depends on selectedBadge */}
      <Transition show={openBadgeIndex !== null} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          {" "}
          {/* z-index to appear on top */}
          {/* Backdrop overlay */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          {/* Full-screen container to center the dialog */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              {/* Dialog Panel */}
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* <v-card max-width="800" ...> translated */}
                <DialogPanel className="w-full max-w-2xl rounded-xl p-4 border-2 border-black bg-white">
                  {" "}
                  {/* max-w-2xl approx 800px */}
                  {/* Dialog content container */}
                  {/* Ensure selectedBadge exists before accessing its properties */}
                  {selectedBadge && (
                    // <v-row> and <v-col> inside dialog translated
                    <div className="flex flex-wrap items-center mx-4">
                      {/* Image column cols="3" */}
                      <div className="w-full sm:w-1/4 px-4 mb-4 sm:mb-0">
                        {" "}
                        {/* Adjust width for mobile stacking */}
                        <img
                          src={`/images/arcade/badges/${selectedBadge.image}`} // Adjust path
                          alt={selectedBadge.name}
                          className="w-full"
                        />
                      </div>
                      {/* Text column */}
                      <div className="w-full sm:w-3/4 px-4">
                        <DialogTitle
                          as="h1"
                          className="mt-3 mb-1 text-2xl font-bold leading-tight"
                        >
                          {" "}
                          {/* Adjust font size/weight */}
                          {selectedBadge.name}
                        </DialogTitle>
                        <p className="font-medium text-gray-700 -mt-1">
                          {" "}
                          {/* Spacing/color */}
                          {selectedBadge.date === "Not earned"
                            ? "Not earned"
                            : "Earned on " + selectedBadge.date}
                        </p>
                        <p className="my-2 text-sm whitespace-pre-line text-gray-800 leading-6">
                          {" "}
                          {/* Spacing, pre-line for line breaks */}
                          {selectedBadge.description}
                        </p>
                        {selectedBadge.earned && (
                          <div className="flex items-center gap-3 mt-4">
                            {" "}
                            {/* Social share icons */}
                            <p className="font-semibold text-gray-800">
                              Share:
                            </p>
                            {/* Add actual sharing logic here if needed, these are just icons */}
                            <FiInstagram className="text-xl cursor-pointer" />
                            <FiLinkedin className="text-xl cursor-pointer" />
                            <MdOutlineEmail className="text-xl cursor-pointer" />
                            <FaWhatsapp className="text-xl cursor-pointer" />
                            <FiTwitter className="text-xl cursor-pointer" />
                          </div>
                        )}
                        {!selectedBadge.earned && selectedBadge.link && (
                          <a
                            href={selectedBadge.link}
                            className="inline-block bg-blue-500 text-white py-2 px-4 mt-3 hover:bg-blue-600 text-sm font-medium rounded-full"
                          >
                            {" "}
                            {/* Claim button */}
                            Claim now
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Dialog Actions */}
                  <div className="mt-4 flex justify-end">
                    {/* <v-btn text @click="dialog = false">Close</v-btn> translated */}
                    <button
                      type="button"
                      className="text-gray-700 px-4 py-2 rounded-full cursor-pointer border-2 text-sm font-medium" // Styling like a text button
                      onClick={closeDialog}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function ProfileCard({
  userDetails,
  badgesCount,
}: {
  userDetails: any;
  badgesCount: number;
}) {
  const [showEditor, setShowEditor] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const headshotFileInputRef = useRef<HTMLInputElement>(null);
  // Function to get Tailwind color class for role chip
  const getRoleChipColor = (role?: string) => {
    switch (role) {
      case "Organizer":
        return "bg-[#ea4335] text-white border-[#ea4335]";
      case "Volunteer":
        return "bg-[#4285f4] text-white border-[#4285f4]";
      case "Speaker":
        return "bg-[#34a853] text-white border-[#34a853]";
      default:
        return "bg-[#f9ab00] text-[#202023] border-[#f9ab00]"; // Attendee or default
    }
  };

  const socialProviders = [
    { label: "Instagram", value: "instagram" },
    { label: "GitHub", value: "github" },
    { label: "LinkedIn", value: "linkedin" },
    { label: "Website", value: "website" },
  ];

  const [availableSocialProviders, setAvailableSocialProviders] =
    useState(socialProviders);

  useEffect(() => {
    // Update available providers when userDetails.socials changes
    if (userDetails?.socials) {
      const usedProviderValues = userDetails.socials.map(
        (s: any) => s.provider
      );
      setAvailableSocialProviders(
        socialProviders.filter((p) => !usedProviderValues.includes(p.value))
      );
    } else {
      setAvailableSocialProviders(socialProviders);
    }
  }, [userDetails?.socials]);

  return (
    <div className="w-full md:w-1/3 max-w-[400px]">
      <h1 className="text-3xl font-bold mb-4">
        {userDetails?.displayName}&apos;s Profile
      </h1>{" "}
      <p className="text-gray-700 mb-12">
        Our mission is to equip our community members with practical skills,
        enabling them to communicate their insights.
      </p>
      {
        /*user &&*/ userDetails && (
          <div className="mt-8 flex flex-col items-center">
            {" "}
            {/* mt-8, flex, flex-col, items-center */}
            <div className="relative ">
              {" "}
              {/* position: relative; */}
              {/* Profile Picture and Upload */}
              <img
                referrerPolicy="no-referrer"
                src={
                  userDetails.photoURL ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="Profile Picture"
                className="-translate-y-[20px] size-[156px] rounded-full object-cover relative z-10 cursor-pointer border-2 border-black-300" // rounded-full, mb-2, object-cover, relative, z-10, cursor-pointer
              />
            </div>
            <div className="w-full flex flex-col items-center outline-2 outline-[#202023] rounded-3xl p-6 transform -translate-y-20 relative bg-white">
              <div
                className="absolute top-[-106px] w-[180px] h-[180px] rounded-full border-2 border-[#202023] bg-white z-10"
                style={{
                  clipPath: "inset(57.8% 0px 0px)",
                }}
              />{" "}
              <div className="h-20"></div>{" "}
              <div className="flex items-center gap-2 text-xl">
                <p className="text-gray-900 text-xl">
                  {userDetails.displayName}
                </p>{" "}
                <span
                  className={`text-xs px-3 py-1.5 rounded border ${getRoleChipColor(
                    userDetails.role
                  )} border border-black`}
                >
                  {" "}
                  {userDetails.role || "Attendee"}
                </span>
              </div>
              {userDetails.company &&
                userDetails.company.designation &&
                userDetails.company.name && (
                  <p className="mt-2 text-gray-700 text-base">
                    {userDetails.company.designation},{" "}
                    {userDetails.company.name}
                  </p>
                )}
              {userDetails.communityTitle && (
                <p className="text-gray-700 text-base">
                  {userDetails.communityTitle}
                </p>
              )}
              {userDetails.username && (
                <a
                  href={`https://wow.vizag.dev/p/${userDetails.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-3 border border-[#dadce0] text-[#1a73e8] font-medium px-3 py-1.5 rounded-full text-sm no-underline hover:bg-gray-50" // display: flex, align-items: center, column-gap: 4px, margin-top: 12px, border: 1px solid #dadce0, color: #1a73e8, padding: 6px 12px, border-radius: 48px, text-decoration:none;
                >
                  wow.vizag.dev/p/{userDetails.username}{" "}
                  <span className="material-symbols-outlined !text-[18px]">
                    open_in_new
                  </span>
                </a>
              )}
              <div className="w-full border-t my-3 opacity-100"></div>{" "}
              <div className="flex flex-col items-start w-full text-sm text-gray-800">
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
                {userDetails.domainsInterested &&
                  userDetails.domainsInterested.length > 0 && (
                    <>
                      <p className="font-semibold mt-2 mb-1">
                        Domains Interested
                      </p>{" "}
                      <div className="flex flex-wrap">
                        {" "}
                        {userDetails.domainsInterested.map(
                          (domain: any, index: any) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-[#000000]/9 px-3 min-h-8 text-sm m-1"
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
                <p className="flex items-center gap-1">
                  <span className="material-symbols-outlined !text-[18px]">
                    stars
                  </span>
                  {badgesCount} • Badges earned
                </p>{" "}
                {(userDetails.socials?.length ?? 0) > 0 && (
                  <>
                    <p className="font-semibold mt-2 mb-1">Links</p>{" "}
                    <ul className="list-none p-0 w-full">
                      {" "}
                      {userDetails.socials?.map((item: any, index: any) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 my-3"
                        >
                          <span
                            className={`material-symbols-outlined !text-[18px]`}
                          >
                            {" "}
                            {getSocialIconComponent(item.provider)}
                          </span>
                          <a
                            href={
                              item.provider === "instagram"
                                ? `https://instagram.com/${item.name}`
                                : item.provider === "github"
                                ? `https://github.com/${item.name}`
                                : item.provider === "linkedin"
                                ? `https://linkedin.com/in/${item.name}`
                                : item.name.startsWith("http")
                                ? item.name
                                : `https://${item.name}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#202023]"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>{" "}
          </div>
        )
      }
    </div>
  );
}

export default function P() {
  const params = useParams();
  const userName = params?.userName as string;
  useEffect(() => {
    document.title = `Developer Profile (@${userName}) - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Developer Profile (@${userName}) - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Developer Profile (@${userName}) - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, [userName]); // Set title and meta tags on component mount
  const [userData, setUserData] = useState<any>(undefined);
  const [badges, setBadges] = useState<any[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  // fetch public user data via username
  const fetchUserData = async (userName: string) => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", userName),
        limit(1)
      );
      const userSnapShot = await getDocs(userQuery);

      let fetchedUserDetails = {} as any;
      let userId;
      userSnapShot.forEach((doc) => {
        (fetchedUserDetails = doc.data() as any), (userId = doc.id);
      });

      const arcadeDataRef = collection(db, "users", userId as any, "arcade");
      const arcadeData = await getDocs(arcadeDataRef);
      const badgeData: any[] = [];
      arcadeData.forEach((doc) => {
        badgeData.push({ ...doc.data(), id: doc.id });
      });
      const localBadges = arcadeJson.map((item: any) => {
        return {
          name: item.badge.name,
          link: item.link,
          date:
            badgeData.filter((doc) => doc.id == item.badge.id)[0]?.timestamp ===
            undefined
              ? "Not earned"
              : moment(
                  badgeData
                    .filter((doc) => doc.id == item.badge.id)[0]
                    ?.timestamp?.toDate()
                )?.format("DD MMM YYYY"),
          image: item.badge.image,
          earned:
            badgeData.filter((doc) => doc.id == item.badge.id)[0]
              ?.quizCompleted || false,
          description: badgeData.filter((doc) => doc.id == item.badge.id)[0]
            ?.quizCompleted
            ? item.badge.description.earned
            : item.badge.description.default,
        };
      });
      setBadges(localBadges);

      setUserData(fetchedUserDetails);
    } catch (error: any) {
      console.error("Error in fetching user data : ", error);
    }
  };
  useEffect(() => {
    if (userName == null || userName === undefined) {
      return;
    }
    if (userName) {
      console.log("123", userName);
      fetchUserData(userName);
    }
  }, [userName]);
  return (
    <div className="flex flex-col md:flex-row gap-12 py-4 px-2">
      <ProfileCard
        userDetails={userData}
        badgesCount={badges.filter((e) => e.earned).length}
      />
      <div className="grow">
        <BadgeGrid user={userData} badges={badges} />
      </div>
    </div>
  );
}
