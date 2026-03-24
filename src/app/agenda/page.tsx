/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
// pages/agenda.tsx
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import AgendaBar from "@/components/common_agenda_bar";
// import SelectFilter from ".@/components/SelectFilter"; // Use the helper component
// import { useAuthState } from "react-firebase-hooks/auth"; // Assuming react-firebase-hooks
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayRemove,
//   arrayUnion,
// } from "firebase/firestore";
import { db, auth } from "../../lib/firebase"; // Import Firebase instances
import { parseTime } from "@/utils/timeutils"; // Import utility
// Import your JSON data
import sessionsData from "@/data/sessions.json";
import mainData from "@/data/config.json";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";

function SelectField({
  label = "Select an option",
  options = [],
  value,
  onChange,
}: {
  label: any;
  options: any;
  value: any;
  onChange: any;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-[260px] w-full" ref={dropdownRef}>
      <div
        className={`relative bg-[#000000]/4 dark:bg-[#2f2f2f] border-b-[1.5px] border-[#000000]/18 dark:border-[#FFFFFF] px-4 pt-5 pb-2 rounded-md rounded-b-none cursor-pointer`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <label
          className={`absolute left-4 text-sm font-medium text-[#000000] dark:text-gray-300 transition-all duration-200 ${
            value ? "top-2 text-base" : "top-2 text-base"
          }`}
        >
          {label}
        </label>
        <div className="text-[#000000]/80 dark:text-gray-400 mt-1 min-h-[24px]">
          {value || <span className="text-[#9e9e9e]"> </span>}
        </div>
        <span className=" material-symbols-outlined w-5 h-5 text-[#49454f] dark:text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          arrow_drop_down
        </span>
      </div>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-stone-900 shadow-lg rounded-md border border-[#202024]/12 max-h-60 overflow-auto">
          {options.map((option: any) => (
            <li
              key={option}
              className={`min-h-[16px] px-4 py-2 text-sm cursor-pointer hover:bg-[#000000]/4 hover:dark:bg-stone-800 text-[#000000] dark:text-white ${
                value === option ? "bg-[#000000]/8 dark:bg-stone-700" : ""
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              <p className="min-h-[24px]">{option}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface SelectFilterProps {
  label: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
  maxWidth?: string; // Tailwind max-width class like 'max-w-xs'
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  items,
  value,
  onChange,
  maxWidth,
}) => {
  return (
    <div className={`flex-grow ${maxWidth || ""}`}>
      <label
        htmlFor={`select-${label}`}
        className="block text-sm font-medium text-gray-700 visually-hidden"
      >
        {label}
      </label>{" "}
      {/* Hide label visually but keep for accessibility */}
      <select
        id={`select-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">All {label}</option> {/* Option to clear filter */}
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

const AgendaPage: React.FC = () => {
  const user = useAuthContext();
  const [formatFilter, setFormatFilter] = useState<string>("");
  const [venueFilter, setVenueFilter] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("");
  const [schedule, setSchedule] = useState<number[]>([]); // Array of event IDs
  const [showMySchedule, setShowMySchedule] = useState(false);
  const [userBoughtTicket, setUserBoughtTicket] = useState(false);
  // const [user, loading, error] = useAuthState(auth); // Use react-firebase-hooks

  useEffect(() => {
    document.title = `Agenda - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Agenda - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Agenda - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  // // Load user schedule from Firebase
  useEffect(() => {
    const loadSchedule = async () => {
      if (user) {
        console.log("Loading schedule for user:", user.uid);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log(userData);
            setUserBoughtTicket(userData.paymentStatus);
            setSchedule(userData.schedule || []);
            console.log("Loaded schedule:", userData.schedule);
          } else {
            // User document might not exist yet, create it or initialize schedule as empty
            console.log(
              "User document not found, initializing empty schedule."
            );
            setSchedule([]);
            // Optional: Create user doc if it doesn't exist
            // await setDoc(userDocRef, { schedule: [] }, { merge: true });
          }
        } catch (e) {
          console.error("Error loading schedule:", e);
          // Handle error
        }
      } else {
        // Clear schedule if user logs out
        setSchedule([]);
      }
    };

    loadSchedule();
  }, [user, db]); // Re-run when user or db instance changes

  // Calculate unique filter options
  const formatOptions = useMemo(() => {
    return [...new Set(sessionsData.map((e) => e.format))].sort();
  }, [sessionsData]);

  const venueOptions = useMemo(() => {
    return [...new Set(sessionsData.map((e) => e.venue))].sort();
  }, [sessionsData]);

  const domainOptions = useMemo(() => {
    return [...new Set(sessionsData.map((e) => e.track))].sort();
  }, [sessionsData]);

  // Function to update local schedule state (called by AgendaBar)
  const handleAddToSchedule = useCallback((eventId: number) => {
    setSchedule((prevSchedule) => {
      if (prevSchedule.includes(eventId)) {
        return prevSchedule.filter((id) => id !== eventId);
      } else {
        return [...prevSchedule, eventId];
      }
    });
  }, []);

  // Calculate days/tracks/events based on filters
  const daysData = useMemo<any>(() => {
    const allTracks = [
      ...new Set(sessionsData.map((agenda) => agenda.venue)),
    ].sort();

    const filterSessions = (sessions: any) => {
      return sessions
        .filter((e: any) => venueFilter === "" || e.venue === venueFilter)
        .filter((e: any) => formatFilter === "" || formatFilter === e.format)
        .filter((e: any) => domainFilter === "" || e.track === domainFilter);
    };

    const getTracksForDay = (date: string): any => {
      // Separate Community Lounge to potentially place it last if needed,
      // matching the original code's structure slightly.
      const loungeTrack = allTracks
        .filter((track) => track === "Community Lounge")
        .map((track) => {
          let events = filterSessions(
            sessionsData.filter((ag) => ag.date === date && ag.venue === track)
          );
          if (showMySchedule) {
            events = events.filter((event: any) => schedule.includes(event.id));
          }
          events.sort(
            (a: any, b: any) =>
              parseTime(a.time)[0].getTime() - parseTime(b.time)[0].getTime()
          );
          return { track, events };
        })
        .filter((t) => t.events.length > 0); // Only include if there are events

      const otherTracks = allTracks
        .filter((track) => track !== "Community Lounge")
        .map((track) => {
          let events = filterSessions(
            sessionsData.filter((ag) => ag.date === date && ag.venue === track)
          );
          if (showMySchedule) {
            events = events.filter((event: any) => schedule.includes(event.id));
          }
          events.sort(
            (a: any, b: any) =>
              parseTime(a.time)[0].getTime() - parseTime(b.time)[0].getTime()
          );
          return { track, events };
        })
        .filter((t) => t.events.length > 0); // Only include if there are events

      // Combine, placing other tracks first, then Community Lounge
      return [...otherTracks, ...loungeTrack];
    };

    // Hardcoded dates based on original Nuxt code
    const day1Tracks = getTracksForDay("04 July 2026");
    const day2Tracks = getTracksForDay("05 July 2026");

    console.log(day1Tracks);

    return [
      { weekday: "Sat", day: 04, tracks: day1Tracks },
      { weekday: "Sun", day: 05, tracks: day2Tracks },
    ].filter((day) => day.tracks.length > 0); // Only include days with events after filtering
  }, [
    formatFilter,
    venueFilter,
    domainFilter,
    sessionsData,
    showMySchedule,
    schedule,
  ]); // Recalculate if filters or data change

  // SEO equivalent using next/head
  const pageTitle = `Agenda - ${mainData.eventInfo.name} | ${mainData.communityName}`;
  const pageDescription = mainData.eventInfo.description.short;
  const ogImage = `${mainData.seo.hostUrl}/thumbnail.png?auto=format&fit=crop&frame=1&h=512&w=1024`;

  return (
    <div className="flex flex-col w-[98vw] mx-auto max-w-[1200px]">
      {" "}
      <h2 className="mt-5 mx-4 text-2xl font-bold">Agenda</h2>{" "}
      {/* Tailwind margin/text size */}
      {/* Filter Controls (replaces v-container/v-row with flex/gap) */}
      <div
        className="mt-4 mx-4 flex flex-wrap gap-3 items-centet"
        style={{ marginBottom: 0, paddingBottom: 0 }}
      >
        {/* Use SelectFilter component */}
        <SelectField
          label="Format"
          options={[...formatOptions]}
          value={formatFilter}
          onChange={setFormatFilter}
        />
        <SelectField
          label="Venue"
          options={["", ...venueOptions]}
          value={venueFilter}
          onChange={setVenueFilter}
        />
        <SelectField
          label="Domain"
          options={["", ...domainOptions]}
          value={domainFilter}
          onChange={setDomainFilter}
        />
        {/* Switch between Overall agenda & user scheduled agenda */}

        <div className="ml-auto inline-flex items-center gap-2 google-font font-bold">
          <label
            htmlFor="switch-component-on"
            className="text-slate-600 text-sm cursor-pointer mr-2"
          >
            Overall
          </label>

          <div className="relative inline-block w-14 h-7">
            <input
              id="switch-component-on"
              type="checkbox"
              checked={showMySchedule}
              onChange={(e) => setShowMySchedule(e.target.checked)}
              className="peer appearance-none w-14 h-7 my-auto bg-black/10 dark:bg-white/10 outline-2 dark:outline-gray-500 rounded-full checked:bg-blue-500 cursor-pointer transition-colors duration-300 checked:outline-blue-500"
            />
            <label
              htmlFor="switch-component-on"
              className="absolute flex items-center justify-center top-0 left-0 w-4 h-4 peer-checked:w-5 peer-checked:h-5 mt-1.5 ml-1.5 peer-checked:mt-1 peer-checked:ml-1 bg-black/50 dark:bg-white/50 rounded-full transition-transform duration-300 peer-checked:translate-x-7 peer-checked:bg-white cursor-pointer"
            >
              {showMySchedule && (
                <span className="material-symbols-outlined !text-sm !font-semibold">
                  check
                </span>
              )}
            </label>
          </div>

          <label
            htmlFor="switch-component-on"
            className="ml-2 text-slate-600 text-sm cursor-pointer"
          >
            My schedule
          </label>
        </div>
      </div>
      {/* Agenda Calendar Layout */}
      <div className="mt-3 md:mt-9 px-4 md:px-0">
        {" "}
        {/* dyn-margin equivalent */}
        <div className="calendar">
          {" "}
          {/* calendar__3ASh5 equivalent */}
          {daysData.map((day: any, dayIndex: any) => (
            <div
              key={dayIndex}
              className="day relative border-t border-gray-200"
            >
              {" "}
              {/* day__2Fs_v + :before equivalent */}
              {/* Date Header */}
              <div className="date-header flex flex-row p-3 md:flex-col md:absolute md:-left-16 md:top-2 md:p-0">
                {" "}
                {/* date__HrqQp equivalent */}
                <span className="date-weekday text-base md:text-xs md:uppercase md:mb-[-4px] font-normal text-gray-700 dark:text-gray-300">
                  {day.weekday},{" "}
                </span>{" "}
                {/* dateWeekday__c6J_B equivalent */}
                <span className="date-day-number text-xl md:text-2xl font-normal text-gray-900 dark:text-white md:text-center">
                  {day.day}
                </span>{" "}
                {/* dateDayNumber__KJVBf equivalent */}
              </div>
              {/* Tracks Container */}
              <div
                className="cal-agenda overflow-x-auto w-[98vw] md:w-full px-0 py-5 md:py-0 hide-scrollbar"
                style={{ overflowY: "hidden" }}
              >
                {" "}
                {/* cal-agenda equivalent */}
                {day.tracks.map((track: any, trackIndex: any) => (
                  <div key={trackIndex} className="row flex pb-4 md:pb-0">
                    {" "}
                    {/* row__WRVvc equivalent + md:ml for date offset */}
                    {/* Track Header (Venue Name) */}
                    {/* date__HrqQs equivalent - absolute position on large screen*/}
                    <div
                      className={`date-track-header flex flex-col items-center justify-center text-sm font-normal text-gray-700 dark:text-gray-400 flex-shrink-0 w-24 md:absolute md:left-[-74px] md:transform md:translate-y-12 ${
                        track.track === "Community Lounge"
                          ? "md:left-[-100px]"
                          : ""
                      }`}
                    >
                      {track.track !== "Auditorium" && (
                        <p className="text-center text-xs md:text-sm leading-tight uppercase">
                          {track.track.split(" ")[0]}
                          <br />
                          {track.track.split(" ")[1] || ""}
                        </p>
                      )}
                    </div>
                    {/* Events in Track */}
                    {track.events.map((event: any, eventIndex: any) => (
                      <AgendaBar
                        key={event.id}
                        event={event}
                        hasBoughtTicket={userBoughtTicket}
                        isSessionInSchedule={schedule.includes(event.id)}
                        onAddToSchedule={() => handleAddToSchedule(event.id)} // Pass event ID up
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
