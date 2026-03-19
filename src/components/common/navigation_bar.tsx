"use client";
import navbarConfig from "@/data/navbar.json";
import SignInButton from "./sign_in_button";
import { useRouter } from "next/navigation";
import config from "@/data/config.json";

export default function NavigationBar() {
  const router = useRouter();
  return (
    <nav className="relative z-30 bg-white dark:bg-black hidden md:flex justify-between items-center px-4 pl-6 text-sm font-medium rounded-3xl border-2 dark:border-gray-600 min-h-18">
      <img
        src={`/common/${navbarConfig.logo.dark_src || navbarConfig.logo.src}`}
        alt={navbarConfig.logo.alt}
        className="h-12 max-w-36 min-w-12 object-left dark:block hidden"
      />
      <img
        src={`/common/${navbarConfig.logo.src}`}
        alt={navbarConfig.logo.alt}
        className="h-12 max-w-36 min-w-12 object-left dark:hidden"
      />
      <ul className="flex gap-8 items-center">
        {navbarConfig.links
          .filter((e) => e.visible)
          .map((item, index) => (
            <li key={index}>
              <a href={item.path} className="text-gray-700 dark:text-gray-200">
                {item.name}
              </a>
            </li>
          ))}
        {new Date(config.eventInfo.event_startDate) < new Date() && (
          <li>
            <button
              onClick={() => router.push("/scan-qr")}
              className="bg-[#ffd427] border-[1.5px] border-black rounded-full px-4 py-2 cursor-pointer hover:bg-[#ffd427]/90"
            >
              Scan QR
            </button>
          </li>
        )}
        {new Date(config.eventInfo.registration.start_date) < new Date() &&
          localStorage.getItem("wow25-payment-status") !== "true" && (
            <li>
              <button
                onClick={() => router.push("/register")}
                className="bg-[#4285f4] text-black border-2 border-black rounded-full px-4 py-2 cursor-pointer hover:bg-[#ffd427]/90"
              >
                Get Tickets
              </button>
            </li>
          )}
        <li>
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
}
