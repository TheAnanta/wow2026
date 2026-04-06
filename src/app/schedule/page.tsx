/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import AgendaBar from "@/components/common_agenda_bar";
import { db } from "@/services/firebase";
import { parseTime } from "@/utils/timeutils";
import { fetchSessions, Session } from "@/services/stubs";
// Import your JSON data
import mainData from "@/data/config.json";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

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
          className={`absolute left-4 text-sm font-medium text-[#000000] dark:text-gray-300 transition-all duration-200 ${value ? "top-2 text-base" : "top-2 text-base"
            }`}
        >
          {label}
        </label>
        <div className="text-[#000000]/80 dark:text-gray-400 mt-1 min-h-[24px]">
          {value || <span className="text-[#9e9e9e]"> </span>}
        </div>
        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${open ? "" : "rotate-180"}`}>
          <img
            className="hidden dark:block h-2"
            src="https://io.google/2024/app/images/chevron-up-white.svg"
            alt=""
            aria-hidden="true"
          />
          <img
            className="block dark:hidden h-2"
            src="https://io.google/2024/app/images/chevron-up.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-stone-900 shadow-lg rounded-md border border-[#202024]/12 max-h-60 overflow-auto">
          {options.map((option: any) => (
            <li
              key={option}
              className={`min-h-[16px] px-4 py-2 text-sm cursor-pointer hover:bg-[#000000]/4 hover:dark:bg-stone-800 text-[#000000] dark:text-white ${value === option ? "bg-[#000000]/8 dark:bg-stone-700" : ""
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

const AgendaPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formatFilter, setFormatFilter] = useState<string>("");
  const [venueFilter, setVenueFilter] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("");
  const [schedule, setSchedule] = useState<any[]>([]); // Array of event IDs
  const [showMySchedule, setShowMySchedule] = useState(false);
  const [userBoughtTicket, setUserBoughtTicket] = useState(false);

  useEffect(() => {
    document.title = `Agenda - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    const load = async () => {
      try {
        const rawSessions = await fetchSessions({});
        const formatted = rawSessions.map(s => ({
          ...s,
          track: s.tags[0] || "General",
          format: s.tags[1] || "Talk",
          venue: s.tags[2] || "Main Stage",
          date: s.tags[3] || "28 June 2025"
        }));
        setSessions(formatted);
      } catch (e) {
        console.error("Error fetching sessions:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Load user schedule from Firebase
  useEffect(() => {
    const loadSchedule = async () => {
      if (user?.uid) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserBoughtTicket(userData.paymentStatus);
            setSchedule(userData.schedule || []);
          } else {
            setSchedule([]);
          }
        } catch (e) {
          console.error("Error loading schedule:", e);
        }
      } else {
        setSchedule([]);
      }
    };

    loadSchedule();
  }, [user]);

  // Calculate unique filter options
  const formatOptions = useMemo(() => {
    return [...new Set(sessions.map((e: any) => e.format))].filter(f => f && f !== "").sort();
  }, [sessions]);

  const venueOptions = useMemo(() => {
    return [...new Set(sessions.map((e: any) => e.venue))].filter(v => v && v !== "").sort();
  }, [sessions]);

  const domainOptions = useMemo(() => {
    return [...new Set(sessions.map((e: any) => e.track))].filter(d => d && d !== "").sort();
  }, [sessions]);

  // Function to update local schedule state (called by AgendaBar)
  const handleAddToSchedule = useCallback((eventId: any) => {
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
      ...new Set(sessions.map((agenda: any) => agenda.venue)),
    ].sort();

    const filterSessions = (sessionsToFilter: any) => {
      return sessionsToFilter
        .filter((e: any) => venueFilter === "" || e.venue === venueFilter)
        .filter((e: any) => formatFilter === "" || formatFilter === e.format)
        .filter((e: any) => domainFilter === "" || e.track === domainFilter);
    };

    const getTracksForDay = (date: string): any => {
      const loungeTrack = allTracks
        .filter((track) => track === "Community Lounge")
        .map((track) => {
          let events = filterSessions(
            sessions.filter((ag: any) => ag.date === date && ag.venue === track)
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
        .filter((t) => t.events.length > 0);

      const otherTracks = allTracks
        .filter((track) => track !== "Community Lounge" && track !== "")
        .map((track) => {
          let events = filterSessions(
            sessions.filter((ag: any) => ag.date === date && ag.venue === track)
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
        .filter((t) => t.events.length > 0);

      return [...otherTracks, ...loungeTrack];
    };

    const day1Tracks = getTracksForDay("28 June 2025");
    const day2Tracks = getTracksForDay("29 June 2025");

    return [
      { weekday: "Sat", day: 28, tracks: day1Tracks, dateStr: "28 June 2025" },
      { weekday: "Sun", day: 29, tracks: day2Tracks, dateStr: "29 June 2025" },
    ].filter((day) => day.tracks.length > 0);
  }, [
    sessions,
    formatFilter,
    venueFilter,
    domainFilter,
    showMySchedule,
    schedule,
  ]);

  return (
    <div className="flex flex-col w-full mx-auto max-w-[1200px] py-10 px-4 md:px-0 bg-white dark:bg-stone-950 min-h-screen">
      <h2 className="mx-4 text-3xl font-bold dark:text-white font-display">Agenda</h2>

      {/* Filters Section */}
      <div className="mt-6 mx-4 flex flex-wrap gap-4 items-center">
        <SelectField
          label="Format"
          options={["", ...formatOptions]}
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

        <div className="md:ml-auto inline-flex items-center gap-2 font-bold mt-4 md:mt-0">
          <label
            htmlFor="switch-overall"
            className="text-slate-600 dark:text-gray-400 text-sm cursor-pointer"
          >
            Overall
          </label>

          <div className="relative inline-block w-14 h-7">
            <input
              id="switch-overall"
              type="checkbox"
              checked={showMySchedule}
              onChange={(e) => setShowMySchedule(e.target.checked)}
              className="peer appearance-none w-14 h-7 my-auto bg-black/10 dark:bg-white/10 rounded-full checked:bg-blue-500 cursor-pointer transition-colors duration-300"
            />
            <label
              htmlFor="switch-overall"
              className="absolute flex items-center justify-center top-1 left-1 w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform duration-300 peer-checked:translate-x-7 cursor-pointer"
            >
              {showMySchedule && (
                <span className="material-symbols-outlined !text-sm !font-semibold text-blue-500">
                  check
                </span>
              )}
            </label>
          </div>

          <label
            htmlFor="switch-overall"
            className="text-slate-600 dark:text-gray-400 text-sm cursor-pointer"
          >
            My schedule
          </label>
        </div>
      </div>

      {/* Agenda Grid */}
      <div className="mt-12 px-4 md:px-0">
        <div className="calendar space-y-16">
          {daysData.map((day: any, dayIndex: any) => (
            <div
              key={dayIndex}
              className="day border-t border-gray-200 dark:border-gray-800 pt-10 mt-10 first:mt-0 first:pt-0 first:border-0"
            >
              {/* Content Area */}
              <div className="cal-content w-full overflow-hidden">
                <div className="space-y-2 text-stone-900 dark:text-stone-100">
                  {day.tracks.map((track: any, trackIndex: any) => (
                    <div key={trackIndex} className="track-row flex flex-col md:flex-row gap-4 items-center">
                      {/* Left Column for Metadata (Date + Venue) */}
                      <div className="md:w-32 flex-shrink-0 flex flex-col items-center justify-center text-center">
                        {trackIndex === 0 ? (
                          <div className="mb-4">
                            <span className="block text-blue-600 dark:text-blue-400 font-medium text-xs uppercase font-display">
                              {day.weekday}
                            </span>
                            <span className="block text-3xl font-bold text-gray-900 dark:text-white font-display leading-none">
                              {day.day}
                            </span>
                          </div>
                        ) : null}
                        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wider uppercase max-w-full break-words leading-tight">
                          {track.track}
                        </div>
                      </div>

                      {/* Right Area for Cards */}
                      <div className="flex-1 w-full overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="flex flex-row gap-4">
                          {track.events.map((event: any) => (
                            <div key={event.id} className="flex-shrink-0">
                              <AgendaBar
                                event={event}
                                hasBoughtTicket={userBoughtTicket}
                                isSessionInSchedule={schedule.includes(event.id)}
                                onAddToSchedule={() => handleAddToSchedule(event.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AgendaPage;
