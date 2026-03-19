/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState, useEffect, Fragment, use } from "react";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";

// Assuming mainData and speakersData are available via import or props
import mainData from "@/data/config.json"; // Adjust path
import speakersData from "@/data/speakers.json"; // Adjust path

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { MdTimer } from "react-icons/md"; // Example icon
import { useAuthContext } from "@/context/AuthContext";
import { db } from "../../lib/firebase";
import {
  FiGithub,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { FaMedium } from "react-icons/fa";
import BadgeAwardedNotification from "@/components/BadgeAnimation";

function AskAPunditBottomSheet({
  professional,
  addMentorRequest,
  onClose,
}: {
  professional: any;
  idx?: number;
  addMentorRequest: () => void;
  onClose: () => void;
}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true); // Control visibility based on prop/state
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthContext();

  // Effect to manage internal state based on external prop
  useEffect(() => {
    // This component is typically rendered only when bottomSheetOpen is true
    // If you need to control it externally, ensure this effect syncs
    // setIsBottomSheetOpen(isInitiallyOpen); // Or based on a prop
  }, []); // Only run once on mount

  const handleTextAreaInput = (event: any) => {
    setUserMessage(event.target.value);
  };

  const askPundit = async () => {
    if (!userMessage.trim()) {
      alert("Please enter your question.");
      return;
    }

    if (user && user.uid && db) {
      setIsLoading(true);
      try {
        getDoc(doc(db, "users", user.uid)).then(async (uD) => {
          const userDetails = uD.data();
          const subtitle =
            userDetails === undefined
              ? ""
              : userDetails.company
                ? `${userDetails.company.designation}, ${userDetails.company.name}`
                : "";
          await addDoc(collection(db, "mentor-request"), {
            mentor: professional.name,
            questions: userMessage.trim(),
            uid: user.uid,
            isApproved: false,
            status: "pending",
            name: user.displayName || "Anonymous",
            subtitle: subtitle, // Construct subtitle
            timestamp: new Date(), // Add a timestamp
          });
          addMentorRequest();
          setIsBottomSheetOpen(false);
          alert("Request for a session is received ✅");
          onClose(); // Call the external close handler
        });
      } catch (e) {
        console.error("Error adding mentor request:", e);
        alert("Failed to submit request.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn(
        "User not logged in or Firebase DB not available, request not saved."
      );
      alert("Request not saved. Please log in.");
      setIsBottomSheetOpen(false);
      onClose();
    }
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    onClose();
  };

  // Using Headless UI Dialog for accessibility and backdrop/transition
  return (
    <Transition show={isBottomSheetOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeBottomSheet}>
        {" "}
        {/* Higher z-index for bottom sheet */}
        {/* Backdrop */}
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
        {/* Sheet container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center">
            {" "}
            {/* items-end to position at bottom */}
            {/* Sheet Panel */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              {/* v-card translated */}
              <DialogPanel className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-xl p-6 shadow-xl">
                {" "}
                {/* max-w-lg, rounded-t-xl */}
                <div className="mx-3">
                  {" "}
                  {/* mx-3 approx */}
                  <DialogTitle
                    as="h2"
                    className="text-xl font-bold google-font"
                  >
                    {professional.name}
                  </DialogTitle>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 google-font">
                    {professional.company.designation}
                  </p>
                  <div className="mt-4">
                    {" "}
                    {/* mt-4 */}
                    {/* v-textarea translated */}
                    <label
                      htmlFor="user-message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      What would you ask if you had five minutes with them?
                    </label>
                    <textarea
                      id="user-message"
                      value={userMessage}
                      onChange={handleTextAreaInput}
                      rows={4} // v-textarea has multiple rows
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                    // prepend-icon "mdi-message-question" is not a direct textarea feature, maybe add an icon next to the label or visually
                    />
                  </div>
                  <div className="my-4 flex items-center gap-4">
                    {" "}
                    {/* my-4, flex, gap-4 approx ml-4 */}
                    {/* v-btn translated */}
                    <button
                      type="button"
                      onClick={askPundit}
                      disabled={isLoading}
                      className={`
                                rounded-full py-2 px-6 font-medium text-sm text-white cursor-pointer
                                ${isLoading
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-500 hover:shadow-md"
                        }
                            `}
                    >
                      {isLoading ? "Sending..." : "Have a Question?"}
                    </button>
                    {/* v-btn text translated */}
                    <button
                      type="button"
                      onClick={closeBottomSheet}
                      className="text-gray-700 dark:text-gray-400 cursor-pointer text-sm font-medium border-2 py-1.5 px-4 rounded-full"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function SpeakerSocialButton({
  socialLinks,
  dark = false,
}: {
  socialLinks: any;
  dark?: boolean;
}) {
  // Define icon color class based on 'dark' prop
  const iconColorClass = dark ? "text-white" : "text-gray-700";

  return (
    <div className=" flex flex-wrap gap-1">
      {" "}
      {/* mt-4, flex-wrap, gap-1 approx mr-1 mb-1 */}
      {socialLinks?.linkedin?.length > 0 && (
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-200 ${iconColorClass}`}
        >
          {" "}
          {/* p-1 for size small approx */}
          <FiLinkedin className="text-lg" /> {/* Adjust text-lg as needed */}
        </a>
      )}
      {socialLinks?.github?.length > 0 && (
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-200 ${iconColorClass}`}
        >
          <FiGithub className="text-lg" />
        </a>
      )}
      {socialLinks?.twitter?.length > 0 && (
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-200 ${iconColorClass}`}
        >
          <FiTwitter className="text-lg" />
        </a>
      )}
      {socialLinks?.instagram?.length > 0 && (
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-200 ${iconColorClass}`}
        >
          <FiInstagram className="text-lg" />
        </a>
      )}
      {socialLinks?.web?.length > 0 && (
        <a
          href={socialLinks.web}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-200 ${iconColorClass}`}
        >
          <FiGlobe className="text-lg" />
        </a>
      )}
      {socialLinks?.youtube?.length > 0 && (
        <a
          href={socialLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-200 ${iconColorClass}`}
        >
          <FiYoutube className="text-lg" />
        </a>
      )}
      {socialLinks?.medium?.length > 0 && (
        <a
          href={socialLinks.medium}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 rounded-full hover:bg-gray-200 ${iconColorClass}`}
        >
          <FaMedium className="text-lg" />
        </a>
      )}
    </div>
  );
}

function SpeakerCard({
  data,
  canRequestTime,
  onRequestTime,
  hasUserBoughtTicket,
}: {
  data: any;
  canRequestTime: boolean;
  onRequestTime: (data: any) => void;
  hasUserBoughtTicket: boolean;
}) {
  const user = useAuthContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const handleRequestTime = () => {
    closeDialog();
    onRequestTime(data);
  };

  return (
    <>
      {/* Card Activator */}
      <div
        onClick={openDialog}
        className="cursor-pointer text-center image-container"
      >
        <img
          alt="frame"
          className="frame dark:hidden"
          src="/common/frame.png"
        />
        <img
          alt="frame"
          className="frame dark:hidden"
          src="/common/frame.png"
        />
        <img
          alt="frame"
          className="frame dark:block hidden"
          src="/common/frame_dark.png"
        />
        <img
          className="avatar aspect-square object-cover"
          alt={data.name}
          src={
            data.image && data.image.length
              ? "/images/speakers/" + data.image
              : "/images/common/avatar.png"
          }
        />
        <h3 className="mt-1 font-semibold text-lg google-font">{data.name}</h3>
        <p className="text-sm opacity-90">{data.company.name}</p>
      </div>

      {/* Dialog */}
      <Transition show={dialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl rounded-3xl p-4 border-2 border-black bg-white dark:bg-black dark:shadow-lg dark:shadow-white/6">
                  <div className="flex flex-wrap items-start -mx-4">
                    <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                      <div className="text-center image-container">
                        <img
                          alt="frame"
                          className="frame dark:hidden"
                          src="/common/frame.png"
                        />
                        <img
                          alt="frame"
                          className="frame dark:block hidden"
                          src="/common/frame_dark.png"
                        />
                        <img
                          className="avatar aspect-square object-cover"
                          alt={data.name}
                          src={
                            data.image && data.image.length
                              ? "/images/speakers/" + data.image
                              : "/images/common/avatar.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 px-4">
                      <DialogTitle
                        as="h1"
                        className="mt-3 mb-0 text-4xl max-w-[12ch] font-bold sname google-font"
                      >
                        {data.name}
                      </DialogTitle>
                      {data.community_title ? (
                        <p className="font-medium text-gray-700 dark:text-gray-300 mt-1 stitle text-sm">
                          {data.community_title} | {data.company.designation},{" "}
                          {data.company.name}
                        </p>
                      ) : (
                        <p className="font-medium text-gray-700 dark:text-gray-300 mt-1 stitle text-sm">
                          {data.company.designation}, {data.company.name}
                        </p>
                      )}

                      <p
                        className={`mt-4 text-gray-800 dark:text-gray-500 sbio ${data.bio.length < 150
                            ? "mb-3"
                            : isReadMore
                              ? ""
                              : "line-clamp-5"
                          }`}
                      >
                        {data.bio}
                      </p>
                      {data.bio &&
                        data.bio.length > 150 && ( // Simple heuristic to show read more if bio is long
                          <button
                            onClick={() => setIsReadMore(!isReadMore)}
                            className="text-blue-500 font-bold text-sm mt-1 hover:underline mb-3"
                          >
                            Read {isReadMore ? "Less" : "More"}
                          </button>
                        )}

                      <SpeakerSocialButton socialLinks={data.social} />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-end items-center gap-3">
                    {" "}
                    {/* Adjusted spacing and alignment */}
                    {data.mentor &&
                      canRequestTime &&
                      user &&
                      hasUserBoughtTicket && (
                        <button
                          type="button"
                          onClick={handleRequestTime}
                          className="bg-yellow-400 text-black py-2 px-4 rounded-full font-medium font-sm flex items-center hover:shadow-md transition duration-200 cursor-pointer"
                        >
                          <span className="mr-1">Request Time</span>
                          <span className="material-symbols-outlined !text-lg !font-semibold">
                            timer
                          </span>
                          {/* Tailwind text-lg for icon size */}
                        </button>
                      )}
                    {data.mentor && !canRequestTime && user && (
                      <button
                        type="button"
                        disabled
                        className="text-black py-2 px-4 rounded-full font-semibold flex items-center opacity-50 cursor-not-allowed bg-gray-200"
                      >
                        <span className="mr-1">Application Pending</span>
                        <MdTimer className="text-lg" />
                      </button>
                    )}
                    {data.mentor && !user && (
                      <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center cursor-not-allowed">
                        Sign in to request 1:1 session
                      </span>
                    )}
                    {data.mentor && user && !hasUserBoughtTicket && (
                      <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center cursor-not-allowed">
                        Purchase ticket to request 1:1 session
                      </span>
                    )}
                    <button
                      type="button"
                      className="text-gray-700 dark:text-gray-400 px-4 py-2 border-2 rounded-full font-medium text-sm cursor-pointer"
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

      {/* Inline CSS converted or handled by Tailwind */}
      <style jsx>{`
        .image-container {
          position: relative;
          width: 80%; /* Adjusted from 80% to fit better, maybe use Tailwind width classes */
          margin: 0 auto; /* Center the container */
          margin-top: 20px; /* Keep specific top margin if needed */
        }

        .avatar {
          /* width: 100%; handled by Tailwind w-full */
          /* height: auto; handled by aspect-square */
          position: relative;
          border: 1px solid white;
        }

        .frame {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 5;
        }

        /* Responsive styles using media queries, could be converted to Tailwind prefixes */
        @media screen and (max-width: 840px) {
          .sname {
            font-size: x-large; /* Tailwind: text-xl */
          }
          .stitle {
            font-size: smaller; /* Tailwind: text-xs or text-sm */
          }
          /* Bio styles handled by line-clamp utility class in Tailwind */
        }
      `}</style>
    </>
  );
}

function SpeakersPage() {
  useEffect(() => {
    document.title = `Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [mentorRequests, setMentorRequests] = useState<any[]>([]);

  const user = useAuthContext();

  useEffect(() => {
    const fetchMentorRequests = async () => {
      if (user && user.uid && db) {
        try {
          const q = query(
            collection(db, "mentor-request"),
            where("uid", "==", user.uid)
          );
          const snapshot = await getDocs(q);
          const requests: any = snapshot.docs.map((doc) => doc.data());
          setMentorRequests(requests);
        } catch (e) {
          console.error("Error fetching mentor requests:", e);
        }
      } else {
        // console.log("User not logged in or db not available, skipping mentor requests fetch.");
      }
    };

    fetchMentorRequests();
  }, [user]); // Re-run effect when user changes

  const openBottomSheet = (professional: any) => {
    setSelectedProfessional(professional);
    setBottomSheetOpen(true);
  };

  const addMentorRequest = (name: any) => {
    setMentorRequests((prevRequests: any) => [...prevRequests, name]);
  };

  const mentors = speakersData.filter(
    (speaker) => speaker.mentor === true && !speaker.expert
  );
  const experts = speakersData.filter((speaker) => speaker.expert === true);

  const [userBoughtTicket, setUserBoughtTicket] = useState(false);
  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    getDoc(userDocRef).then((userDocSnap) => {
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log(userData);
        setUserBoughtTicket(userData.paymentStatus);
        console.log("Loaded schedule:", userData.schedule);
      } else {
        // User document might not exist yet, create it or initialize schedule as empty
        console.log("User document not found, initializing empty schedule.");
      }
    });
  });

  return (
    <>
      {/* Assuming a layout wrapper is provided externally */}
      <div className="container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-6">
          {mentorRequests.map((mentorRequest) => {
            return mentorRequest.status === "pending" ? (
              <div className="bg-amber-500 w-max p-6 rounded-3xl relative">
                <h3 className="text-5xl google-font font-bold max-w-[280px] mr-6">
                  {mentorRequest.mentor}
                </h3>
                <p className="mt-2 mb-3">{mentorRequest.subtitle}</p>
                <p className="py-1 px-3 border-2 w-max rounded-full google-font font-bold text-sm">
                  Pending
                </p>
                <p className="font-bold absolute bottom-2 right-4 text-3xl opacity-[18%]">
                  1-1
                </p>
              </div>
            ) : mentorRequest.isApproved ? (
              <div className="bg-green-600 text-white w-max p-6 rounded-3xl relative">
                <h3 className="text-5xl google-font font-bold max-w-[280px] mr-6">
                  {mentorRequest.mentor}
                </h3>
                <p className="mt-2 mb-3">{mentorRequest.subtitle}</p>
                <div className="flex gap-2 flex-wrap">
                  <p className="py-1 px-3 border-2 w-max rounded-full google-font font-bold text-sm">
                    Accepted
                  </p>
                  <p className="flex items-center py-1 px-3 bg-white text-green-600 w-max rounded-full google-font font-bold text-sm">
                    10:30 AM
                  </p>
                </div>
                <p className="font-bold absolute bottom-2 right-4 text-3xl opacity-[24%]">
                  1-1
                </p>
              </div>
            ) : (
              <div className="bg-red-600 text-white w-max p-6 rounded-3xl relative">
                <h3 className="text-5xl google-font font-bold max-w-[280px] mr-6">
                  {mentorRequest.mentor}
                </h3>
                <p className="mt-2 mb-3">{mentorRequest.subtitle}</p>
                <p className="py-1 px-3 border-2 w-max rounded-full google-font font-bold text-sm">
                  Rejected
                </p>
                <p className="font-bold absolute bottom-2 right-4 text-3xl opacity-[36%]">
                  1-1
                </p>
              </div>
            );
          })}
        </div>
        
        {experts.length > 0 && (
          <div className="container mx-auto mt-5 sm:px-6 lg:px-0">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <h1 className="text-3xl font-bold mb-2">Experts</h1>
                <p className="mb-6">
                  Our experts are influential leaders and allies actively involved
                  in various communities within their organizations, cities,
                  countries, and beyond, making a significant impact through their
                  contributions and support.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-4">
              {experts.map((item, index) => (
                <div key={index} className="w-1/2 sm:w-1/3 md:w-1/5 px-4 mb-8">
                  <SpeakerCard
                    data={item}
                    onRequestTime={openBottomSheet}
                    canRequestTime={
                      !mentorRequests.map((e) => e.mentor).includes(item.name)
                    }
                    hasUserBoughtTicket={userBoughtTicket}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <h1 className="text-3xl font-bold mb-2">Speakers</h1>
            <p className="mb-6">
              Our speakers are influential leaders and allies actively involved
              in various communities within their organizations, cities,
              countries, and beyond, making a significant impact through their
              contributions and support.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-4">
          {mentors.map((item, index) => (
            <div key={index} className="w-full px-4 mb-8">
              <SpeakerCard
                data={item}
                onRequestTime={openBottomSheet}
                canRequestTime={
                  !mentorRequests.map((e) => e.mentor).includes(item.name)
                }
                hasUserBoughtTicket={userBoughtTicket}
              />
            </div>
          ))}
        </div>
      </div>

      {bottomSheetOpen && selectedProfessional && (
        <AskAPunditBottomSheet
          professional={selectedProfessional}
          onClose={() => setBottomSheetOpen(false)}
          addMentorRequest={() => addMentorRequest(selectedProfessional.name)}
        />
      )}
    </>
  );
}

export default SpeakersPage;
