/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/LoadingAnimation/page";
import { auth, db } from "@/lib/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { getDoc, doc, documentId } from "firebase/firestore";
import milestones from "@/data/milestones.json";

import dynamic from "next/dynamic";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Page() {
  const user = useAuthContext();
  const [loading, setLoadingState] = useState(true);
  const [isvolunteer, setVolunteerState] = useState(false);
  const [isstaff, setStaffState] = useState(false);
  useEffect(() => {
    if (user === null) {
      alert("Please login to register for WoW");
      window.location.href = "/";
      return;
    }
    getDoc(doc(db, "users", user!.uid)).then((document) => {
      const response = document.data();
      if (response == undefined) {
        alert("Please login to register for WoW");
        window.location.href = "/";
        return;
      }
      if (response.role === "staff") {
        setLoadingState(false);
        setStaffState(true);
      } else {
        alert("Please login as admin");
        window.location.href = "/";
        return;
      }
    });
  }, [user]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col p-8 gap-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-lg">
            Welcome to the admin dashboard. Here you can manage users, events,
            and more.
          </p>
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold">Users</h2>
            <div className="flex flex-row gap-4">
              <a
                href="/admin/users/new-user"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 w-lg h-14 flex items-center justify-center"
              >
                + New User
              </a>
              <a
                href="/admin/users"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 w-lg h-14 flex items-center justify-center"
              >
                + Edit User
              </a>
            </div>
            <h2 className="text-2xl font-bold">Teams</h2>
            <div className="flex flex-row gap-4">
              <a
                href="/admin/users/new-team"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 w-lg h-14 flex items-center justify-center"
              >
                + New Team
              </a>
            </div>
            <h2 className="text-2xl font-bold">Manage 1-1 Requests</h2>
            <div className="flex flex-row gap-4">
              <a
                href="/admin/manage-1-on-1"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 w-lg h-14 flex items-center justify-center"
              >
                + 1-1 Requests
              </a>
            </div>
          </div>
        </div>
      )}
      {/* {isstaff && (
        <div className="flex flex-col p-8 gap-8">
          <h3 className="text-4xl font-bold">Milestones</h3>
          {milestones.map((milestone, index) => {
            return (
              <a key={index} href={"/admin/milestones/" + milestone.id}>
                {milestone.title}
              </a>
            );
          })}
        </div>
      )} */}
    </>
  );
}
