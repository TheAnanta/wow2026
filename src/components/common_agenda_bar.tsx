/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

"use client";
// components/AgendaBar.tsx
import React, { useState } from "react";
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmarkAdded,
  MdMap,
} from "react-icons/md";
import { db, auth } from "@/services/firebase"; // Import fixed path
import { parseTime } from "@/utils/timeutils"; // Import the utility
import speakersData from "@/data/speakers.json"; // Import data
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { BsBookmarkCheckFill } from "react-icons/bs";

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
  // Helper to get speakers for this event
  const speakers = (event.speakers || []).map((s: any) => s.toString());
  const eventSpeakers = (speakersData as any[]).filter((speaker) =>
    speakers.includes(speaker.id)
  );

  // Map track names to Tailwind colors (approximate Vuetify colors)
  const trackColors: any = {
    Mobile: {
      bg: "rgba(204, 246, 197, 0.3)",
      chip: "#ccf6c5",
      text: "#000000",
      border: "#34a853",
    },
    Cloud: {
      bg: "rgba(255, 231, 165, 0.3)",
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
      bg: "rgba(255, 255, 255, 1)",
      chip: "#e3e3e3",
      text: "#000000",
      border: "#202023",
    },
  };

  const currentTrackColor =
    trackColors[event.track] || trackColors.default;

  return (
    <div
      className={`mx-2 my-2 w-64 p-4 h-40 shrink-0 flex flex-col relative rounded-lg shadow-sm border ${
        currentTrackColor === trackColors.default
          ? "border-gray-200"
          : "border-transparent"
      }`}
      style={{
        backgroundColor: currentTrackColor.bg,
      }}
    >
      {/* Time */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-bold pr-2 leading-tight line-clamp-2">
          {event.title}
        </h3>
        <div className="text-[10px] font-bold text-right shrink-0">
          <div>{event.time.split(" to ")[0]}</div>
          <div className="font-normal opacity-70">{event.time.split(" to ")[1]}</div>
        </div>
      </div>

      {/* Speakers */}
      <div className="flex items-center gap-1 mt-auto">
        {eventSpeakers.slice(0, 3).map((speaker, index) => (
          <img
            key={speaker.id}
            src={`/images/speakers/${speaker.image}`}
            alt={speaker.name}
            className="w-5 h-5 object-cover rounded-full border border-white"
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/20')}
          />
        ))}
        {eventSpeakers.length > 3 && (
          <div className="text-[10px] font-medium text-gray-500">
            +{eventSpeakers.length - 3}
          </div>
        )}
        <div className="ml-2 text-[10px] font-medium text-gray-700 truncate max-w-[100px]">
          {eventSpeakers[0]?.name}
        </div>
      </div>

      {/* Chips */}
      <div className="mt-2 flex flex-wrap gap-1">
        {event.track && event.track !== "General" && (
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
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
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border"
            style={{
              borderColor: currentTrackColor.border,
              color: currentTrackColor.border,
            }}
          >
            {event.format}
          </span>
        )}
      </div>
    </div>
  );
};

export default AgendaBar;
