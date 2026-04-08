"use client";
import React from 'react';
import Link from 'next/link';

interface MyIOSectionProps {
  isMyIoVisible: boolean;
  isSavedVisible: boolean;
  isRecommendedVisible: boolean;
  setIsMyIoVisible: (visible: boolean) => void;
  setIsSavedVisible: (visible: boolean) => void;
  setIsRecommendedVisible: (visible: boolean) => void;
}

export const MyIOSection: React.FC<MyIOSectionProps> = ({
  isMyIoVisible,
  isSavedVisible,
  isRecommendedVisible,
  setIsMyIoVisible,
  setIsSavedVisible,
  setIsRecommendedVisible,
}) => {
  return (
    <div
      className="h-my-io h-inherit"
      data-myio="True"
      data-resources="False"
      data-allbadges="False"
    >
      <div id="my-io-2024" className="my-io-container">
        <span className="sm:l-h5 md:l-h4 inline-block mb-2 md:mb-4">
          My WOW
        </span>
        <p className="sm:s-h6 md:l-h6 underline-link mb-2 md:mb-4">
          Your saved content is automatically stored in your{" "}
          <a
            className=""
            aria-label="Opens Google Developer Profile in new tab - open in new tab"
            target="_blank"
            rel="noreferrer"
            href="https://developers.google.com/profile/u/me"
          >
            developer profile
          </a>
        </p>
        <div
          id="my-io"
          className="relative flex flex-1 flex-col md:flex-row text-grey bg-grey-bg border-[1.2px] md:border-2 border-grey rounded-[16px]"
        >
          <button
            className="main-opener z-10 absolute top-[55px] right-[30px] hidden md:flex flex-row items-center justify-center w-auto h-auto cursor-pointer"
            aria-label={isMyIoVisible ? "Hide saved content and content recommended for you" : "View saved content and content recommended for you"}
            aria-expanded={isMyIoVisible}
            aria-controls="recommended-sessions-list"
            onClick={() => setIsMyIoVisible(!isMyIoVisible)}
          >
            <span className="hidden md:inline-block mr-2 body">{isMyIoVisible ? "Hide" : "View"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              fill="none"
              className={isMyIoVisible ? "rotate-180" : ""}
              aria-hidden="true"
            >
              <path
                fill="#202124"
                d="M12.363.693a.75.75 0 0 1 1.293.54.758.758 0 0 1-.243.535L7.668 7.414a1 1 0 0 1-1.208.275 1 1 0 0 1-.347-.275L.363 1.768A.755.755 0 0 1 .886.495a.748.748 0 0 1 .527.198l5.5 5.38 5.45-5.38Z"
              ></path>
            </svg>
          </button>
          <div className="flex flex-col p-4 py-6 md:p-6 md:border-r-[2px] border-grey md:max-w-[290px] text-md:max-w-[400px] ml:max-w-[440px]">
            <div className="header md:h-[85px] flex flex-row items-center gap-4 relative">
              <div className="min-w-[50px] md:min-w-[56px]">
                <img
                  src="/images/io24-saved-sessions-icon.svg"
                  role="img"
                  aria-hidden="true"
                  loading="lazy"
                  width="56"
                  height="56"
                  className="w-[50px] md:w-full"
                  alt="Saved sessions icon"
                />
              </div>
              <div className="md:w-[195px] text-md:w-[320px]">
                <span id="saved-sessions-heading" className="title">
                  Saved content
                </span>
              </div>
              <button
                className="opener md:hidden flex items-center justify-center ml-auto w-12 h-12 cursor-pointer"
                aria-label={isSavedVisible ? "Hide Saved content" : "View Saved content"}
                aria-expanded={isSavedVisible}
                aria-controls="saved-sessions-list"
                onClick={() => setIsSavedVisible(!isSavedVisible)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  fill="none"
                  className={isSavedVisible ? "rotate-180" : ""}
                  aria-hidden="true"
                >
                  <path
                    fill="#202124"
                    d="M12.363.693a.75.75 0 0 1 1.293.54.758.758 0 0 1-.243.535L7.668 7.414a1 1 0 0 1-1.208.275 1 1 0 0 1-.347-.275L.363 1.768A.755.755 0 0 1 .886.495a.748.748 0 0 1 .527.198l5.5 5.38 5.45-5.38Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className={`bg-grey h-[1px] md:h-[2px] w-full mt-5 ${!isSavedVisible ? "hidden" : "block"} ${!isMyIoVisible ? "md:hidden" : "md:block"}`}></div>
            <div
              id="saved-sessions-list"
              aria-labelledby="saved-sessions-heading"
              className={`flex ${!isSavedVisible ? "hidden" : "flex"} ${!isMyIoVisible ? "md:hidden" : "md:flex"}`}
              aria-live="polite"
            >
              <div className="flex flex-col justify-between pt-2 md:pt-3 w-full overflow-auto myio-scrollbar">
                <Link
                  href="/register"
                  className="cta-secondary no-dark-mode ml-2 mb-2 block"
                >
                  <span>Register to save</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-grey h-[1.2px] w-full md:hidden"></div>
          <div className="flex flex-1 flex-col p-4 py-6 md:p-6">
            <div className="header md:h-[85px] flex flex-row items-center gap-4 relative md:pr-32">
              <div className="min-w-[50px] md:min-w-[70px]">
                <img
                  src="/images/io24-recommended-sessions-icon.svg"
                  role="img"
                  aria-hidden="true"
                  loading="lazy"
                  width="56"
                  height="56"
                  className="w-[50px] md:w-full"
                  alt="Recommended sessions icon"
                />
              </div>
              <div className="max-w-[195px] sm:max-w-[100%]">
                <span id="recommended-sessions-heading" className="title">
                  Recommended for you
                </span>
              </div>
              <button
                className="opener md:hidden flex flex-row items-center justify-center ml-auto w-12 h-12 md:w-auto md:h-auto cursor-pointer"
                aria-label={isRecommendedVisible ? "Hide Recommended for you" : "View Recommended for you"}
                aria-expanded={isRecommendedVisible}
                aria-controls="recommended-sessions-list"
                onClick={() => setIsRecommendedVisible(!isRecommendedVisible)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  fill="none"
                  className={isRecommendedVisible ? "rotate-180" : ""}
                  aria-hidden="true"
                >
                  <path
                    fill="#202124"
                    d="M12.363.693a.75.75 0 0 1 1.293.54.758.758 0 0 1-.243.535L7.668 7.414a1 1 0 0 1-1.208.275 1 1 0 0 1-.347-.275L.363 1.768A.755.755 0 0 1 .886.495a.748.748 0 0 1 .527.198l5.5 5.38 5.45-5.38Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className={`bg-grey h-[1px] md:h-[2px] w-full mt-5 ${!isRecommendedVisible ? "hidden" : "block"} ${!isMyIoVisible ? "md:hidden" : "md:block"}`}></div>
            <div
              id="recommended-sessions-list"
              aria-labelledby="recommended-sessions-heading"
              className={`flex ${!isRecommendedVisible ? "hidden" : "flex"} ${!isMyIoVisible ? "md:hidden" : "md:flex"}`}
              aria-live="polite"
            >
              <div className="flex flex-col justify-between pt-2 md:pt-3 w-full overflow-auto myio-scrollbar">
                <p className="cta underline-link">
                  Create a{" "}
                  <a
                    className=""
                    aria-label="Opens Google Developer Profile in new tab - open in new tab"
                    target="_blank"
                    rel="noreferrer"
                    href="/register"
                  >
                    WOW Developer Profile
                  </a>{" "}
                  to see programming recommended for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
