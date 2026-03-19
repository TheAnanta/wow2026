/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AdminPanelSettings,
  CalendarToday,
  CalendarTodayOutlined,
  GamepadOutlined,
  Home,
  HomeOutlined,
  HomeTwoTone,
  InfoOutlined,
  MapOutlined,
  Menu,
  PeopleOutline,
  PeopleRounded,
  PersonPinCircleOutlined,
  PersonPinCircleTwoTone,
  PersonPinOutlined,
  SportsBarOutlined,
  SupervisorAccountOutlined,
  TodayOutlined,
  TodayRounded,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db, signInWithGoogleAsPopup } from "@/lib/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { User } from "firebase/auth";

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

function TopNavigationBar(props: any) {
  const router = useRouter();
  const user = useAuthContext();
  const pathName = usePathname();
  return (
    <div
      className={`h-14 md:h-16 md:px-4 flex md:justify-end items-center w-max ${props.className}`}
    >
      {user !== null && user.photoURL !== null && (
        <Link href="/profile">
          <img
            referrerPolicy="no-referrer"
            src={user.photoURL}
            className="md:m-2 w-[42px] h-[42px] rounded-full aspect-square"
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
          <div className="my-3 mx-2 w-[42px] h-[42px] rounded-full aspect-square flex items-center justify-center bg-[#fbbc04] font-medium">
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
          className="py-3 px-2 font-medium text-[#1a73e8]"
          onClick={() => {
            if (getBrowserName() === "Unknown Browser") {
              alert("Please use your default browser to register for IWD.");
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
    </div>
  );
}

export default function CommonNavigationRail() {
  const pathname = usePathname();
  const user = useAuthContext();
  const [loading, setLoadingState] = useState(true);
  const [isvolunteer, setVolunteerState] = useState(false);
  const [isstaff, setStaffState] = useState(false);
  useEffect(() => {
    if (user === null) {
      // alert("Please login to register for IWD");
      // window.location.href = "/";
      return;
    }
    getDoc(doc(db, "users", user!.uid)).then((document) => {
      const response = document.data();
      if (response === undefined) {
        return;
      }
      if (response.role === "staff") {
        setLoadingState(false);
        setStaffState(true);
      }
      if (response.role === "volunteer") {
        setLoadingState(false);
        setVolunteerState(true);
      }
    });
  });
  return (
    <div className="md:hidden z-50 flex w-full md:w-[80px] shrink-0 md:h-full navbar-shadow md:py-8 items-center py-2 md:pt-5 md:flex-col fixed md:relative bg-white dark:bg-black md:bg-[unset] bottom-0 md:bottom-[unset]">
      {/* <Menu className="m-3 !hidden lg:!flex" /> */}

      {/* <div
        className={`hidden line-nav ${
          pathname === "/"
            ? "top-[13%]  md:flex"
            : pathname.includes("badges")
            ? "top-[26.8%]  md:flex"
            : pathname.includes("faq")
            ? "top-[39%]  md:flex"
            : pathname.includes("schedule")
            ? "top-[53%] md:flex"
            : pathname.includes("speakers")
            ? "top-[66.9%] md:flex"
            : pathname.includes("live")
            ? "top-[79.6%] md:flex"
            : "hidden"
        } `}
      ></div> */}
      <div className="w-full flex md:flex-col justify-evenly md:justify-center items-center grow gap-y-10">
        <a href="/" className={`${pathname === "/" ? "nav-active" : ""}`}>
          <div className="flex flex-col items-center cursor-pointer">
            <HomeOutlined
              className={`w-[24px] h-[24px] nav-icon ${
                pathname === "/" ? "nav-icon-active" : ""
              }`}
            />
            <p
              className={`text-[11px] mt-[6px] nav-text font-medium ${
                pathname === "/" ? "nav-text-active" : ""
              }`}
            >
              Home
            </p>
          </div>
        </a>
        {/* <a href="/badges">
          <div className="flex flex-col items-center cursor-pointer">
            <PersonPinOutlined
              className={`w-[24px] h-[24px] nav-icon ${
                pathname.includes("badges") ? "nav-icon-active" : ""
              }`}
            />
            <p
              className={`text-[11px] mt-[6px] nav-text font-medium ${
                pathname.includes("badges") ? "nav-text-active" : ""
              }`}
            >
              Badges
            </p>
          </div>
        </a> */}
        <a
          href="/agenda"
          className={`${pathname.includes("schedule") ? "nav-active" : ""}`}
        >
          <div className="flex flex-col items-center  cursor-pointer">
            <TodayRounded
              className={`w-[24px] h-[24px] nav-icon ${
                pathname.includes("schedule") ? "nav-icon-active" : ""
              }`}
            />
            <p
              className={`text-[11px] mt-[6px] nav-text font-medium ${
                pathname.includes("schedule") ? "nav-text-active" : ""
              }`}
            >
              Agenda
            </p>
          </div>
        </a>
        <a
          href="/faq"
          className={`${pathname.includes("faq") ? "nav-active" : ""}`}
        >
          <div className="flex flex-col items-center  cursor-pointer">
            <InfoOutlined
              className={`w-[24px] h-[24px] nav-icon ${
                pathname.includes("faq") ? "nav-icon-active" : ""
              }`}
            />
            <p
              className={`text-[11px] mt-[6px] nav-text font-medium ${
                pathname.includes("faq") ? "nav-text-active" : ""
              }`}
            >
              FAQ
            </p>
          </div>
        </a>
        <a
          href="/speakers"
          className={`${pathname.includes("speakers") ? "nav-active" : ""}`}
        >
          <div className="flex flex-col items-center  cursor-pointer">
            <PeopleRounded
              className={`w-[24px] h-[24px] nav-icon ${
                pathname.includes("speakers") ? "nav-icon-active" : ""
              }`}
            />
            <p
              className={`text-[11px] mt-[6px] nav-text font-medium ${
                pathname.includes("speakers") ? "nav-text-active" : ""
              }`}
            >
              Speakers
            </p>
          </div>
        </a>
        {/* <a href="/live">
          <div className="flex flex-col items-center  cursor-pointer">
            <MapOutlined
              className={`w-[24px] h-[24px] nav-icon ${
                pathname.includes("live") ? "nav-icon-active" : ""
              }`}
            />
            <p
              className={`text-[11px] mt-[6px] nav-text font-medium ${
                pathname.includes("live") ? "nav-text-active" : ""
              }`}
            >
              Live
            </p>
          </div>
        </a>  */}
        {isvolunteer ||
          (isstaff && (
            <a
              href="/admin"
              className={`${pathname.includes("admin") ? "nav-active" : ""}`}
            >
              <div className="flex flex-col items-center  cursor-pointer">
                <AdminPanelSettings
                  className={`w-[24px] h-[24px] nav-icon ${
                    pathname.includes("admin") ? "nav-icon-active" : ""
                  }`}
                />
                <p
                  className={`text-[11px] mt-[6px] nav-text font-medium ${
                    pathname.includes("admin") ? "nav-text-active" : ""
                  }`}
                >
                  Admin
                </p>
              </div>
            </a>
          ))}
        <TopNavigationBar />
      </div>
    </div>
  );
}
