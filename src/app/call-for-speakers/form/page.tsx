/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect } from "react";
// If using App Router, use useSearchParams from 'next/navigation'
import { useSearchParams } from "next/navigation";

// Assuming mainData and sessionsData are available via import
import mainData from "@/data/config.json"; // Adjust path
import sessionsData from "@/data/sessions.json"; // Adjust path

function getTrack(track: string) {
  switch (track) {
    case "Mobile":
      return "Mobile";
    case "Web":
      return "Web";
    case "Machine Learning/AI":
      return "Machine Learning/AI";
    case "Cloud":
      return "Cloud";
    default:
      return "Others";
  }
}

function getFormat(format: string) {
  switch (format) {
    case "Talk":
      return "Tech Talk (10 to 20 minutes )";
    case "Workshop":
      return "Workshop (15 to 30 minutes)";
    case "Tech Byte":
      return "Tech Byte (10 to 15 minutes)";
    default:
      return "Other";
  }
}

function CallForSpeakersFormPage() {
  useEffect(() => {
    document.title = `Call For Papers - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Call For Papers - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Call For Papers - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount
  // App Router hook (alternative if using app directory)
  const searchParams = useSearchParams();
  const selectedSessionsQuery = searchParams.get("selectedSessions");

  // Filter sessions based on query parameter (comma-separated IDs)
  const selectedSessionIds =
    typeof selectedSessionsQuery === "string"
      ? selectedSessionsQuery.split(",")
      : [];
  const selectedSessions = sessionsData.filter((e: any) =>
    selectedSessionIds.includes(e.id)
  );

  // Construct the Google Form URL parameters
  let formParams = "";
  if (selectedSessions.length >= 1) {
    formParams += `?usp=pp_url&entry.1005218827=${encodeURIComponent(
      selectedSessions[0].title
    )}`;
    formParams += `&entry.156650706=${encodeURIComponent(
      selectedSessions[0].description
    )}`;
    formParams += `&entry.486086907=${encodeURIComponent(
      getTrack(selectedSessions[0].track)
    )}`;
    formParams += `&entry.218167031=${encodeURIComponent(
      getFormat(selectedSessions[0].format)
    )}`; // Assuming you want to include the event name
    formParams += `&entry.1527510087=${
      selectedSessions.length > 1 ? "Yes" : "No"
    }`;

    if (selectedSessions.length > 1) {
      formParams += `&entry.1884318979=${encodeURIComponent(
        selectedSessions[1].title
      )}`;
      formParams += `&entry.48789671=${encodeURIComponent(
        selectedSessions[1].description
      )}`;
      formParams += `&entry.753857806=${encodeURIComponent(
        getTrack(selectedSessions[1].track)
      )}`;
      formParams += `&entry.1985521856=${encodeURIComponent(
        getFormat(selectedSessions[1].format)
      )}`;
      formParams += `&entry.1536503999=${
        selectedSessions.length > 2 ? "Yes" : "No"
      }`;

      if (selectedSessions.length > 2) {
        formParams += `&entry.143336768=${encodeURIComponent(
          selectedSessions[2].title
        )}`;
        formParams += `&entry.2005141422=${encodeURIComponent(
          selectedSessions[2].description
        )}`;
        formParams += `&entry.1954660644=${encodeURIComponent(
          getTrack(selectedSessions[2].track)
        )}`;
        formParams += `&entry.716651817=${encodeURIComponent(
          getFormat(selectedSessions[2].format)
        )}`;
        formParams += `&entry.212019900=No`; // Assuming always 'No' for more than 2
      }
    }
  }

  const googleFormBaseUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSeYpYHJA-z_faLhk8j_p9oD1FyqyKqZVnTBqE2EyfR2Qg8VLA/viewform";
  const iframeSrc = googleFormBaseUrl + formParams;

  return (
    <>
      {/* Assuming a default layout wrapper is provided externally */}
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Call for Papers</h1>
        <div className="flex flex-wrap -mx-4">
          {" "}
          {/* v-row */}
          <div className="w-full px-4">
            {" "}
            {/* v-col cols="12" */}
            <iframe
              style={{ width: "100%", height: "80vh" }} // Use inline style object in React
              src={iframeSrc}
              title="Call for Speakers Form" // Add a title for accessibility
              frameBorder="0" // Added standard iframe attribute
              marginHeight={0} // Added standard iframe attribute
              marginWidth={0} // Added standard iframe attribute
            >
              Loading...
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallForSpeakersFormPage;
