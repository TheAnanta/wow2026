/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { fetchSessions, Session } from "@/services/stubs";
import { db } from "@/services/firebase";
import { parseTime } from "@/utils/timeutils";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { SessionCard } from "../explore/components/SessionCard";
import { MdFilterList, MdCalendarToday, MdBookmark } from "react-icons/md";

/**
 * ADAPTED TO I/O '24 DESIGN
 */
const SchedulePage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]); // Array of bookmarked session IDs
  const [showMySchedule, setShowMySchedule] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>("28 June 2025");
  const [userBoughtTicket, setUserBoughtTicket] = useState(false);

  // Load all sessions from stubs
  useEffect(() => {
    const load = async () => {
      const data = await fetchSessions({});
      setSessions(data);
      setLoading(false);
    };
    load();
  }, []);

  // Load user schedule from Firebase
  useEffect(() => {
    const loadUser = async () => {
      if (user?.uid) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserBoughtTicket(userData.paymentStatus);
            setSchedule(userData.schedule || []);
          }
        } catch (e) {
          console.error("Error loading schedule:", e);
        }
      }
    };
    loadUser();
  }, [user]);

  // Helper to extract info from tags
  const getSessionInfo = (session: Session) => {
    const track = session.tags[0] || "General";
    const venue = session.tags[2] || "Main Stage";
    const date = session.tags[3] || "28 June 2025";
    return { track, venue, date };
  };

  const handleBookmarkToggle = async (sessionId: string) => {
    if (!user) {
      alert("Please sign in to bookmark sessions.");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      const isBookmarked = schedule.includes(sessionId);
      
      await updateDoc(userRef, {
        schedule: isBookmarked ? arrayRemove(sessionId) : arrayUnion(sessionId),
      });

      setSchedule(prev => 
        isBookmarked ? prev.filter(id => id !== sessionId) : [...prev, sessionId]
      );
    } catch (e) {
      console.error("Error toggling bookmark:", e);
    }
  };

  // Filter and group sessions
  const groupedSessions = useMemo(() => {
    let filtered = sessions.filter(s => {
      const { date } = getSessionInfo(s);
      return date === selectedDay;
    });

    if (showMySchedule) {
      filtered = filtered.filter(s => schedule.includes(s.id));
    }

    // Group by time slot
    const groups: { [time: string]: Session[] } = {};
    filtered.forEach(s => {
      const time = s.time || "TBD";
      if (!groups[time]) groups[time] = [];
      groups[time].push(s);
    });

    // Sort times
    return Object.keys(groups)
      .sort((a, b) => {
        if (a === "TBD") return 1;
        if (b === "TBD") return -1;
        return parseTime(a)[0].getTime() - parseTime(b)[0].getTime();
      })
      .map(time => ({ time, sessions: groups[time] }));
  }, [sessions, selectedDay, showMySchedule, schedule]);

  const days = ["28 June 2025", "29 June 2025"];

  if (loading) {
    return <div className="flex justify-center items-center h-screen l-h2">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="max-w-[1200px] mx-auto px-4 pt-20 pb-10">
        <h1 className="l-h2 mb-4">Program</h1>
        <p className="l-p1 text-grey-text max-w-2xl mb-8">
          Explore the full schedule of sessions, workshops, and keynotes. Save your favorite sessions to your personal schedule.
        </p>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-grey-bg pb-6">
          {/* Day Selector */}
          <div className="flex gap-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedDay === day 
                  ? "bg-google-blue text-white shadow-md scale-105" 
                  : "bg-grey-bg text-grey-900 hover:bg-grey-200"
                }`}
              >
                {day.split(' ')[0]} {day.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Toggle "My Schedule" */}
          <div className="flex items-center gap-4 bg-grey-bg p-1 rounded-full w-fit">
            <button
              onClick={() => setShowMySchedule(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !showMySchedule ? "bg-white text-google-blue shadow-sm" : "text-grey-text"
              }`}
            >
              Overall
            </button>
            <button
              onClick={() => setShowMySchedule(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                showMySchedule ? "bg-white text-google-blue shadow-sm" : "text-grey-text"
              }`}
            >
              <MdBookmark className={showMySchedule ? "text-google-blue" : "text-grey-text"} />
              My schedule
            </button>
          </div>
        </div>
      </div>

      {/* Main Schedule List */}
      <div className="max-w-[1200px] mx-auto px-4 pb-20">
        {groupedSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-grey-bg p-6 rounded-full mb-4">
              <MdCalendarToday size={48} className="text-grey-400" />
            </div>
            <h3 className="s-h3 text-grey-text mb-2">No sessions found</h3>
            <p className="l-p1 text-grey-text">Try changing the filters or adding sessions to your schedule.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedSessions.map((group, groupIdx) => (
              <div key={groupIdx} className="flex flex-col md:flex-row gap-8 items-start">
                {/* Time Column */}
                <div className="md:w-32 flex-shrink-0 sticky top-24">
                  <div className="text-2xl font-medium text-google-blue">
                    {group.time.split(' ')[0]}
                    <span className="text-sm ml-1 opacity-70 uppercase">{group.time.split(' ')[1]}</span>
                  </div>
                  <div className="h-0.5 w-8 bg-google-blue/20 mt-1"></div>
                </div>

                {/* Sessions Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {group.sessions.map(session => (
                    <div key={session.id} className="relative group">
                      <SessionCard 
                        session={session} 
                        onBookmarkClick={handleBookmarkToggle} 
                      />
                      {/* Track Indicator Line */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: getSessionInfo(session).track === 'Mobile' ? '#34a853' : getSessionInfo(session).track === 'Cloud' ? '#f9ab00' : '#4285f4' }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Sticky Floating Filter button (optional if needed) */}
      <div className="md:hidden fixed bottom-8 right-4 z-40">
        <button 
          onClick={() => setShowMySchedule(!showMySchedule)}
          className="bg-google-blue text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          {showMySchedule ? <MdCalendarToday size={24} /> : <MdBookmark size={24} />}
        </button>
      </div>

      <style jsx global>{`
        .l-h2 { font-family: var(--font-display); }
        .s-h3 { font-family: var(--font-display); }
      `}</style>
    </div>
  );
};

export default SchedulePage;
