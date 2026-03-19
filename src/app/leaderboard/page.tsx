/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import mainData from "@/data/config.json";

export default function Leaderboard() {
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
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  useEffect(() => {
    getDocs(query(collection(db, "teams"))).then((querySnapshot) => {
      const documents = querySnapshot.docs;
      let docs: any[] = [];
      documents.forEach((doc1) => {
        const d1 = doc1.data();
        const d = {
          teamName: d1.teamName,
          score:
            d1.milestone_one == undefined
              ? 0
              : Object.values(d1.milestone_one).reduce(
                  (g, f: any) => f.reduce((a: any, b: any) => a + b, 0) + g,
                  0
                ),
        };
        docs = [...docs, d];
      });
      setLeaderboard(docs);
    });
  });
  return (
    <div className="mx-6 my-12">
      <h2 className="text-3xl ">Leaderboard</h2>
      {leaderboard
        .sort((a, b) => b.score - a.score)
        .map((f, i) => {
          return (
            <p key={i}>
              <span className="mr-6">{i + 1}</span>
              {f.teamName}
            </p>
          );
        })}
    </div>
  );
}
