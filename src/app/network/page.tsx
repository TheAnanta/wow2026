/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  query,
  where,
  collection,
  or,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import NetworkConnectionCard from "@/components/NetworkConnectionCard";
import { useAuthContext } from "@/context/AuthContext";
import mainData from "@/data/config.json";

export default function NetworkPage() {
  useEffect(() => {
    document.title = `Networking - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Networking - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Networking - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const [connections, setConnections] = useState<any>([]);
  const user = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchConnections = async () => {
    if (user) {
      console.log("Fetching connections...");
      const q = query(
        collection(db, "connections"),
        or(where("connectA", "==", user.uid), where("connectB", "==", user.uid))
      );

      const connectionsSnapshot = await getDocs(q);
      const fetchedConnections = [];

      for (const doc2 of connectionsSnapshot.docs) {
        const d = doc2.data();
        const cId = d.connectA === user.uid ? d.connectB : d.connectA;
        const c = await getDoc(doc(db, "users", cId));
        fetchedConnections.push(c.data());
      }
      setConnections(fetchedConnections);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Network page rendered");
      const shouldRefresh = searchParams.get("refresh");
      if (shouldRefresh) {
        fetchConnections().then(() => {
          router.push("/network");
        });
      } else {
        fetchConnections();
      }
    }
  }, [user]);

  return (
    <div className="px-4 ">
      <h1 className="text-3xl font-bold mt-5">Network</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 max-w-6xl w-full ">
        {connections
          .filter((e: any) => e?.displayName !== undefined)
          .map((connection: any, index: any) => (
            <NetworkConnectionCard key={index} connection={connection} />
          ))}
      </div>
    </div>
  );
}
