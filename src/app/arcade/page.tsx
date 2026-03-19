"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import arcadeJson from "@/data/arcade.json";
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

function ArcadeCard({ item }: { item: any }) {
  if (!item) {
    return null;
  }

  return (
    <div className="border-2 border-black dark:border-gray-700 flex flex-col items-center rounded-3xl overflow-hidden">
      <img
        src={`/images/arcade/${item.image}`}
        alt={item.name}
        height="160"
        className="w-full object-cover h-40"
      />

      <div className="p-5 w-full h-full flex flex-col">
        <h3 className="font-bold text-lg google-font">{item.name}</h3>

        <p className="text-xs opacity-50">
          {item.difficulty} | {item.category}
        </p>

        <div className="mt-1.5 mb-2">
          {item.author &&
            item.author.map((author: any, index: any) => (
              <div
                key={index}
                className="inline-flex m-1 py-1 px-1.5 border-[1.8px] border-[#202023] rounded-full gap-1.5 items-center w-fit"
              >
                <img
                  src={`/images/team/${author.image}`}
                  alt={author.name}
                  className="w-[18px] h-[18px] object-cover rounded-full"
                />
                <p className="mr-2 text-sm font-bold google-font">
                  {author.name}
                </p>
              </div>
            ))}
        </div>

        <p className="text-sm max-w-[36ch] mb-3 line-clamp-3 overflow-ellipsis">
          {item.description}
        </p>

        <a
          href={item.available ? item.link : undefined}
          className={`inline-block
            mt-auto px-6 py-2 w-max
            border-2 border-[#202024] rounded-full
            text-sm font-medium text-center
            ${
              item.available
                ? "hover:bg-amber-400 hover:text-gray-900 transition duration-200 ease-in-out"
                : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-100"
            }
          `}
        >
          {item.available ? "Play Now" : "Coming Soon"}
        </a>
      </div>
    </div>
  );
}

export default function ArcadePage() {
  useEffect(() => {
    document.title = `Arcade - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Arcade - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Arcade - ${mainData.eventInfo.name} | ${mainData.communityName}`
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

  return (
    <div className="flex">
      <div className="grow p-4 md:p-0">
        <h1 className="text-3xl font-bold mb-2 google-font">Arcade</h1>{" "}
        <p className="text-gray-700 dark:text-gray-500 md:mb-12 w-full md:w-1/3 max-w-[800px]">
          Felt something missing?
          <br />
          Well, you are at the right spot. Grab your thinking hats and put them
          on as we&apos;re going to play and compete to learn and earn, all
          while having fun.
        </p>
        <a
          href="/arcade/leaderboard"
          className="md:hidden flex bg-amber-200 dark:bg-amber-800 p-4 rounded-2xl my-4"
        >
          <span className="material-symbols-outlined mr-3">leaderboard</span>
          View the leaderboard
          <span className="material-symbols-outlined ml-auto">
            arrow_forward
          </span>
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[1260px]">
          {arcadeJson.map((item, index) => (
            <ArcadeCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="hidden md:block ml-24 w-[460px] shrink-0 border-2 dark:border-gray-700 h-max p-8 rounded-3xl">
        <h3 className="text-center font-bold google-font text-2xl pb-8 border-b-2 dark:border-gray-700">
          Leaderboard
        </h3>
        {loading ? (
          <div>Loading leaderboard...</div>
        ) : (
          <div className="flex flex-col gap-4 mt-8 cursor-default">
            {leaderboard
              .sort((a, b) => b.score - a.score)
              .map((item, index) => {
                return (
                  <>
                    <div className={`flex justify-between items-center py-1.5`}>
                      <div className="flex items-center gap-4">
                        <p className="text-2xl">{index + 1}</p>
                        <img
                          src={item.image}
                          className="size-12 rounded-full ml-6 object-cover"
                        />
                        <div>
                          <p>
                            <b className="google-font text-xl leading-5">
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
                          <p className="font-bold google-font opacity-60 leading-4">
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
        )}
      </div>
    </div>
  );
}
