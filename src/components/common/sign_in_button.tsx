/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { auth, signInWithGoogleAsPopup } from "@/lib/firebase";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "firebase/auth";
import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { Suspense } from "react";
import Script from "next/script";

const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  const browser_names = [
    "Firefox",
    "Chrome",
    "Safari",
    "Edge",
    "Opera",
    "MSIE",
    "OPR",
    "Trident/",
  ];
  let browser_name = "Unknown Browser";

  for (let i = 0; i < browser_names.length; i++) {
    if (userAgent.indexOf(browser_names[i]) > -1) {
      browser_name = browser_names[i];
      return browser_name;
    }
  }
  return browser_name;
};

export function SignOutDialog() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("signout") === "";
  const pathName = usePathname();
  console.log("modal", modal, pathName);
  return (
    <>
      <dialog
        className={`fixed left-0 top-0 w-full h-full ${
          modal ? "bg-black bg-opacity-50 z-50 backdrop-blur" : "-z-20"
        } flex justify-center items-center overflow-hidden`}
      >
        <div
          className={`mx-8 md:mx-[unset] p-[40px] bg-white rounded-2xl shadow-xl  transition-all duration-300 ${
            modal
              ? "bottom-0 md:translate-y-0 -translate-y-[112px]"
              : "bottom-0 translate-y-[1500px] md:translate-y-[1500px]"
          } `}
        >
          <h2 className="text-2xl font-medium">Sign out?</h2>
          <p className="mt-2 mb-6">
            All saved events remain synced to your account.
          </p>
          <div className="flex gap-x-8">
            <Link href={pathName}>
              <button>Not now</button>
            </Link>
            <Link href={pathName}>
              <button
                className="py-1.5 px-3.5 bg-[#DB4437] rounded-full text-white cursor-pointer"
                onClick={() => {
                  auth.signOut();
                  localStorage.clear();

                  window.location.href = "/";
                }}
              >
                Sign out
              </button>
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default function SignInButton(props: any) {
  const router = useRouter();
  const user = useAuthContext();
  const pathName = usePathname();
  return (
    <>
      {user !== null && user.photoURL !== null && (
        <Link href="/profile">
          <img
            referrerPolicy="no-referrer"
            src={user.photoURL}
            className="my-3 mx-2 w-[42px] h-[42px] rounded-full aspect-square border-2"
            onClick={() => {}}
          />
        </Link>
        // <Link href="?signout">
        //   <img
        //     referrerPolicy="no-referrer"
        //     src={user.photoURL}
        //     className="my-3 mx-2 w-[42px] h-[42px] rounded-full aspect-square"
        //     onClick={() => {}}
        //   />
        // </Link>
      )}
      {user !== null && user.photoURL === null && (
        <Link href="?signout">
          <div className="my-3 mx-2 w-[42px] h-[42px] rounded-full aspect-square flex items-center justify-center bg-[#FBBC04] dark:bg-[#d9a204] font-medium">
            {user?.displayName?.toString().charAt(0).toUpperCase()}
          </div>
        </Link>
      )}
      {/* {user !== null &&
        !pathName.includes("/register") &&
        localStorage.getItem("hasRegistered") !== "true" && (
          <Link href="/register" className="flex">
            <button className="my-3 md:mx-3 mr-0 ml-3 py-[10px] bg-[#1a73e8] text-white font-medium text-sm px-5 rounded-lg">
              Register
            </button>
          </Link>
        )} */}
      {user !== null &&
        !pathName.includes("/register") &&
        !pathName.includes("/confirmation") &&
        localStorage.getItem("hasRegistered") === "true" &&
        localStorage.getItem("isShortlisted") === "true" &&
        localStorage.getItem("isConfirmedAttendee") !== "true" && (
          <Link href="/confirmation" className="flex">
            <button className="my-3 md:mx-3 mr-0 ml-3 py-[10px] bg-[#1a73e8] text-white font-medium text-sm px-5 rounded-lg">
              Confirm Participation
            </button>
          </Link>
        )}
      {/* {user !== null &&
        !pathName.includes("/register") &&
        localStorage.getItem("hasRegistered") === "true" &&
        localStorage.getItem("isShortlisted") === "true" &&
        localStorage.getItem("isConfirmedAttendee") === "true" && (
          <Link href="/profile" className="flex">
            <button className="my-3 md:mx-3 mr-0 ml-3 py-[10px] bg-[#1a73e8] text-white font-medium text-sm px-5 rounded-lg">
              My Profile
            </button>
          </Link>
        )} */}
      {user === null && (
        <button
          className="py-1.5 px-3.5 bg-[#1a73e8] rounded-full text-white cursor-pointer"
          onClick={() => {
            if (getBrowserName() === "Unknown Browser") {
              alert("Please use your default browser to register for WoW.");
            }
            signInWithGoogleAsPopup(
              (user: User | null) => {
                router.refresh();
              },
              (failure: string) => {
                alert("Error signin in: " + failure);
              }
            );
          }}
        >
          Sign In
        </button>
      )}
    </>
  );
}
