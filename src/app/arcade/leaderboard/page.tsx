/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import mainData from "@/data/config.json";

export default function LeaderboardPage() {
  useEffect(() => {
    document.title = `Leaderboard - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Leaderboard - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Leaderboard - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const user = useAuthContext();
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const queryUsers = query(
      usersCollection,
      orderBy("arcadeScore", "desc"),
      limit(10)
    );
    getDocs(queryUsers)
      .then(async (querySnapshot: any) => {
        const topUsers = querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Top users:", topUsers);
        // Add the current user to the top users if they are not already included
        if (user && !topUsers.some((u: any) => u.id === user.uid)) {
          const userDoc = await getDoc(doc(usersCollection, user.uid));
          topUsers.push({
            id: user.uid,
            ...userDoc.data(),
          });
        }
        const arcadeLeaderboard = topUsers.map((user: any) => ({
          name: user.displayName || "Unknown",
          username: user.username || "unknown",
          score: user.arcadeScore || 0,
          image: user.photoURL || "/images/default-avatar.png",
        }));
        setLeaderboard(arcadeLeaderboard);
        setLoading(false);
        console.log("Arcade leaderboard:", arcadeLeaderboard);
      })
      .catch((error: any) => {
        console.error("Error fetching top users:", error);
      });
  }, [user]);
  return loading ? (
    <div>Loading leaderboard...</div>
  ) : (
    <div className="mx-4 mb-4 shrink-0 border-2 dark:border-gray-700 h-max p-4 md:p-8 rounded-3xl">
      <h3 className="text-center font-bold google-font text-2xl pb-8 border-b-2 dark:border-gray-700">
        Leaderboard
      </h3>
      <div className="flex flex-col gap-4 mt-8 cursor-default">
        {leaderboard
          .sort((a, b) => b.score - a.score)
          .map((item, index) => {
            return (
              <>
                <div className={`flex justify-between items-center py-1.5`}>
                  <div className="flex items-center gap-4 grow overflow-ellipsis">
                    <p className="text-2xl">{index + 1}</p>
                    <img
                      src={item.image}
                      className="size-8 md:size-12 rounded-full md:ml-6 object-cover"
                    />
                    <div className="grow overflow-hidden mr-4">
                      <p className="overflow-ellipsis w-full line-clamp-1 break-all">
                        <b className="google-font md:text-xl leading-5">
                          {item.name}
                          <span className="ml-1">
                            {index == 0
                              ? "🥇"
                              : index === 1
                              ? "🥈"
                              : index == 2
                              ? "🥉"
                              : ""}
                          </span>
                        </b>
                      </p>
                      <p className="font-bold google-font opacity-60 text-sm md:text-base leading-4 overflow-ellipsis w-full line-clamp-1 break-all">
                        @{item.username}
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-mono">{item.score}</p>
                </div>
                {index === 4 && (
                  <div className="w-full rounded-sm bg-red-100 text-center google-font font-bold my-2 text-red-800 px-4 py-6 flex items-center gap-2 justify-center">
                    <span className="material-symbols-outlined !font-bold">
                      arrow_downward
                    </span>
                    Demotion to the next league{" "}
                    <span className="material-symbols-outlined !font-bold">
                      arrow_downward
                    </span>
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
