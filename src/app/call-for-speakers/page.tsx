"use client";
import React, { useState, Fragment, useEffect } from "react";
import Link from "next/link"; // Use Link for client-side navigation
import CallForSpeakersTopicCard from "@/components/CallForSpeakersTopicCard"; // Adjust path
import { MdAndroid, MdOutlineCloud, MdCheck, MdLanguage } from "react-icons/md"; // Example icons
import { RiRobot2Line, RiShapesLine } from "react-icons/ri";
// import AskAPunditBottomSheet from '@/components/AskAPunditBottomSheet'; // Seems unused in this page logic

// Assuming mainData and sessionsData are available via import or props
import mainData from "@/data/config.json"; // Adjust path
import sessionsData from "@/data/sessions.json"; // Adjust path

const tracks = [
  {
    name: "Mobile",
    value: "Mobile", // Use value for internal logic, name for display
    color: "#1A73E8", // Color might be used for styling chips, but Tailwind classes are preferred
    icon: <MdAndroid className="mr-2 text-lg" />, // Using react-icons component directly
  },
  {
    name: "Web",
    value: "Web",
    color: "#1A73E8",
    icon: <MdLanguage className="mr-2 text-lg" />,
  },
  {
    name: "Machine Learning/AI",
    value: "AI/ML", // Use value for internal logic, name for display
    color: "#1A73E8",
    icon: <RiRobot2Line className="mr-2 text-lg" />,
  },
  {
    name: "Cloud",
    value: "Cloud", // Use value for internal logic, name for display
    color: "#1A73E8",
    icon: <MdOutlineCloud className="mr-2 text-lg" />,
  },
  {
    name: "Others",
    value: "Others", // Use value for internal logic, name for display
    color: "#1A73E8",
    icon: <RiShapesLine className="mr-2 text-lg" />,
  },
];

function CallForSpeakersPage() {
  useEffect(() => {
    document.title = `Call For Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Call For Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Call For Speakers - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const [selectedTracks, setSelectedTracks] = useState(
    tracks.map((t) => t.value)
  ); // State for selected tracks
  const [selectedSessions, setSelectedSessions] = useState<typeof sessionsData>(
    []
  ); // State for selected sessions (store full session objects)

  const selectOrUnselectSession = (session: (typeof sessionsData)[0]) => {
    setSelectedSessions((prevSelected) => {
      if (prevSelected.some((s) => s.id === session.id)) {
        return prevSelected.filter((s) => s.id !== session.id);
      } else {
        return [...prevSelected, session];
      }
    });
  };

  const addOrRemoveTrackChip = (trackName: string) => {
    setSelectedTracks((prevSelected) => {
      if (prevSelected.includes(trackName)) {
        return prevSelected.filter((name) => name !== trackName);
      } else {
        return [...prevSelected, trackName];
      }
    });
  };

  // Filter sessions based on selected tracks
  const filteredSessions = sessionsData.filter(
    (session) =>
      session.callForSpeaker &&
      (selectedTracks.includes(session.track) ||
        (selectedTracks.includes("Others") &&
          !tracks
            .slice(0, -1)
            .map((t) => t.value)
            .includes(session.track))) // Check if 'Others' is selected AND track is not one of the main tracks
  );

  return (
    <>
      {/* Assuming a default layout wrapper is provided externally */}
      <div className="container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="inline-flex flex-col mr-12">
          <h1 className="text-3xl font-bold mb-2 google-font">
            Call for Speakers
          </h1>
          <p className="mb-4 max-w-prose">
            Interested in speaking at our next event? We are looking for
            speakers who are willing to share their knowledge and expertise
            around the below topics.
            <br />
            <p className="font-medium">
              Fill out the form below to submit your proposal.
            </p>
          </p>
        </div>
        <p className="p-6 border-2 border-gray-800 my-4 rounded-xl max-w-prose">
          <b className="mb-2 google-font">Just a friendly note 😁</b>
          <br />
          <p className="text-sm mt-2">
            The topics listed on this page are intended as a guideline for the
            types of talks and workshops that could be beneficial to our local
            community. However, we welcome and encourage you to submit your own
            ideas if you have a topic that you feel would resonate with our
            audience.
          </p>
        </p>

        {/* Track Filter Chips and Apply Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {" "}
          {/* Using gap-2 for spacing between chips */}
          {tracks.map((track) => {
            const isSelected = selectedTracks.includes(track.value);
            return (
              <button
                data-twe-ripple-init
                key={track.value}
                onClick={() => addOrRemoveTrackChip(track.value)}
                className={`flex cursor-pointer items-center px-4 py-1 rounded-full text-sm h-8 transition duration-200 ease-in-out
                  ${
                    isSelected
                      ? "bg-[#ccf6c5] hover:bg-[#c2e7bc] text-black" // Tailwind for #ccf6c5 approximate
                      : "bg-transparent text-gray-700 dark:text-gray-300 dark:hover:text-gray-700 border-[2px] hover:bg-gray-100"
                  }
                `}
              >
                {track.icon} {/* Render the react-icon component */}
                {track.name}
                {isSelected && <MdCheck className="ml-1 text-base" />}{" "}
                {/* Check icon */}
              </button>
            );
          })}
          {/* Apply Now Button */}
          <Link
            href={{
              pathname: "/call-for-speakers/form",
              query: {
                selectedSessions: selectedSessions.map((s) => s.id).join(","), // Pass IDs as comma-separated string
              },
            }}
            className="ml-auto bg-[#0D652D] google-font text-white px-6 py-2 rounded-lg tracking-wider font-semibold  transition duration-200 ease-in-out"
          >
            Apply Now
          </Link>
          {/* Apply with Own Session Button */}
          <Link
            href="/call-for-speakers/form"
            className="ml-2 bg-[#CEEAD6] text-black px-6 py-2 rounded-lg google-font transition duration-200 ease-in-out"
          >
            Apply with Own Session
          </Link>
        </div>

        {/* Sessions Grid */}
        <div className="flex flex-wrap -mx-4 mt-8">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 mb-8"
            >
              <CallForSpeakersTopicCard
                session={session}
                isSelected={selectedSessions.some((s) => s.id === session.id)} // Check if session is in the selectedSessions array
                selectSession={() => selectOrUnselectSession(session)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CallForSpeakersPage;
