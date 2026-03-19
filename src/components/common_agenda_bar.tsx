/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
// components/AgendaBar.tsx
import React, { useState } from "react";
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmarkAdded,
  MdMap,
} from "react-icons/md";
import { db, auth } from "@/lib/firebase"; // Import your Firebase instances
import { parseTime } from "@/utils/timeutils"; // Import the utility
import sessionsData from "@/data/sessions.json"; // Import data
import speakersData from "@/data/speakers.json"; // Import data
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

interface AgendaBarProps {
  event: any;
  hasBoughtTicket: boolean;
  isSessionInSchedule: boolean;
  onAddToSchedule: () => void; // Callback to update schedule state in parent
}

const AgendaBar: React.FC<AgendaBarProps> = ({
  event,
  hasBoughtTicket,
  isSessionInSchedule,
  onAddToSchedule,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuthContext(); // Use react-firebase-hooks

  // Helper to get speakers for this event
  const eventSpeakers = speakersData.filter((speaker) =>
    event.speakers.map((e: any) => e.toString()).includes(speaker.id)
  );

  // Map track names to Tailwind colors (approximate Vuetify colors)
  const trackColors = [
    {
      Mobile: {
        bg: "rgba(204, 246, 197, 0.3)",
        chip: "#ccf6c5",
        text: "#000000",
        border: "#34a853",
      },
      Cloud: {
        bg: "(255, 231, 165, 0.3)",
        chip: "#ffe7a5",
        text: "#000000",
        border: "#f9ab00",
      },
      Web: {
        bg: "rgba(195, 236, 246, 0.3)",
        chip: "#c3ecf6",
        text: "#000000",
        border: "#4285f4",
      },
      "AI/ML": {
        bg: "rgba(248, 216, 216, 0.3)",
        chip: "#f8d8d8",
        text: "#000000",
        border: "#ea4335",
      },
      default: {
        bg: "rgba(32, 32, 35, 0)",
        chip: "#e3e3e3",
        text: "#000000",
        border: "#202023",
      }, // Default border if no specific track color
    },
    {
      Mobile: {
        bg: "rgba(204, 246, 197, 0.6)",
        chip: "#ccf6c5",
        text: "#000000",
        border: "#ccf6c5",
      },
      Cloud: {
        bg: "rgba(255, 231, 165, 0.6)",
        chip: "#ffe7a5",
        text: "#000000",
        border: "#ffe7a5",
      },
      Web: {
        bg: "rgba(195, 236, 246, 0.6)",
        chip: "#c3ecf6",
        text: "#000000",
        border: "#c3ecf6",
      },
      "AI/ML": {
        bg: "rgba(248, 216, 216, 0.6)",
        chip: "#f8d8d8",
        text: "#000000",
        border: "#f8d8d8",
      },
      default: {
        bg: "rgba(32, 32, 35, 0)",
        chip: "#e3e3e3",
        text: "#000000",
        border: "#FFF",
      }, // Default border if no specific track color
    },
  ][window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0];

  const currentTrackColor =
    trackColors[event.track as keyof typeof trackColors] || trackColors.default;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addToUserSchedule = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          schedule: isSessionInSchedule
            ? arrayRemove(event.id)
            : arrayUnion(event.id),
        });
        onAddToSchedule(); // Call parent handler to update local schedule state
        alert(
          isSessionInSchedule ? "Removed from schedule" : "Added to schedule"
        );
        closeModal();
      } catch (error) {
        console.error("Error updating schedule:", error);
        alert("Failed to update schedule.");
      }
    }
  };

  const [startTime, endTime] = parseTime(event.time);

  return (
    <>
      {/* Activator Card (replaces v-card) */}
      <div
        onClick={openModal}
        className={`mx-2 my-3 w-80 p-[1rem] h-60 flex-shrink-0 flex flex-col relative cursor-pointer rounded-sm shadow-sm ${
          currentTrackColor === trackColors.default
            ? "border-[1.5px] border-[#e0e0e0]"
            : ""
        }`}
        style={{
          backgroundColor: currentTrackColor.bg,
        }}
      >
        {/* Time */}
        <p className="absolute flex flex-col top-4 right-4 text-right google-font">
          <b>{event.time.split(" to ")[0]}</b>
          <span className="text-sm">{event.time.split(" to ")[1]}</span>
        </p>
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 pr-20 max-w-[220px] whitespace-pre-line max-h-14 google-font">
          {event.title}
        </h3>{" "}
        {/* Adjust max-h and overflow */}
        {/* Speakers */}
        <div
          className={`mt-auto w-max ${eventSpeakers.length > 3 ? "flex" : ""}`}
        >
          {eventSpeakers.length > 0 &&
            eventSpeakers.slice(0, 3).map((speaker, index) => (
              <div
                key={speaker.id}
                className={`flex items-center gap-3 w-max ${
                  eventSpeakers.length > 3 ? "" : "py-1 px-[6px]"
                }`}
                style={{
                  transform:
                    eventSpeakers.length > 3 && index > 0
                      ? `translateX(calc(-${8 * index}px))`
                      : "",
                }}
              >
                <img
                  src={`/images/speakers/${speaker.image}`}
                  alt={speaker.name}
                  className="w-6 h-6 object-cover rounded-full border border-gray-300"
                />
                {eventSpeakers.length <= 3 && (
                  <p className="text-sm font-semibold google-font overflow-hidden max-h-7 text-ellipsis line-clamp-2">
                    {speaker.name}
                  </p>
                )}
              </div>
            ))}
          {eventSpeakers.length > 3 && (
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-black border-[1.5px] border-gray-700 dark:border-white text-xs font-semibold"
              style={{
                transform: `translateX(calc(-${
                  10 * (eventSpeakers.slice(0, 3).length - 1)
                }px))`,
              }}
            >
              +{eventSpeakers.length - 3}
            </div>
          )}
        </div>
        {/* Chips */}
        {!(
          (event.track === "" || event.track == "General") &&
          event.format === ""
        ) && (
          <div className="mt-2 flex flex-wrap items-center">
            {event.track && event.track !== "General" && (
              <span
                className={`inline-flex items-center rounded-full px-3 h-8 py-0.5 text-sm mr-2`}
                style={{
                  backgroundColor: currentTrackColor.chip,
                  color: currentTrackColor.text,
                }}
              >
                {event.track}
              </span>
            )}
            {event.format && (
              <span
                className={`inline-flex items-center rounded-full  px-3 h-8 py-0.5 text-sm border`}
                style={{
                  borderColor: currentTrackColor.border,
                  color: currentTrackColor.border,
                }}
              >
                {event.format}
              </span>
            )}
          </div>
        )}
        {/* Bookmark Icon */}
        <div
          className="absolute bottom-3 right-4 !text-xl"
          style={{ color: currentTrackColor.border }}
        >
          {isSessionInSchedule ? (
            <BsBookmarkCheckFill size={"24px"} className="py-[3px]" />
          ) : (
            <MdOutlineBookmarkBorder size={"24px"} />
          )}
        </div>
      </div>

      {/* Bottom Sheet Modal (replaces v-bottom-sheet) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto backdrop-brightness-50"
          onClick={closeModal}
        >
          <div
            className="relative w-screen max-w-screen bg-white p-6 shadow-lg animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            {/* animate-slide-up needs definition in CSS */}
            <h2 className="text-gray-700 text-2xl font-bold mb-2">
              {event.title}
            </h2>
            <h4 className="text-gray-600 mb-4 text-sm">
              {startTime.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "numeric",
              })}{" "}
              | {event.format}
            </h4>
            <p className="mb-4 text-gray-800 text-sm leading-relaxed">
              {event.description}
            </p>
            {/* Speakers in Modal */}
            <div className="mb-4">
              {eventSpeakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="flex items-center gap-3 p-1 rounded-full w-fit mb-2"
                >
                  <img
                    src={`/images/speakers/${speaker.image}`}
                    alt={speaker.name}
                    className="w-8 h-8 object-cover rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-semibold leading-tight">
                      {speaker.name}
                    </p>
                    <span className="text-xs font-normal text-gray-600">
                      {speaker.company.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Chips and Link in Modal */}
            <div className="flex flex-wrap items-center gap-2 mt-4 mb-4">
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-700 text-gray-700">
                {event.track}
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-700 text-gray-700">
                <MdMap className="mr-1" /> {event.venue}
              </span>
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Checkout Link
                </a>
              )}
            </div>
            {/* Add/Remove from Schedule Button */}
            {user ? (
              hasBoughtTicket ? (
                <button
                  onClick={addToUserSchedule}
                  className={`mt-4 px-4 py-2 rounded-md cursor-pointer font-semibold ${
                    isSessionInSchedule
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  } hover:opacity-90`}
                >
                  {isSessionInSchedule
                    ? "Remove from schedule"
                    : "Add to schedule"}
                </button>
              ) : (
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-md mt-4">
                  <MdOutlineBookmarkBorder className="mr-1" /> Purchase ticket
                  to add to schedule
                </span>
              )
            ) : (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-md mt-4">
                <MdOutlineBookmarkBorder className="mr-1" /> Sign in to add to
                schedule
              </span>
            )}
            {/* Close Button (Optional, clicking background also closes) */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AgendaBar;
