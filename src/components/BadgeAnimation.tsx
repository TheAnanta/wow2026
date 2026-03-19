"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdLink } from "react-icons/md";
import { useAuthContext } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Spinner = () => (
  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
);

function BadgeAwardedNotification({
  badgeName,
  badgeIconUrl,
  eventsNumber,
  badgeShareTitle,
  badgeShareDescription,
  badgePath,
  onDismiss,
  isOpen,
  onClose,
  isLoading = false,
}: {
  badgeName: string;
  badgeIconUrl: string;
  eventsNumber?: number;
  badgeShareTitle?: string;
  badgeShareDescription?: string;
  badgePath?: string;
  onDismiss?: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}) {
  const auth = useAuthContext();
  const handleShare = async (platform: string) => {
    const username = await getDoc(doc(db, "users", auth!.uid)).then((doc) => {
      const data = doc.data();
      return data?.username || "defaultUser";
    });
    const badgeUrl = `https://wow.vizag.dev/p/${username}#${badgePath}`;
    console.log(`Sharing ${badgeName} badge via ${platform}`);
    console.log("Share Title:", badgeShareTitle);
    console.log("Share Description:", badgeShareDescription);
    console.log("Badge URL:", badgeUrl);
    console.log("Badge Path:", badgePath);
    if (platform === "twitter") {
      const text = encodeURIComponent(
        badgeShareTitle || `I earned a ${badgeName} badge!`
      );
      const url = encodeURIComponent(badgeUrl || "YOUR_DEFAULT_PROFILE_URL");
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );
    } else if (platform === "facebook") {
      const url = encodeURIComponent(badgeUrl || "YOUR_DEFAULT_PROFILE_URL");
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      const url = encodeURIComponent(badgeUrl || "YOUR_DEFAULT_PROFILE_URL");
      const title = encodeURIComponent(
        badgeShareTitle || `Earned a ${badgeName} badge`
      );
      const summary = encodeURIComponent(
        badgeShareDescription || `Check out the ${badgeName} badge I earned.`
      );
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
        "_blank"
      );
    } else if (platform === "link") {
      if (badgeUrl) {
        navigator.clipboard
          .writeText(badgeUrl)
          .then(() => {
            alert("Badge URL copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy URL: ", err);
            window.open(badgeUrl, "_blank");
          });
      }
    }
  };

  const handleDismiss = () => {
    onDismiss?.();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[99999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[650px] mx-auto shadow-lg rounded-md bg-white border-t-[5px] border-blue-600 relative overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-[100] transition-opacity duration-300 ease-in-out opacity-100 pointer-events-auto">
                    <Spinner />
                  </div>
                )}
                <div className="flex flex-col max-h-[calc(100vh-32px)] overflow-visible">
                  <div className="flex sm:flex-col md:flex-row items-center">
                    <div className="w-1/2 sm:w-full md:py-9 md:px-6 p-6 flex-grow">
                      <h2 className="text-xl font-bold mb-2 leading-7 text-black">
                        You earned another{" "}
                        <span className="font-semibold">{badgeName}</span>{" "}
                        badge!
                      </h2>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {badgeShareDescription}
                      </p>
                    </div>
                    <div
                      className="w-1/2 sm:w-full flex items-center justify-center relative
                                 min-h-[164px] min-w-[303px] h-[164px] w-[303px]
                                 bg-[url('/images/badge-award-background.svg')] bg-[length:100%_calc(100%+2px)] bg-[-1px_1px] bg-no-repeat"
                    >
                      <img
                        alt="Icon representing the granted badge"
                        className="w-[124px] h-[124px] z-[1000] opacity-100 transform scale-100"
                        src={badgeIconUrl}
                      />
                      <img
                        alt="Badge animation background"
                        className="absolute inset-0 w-[195px] h-[170px] bg-cover bg-center"
                        src="https://www.gstatic.com/devrel-devsite/prod/v6dc4611c4232bd02b2b914c4948f523846f90835f230654af18f87f75fe9f73c/images/badge-award-animation.gif"
                      />
                      {eventsNumber !== undefined && (
                        <div className="py-0.5 px-2 text-sm font-medium rounded-full text-white bg-blue-600 absolute bottom-[17px] z-[10001] shadow-md">
                          {eventsNumber}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-2 flex items-center justify-between sm:flex-col-reverse md:flex-row sm:pt-0">
                    <div className="flex flex-wrap items-center text-sm text-gray-700 md:pl-4 sm:py-0.5 pb-5 md:pb-0 pl-0">
                      <span>Share</span>
                      <div className="flex flex-wrap items-center ml-2 gap-x-2">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center justify-center p-0 m-2 sm:m-1 border-0 shadow-none h-auto min-w-0 shrink-0 focus:outline-none hover:bg-transparent active:shadow-none"
                        >
                          <img
                            src="https://www.gstatic.com/devrel-devsite/prod/v6dc4611c4232bd02b2b914c4948f523846f90835f230654af18f87f75fe9f73c/images/share_twitter.svg"
                            alt="Twitter"
                            className="w-6 h-6"
                          />
                        </button>
                        <button
                          onClick={() => handleShare("facebook")}
                          className="flex items-center justify-center p-0 m-2 sm:m-1 border-0 shadow-none h-auto min-w-0 shrink-0 focus:outline-none hover:bg-transparent active:shadow-none"
                        >
                          <img
                            src="https://www.gstatic.com/devrel-devsite/prod/v6dc4611c4232bd02b2b914c4948f523846f90835f230654af18f87f75fe9f73c/images/share_facebook.svg"
                            alt="Facebook"
                            className="w-6 h-6"
                          />
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="flex items-center justify-center p-0 m-2 sm:m-1 border-0 shadow-none h-auto min-w-0 shrink-0 focus:outline-none hover:bg-transparent active:shadow-none"
                        >
                          <img
                            src="https://www.gstatic.com/devrel-devsite/prod/v6dc4611c4232bd02b2b914c4948f523846f90835f230654af18f87f75fe9f73c/images/share_linkedin.svg"
                            alt="LinkedIn"
                            className="w-6 h-6"
                          />
                        </button>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleShare("link");
                          }}
                          className="flex items-center justify-center p-0 m-2 sm:m-1 border-0 shadow-none h-auto min-w-0 shrink-0 focus:outline-none hover:bg-transparent active:shadow-none text-gray-600 hover:text-gray-800 no-underline"
                        >
                          <MdLink className="text-xl" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center flex-wrap sm:flex-row sm:mt-1">
                      <a
                        href={"/profile"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m-2 sm:m-1 px-4 py-2 bg-black text-white rounded-full transition duration-200 ease-in-out font-semibold"
                      >
                        View profile
                      </a>

                      <button
                        onClick={handleDismiss}
                        className="m-2 sm:m-1 px-4 py-2 text-gray-700 rounded-full border-2 relative overflow-visible"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default BadgeAwardedNotification;
