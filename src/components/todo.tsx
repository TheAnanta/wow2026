/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TaskList.tsx
"use client";

import { useAuthContext } from "@/context/AuthContext";
import Progress from "@/utils/progress";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

export default function TaskList({
  userProgress = Progress.noApplication,
}: {
  userProgress: Progress;
}) {
  const [tasks, setTaskStatus] = useState([
    {
      id: 1,
      name: "Buy a ticket",
      isCompleted: !(
        userProgress == Progress.noApplication ||
        userProgress == Progress.paymentPending
      ),
      route: "/register",
    },
    {
      id: 2,
      name: "Update your profile",
      isCompleted: false,
      route: "/profile",
    },
    { id: 3, name: "Explore the agenda", isCompleted: false, route: "/agenda" },
    {
      id: 4,
      name: "Plan out your schedule",
      isCompleted: false,
      route: "/agenda",
    },
    {
      id: 5,
      name: "Schedule 1-1 sessions with a pundit",
      isCompleted: false,
      route: "/speakers",
    },
    {
      id: 6,
      name: "Accept Code of Conduct",
      isCompleted: false,
      route: "/coc",
    },
    {
      id: 7,
      name: "Read Frequently Asked Questions (FAQ)",
      isCompleted: false,
      route: "/faq",
    },
  ]);

  const user = useAuthContext();

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "users", user.uid)).then((d) => {
        const userDoc = d.data();
        if (!userDoc) {
          console.error("User document not found for UID:", user.uid);
          return;
        }
        console.log("user doc full", userDoc);
        console.log(
          "all data checkpoints = ",
          userDoc.username,
          userDoc.bio,
          userDoc.socials,
          userDoc.domainsInterested,
          userDoc.photoUrl
        );
        const localTasks = tasks;
        if (userDoc.paymentStatus && userDoc.registration) {
          localTasks[0].isCompleted = true;
          localStorage.setItem("wow25-payment-status", "true");
        }
        if (
          userDoc.username &&
          userDoc.bio &&
          userDoc.socials.filter((e: any) => {
            return e.provider === "linkedin";
          })?.length > 0 &&
          userDoc.domainsInterested?.length > 0 &&
          userDoc.photoURL
        ) {
          localTasks[1].isCompleted = true;
        }
        if ((userDoc.schedule ?? []).length > 0) {
          localTasks[2].isCompleted = true;
          localTasks[3].isCompleted = true;
        }
        if (userDoc.coc) {
          localTasks[5].isCompleted = true;
        }
        getCountFromServer(
          query(collection(db, "mentor-request"), where("uid", "==", user.uid))
        ).then((querySnapshot) => {
          console.log(querySnapshot.data().count);
          if (querySnapshot.data().count > 0) {
            localTasks[4].isCompleted = true;
          }
        });
        setTaskStatus(localTasks);
      });
    }
  });

  return (
    <div className={`task-interface google-font`}>
      {user && userProgress != Progress.noApplication ? (
        <>
          <h3 className="text-2xl font-bold py-4">Your Checklist</h3>{" "}
          <div id="tasks" className="tasks mt-2">
            {tasks.map((task, index) => {
              return (
                <a
                  href={task.route}
                  key={task.id}
                  className={`task ${
                    tasks[0].isCompleted == false && index != 0
                      ? "locked"
                      : task.isCompleted
                      ? "done"
                      : ""
                  }`}
                >
                  <span>{tasks[index].name}</span>
                  <span className="arrow">{"›"}</span>
                </a>
              );
            })}
          </div>
        </>
      ) : userProgress == Progress.noApplication ? (
        <div className="py-8 w-max mx-auto text-center pb-4">
          <h3 className="text-2xl font-medium">Your Checklist</h3>{" "}
          <p className="max-w-[32ch] mt-2 opacity-70">
            Register now to view the checklist to unlock the best experience
            through WOW 2026
          </p>
        </div>
      ) : (
        <div className="py-8 w-max mx-auto text-center pb-4">
          <h3 className="text-2xl font-medium">Your Checklist</h3>{" "}
          <p className="max-w-[32ch] mt-2 opacity-70">
            Sign in to view the checklist to unlock the best experience through
            WOW 2026
          </p>
        </div>
      )}
    </div>
  );
}
